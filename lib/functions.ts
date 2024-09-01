import { player, round } from "../screens/global.types";

export const calculateScorediff = ({
  round,
  player,
}: {
  round: round;
  player: player;
}) => {
  const guess = round[player.playerId].guess;
  const result = round[player.playerId].result;
  if (guess !== undefined && result !== undefined) {
    return guess == result
      ? 10 + guess * 2
      : Math.abs((guess || 0) - (result || 0)) * -2;
  } else {
    return 0;
  }
};

export const calculateScore = ({
  player,
  rounds,
}: {
  player: player;
  rounds: round[];
}) => {
  var result: number = 0;
  rounds.forEach((round) => {
    result += calculateScorediff({ round, player });
  });
  return result;
};
