import types from 'actions/types';
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { executeQuotesWSSaga, transFormQuotesSaga } from './quotesSaga';
import {
  executeLastPriceWSSaga,
  transFormLastPriceSaga,
} from './lastPriceSaga';

export { connectQuotesWSSaga } from './quotesSaga';

export { connectLastPriceWSSaga } from './lastPriceSaga';

export function* watchExecuteQuotesWSSaga() {
  yield takeLatest(types.WS_QUOTES_COMMAND, executeQuotesWSSaga);
}

export function* watchExecuteLastPriceWSSaga() {
  yield takeLatest(types.WS_LAST_PRICE_COMMAND, executeLastPriceWSSaga);
}

export function* watchTransFormQuotesSaga() {
  yield takeEvery(types.QUOTES_PROCESSING, transFormQuotesSaga);
}

export function* watchTransFormLastPriceSaga() {
  yield takeEvery(types.LAST_PRICE_PROCESSING, transFormLastPriceSaga);
}
