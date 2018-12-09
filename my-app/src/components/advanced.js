import React, { Component } from 'react';
import '../styles/advanced.css';
import Sidebar from "./advancedComponents/sidebar";
import Navigation from "./navigation";
import ResultPanel from "./advancedComponents/resultPanel";

import $ from 'jquery';
const advancedURI = 'http://localhost:5000/advanced';

const ajax = function(uri, method, data) {
    var request = {
        url: uri,
        type: method,
        contentType: "application/json",
        accepts: "application/json",
        cache: false,
        crossDomain: true,
        data: data,
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status);
        }
    };
    return $.ajax(request);
}

class Advanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'displayResult': true,
      'geoLevel': 'By County',
      'resultFips': [],
    }
    this.updateGeoLevel = this.updateGeoLevel.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    // this.setResultFips = this.setResultFips.bind(this);
  }

  // setResultFips(fips) {
  //   if (fips !== null) {
  //     return fips
  //   } else {
  //     return []
  //   }
  // }

  updateGeoLevel(level) {
    this.setState({
      'geoLevel': level
    }, () => {this.render()});
  }

  handleSearchQuery(json) {
    console.log("RESULT1:")
    console.log(this.state.resultFips)
    console.log(this.state.displayResult)
    console.log(json)
    ajax(advancedURI, 'GET', json).done((data) => {
      this.setState({
        'resultFips': data,
        'displayResult': true
      });
    }, () => {
      console.log("RESULT3:")
      console.log(this.state.resultFips)
      console.log(this.state.displayResult)
    });
  }

  render() {
    // const resultFips = [
    //   {'rank':1, 'fips': '26163'},
    //   {'rank':2, 'fips': '25025'},
    //   {'rank':3, 'fips': '01001'},
    // ];

    if (!this.state.displayResult) {
      return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar updateGeoLevel={this.updateGeoLevel} handleSearchQuery={this.handleSearchQuery}/>
            </div>
            <div className="result-panel-container">
            </div>
          </div>
        </div>
      )
    }
    console.log("RESULT2:")
    console.log(this.state.resultFips)
    console.log(this.state.displayResult)
    return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar updateGeoLevel={this.updateGeoLevel} handleSearchQuery={this.handleSearchQuery}/>
            </div>
            <div className="result-panel-container">
              <ResultPanel results={this.state.resultFips} geoLevel={this.state.geoLevel}/>
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
