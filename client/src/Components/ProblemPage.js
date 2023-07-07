import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProblemPage = () => {
  const { pid } = useParams();
  const cleanId = pid.substring(1);
  const [problem, setProblem] = useState();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [constr, setConstr] = useState("");
  const [descrip, setDescrip] = useState("");

  const [userId, setUserId] = useState();
  const [code, setCode] = useState("");
  const [codeout, setCodeout] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

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

      const probdata = await res.json();
      setProblem(probdata);

      const irows = problem.sinput.split("~");
      const allirows = irows.join("\n");
      setInput(allirows);
      const orows = problem.soutput.split("~");
      const allorows = orows.join("\n");
      setOutput(allorows);
      const crows = problem.constraints.split("~");
      const allcrows = crows.join("\n");
      setConstr(allcrows);
      const drows = problem.statement.split("~");
      const alldrows = drows.join("\n");
      setDescrip(alldrows);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const callUserid = async () => {
    try {
      const res = await fetch("/userdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const userData = await res.json();
      setUserId(userData.userid);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callProblems();
    callUserid();
  });

  const handleRun = async () => {
    try {
      if (selectedLanguage === "") {
        window.alert("Please select a language first");
      }
      if (code === "") {
        window.alert("First write some code");
      }
      const response = await fetch("/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: "cpp",
          code: code,
        }),
      });

      console.log(code);

      if (!response.ok) {
        const errorData = await response.json();
        setCodeout(errorData.error.stderr);
        console.log(errorData);
      }

      const data = await response.json();
      console.log(data);
      setCodeout(data.output);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {problem ? (
        <div>
          <div>
            <p>{problem.name}</p>
            <p>Description</p>
            <pre>{descrip}</pre>
            <p>Constraints</p>
            <pre>{constr}</pre>
            <p>Sample Testcase</p>
            <code>Input: </code>
            <pre>{input}</pre>
            <code>Output: </code>
            <pre>{output}</pre>
          </div>

          <div>
            <label htmlFor="language">Select your love language: </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(event) => setSelectedLanguage(event.target.value)}
            >
              <option value="">Select</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div>
            <p>Code Here</p>
            <div>
              <textarea
                rows="20"
                cols="75"
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
              <button type="submit" onClick={handleRun}>
                Run Code
              </button>
              <button
                type="submit"
                onClick={async () => {
                  const res = await fetch("/submission", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      problemid: cleanId,
                      lang: selectedLanguage,
                      code: code,
                      userid: userId,
                      verdit: "", //for now leave it empty
                    }),
                  });

                  const data = await res.json();
                  console.log(data);
                }}
              >
                Submit Code
              </button>

              {codeout && (
                <div>
                  <pre>{codeout}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProblemPage;
