import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { game, gameState, player, round } from "../global.types";
import { filter, findIndex } from "lodash";
const initialState: game = {
  gameId: 0,
  players: [],
  rounds: [],
  state: "setup",
  currentRound: undefined,
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
      state.state = payload.state;
      state.currentRound = payload.currentRound;
    },
    storeGameStateChange: (state, { payload }: PayloadAction<gameState>) => {
      state.state = payload;
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
    storeNewRound: (state, { payload }: PayloadAction<number>) => {
      state.rounds.push({ roundId: payload });
      var index = findIndex(state.rounds, { roundId: payload });
      state.players.forEach((player) => {
        state.rounds[index][player.playerId] = {
          guess: undefined,
          result: undefined,
        };
      });
    },
    storeUpdateCurrentRound: (state, { payload }: PayloadAction<number>) => {
      state.currentRound = payload;
    },
    storeRoundChanges: (
      state,
      {
        payload,
      }: PayloadAction<{
        roundId: number;
        playerId: number;
        guess?: number;
        result?: number;
      }>
    ) => {
      var index = findIndex(state.rounds, { roundId: payload.roundId });
      if (payload.guess !== undefined)
        state.rounds[index][payload.playerId].guess = payload.guess;
      if (payload.result !== undefined)
        state.rounds[index][payload.playerId].result = payload.result;
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
  storeRoundChanges,
  storeNewRound,
  storeGameStateChange,
  storeUpdateCurrentRound,
} = GameSlice.actions;

export default GameSlice.reducer;
