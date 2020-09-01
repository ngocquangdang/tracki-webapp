import { MQTT_TRACKER_UPDATE } from '../constants';

class TrackerHandler {
  topicFormat: any;
  constructor() {
    this.topicFormat = /^tracker\/.*\/telemetry$/;
  }

  messageHandler = payload => {
    const { latitude, longitude, ...tracker } = JSON.parse(payload.toString());
    tracker.lat = latitude;
    tracker.lng = longitude;
    return {
      type: MQTT_TRACKER_UPDATE,
      payload: tracker,
    };
  };
}

export default TrackerHandler;
