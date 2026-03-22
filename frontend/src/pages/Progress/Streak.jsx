import React, { useState } from 'react';
import { Flame, Trophy, Calendar, CalendarDays, CalendarRange } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Today info
const today = new Date(); // March 22, 2026 — Sunday
const todayYear  = today.getFullYear(); // 2026
const todayMonth = today.getMonth();    // 2 = March
const todayDay   = today.getDate();     // 22

// Active dates for demo: today only
// Returns true if this cell is "active" (practiced)
const isActiveWeek = (dayIdx) => dayIdx === 6; // Sunday active

// Month view: build weeks of current month
function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert Sunday=0 to Mon=0 offset
  const offset = (firstDay + 6) % 7;
  const weeks = [];
  let day = 1 - offset;
  while (day <= daysInMonth) {
    const week = [];
    for (let d = 0; d < 7; d++, day++) {
      week.push(day >= 1 && day <= daysInMonth ? day : null);
    }
    weeks.push(week);
  }
  return weeks;
}

// Year view: 4 weeks per month column × 7 days rows
function buildYearGrid(year) {
  // For each month, just show 4 weeks (28 cells)
  return MONTHS.map((m, mi) => {
    const daysInMonth = new Date(year, mi + 1, 0).getDate();
    // active: today's month + day
    const cells = Array.from({ length: 28 }, (_, i) => {
      const d = i + 1;
      return {
        exists: d <= daysInMonth,
        active: mi === todayMonth && d === todayDay && year === todayYear,
      };
    });
    return { month: m, cells };
  });
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, icon, value, unit, sub }) => (
  <div className="flex-1 bg-[#141414] rounded-2xl border border-white/5 p-6">
    <div className="flex items-center justify-between mb-5">
      <span className="text-[15px] text-[#888] font-medium">{label}</span>
      <span className="text-[#888]">{icon}</span>
    </div>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-[48px] font-bold text-white leading-none">{value}</span>
      <span className="text-[22px] text-[#888] font-medium">{unit}</span>
    </div>
    <p className="text-[#555] text-[15px]">{sub}</p>
  </div>
);

// ── Cell ──────────────────────────────────────────────────────────────────────
const Cell = ({ active, faded }) => (
  <div className={`w-6 h-6 rounded-md border ${
    active
      ? 'bg-white/30 border-white/50'
      : faded
      ? 'bg-transparent border-transparent'
      : 'bg-[#1e1e1e] border-white/5'
  }`} />
);

// ── Week View ─────────────────────────────────────────────────────────────────
const WeekView = () => (
  <div className="px-8 py-6">
    <div className="flex justify-center gap-5">
      {DAYS.map((d, i) => (
        <div key={d} className="flex flex-col items-center gap-3">
          <span className="text-[14px] text-[#555] font-medium">{d}</span>
          <div className={`w-10 h-10 rounded-lg border ${
            isActiveWeek(i) ? 'bg-white/20 border-white/40' : 'bg-[#1e1e1e] border-white/5'
          }`} />
        </div>
      ))}
    </div>
  </div>
);

// ── Month View ────────────────────────────────────────────────────────────────
const MonthView = () => {
  const weeks = buildMonthGrid(todayYear, todayMonth);
  const monthName = new Date(todayYear, todayMonth).toLocaleString('en', { month: 'long' });

  return (
    <div className="px-8 py-6">
      <p className="text-[20px] font-bold text-white mb-5">{monthName}</p>
      <div className="flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col gap-2 mr-2">
          {DAYS.map(d => (
            <span key={d} className="text-[13px] text-[#555] font-medium w-8 text-right leading-6">{d}</span>
          ))}
        </div>
        {/* Weeks columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-2">
            {DAYS.map((_, di) => {
              const day = week[di];
              const active = day === todayDay;
              return (
                <div key={di} className={`w-6 h-6 rounded-md border ${
                  !day
                    ? 'border-transparent bg-transparent'
                    : active
                    ? 'bg-white/30 border-white/50'
                    : 'bg-[#1e1e1e] border-white/5'
                }`} />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Year View ─────────────────────────────────────────────────────────────────
const YearView = () => {
  const grid = buildYearGrid(todayYear);

  return (
    <div className="px-6 py-6 overflow-x-auto">
      <p className="text-[20px] font-bold text-white mb-5">{todayYear}</p>
      <div className="flex gap-1 min-w-max">
        {/* Day labels */}
        <div className="flex flex-col gap-1.5 mr-2 mt-7">
          {DAYS.map(d => (
            <span key={d} className="text-[12px] text-[#555] font-medium w-7 text-right leading-5">{d}</span>
          ))}
        </div>
        {/* Month columns */}
        {grid.map(({ month, cells }) => (
          <div key={month} className="flex flex-col">
            <span className="text-[12px] text-[#555] font-medium mb-2 text-center">{month}</span>
            {/* 7 rows (days) × 4 weeks */}
            <div className="flex gap-1">
              {/* Split 28 cells into 4 columns of 7 */}
              {[0, 1, 2, 3].map(week => (
                <div key={week} className="flex flex-col gap-1.5">
                  {DAYS.map((_, di) => {
                    const cellIdx = week * 7 + di;
                    const cell = cells[cellIdx];
                    return (
                      <div key={di} className={`w-5 h-5 rounded-sm border ${
                        !cell?.exists
                          ? 'border-transparent bg-transparent'
                          : cell?.active
                          ? 'bg-white/30 border-white/50'
                          : 'bg-[#1e1e1e] border-white/5'
                      }`} />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main StreakTab ─────────────────────────────────────────────────────────────
export default function StreakTab() {
  const [calView, setCalView] = useState('week');

  return (
    <div className="space-y-5">
      <h2 className="text-[32px] font-bold text-white">Visit Streak</h2>

      {/* 3 stat cards */}
      <div className="flex gap-4">
        <StatCard label="Current Streak" icon={<Flame size={20} />}    value={1} unit="day" sub="Keep it going!"         />
        <StatCard label="Longest Streak" icon={<Trophy size={20} />}   value={1} unit="day" sub="You're at your best!"   />
        <StatCard label="Total Visits"   icon={<Calendar size={20} />} value={1} unit="day" sub="Days you've practiced"  />
      </div>

      {/* Calendar */}
      <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
        {/* Week / Month / Year tabs */}
        <div className="flex border-b border-white/5">
          {[
            { key: 'week',  label: 'Week',  icon: <Calendar size={16} />      },
            { key: 'month', label: 'Month', icon: <CalendarDays size={16} />  },
            { key: 'year',  label: 'Year',  icon: <CalendarRange size={16} /> },
          ].map(v => (
            <button
              key={v.key}
              onClick={() => setCalView(v.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-[16px] font-semibold transition-all relative
                ${calView === v.key ? 'text-white' : 'text-[#555] hover:text-[#999]'}`}
            >
              {v.icon}{v.label}
              {calView === v.key && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />}
            </button>
          ))}
        </div>

        {calView === 'week'  && <WeekView />}
        {calView === 'month' && <MonthView />}
        {calView === 'year'  && <YearView />}
      </div>

      {/* How it works */}
      <div className="bg-[#141414] rounded-2xl border border-white/5 px-7 py-6 space-y-3">
        <h3 className="text-[18px] font-bold text-white">How Streak Tracking Works</h3>
        <ul className="space-y-2 text-[#888] text-[16px]">
          <li>• Your visits are automatically tracked when you use GoJapan</li>
          <li>• Each day you visit counts toward your streak</li>
          <li>• Keep your streak going by visiting daily!</li>
        </ul>
      </div>
    </div>
  );
}
