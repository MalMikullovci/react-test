import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import GoBackButton from "./GoBackButton";

const ServiceList = ({ jobSite, selectedService, onSelectService, onGoBack, categoryMeta, loadJobSiteData, setTableData }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #e5e5e5",
        height: "501px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid #f0f0f0",
          fontWeight: 500,
          height: 42,
          backgroundColor: "#F8F8FA",
          fontSize: 14,
        }}
      >
        {jobSite.name}
      </div>

      {/* Service Items */}
      <div style={{ flex: 1, padding: "12px 10px" }}>
        {(jobSite.services || []).map((s) => {
          const isSelected = selectedService === s;
          const color = categoryMeta[s]?.color || "#1677ff";

          return (
            <div
              key={s}
              onClick={() => {
                if (!isSelected) {
                  onSelectService(s);
                  const data = loadJobSiteData(jobSite.name, s);
                  setTableData(data);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
                background: isSelected ? color : "#f7f7f7",
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? "#fff" : "#000",
                marginBottom: 10,
              }}
            >
              <div>{s}</div>
              {isSelected && (
                <CheckOutlined style={{ fontSize: 14, color: "#fff" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GoBackButton onClick={onGoBack} />
      </div>
    </div>
  );
};

export default ServiceList;
