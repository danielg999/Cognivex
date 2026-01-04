import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setConfig } from "../../store/slices/chunkingGameSlice";

import { useNavigate } from "react-router-dom";

const ChunkingGamePanel = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.chunkingGame.config);
  const navigate = useNavigate();

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setConfig({
        ...config,
        [name]: type === "checkbox" ? checked : parseInt(value, 10),
      })
    );
  };

  const handleStartGame = () => {
    navigate("/chunking-game");
  };

  return (
    <div>
      <h2>Chunking Game Configuration</h2>
      <label>
        Rows:
        <input
          type="number"
          name="rows"
          value={config.rows}
          onChange={handleConfigChange}
        />
      </label>
      <br />
      <label>
        All Rows At Once:
        <input
          type="checkbox"
          name="allRowsAtOnce"
          checked={config.allRowsAtOnce}
          onChange={handleConfigChange}
        />
      </label>
      <br />
      <label>
        Show Time:
        <input
          type="checkbox"
          name="showTime"
          checked={config.showTime}
          onChange={handleConfigChange}
        />
      </label>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default ChunkingGamePanel;
