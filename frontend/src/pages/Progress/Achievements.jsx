import React, { useState } from 'react';
import { Trophy, Lock, Star, Flame, BookOpen, AlignJustify, Zap, Target, Crown, Compass, Sparkles, RefreshCw } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────
const categories = [
  { key: 'all',         label: 'All',         icon: <Trophy size={14} />,     count: 93, unlocked: 1  },
  { key: 'kana',        label: 'Kana',        icon: <span className="text-[13px]">あ</span>, count: 8,  unlocked: 0  },
  { key: 'kanji',       label: 'Kanji',       icon: <span className="text-[13px]">字</span>, count: 10, unlocked: 0  },
  { key: 'vocabulary',  label: 'Vocabulary',  icon: <span className="text-[13px]">語</span>, count: 6,  unlocked: 0  },
  { key: 'gauntlet',    label: 'Gauntlet',    icon: <Zap size={14} />,        count: 10, unlocked: 0  },
  { key: 'blitz',       label: 'Blitz',       icon: <Target size={14} />,     count: 8,  unlocked: 0  },
  { key: 'milestones',  label: 'Milestones',  icon: <Star size={14} />,       count: 11, unlocked: 0  },
  { key: 'streaks',     label: 'Streaks',     icon: <Flame size={14} />,      count: 9,  unlocked: 0  },
  { key: 'speed',       label: 'Speed',       icon: <Zap size={14} />,        count: 5,  unlocked: 0  },
  { key: 'consistency', label: 'Consistency', icon: <Target size={14} />,     count: 6,  unlocked: 0  },
  { key: 'mastery',     label: 'Mastery',     icon: <Crown size={14} />,      count: 3,  unlocked: 0  },
  { key: 'exploration', label: 'Exploration', icon: <Compass size={14} />,    count: 7,  unlocked: 0  },
  { key: 'fun',         label: 'Fun & Secret',icon: <Sparkles size={14} />,   count: 10, unlocked: 1  },
];

const rarityColors = {
  Common:    'text-[#aaa]  bg-[#2a2a2a]',
  Uncommon:  'text-[#6ab]  bg-[#1a2a2a]',
  Rare:      'text-[#6af]  bg-[#1a2040]',
  Epic:      'text-[#a6f]  bg-[#2a1a40]',
  Legendary: 'text-[#fa6]  bg-[#3a2a10]',
};

const rarityIcons = {
  Common:    <Star size={11} />,
  Uncommon:  <Star size={11} />,
  Rare:      <Trophy size={11} />,
  Epic:      <Trophy size={11} />,
  Legendary: <Crown size={11} />,
};

const achievements = [
  { id: 1,  title: 'First Steps',          desc: 'Get your first correct answer',      rarity: 'Common',    xp: 10,   progress: 0,  total: 1,    unlocked: false, category: 'milestones' },
  { id: 2,  title: 'Streak Starter',       desc: 'Achieve a 5-answer streak',          rarity: 'Common',    xp: 25,   progress: 0,  total: 5,    unlocked: false, category: 'streaks'    },
  { id: 3,  title: 'Hot Streak',           desc: 'Achieve a 10-answer streak',         rarity: 'Uncommon',  xp: 50,   progress: 0,  total: 10,   unlocked: false, category: 'streaks'    },
  { id: 4,  title: 'Streak Legend',        desc: 'Achieve a 25-answer streak',         rarity: 'Rare',      xp: 150,  progress: 0,  total: 25,   unlocked: false, category: 'streaks'    },
  { id: 5,  title: 'Unstoppable',          desc: 'Achieve a 50-answer streak',         rarity: 'Epic',      xp: 300,  progress: 0,  total: 50,   unlocked: false, category: 'streaks'    },
  { id: 6,  title: 'Century Scholar',      desc: 'Answer 100 questions correctly',     rarity: 'Uncommon',  xp: 100,  progress: 0,  total: 100,  unlocked: false, category: 'milestones' },
  { id: 7,  title: 'Knowledge Seeker',     desc: 'Answer 500 questions correctly',     rarity: 'Rare',      xp: 250,  progress: 0,  total: 500,  unlocked: false, category: 'milestones' },
  { id: 8,  title: 'Master Scholar',       desc: 'Answer 1000 questions correctly',    rarity: 'Epic',      xp: 500,  progress: 0,  total: 1000, unlocked: false, category: 'milestones' },
  { id: 9,  title: 'Legendary Master',     desc: 'Answer 5000 questions correctly',    rarity: 'Legendary', xp: 1000, progress: 0,  total: 5000, unlocked: false, category: 'milestones' },
  { id: 10, title: 'Achievement Collector',desc: 'Unlock 25 achievements',             rarity: 'Rare',      xp: 250,  progress: 1,  total: 25,   unlocked: false, category: 'fun'        },
  { id: 11, title: 'Achievement Enthusiast',desc: 'Unlock 50 achievements',            rarity: 'Epic',      xp: 500,  progress: 1,  total: 50,   unlocked: false, category: 'fun'        },
  { id: 12, title: 'Completionist',        desc: 'Unlock all achievements',            rarity: 'Legendary', xp: 2000, progress: 1,  total: 92,   unlocked: false, category: 'fun'        },
];

