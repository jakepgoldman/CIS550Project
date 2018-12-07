import React, { Component } from "react";
import Navigation from "./components/navigation";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home';
import Advanced from './components/advanced';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main-box">
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
