import { useEffect, useState } from "react";

const Topbar = () => {
    const [isDark, setIsDark] = useState(false);

    // İlk yüklemede tema oku
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const dark = saved === "dark";

        // DOM işlemi → burada yapılabilir
        if (dark) {
            document.documentElement.classList.add("dark");
        }

        // setState çağrısı → microtask ile çalıştırılır
        Promise.resolve().then(() => setIsDark(dark));
    }, []);

    // Tema değiştir
    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);

        if (newDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <header className="topbar">
            <h1>Yönetim Paneli</h1>

            <div className="topbar-right">
                <span>Company Admin</span>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDark ? "🌙 Dark" : "🌞 Light"}
                </button>
            </div>
        </header>
    );
};

export default Topbar;
