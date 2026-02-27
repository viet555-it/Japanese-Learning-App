import React from "react";
import ModeCard from "../../components/common/ModeCard";
import bgImage from "../../assets/images/kanji-bg.png";

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="bg-black/70 w-full h-full absolute top-0 left-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl text-white">

        {/* Hero Section */}
        <div className="bg-black/80 p-10 rounded-lg mb-10">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to KanjiDo!
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            KanaDojo is an aesthetic, community-made platform for learning
            Japanese inspired by Duolingo and Monkeytype.  
            To begin, pick a dojo below and start training now!
          </p>
        </div>

        {/* Mode Section */}
        <div className="flex justify-center items-center 
                bg-black/80 rounded-lg 
                divide-x divide-white/20">
          <ModeCard japanese="あ" title="Kana" path="/kana" />
            <ModeCard japanese="語" title="Vocab" path="/vocab" />
            <ModeCard japanese="漢字" title="Kanji" path="/kanji" />
        </div>

      </div>
    </div>
  );
};

export default HomePage;