import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Advanced from './components/advanced';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/advanced' component={Advanced} />
          </Switch>
      </Router>
    );
  }
}

export default App;
