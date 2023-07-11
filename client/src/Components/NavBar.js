import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import { NavLink, useNavigate} from "react-router-dom";

const NavBar = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const fetchAuthStatus = async () => {
    try {
      const res = await fetch("/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  const handlelogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/login");
      setAuth(false);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
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
