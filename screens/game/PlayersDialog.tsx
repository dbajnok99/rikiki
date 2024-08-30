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
import { game } from "../global.types";

const PlayersDialog = ({
  open,
  setOpen,
  correct,
  game,
}: {
  open: boolean;
  setOpen: any;
  correct: boolean;
  game: game;
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(
      storeUpdateGame({
        gameId: game.gameId,
        players: game.players,
        rounds: game.rounds,
      })
    );
  };

  const getHighestPlayerId = () => {
    return game.players.length != 0
      ? game.players.reduce((max, player) => {
          return player.playerId > max.playerId ? player : max;
        }, game.players[0]).playerId + 1
      : 2;
  };

  const newLine = () => {
    if (game.players.length == 0) {
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
    if (game.players.length > 0) {
      dispatch(storeDeletePlayer(id));
    }
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
        <IconButton
          aria-label="törlés"
          color="error"
          onClick={() => deleteLine(player.playerId)}
          disabled={game.players.length < 2}
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
        {game.players.length == 0 ? (
          <div key={0}>
            <InputLine
              player={{ playerId: 1, playerName: "", score: 0 }}
              index={0}
            />
          </div>
        ) : (
          <></>
        )}
        {game.players.map((player, index) => (
          <div key={index}>
            <InputLine player={player} index={index} />
          </div>
        ))}
        <Button
          variant="outlined"
          color="success"
          onClick={newLine}
          startIcon={<AddOutlinedIcon />}
        >
          Új játékos
        </Button>
        <br />
        <Button variant="contained" onClick={handleClose} disabled={!correct}>
          Mentés
        </Button>
      </div>
    </Dialog>
  );
};

export default PlayersDialog;
