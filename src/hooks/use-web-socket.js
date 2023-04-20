import { useState, useEffect, useRef, useCallback } from 'react';

import {
  isStringifiedJSON,
} from '../utils/helpers';

export const STATUS = {
  IDLE: 'idle',
  DISCONNECTED: 'disconnected',
  CONNECTED: 'connected',
};

export function useWebSocket(url) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const channels = useRef({});
  const socket = useRef(null);
  const handlers = useRef({});

  const handleClose = () => {
    setStatus(STATUS.DISCONNECTED);
  };

  const handleOpen = () => {
    setStatus(STATUS.CONNECTED);
  };

  const handleMessage = async packet => {
    let message = packet.data;

    if (isStringifiedJSON(message)) {
      message = JSON.parse(message);
    }

    if (typeof message === 'object') {
      if (message.channel) {
        if (message.channel !== '*' && handlers.current[message.channel]) {
          handlers.current[message.channel](message);
        }
        if (handlers.current['*']) {
          handlers.current['*'](message);
        }
      }
    }
  };

  const connect = useCallback(() => {
    socket.current = new WebSocket(url);
    socket.current.addEventListener('close', handleClose);
    socket.current.addEventListener('open', handleOpen);
    socket.current.addEventListener('message', handleMessage);
  }, [url]);

  const disconnect = useCallback(() => {
    socket.current.removeEventListener('open', handleOpen);
    socket.current.removeEventListener('close', handleClose);
    socket.current.removeEventListener('message', handleMessage);
    if (socket.current.readyStatus === 1) {
      socket.current.close();
    }
    setStatus(STATUS.DISCONNECTED);
  }, []);

  useEffect(() => {
    if (url) {
      connect();

      return () => {
        disconnect();
      };
    }
  }, [connect, disconnect, url]);

  const on = (eventName, callback) => {
    socket.current.addEventListener(eventName, callback);
  };

  const listen = useCallback((channel, callback) => {
    handlers.current[channel] = callback;
  }, []);

  const send = useCallback(async data => {
    if (socket.current && status === STATUS.CONNECTED) {
      let message = data;

      if (typeof data === 'object') {
        message = JSON.stringify(data);
      }

      socket.current.send(message);
    }
  }, [status]);

  const publish = (channel, data) => {
    send({ channel, type: 'publish', payload: data });
  };

  const subscribe = useCallback(channel => {
    channels.current[channel] = true;
    send({ type: 'subscribe', payload: channel });
  }, [send]);

  const unsubscribe = useCallback(channel => {
    if (channels.current[channel]) {
      delete channels.current[channel];
    }
    send({ type: 'unsubscribe', payload: channel });
  }, [send]);

  const close = () => {
    if (socket.current && status === STATUS.CONNECTED && socket.current.readyStatus === 1) {
      socket.current.close();
    }
  };

  const reconnect = () => {
    if (socket.current && status === STATUS.DISCONNECTED) {
      connect();
    }
  };

  const getChannels = () => {
    return Object.keys(channels.current);
  };

  return {
    status,
    listen,
    send,
    on,
    close,
    reconnect,
    publish,
    subscribe,
    unsubscribe,
    disconnect,
    getChannels
  };
}
