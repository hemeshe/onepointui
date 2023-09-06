import React from "react";
import { renderWithTheme } from "../../styles/render-with-theme";

import { Icon } from "./Icon.jsx";

describe("Icon", () => {
  it("should render with the default height & width", () => {
    const { container } = renderWithTheme(<Icon type="logo" />);
    expect(container).toMatchSnapshot();
  });
  it("should render with the given width and height", () => {
    const { container } = renderWithTheme(
      <Icon type="logo" width={24} height={24} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render with the given size", () => {
    const { container } = renderWithTheme(<Icon type="logo" size={24} />);
    expect(container).toMatchSnapshot();
  });
});
