import React from "react";

const SearchBar = ({ searchText, onSearch }) => {
  return (
    <input
      className="border p-2 rounded mb-4"
      placeholder="Search tasks..."
      value={searchText}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
