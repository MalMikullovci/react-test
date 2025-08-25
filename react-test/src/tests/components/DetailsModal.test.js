import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomModal from "../../components/DetailsModal";

// Grab the shared spies created in setupTests.js
const { mockValidateFields, mockResetFields, mockSetFieldsValue } = global.antdFormMocks;

const mockRowData = {
  item: "Test Row",
  quantity: "10",
  description: "Test description",
  notes: "Test notes",
};

describe("DetailsModal Component", () => {
  beforeEach(() => {
    mockValidateFields.mockReset();
    mockResetFields.mockReset();
    mockSetFieldsValue.mockReset();
  });

  test("calls onSave when save button clicked", async () => {
    const onSave = jest.fn();
    // Ensure validateFields resolves with our data for this test
    mockValidateFields.mockResolvedValue(mockRowData);

    render(
      <CustomModal
        visible={true}
        onCancel={jest.fn()}
        onSave={onSave}
        rowData={mockRowData}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockRowData,
          infoChecked: false,
        })
      );
      expect(mockResetFields).toHaveBeenCalled();
    });
  });
});
