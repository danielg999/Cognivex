import { Routes, Route } from "react-router-dom";
import ChunkingGamePanel from "./components/ChunkingGame/ChunkingGamePanel";
import Home from "./components/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chunking" element={<ChunkingGamePanel />} />
    </Routes>
  );
};

export default AppRoutes;
