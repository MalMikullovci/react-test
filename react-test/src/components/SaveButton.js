import React from "react";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const SaveButton = ({ onClick }) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#71CF48",
        borderColor: "#71CF48",
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
        Save Changes
      </span>
      <div
        style={{
          position: "absolute",
          left: "116.66px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "#68C142",
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
        <CheckOutlined style={{ color: "#fff", fontSize: 16 }} />
      </span>
    </Button>
  );
};

export default SaveButton;
