import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button, Row, Col } from "reactstrap";

class ResultPanel extends Component {
  render() {
    return (
      <div className='advanced-result-column'>
        <div className='card'>
          <Card body>
            <CardTitle tag='h4'>Your Top Choices:</CardTitle>
            <CardText>
              <ol>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </ol>
            </CardText>
          </Card>
        </div>
        <div className='card'>
          <Card body>
            <CardTitle tag='h4'>Your Bottom Choices:</CardTitle>
            <CardText>
              <ol>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
              </ol>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default ResultPanel;
