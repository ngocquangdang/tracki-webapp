import TrackerTopicHandler from './Tracker';

class mqttClientSetHandler {
  handlers: Array<any>;

  constructor() {
    this.handlers = [];
    this.allHandler();
  }

  allHandler = () => {
    this.handlers.push(new TrackerTopicHandler());
  };

  mqttClientGetHandler = (topic: string) => {
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i].topicFormat.test(topic)) {
        return this.handlers[i];
      }
    }
    return null;
  };
}

export default mqttClientSetHandler;
