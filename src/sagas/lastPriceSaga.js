import createWebsocketConnectInfo from 'utils/ws';
import { createWebsocketChannel } from './channels/ws';
import { executeWSCommand } from 'utils';
import { connectWSSaga } from './wsSaga';

const wsInfo = createWebsocketConnectInfo({
  path: process.env.REACT_APP_WS_LAST_PRICE,
});

// eslint-disable-next-line require-yield
export function* executeLastPriceWSSaga({ payload: { command, payload } }) {
  executeWSCommand(wsInfo, command, payload);
}

export function* connectLastPriceWSSaga() {
  yield connectWSSaga(wsInfo , 'LAST_PRICE' , createWebsocketChannel);
}

