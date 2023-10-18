import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchPage from "../SearchPage";

jest.mock("../components/SearchStocks");
jest.mock("../../common/darkmode/DarkModeContext", () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));

describe("SearchPage Component", () => {
  test("should set the finalSearchQuery state when handleSearch is called", () => {
    const { getByPlaceholderText, getByTestId } = render(<SearchPage />);

    const searchInput = getByPlaceholderText("Search all investments");
    fireEvent.changeText(searchInput, "example search query");
    fireEvent(searchInput, "submitEditing");

    const finalSearchQuery = getByTestId("finalSearchQuery");
    expect(finalSearchQuery.props.children).toBe("example search query");
  });

  test("should update sortType correctly when handleSort is called", () => {
    const { getByText, getByTestId } = render(<SearchPage />);
    const sortType = getByTestId("sortType");

    const relevantSortButton = getByText("Relevent");
    fireEvent.press(relevantSortButton);
    expect(sortType.props.children).toBe(0);

    const nameSortButton = getByText("Name");
    fireEvent.press(nameSortButton);
    expect(sortType.props.children).toBe(1);

    const priceSortButton = getByText("Price");
    fireEvent.press(priceSortButton);
    expect(sortType.props.children).toBe(2);
  });

  test("should toggle ascendOrder correctly when handleSort is called", () => {
    const { getByText, getByTestId } = render(<SearchPage />);
    const ascendOrder = getByTestId("ascendOrder");

    const nameSortButton = getByText("Name");
    fireEvent.press(nameSortButton);
    expect(ascendOrder.props.children).toBe(true);
    fireEvent.press(nameSortButton);
    expect(ascendOrder.props.children).toBe(false);

    const priceSortButton = getByText("Price");
    fireEvent.press(priceSortButton);
    expect(ascendOrder.props.children).toBe(true);
    fireEvent.press(priceSortButton);
    expect(ascendOrder.props.children).toBe(false);
  });
});
