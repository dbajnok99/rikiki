import { RootState } from "@/app/store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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

  const loadGame = (id: number) => {
    var index = findIndex(games, { gameId: id });
    dispatch(storeGameData(games[index]));
    router.push("/game");
  };

  const stateName = (state: string) => {
    if (state == "setup") return "Előkészítés";
    if (state == "ready to guess") return "Tippelés";
    if (state == "playing") return "Játék folyamatban";
    if (state == "end of round") return "Kör vége";
    if (state == "end of game") return "Játék vége";
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
            {games.map((game, index) => (
              <TableRow
                key={index + "previousGames_row"}
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
