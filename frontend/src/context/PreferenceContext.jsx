import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferenceContext = createContext();

export const usePreferences = () => {
  return useContext(PreferenceContext);
};

export const PreferenceProvider = ({ children }) => {
  // Load initial preferences from local storage or use defaults
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('app_preferences');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      background: 'none', // URL or 'none'
      theme: 'dark', // 'light', 'dark', 'sapphire-bloom', etc.
      fontFamily: 'font-sans', // Tailwind class name or generic
      cursorTrail: 'none', // 'none', 'sakura', 'lantern', etc.
      clickEffect: 'none', // 'none', 'bamboo', 'firework', etc.
      soundTheme: 'none', // BGM loops
      // New Behavior Variables
      readingDisplay: 'romaji', // 'romaji', 'kana'
      showFurigana: 'on', // 'on', 'off'
      playUISound: 'on', // 'on', 'off'
      playPronunciation: 'on', // 'on', 'off'
    };
  });

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('app_preferences', JSON.stringify(preferences));
    
    // Apply Font
    document.documentElement.className = '';
    document.documentElement.classList.add(preferences.theme);
    document.documentElement.classList.add(preferences.fontFamily);
    if (preferences.background !== 'none') {
      document.documentElement.classList.add('has-custom-bg');
    }
    
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <PreferenceContext.Provider value={{ preferences, updatePreference }}>
      <div 
        className="w-full min-h-screen transition-all duration-500 ease-out"
        style={{
          backgroundImage: preferences.background !== 'none' ? `url(${preferences.background})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className={`global-bg-overlay ${preferences.background !== 'none' ? "w-full min-h-screen bg-black/20" : "w-full min-h-screen"}`} style={{ backgroundColor: preferences.background === 'none' ? 'var(--bg-color)' : '' }}>
           {children}
        </div>
      </div>
    </PreferenceContext.Provider>
  );
};
