import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./navigation";
import Predefined from "./predefined";
// import route from react router
import $ from 'jquery';
const tasksURI = 'http://localhost:5000/family';

const ajax = function(uri, method, data) {
    var request = {
        url: uri,
        type: method,
        contentType: "application/json",
        accepts: "application/json",
        cache: false,
        crossDomain: true,
        dataType: 'json',
        data: JSON.stringify(data),
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status);
        }
    };
    return $.ajax(request);
}

const fetchTasks = (callback) => {
    ajax(tasksURI, 'GET', {}).done(callback);
};

class Home extends Component {
    constructor(props) {
      super(props);

      this.state = {
        tasks: []
      }
      // this.state = {
      //   data: null,
      // };
    }

    componentDidMount() {
      fetchTasks((data) => {
          console.log(data);
          this.setState({tasks: data.tasks});
      });
    }


  render() {
    return (
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
            </Row>
            <Predefined />
          </Container>
    );
  }
}

export default Home;
