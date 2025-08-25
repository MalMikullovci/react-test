import { useState, useMemo } from "react";

export const useSearch = (data, field = "name") => {
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item[field].toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText, field]);

  return { searchText, setSearchText, filteredData };
};
