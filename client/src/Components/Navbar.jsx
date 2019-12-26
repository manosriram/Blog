import React from 'react';

const Navbar = (props, props1) => { 

    const logout = async e => {
        const resp = await fetch("/auth/logout");
        window.location = "/";
    };

    return (
        <div id="nav">
        {props.createPost && <a href="/create-post" id="reddit">Create-Post</a>}
        &nbsp;
        &nbsp;
        {props.showPosts && <a href="/show-posts" id="reddit">Show-Posts</a>}
        &nbsp;
        &nbsp;
        <a id="reddit" href="#">Projects</a>
        &nbsp;
        &nbsp;
        <a id="reddit" href="#">About</a>
        &nbsp;
        &nbsp;
        {props.logged && <a href="#" onClick={logout} id="reddit">Logout</a>}
        </div>
);
}

export default Navbar;
