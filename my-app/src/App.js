import logo from './logo.svg';
import React, { Component } from "react";
import Navigation from "./components/navigation";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home';
import Advanced from './components/advanced';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/advanced' component={Advanced} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
