import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{ fontSize: 20, color: "#64b5f6" }}>📝</span>
        <p style={{ margin: 0 }}>Keeper App &copy; {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;