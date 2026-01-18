import { useState } from "react";
import { loginRequest } from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

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
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>ArtinGYM</h2>
          <p style={styles.subtitle}>Yönetim Paneli Girişi</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>Kullanıcı Adı</label>
          <input
            style={styles.input}
            type="text"
            placeholder="company@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label style={styles.label}>Şifre</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div style={styles.footer}>
          <span>Henüz salonun yok mu?</span>
          <Link to="/register" style={styles.link}>
            Salonunu Kaydet
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1f1f1f, #0d0d0d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 360,
    background: "#121212",
    padding: "32px 28px",
    borderRadius: 14,
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    color: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: "#f5c542",
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#aaa",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontSize: 13,
    color: "#ccc",
    marginTop: 6,
  },
  input: {
    height: 42,
    padding: "0 12px",
    borderRadius: 8,
    border: "1px solid #2c2c2c",
    background: "#1a1a1a",
    color: "#fff",
    outline: "none",
  },
  button: {
    marginTop: 16,
    height: 44,
    borderRadius: 10,
    border: "none",
    background: "#f5c542",
    color: "#111",
    fontWeight: 600,
    cursor: "pointer",
  },
  errorBox: {
    background: "rgba(255,77,77,0.1)",
    color: "#ff6b6b",
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 13,
    color: "#aaa",
    display: "flex",
    justifyContent: "center",
    gap: 6,
  },
  link: {
    color: "#f5c542",
    textDecoration: "none",
    fontWeight: 500,
  },
};
