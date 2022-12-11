// import type { ChessComGame } from "../types/ChessComAPI";
import { env } from "../env/server.mjs";

export const loadGames = () => {
  const loadedGames = fetch(
    `https://api.chess.com/pub/player/${env.PLAYER_USERNAME}/games/2022/12`
  ).then((res) => res.json());

  return loadedGames;
};
