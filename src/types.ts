/// FIREBASE TYPES

export type User = {
  fcmToken: string;
  favoritePlayers: string[];
};

export type FirebaseTournament = {
  id: number;
  name: string;
  surface: string;
  level: string;
  playerSexe: string;
  numberOfTeams: number;
};

export type FirebaseMatch = {
  id: number;
  roundInfo: number;
  stadium?: string;
  startTimestamp: number;
  statusCode: number;
  playerAName: string;
  playerBName: string;
  period1A?: number;
  period2A?: number;
  period3A?: number;
  pointA?: string;
  period1B?: number;
  period2B?: number;
  period3B?: number;
  pointB?: string;
  winnerCode?: number;
};

export type FirebaseTournamentWithMatches = FirebaseTournament & {
  matches: FirebaseMatch[];
};

/// API TYPES

export type ApiTournament = {
  surfaceType: string;
  gender: string;
  numberOfTeams: number;
  uniqueTournament: {
    name: string;
    surface: string;
    level: string;
    slug: string;
    tennisPoints: number;
  };
};

export type ApiMatch = {
  tournament: {
    uniqueTournament: {
      id: number;
    };
  };
  roundInfo: {
    cupRoundType: number;
  };
  id: number;
  startTimestamp: number;
  status: { code: number };
  homeTeam: {
    name: string;
  };
  homeScore: {
    current: number;
    display: number;
    period1: number;
    period2: number;
    period3: number;
    point: string;
  };
  awayTeam: {
    name: string;
  };
  awayScore: {
    current: number;
    display: number;
    period1: number;
    period2: number;
    period3: number;
    point: string;
  };
  winnerCode: number;
};

export type ApiMatchInfo = {
  venue: {
    stadium: {
      name: string;
    };
  };
};
