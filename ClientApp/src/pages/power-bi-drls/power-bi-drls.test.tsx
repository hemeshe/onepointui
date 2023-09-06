import React from "react";

import { PoweBiDrls } from "./power-bi-drls";
import { renderWithTheme } from "../../styles/render-with-theme";

describe("<DataIngestion />", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("should render correctly", () => {
    const { container } = renderWithTheme(<PoweBiDrls />);
    expect(container).toMatchSnapshot();
  });
});
