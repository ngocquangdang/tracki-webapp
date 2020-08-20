import { call, fork, takeEvery, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import MQTTClient from '../mqttClient';
import { mqttConnected } from '../actions';
import * as types from '../constants';

function subscribe() {
  const unsubscribe = () => {
    disconnect();
  };

  return eventChannel(emit => {
    MQTTClient.attachMessageHandler((topic, message) => {
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
      MQTTClient.publish(action.payload.topic, action.payload.message);
    }
  }
}

function* disconnect() {
  while (true) {
    yield take(types.MQTT_DISCONNECT);
    MQTTClient.disconnect();
  }
}

function* handleMQTT() {
  yield fork(read);
  yield fork(disconnect);
  yield fork(publish);
}

function* mqttStartSaga() {
  try {
    MQTTClient.connect({
      user: 'tracki',
      password: 'mypasstracki',
      protocol: 'wss',
      servers: [
        {
          host: 'mqtt.tracki.dev',
          port: 8081,
        },
      ],
      debug: true,
    });
    MQTTClient.attachConnectHandler(() => {
      // subscribe MQTT
      // ex: MQTTClient.subscribe('weather')
      MQTTClient.subscribe('testtopic/tracki');
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
