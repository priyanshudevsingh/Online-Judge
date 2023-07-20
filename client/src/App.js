import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Problems from "./Components/Problems";
import ProblemsPage from "./Components/ProblemPage";
import Submissions from "./Components/Submissions";
import Login from "./Components/Login";
import Register from "./Components/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:pid/" element={<ProblemsPage />} />
          <Route path="/submissions/:pid/" element={<Submissions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
