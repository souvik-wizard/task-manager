import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ setSearchText }) => {
  const handleChange = (e) => {
    console.log("Search Text:", e.target.value);
    setSearchText(e.target.value);
  };

  return (
    <div className=" w-full relative">
      <FiSearch width={24} className="absolute top-3 right-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search by title or description"
        className="border rounded p-2 w-full"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
