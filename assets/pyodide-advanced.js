/* ============================================================
   PYODIDE ADVANCED MODULE - Real Python in browser
   Loads pandas, numpy, matplotlib on-demand alongside Skulpt
   ============================================================ */

(function() {
  'use strict';
  
  const IS_RTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'he';
  
  const T = IS_RTL ? {
    advancedMode: 'מצב מתקדם',
    advancedDesc: 'הפעל Python אמיתי עם pandas/numpy/matplotlib',
    loading: 'טוען Pyodide... (~5MB, פעם אחת בלבד)',
    loadingPackages: 'טוען חבילות (pandas, numpy, matplotlib)...',
    ready: 'Pyodide מוכן! 🐍',
    error: 'שגיאת טעינה - נסה שוב',
    realPython: '🚀 Python אמיתי',
    skulptMode: '⚡ Skulpt (מהיר)',
    switchMode: 'החלף',
    advancedTitle: '🚀 תרגילים מתקדמים (Python אמיתי)',
    advancedSubtitle: 'תרגילים אופציונליים שדורשים pandas/numpy/matplotlib אמיתיים. דורש טעינה ראשונית של ~5MB.',
    enable: '✨ הפעל מצב מתקדם',
    enableTooltip: 'יטען Pyodide (~5MB) פעם אחת לדפדפן',
    disable: 'בטל',
    loadingFirstTime: 'טוען בפעם הראשונה...',
    cached: 'נטען מהמטמון',
    runPyodide: '▶ הרץ ב-Python אמיתי',
    chartGenerated: '📊 גרף נוצר',
    saved: 'נשמר',
  } : {
    advancedMode: 'Advanced Mode',
    advancedDesc: 'Enable real Python with pandas/numpy/matplotlib',
    loading: 'Loading Pyodide... (~5MB, one time)',
    loadingPackages: 'Loading packages (pandas, numpy, matplotlib)...',
    ready: 'Pyodide ready! 🐍',
    error: 'Loading error - try again',
    realPython: '🚀 Real Python',
    skulptMode: '⚡ Skulpt (fast)',
    switchMode: 'Switch',
    advancedTitle: '🚀 Advanced Exercises (Real Python)',
    advancedSubtitle: 'Optional exercises requiring real pandas/numpy/matplotlib. Requires initial ~5MB download.',
    enable: '✨ Enable Advanced Mode',
    enableTooltip: 'Will load Pyodide (~5MB) once per browser',
    disable: 'Disable',
    loadingFirstTime: 'Loading for first time...',
    cached: 'Loaded from cache',
    runPyodide: '▶ Run in Real Python',
    chartGenerated: '📊 Chart generated',
    saved: 'Saved',
  };
  
  // ---- State ----
  let pyodide = null;
  let pyodideLoading = false;
  let pyodideReady = false;
  
  // ---- Load Pyodide on demand ----
  async function loadPyodide() {
    if (pyodideReady) return pyodide;
    if (pyodideLoading) {
      // Wait for current load to complete
      while (pyodideLoading) {
        await new Promise(r => setTimeout(r, 200));
      }
      return pyodide;
    }
    
    pyodideLoading = true;
    updateStatus(T.loading);
    
    try {
      // Load Pyodide from CDN if not already loaded
      if (typeof window.loadPyodide === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js');
      }
      
      // Initialize
      pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/'
      });
      
      // Load common packages
      updateStatus(T.loadingPackages);
      await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib', 'scikit-learn']);
      
      // Setup matplotlib backend for browser
      pyodide.runPython(`
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
import io, base64

def _show_plt():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=80, bbox_inches='tight', facecolor='white')
    buf.seek(0)
    img_b64 = base64.b64encode(buf.read()).decode('utf-8')
    plt.close('all')
    return img_b64

plt.show = lambda *args, **kw: print('__PLT_OUTPUT__' + _show_plt() + '__END_PLT__')
      `);
      
      pyodideReady = true;
      pyodideLoading = false;
      updateStatus(T.ready);
      
      // Hide status after 2 seconds
      setTimeout(() => updateStatus(''), 2000);
      
      return pyodide;
    } catch (e) {
      pyodideLoading = false;
      updateStatus(T.error + ': ' + e.message);
      console.error('Pyodide load error:', e);
      throw e;
    }
  }
  
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  
  function updateStatus(msg) {
    const el = document.getElementById('py-adv-status');
    if (el) {
      el.textContent = msg;
      el.style.display = msg ? 'block' : 'none';
    }
  }
  
  // ---- Run Python code via Pyodide ----
  async function runPyodide(code) {
    if (!pyodideReady) await loadPyodide();
    
    let stdout = '';
    pyodide.setStdout({
      batched: (text) => { stdout += text + '\n'; }
    });
    pyodide.setStderr({
      batched: (text) => { stdout += text + '\n'; }
    });
    
    try {
      // Wrap code to handle matplotlib plt.show()
      await pyodide.runPythonAsync(code);
      return { output: stdout, error: null };
    } catch (e) {
      return { output: stdout, error: e.message };
    }
  }
  
  // ---- UI: Toggle button + status ----
  function buildToggle() {
    if (document.getElementById('py-adv-toggle')) return;
    
    const isEnabled = localStorage.getItem('py_advanced_enabled') === '1';
    
    const wrap = document.createElement('div');
    wrap.id = 'py-adv-wrap';
    wrap.innerHTML = `
      <button id="py-adv-toggle" class="py-adv-toggle ${isEnabled ? 'enabled' : ''}">
        <span class="py-adv-icon">🚀</span>
        <span class="py-adv-label">${isEnabled ? T.realPython : T.skulptMode}</span>
      </button>
      <div id="py-adv-status" class="py-adv-status"></div>
    `;
    
    document.body.appendChild(wrap);
    
    document.getElementById('py-adv-toggle').addEventListener('click', toggleAdvanced);
    
    // Auto-load if enabled
    if (isEnabled) {
      setTimeout(() => loadPyodide().catch(e => console.warn('Auto-load Pyodide failed:', e)), 1500);
    }
  }
  
  function toggleAdvanced() {
    const isEnabled = localStorage.getItem('py_advanced_enabled') === '1';
    if (isEnabled) {
      // Disable - revert to Skulpt
      localStorage.setItem('py_advanced_enabled', '0');
      location.reload();
    } else {
      // Show confirmation modal
      showEnableModal();
    }
  }
  
  function showEnableModal() {
    const modal = document.createElement('div');
    modal.className = 'py-adv-modal';
    modal.innerHTML = `
      <div class="py-adv-modal-inner">
        <div class="py-adv-modal-icon">🚀</div>
        <h2>${T.advancedTitle}</h2>
        <p>${T.advancedSubtitle}</p>
        <ul class="py-adv-features">
          <li>📊 matplotlib אמיתי לויזואליזציה</li>
          <li>🧮 numpy לחישובים מהירים</li>
          <li>🐼 pandas מלא (לא mini-pandas)</li>
          <li>🤖 scikit-learn בסיסי</li>
        </ul>
        <div class="py-adv-modal-actions">
          <button class="py-adv-btn py-adv-btn-primary" id="py-adv-confirm">${T.enable}</button>
          <button class="py-adv-btn py-adv-btn-secondary" id="py-adv-cancel">${T.disable}</button>
        </div>
        <div class="py-adv-tooltip">${T.enableTooltip}</div>
      </div>
    `;
    
    // Translate Hebrew bullet list if EN
    if (!IS_RTL) {
      modal.querySelector('.py-adv-features').innerHTML = `
        <li>📊 Real matplotlib for visualization</li>
        <li>🧮 numpy for fast computation</li>
        <li>🐼 Full pandas (not mini-pandas)</li>
        <li>🤖 Basic scikit-learn</li>
      `;
    }
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    document.getElementById('py-adv-confirm').addEventListener('click', async () => {
      localStorage.setItem('py_advanced_enabled', '1');
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
      // Update toggle button
      const toggle = document.getElementById('py-adv-toggle');
      if (toggle) {
        toggle.classList.add('enabled');
        toggle.querySelector('.py-adv-label').textContent = T.realPython;
      }
      // Start loading
      try {
        await loadPyodide();
      } catch (e) { /* already handled */ }
    });
    
    document.getElementById('py-adv-cancel').addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      }
    });
  }
  
  // ---- Public API ----
  window.pyAdvanced = {
    isReady: () => pyodideReady,
    isEnabled: () => localStorage.getItem('py_advanced_enabled') === '1',
    load: loadPyodide,
    run: runPyodide,
    
    // For exercise integration: run code and render output (including matplotlib)
    runAndRender: async function(code, outputEl) {
      try {
        await loadPyodide();
        const result = await runPyodide(code);
        
        let html = '';
        let text = result.output || '';
        
        // Extract matplotlib images
        const plotRegex = /__PLT_OUTPUT__([A-Za-z0-9+/=]+)__END_PLT__/g;
        let match;
        const images = [];
        while ((match = plotRegex.exec(text)) !== null) {
          images.push(match[1]);
        }
        text = text.replace(plotRegex, '').trim();
        
        if (text) html += `<pre>${escapeHTML(text)}</pre>`;
        for (const img of images) {
          html += `<img src="data:image/png;base64,${img}" style="max-width:100%; margin-top:8px; border-radius:6px;" alt="Plot">`;
        }
        if (result.error) {
          html += `<pre style="color:#ff6b6b;">${escapeHTML(result.error)}</pre>`;
        }
        
        if (outputEl) outputEl.innerHTML = html;
        return { output: text, images: images, error: result.error };
      } catch (e) {
        if (outputEl) outputEl.innerHTML = `<pre style="color:#ff6b6b;">${escapeHTML(e.message)}</pre>`;
        return { output: '', images: [], error: e.message };
      }
    }
  };
  
  function escapeHTML(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  
  // ---- Init ----
  function init() {
    buildToggle();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
