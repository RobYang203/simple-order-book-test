import { extendTheme } from '@chakra-ui/react';
import typography from './typography';
import { RED, GREEN, ASK, BID } from 'constants/quote';

const colors = {
  darkBlue: {
    700: '#2D2C31',
    800: '#1E1A2F',
    900: '#1D1C22',
  },
  textGary: {
    50: '#F2F2F2',
    400: '#A1A1A1',
    500: '#9D9D9D',
    600: '#555555',
  },
  quotes: {
    default: {
      full: '#F0F4F8',
      alpha120: 'rgba(134, 152, 170, 0.12)',
    },
    red: {
      full: '#FF5B5A',
      alpha120: 'rgba(255, 90, 90, 0.12)',
      alpha500: 'rgba(255, 91, 90, 0.5)',
    },
    green: {
      full: '#00b15d',
      alpha120: 'rgba(16, 186, 104, 0.12)',
      alpha500: 'rgba(0, 177, 93, 0.5)',
    },
    darkBlue: {
      full: '#1E3059',
    },
  },
};

const textStyles = {
  ...typography,
};

const styles = {
  global: {
    ...typography,
    ':focus-visible': {
      outline: '0px',
    },
  },
};

const theme = extendTheme({ styles, colors, textStyles });

export default theme;
