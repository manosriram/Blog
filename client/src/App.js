import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Admin from "./Components/Admin";

const App = () => {
  return (
      <>
      <Router>
        <Switch>
            <Route path="/bl-admin"><Admin /></Route>
            <Route path="/"><Home /></Route>
        </Switch>
      </Router>
      </>
  );
}

export default App;
