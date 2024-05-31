/* eslint-disable no-unused-vars */

import { BrowserRouter , Routes , Router , Route , Navigate } from "react-router-dom";
import { CssBaseline , ThemeProvider } from "@mui/material";
import Form from "./components/picHandler";
import DataHandler from "./components/DataHandler";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./components/theme.js";
function App() {
  const mode = "dark" ;
  const theme = useMemo(() => createTheme(themeSettings(mode)) , [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          {/* <Route path = "/" element = {<Form/>} /> */}
          <Route path = "/" element = {<DataHandler/>} />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;



