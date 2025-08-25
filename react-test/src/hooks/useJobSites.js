import { useState, useEffect, useMemo } from "react";

export const useJobSites = () => {
  const [jobSites, setJobSites] = useState(() => {
    const saved = localStorage.getItem("jobSites");
    return saved
      ? JSON.parse(saved)
      : [
          { key: 1, name: "1658 E 23rd St, Brooklyn, NY 11229, USA", status: "Completed", services: ["Sidewalk Shed"] },
          { key: 2, name: "1705 E 22nd St, Brooklyn, NY 11229, USA", status: "On Hold", services: ["Scaffold"] },
          { key: 3, name: "47 Lake St, Brooklyn, NY 11223, USA", status: "Completed", services: ["Shoring"] },
        ];
  });

  useEffect(() => {
    localStorage.setItem("jobSites", JSON.stringify(jobSites));
  }, [jobSites]);

  const addJobSite = (values) => {
    const newJobSite = {
      key: jobSites.length + 1,
      name: values.name,
      status: values.status,
      services: values.category,
    };
    setJobSites((prev) => [...prev, newJobSite]);
  };

  const counts = useMemo(() => {
    const totalCompleted = jobSites.filter(site => site.status === "Completed").length;
    const totalOnHold = jobSites.filter(site => site.status === "On Hold").length;
    const totalOnRoad = jobSites.length - totalCompleted - totalOnHold;
    return { totalCompleted, totalOnHold, totalOnRoad };
  }, [jobSites]);

  return { jobSites, addJobSite, counts };
};
