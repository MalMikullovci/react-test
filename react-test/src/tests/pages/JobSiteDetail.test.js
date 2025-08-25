import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JobSiteDetailPage from '../../pages/JobSiteDetailPage';
import { useJobSiteData } from '../../hooks/useJobSiteData';
import { useJobTable } from '../../hooks/useJobTable';

// Mock the custom hooks
jest.mock('../../hooks/useJobSiteData', () => ({
  useJobSiteData: jest.fn(),
}));

jest.mock('../../hooks/useJobTable', () => ({
  useJobTable: jest.fn(),
}));

// Mock DetailsModal
jest.mock('../../components/DetailsModal', () => ({ visible }) => {
  if (!visible) return null;
  return <div>Edit Service</div>;
});

describe('JobSiteDetailPage', () => {
  beforeEach(() => {
    // Default mock for useJobSiteData
    useJobSiteData.mockReturnValue({
      jobSite: { id: 1, name: 'Test Site' },
      saveJobSiteData: jest.fn(),
      loadJobSiteData: jest.fn(),
    });

    // Default mock for useJobTable
    useJobTable.mockReturnValue({
      tableData: [{ id: 1, service: 'Test Service' }],
      setTableData: jest.fn(),
      searchText: '',
      setSearchText: jest.fn(),
      modalVisible: false,
      setModalVisible: jest.fn(),
      editingRow: null,
      handleRowDoubleClick: jest.fn(),
      handleSave: jest.fn(),
      filteredData: [],
    });
  });

  test('renders the page when job site exists', () => {
    render(
      <MemoryRouter>
        <JobSiteDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Site/i)).toBeInTheDocument();
  });

  test('shows fallback if job site is not found', () => {
    useJobSiteData.mockReturnValue({
      jobSite: null,
      saveJobSiteData: jest.fn(),
      loadJobSiteData: jest.fn(),
    });

    render(
      <MemoryRouter>
        <JobSiteDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Job site not found/i)).toBeInTheDocument();
  });

  test('renders modal when editingRow exists and modalVisible is true', () => {
    useJobTable.mockReturnValue({
      tableData: [{ id: 1, service: 'Test Service' }],
      setTableData: jest.fn(),
      searchText: '',
      setSearchText: jest.fn(),
      modalVisible: true,       // show modal
      setModalVisible: jest.fn(),
      editingRow: { id: 1, service: 'Test Service' },
      handleRowDoubleClick: jest.fn(),
      handleSave: jest.fn(),
      filteredData: [{ id: 1, service: 'Test Service' }],
    });

    render(
      <MemoryRouter>
        <JobSiteDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Edit Service/i)).toBeInTheDocument();
  });
});
