import React from "react";
import Navbar from "./Navbar";
import "./Sc2.css";
import { Helmet } from 'react-helmet';

const Projects = () => {
  const [isUser, checkUser] = React.useState(false);

  const fetchUser = async () => {
    const resp = await fetch('/auth/checkStat');
    const data = await resp.json();
    checkUser(data.scs);
  };

  React.useEffect(() => {
      fetchUser();
  }, []);

  return (
    <>
    <Helmet>
        <title>Projects: Mano Sriram</title>
        <meta name="description" content="Mano Sriram" />
    </Helmet>

      <Navbar createPost={isUser} />
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
      <h1>Development Environment</h1>
      <br />
      <br />
        <p>
          <a href="https://www.iterm2.com/">iTerm2</a>
      {"  "}- Terminal Emulator
        </p>
        <p>
          <a href="https://www.vim.org/">Vim 8.2.654</a>
      {"  "}- Text Editor
        </p>
        <p>
          <a href="https://github.com/morhetz/gruvbox">GruvBox</a>
      {"  "}- Vim Theme (Dark)
        </p>
        <p>
          <a href="https://github.com/manosriram/Dot-Files">Dot Files</a>
          {"  "}- Dot Files for iTerm2 and Vim 8.2.654
        </p>
      </div>
    </>
  );
};

export default Projects;
