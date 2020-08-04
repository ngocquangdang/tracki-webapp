import React from 'react';
import L from 'leaflet';

import { ITracker } from '@Interfaces';
import './styles.scss';

interface Props {
  map: any;
  location: ITracker;
}

class UserLocation extends React.Component<Props> {
  marker: any;

  componentDidMount() {
    this.renderLocation();
  }

  renderLocation = () => {
    const {
      map,
      location: { lat, lng },
    } = this.props;

    if (map && !this.marker && lat && lng) {
      const icon = new L.DivIcon({ className: 'map-user-location-dot' });
      this.marker = L.marker([lat, lng], { icon }).addTo(map);
      return this.marker;
    }
  };

  render() {
    return null;
  }
}

export default UserLocation;
