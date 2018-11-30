import logo from './logo.svg';
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./components/navigation";
import Home from "./components/home";
// import route from react router

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
