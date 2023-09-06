import React, { ReactNode } from "react";
import { render, RenderResult } from "@testing-library/react";
import { StyleProvider } from "./style-provider";

/* RenderResult provides methods that make it easier to search for the elements in the DOM. 
That’s why we need the “get methods”, a.k.a queries, described in the React Testing Library API. */
type RenderWithTheme = (component: ReactNode) => RenderResult;

export const renderWithTheme: RenderWithTheme = (component) => {
  const container = render(<StyleProvider>{component}</StyleProvider>);

  return {
    ...container,
    rerender: (rerenderedComponent: ReactNode) =>
      container.rerender(<StyleProvider>{rerenderedComponent}</StyleProvider>),
  };
};
