import '@types/googlemaps';

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    google: typeof google;
  }
}
