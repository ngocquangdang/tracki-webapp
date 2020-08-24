import { call, fork, takeEvery, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import TrackiMQTTClient from '../../../utils/mqtt/trackiMqttClient';
import { mqttConnected } from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
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
        console.log('emit ', emit);
        console.log('message ', message);
        console.log('Topic ', topic);
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
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Closed connect to MQTT server',
      })
    );
    TrackiMQTTClient.disconnect();
  }
}

function* handleMQTT() {
  yield fork(read);
  yield fork(disconnect);
  yield fork(publish);
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

    TrackiMQTTClient.attachConnectHandler(() => {
      TrackiMQTTClient.subscribe('#');
    });

    yield fork(handleMQTT);
    yield put(mqttConnected());
  } catch (e) {
    console.log(types.MQTT_START, 'ERROR', e);
  }
}

export default function* watchMQTTSaga() {
  yield takeEvery(types.MQTT_START, mqttStartSaga);
}
