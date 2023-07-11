import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { mergeClass } from 'utils';
import propTypes from 'prop-types';

const getClasses = (widthPercent, background) => ({
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
      background,
      width: `${widthPercent}%`,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
  },
});

function AccumulativeBar({ widthPercent, color }) {
  const classes = getClasses(widthPercent ,color);

  return <Box sx={classes.root} />;
}

AccumulativeBar.defaultProps = {
  widthPercent: '0',
  color: '',
};

AccumulativeBar.propTypes = {
  widthPercent: propTypes.string,
  color: propTypes.string,
};

export default AccumulativeBar;
