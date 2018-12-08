import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button, Row, Col } from "reactstrap";
import Map from "../result.js"

class ResultPanel extends Component {
  constructor(props) {
    super(props)
    this.positions = ["first", "second", "third"];
    this.renderCards = this.renderCards.bind(this);
    this.rendermap = this.renderMap.bind(this);
  }

  renderCards() {
    return (
        this.props.results.map((result) => {
        var title = "Your " + this.positions[result.number - 1] + " choice:"
        return (
          <div key={result.fips} className='custom-card'>
            <Card body>
              <CardTitle tag='h4'> {title} </CardTitle>
              <CardText> {result.fips} </CardText>
            </Card>
          </div>
        )
      })
    )
  }

  renderMap = () => {
    var fipsArr = [];
    this.props.results.map((result) => {
      console.log(result.fips);
      fipsArr.push(result.fips);
    })
    return (
      <div className="map-box">
        <Map shouldDisplayState={true} shouldDisplayCounty={true} counties={fipsArr}/>
      </div>
    )
  }

  render() {
    return (
        <div >
          <div className='result-cards'>
            {this.renderCards()}
          </div>
          {this.renderMap()}
        </div>
    );
  }
}

export default ResultPanel;
