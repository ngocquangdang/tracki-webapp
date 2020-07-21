import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import TrackerMarker from './components/TrackerMarker';
import MapEvent from '../MapEvent';
import IMap from '../interface';

import { NavigationControl } from './style';

declare global {
  interface Window {
    mapEvents: any;
  }
}

class Map extends Component<IMap.IProps, IMap.IState> {
  map: any;
  isFirstFitBounce: boolean;

  constructor(props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
      mapCenter: [34.566667, 40.866667],
      mapZoom: 1,
    };
    this.isFirstFitBounce = false;
  }

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibGlrZWd1aXRhciIsImEiOiJjajN6a2ppYTQwMmN3MndxbTkzNGR0cThuIn0.HU8h498IT6jCya-G2_lczQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/streets-v11`,
      center: this.state.mapCenter,
      zoom: this.state.mapZoom,
      maxZoom: 19,
      attributionControl: true,
    });
    this.setState({ isInitiatedMap: true });
    window.mapEvents = new MapEvent('mapbox', this.map);
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    this.map.addControl(geolocate);
    window.mapEvents.getUseLocation = () => {
      geolocate.trigger();
    };
    this.props.initMapCallback();
  }

  renderMarkers = () => {
    const { trackers } = this.props;
    if (this.state.isInitiatedMap && trackers) {
      if (!this.isFirstFitBounce && Object.values(trackers).length > 0) {
        this.isFirstFitBounce = true;
        const coords = Object.values(trackers).filter(
          ({ lat, lng }) => !!lat && !!lng
        );
        coords.length > 0 && window.mapEvents.setFitBounds(coords);
      }

      return Object.values(trackers).map(tracker => (
        <TrackerMarker
          key={tracker.device_id}
          map={this.map}
          tracker={tracker}
        />
      ));
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullWidth !== this.props.fullWidth) {
      setTimeout(() => {
        this.map.resize();
      }, 100);
    }
  }

  render() {
    return (
      <>
        <NavigationControl></NavigationControl>
        {this.renderMarkers()}
      </>
    );
  }
}

export default Map;
