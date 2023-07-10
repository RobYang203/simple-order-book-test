import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { mergeClass } from 'utils';

const classes = {
  root: {
    padding: '5px 15px',
    height: '30px',
  },
  cell: {
    color: '#8698aa',
    textAlign: 'right',
  },
  priceCell: {
    textAlign: 'left',
  },
}

function QuoteHead() {
  return (
    <Flex sx={classes.root} justify={'space-between'}>
      <Box sx={mergeClass(classes.cell, classes.priceCell)} flex={1}>
        <Text as="h6">Price (USD)</Text>
      </Box>
      <Box sx={classes.cell} flex={1}>
        <Text as="h6">Size</Text>
      </Box>
      <Box sx={classes.cell} flex={2}>
        <Text as="h6">Total</Text>
      </Box>
    </Flex>
  );
}

export default QuoteHead;
