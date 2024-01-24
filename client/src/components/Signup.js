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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            value={loginInfo.username}
            id="username"
            name="username"
            onChange={handleLoginChange}
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
          />
          <div>
            <input type="submit" value="Signup" />
          </div>
        </div>
      </form>
      <Link to="/">Sign In</Link>
    </div>
  );
}
