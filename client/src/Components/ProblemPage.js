import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { backendUrl } from "../App";

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
  const [ver, setVer] = useState("");

  let verdict = "";

  // for getting problem data
  const callProblems = async () => {
    try {
      const res = await fetch(`${backendUrl}/problem/` + cleanId, {
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

  // for getting current logged in user data
  const callUserid = async () => {
    try {
      const res = await fetch(`${backendUrl}/userdata`, {
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

  // for run button
  const handleRun = async (e) => {
    try {
      e.preventDefault();
      setVer("");
      if (selectedLanguage === "") {
        window.alert("Please select a language first");
      }
      if (code === "") {
        window.alert("First write some code");
      }
      const response = await fetch(`${backendUrl}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          lang: selectedLanguage,
          code: code,
          input: input,
          type: "run",
        }),
      });

      console.log(code);

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setCodeout(errorData.error.stderr);
      }

      const data = await response.json();
      console.log(data);

      const newOut = data.output;
      const norows = newOut.split("\r\n");
      const allnorows = norows.join("\n");

      // formatting the output so that it matches DBoutput
      let modout = allnorows;
      if (modout.slice(-2) === "\r\n") {
        modout = modout.slice(0, -2);
      }
      if (modout.slice(-1) === "\n") {
        modout = modout.slice(0, -1);
      }
      if (modout.slice(-1) === " ") {
        modout = modout.slice(0, -1);
      }

      setCodeout(modout);
      if (modout === output) console.log("yayyy");
      else console.log("nope");
    } catch (error) {
      console.log(error);
    }
  };

  // for submit button
  const handleSubmit = async (e) => {
    try {
      // first code running
      e.preventDefault();
      setVer("");
      if (selectedLanguage === "") {
        window.alert("Please select a language first");
      }
      if (code === "") {
        window.alert("First write some code");
      }
      const response = await fetch(`${backendUrl}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          lang: selectedLanguage,
          code: code,
          input: problem.intestcase,
          type: "submit",
        }),
      });

      console.log(code);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        verdict = "Compilation Error";
        setCodeout(errorData.error.stderr);
      }

      const data = await response.json();
      console.log(data);

      const newOut = data.output;
      const norows = newOut.split("\r\n");
      const allnorows = norows.join("\n");

      // formatting the output so that it matches DBoutput
      let modout = allnorows;
      if (modout.slice(-2) === "\r\n") {
        modout = modout.slice(0, -2);
      }
      if (modout.slice(-1) === "\n") {
        modout = modout.slice(0, -1);
      }
      if (modout.slice(-1) === " ") {
        modout = modout.slice(0, -1);
      }

      if (modout === problem.outtestcase) verdict = "Accepted";
      else verdict = "Wrong Answer";
      setCodeout("");
      setVer(verdict);
      console.log(verdict);

      // now adding submission to the DB
      const res = await fetch(`${backendUrl}/addsubmission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          problemid: cleanId,
          lang: selectedLanguage,
          code: code,
          userid: userId,
          verdict: verdict,
        }),
      });

      const subdata = await res.json();
      console.log(subdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="problempage">
        {descrip ? (
          <div className="page-content">
            <div className="ques">
              <p className={problem.difficulty + "hehe"}>{problem.name}</p>
              <p className="des">Description</p>
              <pre>{descrip}</pre>
              <p className="cons">Constraints</p>
              <pre>{constr}</pre>
              <p className="stc">Sample Testcase</p>
              <div className="flexforstc">
                <div>
                  <p className="ini">Input: </p>
                  <pre>{input}</pre>
                </div>
                <div className="out">
                  <p className="outi">Output: </p>
                  <pre>{output}</pre>
                </div>
              </div>
            </div>

            <div className="code">
              <div className="slang">
                <label htmlFor="language" className="label">
                  Select Language{" "}
                </label>
                <select
                  value={selectedLanguage}
                  className="select"
                  onChange={(event) => setSelectedLanguage(event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="py">Python</option>
                </select>
              </div>

              <div>
                <textarea
                  spellcheck="false"
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
                <button type="submit" id="test" onClick={handleRun}>
                  Run Code
                </button>
                <button type="submit" id="submit" onClick={handleSubmit}>
                  Submit Code
                </button>
                <NavLink className="submilink" to={`/submissions/:${cleanId}`}>
                  Go to all Submissions
                </NavLink>

                {codeout && (
                  <div>
                    <p className="yout">Your Output</p>
                    <pre>{codeout}</pre>
                    <p className="eout">Expected Output</p>
                    <pre>{output}</pre>
                  </div>
                )}

                {ver && (
                  <div className="verdiv">
                    <span className="vertext">Verdict: </span>
                    {ver === "Wrong Answer" && (
                      <span className="wa">Wrong Answer</span>
                    )}
                    {ver === "Accepted" && <span className="ac">Accepted</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text1">Loading...</p>
        )}
      </section>
    </>
  );
};

export default ProblemPage;
