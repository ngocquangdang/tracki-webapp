import { formatNumber } from '@Utils/helper';

export function getSizeOfGefence(geo) {
  const size = { width: '0', height: '0' };

  if (!geo) {
    return size;
  }

  let bounds;

  if (window.geosDrawn[geo.id]) {
    bounds = window.geosDrawn[geo.id].getBounds();
  }

  if (bounds) {
    const ne = bounds.getNorthEast();
    const se = bounds.getSouthEast();
    const nw = bounds.getNorthWest();
    size.height = ne.distanceTo(se).toFixed(2);
    size.width = ne.distanceTo(nw).toFixed(2);
  }

  return {
    width: formatNumber(size.width),
    height: formatNumber(size.height),
  };
}
