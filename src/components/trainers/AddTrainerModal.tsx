import { useState } from "react";
import { registerTrainer } from "../../services/trainer.service";

// 📞 Telefon normalize helper
const normalizePhone = (phone: string) =>
    phone.replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "");

type Props = {
    onSuccess: () => void;
    onClose: () => void;
};

const AddTrainerModal = ({ onSuccess, onClose }: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!firstName || !lastName || !phoneNumber) {
            alert("Tüm alanları doldurun");
            return;
        }

        setLoading(true);
        try {
            await registerTrainer({
                firstName,
                lastName,
                phoneNumber: normalizePhone(phoneNumber),
            });

            onSuccess();
            onClose();
        } catch {
            alert("Eğitmen eklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Yeni Eğitmen Ekle</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <input
                        placeholder="Ad"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        placeholder="Soyad"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        placeholder="Telefon (5xxxxxxxxx)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="modal-footer">
                    <button onClick={onClose}>İptal</button>
                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTrainerModal;
