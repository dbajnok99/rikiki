import { RootState } from "@/app/store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { findIndex } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { storeGameData } from "./game/GameSlice";
import { player } from "./global.types";
import { useRouter } from "next/router";

const PreviousGames: React.FC = () => {
  const { games } = useSelector((state: RootState) => state.Global);
  const dispatch = useDispatch();
  const router = useRouter();

  const playerNames = (players: player[]) =>
    players.map((player) => player.playerName).join(", ");

  const loadGame = (id: number) => {
    const index = findIndex(games, { gameId: id });
    if (index < 0) {
      return;
    }
    dispatch(storeGameData(games[index]));
    router.push("/game");
  };

  const stateName = (state: string) => {
    switch (state) {
      case "setup":
        return "Előkészítés";
      case "ready to guess":
        return "Tippelés";
      case "playing":
        return "Játék folyamatban";
      case "end of round":
        return "Kör vége";
      case "end of game":
        return "Játék vége";
      default:
        return "Ismeretlen";
    }
  };

  return (
    <div key={"prevGames"} style={{ display: "inline-flex" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "lightgray" }}>
            <TableRow>
              <TableCell
                colSpan={2}
                align="center"
                key={"headerCell"}
                style={{
                  border: "1px solid grey",
                  fontWeight: "bold",
                  padding: "6px",
                }}
              >
                Előző játékok
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow
                key={game.gameId}
                onClick={() => loadGame(game.gameId)}
                className="previousGameDiv"
              >
                <TableCell
                  align="left"
                  style={{
                    padding: "6px",
                  }}
                >
                  {playerNames(game.players)}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    padding: "6px",
                  }}
                >
                  {stateName(game.state || "")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PreviousGames;
