import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { MapBox, NavigationControl } from './style';
import DeviceMarker from './DeviceMarker';
import './styles.scss';

interface Props {
  fullWidth: boolean;
}
interface STATE {
  isInitiatedMap: boolean;
}

class Map extends Component<Props, STATE> {
  map: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
    };
  }

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibGlrZWd1aXRhciIsImEiOiJjajN6a2ppYTQwMmN3MndxbTkzNGR0cThuIn0.HU8h498IT6jCya-G2_lczQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/streets-v11`,
      maxZoom: 13,
      zoom: 13,
      bounds: [
        [123.986206, 10.287471],
        [123.986206, 10.287471],
      ],
      fitBoundsOptions: {
        padding: 20,
      },
      attributionControl: false,
    });
    this.setState({ isInitiatedMap: true });
  }

  renderDeviceMarker = () => {
    if (this.state.isInitiatedMap) {
      return (
        <DeviceMarker
          key={560218420}
          map={this.map}
          device={{
            status: 'active',
            age: 314023,
            gps: false,
            device_id: 560218420,
            device_name: 'Ayala Ayala',
            icon_url: 'images/image-device.png',
            settings_id: 728617,
            icon_version: 1588171186000,
            type_id: 12,
            type: 'Universal',
            location_id: -1,
            lat: 10.287471,
            lng: 123.986206,
            speed: 0,
            battery: 15,
            is_triangulated: false,
            location_type: 'GSM',
            time: 1594137961,
          }}
        />
      );
    }
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.fullWidth !== this.props.fullWidth) {
      setTimeout(() => {
        this.map.resize();
      }, 100);
    }
  }

  render() {
    return (
      <MapBox id="map">
        <NavigationControl></NavigationControl>
        {this.renderDeviceMarker()}
      </MapBox>
    );
  }
}

export default Map;
