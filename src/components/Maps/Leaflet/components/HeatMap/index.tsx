import React from 'react';
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
interface Props {
  map: any;
}
class HeatMap extends React.Component<Props> {
  componentDidMount() {
    this.renderHeatMap();
  }

  renderHeatMap = () => {
    const { map } = this.props;
    console.log('LLLLLLLLLLLLL', L);
    if (map) {
      // const heat = new L.heatLayer(
      //   [
      //     [50.5, 30.5, 0.2], // lat, lng, intensity
      //     [50.6, 30.4, 0.5],
      //   ],
      //   { radius: 25 }
      // ).addTo(map);
      return;
    }
  };

  render() {
    return null;
  }
}

export default HeatMap;
