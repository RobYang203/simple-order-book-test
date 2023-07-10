import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { mergeClass } from 'utils';

const classes = {
  root: {
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

function AccumulativeBar({ value }) {
  return (
    <Box sx={classes.root}/>
  );
}

AccumulativeBar.propTypes = {};

export default AccumulativeBar;
