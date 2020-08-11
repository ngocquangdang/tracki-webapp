import React from 'react';
import 'leaflet.heat/dist/leaflet-heat.js';
import L from 'leaflet';

interface Props {
  map: any;
  histories: object;
}

class HeatMap extends React.Component<Props> {
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
