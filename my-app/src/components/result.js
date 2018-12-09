import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Row, Col } from "reactstrap";
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

import stateJson from './state.json';
import countyJson from './county.json';

import '../styles/resultmap.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'geojson-polygon-center';

var polygonCenter = require('geojson-polygon-center');

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
    this.addMarker = this.addMarker.bind(this);
    this.state = {
      lat: 38,
      lng: -98,
      zoom: 3,
      markers: this.addMarker(),
    }
  }

  componentWillReceiveProps(props) {
    this.setState({'markers': this.addMarker()}, () => {this.forceUpdate()});
    console.log(this.state.markers)
  }

  getCountyCenter(fips) {
    console.log(fips)
    var paddedFips = String(fips).padStart(5, '0');
    console.log(paddedFips)
    var geometry = countyJson['features'].filter(
      county =>
        county['properties']['STATE']==paddedFips.toString().slice(0, 2) &&
        county['properties']['COUNTY']==paddedFips.toString().slice(2, 5)
    )[0]['geometry'];
    var center = polygonCenter(geometry)['coordinates'];
    if (geometry['type'] === 'MultiPolygon') {
      var coords = geometry['coordinates'][0];
      var newGeo = {
        'type': 'Polygon',
        'coordinates': coords
      }
      center = polygonCenter(newGeo)['coordinates'];
    }
    var newCenter = [center[1], center[0]];
    return newCenter;
  }

  addMarker = () => {
    const markers = [];
    this.props.counties.map((county) => {markers.push(this.getCountyCenter(county))});
    return markers;
  }

  getColor(state, county) {
    var fips = state + county;
    return this.props.counties.includes(fips) ? '#BC98D6' : ''
  }

  getFillOpacity(state, county) {
    var fips = state + county;
    return this.props.counties.includes(fips) ? 0.7 : 0
  }

  countyFill(feature) {
    return ({
        fillColor: this.getColor(feature.properties.STATE, feature.properties.COUNTY),
        weight: 0.1,
        opacity: 1,
        dashArray: '3',
        fillOpacity: this.getFillOpacity(feature.properties.STATE, feature.properties.COUNTY),
        color: 'white'
      })
  }

  renderStateLayer() {
    const shouldDisplayState = this.props.shouldDisplayState;
    if (shouldDisplayState) {
      return (
        <GeoJSON data={countyJson} style={this.countyFill}/>
      )
    }
  }

  renderCountyLayer() {
    const shouldDisplayCounty = this.props.shouldDisplayCounty;
    if (shouldDisplayCounty) {
      return (
        <GeoJSON data={countyJson} style={this.countyFill}/>
      )
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const shouldDisplayState = this.props.shouldDisplayState;
    const shouldDisplayCounty = this.props.shouldDisplayCounty;
    return (
        <div>
          <Map center={position}
               zoom={this.state.zoom}
               height={400}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {this.state.markers.map((position, idx) =>
              <Marker key={`marker-${idx}`} position={position} />
            )}
            // {this.renderStateLayer()}
            {this.renderCountyLayer()}
          </Map>
      </div>
    );
  }
}

export default Result;
