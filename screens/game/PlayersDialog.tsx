import { RootState } from "@/app/store";
import { player } from "@/screens/global.types";
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
  storeChangePlayerData,
} from "./GameSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const PlayersDialog = ({
  open,
  setOpen,
  correct,
}: {
  open: boolean;
  setOpen: any;
  correct: boolean;
}) => {
  const dispatch = useDispatch();
  const { gameId, players, rounds } = useSelector(
    (state: RootState) => state.Game
  );

  const handleClose = () => {
    setOpen(false);
    dispatch(
      storeUpdateGame({ gameId: gameId, players: players, rounds: rounds })
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

  const changeName = ({ id, name }: { id: number; name: string }) => {
    dispatch(
      storeChangePlayerData({ playerId: id, playerName: name, score: 0 })
    );
  };

  const InputLine = ({ player, index }: { player: player; index: number }) => {
    const [value, setValue] = useState(player.playerName);

    return (
      <div style={{ width: "100%", marginBlock: "5px" }} key={"test_" + index}>
        {index + 1 || 1}.
        <TextField
          label="Név"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) =>
            dispatch(
              storeChangePlayerData({
                playerId: player.playerId,
                playerName: e.target.value,
                score: 0,
              })
            )
          }
        />
        <IconButton aria-label="új hátékos" color="success" onClick={newLine}>
          <AddOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="törlés"
          color="error"
          onClick={() => deleteLine(player.playerId)}
          disabled={players.length < 2}
        >
          <DeleteForeverIcon />
        </IconButton>
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
        <DialogTitle>Új játék kezdése</DialogTitle>
        Játékosok hozzáadása:
        {players.length == 0 ? (
          <div key={0}>
            <InputLine
              player={{ playerId: 1, playerName: "", score: 0 }}
              index={0}
            />
          </div>
        ) : (
          <></>
        )}
        {players.map((player, index) => (
          <div key={index}>
            <InputLine player={player} index={index} />
          </div>
        ))}
        <Button variant="contained" onClick={handleClose} disabled={!correct}>
          Mentés
        </Button>
      </div>
    </Dialog>
  );
};

export default PlayersDialog;
