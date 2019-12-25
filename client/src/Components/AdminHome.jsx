import React from 'react';
import Navbar from "./Navbar"; 

const AdminHome = () => {
    return (
        <>
        <Navbar name="Admin Home" createPost={true} showPosts={true}/>

        </>
    )
};

export default AdminHome;
