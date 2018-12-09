import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button, ListGroup, ListGroupItem } from "reactstrap";
import Map from "../result.js"
import countyJson from '../county.json';
import stateJson from '../state.json';

class ResultPanel extends Component {
  constructor(props) {
    super(props)
    this.positions = ["First", "Second", "Third"];
    this.renderCards = this.renderCards.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderStateResults = this.renderStateResults.bind(this);
    this.renderStateResultPanel = this.renderStateResultPanel.bind(this);
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
    var result1 = this.props.results[0];
    var title1 = "Your " + this.positions[result1.rank -1] + " Choice"
    var result2 = this.props.results[1];
    var title2 = "Your " + this.positions[result2.rank -1] + " Choice"
    var result3 = this.props.results[2];
    var title3 = "Your " + this.positions[result3.rank -1] + " Choice"
    return (
      <div className='result-cards'>
        <div key={result1.fips} className='custom-card'>
          <Card body>
            <CardTitle tag='h4'> {title1} </CardTitle>
            <CardText>
              {this.convertFipsToCountyName(result1.fips)} County, {this.convertFipsToStateName(result1.fips)}
            </CardText>
          </Card>
        </div>
        <div key={result2.fips} className='custom-card'>
          <Card body>
            <CardTitle tag='h4'> {title2} </CardTitle>
            <CardText>
              {this.convertFipsToCountyName(result2.fips)} County, {this.convertFipsToStateName(result2.fips)}
            </CardText>
          </Card>
        </div>
        <div key={result3.fips} className='custom-card'>
          <Card body>
            <CardTitle tag='h4'> {title3} </CardTitle>
            <CardText>
              {this.convertFipsToCountyName(result3.fips)} County, {this.convertFipsToStateName(result3.fips)}
            </CardText>
          </Card>
        </div>
      </div>
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

  renderStateResults() {
    return (
      this.props.results.map((result) => {
        return (
          <ListGroupItem key={result.fips}>
            {this.convertFipsToCountyName(result.fips)} County, {this.convertFipsToStateName(result.fips)}
          </ListGroupItem>
        )
      })
    )
  }

  renderStateResultPanel() {
    return (
      <ListGroup>
        {this.renderStateResults()}
      </ListGroup>
    )
  }

  render() {
    if (this.state.geoLevel === 'By County') {
      return (
          <div >

            {this.renderCards()}
            {this.renderMap()}
          </div>
      );
    } else if (this.state.geoLevel === 'By State') {
      return (
          <div >
            {this.renderMap()}
            <div style={{overflow: 'auto', 'max-height': '200px', 'padding':'1%','background-color': '#f2f2f2'}}>
            {this.renderStateResultPanel()}
            </div>
          </div>
      );
    }
  }
}

export default ResultPanel;
