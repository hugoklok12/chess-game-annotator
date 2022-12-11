import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { loadGames } from "../../../utils/loadGames";

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

    const loadedGames = await loadGames();
    const savedGames = await prisma.game.findMany();

    return data;
  }),
});
