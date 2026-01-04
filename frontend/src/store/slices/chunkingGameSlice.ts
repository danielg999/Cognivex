import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChunkingGameConfig {
  rows: number;
  allRowsAtOnce: boolean;
  showTime: boolean;
}

interface GameState {
  mode: "remember" | "recall" | "results";
  config: ChunkingGameConfig;
  numbers: number[][];
  userAnswers: string[][];
  correctPercentage: number | null;
  elapsedTimeInSeconds: number;
  rowsVisibility: boolean[];
  currentRow: number;
}

const initialState: GameState = {
  mode: "remember",
  config: {
    rows: 5,
    allRowsAtOnce: false,
    showTime: true,
  },
  numbers: [],
  userAnswers: [],
  correctPercentage: null,
  elapsedTimeInSeconds: 0,
  rowsVisibility: [],
  currentRow: 0,
};

const chunkingGameSlice = createSlice({
  name: "chunkingGame",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<ChunkingGameConfig>) {
      state.config = action.payload;
    },
    remember(state) {
      const numbers = getRandomNumbers(state.config);
      state.numbers = numbers;
      state.userAnswers = numbers.map((row) => row.map(() => ""));
      state.mode = "remember";
      state.correctPercentage = null;
      state.elapsedTimeInSeconds = 0;
    },
    recall(state) {
      state.mode = "recall";
    },
    results(state) {
      state.correctPercentage = calculateCorrectPercentage(
        state.userAnswers,
        state.numbers
      );
      state.mode = "results";
    },
    answer(
      state,
      action: PayloadAction<{
        rowIndex: number;
        numIndex: number;
        value: string;
      }>
    ) {
      const { rowIndex, numIndex, value } = action.payload;
      state.userAnswers[rowIndex][numIndex] = value;
    },
    incrementElapsedTime(state) {
      state.elapsedTimeInSeconds += 1;
    },
    showNextRow: (state) => {
      if (state.currentRow < state.rowsVisibility.length - 1) {
        state.currentRow += 1;
        state.rowsVisibility[state.currentRow] = true;
      }
    },
    resetGame: (state) => {
      state.currentRow = 0;
      state.rowsVisibility = state.rowsVisibility.map(() => false);
    },
  },
});

export const {
  setConfig,
  remember,
  recall,
  results,
  answer,
  incrementElapsedTime,
  showNextRow,
  resetGame,
} = chunkingGameSlice.actions;

export default chunkingGameSlice.reducer;

const getRandomNumbers = (config: ChunkingGameConfig): number[][] => {
  const result: number[][] = [];

  for (let i = 0; i < config.rows; i++) {
    const length = 4 + i;
    const innerArray = Array.from({ length }, () =>
      Math.floor(Math.random() * 10)
    );
    result.push(innerArray);
  }

  return result;
};

const calculateCorrectPercentage = (
  userAnswers: string[][],
  numbers: number[][]
): number => {
  let correctCount = 0;
  let totalCount = 0;

  numbers.forEach((row, rowIndex) => {
    row.forEach((num, numIndex) => {
      totalCount++;
      if (userAnswers[rowIndex]?.[numIndex] === num.toString()) {
        correctCount++;
      }
    });
  });

  return (correctCount / totalCount) * 100;
};
