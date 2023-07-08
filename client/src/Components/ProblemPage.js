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
  const [ver, setVer] = useState("");

  let verdict = "";

  // for getting problem data
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

  // for getting current logged in user data
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
      const response = await fetch("/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: "cpp",
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
      const response = await fetch("/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: "cpp",
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
      {problem ? (
        <div>
          <div>
            <p className="text-container">{problem.name}</p>
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
              <button type="submit" onClick={handleSubmit}>
                Submit Code
              </button>

              {codeout && (
                <div>
                  <p>Your Output</p>
                  <pre>{codeout}</pre>
                  <p>Expected Output</p>
                  <pre>{output}</pre>
                </div>
              )}

              {ver && (
                <div>
                  <p>Verdict: {ver}</p>
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
