import React from 'react';
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';

class HeatMap extends React.Component {
  renderHeatMap = () => {
    const { map, histories } = this.props;
    const trackerHistories = histories.reduce((result, item) => {
      result.push([item[0], item[1], 0.2]);
      return result;
    }, []);
    new L.heatLayer(trackerHistories, {
      radius: 25,
    }).addTo(map);
    return null;
  };

  render() {
    return <React.Fragment>{this.renderHeatMap()}</React.Fragment>;
  }
}

export default HeatMap;
