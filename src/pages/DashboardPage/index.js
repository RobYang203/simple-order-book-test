import React from 'react';
import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { assign, merge } from 'lodash';
import { mergeClass } from 'utils';
import LastPriceRow from './components/LastPriceRow';
import QuoteHead from './components/QuoteHead';
import QuoteRow from './components/QuoteRow';
import { ASK, BID } from 'constants/quote';


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
  }
};

function DashboardPage() {
  const dispatch = useDispatch();

  return (
    <Box sx={classes.root}>
      <Box>
        <Text sx={classes.header} as="h4">
          Order Book
        </Text>
      </Box>
      <QuoteHead/>
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={ASK} price='21,669.0' size='3,691' total=' 5,657' />
      <LastPriceRow colorType='default' price='5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
      <QuoteRow type={BID} price='21,669.0' size='3,691' total=' 5,657' />
    </Box>
  );
}

export default DashboardPage;
