export interface player {
  playerId: number;
  playerName: string;
  score: number;
}

export interface game {
  gameId: number;
  players: player[];
  rounds: {
    roundId: number;
    playerId: number;
    guess: number;
    result: number;
  }[];
}
