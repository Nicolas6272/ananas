export type User = {
  userId: string;
  username: string;
};

export type Player = {
  firstname: string;
  lastname: string;
  age: number;
};

export type Match = {
  player1: string;
  player1Score: {
    current: number;
    display: number;
    period1: number;
    period2: number;
    point: string;
  };
  player2: string;
  player2Score: {
    current: number;
    display: number;
    period1: number;
    period2: number;
    point: string;
  };
};
