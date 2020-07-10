import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapBox } from './style';
import CaseMarker from './CaseMarker';

class Map extends Component {
  map: any;

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibGlrZWd1aXRhciIsImEiOiJjajN6a2ppYTQwMmN3MndxbTkzNGR0cThuIn0.HU8h498IT6jCya-G2_lczQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/streets-v11`,
      maxZoom: 20,
      bounds: [
        [102.170435826, 8.59975962975],
        [109.33526981, 23.3520633001],
      ],
      fitBoundsOptions: {
        padding: 20,
      },
    });
    setTimeout(() => {
      this.map.flyTo({
        center: [108.178898, 16.061922],
        essential: true,
        zoom: 10,
      });
    }, 3000);
  }

  render() {
    return (
      <MapBox
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
        }}
      >
        <CaseMarker map={this.map} lat="16.053962" lng="08.216041" />
      </MapBox>
    );
  }
}

export default Map;
