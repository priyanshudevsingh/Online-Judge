import React from 'react'
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <section className='loginpage'>
        <div className="form-box-login">
          <div className="form-value">
            <form>
              <h2>Login</h2>

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

              <div className="click">
                <input type="submit" value="Login" />
              </div>

            </form>

            <NavLink className="already" to="/register">Not Registered Yet?</NavLink>

          </div>
        </div>
      </section>
    </>
  )
}

export default Login