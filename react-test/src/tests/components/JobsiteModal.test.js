import { render, fireEvent, waitFor } from "@testing-library/react";
import JobsiteModal from "../../components/JobSiteModal";

describe("JobsiteModal", () => {
  it("calls onSave with form values when Save button is clicked", async () => {
    const handleSave = jest.fn();
    const handleCancel = jest.fn();

    // ✅ Mock form with all needed methods
    const mockForm = {
      validateFields: jest.fn().mockResolvedValue({
        name: "Test Jobsite",
        status: "In Progress",
      }),
      resetFields: jest.fn(),
      setFieldsValue: jest.fn(),
      getFieldsValue: jest.fn(() => ({})),
      values: {},
    };

    const { getByText } = render(
      <JobsiteModal
        visible={true}
        onSave={handleSave}
        onCancel={handleCancel}
        form={mockForm} // ✅ our extended mock form
      />
    );

    // Click the Save button
    fireEvent.click(getByText(/Save Changes/i));

    // Wait for handleSave to be called with the mocked form values
    await waitFor(() => {
      expect(handleSave).toHaveBeenCalledWith({
        name: "Test Jobsite",
        status: "In Progress",
        category: [], // ✅ categories default to empty array
      });
    });

    // ✅ Check resetFields called
    expect(mockForm.resetFields).toHaveBeenCalled();
  });
});
