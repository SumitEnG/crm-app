import { createTheme, Paper, Switch, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./authentications/NotFound";
import RequireAuth from "./authentications/RequireAuth";
import Unauthorized from "./authentications/Unauthorized";
import Admin from "./component/Admin";
import Customer from "./component/Customer";
import Engineer from "./component/Engineer";
import LogIn from "./component/LogIn";
import Welcome from "./component/Welcome";

function App() {
  const [mode, setMode] = useState(false);

  const ROLES = {
    CUSTOMER: "CUSTOMER",
    ENGINEER: "ENGINEER",
    ADMIN: "ADMIN",
  };

  const theme = createTheme({
    palette: {
      mode: !mode ? "light" : "dark",
      background: {
        paper: !mode ? "#ede9dd" : "#121212",
        default: !mode ? "#77a6f2" : "#435e8a",
        onother: !mode ? "#c7f0e0" : "#4c4d49",
      },
      color: {
        another: !mode ? "#313cde" : "#03b1fc",
      },
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
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
              <Route path="/customer" element={<Customer />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
              <Route path="/engineer" element={<Engineer />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </Paper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
