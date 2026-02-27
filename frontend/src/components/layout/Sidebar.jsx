import { Home, Star, BookOpen, Languages } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-60 border-r border-white/10 p-6 space-y-8">
      <div className="text-lg font-semibold">Name</div>

      <nav className="space-y-4 text-white/80">
        <div className="flex items-center gap-3 hover:text-white cursor-pointer">
          <Home size={18} /> Home
        </div>

        <div className="flex items-center gap-3 hover:text-white cursor-pointer">
          <Star size={18} /> Progress
        </div>

        <div className="pt-6 space-y-4">
          <div className="flex items-center gap-3 hover:text-white cursor-pointer">
            <BookOpen size={18} /> Vocabulary
          </div>

          <div className="flex items-center gap-3 hover:text-white cursor-pointer">
            <Languages size={18} /> Kanji
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;