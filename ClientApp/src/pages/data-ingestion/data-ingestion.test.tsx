import React from "react";
import { screen, waitFor } from "@testing-library/react";

import { DataIngestion } from "./data-ingestion";
import { renderWithTheme } from "../../styles/render-with-theme";

import { recentItems } from "./mocks/recent-items";

describe("<DataIngestion />", () => {
  it("should render correctly", () => {
    const { container } = renderWithTheme(<DataIngestion />);
    expect(container).toMatchSnapshot();
  });

  it("should render page tags", () => {
    renderWithTheme(<DataIngestion />);
    const pageTitle = screen.getByRole("title");
    const RecentlyAdded = screen.getByText("Recently Added");
    expect(pageTitle).toHaveTextContent("Data Ingestion");
    expect(RecentlyAdded).toBeInTheDocument();
  });

  it("should render recently added items", async () => {
    renderWithTheme(<DataIngestion />);

    //const div = await waitFor(() => screen.getByTestId('recenty-added'));

    // await waitFor(() => {
    //   recentItems.forEach((mock) => {
    //     expect(screen.getByText(mock.fileType, { exact: false })).toBeInTheDocument();
    //   });
    // });

    //  recentItemNames.forEach((el, i) => {
    //   expect(el.innerHTML).toBe(recentItems[i].fileType);
    //  })
    // await waitFor(() => {
    //   mockUsers.forEach((mockUser) => {
    //     expect(screen.getByText(mockUser.name, { exact: false })).toBeInTheDocument();
    //   });
    // });
  });
});
