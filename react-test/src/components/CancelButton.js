import React from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const CancelButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FE4C4A",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        width: 150,
        height: 32,
        padding: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <span
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 14,
          fontWeight: 400,
          color: "#fff",
        }}
      >
        Cancel Changes
      </span>
      <div
        style={{
          position: "absolute",
          left: "116.66px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "#EB4345",
          opacity: 0.8,
        }}
      />
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6px",
          height: "100%",
        }}
      >
        <CloseOutlined style={{ color: "#fff", fontSize: 16 }} />
      </span>
    </Button>
  );
};

export default CancelButton;
