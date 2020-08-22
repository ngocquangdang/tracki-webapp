import React from 'react';
import L from 'leaflet';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import './styles.scss';

interface Props {
  history: object;
  isMobile: boolean;
  map: any;
}

class TrackerHistoryPath extends React.Component<Props> {
  trackerPath: any;
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
    Object.values(this.points).map(p => {
      map.removeLayer(p);
    });
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
      this.points = path.reduce((obj, p) => {
        const icon = new L.DivIcon({
          className: `point-dot ${p.moving ? 'point-moving' : 'point-stop'}`,
        });
        obj[p.id] = L.marker(p, { icon }).addTo(map);
        return obj;
      }, {});

      this.trackerPath = L.polyline(path, { color: '#168449', weight: 2 });
      this.trackerPath.addTo(map);
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
