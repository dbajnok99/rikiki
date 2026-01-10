import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import {
  storeGameStateChange,
  storeResults,
  storeUpdateCurrentRound,
} from "./GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";

const EndRoundDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const { players, currentRound } = useSelector(
    (state: RootState) => state.Game
  );

  const [inputValues, setInputValues] = useState<{
    [key: number]: number | undefined;
  }>({});

  const checkIfIncorrect = () => {
    let hasInvalidValues = false;
    players.forEach((player) => {
      const guess = inputValues[player.playerId];
      if (guess === undefined || guess < 0 || guess > 20) {
        hasInvalidValues = true;
      }
    });
    return hasInvalidValues;
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
          Kör vége
        </DialogTitle>
        Kérlek add meg ki mennyit ütött:
        {players.map((player, index) => {
          return (
            <div key={"resultInputLine_" + index}>
              <div key={"guess_" + index} className="inputLine">
                <div style={{ marginBottom: "6px" }}>{player.playerName}:</div>
                <TextField
                  label="Ütés"
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
              dispatch(storeUpdateCurrentRound((currentRound || 0) + 1));
              dispatch(
                storeResults({
                  roundId: currentRound || 0,
                  inputValues: inputValues,
                })
              );
              dispatch(storeGameStateChange("end of round"));
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
