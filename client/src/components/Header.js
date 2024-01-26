import React, { useState, useEffect } from "react";

const Header = ({user, setUser}) => {

  const logout = () => {
    fetch("/logout", { method: "DELETE" }).then(() => {
      setUser(null);
      window.location.href="/";
    });
  };

  let view;
  if (user) {
    view = (<button type="button" onClick={logout} className="logout-button">Log Out</button>)
  } else if (user === null) {
    view = null
  }
    return (
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
          background: "#5db6ff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <h1
            style={{
              position: "absolute",
              left: 0,
              top: 10,
              color: "white",
              background: "#5db6ff",
              padding: "0px 20px",
              width: "100%",
            }}
          >
            On My Plate ✓
            <br />
          </h1>
        </div>
        {view}
      </header>
    );
};

export default Header;
