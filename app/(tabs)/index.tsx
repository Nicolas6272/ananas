import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";

import StylisedText from "~/components/atoms/styled/Text";
import { db } from "~/db/firebaseConfig";
import { getLocalHourFromTimestamp } from "~/helpers/date";
import {
  type FirebaseMatch,
  type FirebaseTournamentWithMatches,
} from "~/types";

export default function HomePage() {
  const tournamentsRef = collection(db, "tournaments");

  const [tournaments, setTournaments] = useState<
    FirebaseTournamentWithMatches[]
  >([]);
  const todayDate = new Date(2024, 9, 27);
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const dateTimeStamp = selectedDate.getTime() / 1000;

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
        <View className="flex flex-row items-center gap-2 py-3">
          <StylisedText fontSize="$md" fontWeight="$semibold">
            {selectedDate.toLocaleDateString("fr-FR", {
              month: "long",
            })}
          </StylisedText>
          <StylisedText fontSize="$md">
            {selectedDate.toLocaleDateString("fr-FR", {
              year: "numeric",
            })}
          </StylisedText>
        </View>
        <FlatList
          horizontal
          data={daysOfRange}
          keyExtractor={(item) => item.toDateString()}
          contentContainerStyle={{
            display: "flex",
            gap: 20,
          }}
          renderItem={({ item }) => {
            const isSelected =
              item.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                onPress={() => setSelectedDate(item)}
                style={{
                  alignItems: "center",
                  marginHorizontal: 2,
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                  backgroundColor: isSelected ? "#272625" : "transparent",
                }}
              >
                <StylisedText fontSize="$2xs" fontWeight="$thin">
                  {item
                    .toLocaleDateString("fr-FR", { weekday: "short" })
                    .slice(0, 3)
                    .toUpperCase()}
                </StylisedText>
                <StylisedText fontSize="$xs">{item.getDate()}</StylisedText>
              </TouchableOpacity>
            );
          }}
        />
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
                    <StylisedText>
                      {getLocalHourFromTimestamp(match.startTimestamp)}
                    </StylisedText>
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
