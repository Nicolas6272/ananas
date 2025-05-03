import { ExtensionStorage } from "@bacons/apple-targets";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";

import Match from "../../src/components/molecules/Match";

import StylisedText from "~/components/atoms/styled/Text";
import { db } from "~/db/firebaseConfig";
import {
  firstLetterToUpperCase,
  getWeekDayFirstThreeLetters,
} from "~/helpers/date";
import { cn } from "~/helpers/styles";
import {
  type FirebaseMatch,
  type FirebaseTournamentWithMatches,
} from "~/types";

const widgetStorage = new ExtensionStorage("group.com.galaxies.sollow");

export default function HomePage() {
  const tournamentsRef = collection(db, "tournaments");

  const [tournaments, setTournaments] = useState<
    FirebaseTournamentWithMatches[]
  >([]);
  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState(todayDate);

  // ✅ Calcul des timestamps exacts de minuit à 23h59
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const startTimestamp = Math.floor(startOfDay.getTime() / 1000);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  const endTimestamp = Math.floor(endOfDay.getTime() / 1000);

  useEffect(() => {
    const fetchTournamentsAndMatches = () => {
      const unsubscribe = onSnapshot(tournamentsRef, (tournamentsSnapshot) => {
        const tournamentsMap = new Map();

        tournamentsSnapshot.forEach((tournamentDoc) => {
          const tournamentData = {
            ...tournamentDoc.data(),
            id: tournamentDoc.id,
          } as unknown as FirebaseTournamentWithMatches;

          const matchesRef = collection(
            db,
            `tournaments/${tournamentDoc.id}/matches`,
          );
          const matchesQuery = query(
            matchesRef,
            where("startTimestamp", ">=", startTimestamp),
            where("startTimestamp", "<=", endTimestamp),
            orderBy("startTimestamp"),
          );

          // ✅ Un seul onSnapshot pour récupérer les matchs
          const unsubscribeMatches = onSnapshot(
            matchesQuery,
            (matchesSnapshot) => {
              const matches: FirebaseMatch[] = matchesSnapshot.docs.map(
                (matchDoc) => matchDoc.data() as FirebaseMatch,
              );

              if (matches.length > 0) {
                tournamentsMap.set(tournamentDoc.id, {
                  ...tournamentData,
                  matches,
                });
              }

              // ✅ Mise à jour d'état unique pour éviter des re-rendus multiples
              setTournaments(Array.from(tournamentsMap.values()));
            },
          );

          return unsubscribeMatches;
        });
      });

      return () => unsubscribe();
    };

    fetchTournamentsAndMatches();
  }, [selectedDate]);

  useEffect(() => {
    const score = tournaments[0]?.matches[0]?.period1A;
    widgetStorage.set("name", score);
    ExtensionStorage.reloadWidget();
  }, [tournaments]);

  // ✅ Génération des jours de la semaine
  const getDaysRange = () => {
    const days = [];
    const start = new Date(todayDate);
    const end = new Date(todayDate);
    start.setDate(todayDate.getDate() - 4);
    end.setDate(todayDate.getDate() + 2);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      days.push(new Date(date));
    }
    return days;
  };

  const daysOfRange = getDaysRange();
  const yearToLocaleString = selectedDate.toLocaleDateString("fr-FR", {
    year: "numeric",
  });
  const monthToLocaleString = selectedDate.toLocaleDateString("fr-FR", {
    month: "long",
  });

  return (
    <View className="flex min-h-full flex-col bg-background-950">
      <View className="flex rounded-b-[20px] bg-violet-500 px-6 pb-3">
        <View className="flex flex-row items-center gap-1 py-3">
          <StylisedText fontSize="$md" fontWeight="$semibold">
            {firstLetterToUpperCase(monthToLocaleString)}
          </StylisedText>
          <StylisedText fontSize="$md" fontWeight="$semibold">
            {yearToLocaleString}
          </StylisedText>
        </View>
        <View className="flex flex-row justify-between">
          {daysOfRange.map((day) => (
            <TouchableOpacity
              key={day.toDateString()}
              onPress={() => setSelectedDate(day)}
              className={cn(
                "flex flex-col items-center justify-center px-1 py-0.5",
                day.toDateString() === selectedDate.toDateString() &&
                  "rounded-[4px] bg-background-900",
              )}
              style={{ gap: 2 }}
            >
              <StylisedText fontSize="$sm" fontWeight="$thin">
                {getWeekDayFirstThreeLetters(day)}
              </StylisedText>
              <StylisedText fontSize="$sm">
                {day.toLocaleDateString("fr-FR", { day: "numeric" })}
              </StylisedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 bg-background-950 p-5">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              rowGap: 20,
              paddingBottom: 100,
            }}
            className="flex w-full flex-col"
          >
            {tournaments.map((tournament) => (
              <View
                key={tournament.id}
                className="flex w-full overflow-hidden rounded-lg bg-background-900"
              >
                <View className="flex flex-row items-center gap-x-3 bg-blue-500 px-2 py-3">
                  <StylisedText fontSize="$sm" fontWeight="$semibold">
                    {tournament.name}
                  </StylisedText>
                  <StylisedText>{tournament.level}</StylisedText>
                  <View className="h-[80%] w-[1px] bg-white" />
                  <StylisedText>Homme</StylisedText>
                </View>

                <View className="flex flex-col p-3">
                  {tournament.matches.map((match) => (
                    <Match
                      key={match.id}
                      match={match}
                      tounrnamentNbTeams={tournament.numberOfTeams}
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
          {!tournaments.length && (
            <StylisedText fontSize="$md">
              Aucun match prévu pour le jour sélectionné
            </StylisedText>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
