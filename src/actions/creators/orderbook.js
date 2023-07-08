import { CONNECT, DISCONNECT, RECONNECT, SEND } from 'constants/wsCommands';
import types from '../types';

export const subscribeOrderbookAction = (payload) => ({
  type: types.WS_ORDERBOOK_COMMAND,
  payload: {
    payload: {
      op: 'subscribe',
      args: [`update:${payload}`],
    },
    command: SEND,
  },
});

export const unsubscribeOrderbookAction = (payload) => ({
  type: types.WS_ORDERBOOK_COMMAND,
  payload: {
    payload: {
      op: 'unsubscribe',
      args: [`update:${payload}`],
    },
    command: SEND,
  },
});

export const connectOrderbookAction = () => ({
  type: types.WS_ORDERBOOK_COMMAND,
  payload: {
    command: CONNECT,
  },
});

export const reconnectOrderbookAction = () => ({
  type: types.WS_ORDERBOOK_COMMAND,
  payload: {
    command: RECONNECT,
  },
});

export const disconnectOrderbookAction = () => ({
  type: types.WS_ORDERBOOK_COMMAND,
  payload: {
    command: DISCONNECT,
  },
});

export const refreshOrderbookDataAction = (payload) => ({
  type: types.REFRESH_ORDERBOOK,
  payload,
});
