import { RootState } from "@/app/store";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { round } from "../global.types";
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  const { gameId, players, rounds } = useSelector(
    (state: RootState) => state.Game
  );
  const ScoreRow = ({ round }: { round: round }) => {
    return (
      <>
        {players.map((player, index) => {
          const scoreChange =
            round[player.playerId].guess == round[player.playerId].result
              ? 10
              : Math.abs(
                  (round[player.playerId].guess || 0) -
                    (round[player.playerId].result || 0)
                ) * -2;
          return (
            <TableCell
              align="center"
              key={"rowCell" + index + "_" + player.playerId}
              style={{ border: "1px solid grey", fontWeight: "bold" }}
            >
              {scoreChange}
            </TableCell>
          );
        })}
      </>
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: "lightgray" }}>
          <TableRow>
            <TableCell
              align="center"
              key={"headerCell"}
              style={{ border: "1px solid grey", fontWeight: "bold" }}
            ></TableCell>
            {players.map((player, index) => {
              return (
                <TableCell
                  align="center"
                  key={"headerCell" + index}
                  style={{ border: "1px solid grey", fontWeight: "bold" }}
                >
                  {player.playerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round) => (
            <TableRow
              key={round.roundId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{round.roundId}. kör</TableCell>
              <ScoreRow round={round} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard;
