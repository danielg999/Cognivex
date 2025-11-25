import React, {
  useRef,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import classes from "./ChunkingGame.module.css";
import Pyramid from "./Pyramid";

interface GameState {
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

type GameAction =
  | { type: "remember" }
  | { type: "recall" }
  | { type: "results" }
  | { type: "answer"; value: string; rowIndex: number; numIndex: number }
  | { type: "incrementElapsedTime" };

const gameReducer = (state: GameState, action: GameAction) => {
  let updatedAnswers = [...state.userAnswers];
  switch (action.type) {
    case "remember":
      const numbers = getRandomNumbers(state.config);
      updatedAnswers = numbers.map((row) => row.map(() => ""));

      return {
        ...state,
        mode: "remember" as "remember",
        numbers: numbers,
        userAnswers: updatedAnswers,
        correctPercentage: null,
        elapsedTimeInSeconds: 0,
      };
    case "recall":
      return { ...state, mode: "recall" as "recall" };
    case "results":
      const correctPercentage = calculateCorrectPercentage(
        state.userAnswers,
        state.numbers
      );
      return { ...state, mode: "results" as "results", correctPercentage };
    case "answer":
      const { rowIndex, numIndex, value } = action;
      updatedAnswers[rowIndex][numIndex] = value;

      return {
        ...state,
        userAnswers: updatedAnswers,
      };
    case "incrementElapsedTime":
      const elapsedTimeInSeconds = state.elapsedTimeInSeconds + 1;
      return { ...state, elapsedTimeInSeconds: elapsedTimeInSeconds };
    default:
      return state;
  }
};

const ChunkingGame = ({
  config,
}: {
  config: {
    rows: number;
    allRowsAtOnce: boolean;
    showTime: boolean;
  };
}) => {
  const [game, gameDispatch] = useReducer(gameReducer, {
    mode: "remember",
    config: config,
    numbers: [],
    userAnswers: [],
    correctPercentage: null,
    elapsedTimeInSeconds: 0,
  });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    gameDispatch({ type: "remember" });
  }, []);

  useEffect(() => {
    if (game.mode === "remember" && config.showTime) {
      intervalRef.current = setInterval(() => {
        if (game.mode === "remember" && config.showTime) {
          gameDispatch({ type: "incrementElapsedTime" });
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [config, game.mode]);

  const formattedElapsedTime = useMemo(
    () =>
      `${String(Math.floor(game.elapsedTimeInSeconds / 60)).padStart(
        2,
        "0"
      )}:${String(game.elapsedTimeInSeconds % 60).padStart(2, "0")}`,
    [game.elapsedTimeInSeconds]
  );

  const inputRefs = useRef<HTMLInputElement[][]>([]);

  const setInputRef = useCallback(
    (rowIndex: number, numIndex: number) => (el: HTMLInputElement | null) => {
      if (!inputRefs.current[rowIndex]) {
        inputRefs.current[rowIndex] = [];
      }
      inputRefs.current[rowIndex][numIndex] = el!;
    },
    []
  );

  const handleStartRecalling = useCallback(() => {
    gameDispatch({ type: "recall" });
  }, [gameDispatch]);

  const handleFinishRecalling = useCallback(() => {
    gameDispatch({ type: "results" });
  }, [gameDispatch]);

  const handleStartRemembering = useCallback(() => {
    gameDispatch({ type: "remember" });
  }, [gameDispatch]);

  const handleInputChange = useCallback(
    (rowIndex: number, numIndex: number, value: string) => {
      gameDispatch({ type: "answer", value, rowIndex, numIndex });
      if (value.length === 1 && inputRefs.current[rowIndex]?.[numIndex + 1]) {
        inputRefs.current[rowIndex]?.[numIndex + 1]?.focus();
      } else if (value.length === 1 && inputRefs.current[rowIndex + 1]?.[0]) {
        inputRefs.current[rowIndex + 1]?.[0]?.focus();
      }
    },
    [gameDispatch]
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    numIndex: number
  ) => {
    if (
      e.key === "Backspace" &&
      inputRefs.current[rowIndex]?.[numIndex - 1] &&
      e.currentTarget.value.length === 0
    ) {
      inputRefs.current[rowIndex]?.[numIndex - 1]?.focus();
    } else if (
      e.key === "Backspace" &&
      inputRefs.current[rowIndex - 1] &&
      e.currentTarget.value.length === 0
    ) {
      const maxNumIndex = inputRefs.current[rowIndex - 1]?.length - 1;
      inputRefs.current[rowIndex - 1]?.[maxNumIndex]?.focus();
    }
  };

  return (
    <div>
      {game.mode === "remember" && (
        <button onClick={handleStartRecalling}>Start recalling</button>
      )}
      {game.mode === "recall" && (
        <button onClick={handleFinishRecalling}>Finish recalling</button>
      )}
      {game.mode === "results" && (
        <button onClick={handleStartRemembering}>Try again</button>
      )}
      {((game.mode === "remember" && config.showTime) ||
        game.mode === "results") && <p>{formattedElapsedTime}</p>}
      <Pyramid
        numbers={game.numbers}
        userAnswers={game.userAnswers}
        mode={game.mode}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        setInputRef={setInputRef}
      />
      {game.correctPercentage !== null && (
        <div className={classes["result"]}>
          Procent poprawnych odpowiedzi: {game.correctPercentage.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default ChunkingGame;

const getRandomNumbers = (config: {
  rows: number;
  allRowsAtOnce: boolean;
  showTime: boolean;
}): number[][] => {
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
