import React from "react";
import { useSelector } from "react-redux";

import { NoAccessMain } from "../../components/no-access";

import { AppStateType } from "../../store";

export const NoAccessWrapper: React.FC = () => (
  <div style={{ display: "block", height: "60vh", width: "100%" }}>
    <NoAccessMain />
  </div>
);

export const WithWriteAccess = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const HOC: React.FC<T> = (props) => {
    const appState = useSelector((state: AppStateType) => state.app);

    const { userAccess } = appState;

    return userAccess === "WRITE" ? (
      <WrappedComponent {...props} />
    ) : (
      <NoAccessWrapper />
    );
  };
  return HOC;
};
