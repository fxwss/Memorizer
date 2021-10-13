import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import Memorizer from "./Memorizer";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
          },
        })
      ),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Memorizer />
    </ThemeProvider>
  );
}

export default App;
