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
      'displayResult': false,
      'geoLevel': 'By County',
      'resultFips': []
    }
    this.updateGeoLevel = this.updateGeoLevel.bind(this);
  }
  updateGeoLevel(level) {
    this.setState({
      'geoLevel': level
    }, () => {this.render()});
  }

  handleSearchQuery(json) {
    ajax(advancedURI, 'GET', json).done((data) => {
      console.log(data);
      this.setState({'resultFips': data});
    });
    console.log(json);
  }

  render() {
    const resultFips = [
      {'rank':1, 'fips': '26163'},
      {'rank':2, 'fips': '25025'},
      {'rank':3, 'fips': '26163'},
      {'rank':4, 'fips': '25025'},
      {'rank':5, 'fips': '26163'},
      {'rank':6, 'fips': '25025'},
      {'rank':7, 'fips': '26163'},
      {'rank':8, 'fips': '25025'},
      {'rank':9, 'fips': '26163'},
      {'rank':10, 'fips': '25025'},
    ];
    return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar updateGeoLevel={this.updateGeoLevel} handleSearchQuery={this.handleSearchQuery}/>
            </div>
            <div className="result-panel-container">
              <ResultPanel results={resultFips} geoLevel={this.state.geoLevel}/>
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
