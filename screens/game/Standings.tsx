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
import { orderBy } from "lodash";
import { useSelector } from "react-redux";

const Standings = () => {
  const { players } = useSelector((state: RootState) => state.Game);
  const orderedPlayers = orderBy(players, "score", "desc");
  return (
    <div style={{ margin: "10px", display: "inline-flex" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "lightgray" }}>
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                key={"headerCell"}
                style={{
                  border: "1px solid grey",
                  fontWeight: "bold",
                  padding: "6px",
                }}
              >
                Állás
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedPlayers.map((player, index) => {
              return (
                <TableRow key={`leaderboard_row_${player.playerId}`}>
                  <TableCell
                    align="center"
                    style={{
                      padding: "6px",
                    }}
                  >
                    {index + 1}.
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      padding: "6px",
                    }}
                  >
                    {player.playerName}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      padding: "6px",
                    }}
                  >
                    {player.score}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Standings;
