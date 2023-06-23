import React from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <>
      <section>
        <div className="form-box-register">
          <div className="form-value">
            <form>
              <h2>Register</h2>

              <div className="inputbox">
                <label htmlFor="name">
                  <span class="material-symbols-outlined">person</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="Name"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="name">
                  <span class="material-symbols-outlined">face</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="UserID"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="email">
                  <span class="material-symbols-outlined">mail</span>
                </label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  placeholder="Email"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="password">
                  <span class="material-symbols-outlined">password</span>
                </label>
                <input
                  type="password"
                  required
                  autoComplete="off"
                  placeholder="Password"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="cpassword">
                  <span class="material-symbols-outlined">check</span>
                </label>
                <input
                  type="password"
                  required
                  autoComplete="off"
                  placeholder="Confirm Password"
                ></input>
              </div>

              <div className="click">
                <input type="submit" value="Register" />
              </div>

            </form>

            <NavLink className="already" to="/login">I am already registered</NavLink>

          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
