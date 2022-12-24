import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

const Game: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const game = trpc.game.getOne.useQuery(id as string);
  const [learning, setLearning] = useState<string>(game.data?.learning || "");

  // const tags = trpc.tag.getAll.useQuery();
  // setLearning(game.data?.learning || "");

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-20 mx-auto h-4/6 max-w-7xl rounded bg-black">
        <header className="border-b border-b-gray-400 p-5">
          <nav className="flex w-full flex-row justify-between gap-4">
            <Link className="text-white" href={"/"}>
              Chess Game Annotator
            </Link>
            <button className="text-white">Refresh games</button>
          </nav>
        </header>
        <main className="flex flex-col p-5">
          <p className="text-white">Add your learnings here</p>
          <input
            type="textarea"
            className="mt-2 h-48 w-1/2 bg-black text-white"
            value={learning}
          />
          <select className="mt-2 h-10 w-1/2 bg-black text-white">
            <option value="good">Good</option>
            <option value="bad">Bad</option>
          </select>
        </main>
      </div>
    </>
  );
};

export default Game;
