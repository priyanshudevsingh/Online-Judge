import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

const ProblemPage = () => {
  const { pid } = useParams() ;
  const cleanId = pid.substring(1) ;
  const [problem, setProblem] = useState();
  const callProblems = async () => {
    try {
      const res = await fetch(`/problem/` + cleanId, {
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
    }
  };

  useEffect(() => {
    callProblems();
  });
  return (
    <>
      {problem ? (
        <div id="problempage" className="flex-row">
          <div className="ques">
            <h1>{problem.name}</h1>
            <h5>Description</h5>
            <p>{problem.statement}</p>
            <code>Input : {problem.sinput}</code>
            <code>Output : {problem.soutput}</code>
          </div>
          <div className="code">
            <h1>Code Here</h1>
            <div className="code-form">
              <textarea
                // onChange={(e) => setSubmission(e.target.value)}
                name="SolvedCode"
                // onKeyDown={(event) => handleKey(event)}
              ></textarea>
              <button
                type="submit"
                id="submit"
                // onClick={async () => {
                //   const response = await fetch(`${backendUrl}/submission`, {
                //     method: "POST",
                //     headers: {
                //       authorization: localStorage.getItem("token"),
                //     },
                //     body: JSON.stringify({
                //       problemId: cleanId,
                //       submission: submission,
                //     }),
                //   });

                //   const json = await response.json();
                //   console.log(json);
                // }}
              >
                SubmitCode
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>The searched Question Doesn't exist</div>
      )}
    </>
  );
};

export default ProblemPage;
