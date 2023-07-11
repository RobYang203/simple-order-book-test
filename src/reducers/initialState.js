import { initialQuote } from 'utils/transForm/orderbook';

export const orderbookState = {
  quotes: {
    asks: initialQuote(),
    bids: initialQuote(),
  },
  lastPrice: {
    price: 0,
    timestamp: 0,
    color: 'default',
  },
};
