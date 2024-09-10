import { Typography, Button } from "@mui/material";
import PreviousGames from "./PreviousGames";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { storeGameData } from "./game/GameSlice";
import { storeNewGame } from "./GlobalSlice";
import { RootState } from "@/app/store";

const IndexLayout = () => {
  const { games } = useSelector((state: RootState) => state.Global);
  const dispatch = useDispatch();
  const gameWithHighestID =
    games.length != 0
      ? games.reduce((max, game) => {
          return game.gameId > max.gameId ? game : max;
        }, games[0]).gameId
      : 0;
  const newId = gameWithHighestID + 1;

  const newGame = () => {
    dispatch(
      storeNewGame({
        gameId: newId,
        players: [],
        rounds: [],
        currentRound: 1,
        state: "setup",
      })
    );
    dispatch(
      storeGameData({
        gameId: newId,
        players: [],
        rounds: [],
        currentRound: 1,
        state: "setup",
      })
    );
    router.push("/game");
  };
  return (
    <>
      <Typography align="center" variant="h3" fontWeight={"bold"}>
        Rikiki Számláló
      </Typography>
      <Button variant="contained" onClick={newGame} sx={{ marginBlock: "3%" }}>
        Új játék
      </Button>
      <br />
      <PreviousGames />
    </>
  );
};

export default IndexLayout;
