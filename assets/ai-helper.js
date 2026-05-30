/* ============================================================
   AI ERROR HELPER — Smart error explanations
   No external API needed - uses pattern matching + offline rules
   Works in Hebrew (RTL) and English (LTR)
   ============================================================ */

(function() {
  'use strict';
  
  const IS_RTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'he';
  
  // ---- Error patterns and explanations ----
  // Each entry: { match: regex, he: explanation, en: explanation, hint: suggestion }
  const ERROR_PATTERNS = [
    {
      match: /NameError.*name '(\w+)' is not defined/i,
      he: (m) => `<b>NameError</b>: המשתנה <code>${m[1]}</code> לא הוגדר. 🤔`,
      en: (m) => `<b>NameError</b>: The variable <code>${m[1]}</code> is not defined. 🤔`,
      hint_he: (m) => [
        `📝 בדוק שלא שכחת להגדיר את המשתנה לפני שאתה משתמש בו.`,
        `🔤 ייתכן שיש typo (שגיאת כתיב) בשם המשתנה — שמות בפייתון רגישים לאותיות גדולות/קטנות.`,
        `💡 דוגמה תקינה: <code>${m[1]} = 10</code> ואז <code>print(${m[1]})</code>`,
      ],
      hint_en: (m) => [
        `📝 Check that you defined the variable before using it.`,
        `🔤 There may be a typo in the name — Python names are case-sensitive.`,
        `💡 Valid example: <code>${m[1]} = 10</code> then <code>print(${m[1]})</code>`,
      ],
    },
    {
      match: /SyntaxError.*expected/i,
      he: () => `<b>SyntaxError</b>: יש שגיאה במבנה הקוד. ✏️`,
      en: () => `<b>SyntaxError</b>: There's a problem in the code structure. ✏️`,
      hint_he: () => [
        `🔍 בדוק שיש סוגריים פתיחה וסגירה לכל הקריאות.`,
        `🔍 בדוק שיש <code>:</code> בסוף שורות של <code>if</code>, <code>for</code>, <code>while</code>, <code>def</code>.`,
        `🔍 בדוק שאין גרשיים פתוחות בלי סגירה — לדוגמה <code>"hello</code> צריך להיות <code>"hello"</code>.`,
      ],
      hint_en: () => [
        `🔍 Check that all parentheses are properly opened and closed.`,
        `🔍 Check for the <code>:</code> at the end of <code>if</code>, <code>for</code>, <code>while</code>, <code>def</code> lines.`,
        `🔍 Check for unclosed quotes — e.g. <code>"hello</code> should be <code>"hello"</code>.`,
      ],
    },
    {
      match: /SyntaxError.*EOL while scanning/i,
      he: () => `<b>SyntaxError</b>: חסרה גרשיים סוגרים במחרוזת. 📝`,
      en: () => `<b>SyntaxError</b>: A string is missing a closing quote. 📝`,
      hint_he: () => [`💡 חפש מחרוזת שפותחת ב-<code>"</code> אבל לא נסגרת באותו תו.`],
      hint_en: () => [`💡 Look for a string that opens with <code>"</code> but isn't closed.`],
    },
    {
      match: /IndentationError|unexpected indent/i,
      he: () => `<b>IndentationError</b>: בעיה בהזחת השורות (רווחים בתחילה). 📐`,
      en: () => `<b>IndentationError</b>: Indentation problem (leading spaces). 📐`,
      hint_he: () => [
        `📏 בפייתון, השורות אחרי <code>if</code>, <code>for</code>, <code>def</code> צריכות להיות מוזחות (4 רווחים).`,
        `📏 ודא שכל השורות באותו בלוק מוזחות באותה כמות.`,
        `📏 אל תערבב רווחים וטאבים.`,
      ],
      hint_en: () => [
        `📏 In Python, lines after <code>if</code>, <code>for</code>, <code>def</code> must be indented (4 spaces).`,
        `📏 Make sure all lines in the same block have the same indentation.`,
        `📏 Don't mix spaces and tabs.`,
      ],
    },
    {
      match: /TypeError.*unsupported operand.*'str'.*'int'|'int'.*'str'/i,
      he: () => `<b>TypeError</b>: אי-אפשר לחבר/לבצע פעולה בין מספר למחרוזת. 🔢`,
      en: () => `<b>TypeError</b>: Cannot operate between a number and a string. 🔢`,
      hint_he: () => [
        `🔄 השתמש ב-<code>str(x)</code> כדי להמיר מספר למחרוזת.`,
        `🔄 השתמש ב-<code>int(x)</code> כדי להמיר מחרוזת למספר.`,
        `💡 דוגמה: <code>"גיל: " + str(25)</code> או <code>int("5") + 3</code>`,
      ],
      hint_en: () => [
        `🔄 Use <code>str(x)</code> to convert a number to a string.`,
        `🔄 Use <code>int(x)</code> to convert a string to a number.`,
        `💡 Example: <code>"Age: " + str(25)</code> or <code>int("5") + 3</code>`,
      ],
    },
    {
      match: /TypeError.*takes \d+.*argument.*but \d+/i,
      he: () => `<b>TypeError</b>: שלחת מספר שגוי של ארגומנטים לפונקציה. 🎯`,
      en: () => `<b>TypeError</b>: Wrong number of arguments passed to function. 🎯`,
      hint_he: () => [
        `🔍 בדוק שהפונקציה מקבלת בדיוק את מספר הארגומנטים הדרושים.`,
        `💡 אם הפונקציה מוגדרת כ-<code>def f(a, b)</code> צריך לקרוא כ-<code>f(1, 2)</code>.`,
      ],
      hint_en: () => [
        `🔍 Check that the function receives exactly the required arguments.`,
        `💡 If defined as <code>def f(a, b)</code> call as <code>f(1, 2)</code>.`,
      ],
    },
    {
      match: /ZeroDivisionError/i,
      he: () => `<b>ZeroDivisionError</b>: אי-אפשר לחלק ב-0. ➗`,
      en: () => `<b>ZeroDivisionError</b>: Cannot divide by 0. ➗`,
      hint_he: () => [
        `🔍 בדוק שהמכנה (המספר שמחלקים בו) אינו 0.`,
        `💡 הוסף תנאי לפני החלוקה: <code>if y != 0: print(x / y)</code>`,
      ],
      hint_en: () => [
        `🔍 Check that the denominator isn't 0.`,
        `💡 Add a condition: <code>if y != 0: print(x / y)</code>`,
      ],
    },
    {
      match: /IndexError.*out of range/i,
      he: () => `<b>IndexError</b>: ניסית לגשת לאיבר שלא קיים ברשימה. 📋`,
      en: () => `<b>IndexError</b>: Tried to access an item that doesn't exist in the list. 📋`,
      hint_he: () => [
        `🔢 רשימה באורך 5 — האינדקסים שלה הם 0, 1, 2, 3, 4 (לא 5!).`,
        `📏 השתמש ב-<code>len(list)</code> כדי לבדוק את אורך הרשימה.`,
        `💡 גישה לאיבר האחרון: <code>list[-1]</code>.`,
      ],
      hint_en: () => [
        `🔢 A list of length 5 has indices 0, 1, 2, 3, 4 (not 5!).`,
        `📏 Use <code>len(list)</code> to check list length.`,
        `💡 Access the last item with <code>list[-1]</code>.`,
      ],
    },
    {
      match: /KeyError.*'?([^']+)'?/i,
      he: (m) => `<b>KeyError</b>: המפתח <code>${m[1] || '?'}</code> לא קיים במילון. 🔑`,
      en: (m) => `<b>KeyError</b>: The key <code>${m[1] || '?'}</code> doesn't exist in the dictionary. 🔑`,
      hint_he: (m) => [
        `🔍 בדוק את כתיב המפתח — שמות במילון רגישים לאותיות גדולות/קטנות.`,
        `🛡 השתמש ב-<code>.get()</code> לגישה בטוחה: <code>dict.get("${m[1] || 'key'}", "default")</code>`,
        `🔍 כדי לבדוק אם מפתח קיים: <code>if "${m[1] || 'key'}" in dict:</code>`,
      ],
      hint_en: (m) => [
        `🔍 Check the key spelling — dictionary keys are case-sensitive.`,
        `🛡 Use <code>.get()</code> for safe access: <code>dict.get("${m[1] || 'key'}", "default")</code>`,
        `🔍 Check if key exists with <code>if "${m[1] || 'key'}" in dict:</code>`,
      ],
    },
    {
      match: /ValueError.*invalid literal for int/i,
      he: () => `<b>ValueError</b>: ניסית להמיר מחרוזת שאינה מספר ל-int. 🔢`,
      en: () => `<b>ValueError</b>: Tried converting a non-numeric string to int. 🔢`,
      hint_he: () => [
        `🔍 רק מחרוזות עם ספרות יכולות להפוך למספר: <code>int("123")</code> ✅`,
        `❌ לא: <code>int("abc")</code> או <code>int("3.5")</code>`,
        `💡 ל-float עם ספרות עשרוניות: <code>float("3.5")</code>`,
      ],
      hint_en: () => [
        `🔍 Only digit strings can be converted: <code>int("123")</code> ✅`,
        `❌ Not: <code>int("abc")</code> or <code>int("3.5")</code>`,
        `💡 For decimals use: <code>float("3.5")</code>`,
      ],
    },
    {
      match: /AttributeError.*'(\w+)'.*object has no attribute '(\w+)'/i,
      he: (m) => `<b>AttributeError</b>: לאובייקט מסוג <code>${m[1]}</code> אין המתודה/תכונה <code>${m[2]}</code>. ⚙️`,
      en: (m) => `<b>AttributeError</b>: Object of type <code>${m[1]}</code> has no attribute <code>${m[2]}</code>. ⚙️`,
      hint_he: (m) => [
        `🔍 בדוק את כתיב שם המתודה — Python רגיש לאותיות גדולות/קטנות.`,
        `📚 בדוק שהמתודה <code>${m[2]}</code> אכן קיימת ב-<code>${m[1]}</code>.`,
        `💡 אם זה <code>list</code>, מתודות נפוצות: <code>.append()</code>, <code>.remove()</code>, <code>.sort()</code>.`,
      ],
      hint_en: (m) => [
        `🔍 Check the method name spelling — Python is case-sensitive.`,
        `📚 Verify that <code>${m[2]}</code> exists on <code>${m[1]}</code>.`,
        `💡 If it's <code>list</code>, common methods: <code>.append()</code>, <code>.remove()</code>, <code>.sort()</code>.`,
      ],
    },
    {
      match: /FileNotFoundError/i,
      he: () => `<b>FileNotFoundError</b>: הקובץ לא נמצא. 📁`,
      en: () => `<b>FileNotFoundError</b>: File not found. 📁`,
      hint_he: () => [
        `🔍 בדוק את הנתיב לקובץ.`,
        `💡 בסימולטור שלנו אין גישה לקבצים אמיתיים — השתמש ב-<code>data.load()</code> עבור דאטהסטים.`,
      ],
      hint_en: () => [
        `🔍 Check the file path.`,
        `💡 Our simulator doesn't access real files — use <code>data.load()</code> for datasets.`,
      ],
    },
    {
      match: /ImportError|ModuleNotFoundError/i,
      he: (m) => `<b>ImportError</b>: לא ניתן לייבא את הספרייה. 📚`,
      en: (m) => `<b>ImportError</b>: Cannot import the library. 📚`,
      hint_he: () => [
        `🔍 הסימולטור (Skulpt) תומך רק בספריות מובנות: math, random, re, datetime, itertools, string, collections.`,
        `❌ אינו תומך: numpy, pandas, matplotlib (אך יש לנו DataFrame משלנו דרך <code>data.load()</code>).`,
        `💡 לעבודה אמיתית עם pandas/numpy — הורד Python למחשב או השתמש ב-Google Colab.`,
      ],
      hint_en: () => [
        `🔍 The simulator (Skulpt) only supports built-in libraries: math, random, re, datetime, itertools, string, collections.`,
        `❌ Does not support: numpy, pandas, matplotlib (but we have our own DataFrame via <code>data.load()</code>).`,
        `💡 For real pandas/numpy work — install Python locally or use Google Colab.`,
      ],
    },
    {
      match: /RecursionError|maximum recursion/i,
      he: () => `<b>RecursionError</b>: יותר מדי קריאות רקורסיביות. 🌀`,
      en: () => `<b>RecursionError</b>: Too many recursive calls. 🌀`,
      hint_he: () => [
        `🔍 ודא שיש תנאי עצירה (base case) בפונקציה הרקורסיבית.`,
        `💡 דוגמה: <code>if n == 0: return 1</code>`,
      ],
      hint_en: () => [
        `🔍 Make sure there's a base case in the recursive function.`,
        `💡 Example: <code>if n == 0: return 1</code>`,
      ],
    },
    // Generic fallback
    {
      match: /^([A-Z]\w*Error)/i,
      he: (m) => `<b>${m[1]}</b>: יש שגיאה בקוד. בדוק את ההודעה למעלה. 🔍`,
      en: (m) => `<b>${m[1]}</b>: There's an error in the code. Check the message above. 🔍`,
      hint_he: () => [
        `📖 קרא את הודעת השגיאה בקפידה — היא בדרך כלל מצביעה על מספר השורה והבעיה.`,
        `💡 אם תקועים, לחץ "הצג פתרון" וראה איך זה אמור להיראות.`,
      ],
      hint_en: () => [
        `📖 Read the error message carefully — it usually points to the line number and problem.`,
        `💡 If stuck, click "Show Solution" to see how it should look.`,
      ],
    },
  ];
  
  // ---- Main: explain an error ----
  function explainError(errorText) {
    if (!errorText || typeof errorText !== 'string') return null;
    
    for (const pat of ERROR_PATTERNS) {
      const m = errorText.match(pat.match);
      if (m) {
        const explanation = IS_RTL ? pat.he(m) : pat.en(m);
        const hintFn = IS_RTL ? pat.hint_he : pat.hint_en;
        const hints = hintFn(m);
        return { explanation, hints };
      }
    }
    return null;
  }
  
  // ---- UI: Show explanation box ----
  function showExplanation(targetEl, errorText) {
    const result = explainError(errorText);
    if (!result) return;
    
    // Remove old explanation if exists
    const old = targetEl.parentElement.querySelector('.gam-ai-helper');
    if (old) old.remove();
    
    const box = document.createElement('div');
    box.className = 'gam-ai-helper';
    
    const hintsHTML = result.hints.map(h => `<li>${h}</li>`).join('');
    
    box.innerHTML = `
      <div class="gam-ai-header">
        <span class="gam-ai-icon">🤖</span>
        <span class="gam-ai-title">${IS_RTL ? 'עוזר חכם' : 'AI Helper'}</span>
        <button class="gam-ai-close" aria-label="${IS_RTL ? 'סגור' : 'Close'}">&times;</button>
      </div>
      <div class="gam-ai-body">
        <div class="gam-ai-explain">${result.explanation}</div>
        <div class="gam-ai-hints-title">${IS_RTL ? '💡 איך לתקן:' : '💡 How to fix:'}</div>
        <ul class="gam-ai-hints">${hintsHTML}</ul>
      </div>
    `;
    
    // Insert after the target
    targetEl.parentElement.insertBefore(box, targetEl.nextSibling);
    
    // Animate in
    setTimeout(() => box.classList.add('show'), 10);
    
    // Close button
    box.querySelector('.gam-ai-close').addEventListener('click', () => {
      box.classList.remove('show');
      setTimeout(() => box.remove(), 300);
    });
  }
  
  // ---- Hook into output displays ----
  function observeOutputs() {
    // Find output boxes when they show errors
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.type === 'childList' || m.type === 'characterData') {
          const target = m.target;
          // Check if it's an output box with error content
          let el = target.nodeType === 1 ? target : target.parentElement;
          while (el && !el.classList) el = el.parentElement;
          
          if (el && el.classList && (
              el.classList.contains('output-box') ||
              el.classList.contains('out') ||
              el.id?.startsWith('out-'))) {
            const text = el.textContent || '';
            // Check for error patterns
            if (/Error:|Traceback/i.test(text)) {
              // Avoid duplicates
              if (!el.parentElement.querySelector('.gam-ai-helper')) {
                showExplanation(el, text);
              }
            }
          }
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
  
  // ---- Public API ----
  window.gamAI = {
    explain: explainError,
    show: showExplanation,
  };
  
  // ---- Init ----
  function init() {
    observeOutputs();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
