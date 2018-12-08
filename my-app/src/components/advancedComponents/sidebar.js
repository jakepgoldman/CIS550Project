import React, { Component } from 'react';
import { Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Slider from './slider';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sliderNames = ["employment", "poverty", "education", "crime", "housing"];
    this.radioButtonNames = ["By State", "By County"];

    this.updateSliders = this.updateSliders.bind(this);
    this.renderSliders = this.renderSliders.bind(this);
    this.updateRadioButtons = this.updateRadioButtons.bind(this);
    this.renderRadioButtons = this.renderRadioButtons.bind(this);

    this.submit = this.submit.bind(this);

    this.state = {
      'housingDropdownChoice': '',
      'radioButtonValue': ' ',
    };

  }

  /* Initalize the map of slider values upon mount */
  componentWillMount = () => {
    this.sliderMap = new Map();
    this.radioButtonSet = new Set();

    this.sliderNames.map((sliderName) => {
      return (this.sliderMap.set(sliderName, 50));
    })
  }

  /* Create the onChange function for the slider panel */
  updateSliders = (event, value) => {
    var name = event.target.id;
    if (name === "") {
      return;
    } else {
      this.sliderMap.set(name, value);
      return;
    }
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
            <option>Decreased 4 years in a row</option>
            <option>Increased last year</option>
            <option>Increased 2 years in a row</option>
            <option>Increased 3 years in a row</option>
            <option>Increased 4 years in a row</option>
           </Input>
        </FormGroup>
      </Form>
    )
  }

  submit = (e) => {
    var jsonData = {};
    for (var [key, value] of this.sliderMap.entries()) {
      jsonData[key] = value;
    }
    jsonData['geographic-level'] = this.state.radioButtonValue;
    jsonData['housing-filter'] = this.state.housingDropdownChoice;
  }

  render(){
    return(
      <Card body className="sidebar">
        <br/>
        <div className="panel-content">
          <h6> How important are the follwing attributes to you? </h6>
          {this.renderSliders()}
          <br/>
          <h6> What geographic-level do you want to see? </h6>
          {this.renderRadioButtons()}
          <br/>
          {this.renderHousingDropdown()}
        </div>
        <br/>
        <div className="filter-panel-button">
          <Button style={{width:'100%'}} onClick={this.submit}>Go!</Button>
        </div>
      </Card>
    )
  }

}

export default Sidebar;
