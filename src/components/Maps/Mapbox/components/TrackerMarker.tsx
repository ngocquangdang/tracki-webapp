import React from 'react';
import mapboxgl from 'mapbox-gl';

import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
}

class TrackerMarker extends React.Component<Props> {
  marker: any;

  componentDidMount() {
    this.renderTracker();
  }

  renderTracker = () => {
    const {
      map,
      tracker: { lat, lng, icon_url, device_name },
    } = this.props;

    if (map && !this.marker && lat && lng) {
      const nameWidth = device_name.length * 9;
      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
        <div class='icon-red'>
          <span class='inner'></span>
          <div class='marker-pin'>
            <img src=${
              icon_url || 'images/image-device.png'
            } class='image-device'></img>
          </div>
        <div>
        <div class='title-device' style='width:${nameWidth}px; left:-${
        nameWidth / 2 - 4
      }px'>${device_name}</div>
        `;
      this.marker = new mapboxgl.Marker(elm).setLngLat([lng, lat]).addTo(map);
      return this.marker;
    }
  };

  render() {
    return null;
  }
}

export default TrackerMarker;
