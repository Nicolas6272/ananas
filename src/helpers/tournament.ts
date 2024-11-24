import { FirebaseMatch, FirebaseTournamentWithMatches } from "~/types";

export const getMatchesForDate: (
  tournament: FirebaseTournamentWithMatches,
  date: Date,
) => FirebaseMatch[] = (tournament, date) => {
  return tournament.matches.filter((match) => {
    return (
      new Date(match.startTimestamp).toDateString() === date.toDateString()
    );
  });
};
