import React from "react";

import { renderWithTheme } from "../../styles/render-with-theme";
import { Container } from "./container";

describe("<Container />", () => {
  it("should render correctly", () => {
    const { container } = renderWithTheme(<Container />);
    expect(container).toMatchSnapshot();
  });
});
