import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { mergeClass } from 'utils';

const classes = {
  accumulativeBar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    transform: 'scaleX(-1)',
    '&:after': {
      content: '""',
      background: 'rgba(255, 90, 90, 0.12)',
      width: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
  },
};

function TotalCell({ sx, value }) {
  return (
    <Box sx={sx} flex={2}>
      <Text fontWeight={900} as="h6">
        {value}
      </Text>
      <Box sx={classes.accumulativeBar}></Box>
    </Box>
  );
}

TotalCell.propTypes = {};

export default TotalCell;
