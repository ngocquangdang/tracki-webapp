import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dynamic from 'next/dynamic';

import {
  makeSelectMapAction,
  makeSelectShowTrackersName,
  makeSelectShowGeofences,
  makeSelectMapView,
} from '@Containers/App/store/selectors';
import { changeMapAction } from '@Containers/App/store/actions';
import {
  updateNewGeofence,
  updateGeofence,
} from '@Containers/Trackers/store/actions';
import { makeSelectHistories } from '@Containers/Tracking/store/selectors';
import {
  makeSelectNewGeofence,
  makeSelectGeofences,
  makeSelectEditGeofenceId,
} from '@Containers/Trackers/store/selectors';
import './styles.scss';

const Mapbox = dynamic(() => import('./Mapbox'), { ssr: false });
const Leaflet = dynamic(() => import('./Leaflet'), { ssr: false });

interface Props {
  mapType: string;
  mapAction: string;
  mapView: string;
  histories: object;
  trackers: object;
  selectedTrackerId: number;
  trackerIds: Array<number>;
  mapTile: string;
  showGeofences: boolean;
  showTrackerName: boolean;
  editGeofenceId: number;
  isBeep: boolean;
  fullWidth: boolean;
  changeMapAction(action: string): void;
  updateGeofence(id: number, data: object): void;
  updateNewGeofence(geo: object): void;
  openSideBar(): void;
  [data: string]: any;
}

declare global {
  interface Window {
    mapType: string;
    mapEvents: any;
    mapFullWidth: boolean;
    geosDrawn: object;
    geosMobile: object;
    geoMapMobile: any;
    trackerMarkers: object;
  }
}

class Map extends React.Component<Props> {
  state = {
    initiatedMap: false,
  };

  initMapCallback = () => {
    this.setState({ initiatedMap: true });
  };

  renderMap = () => {
    const { mapType, selectTrackerAction, ...rest } = this.props;

    if (mapType === 'mapbox') {
      return (
        <Mapbox
          initMapCallback={this.initMapCallback}
          onClickMarker={selectTrackerAction}
          {...rest}
        />
      );
    }
    return (
      <Leaflet
        initMapCallback={this.initMapCallback}
        onClickMarker={selectTrackerAction}
        {...rest}
      />
    );
  };

  render() {
    return <div id="map">{this.renderMap()}</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  mapAction: makeSelectMapAction(),
  newGeofence: makeSelectNewGeofence(),
  geofences: makeSelectGeofences(),
  editGeofenceId: makeSelectEditGeofenceId(),
  showGeofences: makeSelectShowGeofences(),
  showTrackerName: makeSelectShowTrackersName(),
  mapView: makeSelectMapView(),
  histories: makeSelectHistories(),
});

const mapDispatchToProps = dispatch => ({
  changeMapAction: (mapAction: string) => dispatch(changeMapAction(mapAction)),
  updateNewGeofence: (data: object) => dispatch(updateNewGeofence(data)),
  updateGeofence: (id: number, data: object) =>
    dispatch(updateGeofence(id, data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Map);
