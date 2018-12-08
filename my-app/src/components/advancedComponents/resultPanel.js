import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button, Row, Col } from "reactstrap";

class ResultPanel extends Component {
  constructor(props) {
    super(props)
    this.renderCards = this.renderCards.bind(this);
  }

  renderCards() {
    return (
      <div className='result-cards'>
        <div className='custom-card'>
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
        <div className='custom-card'>
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
    )
  }
  render() {
    return (
        <div >
          {this.renderCards()}
        </div>
    );
  }
}

export default ResultPanel;
