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
import { calculateScore, calculateScorediff } from "@/lib/functions";

const ScoreBoard = () => {
  const { players, rounds } = useSelector((state: RootState) => state.Game);

  const ScoreRow = ({ round }: { round: round }) => {
    return (
      <>
        {players.map((player) => {
          const scoreChange = calculateScorediff({ round, player });
          const guess = round[player.playerId]?.guess;
          const result = round[player.playerId]?.result;
          return (
            <TableCell
              align="center"
              key={`rowCell_${player.playerId}`}
              style={{
                border: "1px solid grey",
                padding: "6px",
              }}
            >
              <div
                style={{
                  borderRadius: "3px",
                  display: "inline-block",
                  paddingInline: "5px",
                }}
              >
                {guess !== undefined ? `Tipp:${guess}` : ""}
              </div>
              <br />
              <div
                style={{
                  borderRadius: "3px",
                  display: "inline-block",
                  paddingInline: "5px",
                }}
              >
                {result !== undefined ? `Ütés:${result}` : ""}
              </div>
              <br />
              <div
                style={{
                  background: scoreChange > 0 ? "lightgreen" : "#f1807e",
                  borderRadius: "3px",
                  display: "inline-block",
                  paddingInline: "5px",
                  fontWeight: "bold",
                }}
              >
                {guess !== undefined && result !== undefined
                  ? scoreChange > 0
                    ? `+${scoreChange}`
                    : scoreChange
                  : ""}
              </div>
            </TableCell>
          );
        })}
      </>
    );
  };

  return (
    <div style={{ display: "inline-flex" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "lightgray" }}>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  border: "1px solid grey",
                  fontWeight: "bold",
                  padding: "6px",
                }}
              />
              {players.map((player) => {
                return (
                  <TableCell
                    align="center"
                    key={`headerCell_${player.playerId}`}
                    style={{
                      border: "1px solid grey",
                      fontWeight: "bold",
                      padding: "6px",
                    }}
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
                <TableCell align="center" style={{ padding: "6px" }}>
                  {round.roundId}. kör
                </TableCell>
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
              <TableCell
                align="center"
                style={{
                  padding: "6px",
                  border: "1px solid grey",
                  fontWeight: "bold",
                }}
              >
                Összesen
              </TableCell>
              {players.map((player) => {
                return (
                  <TableCell
                    align="center"
                    key={`totalCell_${player.playerId}`}
                    style={{
                      border: "1px solid grey",
                      fontWeight: "bold",
                      padding: "6px",
                    }}
                  >
                    {calculateScore({ player, rounds })}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ScoreBoard;
