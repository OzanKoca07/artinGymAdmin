// src/pages/Packages.tsx
import { useEffect, useState } from "react";
import {
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,
    type Package,
} from "../services/packages.service";

const Packages = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Package | null>(null);

    // FORM STATE
    const [packageName, setPackageName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [durationValue, setDurationValue] = useState("1");
    const [durationType, setDurationType] = useState<"MONTH" | "YEAR">("MONTH");
    const [isUnlimited, setIsUnlimited] = useState(false);

    const loadPackages = async () => {
        try {
            setLoading(true);
            const res = await getPackages();
            setPackages(res);
        } catch {
            setError("Paketler yüklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPackages();
    }, []);

    const openAddModal = () => {
        setEditing(null);
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (pkg: Package) => {
        setEditing(pkg);
        setPackageName(pkg.packageName);
        setDescription(pkg.description || "");
        setPrice(String(pkg.price));
        setDurationValue(String(pkg.durationValue));
        setDurationType(pkg.durationType);
        setIsUnlimited(!!pkg.isUnlimitedAccess);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setPackageName("");
        setDescription("");
        setPrice("");
        setDurationValue("1");
        setDurationType("MONTH");
        setIsUnlimited(false);
    };

    const handleSave = async () => {
        try {
            if (editing) {
                await updatePackage(editing.id, {
                    packageName,
                    description,
                    price: Number(price),
                    durationValue: Number(durationValue),
                    durationType,
                });
            } else {
                await createPackage({
                    packageName,
                    description,
                    price: Number(price),
                    durationValue: Number(durationValue),
                    durationType,
                    isUnlimitedAccess: isUnlimited,
                });
            }

            setIsModalOpen(false);
            await loadPackages();
        } catch {
            alert("İşlem başarısız");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Paketi silmek istiyor musunuz?")) return;
        await deletePackage(id);
        loadPackages();
    };

    return (
        <div className="packages-page">
            <div className="page-header">
                <h2>Üyelik Paketleri</h2>
                <button className="btn-primary" onClick={openAddModal}>
                    + Yeni Paket Ekle
                </button>
            </div>

            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>Paket Adı</th>
                        <th>Süre</th>
                        <th>Fiyat (₺)</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((p) => (
                        <tr key={p.id}>
                            <td>{p.packageName}</td>
                            <td>
                                {p.durationValue}{" "}
                                {p.durationType === "MONTH" ? "Ay" : "Yıl"}
                            </td>
                            <td>{p.price}</td>
                            <td style={{ display: "flex", gap: 8 }}>
                                <button onClick={() => openEditModal(p)}>
                                    Düzenle
                                </button>
                                <button
                                    style={{ color: "#ef4444" }}
                                    onClick={() => handleDelete(p.id)}
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
                                {editing ? "Paketi Düzenle" : "Yeni Paket Ekle"}
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
                                className="modal-form-full"
                                placeholder="Paket Adı"
                                value={packageName}
                                onChange={(e) => setPackageName(e.target.value)}
                            />

                            <input
                                className="modal-form-full"
                                placeholder="Açıklama"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Fiyat"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Süre"
                                value={durationValue}
                                onChange={(e) =>
                                    setDurationValue(e.target.value)
                                }
                            />

                            <select
                                value={durationType}
                                onChange={(e) =>
                                    setDurationType(
                                        e.target.value as "MONTH" | "YEAR"
                                    )
                                }
                            >
                                <option value="MONTH">Ay</option>
                                <option value="YEAR">Yıl</option>
                            </select>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={isUnlimited}
                                    onChange={(e) =>
                                        setIsUnlimited(e.target.checked)
                                    }
                                />{" "}
                                Sınırsız Giriş
                            </label>

                            <div className="modal-footer">
                                <button
                                    className="btn-primary"
                                    onClick={handleSave}
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Packages;
