import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { env } from "../env/client.mjs";
import Page from "../components/layout/Page";
import GameTagList from "../components/ui/GameTagList";

const Home: NextPage = () => {
  const { data } = trpc.game.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Page name={`${env.NEXT_PUBLIC_PLAYER_USERNAME}'s games`}>
        <>
          <div className="divide-y">
            {data &&
              data.map((game) => (
                <Link
                  className="flex gap-2 rounded p-2 py-5 hover:bg-slate-900"
                  key={game.id}
                  href={`/game/${game.id}`}
                >
                  <div className="p-2">
                    <Image
                      src={`https://fen2image.chessvision.ai/${game.fen}`}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                  <div className="flex w-full flex-col gap-y-4">
                    <div className="flex w-full flex-row">
                      <p className="font-bold text-white">
                        {env.NEXT_PUBLIC_PLAYER_USERNAME} vs {game.opponentName}{" "}
                        ({game.opponentRating})
                      </p>
                      <span className="px-1 text-white">&#8226;</span>
                      <p className="text-gray-400">{game.opening}</p>
                      <span className="px-1 text-white">&#8226;</span>
                      {game.result === "Win" && (
                        <p className="text-green-400">{game.result}</p>
                      )}
                      {game.result === "Loss" && (
                        <p className="text-red-400">{game.result}</p>
                      )}
                      {game.result === "Draw" && (
                        <p className="text-gray-400">{game.result}</p>
                      )}
                      <GameTagList tags={game.tags} />
                    </div>
                    <p className="italic text-gray-200">{game.learning}</p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      </Page>
    </>
  );
};

export default Home;
