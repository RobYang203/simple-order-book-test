import { extendTheme } from '@chakra-ui/react';
import typography from './typography';

const colors = {
  yellow: {
    50: '#FFF9DB',
    100: '#FDF5CD',
    200: '#FFEEAF',
    300: '#FFE27F',
    400: '#FFE075',
    500: '#FFDB60',
    600: '#FFCB1E',
    700: '#E6B206',
    800: '#B38A00',
    900: '#806300',
  },
  green: {
    50: '#E7FAE5',
    100: '#C5ECC4',
    200: '#A1DDA0',
    300: '#7DCF7B',
    400: '#68C766',
    500: '#40A83D',
    600: '#31832F',
    700: '#205D20',
    800: '#103911',
    900: '#001500',
  },
  red: {
    50: '#FFEBE8',
    100: '#F0C9C5',
    200: '#DFA5A1',
    300: '#D07E7B',
    400: '#C76666',
    500: '#A8443D',
    600: '#843A2F',
    700: '#5F2D21',
    800: '#3B1C12',
    900: '#1C0B03',
  },
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
