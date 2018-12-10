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
<<<<<<< HEAD
    this.props.onChange(this.props.label, value);
  };
=======
    this.props.onChange(event, value);
  }
>>>>>>> 2de9c1226811c4b8f6c394576dae56648d2211b2

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
