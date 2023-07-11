import React, { useEffect, useState } from 'react';
import { Box, Text, usePrevious, useTheme } from '@chakra-ui/react';
import { compareNumber, mergeClass } from 'utils';

const getAnimationStyle =
  (colorType) =>
  ({ colors: { quotes } }) => ({
    backgroundColor: quotes[colorType]?.alpha120,
  });

function SizeCell({ sx, size }) {
  const prevSize = usePrevious(size);
  const theme = useTheme();
  const [animationStyle, setAnimationStyle] = useState({});

  useEffect(() => {
    const compareSize = compareNumber(size, prevSize);
    const colorType =
      compareSize === 1 ? 'green' : compareSize === -1 ? 'red' : '';
    const style = getAnimationStyle(colorType)(theme);

    setAnimationStyle(style);

    window.setTimeout(() => {
      setAnimationStyle({});
    }, 150);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <Box sx={mergeClass(sx, animationStyle)} flex={1}>
      <Text fontWeight={900} as="h6">
        {size}
      </Text>
    </Box>
  );
}

SizeCell.propTypes = {};

export default SizeCell;
