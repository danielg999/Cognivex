import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  remember,
  recall,
  results,
  answer,
  incrementElapsedTime,
  showNextRow,
  resetGame,
} from "../../store/slices/chunkingGameSlice";
import classes from "./ChunkingGame.module.css";
import Pyramid from "./Pyramid/Pyramid";

const ChunkingGame = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.chunkingGame);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    dispatch(remember());
  }, [dispatch, showNextRow, resetGame]);

  useEffect(() => {
    if (game.mode === "remember" && game.config.showTime) {
      intervalRef.current = setInterval(() => {
        dispatch(incrementElapsedTime());
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, game.mode, game.config.showTime]);

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

  const handleInputChange = useCallback(
    (rowIndex: number, numIndex: number, value: string) => {
      dispatch(answer({ rowIndex, numIndex, value }));
      if (
        game.config.allRowsAtOnce &&
        value.length === 1 &&
        inputRefs.current[rowIndex]?.[numIndex + 1]
      ) {
        inputRefs.current[rowIndex]?.[numIndex + 1]?.focus();
      } else if (value.length === 1 && inputRefs.current[rowIndex + 1]?.[0]) {
        inputRefs.current[rowIndex + 1]?.[0]?.focus();
      }
    },
    [dispatch]
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
      game.config.allRowsAtOnce &&
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
        <button onClick={() => dispatch(recall())}>Start recalling</button>
      )}
      {game.mode === "recall" && (
        <button onClick={() => dispatch(results())}>Finish recalling</button>
      )}
      {game.mode === "results" && (
        <button onClick={() => dispatch(remember())}>Try again</button>
      )}
      {((game.mode === "remember" && game.config.showTime) ||
        game.mode === "results") && <p>{formattedElapsedTime}</p>}
      <Pyramid
        numbers={game.numbers}
        userAnswers={game.userAnswers}
        mode={game.mode}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        setInputRef={setInputRef}
        rowsVisibility={game.rowsVisibility}
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
