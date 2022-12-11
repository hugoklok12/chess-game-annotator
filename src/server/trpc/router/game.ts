import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { loadGames } from "../../../utils/loadGames";
import { prepareGameProperties } from "../../../utils/prepareGameProperties";
import type { ChessComGame } from "../../../types/ChessComAPI";

export const gameRouter = router({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany();
  }),
  load: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const { games } = await loadGames();
    const savedGameIds = await prisma.game.findMany({
      select: {
        id: true,
      },
    });

    games.forEach(async (game: ChessComGame) => {
      if (!savedGameIds.includes({ id: game.uuid })) {
        const gameData = prepareGameProperties(game);
        await prisma.game.create({
          data: gameData,
        });
      }
    });

    return prisma.game.findMany();
  }),
});
