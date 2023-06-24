import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Questions from "./Components/Questions";
import Login from "./Components/Login";
import Register from "./Components/Register";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
