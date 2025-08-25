import { renderHook, waitFor } from "@testing-library/react";
import { useJobSiteData } from "../../hooks/useJobSiteData";

// Mock useParams to always return id = "1"
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();
});

test("loads a job site from localStorage", async () => {
  const fakeSites = [{ key: 1, name: "Test Site" }];
  localStorage.setItem("jobSites", JSON.stringify(fakeSites));

  // Mock useParams to return id = "1"
  require("react-router-dom").useParams.mockReturnValue({ id: "1" });

  const { result } = renderHook(() => useJobSiteData());

  // Wait for the jobSite state to be updated by useEffect
  await waitFor(() => {
    expect(result.current.jobSite).toEqual(fakeSites[0]);
  });
});
