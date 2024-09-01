import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { game } from "./global.types";
import { findIndex } from "lodash";

interface GlobalState {
  games: game[];
}

const initialState: GlobalState = {
  games: [],
};

const GlobalSlice = createSlice({
  initialState,
  name: "global",
  reducers: {
    storeGames: (state, { payload }: PayloadAction<game[]>) => {
      state.games = payload;
    },
    storeNewGame: (state, { payload }: PayloadAction<game>) => {
      state.games.push(payload);
    },
    storeUpdateGame: (state, { payload }: PayloadAction<game>) => {
      var index = findIndex(state.games, { gameId: payload.gameId });
      state.games.splice(index, 1, payload);
    },
    storeAutoSave: (state, { payload }: PayloadAction<game>) => {
      var index = findIndex(state.games, { gameId: payload.gameId });
      state.games.splice(index, 1, payload);
    },
  },
});

export const { storeGames, storeNewGame, storeUpdateGame, storeAutoSave } =
  GlobalSlice.actions;

export default GlobalSlice.reducer;
