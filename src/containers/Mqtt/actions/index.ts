import * as types from '../constants';

export const mqttStart = () => ({ type: types.MQTT_START });
export const mqttConnected = () => ({ type: types.MQTT_CONNECTED });
export const mqttDisconnect = () => ({ type: types.MQTT_DISCONNECT });

export const mqttTrackerUpdate = (tracker: object) => ({
  type: types.MQTT_TRACKER_UPDATE,
  payload: { tracker },
});

export const mqttTrackersSubscribeTopic = (trackerIds: number[]) => ({
  type: types.MQTT_TRACKERS_SUBSCRIBE_TOPIC,
  payload: { trackerIds },
});

export const mqttTrackersUnsubscribeTopic = (trackerIds: number[]) => ({
  type: types.MQTT_TRACKERS_UN_SUBSCRIBE_TOPIC,
  payload: { trackerIds },
});
