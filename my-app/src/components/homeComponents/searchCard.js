import React from 'react';
import { Card, Button, Form, FormGroup, Input } from 'reactstrap';
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
      <Card body className="search-card">
        <br/>
        <h2>Find your next hometown.</h2>
        <br/>
        <h4> I am ... </h4>
        <Form onSubmit={ (e) => this.submitForm(e) }>
          <FormGroup>
          <Input type="select" name="select" value={ choice } onChange={ (e) => { this.handleChange(e)} }>
            <option>An Explorer</option>
            <option>A Parent</option>
            <option>Single</option>
            <option>A City-Goer</option>
            <option>Boujee</option>
            </Input>
          </FormGroup>
        </Form>
        <br/>
        <Button onClick={(e) => {this.submitForm(e)}}> Start Looking!</Button>
      </Card>
    );
  }
}

export default SearchCard;
