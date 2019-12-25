import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Admin from "./Components/Admin";
import Create from "./Components/Create";
import Show from "./Components/Show";

const App = () => {
  return (
      <>
      <Router>
        <Switch>
            <Route path="/bl-admin"><Admin /></Route>
            <Route path="/create-post"><Create /></Route>
            <Route path="/show-posts"><Show /></Route>
            <Route path="/"><Home /></Route>
        </Switch>
      </Router>
      </>
  );
}

export default App;
