// src/pages/Settings.tsx
import { useEffect, useState } from "react";
import type { GymSettings } from "../types/domain";
import { getGymSettings } from "../services/settings.service";

const Settings = () => {
    const [settings, setSettings] = useState<GymSettings>({
        name: "",
        address: "",
        openHour: "",
        closeHour: "",
        capacity: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [openHour, setOpenHour] = useState("");
    const [closeHour, setCloseHour] = useState("");
    const [capacity, setCapacity] = useState<number>(0);

    const [formErrors, setFormErrors] = useState<string[]>([]);

    // Load
    const loadSettings = async () => {
        try {
            setLoading(true);
            const res = await getGymSettings();

            setSettings(res);
            setName(res.name);
            setAddress(res.address);
            setOpenHour(res.openHour);
            setCloseHour(res.closeHour);
            setCapacity(res.capacity);
        } catch {
            setError("Ayarlar yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    // Validation
    const validateForm = () => {
        const errors: string[] = [];

        if (!name.trim()) errors.push("Salon adı boş olamaz.");
        if (!openHour) errors.push("Açılış saati gereklidir.");
        if (!closeHour) errors.push("Kapanış saati gereklidir.");
        if (capacity <= 0) errors.push("Kapasite 1’den küçük olamaz.");

        setFormErrors(errors);
        return errors.length === 0;
    };

    // Save
    const saveSettings = () => {
        if (!validateForm()) return;

        const updated: GymSettings = {
            name,
            address,
            openHour,
            closeHour,
            capacity,
        };

        setSettings(updated);
        setIsEditModalOpen(false);
    };

    // Reset
    const resetForm = () => {
        setName(settings.name);
        setAddress(settings.address);
        setOpenHour(settings.openHour);
        setCloseHour(settings.closeHour);
        setCapacity(settings.capacity);
        setFormErrors([]);
    };

    return (
        <div className="settings-page">
            <h2>Salon Ayarları</h2>

            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="settings-box">
                <p><strong>Salon Adı:</strong> {settings.name}</p>
                <p><strong>Adres:</strong> {settings.address}</p>
                <p><strong>Açılış – Kapanış:</strong> {settings.openHour} – {settings.closeHour}</p>
                <p><strong>Kapasite:</strong> {settings.capacity}</p>

                <button className="btn-primary" onClick={() => setIsEditModalOpen(true)}>
                    Ayarları Düzenle
                </button>
            </div>

            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Salon Ayarlarını Düzenle</h3>

                        {formErrors.length > 0 && (
                            <div style={{ color: "red" }}>
                                {formErrors.map((e, i) => (
                                    <div key={i}>{e}</div>
                                ))}
                            </div>
                        )}

                        <label>
                            Salon Adı:
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                        </label>

                        <label>
                            Adres:
                            <input value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>

                        <label>
                            Açılış Saati:
                            <input type="time" value={openHour} onChange={(e) => setOpenHour(e.target.value)} />
                        </label>

                        <label>
                            Kapanış Saati:
                            <input type="time" value={closeHour} onChange={(e) => setCloseHour(e.target.value)} />
                        </label>

                        <label>
                            Kapasite:
                            <input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
                        </label>

                        <div className="modal-buttons">
                            <button className="btn-primary" onClick={saveSettings}>Kaydet</button>
                            <button onClick={resetForm}>Geri Al</button>
                            <button onClick={() => setIsEditModalOpen(false)}>Kapat</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
