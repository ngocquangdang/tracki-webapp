import React from 'react';
import L from 'leaflet';
import 'leaflet-polylinedecorator';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import PointTracking from '@Components/PointTracking';
import { ITracker } from '@Interfaces';

import './styles.scss';

interface Props {
  history: object;
  tracker: ITracker;
  isMobile: boolean;
  map: any;
  pointTrackingIndex: number;
  changePointTracking(pointIndex: number): void;
}

class TrackerHistoryPath extends React.Component<Props> {
  trackerPath: any;
  decorator: any;
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
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const { history: thisHistory } = this.props;

    if (Object.keys(history).length !== Object.keys(thisHistory).length) {
      this.removeLayer();
      this.renderPath(nextProps);
    }
  }

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
    const {
      tracker,
      pointTrackingIndex,
      history,
      changePointTracking,
    } = this.props;
    const pointIds = Object.keys(history);
    const location = history[pointIds[pointTrackingIndex]];

    if (!location) {
      return null;
    }

    return (
      <PointTracking
        tracker={tracker}
        location={location}
        pointIndex={pointTrackingIndex}
        lastIndex={pointIds.length}
        changePointTracking={changePointTracking}
      />
    );
  }
}

export default TrackerHistoryPath;
