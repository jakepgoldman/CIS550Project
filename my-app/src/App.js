import React, { Component } from "react";
import Navigation from "./components/navigation";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Advanced from './components/advanced';
import Result from './components/result';

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
              <Route path='/result' component={Result} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
