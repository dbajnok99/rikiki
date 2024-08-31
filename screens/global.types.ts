export interface player {
  playerId: number;
  playerName: string;
  score: number;
}

export interface round {
  roundId: number;
  [playerId: number]: {
    guess?: number;
    result?: number;
  };
}

export type gameState =
  | "setup"
  | "ready to guess"
  | "playing"
  | "end of round"
  | "end of game"
  | undefined;

export interface game {
  gameId: number;
  players: player[];
  rounds: round[];
  currentRound?: number;
  state?: gameState;
}
