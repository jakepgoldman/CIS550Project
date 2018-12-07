import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Advanced from './components/advanced';
import Result from './components/result';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/advanced' component={Advanced} />
              <Route path='/result' component={Result} />
          </Switch>
      </Router>
    );
  }
}

export default App;
