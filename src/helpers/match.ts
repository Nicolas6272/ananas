//Formatted match info
export const getMatchRoundFormatted = (
  roundInfo: number,
  tournamentNumberOfTeams: number,
): string => {
  switch (roundInfo) {
    case 1:
      return "Finale";
    case 2:
      return "DF";
    case 4:
      return "QF";
    case 8:
      return "HF";
    case 16:
      switch (tournamentNumberOfTeams) {
        case 32:
          return "Tour 1";
        case 64:
          return "Tour 2";
        case 128:
          return "Tour 3";
        default:
          return `1/${tournamentNumberOfTeams}`;
      }
    case 32:
      switch (tournamentNumberOfTeams) {
        case 64:
          return "Tour 1";
        case 128:
          return "Tour 2";
        default:
          return `1/${tournamentNumberOfTeams}`;
      }
    case 64:
      switch (tournamentNumberOfTeams) {
        case 128:
          return "Tour 1";
        default:
          return `1/${tournamentNumberOfTeams}`;
      }
    default:
      return `1/${tournamentNumberOfTeams}`;
  }
};

/// Match status code
export const isMatchStarted = (statusCode: number): boolean => statusCode !== 0;

export const isMatchEnded = (statusCode: number): boolean =>
  statusCode === 100 || statusCode === 92 || statusCode === 91;

export const isMatchInProgress = (statusCode: number): boolean =>
  isMatchStarted(statusCode) && !isMatchEnded(statusCode);

export const isMatchCancelled = (statusCode: number): boolean =>
  statusCode === 70;

export const isMatchWinByForfeit = (statusCode: number): boolean =>
  statusCode === 91;
