import { createTheme, Paper, Switch, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./component/LogIn";
import Welcome from "./component/Welcome";

function App() {
  const [mode, setMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: !mode ? "light" : "dark",
    },
  });

  const handleDarkMode = () => {
    setMode(!mode);
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Paper className="main-container">
          <div className="switch">
            <Switch onChange={handleDarkMode} value={mode} />
            {mode ? (
              <span> switch to light mode</span>
            ) : (
              <span>switch to dark mode</span>
            )}
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Welcome />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LogIn />
                </Suspense>
              }
            />
          </Routes>
        </Paper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
