import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const fetchAuthStatus = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        setAuth(false);
      } else {
        setAuth(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  });

  const handlelogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
    setAuth(false);
  };

  const RenderMenu = () => {
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
              <NavLink to="/problems">Problems</NavLink>
            </li>
            {auth ? (
              <li>
                <NavLink onClick={handlelogout} to="/login">
                  LogOut
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <nav>
        <RenderMenu />
      </nav>
    </>
  );
};

export default NavBar;
