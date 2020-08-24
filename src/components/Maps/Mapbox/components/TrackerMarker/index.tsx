import React from 'react';
import mapboxgl from 'mapbox-gl';

import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
  onClickMarker(id: string | number): void;
  isBeep: boolean | null;
}

class TrackerMarker extends React.Component<Props> {
  marker: any;

  componentDidMount() {
    this.renderTracker();
  }

  onClickMarker = () => {
    const {
      tracker: { device_id },
      onClickMarker,
    } = this.props;
    onClickMarker(device_id);
  };

  renderTracker = () => {
    const {
      map,
      tracker: { lat, lng, icon_url, device_name },
      isBeep,
    } = this.props;

    if (map && !this.marker && lat && lng) {
      const nameWidth = device_name.length * 9;
      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
        <div class=${isBeep ? 'icon-red-active' : 'icon-red'}>
          <span class='inner'></span>
          <div class='marker-pin'>
          ${
            icon_url
              ? `<div class='image-maker' style='background-image: url(${icon_url})'></div>`
              : `<img src='/images/image-device.png'
              } class='image-device'></img>`
          }
          </div>
        <div>
        <div class='title-device' style='width:${nameWidth}px; left:-${
        nameWidth / 2
      }px'>${device_name}</div>
        `;
      this.marker = new mapboxgl.Marker(elm).setLngLat([lng, lat]).addTo(map);
      elm.addEventListener('click', this.onClickMarker);
      return this.marker;
    }
  };

  render() {
    return null;
  }
}

export default TrackerMarker;
