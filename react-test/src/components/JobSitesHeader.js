import React from "react";
import { Row, Col, Space, Typography, Input, Button } from "antd";
import { InfoCircleFilled, SearchOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const JobSitesHeader = ({ searchText, setSearchText, onCreateClick }) => (
  <>
    {/* Header */}
    <Row
      style={{
        padding: "8px 16px",
        backgroundColor: "#F8F8FA",
      }}
      align="middle"
    >
      <Col>
        <Title style={{ margin: 0, fontSize: window.innerWidth < 768 ? "14px" : "16px" }}>Title</Title>
      </Col>
    </Row>

    {/* Info + Actions */}
    <Row
      justify="space-between"
      align="middle"
      style={{
        padding: "8px 16px",
      }}
    >
      <Col xs={24} sm={24} md={12} style={{ marginBottom: window.innerWidth < 768 ? "12px" : "0" }}>
        <Space size={8}>
          <InfoCircleFilled style={{ color: "#1264A3", fontSize: window.innerWidth < 768 ? "12px" : "14px" }} />
          <Text type="secondary" style={{ fontSize: window.innerWidth < 768 ? "12px" : "14px" }}>
            Informative piece of text that can be used regarding this modal.
          </Text>
        </Space>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <Space size={8} direction={window.innerWidth < 768 ? "vertical" : "horizontal"} style={{ width: "100%" }}>
          <Input
            placeholder="Search a driver"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined style={{ color: "#d9d9d9" }} />}
            style={{ 
              width: window.innerWidth < 768 ? "100%" : "492px", 
              height: "32px" 
            }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onCreateClick}
            style={{
              backgroundColor: "#71CF48",
              borderColor: "#71CF48",
              width: window.innerWidth < 768 ? "100%" : "150px",
              height: "32px",
              borderRadius: "4px",
              fontWeight: 500,
            }}
          >
            Create
          </Button>
        </Space>
      </Col>
    </Row>
  </>
);

export default JobSitesHeader;