import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "60px 20px",
          display: "grid",
          justifyContent: "start",
        }}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            value={loginInfo.username}
            id="username"
            name="username"
            onChange={handleLoginChange}
            style={{
              width: "100%",
              display: "block",
              margin: "5px 0",
            }}
          />
        </div>
        <label htmlFor="password">Password: </label>
        <input
          value={loginInfo.password}
          id="password"
          type="password"
          name="password"
          onChange={handleLoginChange}
          style={{
            width: "100%",
            display: "block",
            margin: "5px 0",
          }}
        />
        <div>
          <input
            type="submit"
            value="Login"
            style={{
              padding: "5px 20px",
              margin: "10% 0",
            }}
          />
        </div>
      </form>
      <Link
        to="/signup"
        style={{
          display: "block",
          margin: "5px 20px",
        }}
      >
        Sign Up
      </Link>
    </div>
  );
}
