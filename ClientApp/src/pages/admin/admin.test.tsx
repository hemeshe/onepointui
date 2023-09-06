import React from "react";

import { Admin } from "./admin";
import { renderWithTheme } from "../../styles/render-with-theme";

describe("<DataIngestion />", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("should render correctly", () => {
    const { container } = renderWithTheme(<Admin />);
    expect(container).toMatchSnapshot();
  });
});
