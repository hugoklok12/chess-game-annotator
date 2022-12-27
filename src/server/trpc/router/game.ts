import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { loadGames } from "../../../utils/loadGames";
import { prepareGameProperties } from "../../../utils/prepareGameProperties";
import type { LichessGame } from "../../../types/LichessAPI";

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
  // getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.prisma.game.findUnique({ where: { id: input } });
  // }),
  load: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const games = await loadGames();

    const savedGameIds = await prisma.game.findMany({
      select: {
        id: true,
      },
    });

    games.forEach(async (game: LichessGame) => {
      if (!savedGameIds.includes({ id: game.id })) {
        const gameData = prepareGameProperties(game);
        await prisma.game.create({
          data: gameData,
        });
      }
    });

    return prisma.game.findMany();
  }),
  addOrUpdateLearnings: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
        tagIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { gameId, tagIds } = input;

      const game = await prisma.game.findUnique({
        where: { id: gameId },
      });

      console.log(tagIds);

      if (game) {
        await prisma.game.update({
          where: { id: gameId },
          data: {
            tags: {
              connect: {
                id: tagIds[0],
              },
            },
          },
        });
      }
    }),
});
