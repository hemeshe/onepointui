import React from "react";

import { Mapping } from "./mapping";
import { renderWithTheme } from "../../styles/render-with-theme";

describe("<DataIngestion />", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("should render correctly", () => {
    const { container } = renderWithTheme(<Mapping />);
    expect(container).toMatchSnapshot();
  });
});
