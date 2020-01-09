import { useHistory } from "react-router-dom";
import React from "react";
import "./Sc2.css";

const Navbar = (props, props1) => {
    let history = useHistory();

    const logout = async e => {
        await fetch("/auth/logout");
        history.push("/");
    };

    return (
        <div id="nav">
        {props.createPost && (
            <a href="/create-post" id="reddit">
            Create-Post

        &nbsp; &nbsp;
            </a>
        )}
        {props.showPosts && (
            <a href="/show-posts" id="reddit">
            Home
        &nbsp; &nbsp;
            </a>
        )}
        <a id="reddit" href="/projects">
        Projects
        &nbsp; &nbsp;
        </a>
        <a id="reddit" href="/about">
        About
        &nbsp; &nbsp;
        </a>
        {props.logged && (
            <a onClick={logout} id="reddit">
            Logout
            </a>
        )}
        <footer id="footer">© Copyright 2019 by Mano Sriram </footer>
        </div>
);
};

export default Navbar;
