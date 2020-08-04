declare namespace IMap {
  interface IProps {
    fullWidth: boolean;
    trackers: object;
    trackerIds: Array<number>;
    mapTile: string;
    initMapCallback(): void;
    openSideBar(): void;
    onClickMarker(id: string | number): void;
    isBeep: boolean | null;
  }
  interface IState {
    isInitiatedMap: boolean;
    mapCenter: [number, number];
    mapZoom: number;
  }
}

export default IMap;
