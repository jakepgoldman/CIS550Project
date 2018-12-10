import React, { Component } from 'react';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';

import countyJson from './county.json';

import '../styles/resultmap.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'geojson-polygon-center';

var polygonCenter = require('geojson-polygon-center');

class Result extends Component {
  constructor(props) {
    super(props)
    this.renderStateLayer = this.renderStateLayer.bind(this);
    this.renderCountyLayer = this.renderCountyLayer.bind(this);
    this.countyFill = this.countyFill.bind(this);
    this.getColor = this.getColor.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.renderMakers = this.renderMarkers.bind(this);

    this.state = {
      lat: 38,
      lng: -98,
      zoom: 3,
      markers: this.addMarker(),
    }
  }

  componentWillReceiveProps(props) {
    console.log(this.props.counties)
    this.setState({'markers': this.addMarker()}, () => {this.forceUpdate()});
    console.log(this.state.markers)
  }

  getCountyCenter(fips) {
    console.log(fips)
    var paddedFips = String(fips).padStart(5, '0');
    console.log(paddedFips)
    var geometry = countyJson['features'].filter(
      county =>
        county['properties']['STATE'] === paddedFips.toString().slice(0, 2) &&
        county['properties']['COUNTY'] === paddedFips.toString().slice(2, 5)
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
    console.log("HERE!!!")
    console.log(this.props.counties)
    const markers = [];
    this.props.counties.map((county) =>
      {
        return(markers.push(this.getCountyCenter(county)))
      });
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

  renderMarkers() {
    if (!this.props.housingFilter) {
      return (
        this.state.markers.map((position, idx) =>
          <Marker key={`marker-${idx}`} position={position} />
        )
      );
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
        <div>
          <Map center={position}
               zoom={this.state.zoom}
               height={400}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {this.renderMarkers()}
            {this.renderCountyLayer()}
          </Map>
      </div>
    );
  }
}

export default Result;
