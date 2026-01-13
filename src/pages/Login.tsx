import { useState } from "react";
import { loginRequest } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginRequest(username, password);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>ArtinGYM Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Giriş yapılıyor..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  form: {
    width: 320,
    padding: 24,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
};
