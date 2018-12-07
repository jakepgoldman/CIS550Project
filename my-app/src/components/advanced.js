import React, { Component } from 'react';
import SliderPanel from "./advancedComponents/sliderPanel"
import '../styles/advanced.css';
import Slider from "./advancedComponents/slider";
import Navigation from "./navigation";

class Advanced extends Component {
  render() {

    return (
        <div className="advanced-landing">
            <Navigation />
          <div className="filter-panel-container">
            <SliderPanel />
          </div>
        </div>
    );
  }
}

export default Advanced;
