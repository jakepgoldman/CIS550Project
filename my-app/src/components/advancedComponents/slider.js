import React, { Component } from 'react';

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};

class Slider extends Component {
  constructor() {
    this.state = {
      value: 50,
    };

    this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const label = this.props;
    const { value } = this.state;

    return (
      <div>
        <h2>{label}</h2>
        <Slider
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Slider;
