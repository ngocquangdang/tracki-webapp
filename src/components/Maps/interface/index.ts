declare namespace IMap {
  interface IProps {
    fullWidth: boolean;
    trackers: object;
    trackerIds: Array<number>;
    mapTile: string;
    mapAction: string;
    editGeofenceId: number;
    initMapCallback(): void;
    openSideBar(): void;
    onClickMarker(id: string | number): void;
    isBeep: boolean;
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
