import React, { Component } from 'react';
import { ListItem } from 'react';
import { Container, Row, Col, FormGroup, Label, Input} from "reactstrap";
import Slider from './slider';

class SliderPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: [
        {"field": "employment", "value": 0},
        {"field": "poverty", "value": 0}
      ]
    };

    this.renderSliders = this.renderSliders.bind(this);
  }

  renderSliders() {
    console.log(this.state.sliders);
    return (
      this.state.sliders.map(function (sliderData) {
        console.log(sliderData);
        var sliderName = sliderData.name;
        var sliderValue = sliderData.value;
        return (
          <div key={sliderName}>
          <Slider label={sliderName}/>
          </div>
        )
      })
    )
  }

  render(){
    return(
      <div className="filter-panel">
        <h1> "Hello" </h1>
        {this.renderSliders()}
      </div>
    )
  }

}

export default SliderPanel;
