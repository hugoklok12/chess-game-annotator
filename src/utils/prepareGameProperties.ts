import type { Game } from "@prisma/client";
import type { ChessComGame, Color } from "../types/ChessComAPI";
import { env } from "../env/client.mjs";

export const prepareGameProperties = (game: ChessComGame) => {
  const opponentsColor = getOpponentsColor(game.black);

  const gameProperties: Game = {
    id: game.uuid,
    url: game.url,
    fen: game.fen,
    opening: extractOpeningFromPgn(game.pgn),
    learning: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    tagId: null,
    opponentName: game[opponentsColor].username,
    opponentRating: game[opponentsColor].rating,
  };

  return gameProperties;
};

const extractOpeningFromPgn = (pgn: string): string => {
  const prefixLength = "https://www.chess.com/openings/".length;
  // prefixLength is added to go the end of the string
  const openingPos =
    pgn.search("https://www.chess.com/openings/") + prefixLength;
  const pgnAfterOpeningPos = pgn.substring(openingPos, pgn.length);
  const openingWithDashes = pgnAfterOpeningPos.substring(
    0,
    pgnAfterOpeningPos.indexOf('"')
  );
  const opening = openingWithDashes.replace(/-/g, " ").split(".")[0] ?? "";
  return opening;
};

const getOpponentsColor = (black: Color): "white" | "black" => {
  return black.username === env.NEXT_PUBLIC_PLAYER_USERNAME ? "white" : "black";
};
