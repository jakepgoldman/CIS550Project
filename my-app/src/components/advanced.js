import React, { Component } from 'react';
import '../styles/advanced.css';
import Sidebar from "./advancedComponents/sidebar";
import Navigation from "./navigation";
import ResultPanel from "./advancedComponents/resultPanel";

class Advanced extends Component {
  render() {
    const resultFips = [
      {'number':1, 'fips': '32007'},
      {'number':2, 'fips': '56013'},
      {'number':3, 'fips': '23525'},
    ];
    return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar />
            </div>
            <div className="result-panel-container">
              <ResultPanel results={resultFips} />
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
