import types from 'actions/types';
import { takeLatest } from 'redux-saga/effects';
import { executeOrderbookWSSaga } from './orderbookSaga';
import { executeLastPriceWSSaga } from './lastPriceSaga';

export { connectOrderbookWSSaga } from './orderbookSaga';

export { connectLastPriceWSSaga } from './lastPriceSaga';

export function* watchExecuteOrderbookWSSaga() {
  yield takeLatest(types.WS_ORDERBOOK_COMMAND, executeOrderbookWSSaga);
}

export function* watchExecuteLastPriceWSSaga() {
  yield takeLatest(types.WS_LAST_PRICE_COMMAND, executeLastPriceWSSaga);
}

