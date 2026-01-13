// src/pages/Workouts.tsx
import { useState } from "react";

type Exercise = {
    id: string;
    name: string;
    muscle: string;
    video?: string;
};

type Program = {
    id: string;
    title: string;
    description: string;
};

const Workouts = () => {
    // Egzersiz listesi
    const [exercises, setExercises] = useState<Exercise[]>([]);
    // Program listesi
    const [programs, setPrograms] = useState<Program[]>([]);

    // Modal kontrol
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
    const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

    // Egzersiz form state
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseMuscle, setExerciseMuscle] = useState("");
    const [exerciseVideo, setExerciseVideo] = useState("");

    // Program form state
    const [programTitle, setProgramTitle] = useState("");
    const [programDesc, setProgramDesc] = useState("");

    // Yeni egzersiz ekleme
    const addExercise = () => {
        const newEx: Exercise = {
            id: Date.now().toString(),
            name: exerciseName,
            muscle: exerciseMuscle,
            video: exerciseVideo || undefined,
        };

        setExercises((prev) => [newEx, ...prev]);
        setIsExerciseModalOpen(false);

        // Reset
        setExerciseName("");
        setExerciseMuscle("");
        setExerciseVideo("");
    };

    // Yeni program ekleme
    const addProgram = () => {
        const newProgram: Program = {
            id: Date.now().toString(),
            title: programTitle,
            description: programDesc,
        };

        setPrograms((prev) => [newProgram, ...prev]);
        setIsProgramModalOpen(false);

        setProgramTitle("");
        setProgramDesc("");
    };

    return (
        <div className="workouts-page">
            <h2>Antrenman & Egzersiz Yönetimi</h2>

            <div className="workout-sections">
                {/* Egzersiz Kütüphanesi */}
                <div className="workout-box">
                    <h3>Egzersiz Kütüphanesi</h3>
                    <p>Egzersiz ekleme, video yükleme, anatomik kategori seçme burada yapılacak.</p>

                    <button
                        className="btn-primary"
                        onClick={() => setIsExerciseModalOpen(true)}
                    >
                        Yeni Egzersiz Ekle
                    </button>

                    {/* Egzersiz Tablosu */}
                    {exercises.length > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Egzersiz</th>
                                    <th>Kas Grubu</th>
                                    <th>Video</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exercises.map((ex) => (
                                    <tr key={ex.id}>
                                        <td>{ex.name}</td>
                                        <td>{ex.muscle}</td>
                                        <td>{ex.video ? "Video Var" : "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Hazır Programlar */}
                <div className="workout-box">
                    <h3>Hazır Programlar</h3>
                    <p>Kas kazanma, yağ yakma gibi hazır programların yönetimi.</p>

                    <button
                        className="btn-primary"
                        onClick={() => setIsProgramModalOpen(true)}
                    >
                        Yeni Program Oluştur
                    </button>

                    {/* Program Tablosu */}
                    {programs.length > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Başlık</th>
                                    <th>Açıklama</th>
                                </tr>
                            </thead>
                            <tbody>
                                {programs.map((pr) => (
                                    <tr key={pr.id}>
                                        <td>{pr.title}</td>
                                        <td>{pr.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Egzersiz Modal */}
            {isExerciseModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Yeni Egzersiz Ekle</h3>

                        <div className="modal-form">
                            <label>
                                Egzersiz Adı:
                                <input
                                    value={exerciseName}
                                    onChange={(e) => setExerciseName(e.target.value)}
                                />
                            </label>

                            <label>
                                Kas Grubu:
                                <input
                                    value={exerciseMuscle}
                                    onChange={(e) => setExerciseMuscle(e.target.value)}
                                />
                            </label>

                            <label>
                                Video Linki (Opsiyonel):
                                <input
                                    value={exerciseVideo}
                                    onChange={(e) => setExerciseVideo(e.target.value)}
                                />
                            </label>

                            <div className="modal-buttons">
                                <button className="btn-primary" onClick={addExercise}>
                                    Kaydet
                                </button>
                                <button onClick={() => setIsExerciseModalOpen(false)}>İptal</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Program Modal */}
            {isProgramModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Yeni Program Oluştur</h3>

                        <div className="modal-form">
                            <label>
                                Program Başlığı:
                                <input
                                    value={programTitle}
                                    onChange={(e) => setProgramTitle(e.target.value)}
                                />
                            </label>

                            <label>
                                Açıklama:
                                <textarea
                                    value={programDesc}
                                    onChange={(e) => setProgramDesc(e.target.value)}
                                ></textarea>
                            </label>

                            <div className="modal-buttons">
                                <button className="btn-primary" onClick={addProgram}>
                                    Oluştur
                                </button>
                                <button onClick={() => setIsProgramModalOpen(false)}>İptal</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Workouts;
