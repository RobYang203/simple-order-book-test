import createWebsocketConnectInfo from 'utils/ws';
import { createWebsocketChannel } from './channels/ws';
import { executeWSCommand } from 'utils';
import { connectWSSaga } from './wsSaga';
import { put, select } from 'redux-saga/effects';
import {
  getTotalForAsks,
  getTotalForBids,
  transformQuotes,
} from 'utils/transForm/orderbook';
import { okQuotesAction } from 'actions/creators/quotes';

const wsInfo = createWebsocketConnectInfo({
  path: process.env.REACT_APP_WS_QUOTES_URL,
});

// eslint-disable-next-line require-yield
export function* executeQuotesWSSaga({ payload: { command, payload } }) {
  executeWSCommand(wsInfo, command, payload);
}

export function* connectQuotesWSSaga() {
  yield connectWSSaga(wsInfo, 'QUOTES', createWebsocketChannel);
}

const sample = {
  topic: 'update:BTSE-USDT_0',
  data: {
    bids: [
      ['1.205', '43.7166'],
      ['1.202', '827.9060'],
      ['1.200', '3149.6283'],
      ['1.199', '89.1202'],
      ['1.198', '255.8652'],
      ['1.197', '425.8700'],
      ['1.196', '616.4539'],
      ['1.195', '786.4595'],
      ['1.180', '43.7166'],
      ['1.174', '44.1587'],
      ['1.147', '44.1587'],
      ['1.140', '619.8360'],
      ['1.100', '45.4545'],
      ['1.058', '33.0000'],
      ['1.033', '100.0000'],
      ['1.017', '3247.4234'],
      ['1.016', '1000.0000'],
      ['1.011', '15080.0000'],
      ['1.004', '555.0000'],
      ['1.003', '38.4276'],
      ['1.002', '100.0000'],
      ['1.001', '100.0000'],
      ['0.999', '0.3000'],
      ['0.955', '10.0000'],
      ['0.945', '500.0000'],
      ['0.935', '10.0000'],
      ['0.905', '30.0000'],
      ['0.825', '300.0000'],
      ['0.666', '50.0000'],
      ['0.500', '50000.0000'],
      ['0.410', '12.0799'],
      ['0.001', '14850.0471'],
      ['0.000', '69000.0000'],
    ],
    asks: [
      ['2.320', '519.5000'],
      ['2.209', '75.8755'],
      ['2.116', '149.0000'],
      ['2.115', '232.0000'],
      ['2.100', '500.0000'],
      ['2.050', '50.0000'],
      ['2.045', '515.6294'],
      ['2.033', '500.0000'],
      ['2.030', '600.0000'],
      ['2.009', '30.0000'],
      ['2.000', '2703.5407'],
      ['1.988', '200.0000'],
      ['1.951', '900.0000'],
      ['1.950', '50.0000'],
      ['1.934', '349.8754'],
      ['1.912', '1000.0000'],
      ['1.910', '794.2491'],
      ['1.900', '550.0000'],
      ['1.897', '1282.2801'],
      ['1.870', '1000.0000'],
      ['1.850', '50.0000'],
      ['1.800', '469.5377'],
      ['1.750', '150.0000'],
      ['1.700', '100.0000'],
      ['1.650', '50.0000'],
      ['1.600', '100.0000'],
      ['1.550', '50.0000'],
      ['1.500', '50.0000'],
      ['1.495', '307.0000'],
      ['1.480', '100.0000'],
      ['1.455', '1500.0000'],
      ['1.451', '64.5487'],
      ['1.441', '1000.0000'],
      ['1.400', '1618.4624'],
      ['1.360', '38.7674'],
      ['1.331', '38.7674'],
      ['1.330', '39.1595'],
      ['1.300', '25.5000'],
      ['1.295', '39.1595'],
      ['1.293', '549.6619'],
      ['1.280', '100.0000'],
      ['1.259', '1000.0000'],
      ['1.250', '300.0000'],
      ['1.245', '776.8037'],
      ['1.244', '608.9933'],
      ['1.243', '427.2532'],
      ['1.242', '267.9720'],
      ['1.241', '88.3613'],
      ['1.240', '1555.9263'],
      ['1.238', '1091.9470'],
    ],
    seqNum: 7560059,
    prevSeqNum: 7560058,
    type: 'snapshot',
    symbol: 'BTSE-USDT',
    timestamp: 1689019343436,
  },
};

export function* transFormQuotesSaga({ payload = sample }) {
  const { data, event } = payload;
  if(event) return;
  
  const { asks, bids } = yield select(({ orderbook }) => orderbook.quotes);

  const isSnapshot = data.type === 'snapshot';
  const transFormAsks = getTotalForAsks(
    transformQuotes(isSnapshot, data.asks, asks)
  );
  const transFormBids = getTotalForBids(
    transformQuotes(isSnapshot, data.bids, bids)
  );

  yield put(
    okQuotesAction({
      asks: transFormAsks,
      bids: transFormBids,
    })
  );
}
