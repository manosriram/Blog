import React from "react";
import "./Sc2.css";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar showPosts={true} Git={true} />
      <div id="container">
        <p>
          Hello, My name is Mano Sriram and I'm and CS UnderGraduate currently
          living in Vizag, India. I am passionate about Programming and solving
          problems that makes people's lives better.
        </p>
        <p>
          I started this blog to help people by sharing my thoughts on Tech
          (mostly) and Non-Tech topics. Also, to use this platform to share
          problem-sets that I faced .
        </p>
        <p>
          You can contact me via{" "}
          <a href="mailto:mano.sriram0@gmail.com">Email</a> ,{" "}
          <a href="https://www.linkedin.com/in/mano-sriram-866569166/">
            LinkedIN
          </a>{" "}
          or <a href="https://www.quora.com/profile/Mano-Sriram-3">Quora</a>
        </p>
      </div>
    </>
  );
};

export default About;
