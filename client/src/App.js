import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import Create from "./Components/Create";
import Show from "./Components/Show";
import Projects from "./Components/Projects";
import About from "./Components/About";
import Post from "./Components/Post";
import Cold from "./Components/Cold";
import "./App.css";
import {Helmet} from 'react-helmet'

const App = () => {
    return (
        <>
        <Helmet>
            <title>Home | Mano Sriram</title>
            <meta name="description" content="Mano Sriram" />
        </Helmet>
        <Router>
            <Switch>
                <Route path="/bl-admin"><Admin /></Route>
                <Route path="/create-post"><Create /></Route>
                <Route path="/projects"><Projects /></Route>
                <Route path="/about"><About /></Route>
                <Route path="/post/:postID/:postName"><Post /></Route>
                <Route path="/cold-storage"><Cold /></Route>
                <Route path="/"><Show /></Route>
            </Switch>
        </Router>
        </>
    );
};

export default App;
