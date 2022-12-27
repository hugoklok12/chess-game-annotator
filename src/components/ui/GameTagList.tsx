import type { Tag } from "@prisma/client";
import GameTag from "./GameTag";

interface Props {
  tags: Tag[];
}

const GameTagList = ({ tags }: Props) => {
  return (
    <div className="ml-auto flex h-full gap-1">
      {tags.map((tag: Tag) => (
        <GameTag key={tag.id} name={tag.name} />
      ))}
    </div>
  );
};

export default GameTagList;
