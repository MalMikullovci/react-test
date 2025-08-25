import React from "react";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom";

export const statusColors = {
  Completed: "rgb(122, 193, 77)", // #7AC14D in rgb()
  "On Hold": "rgb(254, 76, 74)",  // #FE4C4A in rgb()
  "In Progress": "rgb(236, 222, 124)", // #ECDE7C in rgb()
};

const JobSitesTable = ({ dataSource }) => {
  const columns = [
  {
  title: "Jobsite Name",
  dataIndex: "name",
  key: "name",
  className: "jobname-column",
  width: window.innerWidth < 768 ? "60%" : "57.5%",
  render: (text, record) => (
    <div
      style={{
        display: "flex",
        justifyContent: window.innerWidth < 768 ? "flex-start" : "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link
        to={`/jobsites/${record.key}`}
        style={{
          textAlign: "left",
          width: window.innerWidth < 768 ? "100px" : "150px",
          // Remove truncation styles to show full text
          // whiteSpace: "nowrap",
          // overflow: "hidden",
          // textOverflow: "ellipsis",
          color: "#1264A3",
          fontWeight: 600,
          marginLeft: window.innerWidth < 768 ? "10px" : "60px",
          wordBreak: "break-word", // optional: wrap long names
        }}
      >
        {text}
      </Link>
    </div>
  ),
},

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: window.innerWidth < 768 ? "40%" : "45%",
      render: (status) => {
        let color =
          status === "Completed"
            ? "#7AC14D"
            : status === "On Hold"
            ? "#FE4C4A"
            : "#ECDE7C";
        return (
          <Tag
            style={{
              backgroundColor: color,
              color: "#fff",
              fontWeight: 400,
              width: window.innerWidth < 768 ? "80px" : "129px",
              height: "32px",
              lineHeight: "32px",
              textAlign: "center",
              borderRadius: 4,
              padding: "0 12px",
              display: "inline-block",
              fontSize: window.innerWidth < 768 ? "12px" : "14px",
            }}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={window.innerWidth < 768 ? { x: true } : {}}
      rowClassName={(_, index) =>
        index % 2 === 0 ? "table-row-dark" : "table-row-light"
      }
    />
  );
};

export default JobSitesTable;