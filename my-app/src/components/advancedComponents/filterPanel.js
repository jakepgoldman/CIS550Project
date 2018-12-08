import React, { Component } from 'react';
import { Card, Form, Button } from 'reactstrap';

import '../../styles/advanced.css';

import CheckboxPanel from './checkboxPanel';

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'fieldSelected': '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    console.log(`Choice: ${ this.state.fieldSelected }`);
    // Query
  }

  handleChange(e) {
    const { target } = e;
    const name = target.name;
    console.log(`Checkbox selected value: ${name}`);
    this.setState({
      'fieldSelected': name
    });
  }

  renderFilterPanel() {
    return(
      <Form onSubmit={ (e) => this.submitForm(e)}>
        <CheckboxPanel filters={filters} onChange={this.handleChange.bind(this)}/>
      </Form>
    );
  }

  render() {
    const choice = this.props.choice
    const filters = this.props.filters
    return(
      <Card body className="filter-panel">
        <br/>
        <h3 className="display-6 text-center">Your preferences:</h3>
        <br/>
        {renderFilterPanel()}
        <br/>
        <Button onClick={(e) => {this.submitForm(e)}}> Update your results</Button>
      </Card>
    )
  }
}

export default FilterPanel;
