import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { game, player } from "../global.types";
import { filter, findIndex } from "lodash";
const initialState: game = {
  gameId: 0,
  players: [],
  rounds: [],
};

const GameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    storeGameId: (state, { payload }: PayloadAction<number>) => {
      state.gameId = payload;
    },
    storeGameData: (state, { payload }: PayloadAction<game>) => {
      state.gameId = payload.gameId;
      state.players = payload.players;
      state.rounds = payload.rounds;
    },
    storePlayers: (state, { payload }: PayloadAction<player[]>) => {
      state.players = payload;
    },
    storeNewPlayer: (state, { payload }: PayloadAction<player>) => {
      state.players.push(payload);
    },
    storeDeletePlayer: (state, { payload }: PayloadAction<number>) => {
      state.players = filter(state.players, (player: player) => {
        return player.playerId !== payload;
      });
    },
    storeChangePlayerData: (state, { payload }: PayloadAction<player>) => {
      var index = findIndex(state.players, { playerId: payload.playerId });
      state.players.splice(index, 1, payload);
    },
  },
});

export const {
  storeGameId,
  storePlayers,
  storeGameData,
  storeNewPlayer,
  storeDeletePlayer,
  storeChangePlayerData,
} = GameSlice.actions;

export default GameSlice.reducer;
