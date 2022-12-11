export interface ChessComGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  accuracies: Accuracies;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: Color;
  black: Color;
}

interface Accuracies {
  white: number;
  black: number;
}

interface Color {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
}
