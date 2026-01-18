// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../services/apiClient";
import "../auth.css";;

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [tenantName, setTenantName] = useState("");
    const [address, setAddress] = useState("");

    const handleRegister = async () => {
        setError("");

        if (!username || !phoneNumber || !tenantName) {
            setError("Lütfen zorunlu alanları doldurun.");
            return;
        }

        try {
            setLoading(true);

            await apiPost("/auth/register", {
                username,
                phoneNumber,
                tenantName,
                address,
            });

            // ✅ başarılı → login
            navigate("/login");
        } catch (err: any) {
            const status = err?.response?.status;

            if (status === 400 || status === 409) {
                setError("Bu salon zaten kayıtlı. Giriş yapabilirsiniz.");
            } else {
                setError("Kayıt sırasında bir hata oluştu.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Salon Kaydı</h2>
                <p className="auth-subtitle">
                    Spor salonunuzu sisteme kaydedin
                </p>

                {error && <div className="alert">{error}</div>}

                <div className="form-group">
                    <label>Salon Adı *</label>
                    <input
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                        placeholder="Company 37"
                    />
                </div>

                <div className="form-group">
                    <label>E-posta *</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="company37@example.com"
                    />
                </div>

                <div className="form-group">
                    <label>Telefon *</label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="5556667267"
                    />
                </div>

                <div className="form-group">
                    <label>Adres</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="İstanbul / Maltepe"
                    />
                </div>

                <button
                    className="btn-primary"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Kaydediliyor..." : "Kayıt Ol"}
                </button>

                <div className="auth-footer">
                    <span>Zaten kayıtlı mısınız?</span>
                    <button onClick={() => navigate("/login")}>
                        Giriş yap
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
