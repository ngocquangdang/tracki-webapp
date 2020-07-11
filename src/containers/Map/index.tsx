import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapBox } from './style';
import DeviceMarker from './DeviceMarker';

interface Props {
  fullWidth: boolean;
}
class Map extends Component {
  map: any;
  props: {
    fullWidth: boolean;
  };

  state = {
    isInitiatedMap: false,
  };

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibGlrZWd1aXRhciIsImEiOiJjajN6a2ppYTQwMmN3MndxbTkzNGR0cThuIn0.HU8h498IT6jCya-G2_lczQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/streets-v11`,
      maxZoom: 20,
      bounds: [
        [102.170435826, 8.59975962975],
        [109.33526981, 23.3520633001],
      ],
      fitBoundsOptions: {
        padding: 20,
      },
    });
    this.setState({ isInitiatedMap: true });
  }

  renderCasesMarker = () => {
    if (this.state.isInitiatedMap) {
      return (
        <DeviceMarker
          key={1}
          map={this.map}
          device={{
            lat: 16.057426,
            lng: 108.212479,
            imageURL: 'images/image-device.png',
          }}
        />
      );
    }
  };
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.fullWidth !== this.props.fullWidth) {
      setTimeout(() => {
        this.map.resize();
      }, 1000);
    }
  }

  render() {
    return <MapBox id="map">{this.renderCasesMarker()}</MapBox>;
  }
}

export default Map;
