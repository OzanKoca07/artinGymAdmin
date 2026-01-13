import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const nav = useNavigate();
    return (
        <div style={{ padding: 32 }}>
            <h2>Yetkisiz Erişim</h2>
            <p>Bu sayfaya erişim iznin yok.</p>
            <button onClick={() => nav("/login")}>Login’e dön</button>
        </div>
    );
}
