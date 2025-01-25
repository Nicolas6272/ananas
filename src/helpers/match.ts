export const getMatchRoundFormatted = (
  roundInfo: number,
  tournamentNumberOfTeams: number,
): string => {
  switch (roundInfo) {
    case 1:
      return "Finale";
    case 2:
      return "Demi finale";
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
