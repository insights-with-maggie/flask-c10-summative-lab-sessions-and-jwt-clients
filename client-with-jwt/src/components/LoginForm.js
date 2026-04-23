import React, { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then((r) => {
        setIsLoading(false);

        if (r.ok) {
          r.json().then(({ token, user }) => onLogin(token, user));
        } else {
          r.json().then((err) => setErrors(err.errors || ["Login failed"]));
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label>Username</Label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormField>

      <FormField>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormField>

      <Button type="submit">
        {isLoading ? "Loading..." : "Login"}
      </Button>

      <FormField>
        {(errors || []).map((err, i) => (
          <Error key={i}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;