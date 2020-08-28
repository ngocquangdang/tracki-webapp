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

class TrackerMarker extends React.Component<Props> {
  constructor(props) {
    super(props);
    window.trackerMarkers = window.trackerMarkers || {};
  }

  componentWillReceiveProps(nextProps) {
    const {
      isBeep,
      showTrackerName,
      selectedTrackerId: nextSelectedTrackerId,
    } = nextProps;
    const {
      isBeep: currentIsBeep,
      tracker,
      selectedTrackerId,
      showTrackerName: thisShowTrackerName,
    } = this.props;
    const marker = window.trackerMarkers[tracker.device_id];
    const element = marker ? marker.getElement() : undefined;

    if (nextSelectedTrackerId !== selectedTrackerId && element) {
      element.style.zIndex =
        tracker.device_id === nextSelectedTrackerId ? 2 : 1;
    }

    if (
      (isBeep !== currentIsBeep || showTrackerName !== thisShowTrackerName) &&
      marker &&
      tracker
    ) {
      const isSelected =
        tracker.device_id.toString() === selectedTrackerId?.toString();
      const elm2 = document.createElement('div');
      elm2.className = `custom-div-icon${
        isBeep && isSelected ? '-custom' : ''
      }`;
      elm2.innerHTML = `
        <div class='icon-red${isBeep && isSelected ? '-active' : ''}'>
          <span class='inner'></span>
          <div class='marker-pin' style='background-image:url(${
            tracker.status === 'active'
              ? '/images/icon-marker.svg'
              : '/images/red-marker.svg'
          })'
          >
            ${
              tracker.icon_url
                ? `<div class='image-marker' style='background-image: url(${tracker.icon_url})'></div>`
                : `<img src='/images/image-device.png'
                } class='image-device'></img>`
            }
          </div>
         ${
           showTrackerName
             ? this.trackerName(tracker.device_name, tracker.status)
             : ''
         }
        </div>`;
      const icon = new L.DivIcon({ html: elm2 });
      marker.setIcon(icon);
      if (element) {
        element.style.zIndex = isSelected ? 2 : 1;
      }
    }
  }

  onZoomEnd = () => {
    const { tracker, selectedTrackerId } = this.props;
    const marker = window.trackerMarkers[tracker.device_id];
    const element = marker ? marker.getElement() : undefined;
    const isSelected =
      tracker.device_id.toString() === selectedTrackerId?.toString();

    if (element) {
      element.style.zIndex = isSelected ? 2 : 1;
    }
  };

  componentDidMount() {
    const { map } = this.props;
    map.on('zoomend', this.onZoomEnd);
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.off('zoomend', this.onZoomEnd);
  }

  onClickMarker = () => {
    const {
      tracker: { device_id },
      onClickMarker,
    } = this.props;
    onClickMarker && onClickMarker(device_id);
  };

  trackerName = (name: string, status: string) => {
    const nameWidth = name.length * 9;
    return `<div class=${
      status === 'active' ? 'title-device' : 'red-title-device'
    } style='width:${nameWidth}px; left:-${nameWidth / 2 - 4}px'>${name}</div>`;
  };

  renderTracker = () => {
    const {
      map,
      showTrackerName,
      tracker: { device_id, lat, lng, icon_url, device_name, status },
    } = this.props;

    if (map && !window.trackerMarkers[device_id] && lat && lng) {
      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
        <div class='icon-red'>
          <span class='inner'></span>
          <div class='marker-pin' style='background-image: url(${
            status === 'active'
              ? '/images/icon-marker.svg'
              : '/images/red-marker.svg'
          })'
          >
            ${
              icon_url
                ? `<div class='image-marker' style='background-image: url(${icon_url})'></div>`
                : `<img src='/images/image-device.png'
                } class='image-device'></img>`
            }
          ${showTrackerName ? this.trackerName(device_name, status) : ''}
        </div>`;

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
