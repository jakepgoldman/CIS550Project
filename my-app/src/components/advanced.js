import React, { Component } from 'react';
import SliderPanel from "./advancedComponents/sliderPanel";
import '../styles/advanced.css';
import Sidebar from "./advancedComponents/sidebar";
import Navigation from "./navigation";
import ResultPanel from "./advancedComponents/resultPanel";

class Advanced extends Component {
  render() {

    return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar />
            </div>
            <div className="result-panel-container">
              <ResultPanel />
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
