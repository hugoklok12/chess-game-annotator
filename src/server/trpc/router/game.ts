import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const gameRouter = router({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   }),
  getAll: publicProcedure.query(({ ctx }) => {
    const data = fetch(
      "https://api.chess.com/pub/player/kaasboom/games/2022/12"
    ).then((res) => res.json());
    return data;
  }),
});
