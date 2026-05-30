/* ============================================================
   CERTIFICATE GENERATOR
   Pure HTML/CSS certificate, downloadable as PDF via browser print
   Shareable on LinkedIn
   ============================================================ */

(function() {
  'use strict';
  
  const IS_RTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'he';
  
  const T = IS_RTL ? {
    certTitle: 'תעודת השלמה',
    awarded: 'הוענקה ל-',
    forCompleting: 'על השלמת',
    pythonCourse: 'קורס Python מקיף',
    pandasCourse: 'קורס Pandas מקיף',
    quizCourse: 'אתגר 100 שאלות Python',
    fullCourse: 'מסלול מלא בקוד דאטה',
    issued: 'תאריך',
    instructor: 'מדריך',
    eliranName: 'אלירן גרוסמן',
    eliranTitle: 'מרצה SQL ב-Partner Communications',
    siteName: 'קוד דאטה',
    siteUrl: 'egrosman1.github.io/sql-course',
    yourName: 'שמך כאן',
    enterName: 'הכנס שם לתעודה',
    download: 'הורד / הדפס',
    share: 'שתף ב-LinkedIn',
    close: 'סגור',
    statsTitle: 'הישגיך',
    exercisesDone: 'תרגילים נפתרו',
    daysActive: 'ימים פעילים',
    xpEarned: 'XP נצברו',
    badgesEarned: 'מדליות',
    achievementsTitle: 'תעודת הצטיינות',
    sealText: 'אישור רשמי',
    serialPrefix: 'מס\' תעודה',
    yourCertificate: 'התעודה שלך',
    notEligibleTitle: '🎯 עוד לא זמין',
    notEligibleDesc: 'אתה צריך לסיים לפחות 50 תרגילים כדי לקבל תעודה.',
    progress: 'התקדמות',
    eligibleMsg: '🎉 כל הכבוד! זכאי לתעודה',
  } : {
    certTitle: 'Certificate of Completion',
    awarded: 'Awarded to',
    forCompleting: 'for completing',
    pythonCourse: 'Python Comprehensive Course',
    pandasCourse: 'Pandas Comprehensive Course',
    quizCourse: '100 Python Questions Challenge',
    fullCourse: 'Full Data Code Track',
    issued: 'Issued',
    instructor: 'Instructor',
    eliranName: 'Eliran Grossman',
    eliranTitle: 'SQL Instructor at Partner Communications',
    siteName: 'Data Code',
    siteUrl: 'egrosman1.github.io/sql-course',
    yourName: 'Your Name Here',
    enterName: 'Enter name for certificate',
    download: 'Download / Print',
    share: 'Share on LinkedIn',
    close: 'Close',
    statsTitle: 'Your Achievements',
    exercisesDone: 'Exercises Solved',
    daysActive: 'Active Days',
    xpEarned: 'XP Earned',
    badgesEarned: 'Badges',
    achievementsTitle: 'Certificate of Excellence',
    sealText: 'Verified',
    serialPrefix: 'Cert No.',
    yourCertificate: 'Your Certificate',
    notEligibleTitle: '🎯 Not yet available',
    notEligibleDesc: 'You need to complete at least 50 exercises to earn a certificate.',
    progress: 'Progress',
    eligibleMsg: '🎉 Congrats! Eligible for certificate',
  };
  
  // ---- Determine what certificate to award ----
  function getCertificateType() {
    let passed = {};
    try { passed = JSON.parse(localStorage.getItem('gam_passedEx') || '{}'); } catch(e){}
    
    const pythonCount = passed['python-lesson'] ? Object.keys(passed['python-lesson']).length : 0;
    const pandasCount = passed['pandas-lesson'] ? Object.keys(passed['pandas-lesson']).length : 0;
    const quizCount   = passed['quiz-python-100'] ? Object.keys(passed['quiz-python-100']).length : 0;
    
    const total = pythonCount + pandasCount + quizCount;
    
    return {
      total: total,
      pythonCount, pandasCount, quizCount,
      eligible: total >= 50,
      perfect: pythonCount >= 170 && pandasCount >= 150 && quizCount >= 100,
      pythonComplete: pythonCount >= 170,
      pandasComplete: pandasCount >= 150,
      quizComplete: quizCount >= 100,
    };
  }
  
  function getCertificateTitle(certType) {
    if (certType.perfect) return T.fullCourse;
    if (certType.pythonComplete && certType.pandasComplete) return T.fullCourse;
    if (certType.pythonComplete) return T.pythonCourse;
    if (certType.pandasComplete) return T.pandasCourse;
    if (certType.quizComplete) return T.quizCourse;
    return T.fullCourse;
  }
  
  // ---- Serial number (deterministic, based on first achievement date) ----
  function getSerialNumber() {
    let serial = localStorage.getItem('gam_certSerial');
    if (!serial) {
      const ts = Date.now();
      serial = 'DC-' + ts.toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      localStorage.setItem('gam_certSerial', serial);
    }
    return serial;
  }
  
  // ---- Open certificate modal ----
  function open() {
    const certType = getCertificateType();
    
    if (document.getElementById('cert-modal')) return;
    
    const xp = (window.gam && window.gam.getXP) ? window.gam.getXP() : 0;
    const badges = (window.gam && window.gam.getBadges) ? window.gam.getBadges().length : 0;
    const days = JSON.parse(localStorage.getItem('gam_days') || '[]').length;
    const total = certType.total;
    
    let name = localStorage.getItem('gam_userName') || '';
    
    const modal = document.createElement('div');
    modal.id = 'cert-modal';
    
    if (!certType.eligible) {
      // Show progress message
      const pct = Math.floor((total / 50) * 100);
      modal.innerHTML = `
        <div class="cert-modal-inner">
          <button class="cert-close" aria-label="${T.close}">&times;</button>
          <div class="cert-locked">
            <div class="cert-locked-icon">🏆</div>
            <h2>${T.notEligibleTitle}</h2>
            <p>${T.notEligibleDesc}</p>
            <div class="cert-progress-wrap">
              <div class="cert-progress-bar">
                <div class="cert-progress-fill" style="width:${Math.min(100, pct)}%"></div>
              </div>
              <div class="cert-progress-text">${total} / 50 (${pct}%)</div>
            </div>
            <div class="cert-stats-mini">
              <div>🐍 Python: <strong>${certType.pythonCount}</strong> / 170</div>
              <div>🐼 Pandas: <strong>${certType.pandasCount}</strong> / 150</div>
              <div>🎓 Quiz: <strong>${certType.quizCount}</strong> / 100</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      modal.querySelector('.cert-close').addEventListener('click', close);
      modal.addEventListener('click', e => { if (e.target === modal) close(); });
      return;
    }
    
    // Eligible - show certificate
    const today = new Date();
    const dateStr = IS_RTL 
      ? `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
      : today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const serial = getSerialNumber();
    const title = getCertificateTitle(certType);
    
    modal.innerHTML = `
      <div class="cert-modal-inner">
        <button class="cert-close" aria-label="${T.close}">&times;</button>
        <h2 class="cert-modal-title">${T.yourCertificate}</h2>
        
        <div class="cert-eligible-banner">${T.eligibleMsg}</div>
        
        <div class="cert-name-input-wrap">
          <label for="cert-name-input">${T.enterName}:</label>
          <input type="text" id="cert-name-input" value="${name}" placeholder="${IS_RTL ? 'אלירן ישראלי' : 'John Doe'}" maxlength="60">
        </div>
        
        <div class="cert-preview-wrap">
          <div class="cert-preview" id="cert-preview">
            ${buildCertificateHTML(name || T.yourName, title, dateStr, serial, certType, xp, badges, days)}
          </div>
        </div>
        
        <div class="cert-actions">
          <button class="cert-btn cert-btn-primary" id="cert-download">📥 ${T.download}</button>
          <button class="cert-btn cert-btn-share" id="cert-share">💼 ${T.share}</button>
        </div>
        
        <div class="cert-stats-strip">
          <div><strong>${total}</strong><br>${T.exercisesDone}</div>
          <div><strong>${days}</strong><br>${T.daysActive}</div>
          <div><strong>${xp.toLocaleString()}</strong><br>${T.xpEarned}</div>
          <div><strong>${badges}</strong><br>${T.badgesEarned}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Wire up
    modal.querySelector('.cert-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    
    const nameInput = modal.querySelector('#cert-name-input');
    nameInput.addEventListener('input', e => {
      const newName = e.target.value.trim();
      localStorage.setItem('gam_userName', newName);
      const preview = modal.querySelector('#cert-preview');
      preview.innerHTML = buildCertificateHTML(newName || T.yourName, title, dateStr, serial, certType, xp, badges, days);
    });
    
    modal.querySelector('#cert-download').addEventListener('click', () => downloadCertificate(name || T.yourName, title, dateStr, serial, certType, xp, badges, days));
    modal.querySelector('#cert-share').addEventListener('click', () => shareLinkedIn(title));
  }
  
  function close() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }
  
  // ---- Build the certificate HTML (this is the actual certificate visual) ----
  function buildCertificateHTML(name, title, dateStr, serial, certType, xp, badges, days) {
    const escName = name.replace(/</g, '&lt;');
    return `
      <div class="cert-doc">
        <div class="cert-doc-border">
          <div class="cert-doc-inner">
            <div class="cert-doc-header">
              <div class="cert-logo">📊</div>
              <div class="cert-site-name">${T.siteName}</div>
              <div class="cert-site-url">${T.siteUrl}</div>
            </div>
            
            <h1 class="cert-doc-title">${T.certTitle}</h1>
            <div class="cert-doc-subtitle">${T.achievementsTitle}</div>
            
            <div class="cert-doc-awarded">${T.awarded}</div>
            <div class="cert-doc-name">${escName}</div>
            
            <div class="cert-doc-for">${T.forCompleting}</div>
            <div class="cert-doc-course">${title}</div>
            
            <div class="cert-doc-achievements">
              <div class="cert-doc-stat"><span>${certType.total}</span>${T.exercisesDone}</div>
              <div class="cert-doc-stat"><span>${days}</span>${T.daysActive}</div>
              <div class="cert-doc-stat"><span>${xp.toLocaleString()}</span>${T.xpEarned}</div>
              <div class="cert-doc-stat"><span>${badges}</span>${T.badgesEarned}</div>
            </div>
            
            <div class="cert-doc-footer">
              <div class="cert-doc-side">
                <div class="cert-doc-line"></div>
                <div class="cert-doc-label">${T.instructor}</div>
                <div class="cert-doc-value">${T.eliranName}</div>
                <div class="cert-doc-sublabel">${T.eliranTitle}</div>
              </div>
              <div class="cert-doc-seal">
                <div class="cert-doc-seal-circle">
                  <div class="cert-doc-seal-inner">
                    <div class="cert-doc-seal-icon">✓</div>
                    <div class="cert-doc-seal-text">${T.sealText}</div>
                  </div>
                </div>
              </div>
              <div class="cert-doc-side">
                <div class="cert-doc-line"></div>
                <div class="cert-doc-label">${T.issued}</div>
                <div class="cert-doc-value">${dateStr}</div>
                <div class="cert-doc-sublabel">${T.serialPrefix}: ${serial}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // ---- Download/Print the certificate as PDF ----
  function downloadCertificate(name, title, dateStr, serial, certType, xp, badges, days) {
    // Open new window with just the certificate
    const certHTML = buildCertificateHTML(name, title, dateStr, serial, certType, xp, badges, days);
    const css = getCertificateCSS();
    
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) {
      alert(IS_RTL ? 'אנא אפשר חלונות קופצים בדפדפן' : 'Please allow popups');
      return;
    }
    
    win.document.write(`
      <!DOCTYPE html>
      <html lang="${IS_RTL ? 'he' : 'en'}" dir="${IS_RTL ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <title>${T.certTitle} - ${name}</title>
        <style>
          ${css}
          @page { size: A4 landscape; margin: 0; }
          body {
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            font-family: -apple-system, "Heebo", "Segoe UI", Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cert-doc { transform: none !important; margin: 20px; }
          .cert-print-bar {
            position: fixed;
            top: 20px;
            ${IS_RTL ? 'left' : 'right'}: 20px;
            background: #1a1f3a;
            color: #fff;
            padding: 10px 16px;
            border-radius: 10px;
            display: flex;
            gap: 10px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
            z-index: 9999;
          }
          .cert-print-bar button {
            background: linear-gradient(135deg, #ffd700 0%, #ff8800 100%);
            color: #1a1a2e;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 700;
            cursor: pointer;
            font-size: 14px;
            font-family: inherit;
          }
          @media print {
            .cert-print-bar { display: none; }
            body { background: #fff; }
            .cert-doc { margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="cert-print-bar">
          <button onclick="window.print()">🖨️ ${IS_RTL ? 'הדפס / שמור כ-PDF' : 'Print / Save as PDF'}</button>
          <button onclick="window.close()" style="background:#444;color:#fff;">✕</button>
        </div>
        ${certHTML}
      </body>
      </html>
    `);
    win.document.close();
    
    // Auto-trigger print after load
    setTimeout(() => {
      try { win.print(); } catch(e) {}
    }, 600);
  }
  
  // ---- Share on LinkedIn ----
  function shareLinkedIn(title) {
    const url = 'https://egrosman1.github.io/sql-course/' + (IS_RTL ? '' : 'en/');
    const text = IS_RTL 
      ? `🎉 סיימתי את "${title}" בקוד דאטה! קורס פייתון ופאנדס חינמי בעברית.`
      : `🎉 Just completed "${title}" at Data Code! Free Python and Pandas course.`;
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=600');
  }
  
  // ---- CSS for the certificate document itself ----
  function getCertificateCSS() {
    return `
.cert-doc {
  width: 100%;
  max-width: 850px;
  aspect-ratio: 1.414 / 1;
  background: linear-gradient(135deg, #fffef9 0%, #fff8e7 100%);
  padding: 14px;
  box-sizing: border-box;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  position: relative;
}
.cert-doc-border {
  width: 100%;
  height: 100%;
  border: 3px solid #d4af37;
  padding: 8px;
  box-sizing: border-box;
}
.cert-doc-inner {
  width: 100%;
  height: 100%;
  border: 1.5px solid #d4af37;
  padding: 26px 32px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: -apple-system, "Heebo", Georgia, serif;
}
.cert-doc-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}
.cert-logo { font-size: 32px; line-height: 1; }
.cert-site-name { font-size: 16px; font-weight: 700; color: #1a1a2e; margin-top: 2px; }
.cert-site-url { font-size: 11px; color: #888; font-style: italic; margin-top: 1px; }

.cert-doc-title {
  font-size: 32px;
  color: #1a1a2e;
  margin: 8px 0 2px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.cert-doc-subtitle {
  font-size: 13px;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 600;
  margin-bottom: 14px;
}
.cert-doc-awarded {
  font-size: 13px;
  color: #555;
  font-style: italic;
  margin-bottom: 4px;
}
.cert-doc-name {
  font-size: 34px;
  font-weight: 700;
  color: #1a1a2e;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 8px;
  margin: 0 30px 12px;
  font-family: "Heebo", Georgia, serif;
}
.cert-doc-for {
  font-size: 12px;
  color: #555;
  font-style: italic;
  margin-bottom: 4px;
}
.cert-doc-course {
  font-size: 22px;
  color: #d4af37;
  font-weight: 700;
  margin-bottom: 16px;
}

.cert-doc-achievements {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 0 40px 14px;
  padding: 8px 0;
  border-top: 1px solid #e6d68a;
  border-bottom: 1px solid #e6d68a;
}
.cert-doc-stat {
  font-size: 9.5px;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
}
.cert-doc-stat span {
  display: block;
  font-size: 18px;
  color: #1a1a2e;
  font-weight: 800;
  margin-bottom: 1px;
}

.cert-doc-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  margin-top: auto;
  padding-top: 12px;
}
.cert-doc-side { text-align: center; }
.cert-doc-line {
  border-top: 1.5px solid #1a1a2e;
  width: 80%;
  margin: 0 auto 4px;
}
.cert-doc-label {
  font-size: 9.5px;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 1px;
  letter-spacing: 0.5px;
}
.cert-doc-value {
  font-size: 12.5px;
  color: #1a1a2e;
  font-weight: 700;
}
.cert-doc-sublabel {
  font-size: 9.5px;
  color: #888;
  font-style: italic;
  margin-top: 1px;
}

.cert-doc-seal-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 12px rgba(212,175,55,0.45);
}
.cert-doc-seal-circle::before {
  content: '';
  position: absolute;
  inset: -5px;
  border: 1.5px dashed #d4af37;
  border-radius: 50%;
}
.cert-doc-seal-inner {
  width: 56px;
  height: 56px;
  background: #fff8e7;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cert-doc-seal-icon {
  font-size: 22px;
  color: #d4af37;
  font-weight: 800;
  line-height: 1;
}
.cert-doc-seal-text {
  font-size: 8px;
  color: #1a1a2e;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-top: 1px;
}

@media (max-width: 600px) {
  .cert-doc { padding: 8px; }
  .cert-doc-inner { padding: 16px 18px; }
  .cert-doc-title { font-size: 22px; }
  .cert-doc-name { font-size: 22px; margin: 0 8px 8px; }
  .cert-doc-course { font-size: 16px; }
  .cert-doc-achievements { grid-template-columns: repeat(2, 1fr); margin: 0 8px 10px; }
  .cert-doc-stat span { font-size: 15px; }
  .cert-doc-footer { gap: 8px; }
  .cert-doc-seal-circle { width: 52px; height: 52px; }
  .cert-doc-seal-inner { width: 42px; height: 42px; }
  .cert-doc-seal-icon { font-size: 18px; }
  .cert-doc-seal-text { font-size: 7px; }
  .cert-doc-value { font-size: 11px; }
  .cert-doc-label { font-size: 8.5px; }
  .cert-doc-sublabel { font-size: 8.5px; }
}
    `;
  }
  
  // ---- Public API ----
  window.gamCert = {
    open: open,
    isEligible: () => getCertificateType().eligible,
  };
  
  // ---- Inject base CSS for the cert modal ----
  function injectCertCSS() {
    if (document.getElementById('cert-styles')) return;
    const style = document.createElement('style');
    style.id = 'cert-styles';
    style.textContent = `
/* Cert modal */
#cert-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.78);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .3s;
  padding: 14px;
  backdrop-filter: blur(4px);
}
#cert-modal.show { opacity: 1; }

.cert-modal-inner {
  background: #1a1f3a;
  border-radius: 14px;
  padding: 18px 14px;
  max-width: 720px;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  color: #fff;
  position: relative;
  font-family: -apple-system, "Heebo", "Segoe UI", Roboto, sans-serif;
}

.cert-close {
  position: absolute;
  top: 8px;
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 26px;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  line-height: 1;
}
[dir="ltr"] .cert-close { right: 8px; }
[dir="rtl"] .cert-close { left: 8px; }
.cert-close:hover { color: #fff; background: rgba(255,255,255,0.1); }

.cert-modal-title { font-size: 18px; text-align: center; margin: 0 0 12px; color: #ffd700; }

.cert-eligible-banner {
  background: linear-gradient(135deg, #00d4aa 0%, #00a884 100%);
  color: #fff;
  padding: 9px;
  border-radius: 9px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
}

.cert-name-input-wrap {
  margin-bottom: 12px;
}
.cert-name-input-wrap label {
  display: block;
  font-size: 12.5px;
  margin-bottom: 4px;
  color: #aab;
  font-weight: 600;
}
.cert-name-input-wrap input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  background: #252a52;
  border: 1.5px solid #353a6b;
  color: #fff;
  font-size: 15px;
  box-sizing: border-box;
  font-family: inherit;
}
.cert-name-input-wrap input:focus { outline: none; border-color: #ffd700; }

.cert-preview-wrap {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 9px;
  margin-bottom: 12px;
  overflow: auto;
}
.cert-preview {
  transform-origin: top center;
}
${getCertificateCSS()}
/* Scale preview down */
.cert-preview .cert-doc { transform: scale(0.85); transform-origin: top center; margin-bottom: -10%; }

.cert-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.cert-btn {
  padding: 11px;
  border-radius: 9px;
  border: none;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
}
.cert-btn-primary {
  background: linear-gradient(135deg, #ffd700 0%, #ff8800 100%);
  color: #1a1a2e;
}
.cert-btn-share {
  background: #0077b5;
  color: #fff;
}
.cert-btn:hover, .cert-btn:active { transform: scale(0.98); }

.cert-stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  text-align: center;
  font-size: 10px;
  color: #aab;
  padding-top: 12px;
  border-top: 1px solid #353a6b;
}
.cert-stats-strip strong {
  display: block;
  font-size: 16px;
  color: #ffd700;
  margin-bottom: 2px;
}

/* Locked state */
.cert-locked { text-align: center; padding: 16px 8px; }
.cert-locked-icon { font-size: 56px; margin-bottom: 8px; opacity: 0.6; }
.cert-locked h2 { font-size: 19px; margin: 8px 0 6px; color: #ffd700; }
.cert-locked p { color: #aab; font-size: 13.5px; margin-bottom: 14px; }
.cert-progress-wrap { margin-bottom: 14px; }
.cert-progress-bar {
  width: 100%;
  height: 12px;
  background: #14172a;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
}
.cert-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd700 0%, #ff8800 100%);
  border-radius: 8px;
  transition: width .5s ease;
}
.cert-progress-text { font-size: 12.5px; color: #ffd700; font-weight: 700; }
.cert-stats-mini {
  background: #252a52;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: ${IS_RTL ? 'right' : 'left'};
}
.cert-stats-mini strong { color: #ffd700; }

@media (max-width: 480px) {
  .cert-modal-inner { padding: 14px 10px; }
  .cert-modal-title { font-size: 16px; }
  .cert-preview .cert-doc { transform: scale(0.55); transform-origin: top center; }
  .cert-preview-wrap { padding: 6px; max-height: 220px; }
  .cert-actions { grid-template-columns: 1fr; }
  .cert-btn { padding: 10px; font-size: 13px; }
  .cert-stats-strip strong { font-size: 14px; }
  .cert-stats-strip { font-size: 9.5px; gap: 3px; }
}
    `;
    document.head.appendChild(style);
  }
  
  // ---- Add certificate button to gam panel ----
  function addCertButton() {
    // Watch for gam panel to open
    const obs = new MutationObserver(() => {
      const panel = document.getElementById('gam-panel');
      if (panel && !panel.querySelector('.cert-link-btn')) {
        const footer = panel.querySelector('.gam-footer');
        if (footer) {
          const link = document.createElement('button');
          link.className = 'cert-link-btn';
          link.textContent = '🏆 ' + (IS_RTL ? 'תעודת השלמה' : 'Certificate');
          link.style.cssText = `
            margin-top: 12px;
            padding: 10px 16px;
            background: linear-gradient(135deg, #ffd700 0%, #ff8800 100%);
            color: #1a1a2e;
            border: none;
            border-radius: 9px;
            font-size: 13.5px;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            font-family: inherit;
          `;
          link.addEventListener('click', () => {
            // Close gam panel first
            const closeBtn = panel.querySelector('.gam-panel-close');
            if (closeBtn) closeBtn.click();
            setTimeout(open, 350);
          });
          footer.appendChild(link);
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: false });
  }
  
  function init() {
    injectCertCSS();
    addCertButton();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
