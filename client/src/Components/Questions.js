import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();

  const callQuestions = async () => {
    try {
      const res = await fetch("/questions", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/register");
      //window.alert("Register/Login First");
    }
  };

  useEffect(() => {
    callQuestions();
  });

  return <>HI Questions</>;
};

export default Questions;
