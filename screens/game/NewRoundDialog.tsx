import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { storeGameStateChange, storeGuesses } from "./GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { findIndex } from "lodash";

const NewRoundDialog = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const dispatch = useDispatch();
  const { players, currentRound, rounds } = useSelector(
    (state: RootState) => state.Game
  );

  const getInitialValues = () => {
    var result: {
      [key: number]: number | undefined;
    } = {};
    var index = findIndex(rounds, { roundId: currentRound });
    players.forEach((player) => {
      result[player.playerId] = rounds[index]?.[player.playerId]?.guess;
    });
    return result;
  };

  const [inputValues, setInputValues] = useState<{
    [key: number]: number | undefined;
  }>({});

  var checkIfIncorrect = () => {
    var bool = false;
    players.forEach((player) => {
      const guess = inputValues[player.playerId];
      if (guess === undefined || guess < 0 || guess > 20) {
        bool = true;
      }
    });
    return bool;
  };

  const handleInputChange = ({
    playerId,
    value,
  }: {
    playerId: number;
    value?: number;
  }) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [playerId]: value,
    }));
  };

  return (
    <Dialog open={open}>
      <div
        style={{
          padding: "20px",
          justifyContent: "center",
          alignContent: "center",
          overflow: "auto",
        }}
      >
        <DialogTitle align="center" variant="h3">
          Új kör
        </DialogTitle>
        Kérlek add meg mindenki tippjét:
        {players.map((player, index) => {
          return (
            <div key={"guessInputLine_" + index}>
              <div key={"guess_" + index} className="inputLine">
                <div style={{ marginBottom: "6px" }}>{player.playerName}:</div>
                <TextField
                  label="Tipp"
                  variant="outlined"
                  type="number"
                  value={inputValues[player.playerId]}
                  slotProps={{ input: { inputProps: { min: 0, max: 20 } } }}
                  error={
                    inputValues[player.playerId] !== undefined &&
                    (Number(inputValues[player.playerId]) < 0 ||
                      Number(inputValues[player.playerId]) > 20)
                  }
                  onChange={(e) =>
                    handleInputChange({
                      playerId: player.playerId,
                      value: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                />
              </div>
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
              dispatch(storeGameStateChange("playing"));
              dispatch(
                storeGuesses({
                  roundId: currentRound || 0,
                  inputValues: inputValues,
                })
              );
            }}
          >
            Mentés
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default NewRoundDialog;
