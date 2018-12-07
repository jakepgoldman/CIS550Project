import React, { Component } from 'react';
import { ListItem } from 'react';
import { Container, Row, Col, FormGroup, Label, Input} from "reactstrap";

class CheckboxPanel extends Component {
  constructor(props) {
    super(props);
    this.renderCheckboxes = this.renderCheckboxes.bind(this);
  }

  renderCheckboxes() {
    const filters = this.props.filters
    const onChange = this.props.onChange
    onChange.bind(this)
    console.log(filters);
    return (
      filters.map(function (filter) {
        var upper = filter.charAt(0).toUpperCase() + filter.substr(1)
        return (
          <div key={filter}>
          <Input type="checkbox" name={filter} id="exampleCheck" onChange = { onChange }/>
          <Label for="exampleCheck" check>{upper}</Label>
          </div>
        )
      })
    )
  }

  render(){
    return(
      <div className="filter-panel">
        <FormGroup check>
          {this.renderCheckboxes()}
        </FormGroup>
      </div>
    )
  }

}

export default CheckboxPanel;
