import { MQTT_TRACKER_UPDATE } from '../constants';

class TrackerHandler {
  topicFormat: any;
  constructor() {
    this.topicFormat = /^\/tracker\/.*\/telemetry$/;
  }

  messageHandler = payload => {
    const {
      parsed_message: { measurements, device_id },
    } = JSON.parse(payload.toString());
    const { isMoving, latitude, longitude, ...rest } = measurements[0];
    const tracker = {
      ...rest,
      device_id,
      lat: +latitude.toFixed(7),
      lng: +longitude.toFixed(7),
      moving: isMoving,
    };
    return {
      type: MQTT_TRACKER_UPDATE,
      payload: tracker,
    };
  };
}

export default TrackerHandler;
