import React, { useState } from "react";

const COLOR_OPTIONS = [
  { value: "all", label: "All Colors" },
  { value: "#fffde7", label: "Yellow" },
  { value: "#e3f2fd", label: "Blue" },
  { value: "#fce4ec", label: "Pink" },
  { value: "#e8f5e9", label: "Green" },
  { value: "#f3e5f5", label: "Purple" },
  { value: "#fbe9e7", label: "Orange" }
];

function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priority: "all",
    color: "all",
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
      <select
        name="color"
        value={filters.color}
        onChange={handleChange}
        style={{ marginLeft: 8 }}
      >
        {COLOR_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value} style={opt.value !== "all" ? { background: opt.value } : {}}>
            {opt.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="searchTerm"
        placeholder="Search notes..."
        value={filters.searchTerm}
        onChange={handleChange}
        style={{ marginLeft: 8 }}
      />
    </div>
  );
}

export default FilterBar;