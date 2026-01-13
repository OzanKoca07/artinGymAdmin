// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import type { ActiveMember } from "../services/dashboard.service";
import { statsSocket } from "../services/socket";
import {
    getActiveMembers,
    getDashboardStats,
} from "../services/dashboard.service";

const Dashboard = () => {
    const [members, setMembers] = useState<ActiveMember[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [todayCount, setTodayCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [insideCount, setInsideCount] = useState(0);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                // 📌 Dashboard sayıları çek
                const stats = await getDashboardStats();
                setActiveCount(stats.activeMembers);
                setTodayCount(stats.todayEntries ?? 0);

                // 📌 İçerideki üyeleri çek
                const data = await getActiveMembers();
                setMembers(data);

                // Başlangıç içerdeki kişi sayısı
                setInsideCount(data.filter(m => m.isInside).length);

            } catch (e) {
                setError("Dashboard verileri alınırken bir hata oluştu");
            } finally {
                setLoading(false);
            }
        };

        load();

        // ----------- SOCKET BAĞLANTI -----------------
        const raw = localStorage.getItem("user");
        const user = raw ? JSON.parse(raw) : null;
        const tenantId = user?.tenantId;

        if (tenantId) {
            console.log("Join room:", tenantId);
            statsSocket.emit("joinRoom", tenantId);
        }

        // İçeride kişi sayısı değiştiğinde backend tetikler
        statsSocket.on("insideCountUpdated", payload => {
            console.log("SOCKET >> Yeni içeride count:", payload.insideCount);
            setInsideCount(payload.insideCount);
        });

        // ❌ Cleanup
        return () => {
            statsSocket.off("insideCountUpdated");
        };
    }, []);

    const insideMembers = members.filter(m => m.isInside);

    return (
        <div className="dashboard-page">
            <h2>Yönetim Paneli</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="stats-grid">

                <div className="stat-box">
                    <h3>Bugün Giriş Yapan Üye Sayısı</h3>
                    <div className="stat-value">{todayCount}</div>
                </div>

                <div className="stat-box">
                    <h3>Aktif Üye</h3>
                    <div className="stat-value">{activeCount}</div>
                    <div className="stat-label">Toplam aktif</div>
                </div>

                <div className="stat-box">
                    <h3>Şu An İçeride</h3>
                    <div className="stat-value">{insideCount}</div>
                </div>
            </div>

            <div className="report-box" style={{ marginTop: 30 }}>
                <h3>Şu An İçeride Olan Üyeler</h3>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Ad Soyad</th>
                            <th>Telefon</th>
                            <th>Durum</th>
                            <th>Son Giriş</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insideMembers.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: "center" }}>
                                    Şu anda içeride üye yok
                                </td>
                            </tr>
                        )}

                        {insideMembers.map(m => (
                            <tr key={m.id}>
                                <td>{m.name}</td>
                                <td>{m.phone}</td>
                                <td>
                                    <span className="badge badge-success">İçeride</span>
                                </td>
                                <td>
                                    {m.lastEntry
                                        ? new Date(m.lastEntry).toLocaleString()
                                        : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {loading && <p>Yükleniyor...</p>}
        </div>
    );
};

export default Dashboard;
