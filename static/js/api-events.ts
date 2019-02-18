interface APIEventHandlers {
    [eventName: string]: Function[];
}

export default class APIEvents {
  websocket: WebSocket;
  handlers: APIEventHandlers;
  constructor() {
    this.handlers = {};
    window.addEventListener('load', () => {
      const socketURL = `wss://${location.host}/api/api-events`;
      this.websocket = new WebSocket(socketURL);
      this.websocket.addEventListener('message', this.handleMessageEvent.bind(this));
    });
  }

  handleMessageEvent(evt: MessageEvent) {
    const msg = JSON.parse(evt.data);
    const { event } = msg;
    const { handlers } = this;

    if (handlers[event] !== undefined) {
      handlers[event].forEach(handler => handler(msg.data));
    } else {
      // update the current state by reloading when event
      // is not handled.
      location.reload();
    }
  }

  on(event: string, handler: Function) {
    const { handlers } = this;
    if (handlers[event] === undefined) {
      handlers[event] = [];
    }

    handlers[event].push(handler);
  }
}
