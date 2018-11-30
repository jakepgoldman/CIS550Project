import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';

class Predefined extends React.Component {
  render() {
    return (
      <Container>
          <Form>
            <FormGroup>
              <Label for="exampleSelectMulti">I am ...</Label>
              <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                <option>Explorer</option>
                <option>Parent</option>
                <option>Single</option>
                <option>City-Goer</option>
                <option>Boujee</option>
              </Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
      </Container>
    );
  }
}

export default Predefined;
