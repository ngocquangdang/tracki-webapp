declare namespace IMap {
  interface IProps {
    fullWidth: boolean;
    initMapCallback(): void;
    trackers: object;
    trackerIds: Array<number>;
  }
  interface IState {
    isInitiatedMap: boolean;
    mapCenter: [number, number];
    mapZoom: number;
  }
}

export default IMap;
