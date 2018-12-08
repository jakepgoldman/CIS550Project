import React, { Component } from 'react';
import { Card, Button, FormGroup, Label, Input } from "reactstrap";
import Slider from './slider';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sliderNames = ["employment", "poverty", "education", "crime"];
    this.radioButtonNames = ["By State", "By County"];
    this.updateSliders = this.updateSliders.bind(this);
    this.renderSliders = this.renderSliders.bind(this);
    this.updateRadioButtons = this.updateRadioButtons.bind(this);
    this.renderRadioButtons = this.renderSliders.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      'radioButtonValue': ' '
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
      console.log(`Inserting (${name}, ${value})`)
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
  updateRadioButtons = (value) => {
    console.log(`Inserting ( ${value})`)
    return;
  }

  /* Iterative function to render all of the radio buttons */
  renderRadioButtons = () => {
    return(
      <FormGroup>
        {
          this.radioButtonNames.map((name) => {
            return (
              <FormGroup check>
                <Label check>
                  <Input type="radio" name={name} key={name} onClick={this.updateRadioButtons.bind(this)}/>
                  {name}
                </Label>
              </FormGroup>
            );
          })
        }
      </FormGroup>
    )
  }

  submit = (e) => {
    for (var [key, value] of this.sliderMap.entries()) {
      console.log(key + ' = ' + value);
    }
  }

  render(){
    return(
      <Card body className="sidebar">
        <br/>
        <div className="panel-content">
          {this.renderSliders()}
          <br/>
          {this.renderRadioButtons()}
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
