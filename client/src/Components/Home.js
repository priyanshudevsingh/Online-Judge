import React from "react";
import dogmeme from "./dog_meme.gif";

const Home = () => {
  const redirect = (e) => {
    e.preventDefault();
    window.location.href = "/problems";
  };

  return (
    <>
      <section className="homepage">
        <p className="text4">
          Welcome to <span className="tuoj">Ultimate Online Judge</span>, a MERN
          stack-based online judge platform!
        </p>
        <p className="text1">
          Made With ❤️ By &nbsp;
          <a
            className="linkedinlink"
            href="https://www.linkedin.com/in/priyanshudevsingh/"
          >
            Priyanshu Singh
          </a>
        </p>
        <img className="dogmeme" src={dogmeme} alt="dog typing on laptop"></img>
        <p className="text3">
          Whether you are aiming to land a dream job in the tech industry or
          simply want to sharpen your programming skills, our platform provides
          the tools and resources you need to excel in the world of programming.
        </p>
        <button className="redirectbut" onClick={redirect}>
          Go to Problem List
        </button>
        <p className="text2">Join today and unlock your coding potential! </p>
        <p className="text1">Happy coding!</p>
      </section>
    </>
  );
};

export default Home;
