import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
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
            <Route path="/"><Show /></Route>
        </Switch>
      </Router>
      </>
  );
}

export default App;
