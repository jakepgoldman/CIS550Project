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
    this.countyFill = this.countyFill.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  state = {
    lat: 38.00,
    lng: -98.00,
    zoom: 4,
  }

  getColor(state, county) {
    var fips = state + county;
    return this.props.counties.includes(fips) ? '#800026' : ''
  }

  countyFill(feature) {
    return ({
        fillColor: this.getColor(feature.properties.STATE, feature.properties.COUNTY),
        weight: 2,
        opacity: 1,
        dashArray: '3',
        fillOpacity: 0.7,
        color: 'white'
      })
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
        <GeoJSON data={countyJson} style={this.countyFill}/>
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
