declare namespace IMap {
  interface IProps {
    trackers: object;
    histories: object;
    trackerIds: Array<number>;
    mapTile: string;
    mapAction: string;
    mapView: string;
    editGeofenceId: number;
    selectedTrackerId: number;
    isBeep: boolean;
    isTracking?: boolean;
    showGeofences: boolean;
    showTrackerName: boolean;
    initMapCallback(): void;
    openSideBar(): void;
    onClickMarker(id: string | number): void;
    changeMapAction(action: string): void;
    updateNewGeofence(geo: object): void;
    updateGeofence(geoId: number, data: object): void;
    [data: string]: any;
  }
  interface IState {
    isInitiatedMap: boolean;
    mapCenter: [number, number];
    mapZoom: number;
    userLocation: any;
  }
}

export default IMap;
