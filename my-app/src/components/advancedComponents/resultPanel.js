import React, { Component } from 'react';
import { Alert, ListGroup, ListGroupItem, Badge } from "reactstrap";
import Map from "../result.js";
import DataCard from "./datacard.js";

import countyJson from '../county.json';
import stateJson from '../state.json';

class ResultPanel extends Component {
  constructor(props) {
    super(props)
    this.renderCards = this.renderCards.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderStateResults = this.renderStateResults.bind(this);
    this.renderStateResultPanel = this.renderStateResultPanel.bind(this);

    this.convertFipsToStateName = this.convertFipsToStateName.bind(this);
    this.convertFipsToCountyName = this.convertFipsToCountyName.bind(this);

    this.state = {
      'geoLevel': 'By County'
    }
  }

  componentWillReceiveProps(props) {
    const geoLevel = this.props.geoLevel;
    this.setState({'geoLevel': geoLevel});
  }

  convertFipsToCountyName(fips) {
    var paddedFips = String(fips).padStart(5, '0');
    return (
      countyJson['features'].filter(
        county =>
          county['properties']['STATE'] === paddedFips.toString().slice(0, 2) &&
          county['properties']['COUNTY']=== paddedFips.toString().slice(2, 5)
      )[0]['properties']['NAME']
    )
  }

  convertFipsToStateName(fips) {
    var paddedFips = String(fips).padStart(5, '0');
    return (
      stateJson['features'].filter(
        state =>
          state['properties']['STATE'] === paddedFips.toString().slice(0, 2)
      )[0]['properties']['NAME']
    )
  }

  renderCards() {
    if (this.props.results.length === 0) {
      return
    }
    var result1 = this.props.results[0];
    var result2 = this.props.results[1];
    var result3 = this.props.results[2];

    return (
      <div className='result-cards'>
        <DataCard result={result1} />
        <DataCard result={result2} />
        <DataCard result={result3} />
      </div>
    );
  }

  renderMap = () => {
    var fipsArr = [];
    this.props.results.map((result) => {
      var paddedFips = String(result.fips).padStart(5, '0');
      return(fipsArr.push(paddedFips));
    })
    var shouldDisplayState = false;
    var shouldDisplayCounty = false;
    if (this.state.geoLevel === 'By State') {
      shouldDisplayState = true;
    }
    if (this.state.geoLevel === 'By County' || this.state.geoLevel === ' ') {
      shouldDisplayCounty = true;
    }
    return (
      <div className="map-box">
        <Map housingFilter={this.props.housingFilter} shouldDisplayState={shouldDisplayState} shouldDisplayCounty={shouldDisplayCounty} counties={fipsArr}/>
      </div>
    );
  }

  renderStateResults() {
    return (
      this.props.results.map((result) => {
        return (
          <ListGroupItem key={result.fips}>
            {this.convertFipsToCountyName(result.fips)} County, {this.convertFipsToStateName(result.fips)} <Badge pill>{Math.abs(result.top_attribute.toFixed(1))}</Badge>
          </ListGroupItem>
        )
      })
    );
  }

  renderStateResultPanel() {
    return (
      <ListGroup style={{'padding':'1%'}}>
        {this.renderStateResults()}
      </ListGroup>
    );
  }

  renderHousingFilterPanel() {
    var counties = this.props.results;
    return (
      <div style={{'padding':'1%'}}>
        <Alert color="info">
          Abode has searched the housing data of all 3007 US Counties and narrowed it down to {counties.length} based on your filters.
        </Alert>
      </div>
    )
  }

  render() {
    if (this.props.housingFilter) {
      return (
        <div>
          {this.renderHousingFilterPanel()}
          {this.renderMap()}
        </div>
      )
    }

    if (this.state.geoLevel === 'By County' || this.state.geoLevel === ' ') {
      return (
          <div >
            {this.renderCards()}
            {this.renderMap()}
          </div>
      );
    } else if (this.state.geoLevel === 'By State') {
      return (
          <div className="state-split">
            {this.renderMap()}
            <div className="state-results">
              {this.renderStateResultPanel()}
            </div>
          </div>
      );
    }
  }
}

export default ResultPanel;
