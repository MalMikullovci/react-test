import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DataGrid from "../../components/DataGrid";

// Polyfill matchMedia for AntD
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Mock image import
jest.mock("../../box.png", () => "box.png");

describe("DataGrid Component", () => {
  const columns = [{ title: "Name", dataIndex: "name", key: "name" }];
  const filteredData = [{ key: 1, name: "Test Item" }];
  const handleRowDoubleClick = jest.fn();

  test("renders table when service is selected", () => {
    render(
      <DataGrid
        selectedService="Sidewalk"
        searchText=""
        setSearchText={jest.fn()}
        columns={columns}
        filteredData={filteredData}
        handleRowDoubleClick={handleRowDoubleClick}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  test("calls setSearchText on input change", () => {
    const setSearchText = jest.fn();
    render(
      <DataGrid
        selectedService="Sidewalk"
        searchText=""
        setSearchText={setSearchText}
        columns={columns}
        filteredData={filteredData}
        handleRowDoubleClick={handleRowDoubleClick}
      />
    );

    const input = screen.getByPlaceholderText(/search items/i);
    fireEvent.change(input, { target: { value: "new text" } });
    expect(setSearchText).toHaveBeenCalledWith("new text");
  });
});
