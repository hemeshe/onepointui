import React from "react";

import { Commentary } from "./commentary";
import { renderWithTheme } from "../../styles/render-with-theme";

describe("<Commentary />", () => {
  it("should render correctly", () => {
    const { container } = renderWithTheme(<Commentary />);
    //expect(container).toMatchSnapshot();
  });
});
