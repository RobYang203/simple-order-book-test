import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, useTheme } from '@chakra-ui/react';
import { mergeClass } from 'utils';
import { MAPPING_COLORS } from 'constants/quote';
import AccumulativeBar from '../AccumulativeBar';

const getClasses =
  (colorType) =>
  ({ colors: { quotes } }) => ({
    root: {
      padding: '5px 15px',
      height: `${(window.innerHeight - 112) / 16}px`,
      transition: '0.5s',
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
    },
    priceCell: {
      textAlign: 'left',
      color: quotes[colorType].full,
    },
    firstIn: {
      backgroundColor: quotes[colorType].alpha500,
    },
  });

function QuoteRow({ type, price, size, total }) {
  const theme = useTheme();

  const mappingColorType = MAPPING_COLORS[type];
  const classes = getClasses(mappingColorType)(theme);

  const [firstInCSS, setFirstInCSS] = useState(classes.firstIn);

  useEffect(() => {
    setFirstInCSS((css) => ({
      ...css,
      backgroundColor: 'none',
    }));
  }, []);

  return (
    <Flex
      sx={mergeClass(classes.root)}
      justify={'space-between'}
      alignItems="center"
      gap={5}
      {...firstInCSS}
    >
      <Box sx={mergeClass(classes.cell, classes.priceCell)} flex={1}>
        <Text fontWeight={900} as="h6">
          {price}
        </Text>
      </Box>
      <Box sx={classes.cell} flex={1}>
        <Text fontWeight={900} as="h6">
          {size}
        </Text>
      </Box>
      <Box sx={classes.cell} flex={2}>
        <Text fontWeight={900} as="h6">
          {total}
        </Text>
        <AccumulativeBar />
      </Box>
    </Flex>
  );
}

export default QuoteRow;
