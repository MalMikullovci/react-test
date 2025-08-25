import { useState, useMemo } from "react";

export const useJobTable = (jobSite, selectedService, saveJobSiteData) => {
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const handleRowDoubleClick = (record) => {
    setEditingRow(record);
    setModalVisible(true);
  };

  const handleSave = (updatedRow) => {
    const newData = tableData.map((row) =>
      row.key === updatedRow.key ? updatedRow : row
    );
    setTableData(newData);
    if (selectedService && jobSite) {
      saveJobSiteData(jobSite.name, selectedService, newData);
    }
    setModalVisible(false);
    setEditingRow(null);
  };

  const filteredData = useMemo(
    () =>
      tableData.filter(
        (row) =>
          row.item.toLowerCase().includes(searchText.toLowerCase()) ||
          row.description.toLowerCase().includes(searchText.toLowerCase()) ||
          row.notes.toLowerCase().includes(searchText.toLowerCase())
      ),
    [tableData, searchText]
  );

  return {
    tableData,
    setTableData,
    searchText,
    setSearchText,
    modalVisible,
    setModalVisible,
    editingRow,
    setEditingRow,
    handleRowDoubleClick,
    handleSave,
    filteredData,
  };
};
