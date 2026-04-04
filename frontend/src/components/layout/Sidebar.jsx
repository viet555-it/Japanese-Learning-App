import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Star, Settings } from "lucide-react";
import logo from "../../assets/images/logo.png";

const navItems = [
  { name: "Home",       path: "/",         icon: <Home size={24} strokeWidth={1.5} /> },
  { name: "Progess",    path: "/progress", icon: <Star size={24} strokeWidth={1.5} /> },
  { name: "Kana",       path: "/kana",     icon: <span className="text-[22px] leading-none">あ</span> },
  { name: "Vocabulary", path: "/vocab",    icon: <span className="text-[22px] leading-none">語</span> },
  { name: "Kanji",      path: "/kanji",    icon: <span className="text-[22px] leading-none">字</span> },
  { name: "Preferences",path: "/preferences",icon: <Settings size={24} strokeWidth={1.5} /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[280px] h-screen theme-container text-white flex flex-col pt-7 px-5 border-r border-white/10 shrink-0 backdrop-blur-xl">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-4 mb-6 pl-1 hover:opacity-80 transition-opacity">
        <img
          src={logo}
          alt="GoJapan logo"
          className="w-[56px] h-[56px] rounded-full object-cover shrink-0"
        />
        <span className="text-[28px] font-bold tracking-wide text-white leading-tight">GoJapan</span>
      </Link>


      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-4 px-4 py-4 rounded-[1.25rem] transition-all duration-300
              `}
              style={{
                backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                color: isActive ? 'var(--bg-color)' : 'var(--text-color)',
                opacity: isActive ? 1 : 0.6,
                fontWeight: isActive ? 800 : 500,
                transform: isActive ? 'scale(1)' : 'scale(0.98)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                   e.currentTarget.style.opacity = 1;
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                   e.currentTarget.style.opacity = 0.6;
                   e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="w-7 flex items-center justify-center shrink-0 drop-shadow-sm">
                {item.icon}
              </div>
              <span className="text-[20px] tracking-wide mb-[1px]">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
};

export default Sidebar;
