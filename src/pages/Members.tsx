import { useEffect, useState } from "react";
import type { Member } from "../types/domain";
import { getMembers } from "../services/members.service";
import AddMemberForm from "../components/members/AddMemberForm";
import { getMemberAttendance, getMemberPhysicalHistory } from "../services/members.service";
import "../styles.css";


const Members = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [physicalHistory, setPhysicalHistory] = useState<any[]>([]);




    const handleSelect = async (member: Member) => {
        try {
            setSelectedMember(member);

            const att = await getMemberAttendance(member.id);
            const phys = await getMemberPhysicalHistory(member.id);

            setAttendance(att);
            setPhysicalHistory(phys);
        } catch (e) {
            console.error(e);
        }
    };




    // 🔁 ÜYELERİ YENİDEN YÜKLE
    const loadMembers = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getMembers();
            setMembers(data);
        } catch (e) {
            console.error(e);
            setError("Üyeler yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMembers();
    }, []);

    return (
        <div className="members-page">
            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <div className="page-header">
                    <h2>Üye Yönetimi</h2>

                    <button className="btn btn-gold">
                        + Yeni Üye
                    </button>
                </div>

            </div>

            {/* LOADING & ERROR */}
            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* MEMBERS TABLE */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>Durum</th>
                        <th>Telefon</th>
                        <th>Son Giriş</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && members.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center" }}>
                                Henüz üye bulunmuyor
                            </td>
                        </tr>
                    )}

                    {members.map((m) => (
                        <tr key={m.id} onClick={() => handleSelect(m)}>
                            <td>{m.name}</td>
                            <td>
                                <span
                                    style={{
                                        color: m.status === "Aktif" ? "#22c55e" : "#ef4444",
                                        fontWeight: 500,
                                    }}
                                >
                                    {m.status}
                                </span>
                            </td>
                            <td>{m.phone}</td>
                            <td>{m.lastEntry ?? "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MEMBER DETAIL */}
            {selectedMember && (
                <div className="detail-card">
                    <h3>{selectedMember.name}</h3>

                    <p><b>Telefon:</b> {selectedMember.phone}</p>
                    <p><b>Durum:</b> {selectedMember.status}</p>

                    <hr />

                    <h4>Fiziksel Bilgiler</h4>
                    {physicalHistory.length === 0 ? (
                        <p>Henüz fiziksel veri yok</p>
                    ) : (
                        <>
                            <p><b>Son Kayıt:</b></p>
                            <p>Kilo: {physicalHistory[0].weightKg} kg</p>
                            <p>Boy: {physicalHistory[0].heightCm} cm</p>
                            {physicalHistory[0].bodyFatPercentage !== null && (
                                <p>Yağ Oranı: %{physicalHistory[0].bodyFatPercentage}</p>
                            )}
                        </>
                    )}

                    <hr />

                    <h4>Katılım Geçmişi</h4>
                    {attendance.length === 0 ? (
                        <p>Bu üyenin giriş çıkış kaydı yok</p>
                    ) : (
                        <ul>
                            {attendance.map((a, i) => (
                                <li key={i}>{a.fullDetail}</li>
                            ))}
                        </ul>
                    )}

                    <button onClick={() => setSelectedMember(null)}>Kapat</button>
                </div>
            )}

            {/* ADD MEMBER MODAL */}
            {showAddModal && (
                <div className="modal-backdrop">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h3>Yeni Üye Ekle</h3>
                            <button
                                className="close-btn"
                                onClick={() => setShowAddModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <AddMemberForm
                            onSuccess={() => {
                                setShowAddModal(false);
                                loadMembers();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Members;