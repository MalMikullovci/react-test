import React, { useState } from "react";
import { Card } from "antd";
import StatusCards from "../components/StatusCards";
import JobSitesHeader from "../components/JobSitesHeader";
import JobSitesTable from "../components/JobSitesTable";
import JobSiteModal from "../components/JobSiteModal"; 

import { useJobSites } from "../hooks/useJobSites";
import { useSearch } from "../hooks/useSearch";

const JobSitesPage = () => {
  const { jobSites, addJobSite, counts } = useJobSites();
  const { searchText, setSearchText, filteredData } = useSearch(jobSites);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSaveModal = (values) => {
    addJobSite(values);
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "16px 8px", background: "#f0f2f5", minHeight: "100vh" }}>
      <StatusCards {...counts} />
      <Card
        bodyStyle={{ padding: 0 }}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: "hidden",
        }}
      >
        <JobSitesHeader
          searchText={searchText}
          setSearchText={setSearchText}
          onCreateClick={() => setIsModalVisible(true)}
        />
        <div style={{ overflowX: "auto" }}>
          <JobSitesTable dataSource={filteredData} />
        </div>
      </Card>

      <JobSiteModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSaveModal}
      />
    </div>
  );
};

export default JobSitesPage;