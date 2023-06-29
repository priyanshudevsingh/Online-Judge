import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Questions from "./Components/Questions";
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
            <Route path="/questions" element={<Questions />} />
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
