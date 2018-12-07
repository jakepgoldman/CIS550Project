import React, { Component } from 'react';
import SliderPanel from "./advancedComponents/sliderPanel"
import '../styles/advanced.css';
import Slider from "./advancedComponents/slider";

class Advanced extends Component {
  render() {
    return (
        <div className="advanced-landing">
          <div className="filter-panel-container">
            <div>
              <SliderPanel />
            </div>
          </div>
        </div>
    );
  }
}

export default Advanced;
