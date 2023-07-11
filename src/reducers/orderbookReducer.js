import types from 'actions/types';
import { orderbookState } from './initialState';

export default function quoteReducer(
  orderbook = orderbookState,
  { type, payload }
) {
  switch (type) {
    case types.QUOTES_SUCCESS:
      return { ...orderbook, quotes: { ...payload } };
    case types.LAST_PRICE_SUCCESS:
      return { ...orderbook, lastPrice: { ...payload } };
    default:
      return orderbook;
  }
}
