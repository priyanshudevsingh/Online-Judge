import NavBar from './Components/navbar';
import React from "react";
import { BrowserRouter ,Routes , Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./Components/login";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route
            path="/questions"
            element={Authentication(<QuestionsUser />)}
          /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/dashboard" element={Authentication(<Dashboard />)} />
          <Route path="/addQ" element={Authentication(<AddQ />)} />
          <Route
            path="/Question/:uniquename"
            element={Authentication(<Editor />)}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
