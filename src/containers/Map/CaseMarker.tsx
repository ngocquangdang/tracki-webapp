import React from 'react';
import mapboxgl from 'mapbox-gl';

interface Props {
  map: any;
  lat: any;
  lng: any;
}

class CaseMarker extends React.Component<Props> {
  caseMarker: any;

  componentDidMount() {
    this.renderCase();
  }

  renderCase = () => {
    const { map, lat, lng } = this.props;
    if (map && !this.caseMarker) {
      const elm = document.createElement('div');
      elm.className = `case-marker case-danger`;
      elm.innerHTML = '<span class="inner"></span>';
      this.caseMarker = new mapboxgl.Marker(elm)
        .setLngLat([lng, lat])
        .addTo(map);
      return this.caseMarker;
    }
  };

  render() {
    return null;
  }
}

export default CaseMarker;
