import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Problems = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState();
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
      navigate("/login");
    }
  };

  useEffect(() => {
    callProblems();
  });

  return (
    <>
      <section className="problemtable">
        {problem ? (
          <table className="content-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Topic Tag</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {problem?.map((i) => {
                return (
                  <tr>
                    <NavLink to={`/problems/:${i.problemid}`}>
                      <td>{i.name}</td>
                    </NavLink>
                    <td>{i.tag}</td>
                    <td className={i.difficulty}>{i.difficulty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text1">Loading...</p>
        )}
      </section>
    </>
  );
};

export default Problems;
