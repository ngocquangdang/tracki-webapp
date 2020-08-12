import React from 'react';
import 'leaflet.heat/dist/leaflet-heat.js';
import L from 'leaflet';

class HeatMap extends React.Component {
  renderHeatMap = () => {
    const { map, histories } = this.props;
    new L.heatLayer(histories, {
      radius: 25,
    }).addTo(map);
    return null;
  };

  render() {
    return <React.Fragment>{this.renderHeatMap()}</React.Fragment>;
  }
}

export default HeatMap;
