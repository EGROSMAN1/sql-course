/* ============================================================
   ADVANCED EXERCISES UI - Renders into pandas-lesson page
   Adds a collapsible "Advanced (Real Python)" section
   ============================================================ */

(function() {
  'use strict';
  
  const IS_RTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'he';
  
  const T = IS_RTL ? {
    sectionTitle: '🚀 תרגילים מתקדמים (Python אמיתי)',
    sectionDesc: 'pandas, numpy, matplotlib אמיתיים - לאחר שסיימת את התרגילים הבסיסיים',
    expandSection: 'הצג תרגילים מתקדמים',
    collapseSection: 'הסתר',
    enableFirst: 'צריך להפעיל את "מצב מתקדם" קודם',
    enableBtn: '✨ הפעל מצב מתקדם',
    run: '▶ הרץ ב-Python אמיתי',
    running: 'מריץ...',
    showSolution: '💡 הצג פתרון',
    hideSolution: 'הסתר פתרון',
    copy: '📋 העתק',
    copied: '✅ הועתק!',
    correct: '✅ מעולה! התשובה נכונה.',
    wrong: '🤔 הפלט לא תואם. נסה שוב.',
    hint: '💡 רמז',
    moduleProgress: (done, total) => `${done}/${total} הושלמו`,
    completed: 'הושלם',
  } : {
    sectionTitle: '🚀 Advanced Exercises (Real Python)',
    sectionDesc: 'Real pandas, numpy, matplotlib - after completing basic exercises',
    expandSection: 'Show Advanced Exercises',
    collapseSection: 'Hide',
    enableFirst: 'You need to enable "Advanced Mode" first',
    enableBtn: '✨ Enable Advanced Mode',
    run: '▶ Run in Real Python',
    running: 'Running...',
    showSolution: '💡 Show Solution',
    hideSolution: 'Hide Solution',
    copy: '📋 Copy',
    copied: '✅ Copied!',
    correct: '✅ Excellent! Correct answer.',
    wrong: '🤔 Output doesn\'t match. Try again.',
    hint: '💡 Hint',
    moduleProgress: (done, total) => `${done}/${total} completed`,
    completed: 'Completed',
  };
  
  // ---- Get exercises for current lang ----
  function getExercises() {
    if (!window.PYODIDE_ADVANCED_EXERCISES) return [];
    return IS_RTL ? window.PYODIDE_ADVANCED_EXERCISES.he : window.PYODIDE_ADVANCED_EXERCISES.en;
  }
  
  // ---- Storage for completion tracking ----
  function getCompleted() {
    try { return JSON.parse(localStorage.getItem('py_adv_completed') || '[]'); }
    catch (e) { return []; }
  }
  function markCompleted(exId) {
    const c = getCompleted();
    if (!c.includes(exId)) {
      c.push(exId);
      localStorage.setItem('py_adv_completed', JSON.stringify(c));
      // Hook into gam for XP
      if (window.gam && window.gam.addXP) {
        window.gam.addXP(20, IS_RTL ? 'תרגיל מתקדם!' : 'Advanced exercise!');
      }
    }
  }
  
  // ---- Build the advanced section ----
  function buildAdvancedSection() {
    // Find where to insert: after main exercises, before footer
    const target = document.querySelector('main') || document.body;
    if (!target) return;
    
    // Avoid duplicate
    if (document.getElementById('py-adv-section')) return;
    
    // Only show on pages that make sense (pandas-lesson)
    const url = location.pathname.toLowerCase();
    if (!url.includes('pandas-lesson')) return;
    
    const section = document.createElement('section');
    section.id = 'py-adv-section';
    section.className = 'py-adv-section';
    section.style.cssText = 'margin: 40px 16px 20px; max-width: 900px; margin-left: auto; margin-right: auto;';
    
    // Build collapsible UI
    section.innerHTML = `
      <div class="py-adv-section-header" style="cursor:pointer; display:flex; align-items:center; gap:8px; user-select:none;">
        <h2 class="py-adv-section-title">${T.sectionTitle}</h2>
        <span class="py-adv-expand-icon" style="margin-inline-start:auto; font-size:18px; transition:transform .3s;">▼</span>
      </div>
      <div class="py-adv-section-desc">${T.sectionDesc}</div>
      <div class="py-adv-section-body" style="display:none; margin-top:16px;">
        <div id="py-adv-content"></div>
      </div>
    `;
    
    target.appendChild(section);
    
    // Click to toggle
    const header = section.querySelector('.py-adv-section-header');
    const body = section.querySelector('.py-adv-section-body');
    const icon = section.querySelector('.py-adv-expand-icon');
    header.addEventListener('click', () => {
      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : 'block';
      icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      if (!isOpen) {
        renderExercises();
      }
    });
  }
  
  // ---- Render exercises ----
  function renderExercises() {
    const container = document.getElementById('py-adv-content');
    if (!container) return;
    if (container.dataset.rendered === '1') return;
    container.dataset.rendered = '1';
    
    const isEnabled = window.pyAdvanced && window.pyAdvanced.isEnabled();
    
    if (!isEnabled) {
      // Show "enable first" message
      container.innerHTML = `
        <div class="py-adv-locked">
          <div class="py-adv-locked-text">${T.enableFirst}</div>
          <button class="py-adv-enable-btn" id="py-adv-enable-from-section">${T.enableBtn}</button>
        </div>
      `;
      document.getElementById('py-adv-enable-from-section').addEventListener('click', () => {
        // Trigger the toggle
        const btn = document.getElementById('py-adv-toggle');
        if (btn) btn.click();
        // Reset render
        setTimeout(() => {
          container.dataset.rendered = '0';
          renderExercises();
        }, 1000);
      });
      return;
    }
    
    const modules = getExercises();
    const completed = getCompleted();
    
    let html = '';
    modules.forEach((mod, modIdx) => {
      const modDone = mod.topics.filter(t => completed.includes(t.id)).length;
      const modTotal = mod.topics.length;
      
      html += `
        <div class="py-adv-module">
          <div class="py-adv-module-header">
            <h3>${mod.module}</h3>
            <span class="py-adv-module-progress">${T.moduleProgress(modDone, modTotal)}</span>
          </div>
          <div class="py-adv-topics">
      `;
      
      mod.topics.forEach((topic, topicIdx) => {
        const isDone = completed.includes(topic.id);
        const uniqueId = `pyadv-${modIdx}-${topicIdx}`;
        html += `
          <div class="py-adv-topic ${isDone ? 'done' : ''}" data-ex-id="${topic.id}">
            <div class="py-adv-topic-header">
              <h4>${isDone ? '✅' : '⚪'} ${topic.title}</h4>
            </div>
            <div class="py-adv-theory">${topic.theory}</div>
            <div class="py-adv-question"><b>📝 ${IS_RTL ? 'תרגיל' : 'Exercise'}:</b> ${topic.q}</div>
            <textarea id="code-${uniqueId}" class="py-adv-code" rows="8" spellcheck="false">${topic.starter || ''}</textarea>
            <div class="py-adv-actions">
              <button class="py-adv-run-btn" data-id="${uniqueId}" data-ex="${topic.id}">${T.run}</button>
              <button class="py-adv-sol-btn" data-id="${uniqueId}">${T.showSolution}</button>
              <button class="py-adv-hint-btn" data-id="${uniqueId}" data-hint="${escapeAttr(topic.hint || '')}">${T.hint}</button>
            </div>
            <div id="out-${uniqueId}" class="py-adv-output"></div>
            <div id="verdict-${uniqueId}" class="py-adv-verdict"></div>
            <div id="sol-${uniqueId}" class="py-adv-solution" style="display:none;">
              <div class="py-adv-sol-header">
                <span>💡 ${IS_RTL ? 'פתרון רשמי' : 'Official solution'}</span>
                <button class="py-adv-copy-btn" data-id="${uniqueId}">${T.copy}</button>
              </div>
              <pre id="sol-code-${uniqueId}">${escapeHTML(topic.solution || '')}</pre>
            </div>
          </div>
        `;
      });
      
      html += `</div></div>`;
    });
    
    container.innerHTML = html;
    
    // Store exercise data for check functions
    window._pyAdvExercises = {};
    modules.forEach(mod => {
      mod.topics.forEach(topic => {
        window._pyAdvExercises[topic.id] = topic;
      });
    });
    
    // Wire up buttons
    container.querySelectorAll('.py-adv-run-btn').forEach(btn => {
      btn.addEventListener('click', () => runExercise(btn.dataset.id, btn.dataset.ex));
    });
    container.querySelectorAll('.py-adv-sol-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleSolution(btn.dataset.id));
    });
    container.querySelectorAll('.py-adv-hint-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const hint = btn.dataset.hint;
        if (hint) alert(`💡 ${hint}`);
      });
    });
    container.querySelectorAll('.py-adv-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => copyCode(btn.dataset.id, btn));
    });
  }
  
  async function runExercise(uniqueId, exId) {
    const codeEl = document.getElementById(`code-${uniqueId}`);
    const outEl = document.getElementById(`out-${uniqueId}`);
    const verdictEl = document.getElementById(`verdict-${uniqueId}`);
    const runBtn = document.querySelector(`.py-adv-run-btn[data-id="${uniqueId}"]`);
    
    if (!codeEl || !outEl) return;
    
    const code = codeEl.value;
    
    // Show running state
    runBtn.textContent = T.running;
    runBtn.disabled = true;
    outEl.innerHTML = `<div style="opacity:0.7;">⏳ ${T.running}</div>`;
    verdictEl.textContent = '';
    verdictEl.className = 'py-adv-verdict';
    
    try {
      const result = await window.pyAdvanced.runAndRender(code, outEl);
      
      // Check if correct
      const exercise = window._pyAdvExercises[exId];
      if (exercise && exercise.check) {
        const passed = exercise.check(result.output || '', result.images || []);
        if (passed) {
          verdictEl.textContent = T.correct;
          verdictEl.className = 'py-adv-verdict success';
          markCompleted(exId);
          
          // Visual update
          const topicEl = document.querySelector(`.py-adv-topic[data-ex-id="${exId}"]`);
          if (topicEl) {
            topicEl.classList.add('done');
            const h4 = topicEl.querySelector('h4');
            if (h4 && !h4.textContent.startsWith('✅')) {
              h4.textContent = '✅ ' + h4.textContent.replace(/^[⚪✅]\s*/, '');
            }
          }
          
          // Sound effect
          if (window.gamSound) window.gamSound.play('correct');
        } else {
          verdictEl.textContent = T.wrong;
          verdictEl.className = 'py-adv-verdict fail';
          if (window.gamSound) window.gamSound.play('wrong');
        }
      }
    } catch (e) {
      outEl.innerHTML = `<pre style="color:#ff6b6b;">${escapeHTML(e.message)}</pre>`;
    } finally {
      runBtn.textContent = T.run;
      runBtn.disabled = false;
    }
  }
  
  function toggleSolution(uniqueId) {
    const sol = document.getElementById(`sol-${uniqueId}`);
    const btn = document.querySelector(`.py-adv-sol-btn[data-id="${uniqueId}"]`);
    if (!sol) return;
    
    if (sol.style.display === 'none') {
      sol.style.display = 'block';
      btn.textContent = T.hideSolution;
    } else {
      sol.style.display = 'none';
      btn.textContent = T.showSolution;
    }
  }
  
  function copyCode(uniqueId, btn) {
    const codeEl = document.getElementById(`sol-code-${uniqueId}`);
    if (!codeEl) return;
    const text = codeEl.textContent;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        const oldText = btn.textContent;
        btn.textContent = T.copied;
        setTimeout(() => { btn.textContent = T.copy; }, 1800);
      });
    }
  }
  
  function escapeHTML(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function escapeAttr(s) {
    if (s == null) return '';
    return String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  
  // ---- Init ----
  function init() {
    // Only on pandas-lesson
    if (!location.pathname.toLowerCase().includes('pandas-lesson')) return;
    // Wait a bit for the main page to render
    setTimeout(buildAdvancedSection, 500);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
