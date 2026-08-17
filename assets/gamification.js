/* ============================================================
   GAMIFICATION ENGINE — XP + Streaks + Badges
   Works in both Hebrew (RTL) and English (LTR) pages
   Pure JS + localStorage, no backend needed
   ============================================================ */

(function() {
  'use strict';
  
  // ---- Detect language ----
  const IS_RTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'he';
  const T = IS_RTL ? {
    xp: 'נקודות',
    streak: 'רצף ימים',
    streakDays: (n) => n === 1 ? 'יום' : 'ימים',
    level: 'רמה',
    newBadge: 'מדליה חדשה!',
    levelUp: 'עלית רמה!',
    today: 'היום',
    yesterday: 'אתמול',
    daysAgo: (n) => `לפני ${n} ימים`,
    streakStart: 'התחלת רצף — חזור מחר!',
    streakBroken: 'הרצף נשבר 💔',
    streakAlive: (n) => `🔥 ${n} ימים ברצף!`,
    streakFirst: '🎯 יום ראשון בקורס!',
    achievements: 'הישגים',
    progressTitle: 'ההתקדמות שלך',
    close: 'סגור',
    keepGoing: 'תמשיך ככה!',
    perfectDay: 'יום מושלם!',
    earned: 'הרווחת',
    nextLevel: 'לרמה הבאה',
    weeklyGoal: 'יעד שבועי',
    daysLeft: (n) => `עוד ${n} ימים`,
    streakInfo: 'פתח את האתר היום כדי לשמור על הרצף!',
    xpToNext: (n) => `עוד ${n} XP לרמה הבאה`,
  } : {
    xp: 'XP',
    streak: 'Day Streak',
    streakDays: (n) => n === 1 ? 'day' : 'days',
    level: 'Level',
    newBadge: 'New Badge!',
    levelUp: 'Level Up!',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: (n) => `${n} days ago`,
    streakStart: 'Streak started — come back tomorrow!',
    streakBroken: 'Streak broken 💔',
    streakAlive: (n) => `🔥 ${n} day streak!`,
    streakFirst: '🎯 First day of the course!',
    achievements: 'Achievements',
    progressTitle: 'Your Progress',
    close: 'Close',
    keepGoing: 'Keep going!',
    perfectDay: 'Perfect day!',
    earned: 'Earned',
    nextLevel: 'to next level',
    weeklyGoal: 'Weekly Goal',
    daysLeft: (n) => `${n} days left`,
    streakInfo: 'Open the site today to keep your streak alive!',
    xpToNext: (n) => `${n} XP to next level`,
  };
  
  // ---- XP rewards ----
  const XP_REWARDS = {
    EXERCISE_PASS: 10,
    EXERCISE_PASS_NO_HINT: 15,    // bonus if didn't see solution
    QUIZ_PASS: 20,
    MODULE_COMPLETE: 50,
    FIRST_RUN_OF_DAY: 5,           // bonus for opening site each day
    STREAK_BONUS: (days) => Math.min(days * 2, 30),  // bonus per streak day, capped
  };
  
  // ---- Storage keys ----
  const STORAGE = {
    XP: 'gam_xp',
    STREAK: 'gam_streak',
    LAST_DATE: 'gam_lastDate',
    LONGEST_STREAK: 'gam_longest',
    BADGES: 'gam_badges',
    PASSED_EXERCISES: 'gam_passedEx',
    USAGE_DAYS: 'gam_days',
    DAILY_XP: 'gam_dailyXP',
  };
  
  // ---- Storage helpers ----
  function getXP() { return parseInt(localStorage.getItem(STORAGE.XP) || '0', 10); }
  function setXP(n) { localStorage.setItem(STORAGE.XP, n); updateUI(); }
  function addXP(amount, reason) {
    const cur = getXP();
    const newXP = cur + amount;
    setXP(newXP);
    
    // Track daily XP
    const today = todayStr();
    const dailyData = JSON.parse(localStorage.getItem(STORAGE.DAILY_XP) || '{}');
    dailyData[today] = (dailyData[today] || 0) + amount;
    localStorage.setItem(STORAGE.DAILY_XP, JSON.stringify(dailyData));
    
    showXPGain(amount, reason);
    checkLevelUp(cur, newXP);
    checkBadges();
  }
  
  function getStreak() { return parseInt(localStorage.getItem(STORAGE.STREAK) || '0', 10); }
  function setStreak(n) {
    localStorage.setItem(STORAGE.STREAK, n);
    const longest = parseInt(localStorage.getItem(STORAGE.LONGEST_STREAK) || '0', 10);
    if (n > longest) localStorage.setItem(STORAGE.LONGEST_STREAK, n);
    updateUI();
  }
  
  function getBadges() {
    try { return JSON.parse(localStorage.getItem(STORAGE.BADGES) || '[]'); }
    catch (e) { return []; }
  }
  function addBadge(id) {
    const badges = getBadges();
    if (!badges.includes(id)) {
      badges.push(id);
      localStorage.setItem(STORAGE.BADGES, JSON.stringify(badges));
      const def = BADGE_DEFS.find(b => b.id === id);
      if (def) showBadgeUnlock(def);
      return true;
    }
    return false;
  }
  
  function getPassedExercises() {
    try { return JSON.parse(localStorage.getItem(STORAGE.PASSED_EXERCISES) || '{}'); }
    catch (e) { return {}; }
  }
  function markExercisePassed(courseId, exId, usedSolution) {
    const passed = getPassedExercises();
    if (!passed[courseId]) passed[courseId] = {};
    if (!passed[courseId][exId]) {
      passed[courseId][exId] = { date: todayStr(), used: !!usedSolution };
      localStorage.setItem(STORAGE.PASSED_EXERCISES, JSON.stringify(passed));
      
      const xp = usedSolution ? XP_REWARDS.EXERCISE_PASS : XP_REWARDS.EXERCISE_PASS_NO_HINT;
      addXP(xp, IS_RTL ? 'תרגיל הושלם!' : 'Exercise complete!');
      return true;
    }
    return false;
  }
  
  // ---- Date helpers ----
  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function daysBetween(d1Str, d2Str) {
    const d1 = new Date(d1Str);
    const d2 = new Date(d2Str);
    return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
  }
  
  // ---- Streak logic ----
  function updateStreakOnLoad() {
    const lastDate = localStorage.getItem(STORAGE.LAST_DATE);
    const today = todayStr();
    if (!lastDate) {
      // First visit
      localStorage.setItem(STORAGE.LAST_DATE, today);
      setStreak(1);
      addBadge('first_day');
      showToast(T.streakFirst, '🎯');
      return;
    }
    if (lastDate === today) return;  // Already counted today
    
    const diff = daysBetween(lastDate, today);
    if (diff === 1) {
      // Continued streak
      const newStreak = getStreak() + 1;
      setStreak(newStreak);
      localStorage.setItem(STORAGE.LAST_DATE, today);
      addXP(XP_REWARDS.FIRST_RUN_OF_DAY + XP_REWARDS.STREAK_BONUS(newStreak), T.streakAlive(newStreak));
    } else if (diff > 1) {
      // Streak broken
      const oldStreak = getStreak();
      if (oldStreak > 1) {
        showToast(T.streakBroken, '💔');
      }
      setStreak(1);
      localStorage.setItem(STORAGE.LAST_DATE, today);
      addXP(XP_REWARDS.FIRST_RUN_OF_DAY, IS_RTL ? 'התחלת רצף חדש' : 'New streak started');
    }
    
    // Track usage day
    const days = JSON.parse(localStorage.getItem(STORAGE.USAGE_DAYS) || '[]');
    if (!days.includes(today)) {
      days.push(today);
      localStorage.setItem(STORAGE.USAGE_DAYS, JSON.stringify(days));
    }
  }
  
  // ---- Level system ----
  // XP needed for each level: 0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000, 4000, 5500, 7500, ...
  function levelForXP(xp) {
    const thresholds = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000, 4000, 5500, 7500, 10000];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (xp >= thresholds[i]) return i + 1;
    }
    return 1;
  }
  function xpForLevel(level) {
    const thresholds = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000, 4000, 5500, 7500, 10000];
    return thresholds[level - 1] || (10000 + (level - 14) * 2500);
  }
  function checkLevelUp(oldXP, newXP) {
    const oldLvl = levelForXP(oldXP);
    const newLvl = levelForXP(newXP);
    if (newLvl > oldLvl) {
      showLevelUp(newLvl);
      // Badge for reaching levels
      if (newLvl === 5) addBadge('level_5');
      if (newLvl === 10) addBadge('level_10');
    }
  }
  
  // ---- Badge definitions ----
  const BADGE_DEFS = [
    { id: 'first_day',  icon: '🎯', name_he: 'יום ראשון',    name_en: 'First Day',    desc_he: 'התחלת ללמוד!',                   desc_en: 'Started learning!' },
    { id: 'first_ex',   icon: '🐣', name_he: 'תרגיל ראשון',  name_en: 'First Exercise',desc_he: 'פתרת תרגיל ראשון',              desc_en: 'Solved your first exercise' },
    { id: 'streak_3',   icon: '🔥', name_he: '3 ימים ברצף', name_en: '3-Day Streak', desc_he: 'התמדה!',                          desc_en: 'Consistency!' },
    { id: 'streak_7',   icon: '⚡', name_he: 'שבוע ברצף',   name_en: '7-Day Streak', desc_he: 'אלוף של שבוע',                    desc_en: 'A week champion' },
    { id: 'streak_30',  icon: '🏆', name_he: 'חודש ברצף',   name_en: '30-Day Streak',desc_he: 'אגדה',                            desc_en: 'Legend' },
    { id: 'ex_10',      icon: '⭐', name_he: '10 תרגילים',   name_en: '10 Exercises', desc_he: '10 תרגילים נפתרו',                desc_en: '10 exercises solved' },
    { id: 'ex_50',      icon: '🌟', name_he: '50 תרגילים',   name_en: '50 Exercises', desc_he: '50 תרגילים נפתרו',                desc_en: '50 exercises solved' },
    { id: 'ex_100',     icon: '💯', name_he: '100 תרגילים',  name_en: '100 Exercises',desc_he: '100 תרגילים — מקצוען!',           desc_en: '100 exercises — pro!' },
    { id: 'ex_200',     icon: '👑', name_he: '200 תרגילים',  name_en: '200 Exercises',desc_he: 'אלוף האלופים',                    desc_en: 'Champion of champions' },
    { id: 'python_pro', icon: '🐍', name_he: 'Python Pro',  name_en: 'Python Pro',   desc_he: 'סיימת את קורס Python',           desc_en: 'Completed Python course' },
    { id: 'pandas_pro', icon: '🐼', name_he: 'Pandas Pro',  name_en: 'Pandas Pro',   desc_he: 'סיימת את קורס Pandas',           desc_en: 'Completed Pandas course' },
    { id: 'quiz_pro',   icon: '🎓', name_he: 'מומחה חידון',  name_en: 'Quiz Master',  desc_he: 'סיימת 100 שאלות חידון',           desc_en: 'Aced 100 quiz questions' },
    { id: 'level_5',    icon: '🎖️', name_he: 'רמה 5',       name_en: 'Level 5',      desc_he: 'הגעת לרמה 5',                    desc_en: 'Reached Level 5' },
    { id: 'level_10',   icon: '🏅', name_he: 'רמה 10',      name_en: 'Level 10',     desc_he: 'הגעת לרמה 10',                   desc_en: 'Reached Level 10' },
    { id: 'no_hints',   icon: '🧠', name_he: '10 בלי רמזים', name_en: 'No Hints',    desc_he: '10 תרגילים בלי לראות פתרון',     desc_en: '10 exercises without solution' },
  ];
  
  function checkBadges() {
    const passed = getPassedExercises();
    let totalPassed = 0;
    let noHintCount = 0;
    let pythonCount = 0, pandasCount = 0, quizCount = 0;
    
    Object.entries(passed).forEach(([course, exs]) => {
      const count = Object.keys(exs).length;
      totalPassed += count;
      Object.values(exs).forEach(ex => { if (!ex.used) noHintCount++; });
      if (course === 'python-lesson') pythonCount = count;
      if (course === 'pandas-lesson') pandasCount = count;
      if (course === 'quiz-python-100') quizCount = count;
    });
    
    if (totalPassed >= 1)   addBadge('first_ex');
    if (totalPassed >= 10)  addBadge('ex_10');
    if (totalPassed >= 50)  addBadge('ex_50');
    if (totalPassed >= 100) addBadge('ex_100');
    if (totalPassed >= 200) addBadge('ex_200');
    if (noHintCount >= 10)  addBadge('no_hints');
    if (pythonCount >= 170) addBadge('python_pro');
    if (pandasCount >= 150) addBadge('pandas_pro');
    if (quizCount >= 100)   addBadge('quiz_pro');
    
    const streak = getStreak();
    if (streak >= 3)  addBadge('streak_3');
    if (streak >= 7)  addBadge('streak_7');
    if (streak >= 30) addBadge('streak_30');
  }
  
  // ---- UI: HUD (top corner) ----
  function buildHUD() {
    if (document.getElementById('gam-hud')) return;
    
    const hud = document.createElement('div');
    hud.id = 'gam-hud';
    hud.innerHTML = `
      <button id="gam-hud-btn" aria-label="${T.progressTitle}">
        <span class="gam-streak">🔥 <span id="gam-streak-num">0</span></span>
        <span class="gam-xp">⭐ <span id="gam-xp-num">0</span></span>
      </button>
    `;
    document.body.appendChild(hud);
    document.getElementById('gam-hud-btn').addEventListener('click', openPanel);
  }
  
  function updateUI() {
    const xpEl = document.getElementById('gam-xp-num');
    const stEl = document.getElementById('gam-streak-num');
    if (xpEl) xpEl.textContent = getXP();
    if (stEl) stEl.textContent = getStreak();
  }
  
  // ---- UI: XP gain animation ----
  function showXPGain(amount, reason) {
    const div = document.createElement('div');
    div.className = 'gam-toast gam-toast-xp';
    div.innerHTML = `<span class="gam-toast-icon">⭐</span> <strong>+${amount} ${T.xp}</strong>${reason ? `<br><small>${reason}</small>` : ''}`;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 10);
    setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 400); }, 2500);
  }
  
  function showToast(message, icon) {
    const div = document.createElement('div');
    div.className = 'gam-toast';
    div.innerHTML = `<span class="gam-toast-icon">${icon || '🎉'}</span> ${message}`;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 10);
    setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 400); }, 3000);
  }
  
  function showLevelUp(level) {
    const div = document.createElement('div');
    div.className = 'gam-celebration';
    div.innerHTML = `
      <div class="gam-celebration-inner">
        <div class="gam-celebration-icon">🎉</div>
        <h2>${T.levelUp}</h2>
        <div class="gam-level-badge">${T.level} ${level}</div>
        <button class="gam-celebration-close">${T.close}</button>
      </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 10);
    // סגירה מרוכזת: כפתור, לחיצה מחוץ לחלון, מקש Escape, וסגירה אוטומטית.
    // בלי אלה החלון נשאר פרוס על כל המסך וחוסם כל לחיצה בדף.
    let closed = false;
    const closeCelebration = () => {
      if (closed) return;
      closed = true;
      clearTimeout(autoTimer);
      document.removeEventListener('keydown', onKey);
      div.classList.remove('show');
      setTimeout(() => div.remove(), 400);
    };
    const onKey = e => { if (e.key === 'Escape') closeCelebration(); };
    const autoTimer = setTimeout(closeCelebration, 6000);
    div.querySelector('.gam-celebration-close').addEventListener('click', closeCelebration);
    div.addEventListener('click', e => { if (e.target === div) closeCelebration(); });
    document.addEventListener('keydown', onKey);
  }
  
  function showBadgeUnlock(badge) {
    const name = IS_RTL ? badge.name_he : badge.name_en;
    const desc = IS_RTL ? badge.desc_he : badge.desc_en;
    const div = document.createElement('div');
    div.className = 'gam-celebration gam-badge-unlock';
    div.innerHTML = `
      <div class="gam-celebration-inner">
        <div class="gam-badge-icon-big">${badge.icon}</div>
        <h3>${T.newBadge}</h3>
        <h2>${name}</h2>
        <p>${desc}</p>
        <button class="gam-celebration-close">${T.close}</button>
      </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 10);
    // סגירה מרוכזת: כפתור, לחיצה מחוץ לחלון, מקש Escape, וסגירה אוטומטית.
    // בלי אלה החלון נשאר פרוס על כל המסך וחוסם כל לחיצה בדף.
    let closed = false;
    const closeCelebration = () => {
      if (closed) return;
      closed = true;
      clearTimeout(autoTimer);
      document.removeEventListener('keydown', onKey);
      div.classList.remove('show');
      setTimeout(() => div.remove(), 400);
    };
    const onKey = e => { if (e.key === 'Escape') closeCelebration(); };
    const autoTimer = setTimeout(closeCelebration, 6000);
    div.querySelector('.gam-celebration-close').addEventListener('click', closeCelebration);
    div.addEventListener('click', e => { if (e.target === div) closeCelebration(); });
    document.addEventListener('keydown', onKey);
  }
  
  // ---- UI: Progress Panel ----
  function openPanel() {
    if (document.getElementById('gam-panel')) return;
    
    const xp = getXP();
    const streak = getStreak();
    const longest = parseInt(localStorage.getItem(STORAGE.LONGEST_STREAK) || '0', 10);
    const level = levelForXP(xp);
    const nextLevelXP = xpForLevel(level + 1);
    const currentLevelXP = xpForLevel(level);
    const progressPct = Math.floor(((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);
    const xpToNext = nextLevelXP - xp;
    
    const earnedBadges = getBadges();
    const passed = getPassedExercises();
    let totalPassed = 0;
    Object.values(passed).forEach(exs => { totalPassed += Object.keys(exs).length; });
    
    const badgesHTML = BADGE_DEFS.map(b => {
      const earned = earnedBadges.includes(b.id);
      const name = IS_RTL ? b.name_he : b.name_en;
      const desc = IS_RTL ? b.desc_he : b.desc_en;
      return `
        <div class="gam-badge ${earned ? 'earned' : 'locked'}" title="${desc}">
          <div class="gam-badge-icon">${b.icon}</div>
          <div class="gam-badge-name">${name}</div>
        </div>
      `;
    }).join('');
    
    // Last 7 days activity
    const dailyData = JSON.parse(localStorage.getItem(STORAGE.DAILY_XP) || '{}');
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      last7.push({ date: ds, xp: dailyData[ds] || 0, label: d.toLocaleDateString(IS_RTL ? 'he-IL' : 'en-US', { weekday: 'short' }) });
    }
    const maxXP = Math.max(...last7.map(d => d.xp), 1);
    const chartHTML = last7.map(d => `
      <div class="gam-chart-bar">
        <div class="gam-chart-fill" style="height: ${(d.xp / maxXP) * 100}%"></div>
        <div class="gam-chart-label">${d.label}</div>
        <div class="gam-chart-val">${d.xp || ''}</div>
      </div>
    `).join('');
    
    const panel = document.createElement('div');
    panel.id = 'gam-panel';
    panel.innerHTML = `
      <div class="gam-panel-inner" role="dialog">
        <button class="gam-panel-close" aria-label="${T.close}">&times;</button>
        <h2 class="gam-panel-title">${T.progressTitle}</h2>
        
        <div class="gam-stats">
          <div class="gam-stat">
            <div class="gam-stat-icon">⭐</div>
            <div class="gam-stat-val">${xp.toLocaleString()}</div>
            <div class="gam-stat-label">${T.xp}</div>
          </div>
          <div class="gam-stat">
            <div class="gam-stat-icon">🔥</div>
            <div class="gam-stat-val">${streak}</div>
            <div class="gam-stat-label">${T.streak}</div>
          </div>
          <div class="gam-stat">
            <div class="gam-stat-icon">🎖️</div>
            <div class="gam-stat-val">${level}</div>
            <div class="gam-stat-label">${T.level}</div>
          </div>
        </div>
        
        <div class="gam-progress-box">
          <div class="gam-progress-header">
            <span>${T.level} ${level}</span>
            <span>${T.level} ${level + 1}</span>
          </div>
          <div class="gam-progress-bar">
            <div class="gam-progress-fill" style="width: ${Math.max(0, Math.min(100, progressPct))}%"></div>
          </div>
          <div class="gam-progress-text">${T.xpToNext(xpToNext)}</div>
        </div>
        
        <div class="gam-section-title">${IS_RTL ? '📈 פעילות שבועית' : '📈 Weekly Activity'}</div>
        <div class="gam-chart">${chartHTML}</div>
        
        <div class="gam-section-title">${T.achievements} (${earnedBadges.length}/${BADGE_DEFS.length})</div>
        <div class="gam-badges">${badgesHTML}</div>
        
        <div class="gam-footer">
          <div>${IS_RTL ? 'תרגילים נפתרו' : 'Exercises solved'}: <strong>${totalPassed}</strong></div>
          <div>${IS_RTL ? 'הרצף הכי ארוך שלך' : 'Longest streak'}: <strong>${longest}</strong> ${T.streakDays(longest)}</div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    setTimeout(() => panel.classList.add('show'), 10);
    
    panel.querySelector('.gam-panel-close').addEventListener('click', closePanel);
    panel.addEventListener('click', e => {
      if (e.target === panel) closePanel();
    });
  }
  function closePanel() {
    const p = document.getElementById('gam-panel');
    if (p) { p.classList.remove('show'); setTimeout(() => p.remove(), 300); }
  }
  
  // ---- Public API ----
  window.gam = {
    addXP: addXP,
    markExercisePassed: markExercisePassed,
    completeModule: function(moduleName) {
      addXP(XP_REWARDS.MODULE_COMPLETE, IS_RTL ? `מודול הושלם: ${moduleName}` : `Module complete: ${moduleName}`);
    },
    open: openPanel,
    getXP: getXP,
    getStreak: getStreak,
    getBadges: getBadges,
  };
  
  // ---- Init ----
  function init() {
    buildHUD();
    updateUI();
    updateStreakOnLoad();
    checkBadges();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
