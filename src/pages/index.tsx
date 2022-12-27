import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { env } from "../env/client.mjs";
import Page from "../components/layout/Page";
import GameTag from "../components/ui/GameTag";

const Home: NextPage = () => {
  const { data } = trpc.game.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Page>
        <>
          {data &&
            data.map((game) => (
              <div
                className="flex gap-2 border-b border-b-gray-400 py-5"
                key={game.id}
              >
                <Link href={game.url} target="_blank">
                  <Image
                    src={`https://fen2image.chessvision.ai/${game.fen}`}
                    width={200}
                    height={200}
                    alt=""
                  />
                </Link>
                <div className="flex w-full flex-col gap-y-4">
                  <div className="flex w-full flex-row">
                    <p className="font-bold text-white">
                      {env.NEXT_PUBLIC_PLAYER_USERNAME} vs {game.opponentName} (
                      {game.opponentRating})
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
                    <div className="ml-auto">
                      {game.tags.map((tag) => (
                        <GameTag key={tag.id} name={tag.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    {game.learning !== "" ? (
                      <p>{game.learning}</p>
                    ) : (
                      <div className="flex grow items-center">
                        <Link
                          href={`/game/${game.id}`}
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add learning
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </>
      </Page>
    </>
  );
};

export default Home;
