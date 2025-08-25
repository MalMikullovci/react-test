import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function GoBackButton({ onClick }) {
  return (
    <Button
      type="primary"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1264A3", // solid blue
        borderColor: "#005A9E",
        borderRadius: 6,
        height: 40,
        padding: 0,
        overflow: "hidden",
        width: 150,
        height: 32,
      }}
    >
      {/* Text section */}
      <span
        style={{
          flex: 1,
          textAlign: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 14,
            fontWeight: 400,
        }}
      >
        Go Back
      </span>
 <div
        style={{
          position: "absolute",
          left: "116.66px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "#0F5C97",
          opacity: 0.8,
        }}
      />
      {/* Icon section */}
     <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6px",
          height: "100%",
        }}
      >
        <ArrowLeftOutlined style={{ color: "#fff", fontSize: 16 }} />
      </span>
    </Button>
  );
}
