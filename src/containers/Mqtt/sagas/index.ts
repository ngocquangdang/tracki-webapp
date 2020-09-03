import { call, fork, takeEvery, put, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import MQTTHandler from '../handlers';
import TrackiMQTTClient from '@Utils/mqtt/trackiMqttClient';
import {
  mqttConnected,
  mqttTrackersSubscribeTopic,
  mqttTrackersUnsubscribeTopic,
} from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { GET_TRACKERS_SUCCEED } from '@Containers/Trackers/store/constants';
import { mqttUpdateTrackerAction } from '@Containers/Trackers/store/actions';
import { makeSelectTrackers } from '@Containers/Trackers/store/selectors';
import * as types from '../constants';

function subscribe() {
  const unsubscribe = () => {
    disconnect();
  };

  return eventChannel(emit => {
    TrackiMQTTClient.attachMessageHandler((topic, message) => {
      if (topic) {
        // Action Topic
        // EX: emit(mqttAction(...))
        const topicHandler = new MQTTHandler();
        const mqttClientGetHandler = topicHandler.mqttClientGetHandler(topic);
        if (mqttClientGetHandler) {
          const action = mqttClientGetHandler.messageHandler(message);
          switch (action.type) {
            case types.MQTT_TRACKER_UPDATE:
              emit(
                mqttUpdateTrackerAction({
                  ...action.payload,
                  device_id: +topic.split('/')[2],
                })
              );
              break;
            default:
              break;
          }
        }
      }
    });

    return unsubscribe;
  });
}

function* read() {
  const channel = yield call(subscribe);

  yield takeEvery(channel, function* (value) {
    yield put(value);
  });
}

function* publish() {
  while (true) {
    const action = yield take(types.MQTT_PUBLISH);
    if (action.payload) {
      TrackiMQTTClient.publish(action.payload.topic, action.payload.message);
    }
  }
}

function* disconnect() {
  while (true) {
    yield take(types.MQTT_DISCONNECT);
    const trackers = yield select(makeSelectTrackers());
    const ids = Object.keys(trackers).map(id => +id);
    yield put(mqttTrackersUnsubscribeTopic(ids));
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Closed connect to MQTT server',
      })
    );
    TrackiMQTTClient.disconnect();
  }
}

function* subscribeTopic() {
  while (true) {
    const action = yield take(types.MQTT_TRACKERS_SUBSCRIBE_TOPIC);
    const {
      payload: { trackerIds },
    } = action;
    trackerIds.map(id => {
      TrackiMQTTClient.subscribe(`/tracker/${id}/telemetry`);
    });
  }
}

function* unSubscribeTopic() {
  while (true) {
    const action = yield take(types.MQTT_TRACKERS_UN_SUBSCRIBE_TOPIC);
    const {
      payload: { trackerIds },
    } = action;
    trackerIds.map(id => {
      TrackiMQTTClient.unsubscribe(`/tracker/${id}/telemetry`);
    });
  }
}

function* handleMQTT() {
  yield fork(read);
  yield fork(disconnect);
  yield fork(publish);
  yield fork(subscribeTopic);
  yield fork(unSubscribeTopic);
}

function* mqttStartSaga() {
  try {
    TrackiMQTTClient.connect({
      username: 'tracki',
      password: 'mypasstracki',
      protocol: 'wss',
      clientId: 'tracki_' + Math.random().toString(16).substr(2, 8),
      servers: [
        {
          host: 'mqtt.tracki.dev',
          port: 8081,
        },
      ],
      debug: true,
    });

    TrackiMQTTClient.attachConnectHandler(function* () {
      const trackers = yield select(makeSelectTrackers());
      const ids = Object.keys(trackers).map(id => +id);
      yield put(mqttTrackersSubscribeTopic(ids));
    });

    yield fork(handleMQTT);
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Connected MQTT server.',
      })
    );
    yield put(mqttConnected());
  } catch (e) {
    console.log(types.MQTT_START, 'ERROR', e);
  }
}

function* fetchTrackerSucceedSaga(action) {
  try {
    const { tracker } = action.payload;
    if (tracker.trackerIds.length > 0) {
      yield put(mqttTrackersSubscribeTopic(tracker.trackerIds));
    }
  } catch (error) {
    console.log(GET_TRACKERS_SUCCEED, 'ERROR', error);
  }
}

export default function* watchMQTTSaga() {
  yield takeEvery(types.MQTT_START, mqttStartSaga);
  yield takeEvery(GET_TRACKERS_SUCCEED, fetchTrackerSucceedSaga);
}
