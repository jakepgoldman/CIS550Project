import logo from './logo.svg';
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./components/navigation";

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <Row>
              <h1 align="center"> CIS 550 Project </h1>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
