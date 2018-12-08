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
  state = {
    lat: 51.505,
    lng: -0.08,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const shouldDisplayState = this.props.shouldDisplayState;
    const shouldDidsplayCounty = this.props.shouldDisplayCounty;
    return (
        <div>
          <Map center={position} zoom={13} height={400}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <GeoJSON data={stateJson} />
            <GeoJSON data={countyJson} />
            <Marker position={position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
          </Map>
      </div>
    );
  }
}

export default Result;
