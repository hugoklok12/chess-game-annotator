import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Page from "../../components/layout/Page";
import { trpc } from "../../utils/trpc";

const Game: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const game = trpc.game.getOne.useQuery(id as string);
  // const [learning, setLearning] = useState<string>(game.data?.learning || "");

  const tags = trpc.tag.getAll.useQuery();
  const mutation = trpc.game.addOrUpdateLearnings.useMutation();
  const initialTagIds = game.data?.tags.map((tag) => tag.id) || [];
  const [chosenTagIds, setChosenTagIds] = useState<string[]>(initialTagIds);

  const addOrUpdateLearnings = async () => {
    await mutation.mutate({
      gameId: id as string,
      tagIds: [...chosenTagIds],
    });
  };

  return (
    <>
      <Head>
        <title>Modify game</title>
      </Head>
      <Page>
        <>
          <p className="text-white">Add your learnings here</p>
          {/* <input
            type="textarea"
            className="mt-2 h-48 w-1/2 bg-black text-white"
            value={learning}
          /> */}
          {/* <select
            onChange={(e) => setChosenTagId(e.target.value)}
            className="mt-2 h-10 w-1/2 bg-black text-white"
          >
            {tags.data?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select> */}
          <span className="isolate inline-flex rounded-md shadow-sm">
            {tags.data?.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onClick={() => setChosenTagIds([...chosenTagIds, tag.id])}
              >
                {tag.name}
              </button>
            ))}
          </span>

          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={addOrUpdateLearnings}
          >
            Add learning
          </button>
        </>
      </Page>
    </>
  );
};

export default Game;
