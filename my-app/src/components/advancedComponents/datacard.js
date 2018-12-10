import React, { Component } from 'react';
import {Button, Card, CardTitle, CardText, Collapse, Popover, PopoverHeader, PopoverBody} from "reactstrap";

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
      console.log("AJAX!!!")
      var fips = this.props.result.fips
      ajax(advancedURI, 'GET', {'fips':fips}).done((data) => {
        console.log(data)
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
      <Collapse isOpen={this.state.displayPopover}>
        <Card>
        <CardTitle>Rankings for {countyName} County, {stateName}</CardTitle>
          <CardText>
            {countyName} County, {stateName} ranks as follows compared to all 3007 US counties:
            <ul>
              <li> Crime: {this.state.crime} </li>
              <li> Employment: {this.state.employment} </li>
              <li> Poverty: {this.state.poverty} </li>
              <li> Education: {this.state.education} </li>
              <li> Housing: {this.state.housing} </li>
            </ul>
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
