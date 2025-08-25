import React from "react";
import { Input, Table, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Box from "../../src/box.png";

const { Text } = Typography;

const DataGrid = ({
  selectedService,
  searchText,
  setSearchText,
  filteredData,
  columns,
  handleRowDoubleClick,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 8,
        height: "501px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid #f0f0f0",
          height: 42,
          fontWeight: 500,
          fontSize: 14,
          backgroundColor: "#F8F8FA",
        }}
      >
        <div>{selectedService || "Data Grid"}</div>
        <Input
          allowClear
          placeholder="Search items"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, maxWidth: "42%", height: 32 }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {!selectedService ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={Box}
              alt="Empty Box"
              style={{ width: 180, opacity: 0.9, marginBottom: 16 }}
            />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>
                No Service Selected
              </div>
              <Text type="secondary">
                Please select a service on your left to proceed.
              </Text>
            </div>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            bordered={false}
            size="small"
            style={{ border: "none" }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "odd-row" : "even-row"
            }
            onRow={(record) => ({
              onDoubleClick: () => handleRowDoubleClick(record),
            })}
          />
        )}
      </div>
    </div>
  );
};

export default DataGrid;
