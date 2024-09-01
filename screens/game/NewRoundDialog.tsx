import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { game } from "../global.types";
import { useState } from "react";
import { storeGameStateChange, storeRoundChanges } from "./GameSlice";
import { useDispatch } from "react-redux";
import { findIndex } from "lodash";
import { player } from "../global.types";

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

  var checkIfIncorrect = () => {
    var roundIndex = findIndex(game.rounds, {
      roundId: game.currentRound,
    });
    var bool = false;
    game.players.forEach((player) => {
      const guess = game.rounds[roundIndex]?.[player.playerId]?.guess;
      if (guess === undefined || guess < 0 || guess > 20) {
        bool = true;
      }
    });
    return bool;
  };

  const InputLine = ({ player, index }: { player: player; index: number }) => {
    var roundIndex = findIndex(game.rounds, {
      roundId: game.currentRound,
    });
    console.log(
      "game.rounds[roundIndex]?.[player.playerId]?.guess = ",
      game.rounds[roundIndex]?.[player.playerId]?.guess
    );
    console.log("player", player.playerId);
    console.log("roundIndex", roundIndex);
    const [value, setValue] = useState(
      game.rounds[roundIndex]?.[player.playerId]?.guess === undefined
        ? ""
        : game.rounds[roundIndex][player.playerId].guess
    );

    return (
      <div key={"guess_" + index}>
        {player.playerName}:
        <TextField
          label="Tipp"
          variant="outlined"
          type="number"
          value={value}
          slotProps={{ input: { inputProps: { min: 0, max: 20 } } }}
          error={
            value !== undefined && (Number(value) < 0 || Number(value) > 20)
          }
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => {
            dispatch(
              storeRoundChanges({
                roundId: game.currentRound || 1,
                playerId: player.playerId,
                guess: value === undefined ? value : Number(value),
              })
            );
          }}
        />
      </div>
    );
  };

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
          return (
            <div key={"guessInputLine_" + index}>
              <InputLine player={player} index={index} />
            </div>
          );
        })}
        <Button
          variant="contained"
          disabled={checkIfIncorrect()}
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
