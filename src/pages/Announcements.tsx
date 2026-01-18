// src/pages/Announcements.tsx
import { useEffect, useState } from "react";
import type { Announcement } from "../types/domain";
import {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from "../services/announcements.service";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ADD MODAL
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // EDIT MODAL
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<Announcement | null>(null);

    // FORM state
    const [title, setTitle] = useState("");
    const [audience, setAudience] = useState("all");
    const [description, setDescription] = useState("");

    const loadAnnouncements = async () => {
        try {
            setLoading(true);
            const res = await getAnnouncements();
            setAnnouncements(res);
        } catch (e) {
            setError("Duyurular yüklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnnouncements();
    }, []);

    // CREATE
    const handleCreate = async () => {
        if (!title.trim()) return alert("Başlık boş olamaz");

        await createAnnouncement({ title, audience, description });
        setIsAddModalOpen(false);
        resetForm();
        loadAnnouncements();
    };

    // OPEN EDIT MODAL
    const openEditModal = (ann: Announcement) => {
        setEditItem(ann);
        setTitle(ann.title);
        setAudience(ann.audience);
        setDescription(ann.description);
        setIsEditModalOpen(true);
    };

    // UPDATE
    const handleUpdate = async () => {
        if (!editItem) return;
        await updateAnnouncement(editItem.id, { title, audience, description });
        setIsEditModalOpen(false);
        resetForm();
        loadAnnouncements();
    };

    // DELETE
    const handleDelete = async (id: number) => {
        if (!window.confirm("Bu duyuruyu silmek istediğine emin misin?")) return;
        await deleteAnnouncement(id);
        loadAnnouncements();
    };

    // RESET FORM
    const resetForm = () => {
        setTitle("");
        setAudience("all");
        setDescription("");
        setEditItem(null);
    };

    return (
        <div className="announcements-page">
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="page-header">
                    <h2>Duyurular</h2>

                    <button className="btn btn-gold">
                        + Yeni Duyuru
                    </button>
                </div>

            </div>

            {/* ADD MODAL */}
            {isAddModalOpen && (
                <Modal
                    title="Yeni Duyuru Oluştur"
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleCreate}
                    form={{ title, audience, description }}
                    setForm={{ setTitle, setAudience, setDescription }}
                />
            )}

            {/* EDIT MODAL */}
            {isEditModalOpen && (
                <Modal
                    title="Duyuru Düzenle"
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleUpdate}
                    form={{ title, audience, description }}
                    setForm={{ setTitle, setAudience, setDescription }}
                    buttonText="Güncelle"
                />
            )}

            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>Başlık</th>
                        <th>Hedef</th>
                        <th>Tarih</th>
                        <th style={{ textAlign: "right" }}>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.audience === "all" ? "Tüm Salon" : a.audience === "members" ? "Üyeler" : "Eğitmenler"}</td>
                            <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                            <td style={{ textAlign: "right" }}>
                                <div className="btn-group">
                                    <button className="btn btn-outline btn-sm" style={{ marginRight: 10 }} onClick={() => openEditModal(a)}>
                                        Düzenle
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                                        Sil
                                    </button></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Reusable Modal Component
const Modal = ({ title: modalTitle, onClose, onSave, form, setForm, buttonText = "Kaydet" }) => {
    const { title, audience, description } = form;
    const { setTitle, setAudience, setDescription } = setForm;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{modalTitle}</h3>

                <label>Başlık:
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>Hedef Kitle:
                    <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                        <option value="all">Tüm Salon</option>
                        <option value="members">Üyeler</option>
                        <option value="trainers">Eğitmenler</option>
                    </select>
                </label>

                <label>Açıklama:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>

                <div className="modal-buttons">
                    <button className="btn-primary" onClick={onSave}>{buttonText}</button>
                    <button onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default Announcements;
