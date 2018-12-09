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
    });
    console.log(json);
  }

  render() {
    const resultFips = [
      {'number':1, 'fips': '32007'},
      {'number':2, 'fips': '56013'},
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
