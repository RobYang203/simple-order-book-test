import createWebsocketConnectInfo from 'utils/ws';
import { createWebsocketChannel } from './channels/ws';
import { executeWSCommand } from 'utils';
import { connectWSSaga } from './wsSaga';

const wsInfo = createWebsocketConnectInfo({
  path: process.env.REACT_APP_WS_ORDERBOOK_URL,
});

// eslint-disable-next-line require-yield
export function* executeOrderbookWSSaga({ payload: { command, payload } }) {
  executeWSCommand(wsInfo, command, payload);
}

export function* connectOrderbookWSSaga() {
  yield connectWSSaga(wsInfo , 'ORDER' , createWebsocketChannel);
}
