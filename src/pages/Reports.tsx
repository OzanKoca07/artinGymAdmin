// src/pages/Reports.tsx
import { useEffect, useState } from "react";
import type { EntryLog, PaginatedResponse } from "../types/domain";
import { getEntryLogs } from "../services/reports.service";

const Reports = () => {
    const [logs, setLogs] = useState<EntryLog[]>([]);
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Modal kontrol
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form Fields
    const [memberName, setMemberName] = useState("");
    const [entryTime, setEntryTime] = useState("");
    const [exitTime, setExitTime] = useState("");

    const loadLogs = async () => {
        try {
            setLoading(true);
            setError("");

            const res: PaginatedResponse<EntryLog> = await getEntryLogs({
                from,
                to,
                page: 1,
                limit: 100,
            });

            setLogs(res.data);
        } catch {
            setError("Kayıtlar yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Yeni Log Ekle
    const addLog = () => {
        const newLog: EntryLog = {
            id: Date.now(),
            memberId: Date.now(),
            memberName,
            entryTime,
            exitTime: exitTime || undefined,
        };

        setLogs((prev) => [newLog, ...prev]);

        setIsAddModalOpen(false);

        // Reset
        setMemberName("");
        setEntryTime("");
        setExitTime("");
    };

    // Log Silme
    const deleteLog = (id: number) => {
        setLogs((prev) => prev.filter((x) => x.id !== id));
    };

    return (
        <div className="reports-page">
            <h2>Giriş – Çıkış Kayıtları</h2>

            <div className="list-toolbar">
                <label>
                    Başlangıç:
                    <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                </label>

                <label>
                    Bitiş:
                    <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
                </label>

                <button className="btn-primary" onClick={loadLogs}>
                    Filtrele
                </button>

                <button
                    className="btn-primary"
                    style={{ marginLeft: "auto" }}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Manuel Log Ekle
                </button>
            </div>

            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Yeni Log Ekle</h3>

                        <label>
                            Üye Adı:
                            <input
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                            />
                        </label>

                        <label>
                            Giriş Saati:
                            <input
                                type="datetime-local"
                                value={entryTime}
                                onChange={(e) => setEntryTime(e.target.value)}
                            />
                        </label>

                        <label>
                            Çıkış Saati (Opsiyonel):
                            <input
                                type="datetime-local"
                                value={exitTime}
                                onChange={(e) => setExitTime(e.target.value)}
                            />
                        </label>

                        <div className="modal-buttons">
                            <button className="btn-primary" onClick={addLog}>
                                Kaydet
                            </button>
                            <button onClick={() => setIsAddModalOpen(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}

            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>Üye</th>
                        <th>Giriş Saati</th>
                        <th>Çıkış Saati</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((l) => (
                        <tr key={l.id}>
                            <td>{l.memberName}</td>
                            <td>{l.entryTime}</td>
                            <td>{l.exitTime ?? "-"}</td>
                            <td>
                                <button
                                    style={{
                                        background: "red",
                                        color: "white",
                                        padding: "4px 8px",
                                        borderRadius: "6px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => deleteLog(l.id)}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
