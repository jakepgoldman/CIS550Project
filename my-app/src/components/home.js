import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Navigation from "./navigation";
import SearchCard from "./homeComponents/searchCard";
import About from "./homeComponents/about";

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
      <div className="scroll">
        <div className="page">
          <Navigation />
          <div className="home">
            <div className="search-card-container">
              <SearchCard />
            </div>
          </div>
        </div>
        <div className="about">
                <About />
        </div>
      </div>
    );
  }
}

export default Home;
