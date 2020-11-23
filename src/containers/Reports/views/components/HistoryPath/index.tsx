import React from 'react';
import L from 'leaflet';
import 'leaflet-polylinedecorator';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';

import './styles.scss';

interface Props {
  history: object;
  isMobile?: boolean;
  map: any;
  t(key: string, format?: object): string;
}

class TrackerHistoryPath extends React.Component<Props> {
  trackerPath: any;
  decorator: any;
  pointTracking: any;
  points: object;

  constructor(props) {
    super(props);
    this.points = {};
  }

  componentDidMount() {
    this.renderPath(this.props);
  }

  componentWillUnmount() {
    this.removeLayer();
    if (this.pointTracking) {
      this.pointTracking && this.props.map.removeLayer(this.pointTracking);
      this.pointTracking = undefined;
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { history, pointTrackingIndex, map, isMobile } = nextProps;
  //   const {
  //     history: thisHistory,
  //     pointTrackingIndex: thisPointTrackingIndex,
  //   } = this.props;

  //   if (Object.keys(history).length !== Object.keys(thisHistory).length) {
  //     this.removeLayer();
  //     this.renderPath(nextProps);
  //   }
  //   if (
  //     pointTrackingIndex !== thisPointTrackingIndex &&
  //     Object.keys(history).length > 0
  //   ) {
  //     const pointIds = Object.keys(history);
  //     const location = history[pointIds[pointTrackingIndex]];
  //     this.pointTracking && map.removeLayer(this.pointTracking);
  //     const mapOption =
  //       isMobile || window.mapFullWidth ? {} : LEAFLET_PADDING_OPTIONS;
  //     map.fitBounds([location, location], mapOption);
  //   }
  // }

  removeLayer = () => {
    const { map } = this.props;
    if (this.trackerPath) {
      map.removeLayer(this.trackerPath);
    }
    if (this.decorator) {
      map.removeLayer(this.decorator);
    }
    Object.values(this.points).map(p => map.removeLayer(p));
  };

  renderPath = props => {
    const { history, map, isMobile } = props;
    const path = Object.keys(history).map(id => ({
      id,
      lat: history[id].lat,
      lng: history[id].lng,
      moving: history[id].moving,
    }));

    if (path.length) {
      this.points = path.reduce((obj, p, index) => {
        const icon = new L.DivIcon({
          className: `point-dot ${
            p.moving || index === 0 ? 'point-moving' : 'point-stop'
          }`,
        });
        obj[p.id] = L.marker(p, { icon }).addTo(map);
        // obj[p.id].on('click', this.onClickPointIndex(index));
        return obj;
      }, {});

      this.trackerPath = L.polyline(path, { color: '#168449', weight: 2 });
      this.trackerPath.addTo(map);
      this.decorator = L.polylineDecorator(this.trackerPath, {
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
      map.fitBounds(this.trackerPath.getBounds(), mapOption);
    }
  };

  render() {
    return null;
  }
}

export default TrackerHistoryPath;
