import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { game, gameState, player, round } from "../global.types";
import { filter, findIndex } from "lodash";
import { calculateScore } from "@/lib/functions";
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

    storeChangePlayerNames: (
      state,
      {
        payload,
      }: PayloadAction<{
        [key: number]: string | undefined;
      }>
    ) => {
      for (const [key, value] of Object.entries(payload)) {
        if (value !== undefined) {
          var index = findIndex(state.players, { playerId: Number(key) });
          state.players[index].playerName = value;
        }
      }
    },
    storeNewRound: (state, { payload }: PayloadAction<number>) => {
      var index = findIndex(state.rounds, { roundId: payload });
      if (index < 0) {
        state.rounds.push({ roundId: payload });
        var index = findIndex(state.rounds, { roundId: payload });
        state.players.forEach((player) => {
          state.rounds[index][player.playerId] = {
            guess: undefined,
            result: undefined,
          };
        });
      }
    },
    storeUpdateCurrentRound: (state, { payload }: PayloadAction<number>) => {
      state.currentRound = payload;
    },
    storeGuesses: (
      state,
      {
        payload,
      }: PayloadAction<{
        roundId: number;
        inputValues: {
          [key: number]: number | undefined;
        };
      }>
    ) => {
      var index = findIndex(state.rounds, { roundId: payload.roundId });
      for (const [key, value] of Object.entries(payload.inputValues)) {
        if (value !== undefined) state.rounds[index][Number(key)].guess = value;
      }
    },
    storeResults: (
      state,
      {
        payload,
      }: PayloadAction<{
        roundId: number;
        inputValues: {
          [key: number]: number | undefined;
        };
      }>
    ) => {
      var index = findIndex(state.rounds, { roundId: payload.roundId });
      for (const [key, value] of Object.entries(payload.inputValues)) {
        if (value !== undefined) {
          state.rounds[index][Number(key)].result = value;
        }
      }
    },
    storeScores: (state, { payload }: PayloadAction<undefined>) => {
      state.players.forEach((player) => {
        var index = findIndex(state.players, { playerId: player.playerId });
        state.players[index].score = calculateScore({
          player: player,
          rounds: state.rounds,
        });
      });
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
  storeGuesses,
  storeResults,
  storeNewRound,
  storeGameStateChange,
  storeUpdateCurrentRound,
  storeChangePlayerNames,
  storeScores,
} = GameSlice.actions;

export default GameSlice.reducer;
