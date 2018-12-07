import React, { Component } from 'react';
import { Button } from "reactstrap";
import Slider from './slider';

class SliderPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderNames: ["employment", "poverty"]
    };

    this.updateSliders = this.updateSliders.bind(this);
    this.renderSliders = this.renderSliders.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount = () => {
    this.sliderMap = new Map();
    this.state.sliderNames.map((sliderName) => {
      return (this.sliderMap.set(sliderName, 50));
    })
  }

  updateSliders = (event, value) => {
    var name = event.target.id;
    console.log(`Inserting (${name}, ${value})`)
    this.sliderMap.set(name, value);
  }

  renderSliders() {
    console.log(this.state.sliders);
    return (
      this.state.sliderNames.map((sliderName) => {
        return (
          <div id={sliderName} key={sliderName} className="slider-wrapper">
            <Slider label={sliderName} onChange={this.updateSliders.bind(this)}/>
          </div>
        )
      })
    )
  }

  submit(e) {
    for (var [key, value] of this.sliderMap.entries()) {
      console.log(key + ' = ' + value);
    }
  }

  render(){
    return(
      <div>
        <div className="filter-panel">
          {this.renderSliders()}
        </div>
        <div className="filter-panel-button">
          <Button style={{width:'100%'}} onClick={this.submit}>Go!</Button>
        </div>
      </div>
    )
  }

}

export default SliderPanel;
