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
    pointTrackingIndex: number;
    isBeep: boolean;
    isAlertSos: boolean;
    alertSosTrackerId: number[];
    isTracking?: boolean;
    showGeofences: boolean;
    showTrackerName: boolean;
    initMapCallback(): void;
    openSideBar(): void;
    onClickMarker(id: string | number): void;
    changeMapAction(action: string): void;
    changePointTracking(pointIndex: number): void;
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
