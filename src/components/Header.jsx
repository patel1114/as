// src/components/Header.jsx
import React from "react";

function Header() {
  const headerStyle = {
    display: "flex",
    alignItems: "center"
  };

  const logoStyle = {
    marginRight: "10px",
    fontSize: "1.8rem"
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>📝</div>
      <h1>Keeper App</h1>
    </header>
  );
}

export default Header;