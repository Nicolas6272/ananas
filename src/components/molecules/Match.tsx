import { Check } from "lucide-react-native";
import { type FC } from "react";
import { View } from "react-native";

import StylisedText from "../atoms/styled/Text";

import { getLocalHourFromTimestamp } from "~/helpers/date";
import {
  getMatchRoundFormatted,
  isMatchCancelled,
  isMatchEnded,
  isMatchInProgress,
  isMatchStarted,
  isMatchWinByForfeit,
} from "~/helpers/match";
import { cn } from "~/helpers/styles";
import { type FirebaseMatch } from "~/types";

interface MatchProps {
  match: FirebaseMatch;
  tounrnamentNbTeams: number;
}

const Match: FC<MatchProps> = ({ match, tounrnamentNbTeams }) => {
  const {
    startTimestamp,
    statusCode,
    period1A,
    period2A,
    period3A,
    pointA,
    period1B,
    period2B,
    period3B,
    pointB,
    winnerCode,
  } = match;

  const matchStarted = isMatchStarted(statusCode);
  const matchDone = isMatchEnded(statusCode);
  const matchInprogress = isMatchInProgress(statusCode);
  const matchCancelled = isMatchCancelled(statusCode);
  const matchWinByForfeit = isMatchWinByForfeit(statusCode);

  const showSetScore = (AScore?: number, BScore?: number) => {
    const AllScoreDefined = AScore !== undefined && BScore !== undefined;
    const AllScoreZero = AScore === 0 && BScore === 0;
    return (
      AllScoreDefined &&
      ((matchDone && !AllScoreZero) || (matchInprogress && !AllScoreZero))
    );
  };
  const setWinner = (AScore?: number, BScore?: number): number => {
    if (AScore === undefined || BScore === undefined || AScore === BScore)
      return 0;

    // Vérifie si un joueur a gagné selon les règles du set
    const hasWon = (winnerScore: number, loserScore: number) =>
      (winnerScore >= 6 && winnerScore - loserScore >= 2) ||
      (winnerScore === 7 && loserScore === 6);

    if (hasWon(AScore, BScore)) return 1;
    if (hasWon(BScore, AScore)) return 2;

    return 0;
  };

  const showFirstSetScore = showSetScore(period1A, period1B);
  const showSecondSetScore = showSetScore(period2A, period2B);
  const showThirdSetScore = showSetScore(period3A, period3B);

  const firstSetWinner = setWinner(period1A, period1B);
  const secondSetWinner = setWinner(period2A, period2B);
  const thirdSetWinner = setWinner(period3A, period3B);

  const winnerA = winnerCode === 1;
  const winnerB = winnerCode === 2;

  return (
    <View
      key={match.id}
      className="mt-3 flex flex-row items-center justify-between"
    >
      {/* PLAYERS INFO */}
      <View className="flex flex-col">
        <View className="flex flex-row items-center p-1">
          <StylisedText className={cn(winnerB && "opacity-50")}>
            {match.playerAName}
          </StylisedText>
          {winnerA && <Check size={12} className="ml-2" color="white" />}
        </View>
        <View className="flex flex-row items-center p-1">
          <StylisedText className={cn(winnerA && "opacity-50")}>
            {match.playerBName}
          </StylisedText>
          {winnerB && <Check size={12} className="ml-2" color="white" />}
        </View>
      </View>
      <View className="flex h-full flex-row items-center justify-center gap-x-4">
        {/* SCORE OR HOUR OF PLAY */}
        <View className="flex h-full flex-row items-center">
          {!matchStarted ? (
            <StylisedText>
              {getLocalHourFromTimestamp(startTimestamp)}
            </StylisedText>
          ) : matchCancelled ? (
            <StylisedText>Annulé</StylisedText>
          ) : matchWinByForfeit ? (
            <StylisedText>Forfait</StylisedText>
          ) : (
            <View className="flex flex-row">
              {showFirstSetScore && (
                <View className="flex flex-col">
                  <StylisedText
                    className={cn(
                      "rounded-lg p-1",
                      firstSetWinner === 2 && "opacity-50",
                    )}
                  >
                    {period1A}
                  </StylisedText>
                  <StylisedText
                    className={cn(
                      "rounded-lg p-1",
                      firstSetWinner === 1 && "opacity-50",
                    )}
                  >
                    {period1B}
                  </StylisedText>
                </View>
              )}

              {showSecondSetScore && (
                <View className="flex flex-col">
                  <StylisedText
                    className={cn(
                      "rounded-lg p-1",
                      secondSetWinner === 2 && "opacity-50",
                    )}
                  >
                    {period2A}
                  </StylisedText>
                  <StylisedText
                    className={cn(
                      "rounded-lg p-1",
                      secondSetWinner === 1 && "opacity-50",
                    )}
                  >
                    {period2B}
                  </StylisedText>
                </View>
              )}
              {showThirdSetScore && (
                <View className="flex flex-col">
                  <StylisedText
                    className={cn(
                      "rounded-lg p-1",
                      thirdSetWinner === 2 && "opacity-50",
                    )}
                  >
                    {period3A}
                  </StylisedText>
                  <StylisedText
                    className={cn(
                      "rounded-lg p-1",
                      thirdSetWinner === 1 && "opacity-50",
                    )}
                  >
                    {period3B}
                  </StylisedText>
                </View>
              )}
              {matchInprogress &&
                pointA !== undefined &&
                pointB !== undefined && (
                  <View className="flex flex-col items-center">
                    <StylisedText className="rounded-lg bg-background-950 p-1">
                      {pointA}
                    </StylisedText>
                    <StylisedText className="rounded-lg bg-background-950 p-1">
                      {pointB}
                    </StylisedText>
                  </View>
                )}
            </View>
          )}
        </View>
        {/* ROUND INFO */}
        <View className="flex min-w-[48px] items-end">
          <StylisedText>
            {getMatchRoundFormatted(match.roundInfo, tounrnamentNbTeams)}
          </StylisedText>
        </View>
      </View>
    </View>
  );
};

export default Match;
