import React, { useState } from "react";
import ChunkingGame from "./ChunkingGame";

const ChunkingGamePanel = () => {
  const [isConfig, setIsConfig] = useState(true); // Stan: konfiguracja czy gra
  const [config, setConfig] = useState({
    rows: 10,
    allRowsAtOnce: false,
    showTime: false,
  }); // Domyślne ustawienia

  const handleStart = () => {
    setIsConfig(false); // Przełącz na widok gry
  };

  return (
    <div>
      {isConfig ? (
        <div>
          <h1>Konfiguracja gry Chunking</h1>
          <p>Ustaw parametry gry:</p>
          <label>
            Liczba wierszy:
            <input
              type="number"
              value={config.rows}
              onChange={(e) =>
                setConfig({ ...config, rows: parseInt(e.target.value) })
              }
            />
          </label>
          <br />
          <label>
            Pokaż wszystkie wiersze na raz:
            <input
              type="checkbox"
              checked={config.allRowsAtOnce}
              onChange={(e) =>
                setConfig({
                  ...config,
                  allRowsAtOnce: e.target.checked,
                })
              }
            />
          </label>
          <br />
          <label>
            Show time:
            <input
              type="checkbox"
              checked={config.showTime}
              onChange={(e) =>
                setConfig({ ...config, showTime: e.target.checked })
              }
            />
          </label>
          <br />
          <button onClick={handleStart}>Start</button>
        </div>
      ) : (
        <div>
          <h1>Gra Chunking</h1>
          <p>Rozpocznij grę i ćwicz chunking!</p>
          <p>Ustawienia gry:</p>
          <ul>
            <li>Liczba wierszy: {config.rows}</li>
            <li>
              Wszystkie wiersze na raz: {config.allRowsAtOnce ? "TAK" : "NIE"}
            </li>
            <li>Pokaż czas: {config.showTime ? "TAK" : "NIE"}</li>
          </ul>
          <ChunkingGame config={config} />
        </div>
      )}
    </div>
  );
};

export default ChunkingGamePanel;
