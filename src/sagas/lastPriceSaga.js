import createWebsocketConnectInfo from 'utils/ws';
import { createWebsocketChannel } from './channels/ws';
import { compareNumber, executeWSCommand, getMax8, sortByDesc } from 'utils';
import { connectWSSaga } from './wsSaga';
import { put, select } from 'redux-saga/effects';
import { okLastPriceAction } from 'actions/creators/lastPrice';

const wsInfo = createWebsocketConnectInfo({
  path: process.env.REACT_APP_WS_LAST_PRICE,
});

// eslint-disable-next-line require-yield
export function* executeLastPriceWSSaga({ payload: { command, payload } }) {
  executeWSCommand(wsInfo, command, payload);
}

export function* connectLastPriceWSSaga() {
  yield connectWSSaga(wsInfo, 'LAST_PRICE', createWebsocketChannel);
}

const sample = {
  topic: 'tradeHistoryApi',
  id: null,
  data: [
    {
      price: 30528.6,
      size: 331,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8321518,
      timestamp: 1689063686229,
    },
    {
      price: 30528.6,
      size: 830,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8321488,
      timestamp: 1689063684994,
    },
    {
      price: 30528.6,
      size: 1160,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8321024,
      timestamp: 1689063678613,
    },
    {
      price: 30528.6,
      size: 430,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8321004,
      timestamp: 1689063678228,
    },
    {
      price: 30528.6,
      size: 1510,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320972,
      timestamp: 1689063677712,
    },
    {
      price: 30528.6,
      size: 1510,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320902,
      timestamp: 1689063676711,
    },
    {
      price: 30528.6,
      size: 1780,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320762,
      timestamp: 1689063674710,
    },
    {
      price: 30528.6,
      size: 780,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320760,
      timestamp: 1689063674667,
    },
    {
      price: 30528.7,
      size: 380,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320620,
      timestamp: 1689063672708,
    },
    {
      price: 30528.6,
      size: 1010,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320618,
      timestamp: 1689063672708,
    },
    {
      price: 30528.6,
      size: 810,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320440,
      timestamp: 1689063670763,
    },
    {
      price: 30528.6,
      size: 492,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320438,
      timestamp: 1689063670707,
    },
    {
      price: 30528.6,
      size: 808,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320436,
      timestamp: 1689063670707,
    },
    {
      price: 30528.6,
      size: 2020,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320372,
      timestamp: 1689063670214,
    },
    {
      price: 30527.9,
      size: 97,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8320308,
      timestamp: 1689063668803,
    },
    {
      price: 30527.9,
      size: 1153,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8320306,
      timestamp: 1689063668803,
    },
    {
      price: 30528.6,
      size: 2410,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8320100,
      timestamp: 1689063665799,
    },
    {
      price: 30528.7,
      size: 187,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8319934,
      timestamp: 1689063664014,
    },
    {
      price: 30528.7,
      size: 2303,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8319932,
      timestamp: 1689063664014,
    },
    {
      price: 30528.7,
      size: 1190,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8319804,
      timestamp: 1689063663016,
    },
    {
      price: 30528.0,
      size: 2930,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8319754,
      timestamp: 1689063662337,
    },
    {
      price: 30529.5,
      size: 1522,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8319742,
      timestamp: 1689063662265,
    },
    {
      price: 30529.5,
      size: 325,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8319740,
      timestamp: 1689063662265,
    },
    {
      price: 30529.5,
      size: 2830,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8319264,
      timestamp: 1689063660010,
    },
    {
      price: 30529.5,
      size: 2550,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8319258,
      timestamp: 1689063659975,
    },
    {
      price: 30530.2,
      size: 1760,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8319138,
      timestamp: 1689063656975,
    },
    {
      price: 30530.2,
      size: 310,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8318806,
      timestamp: 1689063653303,
    },
    {
      price: 30537.8,
      size: 18,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8318594,
      timestamp: 1689063651038,
    },
    {
      price: 30544.3,
      size: 510,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8311250,
      timestamp: 1689063532581,
    },
    {
      price: 30544.2,
      size: 386,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8311248,
      timestamp: 1689063532581,
    },
    {
      price: 30544.0,
      size: 274,
      side: 'BUY',
      symbol: 'BTCPFC',
      tradeId: 8311246,
      timestamp: 1689063532581,
    },
    {
      price: 30546.4,
      size: 10,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8311244,
      timestamp: 1689063532479,
    },
    {
      price: 30546.4,
      size: 12,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8311154,
      timestamp: 1689063531534,
    },
    {
      price: 30546.4,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8311075,
      timestamp: 1689063530479,
    },
    {
      price: 30546.4,
      size: 12,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8311012,
      timestamp: 1689063529533,
    },
    {
      price: 30546.4,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8310972,
      timestamp: 1689063528478,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8302314,
      timestamp: 1689063396456,
    },
    {
      price: 30555.3,
      size: 6,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8302252,
      timestamp: 1689063395257,
    },
    {
      price: 30555.3,
      size: 8,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8302250,
      timestamp: 1689063395256,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8302202,
      timestamp: 1689063394456,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8302124,
      timestamp: 1689063393256,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8302096,
      timestamp: 1689063392456,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301988,
      timestamp: 1689063391256,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301958,
      timestamp: 1689063390455,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301872,
      timestamp: 1689063389255,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301844,
      timestamp: 1689063388454,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301762,
      timestamp: 1689063387255,
    },
    {
      price: 30555.3,
      size: 2,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301708,
      timestamp: 1689063386454,
    },
    {
      price: 30555.3,
      size: 12,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301706,
      timestamp: 1689063386454,
    },
    {
      price: 30555.3,
      size: 14,
      side: 'SELL',
      symbol: 'BTCPFC',
      tradeId: 8301644,
      timestamp: 1689063384454,
    },
  ],
};

export function* transFormLastPriceSaga({ payload = sample }) {
  try {
  } catch (error) {}
  const { data, event } = payload;
  if (event || data.length === 0) return;

  const lastPrice = yield select(({ orderbook }) => orderbook.lastPrice);

  const { price, timestamp } =
    data.length === 1 ? data[0] : sortByDesc(data, 'timestamp')[0];

  yield put(
    okLastPriceAction({
      price,
      timestamp,
      color: compareNumber(lastPrice.price, price) === -1 ? 'red' : 'green',
    })
  );
}
