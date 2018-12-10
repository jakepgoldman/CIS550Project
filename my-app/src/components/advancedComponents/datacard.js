import React, { Component } from 'react';
import {Button, Card, CardTitle, CardText, Collapse } from "reactstrap";

import countyJson from '../county.json';
import stateJson from '../state.json';

import '../../styles/advanced.css'

import $ from 'jquery';
const advancedURI = 'http://localhost:5000/result';

const ajax = function(uri, method, data) {
    var request = {
        url: uri,
        type: method,
        contentType: "application/json",
        accepts: "application/json",
        cache: false,
        crossDomain: true,
        data: data,
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status);
        }
    };
    return $.ajax(request);
}

class DataCard extends Component {
  constructor(props) {
    super(props)
    this.positions = ["First", "Second", "Third"];

    this.state = {
      'crime': 0,
      'employment': 0,
      'poverty': 0,
      'education': 0,
      'housing':0,
      'displayPopover': false
    }

    this.convertFipsToStateName = this.convertFipsToStateName.bind(this);
    this.convertFipsToCountyName = this.convertFipsToCountyName.bind(this);
    this.renderPopover = this.renderPopover.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
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

  fetchInfo() {
    if (this.state.displayPopover) {
      return (
        this.setState({
          'displayPopover': false
        })
      )
    } else {
      var fips = this.props.result.fips
      ajax(advancedURI, 'GET', {'fips':fips}).done((data) => {
        this.setState({
          'crime': data['crime'],
          'employment': data['employment'],
          'poverty': data['poverty'],
          'education': data['education'],
          'housing': data['housing'],
          'displayPopover': true
        })
      })
    }
  }

  renderPopover(countyName, stateName) {
    return (
      <Collapse isOpen={this.state.displayPopover} style={{'padding-top':'1em', 'max-width':'250px'}}>
        <Card>
        <CardTitle>National Rankings</CardTitle>
        <CardText>
          Crime: {this.state.crime} / 86 <br/>
          Employment: {this.state.employment} <br/>
          Poverty: {this.state.poverty} <br/>
          Education: {this.state.education} <br/>
          Housing: {this.state.housing}<br/>
        </CardText>
        </Card>
      </Collapse>
    );
  }

  render() {
    var fips = this.props.result.fips
    var title =  "Your " + this.positions[this.props.result.rank -1] + " Choice"
    var countyName = this.convertFipsToCountyName(fips)
    var stateName = this.convertFipsToStateName(fips)

    return (
      <div key={fips} className='custom-card-wrapper'>
        <Card body className='custom-card'>
          <CardTitle tag='h4'> {title} </CardTitle>
          <CardText>
            {countyName} County, {stateName}
          </CardText>
          <Button id='more-info-button' size="sm" style={{width:'50%'}} onClick={this.fetchInfo}>More Info</Button>
          {this.renderPopover(countyName, stateName)}
        </Card>
      </div>
    )
  }
}

export default DataCard;
