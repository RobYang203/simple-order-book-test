import React from 'react';
import { Flex, Text, chakra } from '@chakra-ui/react';
import { ReactComponent as ArrowSVG } from 'assets/arrow.svg';
import { useTheme } from '@emotion/react';

const ArrowLogo = chakra(ArrowSVG);

const getClasses =
  (colorType) =>
  ({ colors: { quotes } }) => ({
    root: {
      color: quotes[colorType].full,
      height: '37px',
      backgroundColor: quotes[colorType].alpha120,
    },
    logo: {
      marginLeft: '5px',
      width: '16px',
      height: '16px',
      color: quotes[colorType].full,
      transform: colorType === 'green' ? 'rotate(180deg)' : 'none',
    },
  });

function LastPriceRow({ colorType, price }) {
  const theme = useTheme();
  const classes = getClasses(colorType)(theme);

  return (
    <Flex sx={classes.root} justify="center" alignItems="center">
      <Text fontWeight={900} as="h4">
        {price}
      </Text>
      <ArrowLogo sx={classes.logo} />
    </Flex>
  );
}

LastPriceRow.propTypes = {};

export default LastPriceRow;
