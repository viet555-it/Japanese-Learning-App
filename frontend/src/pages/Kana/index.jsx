import KanaCard from "../../components/kana/KanaCard";

const Kana = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-light">あ Kana</h1>

      {/* Welcome Box */}
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 
                      rounded-xl p-6 text-white/80">
        <h2 className="text-lg mb-3 text-white">
          Welcome to the Kana (hiragana and katakana)!
        </h2>
        <p>
          This is the place where you can learn and practice...
        </p>
      </div>

      {/* Select All */}
      <button className="w-full bg-zinc-200 text-black 
                         py-4 rounded-xl 
                         hover:bg-white transition">
        Select All Kana
      </button>

      {/* Kana Cards */}
      <div className="grid grid-cols-2 gap-8">
        <KanaCard title="Hiragana ひらがな" />
        <KanaCard title="Katakana カタカナ" />
      </div>
    </div>
  );
};

export default Kana;