// ── Achievement Card ──────────────────────────────────────────────────────────
const AchievementCard = ({ title, desc, rarity, xp, progress, total, unlocked }) => {
  const pct = Math.min((progress / total) * 100, 100);
  const rarityStyle = rarityColors[rarity] || rarityColors.Common;

  return (
    <div className="bg-[#141414] rounded-xl border border-white/5 p-5 flex flex-col gap-3">
      {/* Rarity badge */}
      <div className="flex justify-end">
        <span className={`flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full ${rarityStyle}`}>
          {rarityIcons[rarity]} {rarity}
        </span>
      </div>

      {/* Icon + title */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center border border-white/8 shrink-0">
          <Lock size={20} className="text-[#555]" />
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-white leading-tight">{title}</h3>
          <p className="text-[#666] text-[14px] mt-1 leading-snug">{desc}</p>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[13px] text-[#555]">Progress</span>
          <span className="text-[13px] font-semibold text-[#777]">{progress}/{total}</span>
        </div>
        <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
          <div className="h-full bg-white/30 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* XP + status */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[#666] text-[13px]">
          <Trophy size={13} />
          <span className="font-semibold">{xp} XP</span>
        </div>
        <span className="text-[13px] text-[#444] font-medium">Locked</span>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AchievementsTab() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === activeCategory);

  const totalUnlocked = achievements.filter(a => a.unlocked).length;
  const totalXP = 75;
  const level = 1;
  const overallPct = Math.round((totalUnlocked / achievements.length) * 100) || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Trophy size={36} className="text-yellow-500" />
          <h2 className="text-[36px] font-bold text-white">Achievements</h2>
        </div>
        <p className="text-[#666] text-[16px]">Track your Japanese learning journey and celebrate your milestones</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-[#141414] rounded-xl border border-white/5 px-7 py-5">
        <div className="flex justify-between mb-2">
          <span className="text-[16px] font-semibold text-white">Overall Progress</span>
          <span className="text-[16px] font-bold text-white">{overallPct}%</span>
        </div>
        <div className="w-full h-3 bg-[#222] rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full" style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      {/* 4 stat cards */}
      <div className="flex gap-4">
        {[
          { value: totalUnlocked, label: 'Unlocked' },
          { value: achievements.length, label: 'Total' },
          { value: totalXP, label: 'XP' },
          { value: level, label: 'Level' },
        ].map(s => (
          <div key={s.label} className="flex-1 bg-[#141414] rounded-xl border border-white/5 py-6 flex flex-col items-center gap-1">
            <span className="text-[36px] font-bold text-white">{s.value}</span>
            <span className="text-[14px] text-[#666]">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold transition-all border
                ${isActive
                  ? 'bg-white text-black border-white'
                  : 'bg-[#141414] text-[#888] border-white/5 hover:text-white hover:border-white/20'
                }`}
            >
              {cat.icon} {cat.label}
              <span className={`text-[12px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-[#666]'
              }`}>{cat.unlocked}/{cat.count}</span>
            </button>
          );
        })}
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(a => <AchievementCard key={a.id} {...a} />)}
      </div>

      {/* Achievement Management */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-6">
        <div className="flex items-center gap-2 mb-2">
          <RefreshCw size={18} className="text-white" />
          <h3 className="text-[18px] font-bold text-white">Achievement Management</h3>
        </div>
        <p className="text-[#666] text-[15px] mb-4">Check for any missed achievements based on your current progress.</p>
        <div className="bg-[#1a1a1a] rounded-xl border border-white/5 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[16px] font-semibold text-white">Recalculate Achievements</p>
            <p className="text-[#555] text-[14px]">Scan your progress and unlock any achievements you may have earned</p>
          </div>
          <button className="flex items-center gap-2 bg-[#222] border border-white/10 text-white px-5 py-2.5 rounded-xl text-[15px] font-semibold hover:bg-[#2a2a2a] transition-all">
            <RefreshCw size={15} /> Recalculate
          </button>
        </div>
      </div>
    </div>
  );
}
