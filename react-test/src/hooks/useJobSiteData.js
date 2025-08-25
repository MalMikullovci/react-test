import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Dummy table data generator
const generateRandomData = () =>
  Array.from({ length: 11 }).map((_, i) => ({
    key: i + 1,
    nr: i + 1,
    item: `G${Math.floor(Math.random() * 90000) + 10000}`,
    quantity: Math.floor(Math.random() * 80) + 10,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }));

// Helpers for localStorage persistence
const saveJobSiteData = (jobSiteName, service, data) => {
  const allSitesData = JSON.parse(localStorage.getItem("jobSitesData")) || {};
  if (!allSitesData[jobSiteName]) allSitesData[jobSiteName] = {};
  allSitesData[jobSiteName][service] = data;
  localStorage.setItem("jobSitesData", JSON.stringify(allSitesData));
};

const loadJobSiteData = (jobSiteName, service) => {
  const allSitesData = JSON.parse(localStorage.getItem("jobSitesData")) || {};
  if (allSitesData[jobSiteName] && allSitesData[jobSiteName][service]) {
    return allSitesData[jobSiteName][service];
  } else {
    const newData = generateRandomData();
    saveJobSiteData(jobSiteName, service, newData);
    return newData;
  }
};

export const useJobSiteData = () => {
  const { id } = useParams();
  const [jobSite, setJobSite] = useState(null);

  useEffect(() => {
    const savedSites = JSON.parse(localStorage.getItem("jobSites")) || [];
      const found = savedSites.find(
      (site) => site.key === parseInt(id, 10)
    );
    setJobSite(found);
  }, [id]);

  return { jobSite, saveJobSiteData, loadJobSiteData };
};
