import React from "react";
import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

const StatusCards = ({ totalOnRoad, totalCompleted, totalOnHold }) => (
  <Card
    style={{
      backgroundColor: "#ffffff",
      borderRadius: 6,
      padding: 16,
      marginBottom: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}
  >
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card
          style={{
            background: "#ECDE7C",
            textAlign: "center",
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
          }}
        >
          <Title style={{ 
            fontSize: window.innerWidth < 768 ? "18px" : "26px", 
            margin: 0, 
            color: "#FFFFFF" 
          }}>
            {totalOnRoad} On Road
          </Title>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card
          style={{
            background: "#7AC14D",
            textAlign: "center",
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
          }}
        >
          <Title style={{ 
            fontSize: window.innerWidth < 768 ? "18px" : "26px", 
            margin: 0, 
            color: "#FFFFFF" 
          }}>
            {totalCompleted} Completed
          </Title>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card
          style={{
            background: "#FE4C4A",
            textAlign: "center",
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
          }}
        >
          <Title style={{ 
            fontSize: window.innerWidth < 768 ? "18px" : "26px", 
            margin: 0, 
            color: "#FFFFFF" 
          }}>
            {totalOnHold} On Hold
          </Title>
        </Card>
      </Col>
    </Row>
  </Card>
);

export default StatusCards;