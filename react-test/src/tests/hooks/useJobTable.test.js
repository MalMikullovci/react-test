import { renderHook, act } from "@testing-library/react";
import { useJobTable } from "../../hooks/useJobTable.js";

test("updates row and saves data", () => {
  const saveMock = jest.fn();

  const { result } = renderHook(() =>
    useJobTable({ name: "Site A" }, "Scaffold", saveMock)
  );

  // Initialize table data
  act(() => {
    result.current.setTableData([{ id: 1, item: "Item1", quantity: 5 }]);
  });

  // Update a row
  act(() => {
    result.current.handleSave({ id: 1, item: "Item1", quantity: 10 });
  });

  expect(saveMock).toHaveBeenCalled();
  expect(result.current.tableData[0].quantity).toBe(10);
});
