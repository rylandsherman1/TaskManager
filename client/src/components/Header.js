import React, { useState } from "react";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with:", username, password);
    setShowLogin(false);
  };

  const handleSignup = () => {
    // Add your sign-up logic or redirect to sign-up page
    console.log("Redirecting to sign up");
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

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
      <button onClick={toggleLogin} style={{ padding: "10px 20px" }}>
        Log In/Out
      </button>
      {showLogin && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#5db6ff",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ display: "block", margin: "5px 0" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", margin: "5px 0" }}
          />
          <button onClick={handleLogin} style={{ marginRight: "5px" }}>
            Sign In
          </button>
          <button onClick={handleSignup}>Not Signed Up?</button>
        </div>
      )}
    </header>
  );
};

export default Header;
