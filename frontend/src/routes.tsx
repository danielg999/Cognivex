import { Routes, Route } from "react-router-dom";
import ChunkingGame from "./components/ChunkingGame/ChunkingGame";
import ChunkingGamePanel from "./components/ChunkingGame/ChunkingGamePanel";
import Home from "./components/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chunking-game" element={<ChunkingGame />} />
      <Route path="/chunking-game/config" element={<ChunkingGamePanel />} />
    </Routes>
  );
};

export default AppRoutes;
