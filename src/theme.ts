import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'sm',
  white: '#ddd',
  black: '#111',
  colors: {
    headerBackgroundColor: ['#181818', '#444444', '#666666', '#999999', '#aaaaaa', '#ccccccc', '#FFFFE0', '#FFFFF0', '#FAF0E6', '#F5DEB3'],     
  },
  primaryShade: 8,
  cursorType: 'pointer',
});