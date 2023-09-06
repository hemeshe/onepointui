import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import Routes from "./routes";

import { StyleProvider } from "./styles/style-provider";

import { ModalWithAlerts } from "./components/modal-with-alerts";

function App() {
  return (
    <StyleProvider>
      <Router>
        <Routes />
        <ModalWithAlerts />
      </Router>
    </StyleProvider>
  );
}

export default App;
