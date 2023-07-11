import createWebsocketConnectInfo from 'utils/ws';
import { createWebsocketChannel } from './channels/ws';
import { compareNumber, executeWSCommand, sortByDesc } from 'utils';
import { connectWSSaga } from './wsSaga';
import { call, put, select } from 'redux-saga/effects';
import { okLastPriceAction } from 'actions/creators/lastPrice';
import buffer from 'utils/buffer';

const wsInfo = createWebsocketConnectInfo({
  path: process.env.REACT_APP_WS_LAST_PRICE,
});

const b = buffer();
const BUFFER_SEND_TIME = 500;

// eslint-disable-next-line require-yield
export function* executeLastPriceWSSaga({ payload: { command, payload } }) {
  executeWSCommand(wsInfo, command, payload);
}

export function* connectLastPriceWSSaga() {
  yield connectWSSaga(wsInfo, 'LAST_PRICE', createWebsocketChannel);
}

export function* transFormLastPriceSaga({ payload }) {
  if (payload.event || payload.data.length === 0) return;

  b.put(payload);

  const bufferData = yield call(b.timeOut, BUFFER_SEND_TIME);
  const lastPrice = yield select(({ orderbook }) => orderbook.lastPrice);

  const { data } = bufferData[bufferData.length - 1];

  const { price, timestamp } =
    data.length === 1 ? data[0] : sortByDesc(data, 'timestamp')[0];

  const priceCompare = compareNumber(lastPrice.price, price);

  yield put(
    okLastPriceAction({
      price,
      timestamp,
      color:
        priceCompare === -1 ? 'red' : priceCompare === 1 ? 'green' : 'default',
    })
  );
}
