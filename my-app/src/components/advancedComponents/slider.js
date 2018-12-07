import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import '../../styles/advanced.css'

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};

class SimpleSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 50,
    }
    this.handleChange.bind(this);
  }


  handleChange = (event, value) => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    const label = this.props.label;
    const value = this.state.value;

    const muiTheme = createMuiTheme({
      slider: {
        trackColor: 'black',
        selectionColor: 'black'
      },
    });

    return (
        <div>
          <h2> {label} </h2>
          <MuiThemeProvider muiTheme={muiTheme}>
            <Slider
              value={value}
              onChange={this.handleChange}
              min={0}
              max={100}
              step={10}
            />
          </MuiThemeProvider>
        </div>
    );
  }
}

export default SimpleSlider;
