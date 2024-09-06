import {
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUpdateGame } from "../GlobalSlice";
import {
  storeNewPlayer,
  storeDeletePlayer,
  storeChangePlayerNames,
} from "./GameSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RootState } from "@/app/store";
import { uniqBy } from "lodash";

const PlayersDialog = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const dispatch = useDispatch();
  const { gameId, players, rounds } = useSelector(
    (state: RootState) => state.Game
  );

  const getInitialValues = () => {
    var result: {
      [key: number]: string | undefined;
    } = {};
    players.forEach((player) => {
      result[player.playerId] = player.playerName;
    });
    return result;
  };

  const checkIfCorrect = () => {
    var names: (string | undefined)[] = [];
    var bool = true;
    players.forEach((player) => {
      const name = inputValues[player.playerId];
      if (name === undefined) {
        bool = false;
      }
      names.push(name);
    });
    if (
      names.length < 2 ||
      uniqBy(names, (name) => name).length != names.length
    ) {
      bool = false;
    }
    return bool;
  };

  const [inputValues, setInputValues] = useState<{
    [key: number]: string | undefined;
  }>(getInitialValues());

  const handleInputChange = ({
    playerId,
    value,
  }: {
    playerId: number;
    value?: string;
  }) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [playerId]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(storeChangePlayerNames(inputValues));
    dispatch(
      storeUpdateGame({
        gameId: gameId,
        players: players,
        rounds: rounds,
      })
    );
  };

  const getHighestPlayerId = () => {
    return players.length != 0
      ? players.reduce((max, player) => {
          return player.playerId > max.playerId ? player : max;
        }, players[0]).playerId + 1
      : 2;
  };

  const newLine = () => {
    if (players.length == 0) {
      dispatch(
        storeNewPlayer({
          playerId: 1,
          playerName: "",
          score: 0,
        })
      );
    }
    dispatch(
      storeNewPlayer({
        playerId: getHighestPlayerId(),
        playerName: "",
        score: 0,
      })
    );
  };

  const deleteLine = (id: number) => {
    if (players.length > 0) {
      dispatch(storeDeletePlayer(id));
    }
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
          Új játék kezdése
        </DialogTitle>
        Játékosok hozzáadása:
        {players.length == 0 ? (
          <div key={0}>
            <div
              className="inputLine"
              style={{ marginBlock: "5px" }}
              key={"test_" + 0}
            >
              1.
              <div>
                <TextField
                  label="Név"
                  variant="outlined"
                  style={{ width: "80%" }}
                  value={inputValues[1]}
                  onChange={(e) =>
                    handleInputChange({
                      playerId: 1,
                      value: e.target.value ? e.target.value : undefined,
                    })
                  }
                />
                <IconButton
                  aria-label="törlés"
                  color="error"
                  onClick={() => deleteLine(1)}
                  disabled={players.length < 2}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {players.map((player, index) => (
          <div key={index}>
            <div
              className="inputLine"
              style={{ marginBlock: "5px" }}
              key={"test_" + index}
            >
              {index + 1 || 1}.
              <div>
                <TextField
                  label="Név"
                  variant="outlined"
                  style={{ width: "80%" }}
                  value={inputValues[player.playerId]}
                  onChange={(e) =>
                    handleInputChange({
                      playerId: player.playerId,
                      value: e.target.value ? e.target.value : undefined,
                    })
                  }
                />
                <IconButton
                  aria-label="törlés"
                  color="error"
                  onClick={() => deleteLine(player.playerId)}
                  disabled={players.length < 2}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
        <Button
          variant="outlined"
          color="success"
          onClick={newLine}
          startIcon={<AddOutlinedIcon />}
          style={{ margin: "6px" }}
        >
          Új játékos
        </Button>
        <br />
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            disabled={!checkIfCorrect()}
          >
            Mentés
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default PlayersDialog;
