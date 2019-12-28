import { useHistory } from "react-router-dom";
import React from "react";
import "./Sc2.css";

const Navbar = (props, props1) => {
    let history = useHistory();

    const logout = async e => {
        console.log("123");
        const rex = await fetch("/auth/logout");
        history.push("/");
    };

    return (
        <div id="nav">
        {props.createPost && (
            <a href="/create-post" id="reddit">
            Create-Post
            </a>
        )}
        &nbsp; &nbsp;
        {props.showPosts && (
            <a href="/show-posts" id="reddit">
            Show-Posts
            </a>
        )}
        &nbsp; &nbsp;
        <a id="reddit" href="/projects">
        Projects
        </a>
        &nbsp; &nbsp;
        <a id="reddit" href="/about">
        About
        </a>
        &nbsp; &nbsp;
        {props.logged && (
            <a onClick={logout} id="reddit">
            Logout
            </a>
        )}
        <p id="footer">© Copyright 2019 by Mano Sriram </p>
        </div>
);
};

export default Navbar;
