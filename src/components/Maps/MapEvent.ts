import MapBoxEvent from './Mapbox/Event';

class DroneMapEvent {
  map: any;
  constructor(map, mapRef) {
    switch (map) {
      case 'mapbox':
        this.map = new MapBoxEvent(mapRef);
        break;
      default:
        break;
    }
  }

  getCenter() {
    return this.map.getCenter();
  }

  setCenter(data) {
    return this.map.setCenter(data);
  }

  setCenterFlyTo(center, option) {
    return this.map.setCenterFlyTo(center, option);
  }

  getZoom(status) {
    return this.map.getZoom(status);
  }

  onZoom(zoomDiff) {
    return this.map.onZoom(zoomDiff);
  }

  // lat, lng
  jumpTo = (center: [number, number], zoom: number) =>
    this.map.jumpTo(center, zoom);

  setFitBounds = (coordinates, callback) =>
    this.map.setFitBounds(coordinates, callback);

  getBounds = () => this.map.getBounds();

  getUseLocation() {
    console.log('getUseLocation');
  }

  resize = () => this.map.resize();
}

export default DroneMapEvent;
