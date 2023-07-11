import React, { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import LastPriceRow from './components/LastPriceRow';
import QuoteHead from './components/QuoteHead';
import QuoteRow from './components/QuoteRow';
import { ASK, BID } from 'constants/quote';
import { processQuotesDataAction } from 'actions/creators/quotes';
import { processLastPriceDataAction } from 'actions/creators/lastPrice';

const classes = {
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#131B29',
  },
  header: {
    color: '#F0F4F8',
    borderBottom: '1px solid #1B2130',
    textAlign: 'left',
    padding: '5px 15px',
    height: '37px',
  },
};

function DashboardPage() {
  const dispatch = useDispatch();
  const { quotes, lastPrice } = useSelector(({ orderbook }) => orderbook);
  const { asks, bids } = quotes;
  useEffect(() => {
    dispatch(processQuotesDataAction());
    dispatch(processLastPriceDataAction());
  }, []);
  return (
    <Box sx={classes.root}>
      <Box>
        <Text sx={classes.header} as="h4">
          Order Book
        </Text>
      </Box>
      <QuoteHead />
      {asks.map((ask, index) => (
        <QuoteRow
          key={`ask-${ask.price ?? index}`}
          type={ASK}
          {...ask}
          maxTotal={asks[0].total}
        />
      ))}
      <LastPriceRow colorType={lastPrice.color} price={lastPrice.price} />
      {bids.map((bid, index) => (
        <QuoteRow
          key={`bid-${bid.price ?? index}`}
          type={BID}
          {...bid}
          maxTotal={bids[bids.length - 1].total}
        />
      ))}
    </Box>
  );
}

export default DashboardPage;
