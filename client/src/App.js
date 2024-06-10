import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PersistGate } from 'redux-persist/integration/react'

const theme = createTheme({
  palette: {
    primary: {
      main: "#F7435E", 
    },
    secondary: {
      main: "#fff", 
    },
    background: {
      default: "#f5f5f5", 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          </PersistGate>
        </Provider>

        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
