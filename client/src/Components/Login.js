import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // connecting login page to backend
  const PostData = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!data) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 422) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 400) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      dispatch({ type: "user", payload: false });
      window.alert("Login Successful");
      console.log("Login Successful");
      navigate("/");
    }
  };

  return (
    <>
      <section className="loginpage">
        <div className="form-box-login">
          <div className="form-value">
            <form method="POST">
              <h2>Login</h2>

              <div className="inputbox">
                <label htmlFor="email">
                  <span class="material-symbols-outlined">mail</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="password">
                  <span class="material-symbols-outlined">password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                ></input>
              </div>

              <div className="click">
                <input type="submit" value="Login" onClick={PostData} />
              </div>
            </form>

            <NavLink className="already" to="/register">
              Not Registered Yet?
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
