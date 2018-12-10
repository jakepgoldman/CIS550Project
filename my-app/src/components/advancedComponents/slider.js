import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';

import '../../styles/advanced.css'

class SimpleSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
    this.handleSliderChange.bind(this);
  }

  handleSliderChange = (event, value) => {
    this.setState({ value });
    this.props.onChange(this.props.label, value);
  };

  render() {
    const label = this.props.label;
    const value = this.state.value;
    var upper = label.charAt(0).toUpperCase() + label.substr(1) + ':';
    return (
        <div>
          <h6> {upper} </h6>
            <Slider
              value={value}
              label={label}
              id={label}
              onChange={this.handleSliderChange}
            />
        </div>
    );
  }
}

export default SimpleSlider;
