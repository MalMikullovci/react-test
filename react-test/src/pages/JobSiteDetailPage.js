import React, { useState } from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import ServiceList from "../components/ServiceList";
import DataGrid from "../components/DataGrid";
import DetailsModal from "../components/DetailsModal";
import { useJobSiteData } from "../hooks/useJobSiteData";
import { useJobTable } from "../hooks/useJobTable";

// category colors
const categoryMeta = {
  "Sidewalk Shed": { color: "#67AA3C" },
  Scaffold: { color: "#EFD652" },
  Shoring: { color: "#9640BE" },
};

export default function JobSiteDetailPage() {
  const navigate = useNavigate();
  const { jobSite, saveJobSiteData, loadJobSiteData } = useJobSiteData();
  const [selectedService, setSelectedService] = useState(null);

  const {
    tableData,
    setTableData,
    searchText,
    setSearchText,
    modalVisible,
    setModalVisible,
    editingRow,
    handleRowDoubleClick,
    handleSave,
    filteredData,
  } = useJobTable(jobSite, selectedService, saveJobSiteData);

  if (!jobSite) return <div>Job site not found</div>;

  const handleGoBack = () => navigate("/jobsites");

  const columns = [
    { title: "Nr.", dataIndex: "nr", key: "nr", width: 60 },
    { title: "Item", dataIndex: "item", key: "item", width: 120 },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", width: 100 },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Notes", dataIndex: "notes", key: "notes" },
  ];

  return (
    <div style={{ background: "#f5f6f8", padding: 16, minHeight: "100vh" }}>
      <Row gutter={16}>
        <Col span={6}>
          <ServiceList
            jobSite={jobSite}
            selectedService={selectedService}
            onSelectService={setSelectedService}
            onGoBack={handleGoBack}
            categoryMeta={categoryMeta}
            loadJobSiteData={loadJobSiteData}
            setTableData={setTableData}
          />
        </Col>
        <Col span={18}>
          <DataGrid
            selectedService={selectedService}
            searchText={searchText}
            setSearchText={setSearchText}
            filteredData={filteredData}
            columns={columns}
            handleRowDoubleClick={handleRowDoubleClick}
          />
        </Col>
      </Row>

      {modalVisible && editingRow && (
        <DetailsModal
          visible={modalVisible}
          rowData={editingRow}
          onSave={handleSave}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </div>
  );
}
