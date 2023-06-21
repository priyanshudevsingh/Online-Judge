import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      nav("/");
    }
  });

  const handleClick = async () => {
    const data = {
      email,
      password,
    };

    await axios
      .post("http://localhost:5000/api/auth/login", data)
      .then((D) => {
        toast.success("Login Success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("UserData", JSON.stringify(D.data));
        nav("/");
        window.location.reload();
      })
      .catch((D) => {
        toast.error(D.response.data.errors, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div class="container mt-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <h1 className="text-white">Login</h1>
      <div class="row">
        <div class="col-sm-8">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  class="form-control"
                  name="email"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  class="form-control"
                  name="password"
                />
                <p></p>
              </div>
              <button onClick={handleClick} class="btn btn-dark">
                Login
              </button>
            </div>
          </div>
        </div>

        <div class="col-sm-4"></div>
      </div>
    </div>
  );
};
export default Login;
