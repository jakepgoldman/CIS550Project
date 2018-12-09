import React from 'react';
import { Route } from 'react-router-dom';
import { Card, Button, Form, FormGroup, Input } from 'reactstrap';
import '../../styles/home.css'

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'choice': 'An Explorer', /* default */
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  submitForm(history) {
    this.props.handlePredefinedSearchQuery(this.state.choice);
    history.push('/advanced');
  }

  handleChange(e) {
    const { target } = e;
    const value = target.value;
    console.log(`Dropdown selected value: ${value}`);
    this.setState({
      'choice': value
    });
  }

  renderButton = () => {
    return (
      <Route render={({ history}) => (
        <Button onClick={() => {this.submitForm(history)}}> Start Looking!</Button>
      )}/>
    )
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
            <option>A City-Goer</option>
            <option>Boujee</option>
            <option>A Crime Lord</option>
            </Input>
          </FormGroup>
        </Form>
        <br/>
        {this.renderButton()}
      </Card>
    );
  }
}

export default SearchCard;
