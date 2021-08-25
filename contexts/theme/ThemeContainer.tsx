import {
  ChakraProvider as ChakraThemeProvider,
  ColorModeProvider,
} from "@chakra-ui/react";
import React from "react";
import theme from "../../styles/theme";

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: "light" }}>
        {children}
      </ColorModeProvider>
    </ChakraThemeProvider>
  );
};

export default ThemeContainer;
