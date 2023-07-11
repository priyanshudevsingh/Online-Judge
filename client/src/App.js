import React, { useState } from "react";
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
  const [auth, setAuth] = useState(false);

  const handleAuthChange = (value) => {
    setAuth(value);
    window.location.reload();
  };

  return (
    <>
      <BrowserRouter>
        <NavBar auth={auth} handleAuthChange={handleAuthChange} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:pid/" element={<ProblemsPage />} />
          <Route path="/submissions/:pid/" element={<Submissions />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login handleAuthChange={handleAuthChange} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
