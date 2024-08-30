import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { uniqBy } from "lodash";
import { storeUpdateGame } from "@/screens/GlobalSlice";
import PlayersDialog from "./PlayersDialog";
import ScoreBoard from "./Scoreboard";
import NewRoundDialog from "./NewRoundDialog";

const GamePageLayout = () => {
  const dispatch = useDispatch();
  const { gameId, players, rounds } = useSelector(
    (state: RootState) => state.Game
  );

  const checkIfCorrect = () => {
    if (players.length < 2) return false;
    players.forEach((player) => {
      if (player.playerName == "") return false;
    });
    if (uniqBy(players, (player) => player.playerName).length != players.length)
      return false;
    return true;
  };

  const [openEditDialog, setOpenEditDialog] = useState(!checkIfCorrect());
  const [openNewRoundDialog, setOpenNewRoundDialog] = useState(false);

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    dispatch(
      storeUpdateGame({ gameId: gameId, players: players, rounds: rounds })
    );
  };

  return (
    <main>
      <Button variant="contained" onClick={() => setOpenEditDialog(true)}>
        Szerkesztés
      </Button>
      <Button variant="contained" onClick={() => setOpenNewRoundDialog(true)}>
        Új kör
      </Button>
      <PlayersDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        correct={checkIfCorrect()}
        game={{ gameId, players, rounds }}
      />
      <NewRoundDialog
        open={openNewRoundDialog}
        setOpen={setOpenNewRoundDialog}
        game={{ gameId, players, rounds }}
      />

      <ScoreBoard />
    </main>
  );
};

export default GamePageLayout;
