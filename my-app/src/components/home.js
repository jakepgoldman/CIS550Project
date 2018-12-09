import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from 'react-router-dom';

import Navigation from "./navigation";
import SearchCard from "./homeComponents/searchCard";
import About from "./homeComponents/about";

import $ from 'jquery';
const baseURI = 'http://localhost:5000'

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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'hasQueryResult': false,
      'queryResult': []
    }

    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    // this.routeToAdvancedWithData = this.routeToAdvancedWithData.bind(this);
  }

  handleSearchQuery(choice) {
    console.log(`Choice: ${choice}`)
    if (choice === 'An Explorer') {
      ajax(baseURI + '/explorer', 'GET', {}).done((data) => {
        // routeToAdvancedWithData(data);
      });
    } else if (choice === 'Boujuee') {
      ajax(baseURI + '/boujee', 'GET', {}).done((data) => {
        // routeToAdvancedWithData(data);
      });
    } else if (choice === 'A Parent') {
      ajax(baseURI + '/family', 'GET', {}).done((data) => {
        // routeToAdvancedWithData(data);
      });
    } else if (choice === 'A City Goer') {
      ajax(baseURI + '/citygoer', 'GET', {}).done((data) => {
        // routeToAdvancedWithData(data);
      });
    } else if (choice === 'A Crime Lord') {
      ajax(baseURI + '/crimelord', 'GET', {}).done((data) => {
        // routeToAdvancedWithData(data);
      });
    }
  }

  routeToAdvancedWithData(data) {
    this.setState({
      'hasQueryResult': true,
      'queryResult': data
    });
  }

  render() {
    if (!this.state.hasQueryResult) {
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
    } else {
      // return (
      //   <Router>
      //       <Switch>
      //           <Route exact path='/' component={Home} />
      //           <Route path='/advanced' render={(props) => {<Advanced {...props} queryResult={this.state.queryResult}/>}} />
      //       </Switch>
      //   </Router>
      // );
    }

  }
}

export default Home;
