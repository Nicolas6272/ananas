import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import StylisedText from "~/components/atoms/styled/Text";
import { db } from "~/db/firebaseConfig";
import {
  type FirebaseMatch,
  type FirebaseTournamentWithMatches,
} from "~/types";

export default function HomePage() {
  const tournamentsRef = collection(db, "tournaments");

  const [tournaments, setTournaments] = useState<
    FirebaseTournamentWithMatches[]
  >([]);

  useEffect(() => {
    const fetchTournamentsAndMatches = () => {
      const unsubscribe = onSnapshot(tournamentsRef, (tournamentsSnapshot) => {
        const tournamentsMap = new Map();

        tournamentsSnapshot.forEach((tournamentDoc) => {
          const tournamentData = {
            ...tournamentDoc.data(),
          } as FirebaseTournamentWithMatches;

          const matchesRef = collection(
            db,
            `tournaments/${tournamentDoc.id}/matches`,
          );
          onSnapshot(matchesRef, (matchesSnapshot) => {
            const matches: FirebaseMatch[] = [];
            matchesSnapshot.forEach((matchDoc) => {
              matches.push(matchDoc.data() as FirebaseMatch);
            });

            // Grouper les matchs par stade
            const matchesByStadium = matches.reduce(
              (acc: { [key: string]: FirebaseMatch[] }, match) => {
                const stadium = match.stadium ?? "Unknown"; // Assurez-vous que chaque match a un 'stadium'
                if (!acc[stadium]) acc[stadium] = [];
                acc[stadium].push(match);
                return acc;
              },
              {},
            );

            // Ajouter les matchs triés par stade au tournoi
            tournamentsMap.set(tournamentDoc.id, {
              ...tournamentData,
              matchesByStadium,
            });

            // Convertir la Map en tableau et mettre à jour le state
            setTournaments(Array.from(tournamentsMap.values()));
          });
        });
      });

      return () => unsubscribe(); // Cleanup
    };

    fetchTournamentsAndMatches();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
      className="flex w-full bg-background-950 p-5"
    >
      {tournaments.map((tournament) => (
        <View key={tournament.id} className="w-full overflow-hidden rounded-lg">
          <View className="flex flex-row items-center gap-3 bg-blue-500 px-2 py-3">
            <StylisedText fontSize="$sm" fontWeight="$semibold">
              {tournament.name}
            </StylisedText>
            <StylisedText>{tournament.level}</StylisedText>
            <View className="h-[80%] w-[1px] bg-white" />
            <StylisedText>Homme</StylisedText>
          </View>

          {/* Affichage des matchs groupés par stade */}
          {Object.entries(tournament.matchesByStadium).map(
            ([stadium, matches]) => (
              <View key={stadium} className="mt-4">
                <StylisedText fontSize="$lg" fontWeight="$bold">
                  {stadium}
                </StylisedText>
                {matches.map((match) => (
                  <View key={match.id} className="flex w-full">
                    <View className="flex flex-row justify-between">
                      <View className="flex flex-col gap-1">
                        <StylisedText>{match.playerAName}</StylisedText>
                        <StylisedText>{match.playerBName}</StylisedText>
                      </View>
                      <View className="flex flex-col gap-1">
                        <StylisedText>{match.period1A}</StylisedText>
                        <StylisedText>{match.period1B}</StylisedText>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ),
          )}
        </View>
      ))}
    </ScrollView>
  );
}
