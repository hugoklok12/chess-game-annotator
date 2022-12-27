interface Props {
  name: string;
}

const tagColors: Record<string, string> = {
  "Own blunder": "bg-red-200 text-red-900",
  "Opponent blunder": "bg-orange-200 text-orange-900",
  Endgame: "bg-blue-100 text-blue-800",
  Tactical: "bg-purple-100 text-purple-800",
  Insightful: "bg-green-100 text-green-800",
  Positional: "bg-yellow-100 text-yellow-800",
};

const GameTag = ({ name }: Props) => {
  return (
    <span
      className={`${
        tagColors[name] || ""
      } rounded-full px-2.5 py-0.5 text-sm font-medium`}
    >
      {name}
    </span>
  );
};

export default GameTag;
