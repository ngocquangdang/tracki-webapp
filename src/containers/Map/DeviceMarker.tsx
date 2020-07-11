import React from 'react';
import mapboxgl from 'mapbox-gl';

import './styles.scss';

interface Device {
  lat: number;
  lng: number;
  imageURL: string;
}

interface Props {
  map: any;
  device: Device;
}

class DeviceMarker extends React.Component<Props> {
  deviceMarker: any;

  componentDidMount() {
    this.renderDevice();
  }

  renderDevice = () => {
    const {
      map,
      device: { lat, lng, imageURL },
    } = this.props;

    if (map && !this.deviceMarker) {
      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
        <div class='icon-red'>
          <span class='inner'></span>
          <div class='marker-pin'>
            <img src=${imageURL} class='image-device'></img>
          </div>
        <div>
        `;
      this.deviceMarker = new mapboxgl.Marker(elm)
        .setLngLat([lng, lat])
        .addTo(map);
      return this.deviceMarker;
    }
  };

  render() {
    return null;
  }
}

export default DeviceMarker;
