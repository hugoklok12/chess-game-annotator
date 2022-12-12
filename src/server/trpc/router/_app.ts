import { router } from "../trpc";
import { gameRouter } from "./game";
import { tagRouter } from "./tag";

export const appRouter = router({
  game: gameRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
