import React from 'react';
import mapboxgl from 'mapbox-gl';

import './styles.scss';

interface Device {
  status: string;
  age: number;
  gps: boolean;
  device_id: number;
  device_name: string;
  icon_url: string;
  settings_id: number;
  icon_version: 1588171186000;
  type_id: number;
  type: string;
  location_id: number;
  lat: number;
  lng: number;
  speed: number;
  battery: number;
  is_triangulated: boolean;
  location_type: string;
  time: number;
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
      device: { lat, lng, icon_url, device_name },
    } = this.props;

    if (map && !this.deviceMarker) {
      const nameWidth = device_name.length * 7;
      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
        <div class='icon-red'>
          <span class='inner'></span>
          <div class='marker-pin'>
            <img src=${icon_url} class='image-device'></img>
          </div>
        <div>
        <div class='title-device' style='width:${nameWidth}px; left:-${
        nameWidth / 2 - 4
      }px'>${device_name}</div>
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
