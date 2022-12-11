import type { Game } from "@prisma/client";
import type { ChessComGame } from "../types/ChessComAPI";

export const prepareGameProperties = (game: ChessComGame) => {
  const gameProperties: Game = {
    id: game.uuid,
    url: game.url,
    fen: game.fen,
    opening: extractOpeningFromPgn(game.pgn),
    learning: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    tagId: null,
  };

  return gameProperties;
};

const extractOpeningFromPgn = (pgn: string): string => {
  /* We add 31 to the index of the opening string because the opening string itself
    is 31 chars long and we want to go the end of the string 
  */
  const openingPos = pgn.search("https://www.chess.com/openings/") + 31;
  const pgnAfterOpeningPos = pgn.substring(openingPos, pgn.length);
  const openingWithDashes = pgnAfterOpeningPos.substring(
    0,
    pgnAfterOpeningPos.indexOf('"')
  );
  const opening = openingWithDashes.replace(/-/g, " ").split(".")[0] ?? "";
  return opening;
};
