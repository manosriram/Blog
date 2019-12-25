import React from 'react';
import Navbar from "./Navbar";
import Container from '@material-ui/core/Container';

const Home = () => {
    return (
        <>
        <Navbar name="Home" createPost={true} showPosts={true}/> 
        <div id="choose">
            
        </div>
        
        </>
    )
};

export default Home;
