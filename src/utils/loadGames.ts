export const loadGames = async () => {
  const loadedGames = await fetch(
    "https://api.chess.com/pub/player/kaasboom/games/2022/12"
  ).then((res) => res.json());

  return loadedGames;
};
