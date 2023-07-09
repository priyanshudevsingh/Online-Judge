import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Problems from "./Components/Problems";
import ProblemsPage from "./Components/ProblemPage";
import Submissions from "./Components/Submissions";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Logout from "./Components/Logout";
import { initalState, reducer } from "../src/reducer/usereducer";
import "bootstrap/dist/css/bootstrap.css";

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:pid/" element={<ProblemsPage />} />
            <Route path="/submissions/:pid/" element={<Submissions />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
