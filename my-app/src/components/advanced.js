import React, { Component } from 'react';
import SliderPanel from "./advancedComponents/sliderPanel";
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
        dataType: 'json',
        data: JSON.stringify(data),
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status);
        }
    };
    return $.ajax(request);
}

class Advanced extends Component {
  handleSearchQuery(json) {
    ajax(advancedURI, 'GET', json).done((data) => {
      console.log(data);
    });
    console.log(json);
  }

  render() {

    return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar handleSearchQuery={this.handleSearchQuery}/>
            </div>
            <div className="advanced-result-container">
              <ResultPanel />
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
