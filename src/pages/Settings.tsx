import { useEffect, useState } from "react";

type WorkingHours = {
    open: string;
    close: string;
};

type SettingsState = {
    salonName: string;
    address: string;
    workingHours: WorkingHours;
    capacity: number;
};

const DEFAULT_SETTINGS: SettingsState = {
    salonName: "",
    address: "",
    workingHours: {
        open: "08:00",
        close: "22:00",
    },
    capacity: 50,
};

const Settings = () => {
    const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
    const [saved, setSaved] = useState(false);

    // 🔹 İlk yüklemede user + settings al
    useEffect(() => {
        const rawUser = localStorage.getItem("user");
        const user = rawUser ? JSON.parse(rawUser) : null;

        const storedSettings = localStorage.getItem("tenantSettings");

        if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
        } else if (user?.tenant) {
            setSettings(prev => ({
                ...prev,
                salonName: user.tenant.name || "",
                address: user.tenant.address || "",
            }));
        }
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleHoursChange = (field: "open" | "close", value: string) => {
        setSettings(prev => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [field]: value,
            },
        }));
    };

    const handleSave = () => {
        localStorage.setItem("tenantSettings", JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="settings-page">
            <h2>Salon Ayarları</h2>

            {/* ---------------- SALON BİLGİLERİ ---------------- */}
            <div className="card">
                <h3>Salon Bilgileri</h3>

                <label>Salon Adı</label>
                <input
                    type="text"
                    name="salonName"
                    value={settings.salonName}
                    onChange={handleChange}
                />

                <label>Adres</label>
                <textarea
                    name="address"
                    rows={3}
                    value={settings.address}
                    onChange={handleChange}
                />
            </div>

            {/* ---------------- ÇALIŞMA SAATLERİ ---------------- */}
            <div className="card">
                <h3>Çalışma Saatleri</h3>

                <div style={{ display: "flex", gap: 16 }}>
                    <div>
                        <label >Açılış</label>
                        <input
                            type="time"
                            value={settings.workingHours.open}
                            onChange={(e) => handleHoursChange("open", e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Kapanış</label>
                        <input
                            type="time"
                            value={settings.workingHours.close}
                            onChange={(e) => handleHoursChange("close", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* ---------------- KAPASİTE ---------------- */}
            <div className="card">
                <h3>Yoğunluk & Kapasite</h3>

                <label>Maksimum Kapasite (kişi)</label>
                <input
                    type="number"
                    min={1}
                    value={settings.capacity}
                    onChange={(e) =>
                        setSettings(prev => ({
                            ...prev,
                            capacity: Number(e.target.value),
                        }))
                    }
                />
            </div>

            {/* ---------------- KAYDET ---------------- */}
            <button className="btn btn-gold" onClick={handleSave}>
                Ayarları Kaydet
            </button>

            {saved && <p style={{ color: "green" }}>Ayarlar kaydedildi ✅</p>}
        </div>
    );
};

export default Settings;
