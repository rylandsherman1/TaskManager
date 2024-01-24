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
      <form onSubmit={handleSubmit}>
        <div>
          <labl htmlFor="username">Username: </labl>
          <input
            value={loginInfo.username}
            id="username"
            name="username"
            onChange={handleLoginChange}
          />
        </div>
        <labl htmlFor="password">Password: </labl>
        <input
          value={loginInfo.password}
          id="password"
          type="password"
          name="password"
          onChange={handleLoginChange}
        />
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
