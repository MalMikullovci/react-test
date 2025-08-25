import { render, screen } from "@testing-library/react";
import JobSitesTable, { statusColors } from "../../components/JobSitesTable";
import { MemoryRouter } from "react-router-dom";  // use real MemoryRouter

const dataSource = [
  { key: "a", name: "Site A", status: "Completed" },
  { key: "b", name: "Site B", status: "On Hold" },
  { key: "c", name: "Site C", status: "In Progress" },
];

describe("JobSitesTable Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <JobSitesTable dataSource={dataSource} />
      </MemoryRouter>
    );
  });

  it("renders jobsite names as links with correct href", () => {
    dataSource.forEach((site) => {
      const link = screen.getByRole("link", { name: site.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/jobsites/${site.key}`);
    });
  });

  it("renders correct status tags with expected background colors", () => {
    dataSource.forEach((site) => {
      const tag = screen.getByText(site.status);
      expect(tag).toBeInTheDocument();
      const style = window.getComputedStyle(tag);
      expect(style.backgroundColor).toBe(statusColors[site.status]);
    });
  });

  it("applies alternating row classes", () => {
    const rows = document.querySelectorAll("tbody > tr");
    expect(rows[0]).toHaveClass("table-row-dark");
    expect(rows[1]).toHaveClass("table-row-light");
    expect(rows[2]).toHaveClass("table-row-dark");
  });
});
