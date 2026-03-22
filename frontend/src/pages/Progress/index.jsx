import React, { useState } from 'react';
import { TrendingUp, Flame, Trophy, BarChart2 } from 'lucide-react';
import StreakTab from './Streak';
import AchievementsTab from './Achievements';

const tabs = [
  { key: 'stats',        label: 'Stats',        icon: <TrendingUp size={18} /> },
  { key: 'streak',       label: 'Streak',       icon: <Flame size={18} />      },
  { key: 'achievements', label: 'Achievements', icon: <Trophy size={18} />     },
];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <BarChart2 size={90} className="text-[#333] mb-8" strokeWidth={1.5} />
    <h2 className="text-[28px] font-bold text-[#555] mb-4">No Progress Yet</h2>
    <p className="text-[#444] text-[17px] leading-8 max-w-md">
      Start practicing to see your statistics here. Complete training sessions to track your progress and character mastery.
    </p>
  </div>
);

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Top Tab Bar */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex-1 flex items-center justify-center gap-2.5 py-5 text-[17px] font-semibold transition-all relative
                ${isActive ? 'text-white' : 'text-[#555] hover:text-[#999]'}
              `}
            >
              <span className={isActive ? 'text-white' : 'text-[#555]'}>{tab.icon}</span>
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="px-8 py-10 flex-1">

        {/* Title — ẩn khi đang ở tab Streak */}
         {activeTab === 'stats' && (
          <div className="mb-6">
            <h1 className="text-[36px] font-bold tracking-tight">Your Progress</h1>
            <p className="text-[#555] text-[17px] mt-1">Track your Japanese learning journey</p>
          </div>
        )}

        {activeTab === 'stats'        && <EmptyState />}
        {activeTab === 'streak'       && <StreakTab />}
        {activeTab === 'achievements' && <AchievementsTab />}

      </div>
    </div>
  );
}
