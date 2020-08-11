import React from 'react';
import L from 'leaflet';

import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
  isBeep: boolean;
  showTrackerName: boolean;
  selectedTrackerId?: number | null;
  onClickMarker(id: string | number): void;
}

declare global {
  interface Window {
    trackerMarkers: object;
  }
}

class TrackerMarker extends React.Component<Props> {
  constructor(props) {
    super(props);
    window.trackerMarkers = window.trackerMarkers || {};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isBeep, showTrackerName } = nextProps;
    const {
      isBeep: currentIsBeep,
      tracker,
      selectedTrackerId,
      showTrackerName: thisShowTrackerName,
    } = this.props;
    const marker = window.trackerMarkers[tracker.device_id];

    if (
      (isBeep !== currentIsBeep || showTrackerName !== thisShowTrackerName) &&
      marker &&
      tracker
    ) {
      const elm2 = document.createElement('div');
      elm2.className = `custom-div-icon${
        isBeep && tracker.device_id === selectedTrackerId ? '-custom' : ''
      }`;
      elm2.innerHTML = `
        <div class='icon-red${
          isBeep && tracker.device_id === selectedTrackerId ? '-active' : ''
        }'>
          <span class='inner'></span>
          <div class='marker-pin'>
            <img src=${
              tracker.icon_url || '/images/image-device.png'
            } class='image-device'></img>
          </div>
        <div>${showTrackerName ? this.trackerName(tracker.device_name) : ''}`;
      const icon = new L.DivIcon({ html: elm2 });
      marker.setIcon(icon);
    }
  }

  onClickMarker = () => {
    const {
      tracker: { device_id },
      onClickMarker,
    } = this.props;
    onClickMarker(device_id);
  };

  trackerName = (name: string) => {
    const nameWidth = name.length * 9;
    return `<div class='title-device' style='width:${nameWidth}px; left:-${
      nameWidth / 2 - 4
    }px'>${name}</div>`;
  };

  renderTracker = () => {
    const {
      map,
      showTrackerName,
      tracker: { device_id, lat, lng, icon_url, device_name },
    } = this.props;

    if (map && !window.trackerMarkers[device_id] && lat && lng) {
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
        <div>${showTrackerName ? this.trackerName(device_name) : ''}`;

      const icon = new L.DivIcon({ html: elm });
      elm.addEventListener('click', this.onClickMarker);
      window.trackerMarkers[device_id] = L.marker([lat, lng], { icon });
      window.trackerMarkers[device_id].addTo(map);
    }
  };

  render() {
    return <>{this.renderTracker()}</>;
  }
}

export default TrackerMarker;
