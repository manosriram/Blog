import { useHistory } from "react-router-dom";
import React from "react";
import "./Sc2.css";

const Navbar = (props, props1) => {
    let history = useHistory();

    const logout = async e => {
        await fetch("/auth/logout");
        window.location = "/";
    };

    return (
        <div id="nav">
            <>
                <a href="/" id="reddit">
                    Home
                </a>
                &nbsp; &nbsp;
            </>

            <a id="reddit" href="/projects">
                Projects
            </a>
            &nbsp; &nbsp;

            <a id="reddit" href="/about">
                About
            </a>
            &nbsp; &nbsp;

            <>
                <a href="/cold-storage" id="reddit">
                    Cold-Storage
                </a>
                &nbsp; &nbsp;
            </>

            {props.createPost && (
                <>
                    <a href="/create-post" id="reddit">
                        Create
                    </a>
                    &nbsp; &nbsp;
                </>
            )}
            {props.createPost && (
                <a onClick={logout} id="reddit">
                    Logout
                </a>
            )}
            <footer id="footer">Copyright &copy; 2020 | Mano Sriram</footer>
        </div>
    );
};

export default Navbar;
