import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button, Row, Col } from "reactstrap";
import Map from "../result.js"
import countyJson from '../county.json';
import stateJson from '../state.json';

class ResultPanel extends Component {
  constructor(props) {
    super(props)
    this.positions = ["first", "second", "third"];
    this.renderCards = this.renderCards.bind(this);
    this.renderMap = this.renderMap.bind(this);
    // this.refreshMap = this.refreshMap.bind(this);

    this.state = {
      'geoLevel': 'By County'
    }
  }

  componentWillReceiveProps(props) {
    console.log(props)
    const geoLevel = this.props.geoLevel;
    this.setState({'geoLevel': geoLevel}, () => {this.renderMap()});
  }

  convertFipsToCountyName(fips) {
    return (
      countyJson['features'].filter(
        county =>
          county['properties']['STATE']==fips.toString().slice(0, 2) &&
          county['properties']['COUNTY']==fips.toString().slice(2, 5)
      )[0]['properties']['NAME']
    )
  }

  convertFipsToStateName(fips) {
    return (
      stateJson['features'].filter(
        state =>
          state['properties']['STATE']==fips.toString().slice(0, 2)
      )[0]['properties']['NAME']
    )
  }

  renderCards() {
    console.log();
    return (
        this.props.results.map((result) => {
        var title = "Your " + this.positions[result.number - 1] + " choice:"
        return (
          <div key={result.fips} className='custom-card'>
            <Card body>
              <CardTitle tag='h4'> {title} </CardTitle>
              <CardText>
                {this.convertFipsToCountyName(result.fips)} County, {this.convertFipsToStateName(result.fips)}
              </CardText>
            </Card>
          </div>
        )
      })
    )
  }

  renderMap = () => {
    var fipsArr = [];
    this.props.results.map((result) => {
      console.log(result.fips);
      fipsArr.push(result.fips);
    })
    var shouldDisplayState = false;
    var shouldDisplayCounty = false;
    if (this.state.geoLevel === 'By State') {
      console.log('Updating state')
      shouldDisplayState = true;
    }
    if (this.state.geoLevel === 'By County') {
      console.log('Updating county')
      shouldDisplayCounty = true;
    }
    return (
      <div className="map-box">
        <Map shouldDisplayState={shouldDisplayState} shouldDisplayCounty={shouldDisplayCounty} counties={fipsArr}/>
      </div>
    )
  }

  render() {
    return (
        <div >
          <div className='result-cards'>
            {this.renderCards()}
          </div>
          {this.renderMap()}
        </div>
    );
  }
}

export default ResultPanel;
