import React, { Component } from 'react';
import '../styles/advanced.css';
import Sidebar from "./advancedComponents/sidebar";
import Navigation from "./navigation";
import ResultPanel from "./advancedComponents/resultPanel";

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

  refreshGeoLevel(level) {

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
              <Sidebar updateGeoLevel={this.updateGeoLevel}/>
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
