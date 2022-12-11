// import type { ChessComGame } from "../types/ChessComAPI";

export const loadGames = () => {
  const loadedGames = fetch(
    "https://api.chess.com/pub/player/kaasboom/games/2022/12"
  ).then((res) => res.json());

  return loadedGames;
};
