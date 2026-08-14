import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin({ onLogin }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
e.preventDefault();


try {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/admin/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  if (response.ok) {
    onLogin();
  }
} catch (error) {
  console.error("Login error:", error);
}


};

return ( <div className="admin-login-page">


  <div className="admin-login-card">

    <div className="admin-login-header">
      <h1>Admin Login</h1>
      <p>Sign in to manage your portfolio</p>
    </div>

    <form onSubmit={handleLogin}>

      <div className="form-group">
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="admin-login-button"
      >
        Login
      </button>

    </form>

  </div>

</div>


);
}

export default AdminLogin;
