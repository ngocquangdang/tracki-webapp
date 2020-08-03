declare namespace IMap {
  interface IProps {
    fullWidth: boolean;
    trackers: object;
    trackerIds: Array<number>;
    mapTile: string;
    mapAction: string;
    initMapCallback(): void;
    openSideBar(): void;
    onClickMarker(id: string | number): void;
    changeMapAction(action: string): void;
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
