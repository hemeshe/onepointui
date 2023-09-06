import React from "react";

import { renderWithTheme } from "../../styles/render-with-theme";
import { Header } from "./header";

describe("<Header />", () => {
  it("should render correctly", () => {
    const { container } = renderWithTheme(<Header />);
    expect(container).toMatchSnapshot();
  });
});
