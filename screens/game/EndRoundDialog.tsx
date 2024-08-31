import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { game } from "../global.types";
import { useState } from "react";
import { storeGameStateChange, storeRoundChanges } from "./GameSlice";
import { useDispatch } from "react-redux";
import { findIndex } from "lodash";

const EndRoundDialog = ({
  open,
  setOpen,
  game,
}: {
  open: boolean;
  setOpen: any;
  game: game;
}) => {
  const dispatch = useDispatch();

  return (
    <Dialog open={open}>
      <div
        style={{
          padding: "20px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <DialogTitle>Kör vége</DialogTitle>
        Kérlek add meg mindenki eredményét:
        {game.players.map((player, index) => {
          var roundIndex = findIndex(game.rounds, {
            roundId: game.currentRound,
          });
          const [value, setValue] = useState(
            game.currentRound
              ? game.rounds[roundIndex][player.playerId].result
              : 0
          );
          return (
            <div key={"guess_" + index}>
              {player.playerName}:
              <TextField
                label="Eredmény"
                variant="outlined"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                onBlur={(e) => {
                  dispatch(
                    storeRoundChanges({
                      roundId: game.currentRound || 1,
                      playerId: player.playerId,
                      result: Number(e.target.value),
                    })
                  );
                }}
              />
            </div>
          );
        })}
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            dispatch(storeGameStateChange("end of round"));
            //dispatch(storeUpdateScores())
          }}
        >
          Mentés
        </Button>
      </div>
    </Dialog>
  );
};

export default EndRoundDialog;
