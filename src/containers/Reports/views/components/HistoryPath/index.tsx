import React from 'react';
import L from 'leaflet';
import 'leaflet-polylinedecorator';
import { lineDistance, along } from '@turf/turf';
import moment from 'moment';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';

import './styles.scss';

interface Props {
  historyLogs: object;
  historyLogIds: number[];
  isMobile?: boolean;
  isPlaying: boolean;
  togglePlaying: any;
  map: any;
  currentPointId: any;
  t(key: string, format?: object): string;
}

class HistoryPath extends React.Component<Props> {
  logsPath: any;
  decorator: any;
  pointTracking: any;
  points: object;
  startPoint: any;
  lastPoint: any;
  tempCoordinates: any;
  counter: any;
  steps: any;
  animatedPoint: any;
  frameAnimation: any;
  constructor(props) {
    super(props);
    this.points = {};
    this.logsPath = null;
    this.decorator = null;
    this.startPoint = null;
    this.lastPoint = null;
    this.animatedPoint = null;
    this.counter = 0;
    this.steps = 500;
    this.tempCoordinates = [];
  }

  componentDidMount() {
    this.renderPath(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { historyLogIds, isPlaying, currentPointId } = nextProps;
    const {
      historyLogIds: currentHistoryLogIds,
      isPlaying: thisPlaying,
      map,
      togglePlaying,
      historyLogs,
      currentPointId: thisPointId,
    } = this.props;
    if (historyLogIds.length !== currentHistoryLogIds.length) {
      this.removeLayer();
      this.renderPath(nextProps);
    }
    // reset path & markers
    if (historyLogIds.length !== currentHistoryLogIds.length) {
      if (this.logsPath) {
        map.removeLayer(this.logsPath);
        map.removeLayer(this.decorator);
        map.removeLayer(this.startPoint);
        this.lastPoint && map.removeLayer(this.lastPoint);
        this.animatedPoint && map.removeLayer(this.animatedPoint);
        Object.values(this.points).map(p => map.removeLayer(p));
        this.logsPath = null;
        this.animatedPoint = null;
        this.tempCoordinates = [];
        this.counter = 1;
        this.renderPath(nextProps);
      }
      thisPlaying && togglePlaying(false);
    }
    // toggleMove
    if (isPlaying !== thisPlaying) {
      isPlaying ? this.moveMarker() : cancelAnimationFrame(this.frameAnimation);
    }
    // goto next point
    if (currentPointId !== thisPointId && currentPointId) {
      const { latitude, longitude } = historyLogs[currentPointId];
      if (this.animatedPoint) {
        const index = this.tempCoordinates.findIndex(
          p => p[0] === longitude && p[1] === latitude
        );
        if (index >= 0) {
          this.counter = index;
          this.animatedPoint.setLatLng([latitude, longitude]);
        }
      }
    }
  }

  componentWillUnmount() {
    this.removeLayer();
    if (this.pointTracking) {
      this.pointTracking && this.props.map.removeLayer(this.pointTracking);
      this.pointTracking = undefined;
    }
  }

  removeLayer = () => {
    const { map } = this.props;
    if (this.logsPath) {
      map.removeLayer(this.logsPath);
    }
    if (this.decorator) {
      map.removeLayer(this.decorator);
    }
    Object.values(this.points).map(p => map.removeLayer(p));
  };

  markerTitle = datetime => {
    const timeStr = moment(datetime).format('DD MMM hh:mm A');
    const strWidth = timeStr.length * 6 + 10;
    return `<div class='title-device' style='width:${strWidth}px; left:-${
      strWidth / 2 - 4
    }px'>${timeStr}</div>`;
  };

  moveMarker = () => {
    if (this.tempCoordinates.length > 0) {
      const { map, togglePlaying } = this.props;
      const coordinate = this.tempCoordinates[this.counter];

      // update location
      if (this.counter <= this.steps && coordinate) {
        const [lng, lat] = coordinate;
        if (!this.animatedPoint) {
          const moveIcon = this.getMarkerIcon(null);
          this.animatedPoint = L.marker([lat, lng], { icon: moveIcon }).addTo(
            map
          );
        }
        this.animatedPoint.setLatLng([lat, lng]);
        this.counter += 1;
        this.frameAnimation = requestAnimationFrame(this.moveMarker);
      } else {
        // remove if play completed
        this.counter = 1;
        togglePlaying(false);
        this.animatedPoint && map.removeLayer(this.animatedPoint);
        this.animatedPoint = null;
      }
    }
  };

  createTempCoordinates = coordinates => {
    const lnglats = coordinates.map(p => [p.lng, p.lat]);
    const opts = { units: 'kilometers' as any };
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: lnglats,
      },
    } as any;
    const distance = lineDistance(feature, opts);
    for (let i = 0; i < distance; i += distance / this.steps) {
      const segment = along(feature, i, opts) as any;
      this.tempCoordinates.push(segment.geometry.coordinates);
    }
  };

  getMarkerIcon = datetime => {
    const elm = document.createElement('div');
    elm.className = `custom-div-icon`;
    elm.innerHTML = `
      <div class='icon-red'>
        <span class='inner'></span>
        <div class='marker-pin' style='background-image:url(${'/images/icon-marker.svg'})'>
          <img src='/images/image-device.png' class='image-device'></img>
        </div>
        ${datetime ? this.markerTitle(datetime) : ''}
      </div>`;
    return new L.DivIcon({ html: elm, className: 'custom-div-icon' });
  };

  renderPath = props => {
    const { historyLogs, historyLogIds, map, isMobile } = props;
    const path =
      historyLogIds.length > 0 &&
      historyLogIds
        .filter(id => !!historyLogs[id].lat)
        .sort((a, b) => a - b)
        .map(id => ({
          id,
          lat: historyLogs[id].lat,
          lng: historyLogs[id].lng,
          moving: historyLogs[id].moving,
          time: moment(historyLogs[id].time * 1000).format('LL'),
        }));
    if (path.length) {
      this.points = path.reduce((obj, p, index) => {
        const icon = new L.DivIcon({
          className: `point-dot ${
            p.moving || index === 0 ? 'point-moving' : 'point-stop'
          }`,
        });
        obj[p.id] = L.marker(p, { icon }).addTo(map);
        return obj;
      }, {});
      this.logsPath = L.polyline(path, { color: '#168449', weight: 2 });
      this.logsPath.addTo(map);
      this.decorator = L.polylineDecorator(this.logsPath, {
        patterns: [
          {
            offset: 0,
            repeat: 40,
            symbol: L.Symbol.arrowHead({
              pixelSize: 6,
              pathOptions: {
                color: '#168449',
                fillColor: '#168449',
                opacity: 1,
              },
            }),
          },
        ],
      }).addTo(map);
      // zoom the map to the polyline
      const mapOption =
        isMobile || window.mapFullWidth ? {} : LEAFLET_PADDING_OPTIONS;
      map.fitBounds(this.logsPath.getBounds(), mapOption);
      this.createTempCoordinates(path);
    }
  };

  render() {
    return null;
  }
}

export default HistoryPath;
