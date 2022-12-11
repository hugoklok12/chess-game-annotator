import type { ChessComGames } from "../types/ChessComAPI";
import { env } from "../env/client.mjs";

export const loadGames = (): Promise<ChessComGames> => {
  const loadedGames = fetch(
    `https://api.chess.com/pub/player/${env.NEXT_PUBLIC_PLAYER_USERNAME}/games/2022/12`
  ).then((res) => res.json());

  return loadedGames;
};
