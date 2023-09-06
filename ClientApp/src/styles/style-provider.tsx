import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components/macro";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { OidcProvider } from "redux-oidc";

import { GlobalStyles } from "./global-styles";
import { theme } from "./theme";
import configureStore from "../store";
import userManager from "../helpers/sso/userManager";

const store = configureStore();

type StyleProviderProps = {
  children: ReactNode;
};

export const StyleProvider = ({ children }: StyleProviderProps) => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyles />
          <Router>{children}</Router>
        </React.Fragment>
      </ThemeProvider>
    </OidcProvider>
  </Provider>
);
