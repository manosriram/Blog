import React from "react";
import Navbar from "./Navbar";
import "./Sc2.css";

const Projects = () => {
  return (
    <>
      <Navbar showPosts={true} Git={true} />
      <div id="container">
        <p>
          These are some of the projects I have worked (working) on. Most of the
          time, I work on <strong>C++</strong> or MERN (<strong>M</strong>
          ongoDB, <strong>E</strong>xpressJS, <strong>R</strong>eactJS,{" "}
          <strong>N</strong>odeJS) Stack. More smaller tools or projects can be
          found on my <a href="https://www.github.com/manosriram">Github</a>{" "}
          profile.
        </p>
        <br />
        <h1>Projects</h1>
        <br />
        <br />
        <p>
          <a href="https://www.github.com/manosriram/Data-Structures">
            Data Structures
          </a>
          {"  "}- Different Types of Data-Structures ranging from low to
          advanced difficulty. (Still actively contributing)
        </p>
        <p>
          <a href="https://github.com/manosriram/Algorithms">Algorithms</a>
          {"  "}- CS Algorithms with different time-complexities including
          classical and non-classical problems.{" "}
        </p>
        <p>
          <a href="http://www.filebound.in">FileBound</a> (<a href="https://github.com/manosriram/filebound">Github</a>)
          {"  "}- Web App through which users can upload files and share them via a time-bounded, encrypted link! 
        </p>
        <p>
          <a href="https://github.com/manosriram/Huffman-Compression">
            Huffman Compression
          </a>
          {"  "}- Implementation of Huffman Compression technique in C++.
        </p>
        <p>
          <a href="https://github.com/manosriram/Radix-Tree">Radix Tree</a>
          {"  "}- Implementation of Radix Tree in C++.
        </p>
        <p>
          <a href="https://github.com/manosriram/EasySolve">Easy Solve</a>
          {"  "}- Web App which lets you ask questions and get answers from
          people anywhere.
        </p>
        <p>
          <a href="https://github.com/manosriram/CodeFlip">Code Flip</a>
          {"  "}- Web App which lets you store pieces of code for lookups later.
        </p>
        <p>
          <a href="https://github.com/manosriram/AnonymousMessaging">
            Anonymous Messaging.
          </a>
          {"  "}- Message users anonymously.
        </p>
        <p>
          <a href="https://github.com/manosriram/ytdown">Youtube Downloader</a>
          {"  "}- Simple tool to download Youtube Videos.
        </p>
      <br />
      <h1>Tools</h1>
      <br />
      <br />
        <p>
          <a href="https://github.com/manosriram/Dot-Files">Dot Files</a>
          {"  "}- My Dot Files for iTerm2 and Vim 8.1.1312
        </p>
      </div>
    </>
  );
};

export default Projects;
