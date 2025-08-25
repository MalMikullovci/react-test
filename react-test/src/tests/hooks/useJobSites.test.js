import { render, act } from "@testing-library/react";
import { useJobSites } from "../../hooks/useJobSites";

const TestComponent = ({ onRender }) => {
  const hook = useJobSites();
  onRender(hook);
  return null;
};

beforeEach(() => {
  localStorage.clear();
});

test("initializes with default job sites if localStorage is empty", () => {
  let hookResult;
  render(<TestComponent onRender={(hook) => (hookResult = hook)} />);

  expect(hookResult.jobSites.length).toBe(3);
  expect(hookResult.counts.totalCompleted).toBe(2);
  expect(hookResult.counts.totalOnHold).toBe(1);
});

test("adds a new job site", () => {
  let hookResult;
  render(<TestComponent onRender={(hook) => (hookResult = hook)} />);

  act(() => {
    hookResult.addJobSite({
      name: "New Site",
      status: "On Road",
      category: ["Scaffold"],
    });
  });

  expect(hookResult.jobSites.length).toBe(4);
  expect(hookResult.jobSites[3].name).toBe("New Site");
});
