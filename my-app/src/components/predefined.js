import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';

class Predefined extends React.Component {
  render() {
    return (
      <Container>
          <Form>
            <FormGroup>
            <Label for="dropDown">I am...</Label>
            <Input type="select" name="select" id="dropDown">
              <option>An Explorer</option>
              <option>A Parent</option>
              <option>Single</option>
              <option>A City-Goer</option>
              <option>Boujee</option>
              </Input>
            </FormGroup>
            <Button>Go!</Button>
          </Form>
      </Container>
    );
  }
}

export default Predefined;
