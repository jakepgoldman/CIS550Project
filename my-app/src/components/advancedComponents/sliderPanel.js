import React, { Component } from 'react';
import { Card, Button } from "reactstrap";
import Slider from './slider';

class SliderPanel extends Component {
  constructor(props) {
    super(props);
    this.sliderNames = ["employment", "poverty", "education", "crime"];
    this.updateSliders = this.updateSliders.bind(this);
    this.renderSliders = this.renderSliders.bind(this);
    this.submit = this.submit.bind(this);
  }

  /* Initalize the map of slider values upon mount */
  componentWillMount = () => {
    this.sliderMap = new Map();
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

  /* Iterative function to render all of the sliderss */
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

  submit = (e) => {
    for (var [key, value] of this.sliderMap.entries()) {
      console.log(key + ' = ' + value);
    }
  }

  render(){
    return(
      <Card body style={{height: '100%'}}>
        <br/>
        <div className="filter-panel">
          {this.renderSliders()}
        </div>
        <br/>
        <div className="filter-panel-button">
          <Button style={{width:'100%'}} onClick={this.submit}>Go!</Button>
        </div>
      </Card>
    )
  }

}

export default SliderPanel;
