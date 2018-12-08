import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Navigation from "./navigation";
import SearchCard from "./homeComponents/searchCard";
import About from "./homeComponents/about";

import $ from 'jquery';
const tasksURI = 'http://localhost:5000/family';
const baseURI = 'http://localhost:5000/'

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

    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }

  handleSearchQuery(choice) {
    console.log(`Choice: ${choice}`)
    if (choice === 'An Explorer') {
      ajax(baseURI + '/explorer', 'GET', {}).done((data) => {
        console.log(data);
      });
    } else if (choice === 'Boujuee') {
      ajax(baseURI + '/boujee', 'GET', {}).done((data) => {
        console.log(data);
      });
    } else if (choice === 'A Parent') {
      ajax(baseURI + '/parent', 'GET', {}).done((data) => {
        console.log(data);
      });
    } else if (choice === 'A City Goer') {
      ajax(baseURI + '/city-goer', 'GET', {}).done((data) => {
        console.log(data);
      });
    }
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
              <SearchCard handlePredefinedSearchQuery={this.handleSearchQuery}/>
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
