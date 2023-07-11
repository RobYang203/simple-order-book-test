import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, useTheme } from '@chakra-ui/react';
import { divideNumber, formatNumberString, getPercent, mergeClass } from 'utils';
import { MAPPING_COLORS } from 'constants/quote';
import AccumulativeBar from '../AccumulativeBar';
import propTypes from 'prop-types';
import SizeCell from '../SizeCell';

const getClasses =
  (colorType) =>
  ({ colors: { quotes } }) => ({
    root: {
      position: 'relative',
      padding: '5px 15px',
      height: `${(window.innerHeight - 112) / 16}px`,
      transition: '0.1s',
      '&:hover': {
        backgroundColor: quotes.darkBlue.full,
      },
    },
    cell: {
      color: quotes.default.full,
      textAlign: 'right',
      fontWeight: 'bolder',
      height: '100%',
      lineHeight: '200%',
      position: 'relative',
      marginLeft: '15px',
      transition: '0.1s',
    },
    priceCell: {
      textAlign: 'left',
      color: quotes[colorType].full,
      marginLeft: 0,
    },
    firstIn: {
      backgroundColor: quotes[colorType].alpha500,
    },
    accumulativeBar: {
      color: quotes[colorType].alpha120,
    },
    backBar: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      backgroundColor: quotes[colorType].alpha500,
    },
  });

function QuoteRow({ type, isNew, price, size, total, maxTotal }) {
  const theme = useTheme();

  const mappingColorType = MAPPING_COLORS[type];
  const classes = getClasses(mappingColorType)(theme);

  const [firstInCSS, setFirstInCSS] = useState(isNew ? classes.firstIn : {});

  useEffect(() => {
    if (isNew && firstInCSS.backgroundColor !== 'none') {
      setFirstInCSS((css) => ({
        ...css,
        backgroundColor: 'none',
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  return (
    <Flex
      sx={mergeClass(classes.root, firstInCSS)}
      justify={'space-between'}
      alignItems="center"
    >
      <Box sx={mergeClass(classes.cell, classes.priceCell)} flex={1}>
        <Text fontWeight={900} as="h6">
          {formatNumberString(price)}
        </Text>
      </Box>
      <SizeCell sx={classes.cell} size={formatNumberString(size)} />
      <Box sx={classes.cell} flex={2}>
        <Text fontWeight={900} as="h6">
          {formatNumberString(total)}
        </Text>
        <AccumulativeBar
          widthPercent={getPercent(divideNumber(total, maxTotal))}
          color={classes.accumulativeBar.color}
        />
      </Box>
    </Flex>
  );
}

QuoteRow.defaultProps = {
  price: '-',
  size: '-',
  total: '0',
  maxTotal: '0',
  isNew: false
};

QuoteRow.propTypes = {
  price: propTypes.string,
  size: propTypes.string,
  total: propTypes.string,
  type: propTypes.string,
  maxTotal: propTypes.string,
  isNew: propTypes.bool,
};

export default QuoteRow;
