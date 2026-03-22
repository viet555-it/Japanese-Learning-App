import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Star } from "lucide-react";
import logo from "../../assets/images/logo.png";

const navItems = [
  { name: "Home",       path: "/",         icon: <Home size={24} strokeWidth={1.5} /> },
  { name: "Progess",    path: "/progress", icon: <Star size={24} strokeWidth={1.5} /> },
  { name: "Kana",       path: "/kana",     icon: <span className="text-[22px] leading-none">あ</span> },
  { name: "Vocabulary", path: "/vocab",    icon: <span className="text-[22px] leading-none">語</span> },
  { name: "Kanji",      path: "/kanji",    icon: <span className="text-[22px] leading-none">字</span> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[280px] h-screen bg-black text-white flex flex-col pt-7 px-5 border-r border-white/15 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-4 mb-6 pl-1">
        <img
          src={logo}
          alt="GoJapan logo"
          className="w-[56px] h-[56px] rounded-full object-cover shrink-0"
        />
        <span className="text-[28px] font-bold tracking-wide text-white leading-tight">GoJapan</span>
      </div>


      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-4 px-4 py-4 rounded-xl transition-all
                ${isActive
                  ? "bg-white text-black"
                  : "text-[#999] hover:text-white hover:bg-white/5"
                }
              `}
            >
              <div className={`w-7 flex items-center justify-center shrink-0 ${isActive ? "text-black" : "text-[#999]"}`}>
                {item.icon}
              </div>
              <span className={`text-[20px] font-semibold ${isActive ? "text-black" : "text-[#ccc]"}`}>
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
