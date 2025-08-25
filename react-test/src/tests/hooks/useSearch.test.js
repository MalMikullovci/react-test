import { render, act } from "@testing-library/react";
import { useSearch } from "../../hooks/useSearch";

const TestComponent = ({ data, onRender }) => {
  const hook = useSearch(data);
  onRender(hook);
  return null;
};

const sampleData = [
  { name: "Alpha", value: 1 },
  { name: "Beta", value: 2 },
  { name: "Gamma", value: 3 },
];

test("filters data based on search text", () => {
  let hookResult;
  render(<TestComponent data={sampleData} onRender={(hook) => (hookResult = hook)} />);

  // Initially all items are present
  expect(hookResult.filteredData.length).toBe(3);

  act(() => {
    hookResult.setSearchText("Al"); // Should only match Alpha
  });

  expect(hookResult.filteredData.length).toBe(1);
  expect(hookResult.filteredData[0].name).toBe("Alpha");

  act(() => {
    hookResult.setSearchText("Beta");
  });

  expect(hookResult.filteredData.length).toBe(1);
  expect(hookResult.filteredData[0].name).toBe("Beta");
});
