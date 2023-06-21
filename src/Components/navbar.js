import React, { useEffect, useState } from "react";
//import { Button, ButtonToolbar } from "react-bootstrap";

const NavBar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      setUser(JSON.parse(localStorage.getItem("UserData")));
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">OnlineJudge</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/questions">
                  Questions
                </a>
              </li>
              {user ? (
                <div>
                  <li class="nav-item">
                    <a class="nav-link" href="/dashboard"></a>
                  </li>
                </div>
              ) : (
                <div>
                  <li class="nav-item">
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
