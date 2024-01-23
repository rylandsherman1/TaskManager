import React, { useState } from "react";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with:", username, password);
    alert("Login successful!");
    setShowLogin(false);
  };

  const handleSignup = () => {
    console.log("Signing up with:", email, password);
    alert("Sign up successful!");
    setShowSignup(false);
  };

  const toggleLogin = () => {
    setShowSignup(false);
    setShowLogin(!showLogin);
  };

  const toggleSignup = () => {
    setShowLogin(false);
    setShowSignup(!showSignup);
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
        Log In
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
          <button onClick={toggleSignup}>Not Signed Up?</button>
        </div>
      )}
      {showSignup && (
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", margin: "5px 0" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", margin: "5px 0" }}
          />
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default Header;
