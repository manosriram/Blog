import { useHistory, Link } from "react-router-dom";
import React, { Fragment } from "react";
import "./Sc2.css";

const Navbar = (props, props1) => {
    let history = useHistory();

    const logout = async e => {
        await fetch("/auth/logout");
        window.location = "/";
    };

    return (
        <div id="nav">
            <Link id="reddit" to="/">
                Home
            </Link>

            <Link id="reddit" to="/projects">
                Projects
            </Link>

            <Link id="reddit" to="/about">
                About
            </Link>

            <Link id="reddit" to="/cold-storage">
                Cold-Storage
            </Link>

            {props.createPost && (
                <Link id="reddit" to="/create-post">
                    Create
                </Link>
            )}
            {props.createPost && (
                <Link id="reddit" to="#" onClick={logout}>
                    Logout
                </Link>
            )}
            <footer id="footer">
                Mano Sriram | GNU General Public License
            </footer>
        </div>
    );
};

export default Navbar;
