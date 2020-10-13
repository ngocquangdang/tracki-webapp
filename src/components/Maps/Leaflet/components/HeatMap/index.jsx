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
    const { histories } = nextProps;
    const { histories: thisHistories } = this.props;

    if (Object.keys(histories).length !== Object.keys(thisHistories).length) {
      const historyIds = Object.keys(histories);
      const latlngs = historyIds.reduce(
        (result, item) => [
          ...result,
          [histories[item].lat, histories[item].lng, 0.2],
        ],
        []
      );
      this.heatMap.setLatLngs(latlngs);
    }
  }

  renderHeatMap = () => {
    const { map, histories } = this.props;
    const historyIds = Object.keys(histories);
    const trackerHistories = historyIds.reduce(
      (result, item) => [
        ...result,
        [histories[item].lat, histories[item].lng, 0.2],
      ],
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
