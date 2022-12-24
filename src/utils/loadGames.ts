import type { LichessGame } from "../types/LichessAPI";
import { env } from "../env/client.mjs";

export const loadGames = (): Promise<LichessGame[]> => {
  const loadedGames = fetch(
    `https://lichess.org/api/games/user/${env.NEXT_PUBLIC_PLAYER_USERNAME}?pgnInJson=true&perfType=blitz,rapid,bullet&opening=true`,
    {
      headers: {
        Accept: "application/x-ndjson",
        "Content-Type": "application/x-ndjson",
      },
    }
  ).then(async (res) => {
    const ndjsonResInText = res.text();
    const jsonResInText =
      "[" +
      (await ndjsonResInText).replace(/\r?\n/g, ",").replace(/,\s*$/, "") +
      "]";
    return (await JSON.parse(jsonResInText)) as LichessGame[];
  });

  return loadedGames;
};
