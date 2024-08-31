import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { uniqBy } from "lodash";
import PlayersDialog from "./PlayersDialog";
import ScoreBoard from "./Scoreboard";
import NewRoundDialog from "./NewRoundDialog";
import {
  storeGameData,
  storeGameStateChange,
  storeNewRound,
} from "./GameSlice";
import EndRoundDialog from "./EndRoundDialog";

const GamePageLayout = () => {
  const dispatch = useDispatch();
  const { gameId, players, rounds, currentRound, state } = useSelector(
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
  const [openEndRoundDialog, setOpenEndRoundDialog] = useState(false);

  const handleOpenNewRound = (open: boolean) => {
    setOpenEndRoundDialog(open);
  };

  return (
    <main>
      {state == "setup" ? (
        <>
          <Button variant="contained" onClick={() => setOpenEditDialog(true)}>
            Szerkesztés
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(storeGameStateChange("ready to guess"));
            }}
          >
            Játék kezdése
          </Button>
          <PlayersDialog
            open={openEditDialog}
            setOpen={setOpenEditDialog}
            correct={checkIfCorrect()}
            game={{ gameId, players, rounds }}
          />
        </>
      ) : (
        <></>
      )}

      {["ready to guess", "end of round"].includes(state || "") ? (
        <>
          <Button
            variant="contained"
            onClick={() => {
              setOpenNewRoundDialog(true);
              dispatch(storeNewRound((currentRound || 0) + 1));
            }}
          >
            Új kör
          </Button>
          <NewRoundDialog
            open={openNewRoundDialog}
            setOpen={handleOpenNewRound}
            game={{ gameId, players, rounds, currentRound }}
          />
        </>
      ) : (
        <></>
      )}

      {state == "playing" ? (
        <>
          <Button
            variant="contained"
            onClick={() => setOpenEndRoundDialog(true)}
          >
            Kör befejezése
          </Button>
          <EndRoundDialog
            open={openEndRoundDialog}
            setOpen={handleOpenNewRound}
            game={{ gameId, players, rounds, currentRound }}
          />
        </>
      ) : (
        <></>
      )}

      <ScoreBoard />
    </main>
  );
};

export default GamePageLayout;
