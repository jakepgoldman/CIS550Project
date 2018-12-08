import React, { Component } from 'react';
import '../styles/advanced.css';
import Sidebar from "./advancedComponents/sidebar";
import Navigation from "./navigation";
import Result from "./result";

class Advanced extends Component {
  render() {

    return (
        <div className="advanced-landing page">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <Sidebar />
            </div>
            <div className="advanced-result-container">
              <Result />
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
