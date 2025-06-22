import React, { useState } from "react";

function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priority: "all",
    searchTerm: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter-bar">
      <select 
        name="priority" 
        value={filters.priority} 
        onChange={handleChange}
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      
      <input
        type="text"
        name="searchTerm"
        placeholder="Search notes..."
        value={filters.searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default FilterBar;