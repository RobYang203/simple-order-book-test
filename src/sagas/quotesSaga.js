import createWebsocketConnectInfo from 'utils/ws';
import { createWebsocketChannel } from './channels/ws';
import { executeWSCommand } from 'utils';
import { connectWSSaga } from './wsSaga';
import { call, put, select } from 'redux-saga/effects';
import {
  getTotalForAsks,
  getTotalForBids,
  transformQuotes,
} from 'utils/transForm/orderbook';
import {
  okQuotesAction,
  unsubscribeQuotesAction,
} from 'actions/creators/quotes';
import buffer from 'utils/buffer';

const wsInfo = createWebsocketConnectInfo({
  path: process.env.REACT_APP_WS_QUOTES_URL,
});

const b = buffer();
const BUFFER_SEND_TIME = 500;

// eslint-disable-next-line require-yield
export function* executeQuotesWSSaga({ payload: { command, payload } }) {
  executeWSCommand(wsInfo, command, payload);
}

export function* connectQuotesWSSaga() {
  yield connectWSSaga(wsInfo, 'QUOTES', createWebsocketChannel);
}

function processQuoteBufferSaga(totalAsks, totalBids, payload) {
  return Promise.resolve().then(() => {
    if (payload.length === 0) {
      return {
        asks: totalAsks,
        bids: totalBids,
      };
    }

    const { data } = payload.shift();

    const isSnapshot = data.type === 'snapshot';
    const transFormAsks = getTotalForAsks(
      transformQuotes(isSnapshot, data.asks, totalAsks)
    );
    const transFormBids = getTotalForBids(
      transformQuotes(isSnapshot, data.bids, totalBids)
    );

    return processQuoteBufferSaga(transFormAsks, transFormBids, payload);
  });
}

export function* transFormQuotesSaga({ payload }) {
  if (payload.event === 'unsubscribe') {
    yield put(unsubscribeQuotesAction('BTCPFC'));
    return;
  } else if (payload.event) return;

  const prev = b.getLast();

  if (
    payload.type === 'delta' &&
    prev &&
    prev.data.seqNum !== payload.data.prevSeqNum
  ) {
    yield put(unsubscribeQuotesAction('BTCPFC'));
    return;
  }

  b.put(payload);

  const { asks, bids } = yield select(({ orderbook }) => orderbook.quotes);
  const bufferData = yield call(b.timeOut, BUFFER_SEND_TIME);

  const next = yield call(processQuoteBufferSaga, asks, bids, bufferData);

  yield put(okQuotesAction(next));
}
