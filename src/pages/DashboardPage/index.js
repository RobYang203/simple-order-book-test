import React, { useEffect } from 'react';
import { Button, Tabs } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  connectOrderbookAction,
  subscribeOrderbookAction,
  unsubscribeOrderbookAction,
} from 'actions/creators/orderbook';
import { connectLastPriceAction, subscribeLastPriceAction, unsubscribeLastPriceAction } from 'actions/creators/lastPrice';

function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectOrderbookAction());
    dispatch(connectLastPriceAction());
  }, []);

  return (
    <Tabs colorScheme="whiteAlpha.500" variant="unstyled">
      <Button
        onClick={() => {
          dispatch(subscribeOrderbookAction('BTCPFC_0'));
          dispatch(subscribeLastPriceAction('BTCPFC'));
        }}
      >
        subscribe
      </Button>
      <Button
        onClick={() => {
          dispatch(unsubscribeOrderbookAction('BTCPFC_0'));
          dispatch(unsubscribeLastPriceAction('BTCPFC'));
        }}
      >
        unsubscribe
      </Button>
    </Tabs>
  );
}

export default DashboardPage;
