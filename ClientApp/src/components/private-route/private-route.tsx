import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

import { useAuth } from "./useAuth";

const Loading: React.FC = () => (
  <div style={{ margin: 0, padding: 0, textAlign: "center", width: "100%" }}>
    <span>Loading...</span>
  </div>
);

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticating, userName } = useAuth();

  if (isAuthenticating) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
