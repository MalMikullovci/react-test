import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobSitesHeader from "../../components/JobSitesHeader";

describe("JobSitesHeader Component", () => {
  const mockSetSearchText = jest.fn();
  const mockOnCreateClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <JobSitesHeader
        searchText=""
        setSearchText={mockSetSearchText}
        onCreateClick={mockOnCreateClick}
      />
    );
  });

  it("renders the title", () => {
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders the info text", () => {
    expect(
      screen.getByText(
        "Informative piece of text that can be used regarding this modal."
      )
    ).toBeInTheDocument();
  });

  it("renders the search input with the correct placeholder", () => {
    const input = screen.getByPlaceholderText("Search a driver");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  it("calls setSearchText on input change", () => {
    const input = screen.getByPlaceholderText("Search a driver");
    fireEvent.change(input, { target: { value: "John" } });
    expect(mockSetSearchText).toHaveBeenCalledWith("John");
  });

  it("renders the Create button and calls onCreateClick when clicked", () => {
    const button = screen.getByRole("button", { name: /create/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockOnCreateClick).toHaveBeenCalledTimes(1);
  });
});
