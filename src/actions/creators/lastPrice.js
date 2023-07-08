import { CONNECT, DISCONNECT, RECONNECT, SEND } from 'constants/wsCommands';
import types from '../types';

export const subscribeLastPriceAction = (payload) => ({
  type: types.WS_LAST_PRICE_COMMAND,
  payload: {
    payload: {
      op: 'subscribe',
      args: [`tradeHistoryApi:${payload}`],
    },
    command: SEND,
  },
});

export const unsubscribeLastPriceAction = (payload) => ({
  type: types.WS_LAST_PRICE_COMMAND,
  payload: {
    payload: {
      op: 'unsubscribe',
      args: [`tradeHistoryApi:${payload}`],
    },
    command: SEND,
  },
});

export const connectLastPriceAction = () => ({
  type: types.WS_LAST_PRICE_COMMAND,
  payload: {
    command: CONNECT,
  },
});

export const reconnectLastPriceAction = () => ({
  type: types.WS_LAST_PRICE_COMMAND,
  payload: {
    command: RECONNECT,
  },
});

export const disconnectLastPriceAction = () => ({
  type: types.WS_LAST_PRICE_COMMAND,
  payload: {
    command: DISCONNECT,
  },
});

export const refreshOrderbookDataAction = (payload) => ({
  type: types.REFRESH_LAST_PRICE,
  payload,
});
