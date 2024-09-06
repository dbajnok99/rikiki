import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import PlayersDialog from "./PlayersDialog";
import ScoreBoard from "./Scoreboard";
import NewRoundDialog from "./NewRoundDialog";
import { storeGameStateChange, storeNewRound } from "./GameSlice";
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

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewRoundDialog, setOpenNewRoundDialog] = useState(false);
  const [openEndRoundDialog, setOpenEndRoundDialog] = useState(false);

  useEffect(() => {
    dispatch(storeAutoSave({ gameId, players, rounds, currentRound, state }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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

      <ScoreBoard />
      <Standings />
    </main>
  );
};

export default GamePageLayout;
