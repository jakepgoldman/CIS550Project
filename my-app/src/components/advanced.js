import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import FilterPanel from "./advancedComponents/filterPanel";
import SliderPanel from "./advancedComponents/sliderPanel";
import '../styles/advanced.css';

const filters = [ "employment", "poverty"];

class Advanced extends Component {
  render() {
    return (
        <div className="advanced-landing">
          <div className="filter-panel-container">
            <FilterPanel filters={filters}/>
          </div>
        </div>
    );
  }
}

export default Advanced;
