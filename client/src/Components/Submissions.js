import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Submissions = () => {
  const { pid } = useParams();
  const cleanId = pid.substring(1);

  const [submission, setSubmission] = useState();
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");

  const overlayRef = useRef(null);

  const callSubmissions = async () => {
    try {
      const res = await fetch(`http://localhost:5000/submissions/` + cleanId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const submiData = await res.json();
      console.log(submiData.submissions);
      setSubmission(submiData.submissions);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAgoTime = (timeStamp) => {
    const currentTime = Date.now();
    const givenTime = new Date(timeStamp).getTime();
    const timeDifference = currentTime - givenTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let agoMessage = "";

    if (days > 0) {
      agoMessage = `${days} day(s) ago`;
    } else if (hours > 0) {
      agoMessage = `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      agoMessage = `${minutes} minute(s) ago`;
    } else {
      agoMessage = `${seconds} second(s) ago`;
    }

    return agoMessage;
  };

  useEffect(() => {
    callSubmissions();
  }, []);

  const handleCodeClick = (code) => {
    setCode(code);
    setShowCode(true);
  };

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      setShowCode(false);
    }
  };

  const CodePopup = () => {
    return (
      <div
        className="code-popup-overlay"
        onClick={handleOverlayClick}
        ref={overlayRef}
      >
        <div className="code-popup">
          <pre>{code}</pre>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="problemtable">
        {submission ? (
          <table className="content-table">
            <thead>
              <tr>
                <th>UserID</th>
                <th>Language</th>
                <th>Verdict</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {submission
                .slice()
                .reverse()
                ?.map((i) => {
                  return (
                    <tr>
                      <td>{i.userid}</td>

                      {i.lang === "cpp" && <td>C++</td>}
                      {i.lang === "java" && <td>Java</td>}
                      {i.lang === "py" && <td>Python</td>}

                      {i.verdict === "Wrong Answer" && (
                        <td
                          style={{
                            fontSize: "0.91em",
                            color: "#ff0f1e",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                          onClick={() => handleCodeClick(i.code)}
                        >
                          Wrong Answer
                        </td>
                      )}
                      {i.verdict === "Accepted" && (
                        <td
                          style={{
                            fontSize: "0.91em",
                            color: "#07ac07",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                          onClick={() => handleCodeClick(i.code)}
                        >
                          Accepted
                        </td>
                      )}

                      <td>{calculateAgoTime(i.timestamps)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p className="text1">No Submission Found</p>
        )}
      </section>
      {showCode && <CodePopup />}
    </>
  );
};

export default Submissions;
