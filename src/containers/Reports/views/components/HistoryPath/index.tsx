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
  steps?: number;
  counter?: number;
  onChangeCounter(value?: any): void;
  changeModeViewMap(modeMap?: string): void;
  coordinateOptimized?: number[];
  modeMap?: string;
  t(key: string, format?: object): string;
}

class HistoryPath extends React.Component<Props> {
  logsPath: any;
  decorator: any;
  pointTracking: any;
  points: object;
  tempCoordinates: any;
  counter: any;
  steps: any;
  animatedPoint: any;
  frameAnimation: any;
  pathOptimized: any;
  decoratorOptimized: any;

  constructor(props) {
    super(props);
    this.points = {};
    this.logsPath = null;
    this.pathOptimized = null;
    this.decorator = null;
    this.decoratorOptimized = null;
    this.animatedPoint = null;
    this.counter = this.props.counter || 0;
    this.steps = this.props.steps || 500;
    this.tempCoordinates = [];
  }

  componentDidMount() {
    this.renderPath(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {
      historyLogIds,
      isPlaying,
      currentPointId,
      steps,
      counter,
      coordinateOptimized,
      modeMap,
    } = nextProps;
    const {
      historyLogIds: currentHistoryLogIds,
      isPlaying: thisPlaying,
      map,
      togglePlaying,
      historyLogs,
      currentPointId: thisPointId,
      steps: currentSteps,
      counter: currentCounter,
      coordinateOptimized: currentCoordinateOptimized,
      changeModeViewMap,
      modeMap: currentModeMap,
    } = this.props;
    if (historyLogIds !== currentHistoryLogIds) {
      this.removeLayerOptimized();
      this.removeLayer();
      this.renderPath(nextProps);
    }
    if (!isPlaying && counter !== currentCounter) {
      this.counter = counter;
      const coordinate = this.tempCoordinates[this.counter];
      const [lng, lat] = coordinate;
      if (!this.animatedPoint) {
        const moveIcon = this.getMarkerIcon(null);
        this.animatedPoint = L.marker([lat, lng], { icon: moveIcon }).addTo(
          map
        );
      }
      this.animatedPoint.setLatLng([lat, lng]);
    }

    if (
      !!this.pathOptimized &&
      !!this.decoratorOptimized &&
      currentModeMap !== modeMap &&
      modeMap === 'actual'
    ) {
      map.removeLayer(this.pathOptimized);
      map.removeLayer(this.decoratorOptimized);
      this.pathOptimized = null;
    }

    if (steps !== currentSteps) {
      this.steps = steps;
      map.removeLayer(this.logsPath);
      map.removeLayer(this.decorator);
      Object.values(this.points).map(p => map.removeLayer(p));
      this.logsPath = null;
      this.tempCoordinates = [];
      this.counter = 1;
      this.renderPath(nextProps);
      thisPlaying && togglePlaying(true);
    }
    // reset path & markers
    if (historyLogIds !== currentHistoryLogIds) {
      if (this.logsPath) {
        map.removeLayer(this.logsPath);
        map.removeLayer(this.decorator);

        this.animatedPoint && map.removeLayer(this.animatedPoint);
        Object.values(this.points).map(p => map.removeLayer(p));

        this.animatedPoint = null;
        this.tempCoordinates = [];
        this.counter = 1;
        this.renderPath(nextProps);
        changeModeViewMap && changeModeViewMap('actual');
      }
      if (this.pathOptimized) {
        map.removeLayer(this.pathOptimized);
        map.removeLayer(this.decoratorOptimized);
        this.pathOptimized = null;
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
    if (
      currentCoordinateOptimized !== coordinateOptimized &&
      modeMap === 'optimized'
    ) {
      this.renderPathOptimized(coordinateOptimized, map);
    }
  }

  componentWillUnmount() {
    this.removeLayer();
    if (this.pointTracking) {
      this.pointTracking && this.props.map.removeLayer(this.pointTracking);
      this.pointTracking = undefined;
    }
  }

  removeLayerOptimized = () => {
    const { map } = this.props;
    if (this.pathOptimized) {
      map.removeLayer(this.pathOptimized);
    }
    if (this.decoratorOptimized) {
      map.removeLayer(this.decoratorOptimized);
    }
  };

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
      if (coordinate) {
        const [lng, lat] = coordinate;
        if (!this.animatedPoint) {
          const moveIcon = this.getMarkerIcon(null);
          this.animatedPoint = L.marker([lat, lng], { icon: moveIcon }).addTo(
            map
          );
        }
        this.animatedPoint.setLatLng([lat, lng]);
        this.counter += 1;
        this.props.onChangeCounter && this.props.onChangeCounter(this.counter);
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

  renderPathOptimized = (coordinateOptimized, map) => {
    if (coordinateOptimized.length > 0) {
      this.pathOptimized = L.polyline(coordinateOptimized, {
        color: '#c3620f',
        weight: 2,
      });
      this.pathOptimized.addTo(map);
      this.decoratorOptimized = L.polylineDecorator(this.pathOptimized, {
        patterns: [
          {
            offset: 0,
            repeat: 40,
            symbol: L.Symbol.arrowHead({
              pixelSize: 6,
              pathOptions: {
                color: '#c3620f',
                fillColor: '#c3620f',
                opacity: 1,
              },
            }),
          },
        ],
      }).addTo(map);
    }
  };

  renderPath = props => {
    const { historyLogs, historyLogIds, map, isMobile } = props;
    const path =
      historyLogIds?.length > 0 &&
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
