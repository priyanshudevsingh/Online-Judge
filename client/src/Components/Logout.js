import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const logoutFunc = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "user", payload: true });
      navigate("/login");
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    logoutFunc();
  },[]);

  return (
    <>
      <section className="logoutpage"></section>
    </>
  );
};

export default Logout;
