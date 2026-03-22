import React, { useState, useEffect } from 'react';
import { ChevronUp, MousePointer2 } from 'lucide-react';

const units = [
  { id: 1, badge: 'N5', label: 'Unit 1', levels: 'Levels 1-69'    },
  { id: 2, badge: 'N4', label: 'Unit 2', levels: 'Levels 70-133'  },
  { id: 3, badge: 'N3', label: 'Unit 3', levels: 'Levels 134-306' },
  { id: 4, badge: 'N2', label: 'Unit 4', levels: 'Levels 307-488' },
  { id: 5, badge: 'N1', label: 'Unit 5', levels: 'Levels 489-831' },
];

const sampleLevels = [
  {
    level: 1,
    words: [
      { word: '会う',     romaji: 'au',       meaning: 'to meet'     },
      { word: '青',       romaji: 'ao',       meaning: 'blue (noun)' },
      { word: '青い',     romaji: 'aoi',      meaning: 'blue (adj.)' },
    ],
  },
  {
    level: 2,
    words: [
      { word: '朝',       romaji: 'asa',      meaning: 'morning'            },
      { word: '朝ごはん', romaji: 'asagohan', meaning: 'breakfast'          },
      { word: '明後日',   romaji: 'asatte',   meaning: 'day after tomorrow' },
    ],
  },
];

// ── WordCard — same style as KanjiPage ───────────────────────────────────────
const WordCard = ({ word, romaji, meaning }) => (
  <div className="py-8 border-b border-white/10 last:border-b-0 cursor-pointer hover:bg-white/[0.02] transition-colors">
    {/* Word big */}
    <div className="text-[52px] font-bold text-white leading-tight mb-4">{word}</div>

    {/* Romaji — full width bar like kanji readings */}
    <div className="flex gap-2 mb-4">
      <div className="flex-1 bg-[#252525] border border-white/5 rounded-lg flex items-center justify-center py-3">
        <span className="text-[18px] text-white font-semibold">{romaji}</span>
      </div>
    </div>

    {/* Meaning */}
    <div className="text-[#6a9fc0] text-[22px] font-semibold leading-relaxed">{meaning}</div>
  </div>
);

// ── LevelColumn ───────────────────────────────────────────────────────────────
const LevelColumn = ({ level, words }) => (
  <div className="bg-[#141414] rounded-xl border border-white/5 flex-1 min-w-0 overflow-hidden">
    <div className="flex items-center justify-center gap-3 px-6 py-5 border-b border-white/5 bg-[#181818]">
      <div className="w-5 h-5 rounded-full border-2 border-white/20 shrink-0" />
      <span className="text-[19px] font-bold text-white">Level {level}</span>
    </div>
    <div className="px-8">
      {words.length === 0
        ? <div className="py-12 text-center text-[#444] text-[16px]">No words</div>
        : words.map((w, i) => <WordCard key={i} {...w} />)
      }
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export default function VocabularyPage() {
  const [activeUnit, setActiveUnit] = useState(1);
  const [levels, setLevels]         = useState(sampleLevels);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  useEffect(() => {
    // TODO: uncomment khi có API
    // setLoading(true);
    // setError(null);
    // fetch(`/api/vocabulary?unit=${activeUnit}`)
    //   .then(res => { if (!res.ok) throw new Error(); return res.json(); })
    //   .then(data => setLevels(data))
    //   .catch(() => setError('Không thể tải dữ liệu. Vui lòng thử lại.'))
    //   .finally(() => setLoading(false));
  }, [activeUnit]);

  const activeUnitData = units.find(u => u.id === activeUnit);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-8 py-8 space-y-5">

        {/* Title */}
        <div className="flex items-center gap-3">
          <span className="text-[36px]">語</span>
          <h1 className="text-[36px] font-bold tracking-tight">Vocabulary</h1>
        </div>

        {/* Welcome Banner */}
        <div className="bg-[#141414] rounded-xl border border-white/5 px-7 py-6">
          <h2 className="text-[20px] font-bold text-white mb-4 flex items-center gap-2">
            <ChevronUp size={20} className="text-gray-400 shrink-0" />
            Welcome to the vocabulary GoJapan!
          </h2>
          <div className="text-[#b0b0b0] text-[17px] leading-8 pl-8 space-y-2">
            <p>This is the place where you can learn and practice the most common words used in day-to-day Japanese.</p>
            <p>To begin, select at least 1 level, select your training mode, then hit Go! below and start training!</p>
            <p className="font-bold text-white mt-1">
              New: click on a word to find out more about it on{' '}
              <span className="underline cursor-pointer hover:opacity-70 transition-opacity">Jisho</span>!
            </p>
          </div>
        </div>

        {/* Unit Tabs */}
        <div className="bg-[#141414] rounded-xl border border-white/5 p-2 flex">
          {units.map((unit) => {
            const isActive = activeUnit === unit.id;
            return (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit.id)}
                className={`
                  flex-1 flex flex-col items-center py-4 rounded-lg transition-all
                  ${isActive ? 'bg-white text-black' : 'text-[#777] hover:text-white hover:bg-white/5'}
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[17px] font-bold">{unit.label}</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-[#888]'
                  }`}>{unit.badge}</span>
                </div>
                <span className={`text-[13px] ${isActive ? 'text-black/50' : 'text-[#444]'}`}>
                  {unit.levels}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tip */}
        <div className="bg-[#141414] rounded-xl border border-white/5 px-6 py-4 text-[15px] text-[#888] leading-relaxed">
          <span className="font-bold text-white">Tip:</span> Complete some practice sessions to unlock the 'Hide Mastered Sets' filter. Sets become mastered when you achieve 90%+ accuracy with 10+ attempts per word.
        </div>

        {/* Quick Select */}
        <button className="w-full flex items-center justify-center gap-3 py-5 rounded-xl bg-white text-black text-[18px] font-bold hover:bg-gray-100 active:scale-[0.99] transition-all">
          <MousePointer2 size={19} className="fill-black" />
          Quick Select
        </button>

        {/* Levels — 2 columns */}
        <div className="bg-[#0e0e0e] rounded-xl border border-white/5 p-6">
          <div className="flex items-center gap-2 mb-5">
            <ChevronUp size={16} className="text-gray-400 shrink-0" />
            <span className="text-[18px] font-bold text-white">{activeUnitData?.levels}</span>
          </div>

          {loading && <div className="py-16 text-center text-[#555] text-[16px]">Loading...</div>}
          {error   && <div className="py-16 text-center text-red-400 text-[16px]">{error}</div>}

          {!loading && !error && (
            <div className="flex gap-5">
              {levels.length > 0
                ? levels.slice(0, 2).map(lvl => (
                    <LevelColumn key={lvl.level} level={lvl.level} words={lvl.words} />
                  ))
                : <>
                    <LevelColumn level={activeUnit * 2 - 1} words={[]} />
                    <LevelColumn level={activeUnit * 2}     words={[]} />
                  </>
              }
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
