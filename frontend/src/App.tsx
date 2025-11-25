import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChunkingGamePanel from "./components/ChunkingGamePanel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chunking" element={<ChunkingGamePanel />} />
      </Routes>
    </Router>
  );
};

export default App;
