import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Row, Col } from "reactstrap";
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

import stateJson from './state.json';
import countyJson from './county.json';

import '../styles/resultmap.css'
import 'leaflet/dist/leaflet.css';

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

class Result extends Component {
  constructor(props) {
    super(props)
    this.renderStateLayer = this.renderStateLayer.bind(this);
    this.renderCountyLayer = this.renderCountyLayer.bind(this);
  }

  state = {
    lat: 38.00,
    lng: -98.00,
    zoom: 4,
  }

  renderStateLayer() {
    const shouldDisplayState = this.props.shouldDisplayState;
    if (shouldDisplayState) {
      return(
        <GeoJSON data={stateJson} />
      )
    }
  }

  renderCountyLayer() {
    const shouldDisplayCounty = this.props.shouldDisplayCounty;
    if (shouldDisplayCounty) {
      return(
        <GeoJSON data={countyJson} />
      )
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const shouldDisplayState = this.props.shouldDisplayState;
    const shouldDidsplayCounty = this.props.shouldDisplayCounty;
    return (
        <div>
          <Map center={position} zoom={this.state.zoom} height={400}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {this.renderStateLayer()}
            {this.renderCountyLayer()}
            <Marker position={position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
          </Map>
      </div>
    );
  }
}

export default Result;
