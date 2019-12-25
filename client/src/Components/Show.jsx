import React from 'react';
import Navbar from "./Navbar";

const Show = () => {
    return (
        <>
        <Navbar name="Show Posts" createPost={true} showPosts={false} />
        <h3>Show.jsx</h3>
        </>
    )
};

export default Show;
