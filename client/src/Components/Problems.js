import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Problems = () => {
  const navigate = useNavigate();

  const [problem, setProblem]=useState();
  const callProblems = async () => {
    try {
      const res = await fetch("/problems", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setProblem(data);

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
    callProblems();
  });

  return (
  <>
    <table>
      <tr>
        <th>Name</th>
        <th>Topic Tag</th>
        <th>Difficulty</th>
      </tr>
      {problem?.map(i=>{
        return(
          <tr>
            <td>{i.name}</td>
            <td>{i.tag}</td>
            <td>{i.difficulty}</td>
          </tr>
        )
      })}
    </table>
  </>
  );
};

export default Problems;
