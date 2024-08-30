import { Button, Dialog, DialogTitle } from "@mui/material";
import { game } from "../global.types";

const NewRoundDialog = ({
  open,
  setOpen,
  game,
}: {
  open: boolean;
  setOpen: any;
  game: game;
}) => {
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
        <Button variant="contained" onClick={() => setOpen(false)}>
          Mentés
        </Button>
      </div>
    </Dialog>
  );
};

export default NewRoundDialog;
