import mapboxgl from 'mapbox-gl';
import geoViewport from '@mapbox/geo-viewport';

class MapBoxEvent {
  mapApi: any;
  constructor(mapRef) {
    this.mapApi = mapRef;
  }

  getCenter = () => {
    const { lat, lng } = this.mapApi.getCenter();
    return { lat, lng };
  };

  setCenter = coordinate => this.mapApi.panTo(coordinate);

  setCenterFlyTo = ({ lat, lng }) => this.mapApi.flyTo({ center: [lng, lat] });

  getZoom = () => {
    return this.mapApi.getZoom();
  };

  onZoom = (zoomDiff: number) => {
    const currentZoom = this.mapApi.getZoom();
    const nextZoom = currentZoom + zoomDiff;

    this.mapApi.zoomTo(nextZoom);
  };

  setFitBounds = (coordinates, callback) => {
    const newCoordinates = coordinates.map(({ lat, lng }) => [lng, lat]);
    const bounds = newCoordinates.reduce(
      (result, coord) => result.extend(coord),
      new mapboxgl.LngLatBounds(newCoordinates[0], newCoordinates[0])
    );
    const arrayBound = bounds.toArray();
    const zoomWithGeo = coordinates.length === 1 ? 18 : 20;
    const viewport = geoViewport.viewport(
      [arrayBound[0][0], arrayBound[0][1], arrayBound[1][0], arrayBound[1][1]],
      [600, 400],
      0,
      zoomWithGeo,
      512,
      true
    );
    this.mapApi.flyTo(viewport);
    callback && callback();
  };

  jumpTo = (coordinate, zoom) =>
    this.mapApi.jumpTo({ center: coordinate, zoom });

  getBounds = () => this.mapApi.getBounds();
}

export default MapBoxEvent;
