// components/Header.js
import React from "react";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button style={{ padding: "10px 20px" }}>Log In/Out</button>
    </header>
  );
};

export default Header;
