import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { game } from "../global.types";
import { useState } from "react";
import {
  storeChangePlayerData,
  storeGameStateChange,
  storeRoundChanges,
  storeUpdateCurrentRound,
} from "./GameSlice";
import { useDispatch } from "react-redux";
import { findIndex } from "lodash";
import { player } from "../global.types";
import { calculateScore } from "@/lib/functions";

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

  var roundIndex = findIndex(game.rounds, {
    roundId: game.currentRound,
  });
  var checkIfIncorrect = () => {
    var bool = false;
    game.players.forEach((player) => {
      const result = game.rounds[roundIndex]?.[player.playerId]?.result;
      if (result === undefined || result < 0 || result > 20) {
        bool = true;
      }
    });
    return bool;
  };
  const InputLine = ({ player, index }: { player: player; index: number }) => {
    const [value, setValue] = useState(
      game.rounds[roundIndex]?.[player.playerId]?.result === undefined
        ? ""
        : game.rounds[roundIndex][player.playerId].result
    );
    return (
      <div key={"guess_" + index} className="inputLine">
        {player.playerName}:
        <TextField
          label="Ütés"
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
                result: Number(value),
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
        <DialogTitle align="center" variant="h3">
          Kör vége
        </DialogTitle>
        Kérlek add meg ki mennyit ütött:
        {game.players.map((player, index) => {
          return (
            <div key={"resultInputLine_" + index}>
              <InputLine player={player} index={index} />
            </div>
          );
        })}
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            disabled={checkIfIncorrect()}
            onClick={() => {
              setOpen(false);
              dispatch(storeGameStateChange("end of round"));
              dispatch(storeUpdateCurrentRound((game.currentRound || 0) + 1));
              game.players.forEach((player) => {
                dispatch(
                  storeChangePlayerData({
                    playerId: player.playerId,
                    playerName: player.playerName,
                    score: calculateScore({
                      player: player,
                      rounds: game.rounds,
                    }),
                  })
                );
              });
            }}
          >
            Befejezés
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default EndRoundDialog;
