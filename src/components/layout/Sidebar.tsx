import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="glass-sidebar">
            <div className="sidebar-header">
                <div className="brand-title">ArtinGYM</div>
                <small>Yönetim Paneli</small>
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/dashboard" className="nav-item">
                    <span className="nav-icon">🏠</span>
                    Ana Panel
                </NavLink>

                <NavLink to="/members" className="nav-item">
                    <span className="nav-icon">👥</span>
                    Üye Yönetimi
                </NavLink>
                <NavLink to="/trainers" className="nav-item">
                    <span className="nav-icon">👥</span>
                    Eğitmenler
                </NavLink>

                <NavLink to="/packages" className="nav-item">
                    <span className="nav-icon">📦</span>
                    Üyelik Paketleri
                </NavLink>
                <NavLink to="/announcements" className="nav-item">
                    <span className="nav-icon">📢</span>
                    Duyurular & Bildirim
                </NavLink>

                <NavLink to="/reports" className="nav-item">
                    <span className="nav-icon">📊</span>
                    Raporlama & Loglar
                </NavLink>

                <NavLink to="/settings" className="nav-item">
                    <span className="nav-icon">⚙️</span>
                    Salon Ayarları
                </NavLink>

            </nav>
        </aside>
    );
};

export default Sidebar;
