import { useEffect, useState } from "react";
import { apiPost } from "../../services/apiClient";
import { getPackages } from "../../services/packages.service";
import type { Package } from "../../services/packages.service";
import { getTrainers } from "../../services/trainer.service";
import type { Trainer } from "../../services/trainer.service";

type Props = {
    onSuccess: () => void;
};

// 📞 Telefon normalize helper
const normalizePhone = (phone: string) =>
    phone.replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "");

const AddMemberForm = ({ onSuccess }: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const [trainerId, setTrainerId] = useState<number | "">("");
    const [packageId, setPackageId] = useState<number | "">("");

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTrainers().then(setTrainers);
        getPackages().then(setPackages);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trainerId || !packageId) {
            alert("Trainer ve paket seçmelisiniz");
            return;
        }

        setLoading(true);
        try {
            await apiPost("/auth/register-member", {
                firstName,
                lastName,
                phoneNumber: normalizePhone(phoneNumber),
                emergencyContact: emergencyContact
                    ? normalizePhone(emergencyContact)
                    : undefined,
                dateOfBirth: dateOfBirth || undefined,
                trainerId: String(trainerId),
                packageId: String(packageId),
                physicalData:
                    height || weight
                        ? {
                            heightCm: height ? Number(height) : undefined,
                            weightKg: weight ? Number(weight) : undefined,
                        }
                        : undefined,
            });

            onSuccess();
        } catch {
            alert("Üye eklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form-grid">
            <input
                placeholder="Ad"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                placeholder="Soyad"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />

            <input
                placeholder="Telefon (5xxxxxxxxx)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            <input
                placeholder="Acil Kişi (opsiyonel)"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
            />

            <input
                type="date"
                className="modal-form-full"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <select
                className="modal-form-full"
                value={trainerId}
                onChange={(e) => setTrainerId(Number(e.target.value))}
                required
            >
                <option value="">Trainer Seç</option>
                {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                        {t.fullName}
                    </option>
                ))}
            </select>

            <select
                className="modal-form-full"
                value={packageId}
                onChange={(e) => setPackageId(Number(e.target.value))}
                required
            >
                <option value="">Paket Seç</option>
                {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.packageName} ({p.durationValue} {p.durationType})
                    </option>
                ))}
            </select>

            <input
                placeholder="Boy (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <input
                placeholder="Kilo (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />

            <div className="modal-footer">
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>
        </form>
    );
};

export default AddMemberForm;
