import { CONNECT, DISCONNECT, RECONNECT, SEND } from 'constants/wsCommands';
import types from '../types';

export const subscribeQuotesAction = (payload) => ({
  type: types.WS_QUOTES_COMMAND,
  payload: {
    payload: {
      op: 'subscribe',
      args: [`update:${payload}`],
    },
    command: SEND,
  },
});

export const unsubscribeQuotesAction = (payload) => ({
  type: types.WS_QUOTES_COMMAND,
  payload: {
    payload: {
      op: 'unsubscribe',
      args: [`update:${payload}`],
    },
    command: SEND,
  },
});

export const connectQuotesAction = () => ({
  type: types.WS_QUOTES_COMMAND,
  payload: {
    command: CONNECT,
  },
});

export const reconnectQuotesAction = () => ({
  type: types.WS_QUOTES_COMMAND,
  payload: {
    command: RECONNECT,
  },
});

export const disconnectQuotesAction = () => ({
  type: types.WS_QUOTES_COMMAND,
  payload: {
    command: DISCONNECT,
  },
});

export const processQuotesDataAction = (payload) => ({
  type: types.QUOTES_PROCESSING,
  payload,
});

export const okQuotesAction = (payload) => ({
  type: types.QUOTES_SUCCESS,
  payload,
});

export const processQuotesBufferAction = (payload) => ({
  type: types.WS_QUOTES_BUFFER_PROCESSING,
  payload,
});
