import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        navigate("/");
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
        <div>
          <label htmlFor="password">Password: </label>
          <input
            onChange={handleLoginChange}
            value={loginInfo.password}
            type="password"
            id="password"
            name="password"
            style={{
              width: "100%",
              display: "block",
              margin: "5px 0",
            }}
          />
          <div>
            <input
              type="submit"
              value="Sign Up"
              style={{
                padding: "5px 20px",
                margin: "10% 0",
              }}
            />
          </div>
        </div>
      </form>
      <Link
        to="/"
        style={{
          display: "block",
          margin: "5px 20px",
        }}
      >
        Sign In
      </Link>
    </div>
  );
}
