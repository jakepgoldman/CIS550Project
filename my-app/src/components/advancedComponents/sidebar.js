import React, { Component } from 'react';
import { Card, Button, Form, FormGroup, Label, Input, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Slider from './slider';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sliderNames = ["Good Job Prospects", "Affluent Neighbors", "Good Education", "Public Safety", "Affordable Housing"];
    this.radioButtonNames = ["By State", "By County"];

    this.updateSliders = this.updateSliders.bind(this);
    this.renderSliders = this.renderSliders.bind(this);
    this.updateRadioButtons = this.updateRadioButtons.bind(this);
    this.renderRadioButtons = this.renderRadioButtons.bind(this);

    this.submit = this.submit.bind(this);
    this.showPopover = this.showPopover.bind(this);

    this.state = {
      'housingDropdownChoice': 'None',
      'radioButtonValue': ' ',
      'popoverOpen': false
    };

  }

  /* Initalize the map of slider values upon mount */
  componentWillMount = () => {
    this.sliderMap = new Map();
    this.radioButtonSet = new Set();

    this.sliderNames.map((sliderName) => {
      return (this.sliderMap.set(sliderName, 0));
    })
  }

  /* Create the onChange function for the slider panel */
  updateSliders = (label, value) => {
    this.sliderMap.set(label, value);
    return;
  }

  /* Iterative function to render all of the sliders */
  renderSliders = () => {
    return (
      this.sliderNames.map((sliderName) => {
        return (
          <div id={sliderName} key={sliderName} className="slider-wrapper">
            <Slider label={sliderName} onChange={this.updateSliders.bind(this)}/>
          </div>
        )
      })
    )
  }

  /* Create the onChange function for the radio button panel */
  updateRadioButtons = (name) => {
    this.setState({
      'radioButtonValue': name
    });
    return;
  }

  /* Iterative function to render all of the radio buttons */
  renderRadioButtons = () => {
    return(
      <FormGroup>
        {
          this.radioButtonNames.map((name) => {
            return (
              <FormGroup check key={name}>
                <Label check>
                  <Input type="radio" name="radio1" onClick={() => this.updateRadioButtons(name)}/>
                  {name}
                </Label>
              </FormGroup>
            );
          })
        }
      </FormGroup>
    )
  }

  handleHousingChange(e) {
    const { target } = e;
    const value = target.value;
    this.setState({
      'housingDropdownChoice': value
    });
  }

  /* Function to render the housing dropdown */
  renderHousingDropdown = () => {
    const { housingDropdownChoice } = this.state;
    return (
      <Form onSubmit={ (e) => this.submitForm(e) }>
        <FormGroup>
          <Input type="select" name="select" value={ housingDropdownChoice } onChange={ (e) => { this.handleHousingChange(e)} }>
            <option>None</option>
            <option>Decreased last year</option>
            <option>Decreased 2 years in a row</option>
            <option>Decreased 3 years in a row</option>
            <option>Increased last year</option>
            <option>Increased 2 years in a row</option>
            <option>Increased 3 years in a row</option>
           </Input>
        </FormGroup>
      </Form>
    )
  }

  showPopover = () => {
    var allZero = true
    for (var item of this.sliderMap.values()) {
      if (item !== 0) {
        allZero =  false
      }
    }

    if (this.state.housingDropdownChoice !== 'None') {
      allZero = false
    }

    return allZero;
  }

  submit = (e) => {
    if (this.showPopover()) {
      this.setState({
        'popoverOpen': true
      });
      return;
    } else {
      this.setState({
        'popoverOpen': false
      });
    }
    var jsonData = {};
    for (var [key, value] of this.sliderMap.entries()) {
      jsonData[key] = value;
    }
    jsonData['return_by_state'] = this.state.radioButtonValue === this.radioButtonNames[0];

    var regex = /\d+/;
    var matches = this.state.housingDropdownChoice.match(regex);

    if (matches) {
      jsonData["housing_filter_value"] = parseInt(matches[0]);
    } else {
      jsonData["housing_filter_value"] = 1;
    }

    if (this.state.housingDropdownChoice === "None") {
      jsonData["housing_filter_direction"] = 0;
      jsonData["housing_filter_value"] = 0;
    } else if (this.state.housingDropdownChoice.includes("Increased")) {
      jsonData["housing_filter_direction"] = 1;
    } else {
      jsonData["housing_filter_direction"] = -1;
    }

    this.props.updateGeoLevel(this.state.radioButtonValue);
    this.props.handleSearchQuery(jsonData);
  }

  render(){
    return(
      <Card body className="sidebar">
        <br/>
        <div className="panel-content">
          <h6>How important are the follwing attributes to you? </h6>
          {this.renderSliders()}
          <br/>
          <h6>What housing trends would you like to see?</h6>
          {this.renderHousingDropdown()}
          <br/>
          <h6>What geographic-level would you like to see? </h6>
          {this.renderRadioButtons()}
        </div>
        <br/>
        <div className="filter-panel-button">
          <Button id='submit-button' style={{width:'100%'}} onClick={this.submit}>Go!</Button>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target='submit-button'>
            <PopoverHeader>Update the filters!</PopoverHeader>
          <PopoverBody>You definitely care about one of those attributes more than the rest!</PopoverBody>
        </Popover>
        </div>
      </Card>
    )
  }

}

export default Sidebar;
