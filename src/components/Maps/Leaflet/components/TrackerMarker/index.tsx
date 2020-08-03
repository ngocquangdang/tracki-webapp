import React from 'react';
import L from 'leaflet';

import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
  onClickMarker(id: string | number): void;
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
              icon_url || '/images/image-device.png'
            } class='image-device'></img>
          </div>
        <div>
        <div class='title-device' style='width:${nameWidth}px; left:-${
        nameWidth / 2 - 4
      }px'>${device_name}</div>`;

      const icon = new L.DivIcon({ html: elm });
      this.marker = L.marker([lat, lng], { icon }).addTo(map);
      elm.addEventListener('click', this.onClickMarker);
      return this.marker;
    }
  };

  render() {
    return null;
  }
}

export default TrackerMarker;
