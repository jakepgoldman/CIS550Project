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
      'housing_only': false,
      'displayResult': true,
      'geoLevel': 'By County',
      'resultFips': [],
    }
    this.updateGeoLevel = this.updateGeoLevel.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }

  updateGeoLevel(level) {
    this.setState({
      'geoLevel': level
    }, () => {this.render()});
  }

  handleSearchQuery(json) {
    ajax(advancedURI, 'GET', json).done((data) => {
      this.setState({
        'housing_only': data['housing_only'],
        'resultFips': data['results'],
        'displayResult': true
      });
    });
  }

  render() {
    const debuggingResults = [
      {'rank':1, 'fips': '26163', 'top_attribute': 20},
      {'rank':2, 'fips': '25025', 'top_attribute': 10},
      {'rank':3, 'fips': '01001', 'top_attribute': 30},
    ];

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

    return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar updateGeoLevel={this.updateGeoLevel} handleSearchQuery={this.handleSearchQuery}/>
            </div>
            <div className="result-panel-container">
              <ResultPanel housingFilter={this.props.housing_only} results={debuggingResults} geoLevel={this.state.geoLevel}/>
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
