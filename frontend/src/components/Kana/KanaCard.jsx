const KanaCard = ({ title }) => {
  const sections = ["Base", "Dakuon", "Yoon", "Foreign sound"];

  return (
    <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 
                    rounded-xl p-6 space-y-4">
      <h3 className="text-xl">{title}</h3>

      {sections.map((item, index) => (
        <div
          key={index}
          className="border-t border-white/10 py-3 cursor-pointer
                     hover:text-white transition"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default KanaCard;