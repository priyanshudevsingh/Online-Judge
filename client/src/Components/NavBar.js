import React, { useContext } from "react";
import logo from "./logo.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <img
            src={logo}
            alt="logo"
            title="Ultimate Online Judge"
            width="300"
          ></img>
          <div>
            <ul id="navbar">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/questions">Questions</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <img
            src={logo}
            alt="logo"
            title="Ultimate Online Judge"
            width="300"
          ></img>
          <div>
            <ul id="navbar">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/questions">Questions</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <nav>
        <RenderMenu/>
      </nav>
    </>
  );
};

export default NavBar;
