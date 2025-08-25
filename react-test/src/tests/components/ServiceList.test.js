import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceList from "../../components/ServiceList";
import GoBackButton from "../../components/GoBackButton";

// Mock GoBackButton to avoid rendering issues
jest.mock("../../components/GoBackButton", () => ({ onClick }) => (
  <button onClick={onClick}>Go Back</button>
));

describe("ServiceList Component", () => {
  const jobSite = {
    name: "Site A",
    services: ["Plumbing", "Electrical", "Painting"],
  };

  const categoryMeta = {
    Plumbing: { color: "#ff0000" },
    Electrical: { color: "#00ff00" },
    Painting: { color: "#0000ff" },
  };

  let mockOnSelectService;
  let mockLoadJobSiteData;
  let mockSetTableData;
  let mockOnGoBack;

  beforeEach(() => {
    mockOnSelectService = jest.fn();
    mockLoadJobSiteData = jest.fn((site, service) => [`Data for ${service}`]);
    mockSetTableData = jest.fn();
    mockOnGoBack = jest.fn();
  });

  it("renders service items and Go Back button", () => {
    render(
      <ServiceList
        jobSite={jobSite}
        selectedService={null}
        onSelectService={mockOnSelectService}
        onGoBack={mockOnGoBack}
        categoryMeta={categoryMeta}
        loadJobSiteData={mockLoadJobSiteData}
        setTableData={mockSetTableData}
      />
    );

    // All services should be rendered
    jobSite.services.forEach((s) => {
      expect(screen.getByText(s)).toBeInTheDocument();
    });

    // Go Back button should render
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("calls onSelectService, loadJobSiteData, and setTableData on click", () => {
    render(
      <ServiceList
        jobSite={jobSite}
        selectedService={null}
        onSelectService={mockOnSelectService}
        onGoBack={mockOnGoBack}
        categoryMeta={categoryMeta}
        loadJobSiteData={mockLoadJobSiteData}
        setTableData={mockSetTableData}
      />
    );

    const plumbingItem = screen.getByText("Plumbing");
    fireEvent.click(plumbingItem);

    expect(mockOnSelectService).toHaveBeenCalledWith("Plumbing");
    expect(mockLoadJobSiteData).toHaveBeenCalledWith("Site A", "Plumbing");
    expect(mockSetTableData).toHaveBeenCalledWith(["Data for Plumbing"]);
  });

  it("does not reselect a service if already selected", () => {
    render(
      <ServiceList
        jobSite={jobSite}
        selectedService="Plumbing"
        onSelectService={mockOnSelectService}
        onGoBack={mockOnGoBack}
        categoryMeta={categoryMeta}
        loadJobSiteData={mockLoadJobSiteData}
        setTableData={mockSetTableData}
      />
    );

    const plumbingItem = screen.getByText("Plumbing");
    fireEvent.click(plumbingItem);

    expect(mockOnSelectService).not.toHaveBeenCalled();
    expect(mockLoadJobSiteData).not.toHaveBeenCalled();
    expect(mockSetTableData).not.toHaveBeenCalled();
  });

  it("calls onGoBack when Go Back button is clicked", () => {
    render(
      <ServiceList
        jobSite={jobSite}
        selectedService={null}
        onSelectService={mockOnSelectService}
        onGoBack={mockOnGoBack}
        categoryMeta={categoryMeta}
        loadJobSiteData={mockLoadJobSiteData}
        setTableData={mockSetTableData}
      />
    );

    fireEvent.click(screen.getByText("Go Back"));
    expect(mockOnGoBack).toHaveBeenCalled();
  });
});
