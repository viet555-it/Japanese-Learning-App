import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MousePointer2 } from 'lucide-react';

const GroupCard = ({ title, items, selected, onSelect }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-[#141414] rounded-xl border border-white/5 flex-1 min-w-0">
      <div
        className="flex items-center gap-3 cursor-pointer px-7 py-6 border-b border-white/5"
        onClick={() => setOpen(!open)}
      >
        {open
          ? <ChevronUp size={20} className="text-gray-400 shrink-0" />
          : <ChevronDown size={20} className="text-gray-400 shrink-0" />
        }
        <span className="text-[20px] font-bold text-white">{title}</span>
      </div>

      {open && (
        <div className="px-7">
          {items.map((item, i) => {
            const isSelected = selected === item.value;
            return (
              <div
                key={item.value}
                onClick={() => onSelect(item.value)}
                className={`
                  flex items-center gap-4 py-6 cursor-pointer transition-colors
                  ${i < items.length - 1 ? 'border-b border-white/5' : ''}
                  ${isSelected ? 'text-white' : 'text-[#888] hover:text-white'}
                `}
              >
                <ChevronDown size={18} className={isSelected ? 'text-white shrink-0' : 'text-[#555] shrink-0'} />
                <span className="text-[20px] font-semibold">{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function KanaPage() {
  const [subset, setSubset] = useState('hiragana-base');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-8 py-8 space-y-5">

        {/* Title */}
        <div className="flex items-center gap-3">
          <span className="text-[36px]">あ</span>
          <h1 className="text-[36px] font-bold tracking-tight">Kana</h1>
        </div>

        {/* Welcome Banner */}
        <div className="bg-[#141414] rounded-xl border border-white/5 px-7 py-6">
          <h2 className="text-[20px] font-bold text-white mb-4 flex items-center gap-2">
            <ChevronUp size={20} className="text-gray-400 shrink-0" />
            Welcome to the Kana(hiragana and katakana)!
          </h2>
          <div className="text-[#b0b0b0] text-[17px] leading-8 pl-8 space-y-2">
            <p>This is the place where you can learn and practice the two core syllabaries of Japanese - Hiragana and Katakana.</p>
            <p>To begin, select at leat 1 set of characters, sellect or change the tranning mode, then hit Go! below and start training now!</p>
          </div>
        </div>

        {/* Select All Button */}
        <button
          onClick={() => setSubset('all')}
          className="w-full flex items-center justify-center gap-3 py-5 rounded-xl bg-white text-black text-[18px] font-bold hover:bg-gray-100 active:scale-[0.99] transition-all"
        >
          <MousePointer2 size={19} className="fill-black" />
          Select All Kana
        </button>

        {/* Grid */}
        <div className="flex gap-5">
          <GroupCard
            title="Hiragana ひらがな"
            selected={subset}
            onSelect={setSubset}
            items={[
              { label: 'Base',   value: 'hiragana-base'   },
              { label: 'Dakuon', value: 'hiragana-dakuon' },
              { label: 'Yoon',   value: 'hiragana-yoon'   },
            ]}
          />
          <GroupCard
            title="Katakana カタカナ"
            selected={subset}
            onSelect={setSubset}
            items={[
              { label: 'Base',          value: 'katakana-base'    },
              { label: 'Dakuon',        value: 'katakana-dakuon'  },
              { label: 'Yoon',          value: 'katakana-yoon'    },
              { label: 'Foreign sound', value: 'katakana-foreign' },
            ]}
          />
        </div>

      </div>
    </div>
  );
}
