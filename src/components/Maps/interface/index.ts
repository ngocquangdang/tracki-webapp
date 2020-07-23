declare namespace IMap {
  interface IProps {
    fullWidth: boolean;
    trackers: object;
    trackerIds: Array<number>;
    initMapCallback(): void;
    openSideBar(): void;
    onClickMarker(id: string | number): void;
  }
  interface IState {
    isInitiatedMap: boolean;
    mapCenter: [number, number];
    mapZoom: number;
  }
}

export default IMap;
