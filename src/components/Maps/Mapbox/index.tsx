import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import TrackerMarker from './components/TrackerMarker';
import MapEvent from '../MapEvent';
import IMap from '../interface';
import { MAPBOX_API_KEY } from '@Definitions/app';
import DrawTool from './components/DrawTool';

class Map extends Component<IMap.IProps, IMap.IState> {
  map: any;
  isFirstFitBounce: boolean;

  constructor(props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
      mapCenter: [34.566667, 40.866667],
      mapZoom: 1,
      userLocation: null,
    };
    this.isFirstFitBounce = false;
  }

  componentDidMount() {
    mapboxgl.accessToken = MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/` + this.props.mapTile,
      center: this.state.mapCenter,
      zoom: this.state.mapZoom,
      maxZoom: 19,
      attributionControl: true,
    });
    window.mapType = 'mapbox';
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
    window.mapEvents.changeLayer = layerId => {
      this.map.setStyle('mapbox://styles/mapbox/' + layerId);
    };
    window.mapEvents.reset = () => {
      // this.map.setStyle('mapbox://styles/mapbox/streets-v11');
      this.fitBoundTrackers(true);
    };
    this.setState({ isInitiatedMap: true }, this.props.initMapCallback);
  }

  fitBoundTrackers = (isReset: boolean) => {
    const { trackers, fullWidth } = this.props;
    if (
      (isReset || !this.isFirstFitBounce) &&
      Object.values(trackers).length > 0
    ) {
      this.isFirstFitBounce = true;
      const coords = Object.values(trackers).filter(
        ({ lat, lng }) => !!lat && !!lng
      );
      if (coords.length > 0) {
        !fullWidth && window.mapEvents.setPadding({ left: 340 });
        window.mapEvents.setFitBounds(coords);
      }
    }
  };

  onClickTracker = (id: string | number) => {
    const { onClickMarker, openSideBar } = this.props;
    openSideBar && openSideBar();
    onClickMarker(id);
  };

  renderMarkers = () => {
    const { trackers, isBeep } = this.props;
    if (this.state.isInitiatedMap && trackers) {
      this.fitBoundTrackers(false);

      return Object.values(trackers).map(tracker => (
        <TrackerMarker
          key={tracker.device_id}
          map={this.map}
          tracker={tracker}
          onClickMarker={this.onClickTracker}
          isBeep={isBeep}
        />
      ));
    }
    return null;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullWidth !== this.props.fullWidth) {
      setTimeout(() => {
        this.map.resize();
      }, 100);
    }
  }

  render() {
    const { mapAction, changeMapAction } = this.props;
    return (
      <React.Fragment>
        {this.renderMarkers()}
        {this.state.isInitiatedMap && (
          <DrawTool
            map={this.map}
            mapAction={mapAction}
            changeMapAction={changeMapAction}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Map;
