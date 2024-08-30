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
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  const { gameId, players, rounds } = useSelector(
    (state: RootState) => state.Game
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "lightgray" }}>
          <TableRow>
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
              <TableCell align="right">{round.guess}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard;
