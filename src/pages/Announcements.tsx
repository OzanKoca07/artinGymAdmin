// src/pages/Announcements.tsx
import { useEffect, useState } from "react";
import type { Announcement } from "../types/domain";
import { getAnnouncements } from "../services/announcements.service";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Modal kontrol
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [target, setTarget] = useState("Genel");
    const [content, setContent] = useState("");

    const loadAnnouncements = async () => {
        try {
            setLoading(true);
            const res = await getAnnouncements();
            setAnnouncements(res);
        } catch {
            setError("Duyurular yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnnouncements();
    }, []);

    // Yeni duyuru ekleme (şimdilik frontend)
    const addAnnouncement = () => {
        const newA: Announcement = {
            id: Date.now().toString(),
            title,
            target,
            content,
            date: new Date().toISOString().split("T")[0],
        };

        setAnnouncements((prev) => [newA, ...prev]);
        setIsAddModalOpen(false);

        // Form Reset
        setTitle("");
        setTarget("Genel");
        setContent("");
    };

    return (
        <div className="announcements-page">
            <div className="page-header">
                <h2>Duyurular</h2>

                <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
                    Yeni Duyuru Oluştur
                </button>
            </div>

            {/* Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Yeni Duyuru Oluştur</h3>

                        <label>
                            Başlık:
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>

                        <label>
                            Hedef Kitle:
                            <select value={target} onChange={(e) => setTarget(e.target.value)}>
                                <option value="Genel">Genel</option>
                                <option value="Tüm Üyeler">Tüm Üyeler</option>
                                <option value="Aktif Üyeler">Aktif Üyeler</option>
                                <option value="Pasif Üyeler">Pasif Üyeler</option>
                            </select>
                        </label>

                        <label>
                            Açıklama:
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </label>

                        <div className="modal-buttons">
                            <button className="btn-primary" onClick={addAnnouncement}>
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
                        <th>Başlık</th>
                        <th>Hedef Kitle</th>
                        <th>Tarih</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.target}</td>
                            <td>{a.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Announcements;
