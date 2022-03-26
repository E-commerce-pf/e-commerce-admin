import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './redux/store';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "../src/themes";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <LayoutProvider>
  <UserProvider>
    <BrowserRouter>
<ThemeProvider theme={Themes.default}>
      <Provider store={store}>
      <CssBaseline />
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      </ThemeProvider>
    </BrowserRouter>
    <ToastContainer/>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById('root')
);

reportWebVitals();