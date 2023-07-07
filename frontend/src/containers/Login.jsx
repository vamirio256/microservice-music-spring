import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const token = await response.json();
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Submit
        </Button>
        {/* <input
          type="text"
          placeholder="Username"
          value={username}
          className="px-2 py-2 w-full rounded focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
        ></input> */}
        {/* <input
          type="password"
          placeholder="Password"
          value={password}
          className="px-2 py-2 w-full rounded focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        ></input> */}
        {/* <button type="submit">Submit</button> */}
      </Form>
    </div>
  );
};

export default Login;
