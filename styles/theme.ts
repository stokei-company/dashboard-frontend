import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const customTheme = extendTheme(
  {
    fonts: {
      body: 'Roboto, system-ui, sans-serif',
      heading: 'Roboto, system-ui, sans-serif',
      mono: 'Menlo, monospace'
    },
    fontWeights: {
      normal: 400,
      medium: 600,
      bold: 700
    },
    radii: {
      sm: '5px',
      md: '8px'
    },
    colors: {
      purple: {
        500: '#8257e5'
      },
      green: {
        300: '#87e1c7',
        500: '#339576',
        600: '#24615e'
      },
      gray: {
        300: '#e9ebed',
        500: '#5c706f',
        600: '#29292e',
        700: '#202024',
        800: '#121214'
      }
    }
  },
  withDefaultColorScheme({ colorScheme: 'green' })
);

export default customTheme;
