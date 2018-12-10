import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from 'react-router-dom';

import Navigation from "./navigation";
import SearchCard from "./homeComponents/searchCard";
import About from "./homeComponents/about";
import ResultPanel from "./advancedComponents/resultPanel";

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
  }

  handleSearchQuery(choice) {
    console.log(`Choice: ${choice}`)
    var uri = ""
    if (choice === 'An Explorer') {
      uri = baseURI + '/explorer'
    } else if (choice === 'Boujee') {
      uri = baseURI + '/boujee'
    } else if (choice === 'A Parent') {
      uri = baseURI + '/family'
    } else if (choice === 'A City-Goer') {
      uri = baseURI + '/citygoer'
    } else if (choice === 'A Crime Lord') {
      uri = baseURI + '/crimelord'
    }

    ajax(uri, 'GET', {}).done((data) => {
      this.setState({
        'hasQueryResult': true,
        'resultData': data
      });
    });

    // var fakeData = [
    //   {
    //     'rank': 1,
    //     'fips': 5035,
    //     'cbsaname': "Memphis, TN-MS-AR",
    //   },
    //   {
    //     'rank': 2,
    //     'fips': 4021,
    //     'cbsaname': "Phoenix-Mesa-Scottsdale, AZ",
    //   },
    //   {
    //     'rank': 3,
    //     'fips': 6111,
    //     'cbsaname': "Oxnard-Thousand Oaks-Ventura, CA",
    //   }
    // ]
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
      return (
        <div className="page">
          <Navigation />
          <div className="result-panel-container">
            <ResultPanel results={this.state.resultData}/>
          </div>
        </div>
      )
    }

  }
}

export default Home;
