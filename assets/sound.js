/* ============================================================
   SOUND EFFECTS — Web Audio API (no external files)
   Pure JS, works offline, mobile-friendly
   ============================================================ */

(function() {
  'use strict';
  
  // ---- Mute toggle (saved to localStorage) ----
  function isMuted() { return localStorage.getItem('gam_muted') === '1'; }
  function setMuted(b) { localStorage.setItem('gam_muted', b ? '1' : '0'); }
  
  // ---- AudioContext (lazy initialization, mobile-safe) ----
  let audioCtx = null;
  function getCtx() {
    if (audioCtx) return audioCtx;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
      return audioCtx;
    } catch(e) { return null; }
  }
  
  // ---- Play a tone ----
  function tone(freq, duration, type = 'sine', vol = 0.15, delay = 0) {
    if (isMuted()) return;
    const ctx = getCtx();
    if (!ctx) return;
    
    // Resume context on first user interaction (mobile requirement)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  }
  
  // ---- Sound presets ----
  const SOUNDS = {
    // Exercise correct - bright ascending chime
    correct: () => {
      tone(523.25, 0.15, 'sine', 0.15, 0);     // C5
      tone(659.25, 0.15, 'sine', 0.15, 0.1);   // E5
      tone(783.99, 0.25, 'sine', 0.18, 0.2);   // G5
    },
    
    // Exercise incorrect - soft descending hum
    wrong: () => {
      tone(330, 0.15, 'sine', 0.1, 0);
      tone(247, 0.2, 'sine', 0.1, 0.12);
    },
    
    // XP earned - quick double pop
    xp: () => {
      tone(800, 0.08, 'sine', 0.12, 0);
      tone(1200, 0.12, 'sine', 0.12, 0.07);
    },
    
    // Level up - triumphant fanfare
    levelUp: () => {
      tone(523.25, 0.12, 'square', 0.1, 0);      // C5
      tone(659.25, 0.12, 'square', 0.1, 0.1);    // E5
      tone(783.99, 0.12, 'square', 0.1, 0.2);    // G5
      tone(1046.50, 0.3,  'square', 0.12, 0.3);  // C6
    },
    
    // Badge unlock - magical sparkle
    badge: () => {
      tone(880, 0.1,  'sine', 0.1, 0);     // A5
      tone(1108.73, 0.1, 'sine', 0.1, 0.08); // C#6
      tone(1318.51, 0.1, 'sine', 0.12, 0.16); // E6
      tone(1760, 0.25, 'sine', 0.13, 0.24); // A6
    },
    
    // Streak continues - soft bell
    streak: () => {
      tone(659.25, 0.15, 'sine', 0.12, 0);
      tone(987.77, 0.3, 'sine', 0.1, 0.1);
    },
    
    // Click - subtle UI tick
    click: () => {
      tone(2000, 0.03, 'sine', 0.06, 0);
    },
    
    // Module complete - full celebration
    complete: () => {
      tone(523.25, 0.1, 'sine', 0.12, 0);
      tone(659.25, 0.1, 'sine', 0.12, 0.08);
      tone(783.99, 0.1, 'sine', 0.12, 0.16);
      tone(1046.50, 0.4, 'sine', 0.15, 0.24);
    },
  };
  
  // ---- Public API ----
  window.gamSound = {
    play: function(name) {
      if (SOUNDS[name]) {
        try { SOUNDS[name](); } catch(e) { /* swallow */ }
      }
    },
    isMuted: isMuted,
    setMuted: setMuted,
    toggle: function() {
      const newState = !isMuted();
      setMuted(newState);
      updateMuteUI();
      if (!newState) SOUNDS.click();  // confirm sound when unmuting
      return newState;
    },
  };
  
  // ---- Mute toggle button (added to HUD) ----
  function updateMuteUI() {
    const btn = document.getElementById('gam-mute-btn');
    if (btn) btn.textContent = isMuted() ? '🔇' : '🔊';
  }
  
  function addMuteButton() {
    if (document.getElementById('gam-mute-btn')) return;
    const hud = document.getElementById('gam-hud');
    if (!hud) {
      // Try again later
      setTimeout(addMuteButton, 500);
      return;
    }
    
    const btn = document.createElement('button');
    btn.id = 'gam-mute-btn';
    btn.className = 'gam-mute-btn';
    btn.textContent = isMuted() ? '🔇' : '🔊';
    btn.setAttribute('aria-label', 'Toggle sound');
    btn.style.cssText = `
      pointer-events: auto;
      background: rgba(30,35,70,0.85);
      border: 1.5px solid #4a5494;
      border-radius: 50%;
      color: #fff;
      width: 36px;
      height: 36px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      margin-inline-end: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform .15s ease;
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.gamSound.toggle();
    });
    
    hud.insertBefore(btn, hud.firstChild);
  }
  
  // ---- Hook into gam events (XP, badges, levels) ----
  function hookGamEvents() {
    if (!window.gam) {
      setTimeout(hookGamEvents, 200);
      return;
    }
    
    // Wrap original markExercisePassed
    const origMark = window.gam.markExercisePassed;
    window.gam.markExercisePassed = function(...args) {
      const result = origMark.apply(this, args);
      if (result) window.gamSound.play('correct');
      return result;
    };
  }
  
  // ---- Init ----
  function init() {
    addMuteButton();
    hookGamEvents();
    
    // Observe DOM for badge/level modals to play sounds
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains('gam-celebration')) {
            if (node.classList.contains('gam-badge-unlock')) {
              window.gamSound.play('badge');
            } else {
              window.gamSound.play('levelUp');
            }
          }
        });
      });
    });
    observer.observe(document.body, { childList: true });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
