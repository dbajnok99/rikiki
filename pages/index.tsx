import { RootState } from "@/app/store";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storeNewGame } from "../screens/GlobalSlice";
import { useRouter } from "next/navigation";
import { storeGameData } from "@/screens/game/GameSlice";
import { player } from "@/screens/global.types";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { games } = useSelector((state: RootState) => state.Global);
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
        currentRound: 0,
        state: "setup",
      })
    );
    dispatch(
      storeGameData({
        gameId: newId,
        players: [],
        rounds: [],
        currentRound: 0,
        state: "setup",
      })
    );
    router.push("/game");
  };

  const playerNames = (players: player[]) => {
    var result: string = "";
    if (!players) {
      result = " ";
    } else {
      players.map((player, index) => {
        if (index == 0) {
          result += player.playerName;
        } else {
          result += ", " + player.playerName;
        }
      });
    }
    return result;
  };
  const PreviousGames: React.FC = () => {
    return (
      <div>
        {games.map((game, index) => (
          <div key={index}>
            {game.gameId}: {playerNames(game.players)}
          </div>
        ))}
      </div>
    );
  };
  return (
    <main>
      <Typography variant="h1">Rikiki Számláló</Typography>
      <Button variant="contained" onClick={newGame}>
        Új játék
      </Button>
      <div>
        <Typography variant="h3">Előző játékok:</Typography>
        <PreviousGames />
      </div>
    </main>
  );
}
