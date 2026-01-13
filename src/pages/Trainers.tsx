// src/pages/Trainers.tsx
import { useEffect, useState } from "react";
import {
    getTrainers,
    registerTrainer,
    updateTrainer,
    deleteTrainer,
    type Trainer,
} from "../services/trainer.service";

const Trainers = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Trainer | null>(null);

    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const loadTrainers = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getTrainers();
            setTrainers(res);
        } catch {
            setError("Eğitmenler yüklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrainers();
    }, []);

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
    };

    const openAddModal = () => {
        setEditing(null);
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (t: Trainer) => {
        setEditing(t);
        setFirstName(t.firstName);
        setLastName(t.lastName);
        setPhoneNumber(t.phoneNumber);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!firstName || !lastName || !phoneNumber) {
            alert("Tüm alanları doldurun");
            return;
        }

        try {
            setSaving(true);
            if (editing) {
                await updateTrainer(editing.id, {
                    firstName,
                    lastName,
                    phoneNumber,
                });
            } else {
                await registerTrainer({
                    firstName,
                    lastName,
                    phoneNumber,
                });
            }

            setIsModalOpen(false);
            loadTrainers();
        } catch {
            alert("İşlem başarısız");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Eğitmeni silmek istiyor musunuz?")) return;
        try {
            await deleteTrainer(id);
            loadTrainers();
        } catch {
            alert("Silme işlemi başarısız");
        }
    };

    return (
        <div className="trainers-page">
            <div className="page-header">
                <h2>Eğitmenler</h2>
                <button className="btn-primary" onClick={openAddModal}>
                    + Yeni Eğitmen
                </button>
            </div>

            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>Telefon</th>
                        <th>Durum</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map((t) => (
                        <tr key={t.id}>
                            <td>{t.firstName} {t.lastName}</td>
                            <td>{t.phoneNumber}</td>
                            <td>
                                <span
                                    style={{
                                        color:
                                            t.status === "active"
                                                ? "#22c55e"
                                                : "#ef4444",
                                    }}
                                >
                                    {t.status === "active" ? "Aktif" : "Pasif"}
                                </span>
                            </td>
                            <td style={{ display: "flex", gap: 8 }}>
                                <button onClick={() => openEditModal(t)}>
                                    Düzenle
                                </button>
                                <button
                                    style={{ color: "#ef4444" }}
                                    onClick={() => handleDelete(t.id)}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL */}
            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h3>
                                {editing
                                    ? "Eğitmeni Düzenle"
                                    : "Yeni Eğitmen Ekle"}
                            </h3>
                            <button
                                className="close-btn"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-form-grid">
                            <input
                                placeholder="Ad"
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(e.target.value)
                                }
                            />

                            <input
                                placeholder="Soyad"
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(e.target.value)
                                }
                            />

                            <input
                                type="tel"
                                placeholder="Telefon"
                                value={phoneNumber}
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn-primary"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "Kaydediliyor..." : "Kaydet"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trainers;
