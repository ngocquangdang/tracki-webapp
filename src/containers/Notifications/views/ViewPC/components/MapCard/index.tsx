import React from 'react';
import L from 'leaflet';

import { MAPBOX_API_KEY } from '@Definitions/app';

const TILE_TOKEN =
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
  MAPBOX_API_KEY;
const TILE_OPTIONS = {
  maxZoom: 20,
  id: 'mapbox/streets-v11',
  accessToken: MAPBOX_API_KEY,
};

interface IProps {
  lat: number;
  lng: number;
  mapId: string;
  [data: string]: any;
}

interface IState {
  mapCenter: [number, number];
  mapZoom: number;
  isInitiatedMap: boolean;
}

class MapCard extends React.Component<IProps, IState> {
  map: any;
  tileLayer: any;
  marker: any;
  zoomControl: any;
  constructor(props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
      mapCenter: [this.props.lat, this.props.lng],
      mapZoom: 13,
    };
  }

  componentDidMount() {
    const { mapCenter, mapZoom } = this.state;
    const { lat, lng, mapId } = this.props;
    this.map = L.map(mapId, { attributionControl: false }).setView(
      mapCenter,
      mapZoom
    );
    window.mapType = 'leaflet';
    this.map.zoomControl.setPosition('bottomright');
    this.tileLayer = L.tileLayer(TILE_TOKEN, TILE_OPTIONS).addTo(this.map);
    this.marker = L.marker([lat, lng]).addTo(this.map);
  }

  render() {
    return (
      <div
        id={this.props.mapId}
        style={{ height: '318px', width: '100%' }}
      ></div>
    );
  }
}

export default MapCard;
