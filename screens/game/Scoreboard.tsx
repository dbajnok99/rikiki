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
import { player, round } from "../global.types";
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  const { gameId, players, rounds } = useSelector(
    (state: RootState) => state.Game
  );
  const calculateScorediff = ({
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

  const ScoreRow = ({ round }: { round: round }) => {
    return (
      <>
        {players.map((player, index) => {
          const scoreChange = calculateScorediff({ round, player });
          return (
            <TableCell
              align="center"
              key={"rowCell" + index + "_" + player.playerId}
              style={{ border: "1px solid grey", fontWeight: "bold" }}
            >
              <div
                style={{
                  background: scoreChange > 0 ? "lightgreen" : "#f1807e",
                  borderRadius: "3px",
                  display: "inline-block",
                  paddingInline: "5px",
                }}
              >
                {round[player.playerId].guess !== undefined &&
                round[player.playerId].result !== undefined
                  ? scoreChange > 0
                    ? "+" + scoreChange
                    : scoreChange
                  : ""}
              </div>
            </TableCell>
          );
        })}
      </>
    );
  };

  const calculateScore = (player: player) => {
    var result: number = 0;
    rounds.forEach((round) => {
      result += calculateScorediff({ round, player });
    });
    return result;
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
          <TableRow
            key={"scores"}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              borderTop: "2px solid grey",
            }}
          >
            <TableCell align="right">Pontok</TableCell>
            {players.map((player, index) => {
              return (
                <TableCell
                  align="center"
                  key={"headerCell" + index}
                  style={{ border: "1px solid grey", fontWeight: "bold" }}
                >
                  {calculateScore(player)}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard;
