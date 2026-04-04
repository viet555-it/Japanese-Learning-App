import React, { useEffect, useRef } from 'react';
import { usePreferences } from '../../context/PreferenceContext';

// Background chill music streams (public domain / royalty free CDNs)
const BGM_TRACKS = {
  study_lofi: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
  tokyo_night: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3',
  zen_garden: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b3bb10bc.mp3'
};

const stickers = {
  sakura: '🌸',
  bamboo: '🎋',
  lantern: '🏮',
  sushi: '🍣',
  onigiri: '🍙',
  sparkles: '✨',
  moon: '🌙',
  leaf: '🍃'
};

// Singleton Audio instance for BGM
let globalBgmAudio = null;
if (typeof window !== 'undefined') {
  globalBgmAudio = new Audio();
  globalBgmAudio.loop = true;
  globalBgmAudio.volume = 0.3; // Chill volume
}

export default function GlobalEffects() {
  const { preferences } = usePreferences();
  
  // BGM Manager
  useEffect(() => {
    if (!globalBgmAudio) return;

    if (preferences.soundTheme !== 'none' && BGM_TRACKS[preferences.soundTheme]) {
      // Only change track if it's different to avoid restarting music
      if (globalBgmAudio.src !== BGM_TRACKS[preferences.soundTheme]) {
        globalBgmAudio.src = BGM_TRACKS[preferences.soundTheme];
        
        // Browsers block autoplay. We attempt to play, and if blocked,
        // we add a one-time click listener to unlock audio naturally.
        globalBgmAudio.play().catch(e => {
           const unlockAudio = () => {
             globalBgmAudio.play().catch(console.error);
             document.removeEventListener('click', unlockAudio);
           };
           document.addEventListener('click', unlockAudio);
        });
      } else {
        // Same track, make sure it's playing
        globalBgmAudio.play().catch(()=>{});
      }
    } else {
      globalBgmAudio.pause();
      globalBgmAudio.src = "";
    }
  }, [preferences.soundTheme]);

  // Visual Effects Manager
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (preferences.cursorTrail === 'none') return;
      const cursorSymbol = stickers[preferences.cursorTrail] || '✨';
      createTrailParticle(e.clientX, e.clientY, cursorSymbol);
    };

    const handleGlobalClick = (e) => {
      if (preferences.clickEffect !== 'none') {
        const effectSymbol = stickers[preferences.clickEffect] || '💥';
        spawnBurst(e.clientX, e.clientY, effectSymbol);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleGlobalClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [preferences.cursorTrail, preferences.clickEffect]);

  const createTrailParticle = (x, y, symbol) => {
    const el = document.createElement('div');
    el.textContent = symbol;
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.pointerEvents = 'none';
    el.style.fontSize = '12px';
    el.style.zIndex = '9999';
    el.style.transition = 'all 0.6s ease-out';
    el.style.transform = `translate(-50%, -50%) scale(1)`;
    el.style.opacity = '1';
    
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(-50%, ${-50 - Math.random() * 40}px) scale(0)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      if (document.body.contains(el)) el.remove();
    }, 600);
  };

  const spawnBurst = (x, y, symbol) => {
    const count = Math.random() > 0.5 ? 4 : 6;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.textContent = symbol;
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.pointerEvents = 'none';
      el.style.fontSize = '16px';
      el.style.zIndex = '9999';
      el.style.transition = 'all 0.8s cubic-bezier(0.1, 0.8, 0.3, 1)';
      el.style.transform = `translate(-50%, -50%) scale(1)`;
      el.style.opacity = '1';
      
      document.body.appendChild(el);

      const angle = (Math.PI * 2 * i) / count;
      const velocity = 30 + Math.random() * 30;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;

      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
        el.style.opacity = '0';
      });

      setTimeout(() => {
         if (document.body.contains(el)) el.remove();
      }, 800);
    }
  };

  return null;
}
