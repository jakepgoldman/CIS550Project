import React, { Component } from 'react';
import SliderPanel from "./advancedComponents/sliderPanel"
import '../styles/advanced.css';
import Slider from "./advancedComponents/slider";
import Navigation from "./navigation";
import Result from "./result";

class Advanced extends Component {
  render() {

    return (
        <div className="advanced-landing">
            <Navigation />
          <div className="advanced-content">
            <div className="filter-panel-container">
              <SliderPanel />
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
