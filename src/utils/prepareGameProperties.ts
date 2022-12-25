import type { Game } from "@prisma/client";
import type { LichessGame, Color, Winner } from "../types/LichessAPI";
import { env } from "../env/client.mjs";
import { Chess } from "chess.js";

export const prepareGameProperties = (game: LichessGame) => {
  const opponentsColor = getOpponentsColor(game.players.black);

  const gameProperties: Game = {
    id: game.id,
    url: `https://lichess.org/${game.id}`,
    fen: getFenFromPgn(game.pgn),
    opening: game.opening.name,
    learning: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    tagId: null,
    opponentName: game.players[opponentsColor].user.name,
    opponentRating: game.players[opponentsColor].rating,
    result:
      game.status === "draw"
        ? "draw"
        : getResult(game.players.black, game.winner),
  };

  return gameProperties;
};

const getOpponentsColor = (black: Color): "white" | "black" => {
  return black.user.name === env.NEXT_PUBLIC_PLAYER_USERNAME
    ? "white"
    : "black";
};

const getFenFromPgn = (pgn: string): string => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  return chess.fen();
};

const getResult = (black: Color, winner: Winner): string => {
  const opponentsColor = getOpponentsColor(black);
  return opponentsColor === winner ? "Loss" : "Win";
};
