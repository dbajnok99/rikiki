import { RootState } from "@/app/store";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";

const Standings = () => {
  const { players } = useSelector((state: RootState) => state.Game);
  const orderedPlayers = orderBy(players, "score", "desc");
  return (
    <>
      {orderedPlayers.map((player, index) => {
        return (
          <>
            {index + 1}. {player.playerName}: {player.score}
            <br />
          </>
        );
      })}
    </>
  );
};

export default Standings;
