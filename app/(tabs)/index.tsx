import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import StylisedText from "~/components/atoms/styled/Text";
import { db } from "~/db/firebaseConfig";
import {
  firstLetterToUpperCase,
  getLocalHourFromTimestamp,
  getWeekDayFirstThreeLetters,
} from "~/helpers/date";
import { cn } from "~/helpers/styles";
import {
  type FirebaseMatch,
  type FirebaseTournamentWithMatches,
} from "~/types";

export default function HomePage() {
  const tournamentsRef = collection(db, "tournaments");

  const [tournaments, setTournaments] = useState<
    FirebaseTournamentWithMatches[]
  >([]);
  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const dateTimeStamp = selectedDate.getTime() / 1000;
  const yearToLocaleString = selectedDate.toLocaleDateString("fr-FR", {
    year: "numeric",
  });
  const monthToLocaleString = selectedDate.toLocaleDateString("fr-FR", {
    month: "long",
  });

  useEffect(() => {
    const fetchTournamentsAndMatches = () => {
      const unsubscribe = onSnapshot(tournamentsRef, (tournamentsSnapshot) => {
        const tournamentsMap = new Map();

        tournamentsSnapshot.forEach((tournamentDoc) => {
          const tournamentData = {
            ...tournamentDoc.data(),
            id: tournamentDoc.id,
          } as unknown as FirebaseTournamentWithMatches;

          // Filtrer les matchs par date
          const matchesRef = collection(
            db,
            `tournaments/${tournamentDoc.id}/matches`,
          );
          const matchesQuery = query(
            matchesRef,
            where("startTimestamp", ">=", dateTimeStamp),
            where("startTimestamp", "<", dateTimeStamp + 86400),
            orderBy("startTimestamp"),
          );

          onSnapshot(matchesQuery, (matchesSnapshot) => {
            const matches: FirebaseMatch[] = [];
            matchesSnapshot.forEach((matchDoc) => {
              matches.push(matchDoc.data() as FirebaseMatch);
            });

            // Ajouter les matchs au tournoi
            if (matches.length > 0) {
              tournamentsMap.set(tournamentDoc.id, {
                ...tournamentData,
                matches,
              });
            }

            // Convertir la Map en tableau et mettre à jour le state
            setTournaments(Array.from(tournamentsMap.values()));
          });
        });
      });

      return () => unsubscribe();
    };

    fetchTournamentsAndMatches();
  }, [selectedDate]);

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

  return (
    <View className="flex min-h-full bg-background-950">
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
              style={{
                gap: 2,
              }}
            >
              <StylisedText fontSize="$sm" fontWeight="$thin">
                {getWeekDayFirstThreeLetters(day)}
              </StylisedText>
              <StylisedText fontSize="$sm">
                {day.toLocaleDateString("fr-FR", {
                  day: "numeric",
                })}
              </StylisedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="bg-background-950 p-5">
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
          className="flex w-full flex-col"
        >
          {tournaments.map((tournament) => (
            <View
              key={tournament.id}
              className="flex w-full overflow-hidden rounded-lg bg-background-900"
            >
              <View className="flex flex-row items-center gap-3 bg-blue-500 px-2 py-3">
                <StylisedText fontSize="$sm" fontWeight="$semibold">
                  {tournament.name}
                </StylisedText>
                <StylisedText>{tournament.level}</StylisedText>
                <View className="h-[80%] w-[1px] bg-white" />
                <StylisedText>Homme</StylisedText>
              </View>

              <View className="flex flex-col gap-3 p-3">
                {tournament.matches.map((match) => (
                  <View
                    key={match.id}
                    className="flex flex-row items-center justify-between"
                  >
                    <View className="flex flex-col gap-1">
                      <StylisedText>{match.playerAName}</StylisedText>
                      <StylisedText>{match.playerBName}</StylisedText>
                    </View>
                    {match.statusCode === 0 ? (
                      <StylisedText>
                        {getLocalHourFromTimestamp(match.startTimestamp)}
                      </StylisedText>
                    ) : (
                      <View className="flex flex-col gap-1">
                        <View className="flex flex-row gap-1">
                          <StylisedText>{match.period1A}</StylisedText>
                          <StylisedText>{match.period2A}</StylisedText>
                          <StylisedText>{match.period3A}</StylisedText>
                        </View>
                        <View className="flex flex-row gap-1">
                          <StylisedText>{match.period1B}</StylisedText>
                          <StylisedText>{match.period2B}</StylisedText>
                          <StylisedText>{match.period3B}</StylisedText>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        {!tournaments.length && (
          <StylisedText fontSize="$md">
            Aucun match prévu pour le jour selectionné
          </StylisedText>
        )}
      </View>
    </View>
  );
}
