export interface User {
  name: string;
  title: string;
  patron?: boolean;
  id?: string;
}

export interface Color {
  user: User;
  rating: number;
  ratingDiff: number;
}

export interface Players {
  white: Color;
  black: Color;
}

export interface Opening {
  eco: string;
  name: string;
  ply: number;
}

export interface Clock {
  initial: number;
  increment: number;
  totalTime: number;
}

export interface LichessGame {
  id: string;
  rated: boolean;
  variant: string;
  speed: string;
  perf: string;
  createdAt: number;
  lastMoveAt: number;
  status: string;
  players: Players;
  opening: Opening;
  moves: string;
  pgn: string;
  clock: Clock;
}
