import { useEffect, useState } from "react";
import {
    getActiveMembers,
    getMemberAttendance,
    getReportStats,
    type ActiveMember,
    type AttendanceDetail,
} from "../services/reports.service";

const Reports = () => {
    const [members, setMembers] = useState<ActiveMember[]>([]);
    const [attendance, setAttendance] = useState<AttendanceDetail[]>([]);
    const [selectedMember, setSelectedMember] = useState<ActiveMember | null>(null);

    const [activeCount, setActiveCount] = useState(0);
    const [insideCount, setInsideCount] = useState(0);
    const [todayEntries, setTodayEntries] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            // 📌 Dashboard ile AYNI kaynaklar
            const stats = await getReportStats();
            setActiveCount(stats.activeMembers);
            setTodayEntries(stats.todayEntries);

            const data = await getActiveMembers();
            setMembers(data);
            setInsideCount(data.filter(m => m.isInside).length);

            setLoading(false);
        };

        load();
    }, []);

    const openAttendance = async (m: ActiveMember) => {
        setSelectedMember(m);
        const list = await getMemberAttendance(m.id);
        setAttendance(list);
    };

    return (
        <div className="reports-page">
            <h2>Raporlama & Loglar</h2>

            {/* ===== STATS ===== */}
            <div className="stats-grid">
                <div className="stat-box">
                    <h3>Aktif Üye</h3>
                    <div className="stat-value">{activeCount}</div>
                </div>

                <div className="stat-box">
                    <h3>Bugün Giriş</h3>
                    <div className="stat-value">{todayEntries}</div>
                </div>

                <div className="stat-box">
                    <h3>Şu An İçeride</h3>
                    <div className="stat-value">{insideCount}</div>
                </div>
            </div>

            {/* ===== TABLE ===== */}
            <table className="table" style={{ marginTop: 30 }}>
                <thead>
                    <tr>
                        <th>Üye</th>
                        <th>Telefon</th>
                        <th>İçeride mi?</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center" }}>
                                Kayıt bulunamadı
                            </td>
                        </tr>
                    )}

                    {members.map(m => (
                        <tr key={m.id}>
                            <td>{m.firstName} {m.lastName}</td>
                            <td>{m.phoneNumber}</td>
                            <td>{m.isInside ? "Evet" : "Hayır"}</td>
                            <td>
                                <button
                                    className="btn-primary"
                                    onClick={() => openAttendance(m)}
                                >
                                    Giriş–Çıkış Logları
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ===== ATTENDANCE ===== */}
            {selectedMember && (
                <div style={{ marginTop: 30 }}>
                    <h3>
                        {selectedMember.firstName} {selectedMember.lastName} — Giriş Çıkış
                    </h3>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Gün</th>
                                <th>Giriş</th>
                                <th>Çıkış</th>
                                <th>Süre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((a, i) => (
                                <tr key={i}>
                                    <td>{a.date}</td>
                                    <td>{a.dayName}</td>
                                    <td>{a.entryTime}</td>
                                    <td>{a.exitTime ?? "-"}</td>
                                    <td>{a.duration ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {loading && <p>Yükleniyor...</p>}
        </div>
    );
};

export default Reports;
