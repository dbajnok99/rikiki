import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { game } from "../global.types";
import { useState } from "react";
import { storeGameStateChange, storeRoundChanges } from "./GameSlice";
import { useDispatch } from "react-redux";
import { findIndex } from "lodash";

const NewRoundDialog = ({
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
        <DialogTitle>Új kör</DialogTitle>
        Kérlek add meg mindenki tippjét:
        {game.players.map((player, index) => {
          var roundIndex = findIndex(game.rounds, {
            roundId: game.currentRound,
          });
          console.log(game.rounds[roundIndex][player.playerId].guess);
          const [value, setValue] = useState(
            roundIndex > 0
              ? game.rounds[roundIndex][player.playerId].guess
              : undefined
          );
          return (
            <div key={"guess_" + index}>
              {player.playerName}:
              <TextField
                label="Tipp"
                variant="outlined"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                onBlur={(e) => {
                  dispatch(
                    storeRoundChanges({
                      roundId: game.currentRound || 1,
                      playerId: player.playerId,
                      guess: Number(e.target.value),
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
            dispatch(storeGameStateChange("playing"));
          }}
        >
          Mentés
        </Button>
      </div>
    </Dialog>
  );
};

export default NewRoundDialog;
