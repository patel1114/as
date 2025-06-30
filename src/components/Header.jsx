// src/components/Header.jsx
import React from "react";

function Header() {
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  };

  const logoStyle = {
    marginRight: "10px",
    fontSize: "2.2rem",
    background: "linear-gradient(135deg, #1976d2 60%, #64b5f6 100%)",
    color: "#fff",
    borderRadius: "12px",
    padding: "6px 12px",
    boxShadow: "0 2px 8px #1976d2cc"
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle} aria-label="Keeper App Logo">📝</div>
      <h1>Keeper <span style={{ color: "#64b5f6", fontWeight: 800 }}>App</span></h1>
    </header>
  );
}

export default Header;