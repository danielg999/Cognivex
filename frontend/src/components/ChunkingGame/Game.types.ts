export interface GameState {
  mode: "remember" | "recall" | "results";
  config: {
    rows: number;
    allRowsAtOnce: boolean;
    showTime: boolean;
  };
  numbers: number[][];
  userAnswers: string[][];
  correctPercentage: number | null;
  elapsedTimeInSeconds: number;
}

export type GameAction =
  | { type: "remember" }
  | { type: "recall" }
  | { type: "results" }
  | { type: "answer"; value: string; rowIndex: number; numIndex: number }
  | { type: "incrementElapsedTime" };
