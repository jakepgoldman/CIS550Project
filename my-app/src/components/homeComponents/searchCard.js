import React from 'react';
import { Card, CardTitle, CardText, Button, Form, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';
import '../../styles/home.css'

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      'choice': '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    console.log(`Choice: ${ this.state.choice }`);
    // Query
  }

  handleChange(e) {
    const { target } = e;
    const value = target.value;
    console.log(`Dropdown selected value: ${value}`);
    this.setState({
      'choice': value
    });
  }

  render() {
    const { choice } = this.state;
    return (
      <Card body>
        <CardTitle className="display-4">Find your next hometown.</CardTitle>
        <h2 className="display-6"> I am ... </h2>
        <Form onSubmit={ (e) => this.submitForm(e) }>
          <FormGroup>
          <Input type="select" name="select" value={ choice } onChange={ (e) => { this.handleChange(e)} }>
            <option> An Explorer</option>
            <option>A Parent</option>
            <option>Single</option>
            <option>A City-Goer</option>
            <option>Boujee</option>
            </Input>
          </FormGroup>
        </Form>
        <Button onClick={(e) => {this.submitForm(e)}}>Start Looking!</Button>
      </Card>
    );
  }
}

export default SearchCard;
