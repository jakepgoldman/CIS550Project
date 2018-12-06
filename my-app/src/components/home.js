import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./navigation";
import Predefined from "./predefined"
// import route from react router

class Home extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null,
      };
    }

    componentDidMount() {
      // fetch('http://127.0.0.1:5000/', { mode: 'no-cors' })
      //   .then(response => response.json())
      //   .then(data => this.setState({ data }));
      fetch('http://127.0.0.1:5000/')
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong on api server!');
          }
        });
    }


  render() {
    fetch('http://127.0.0.1:5000/')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      });

    console.log(this.state);
    const hits = this.state;
    return (
      <div>
        <Navigation />
        <Container>
          <Row>
              <h1 align="center"> Abode </h1>
          </Row>
          <Row>
              <h4 align="center"> Arnav Jagasia, Jake Goldman, James Xue, Josh Doman </h4>
              <p>
                At Penn, it is common for students to move to two places after
                graduation: New York City or San Francisco. We set out on a mission
                to prove there are many other places in the United States for you to live.
              </p>
              <ul>
                {hits.one}
              </ul>
          </Row>
          <Predefined />
        </Container>
      </div>
    );
  }
}

export default Home;
