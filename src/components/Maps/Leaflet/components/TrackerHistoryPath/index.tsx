import React from 'react';
import L from 'leaflet';
import turfMidPoint from '@turf/midpoint';

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
    Object.values(this.points).map(p => map.removeLayer(p));
  };

  getAngle(latLng1, latlng2, coef = -1) {
    const dy = latlng2[0] - latLng1[0];
    const dx =
      Math.cos((Math.PI / 180) * latLng1[0]) * (latlng2[1] - latLng1[1]);
    const ang = (Math.atan2(dy, dx) / Math.PI) * 180 * coef;
    return ang.toFixed(2);
  }

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
        if (index > 0) {
          const prev = [path[index - 1].lng, path[index - 1].lat];
          const curr = [p.lng, p.lat];
          const midP = turfMidPoint(prev, curr);
          const angle = this.getAngle([prev[1], prev[0]], [curr[1], curr[0]]);
          const icon = L.divIcon({
            className: 'arrow-icon',
            bgPos: [5, 5],
            html: '<div style="transform: rotate(' + angle + 'deg)">▶</div>',
          });
          if (midP.geometry) {
            const [lng, lat] = midP.geometry.coordinates;
            obj['mid_' + index] = L.marker([lat, lng], { icon }).addTo(map);
          }
        }
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
