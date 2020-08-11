class LeafLetEvent {
  mapApi: any;

  constructor(mapRef) {
    this.mapApi = mapRef;
  }

  getCenter = () => {
    const { lat, lng } = this.mapApi.getCenter();

    return { lat, lng };
  };

  setCenter = (data, options = {}) => this.mapApi.panTo(data, options);

  setCenterFlyTo = (data, options = { zoom: 13 }) =>
    this.mapApi.flyTo(data, options.zoom);

  getZoom = () => this.mapApi.getZoom();

  onZoom = zoomDiff => {
    const zoom = this.getZoom() + zoomDiff * 2;
    this.mapApi.setZoom(zoom);
  };

  jumpTo = (center, zoom) => {
    const [lng, lat] = center;
    this.mapApi.flyTo([lat, lng], zoom, { animate: false, duration: 0 });
  };

  setFitBounds = (data, options = {}, callback) => {
    this.mapApi.fitBounds(data, { maxZoom: 20, ...options });
    callback && callback();
  };

  getBounds = () => this.mapApi.getBounds();

  resize = () => this.mapApi.resize();

  setPadding = config => this.mapApi.invalidateSize([config.left, 0]);
}

export default LeafLetEvent;
