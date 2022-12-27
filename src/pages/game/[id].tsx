import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Page from "../../components/layout/Page";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import GameTagList from "../../components/ui/GameTagList";
import type { Tag } from "@prisma/client";

const Game: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const game = trpc.game.getOne.useQuery(id as string);
  const tags = trpc.tag.getAll.useQuery();
  const utils = trpc.useContext();

  const initialTags = game.data?.tags || [];
  const [chosenTags, setChosenTags] = useState<Tag[]>(initialTags);
  const [learning, setLearning] = useState<string>(game.data?.learning || "");

  const mutation = trpc.game.updateAnnotations.useMutation();

  const mutateAnnotations = async () => {
    await mutation.mutateAsync({
      gameId: id as string,
      tagIds: getSelectedTagIds(),
      learning,
    });
    utils.invalidate();
    router.back();
  };

  const getSelectedTagIds = () => {
    return chosenTags.map((tag) => tag.id);
  };

  const updateChosenTags = (clickedTag: Tag) => {
    const selectedTagIds = getSelectedTagIds();
    if (selectedTagIds.includes(clickedTag.id)) {
      setChosenTags(chosenTags.filter((tag) => tag.id !== clickedTag.id));
    } else {
      setChosenTags([...chosenTags, clickedTag]);
    }
  };

  return (
    <>
      <Head>
        <title>Modify game</title>
      </Head>
      <Page
        name={`Learnings for game versus ${game.data?.opponentName} (${game.data?.opponentRating})`}
      >
        <>
          <div className="flex gap-2">
            <Link href={game.data?.url || ""} target="_blank">
              <Image
                src={`https://fen2image.chessvision.ai/${game.data?.fen}`}
                width={200}
                height={200}
                alt=""
              />
            </Link>
            <div>
              <div className="mt-1">
                <textarea
                  rows={8}
                  cols={50}
                  className="w-full border border-gray-500 bg-black pl-1 text-white shadow-sm"
                  defaultValue={game.data?.learning}
                  placeholder="Add your learnings here"
                  onChange={(e) => setLearning(e.target.value)}
                />
              </div>
            </div>
            <GameTagList tags={chosenTags} />
          </div>
          {tags.data?.map((tag) => (
            <>
              <label className="text-white">
                <input
                  key={tag.id}
                  type="checkbox"
                  className="m-2"
                  defaultChecked={getSelectedTagIds().includes(tag.id)}
                  onChange={() => updateChosenTags(tag)}
                />
                {tag.name}
              </label>
            </>
          ))}

          <button
            type="button"
            className="mt-2 flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={mutateAnnotations}
          >
            Update annotations
          </button>
        </>
      </Page>
    </>
  );
};

export default Game;
