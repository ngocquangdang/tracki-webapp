import mqtt from 'mqtt';

let instance;

export default class MQTTClient {
  options: any;
  mqttClient: any;

  constructor(createNewClient = false) {
    if (createNewClient && instance) {
      instance.disconnect();
      instance = null;
    }

    if (instance) {
      return instance;
    }

    instance = this;
  }

  initClient = options => {
    this.options = {
      connectTimeout: 3 * 1000,
      ...options,
    };
    this.mqttClient = mqtt.connect('', this.options);

    if (typeof options.debug !== 'undefined' && options.debug) {
      this.attachDebugHandlers();
    }
    this.mqttClient.on('error', err => {
      if (typeof options.debug !== 'undefined' && options.debug) {
        console.log('MQTT Client Error', err);
      }
    });
  };

  disconnect = () => {
    this.mqttClient.end();
  };

  attachDebugHandlers = () => {
    this.mqttClient.on('reconnect', () => {
      console.log('MQTT_reconnect');
    });

    this.mqttClient.on('offline', () => {
      console.log('MQTT_offline');
    });

    this.mqttClient.on('message', (topic, message) => {
      console.log('MQTT_new message', topic, JSON.parse(message.toString()));
    });
  };

  attachMessageHandler = onNewMessageHandler => {
    this.mqttClient.on('message', onNewMessageHandler);
  };

  attachConnectHandler = onConnectHandler => {
    this.mqttClient.on('connect', connack => {
      if (typeof this.options.debug !== 'undefined' && this.options.debug) {
        console.log('connected', connack);
      }
      onConnectHandler(connack);
    });
  };

  attachCloseHandler = onCloseHandler => {
    this.mqttClient.on('close', () => {
      if (typeof this.options.debug !== 'undefined' && this.options.debug) {
        console.log('MQTT_close');
      }
      onCloseHandler();
    });
  };

  publish = (topic, message) => {
    if (typeof this.options.debug !== 'undefined' && this.options.debug) {
      console.log('MQTT_publish', topic, JSON.stringify(message));
    }
    this.mqttClient.publish(topic, JSON.stringify(message));
  };

  subscribe = topic => {
    this.mqttClient.subscribe(topic);
  };

  unsubscribe = topic => {
    if (typeof this.options.debug !== 'undefined' && this.options.debug) {
      console.log('unsubscribed from topic', topic);
    }
    this.mqttClient.unsubscribe(topic);
  };
}
