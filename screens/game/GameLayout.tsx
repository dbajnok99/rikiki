import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PlayersDialog from "./PlayersDialog";
import ScoreBoard from "./Scoreboard";
import NewRoundDialog from "./NewRoundDialog";
import { storeGameStateChange, storeNewRound, storeScores } from "./GameSlice";
import EndRoundDialog from "./EndRoundDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { storeAutoSave } from "../GlobalSlice";
import Standings from "./Standings";

const GamePageLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId, players, rounds, currentRound, state } = useSelector(
    (state: RootState) => state.Game
  );

  const [openEditDialog, setOpenEditDialog] = useState(state == "setup");
  const [openEndGameDialog, setOpenEndGameDialog] = useState(false);
  const [openNewRoundDialog, setOpenNewRoundDialog] = useState(false);
  const [openEndRoundDialog, setOpenEndRoundDialog] = useState(false);

  useEffect(() => {
    if (state == "end of round") dispatch(storeScores());
    dispatch(storeAutoSave({ gameId, players, rounds, currentRound, state }));
  }, [currentRound, dispatch, gameId, players, rounds, state]);

  return (
    <main>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "6px" }}
        onClick={() => router.push("/")}
        startIcon={<ArrowBackIcon />}
      >
        Vissza a főoldalra
      </Button>
      <br />
      {state == "setup" || state == undefined ? (
        <>
          <Button variant="contained" onClick={() => setOpenEditDialog(true)}>
            Szerkesztés
          </Button>
          <Button
            variant="contained"
            style={{ margin: "6px" }}
            onClick={() => {
              dispatch(storeGameStateChange("ready to guess"));
              dispatch(storeNewRound(1));
            }}
          >
            Játék kezdése
          </Button>
          <PlayersDialog open={openEditDialog} setOpen={setOpenEditDialog} />
        </>
      ) : (
        <></>
      )}

      {["ready to guess", "end of round"].includes(state || "") ? (
        <>
          <Button
            variant="contained"
            style={{ margin: "6px" }}
            onClick={() => {
              if (currentRound !== undefined && currentRound > 1) {
                dispatch(storeNewRound(currentRound));
              }
              setOpenNewRoundDialog(true);
            }}
          >
            Új kör
          </Button>
          <NewRoundDialog
            open={openNewRoundDialog}
            setOpen={setOpenNewRoundDialog}
          />
          <Button
            variant="contained"
            color="error"
            style={{ margin: "6px" }}
            onClick={() => {
              setOpenEndGameDialog(true);
            }}
          >
            Játék befejezése
          </Button>
          <Dialog
            open={openEndGameDialog}
            onClose={() => setOpenEndGameDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Játék befejezése?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Biztos, hogy be szeretnéd fejezni a játékot?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenEndGameDialog(false)}
              >
                Mégse
              </Button>
              <Button
                variant="contained"
                onClick={() => dispatch(storeGameStateChange("end of game"))}
              >
                Biztos
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <></>
      )}

      {state == "playing" ? (
        <>
          <Button
            variant="contained"
            style={{ margin: "6px" }}
            onClick={() => setOpenEndRoundDialog(true)}
          >
            Kör befejezése
          </Button>
          <EndRoundDialog
            open={openEndRoundDialog}
            setOpen={setOpenEndRoundDialog}
          />
        </>
      ) : (
        <></>
      )}
      <br />

      <ScoreBoard />
      <Standings />
    </main>
  );
};

export default GamePageLayout;
