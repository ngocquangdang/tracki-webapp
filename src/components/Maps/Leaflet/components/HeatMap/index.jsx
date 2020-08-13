import React from 'react';
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.heatMap = null;
  }
  componentDidMount() {
    this.renderHeatMap();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.histories !== this.props.histories) {
      this.heatMap.setLatLngs(nextProps.histories);
    }
  }
  renderHeatMap = () => {
    const { map, histories } = this.props;
    const trackerHistories = histories.reduce(
      (result, item) => [...result, [item[0], item[1], 0.2]],
      []
    );
    this.heatMap = new L.heatLayer(trackerHistories, {
      radius: 25,
    });
    this.heatMap.addTo(map);
  };

  render() {
    return null;
  }
}

export default HeatMap;
