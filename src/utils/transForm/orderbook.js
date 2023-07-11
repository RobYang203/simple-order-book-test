import { getMax8, sortByDesc } from 'utils';
import { plusNumber } from 'utils';

export const initialQuote = () => new Array(8).fill({}).map(() => ({}));

export const transformQuotes = (isSnapshot, quotes, currentQuotes) => {
  const tmp = isSnapshot ? getMax8(sortByDesc(quotes)) : quotes;

  const formatTmp = tmp.map(([price, size]) => {
    return {
      price,
      size,
    };
  });

  return getMax8(sortByDesc([...formatTmp, ...currentQuotes]), 'price');
};

export const getTotalForAsks = (asks) => {
  return asks.reduceRight((asks, ask) => {
    if (asks.length === 0) return [{ ...ask, total: ask.size }];

    const first = asks[0];

    const total = plusNumber(first.total, ask.size);
    return [{ ...ask, total }, ...asks];
  }, []);
};

export const getTotalForBids = (bids) => {
  return bids.reduce((bids, bid) => {
    if (bids.length === 0) return [{ ...bid, total: bid.size }];

    const last = bids[bids.length - 1];

    const total = plusNumber(last.total, bid.size);
    return [...bids, { ...bid, total }];
  }, []);
};
