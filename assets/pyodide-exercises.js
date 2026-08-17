/* ============================================================
   ADVANCED EXERCISES - Real Python (Pyodide)
   Uses real pandas, numpy, matplotlib with Israeli datasets
   ============================================================ */

window.PYODIDE_ADVANCED_EXERCISES = {
  he: [
    // === Module 1: Visualization with matplotlib ===
    {
      module: '📊 ויזואליזציה עם matplotlib',
      topics: [
        {
          id: 'adv-viz-bar',
          title: 'גרף עמודות - מכירות חודשיות',
          theory: '<p><b>matplotlib</b> היא ספריית הגרפים המובילה בפייתון. כדי להציג גרף עמודות:</p><pre>import matplotlib.pyplot as plt\nplt.bar(x, y)\nplt.title("...")\nplt.show()</pre><p>ב-Pyodide הגרפים מופיעים אוטומטית בתוצאה.</p>',
          q: "בנה גרף עמודות של מכירות חודשיות מ-12 החודשים. בנוסף הדפס את שם החודש החזק ביותר ואת סך המכירות השנתי. חשוב: הגרף נוצר רק כשקוראים ל-plt.show(). הערה: השתמש בתוויות באנגלית — ל-matplotlib אין תמיכה בכיווניות RTL והעברית תוצג הפוכה.",
        explain: "שתי נקודות מפתח. ראשית, המודול הזה רץ על Pyodide — Python אמיתי בדפדפן עם matplotlib, numpy ו-pandas מקוריים — ולא על Skulpt שמריץ את שאר הקורס. לכן כאן מותר לכתוב df[df[\"age\"] > 28], בעוד שבשאר הקורס חייבים df[df[\"age\"].gt(28)]. שנית, הגרף לא מופיע לבד: הסביבה דורסת את plt.show() בפונקציה שממירה את הציור ל-PNG. בלי קריאה מפורשת ל-plt.show() לא תיווצר תמונה. לבסוף, כתוב תוויות באנגלית — matplotlib מצייר תווים לפי סדר לוגי בלי היפוך bidi, ולכן טקסט עברי יופיע הפוך על הגרף.",
          starter: "import matplotlib.pyplot as plt\n\nmonths = [\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\",\"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"]\nrevenue = [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89]\n\n# הדפס חודש שיא + סך הכל, ואז בנה גרף עמודות:",
          solution: "import matplotlib.pyplot as plt\n\nmonths = [\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\",\"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"]\nrevenue = [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89]\n\nbest = months[revenue.index(max(revenue))]\nprint(\"Best month:\", best)\nprint(\"Total:\", sum(revenue))\n\nplt.figure(figsize=(10,5))\nplt.bar(months, revenue, color=\"steelblue\")\nplt.title(\"Monthly Revenue 2024\")\nplt.xlabel(\"Month\")\nplt.ylabel(\"Revenue (K NIS)\")\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && output.includes('Dec') && output.includes('720'),
          hint: 'plt.bar(months, revenue) ואחר כך plt.show()'
        },
        {
          id: 'adv-viz-line',
          title: 'גרף קו - מגמת קורונה',
          theory: '<p>גרף קו טוב להצגת מגמה לאורך זמן. השתמש ב-<code>plt.plot()</code>.</p><pre>plt.plot(x, y, marker="o")</pre>',
          q: "בנה גרף קו של מקרי קורונה לאורך 8 שבועות, והדפס את שיא המקרים ואת התאריך שבו הוא נמדד. השתמש בתוויות באנגלית (ל-matplotlib אין תמיכת RTL).",
        explain: "גרף קו מתאים למגמה לאורך זמן, אבל שים לב למה שקורה מתחת לפני השטח: כשציר ה-X הוא רשימת מחרוזות, matplotlib מפזר אותן במרווחים שווים ולא לפי המרחק האמיתי בזמן. כאן זה תקין כי הדגימות שבועיות, אבל עם תאריכים לא אחידים תקבל גרף מטעה — ואז הפתרון הוא pd.to_datetime שיהפוך אותם לציר זמן אמיתי. marker='o' חשוב: הוא מראה איפה נמדדו הנקודות בפועל, לעומת הקו שרק מחבר ביניהן באינטרפולציה.",
          starter: "import matplotlib.pyplot as plt\n\ndates = [\"01/01\",\"08/01\",\"15/01\",\"22/01\",\"29/01\",\"05/02\",\"12/02\",\"19/02\"]\npositive = [3200, 4500, 6100, 8200, 7800, 5300, 3900, 2400]\n\n# הדפס את השיא ואת התאריך שלו, ואז בנה גרף קו:",
          solution: "import matplotlib.pyplot as plt\n\ndates = [\"01/01\",\"08/01\",\"15/01\",\"22/01\",\"29/01\",\"05/02\",\"12/02\",\"19/02\"]\npositive = [3200, 4500, 6100, 8200, 7800, 5300, 3900, 2400]\n\npeak = max(positive)\nprint(\"Peak:\", peak, \"on\", dates[positive.index(peak)])\n\nplt.figure(figsize=(10,5))\nplt.plot(dates, positive, marker=\"o\", color=\"crimson\", linewidth=2)\nplt.title(\"COVID cases - trend\")\nplt.xlabel(\"Date\")\nplt.ylabel(\"Positive cases\")\nplt.xticks(rotation=45)\nplt.grid(True, alpha=0.3)\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && output.includes('8200') && output.includes('22/01'),
          hint: 'plt.plot(dates, positive, marker="o")'
        },
        {
          id: 'adv-viz-pie',
          title: 'גרף עוגה - התפלגות מחלקות',
          theory: '<p>גרף עוגה מציג חלקים מסך. <code>plt.pie(values, labels=...)</code>.</p>',
          q: "בנה גרף עוגה של עובדים לפי מחלקה (Sales: 5, R&D: 4, Marketing: 3), והדפס לכל מחלקה את האחוז שלה מסך העובדים (ספרה אחת אחרי הנקודה).",
        explain: "גרף עוגה עונה על שאלה אחת בלבד: איזה חלק מהשלם. הוא תקף רק כשהקטגוריות זרות וסכומן 100 אחוז — למשל מחלקות של עובדים. הוא לא מתאים להשוואת גדלים: העין מתקשה להשוות שטחי פרוסות, ובדיוק כאן, עם 5/4/3, ההפרש כמעט לא נראה. לכן אנליסטים מעדיפים במקרה כזה גרף עמודות. לגבי autopct='%1.1f%%': זו מחרוזת פורמט, ו-%% הוא הדרך לכתוב סימן אחוז ספרותי בתוכה.",
          starter: "import matplotlib.pyplot as plt\n\ndepartments = [\"Sales\", \"R&D\", \"Marketing\"]\nemployees = [5, 4, 3]\n\n# הדפס אחוזים לכל מחלקה, ואז גרף עוגה:",
          solution: "import matplotlib.pyplot as plt\n\ndepartments = [\"Sales\", \"R&D\", \"Marketing\"]\nemployees = [5, 4, 3]\n\ntotal = sum(employees)\nfor d, e in zip(departments, employees):\n    print(f\"{d}: {e / total * 100:.1f}%\")\n\nplt.figure(figsize=(7,7))\nplt.pie(employees, labels=departments, autopct=\"%1.1f%%\",\n        colors=[\"#ff6b6b\",\"#4ecdc4\",\"#ffe66d\"])\nplt.title(\"Employees by department\")\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && output.includes('41.7') && output.includes('33.3') && output.includes('25.0'),
          hint: 'plt.pie(employees, labels=departments, autopct="%1.1f%%")'
        },
        {
          id: 'adv-viz-scatter',
          title: 'Scatter plot - שכר מול ותק',
          theory: '<p>Scatter plot מציג קשר בין שני משתנים. <code>plt.scatter(x, y)</code>.</p>',
          q: "בנה scatter plot של שכר (y) מול ותק בשנים (x), והדפס את מקדם המתאם (Pearson) בין השניים בשלוש ספרות אחרי הנקודה. השתמש בתוויות באנגלית.",
        explain: "scatter plot הוא הכלי הראשון שאנליסט מפעיל כשהוא בודק קשר בין שני משתנים, והסיבה היא שהוא מראה מה שמקדם המתאם מסתיר. מקדם 0.978 אומר 'קשר לינארי חזק', אבל אותו מספר יכול לצאת גם מענן נקודות עם חריג בודד שמושך את הקו. רק הגרף מראה לך את צורת הקשר, את עוצמת הפיזור ואת החריגים. לכן הכלל הוא: תמיד להסתכל על הגרף לפני שמצטטים מספר.",
          starter: "import matplotlib.pyplot as plt\nimport numpy as np\n\nyears = [2,5,3,1,7,4,2,8,3,6,1,4]\nsalary = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\n# הדפס מקדם מתאם ובנה scatter plot:",
          solution: "import matplotlib.pyplot as plt\nimport numpy as np\n\nyears = [2,5,3,1,7,4,2,8,3,6,1,4]\nsalary = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\nr = np.corrcoef(years, salary)[0, 1]\nprint(f\"Correlation: {r:.3f}\")\n\nplt.figure(figsize=(8,6))\nplt.scatter(years, salary, s=80, c=\"purple\", alpha=0.7)\nplt.title(\"Salary vs Experience\")\nplt.xlabel(\"Years of experience\")\nplt.ylabel(\"Monthly salary (NIS)\")\nplt.grid(True, alpha=0.3)\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && /0\.97[78]/.test(output),
          hint: 'plt.scatter(years, salary)'
        },
        {
          id: 'adv-viz-hist',
          title: 'היסטוגרמה - התפלגות גילאים',
          theory: '<p>היסטוגרמה מציגה התפלגות של ערכים. <code>plt.hist(data, bins=10)</code>.</p>',
          q: "בנה היסטוגרמה של גילאי 15 לקוחות עם 5 bins, והדפס את ספירת הפריטים בכל bin ואת גבולות ה-bins (רמז: np.histogram מחזיר בדיוק את שניהם). תוויות באנגלית.",
        explain: "היסטוגרמה שונה מגרף עמודות: גרף עמודות מציג קטגוריות נפרדות, והיסטוגרמה חותכת משתנה רציף לטווחים (bins) וסופרת כמה ערכים נפלו בכל טווח. לכן העמודות נוגעות זו בזו — הן מייצגות רצף. הדבר הקריטי: מספר ה-bins הוא החלטה שלך, והוא משנה את המסקנה. כאן, עם 15 גילאים ו-5 bins, קיבלת [4, 4, 3, 2, 2] — התפלגות שיורדת. נסה bins=3 או bins=10 ותראה צורה אחרת לגמרי. לכן לפני שמצהירים 'ההתפלגות נוטה ימינה' צריך לבדוק שהצורה יציבה למספר bins שונים.",
          starter: "import matplotlib.pyplot as plt\nimport numpy as np\n\nages = [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]\n\n# הדפס counts ו-edges עם np.histogram, ואז צייר היסטוגרמה:",
          solution: "import matplotlib.pyplot as plt\nimport numpy as np\n\nages = [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]\n\ncounts, edges = np.histogram(ages, bins=5)\nprint(\"Counts:\", counts.tolist())\nprint(\"Edges:\", edges.tolist())\n\nplt.figure(figsize=(8,5))\nplt.hist(ages, bins=5, color=\"teal\", edgecolor=\"white\")\nplt.title(\"Customer age distribution\")\nplt.xlabel(\"Age\")\nplt.ylabel(\"Number of customers\")\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && /4[,\s]+4[,\s]+3[,\s]+2[,\s]+2/.test(output),
          hint: 'plt.hist(ages, bins=5)'
        },
      ]
    },
    // === Module 2: NumPy ===
    {
      module: '🧮 NumPy - חישובים מהירים',
      topics: [
        {
          id: 'adv-np-array',
          title: 'מערכים ופעולות וקטוריות',
          theory: '<p>NumPy arrays מאפשרים פעולות וקטוריות מהירות (פי 100 מ-Python רגיל):</p><pre>import numpy as np\narr = np.array([1, 2, 3, 4])\nprint(arr * 2)  # [2, 4, 6, 8]\nprint(arr.mean())  # 2.5</pre>',
          q: "צור מערך numpy של ציוני מבחן [88, 76, 92, 84, 70, 95]. הדפס ממוצע, מקסימום וסטיית תקן, כל אחד ב-3 ספרות אחרי הנקודה. השתמש ב-.std() כפי שהוא (ddof=0, סטיית תקן של אוכלוסייה).",
        explain: "numpy array הוא לא רשימה: הפעולות עליו וקטוריות ומבוצעות בקוד C על בלוק זיכרון רציף, ולכן scores.mean() מהיר בהרבה מלולאה. הנקודה שחייבים לזכור: ל-numpy ול-pandas יש ברירות מחדל שונות לסטיית תקן. numpy מחשב כברירת מחדל ddof=0, כלומר סטיית תקן של אוכלוסייה, ומחזיר כאן 8.764. pandas מחשב כברירת מחדל ddof=1, כלומר של מדגם, ומחזיר על אותם נתונים 9.600. ההפרש הוא כמעט 10 אחוז. כשמדובר במדגם מתוך אוכלוסייה גדולה יותר, הערך הנכון הוא ddof=1 — כלומר np.std(x, ddof=1).",
          starter: "import numpy as np\n\nscores = np.array([88, 76, 92, 84, 70, 95])\n\n# ממוצע, מקסימום, סטיית תקן (3 ספרות):",
          solution: "import numpy as np\n\nscores = np.array([88, 76, 92, 84, 70, 95])\n\nprint(f\"ממוצע: {scores.mean():.3f}\")\nprint(f\"מקסימום: {scores.max()}\")\nprint(f\"סטיית תקן (ddof=0): {scores.std():.3f}\")",
          check: (output) => /84\.1[67]/.test(output) && output.includes('95') && /8\.76/.test(output),
          hint: 'scores.mean(), scores.max(), scores.std()'
        },
        {
          id: 'adv-np-stats',
          title: 'סטטיסטיקה תיאורית',
          theory: '<p><code>np.percentile()</code>, <code>np.median()</code>, <code>np.var()</code> לסטטיסטיקה מתקדמת.</p>',
          q: "יש 12 משכורות. הדפס: חציון, רבעון Q1, רבעון Q3, את ה-IQR (ההפרש Q3-Q1) ואת השונות. כל הערכים ללא ספרות עשרוניות.",
        explain: "חציון ורבעונים עמידים בפני חריגים, ובזה כוחם: מנהל אחד שמרוויח מיליון מזיז את הממוצע דרמטית ולא נוגע בחציון. שים לב לדבר שמבלבל: Q1 יצא 14750 — מספר שלא מופיע ברשימת המשכורות. זה לא באג. np.percentile מבצע כברירת מחדל אינטרפולציה לינארית בין שתי התצפיות שמשני צדי נקודת ה-25 אחוז, ולכן התוצאה יכולה להיות ערך ביניים. ה-IQR (7500) הוא הכלי המעשי: כל ערך מתחת ל-Q1-1.5*IQR או מעל Q3+1.5*IQR נחשב חריג — זו בדיוק ההגדרה שעליה בנוי boxplot.",
          starter: "import numpy as np\n\nsalaries = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000])\n\n# חציון, Q1, Q3, IQR, שונות:",
          solution: "import numpy as np\n\nsalaries = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000])\n\nprint(f\"חציון: {np.median(salaries):.0f}\")\nprint(f\"Q1 (25%): {np.percentile(salaries, 25):.0f}\")\nprint(f\"Q3 (75%): {np.percentile(salaries, 75):.0f}\")\nprint(f\"IQR: {np.percentile(salaries, 75) - np.percentile(salaries, 25):.0f}\")\nprint(f\"שונות (ddof=0): {np.var(salaries):.0f}\")",
          check: (output) => output.includes('17500') && output.includes('14750') && output.includes('22250'),
          hint: 'np.median(), np.percentile(salaries, 25)'
        },
        {
          id: 'adv-np-random',
          title: 'יצירת נתונים אקראיים',
          theory: '<p><code>np.random</code> ליצירת נתונים אקראיים לבדיקות:</p><pre>np.random.seed(42)  # לשחזור\nnp.random.randint(1, 100, 10)  # 10 מספרים בין 1-100\nnp.random.normal(50, 10, 100)  # התפלגות נורמלית</pre>',
          q: "צור 100 נתונים אקראיים בהתפלגות נורמלית עם ממוצע 75 וסטיית תקן 10, עם seed=42. הדפס את הממוצע ואת סטיית התקן שהתקבלו בפועל (2 ספרות אחרי הנקודה) והשווה אותם לערכים שביקשת.",
        explain: "ביקשת ממוצע 75 וקיבלת 73.96; ביקשת סטיית תקן 10 וקיבלת 9.04. זו לא שגיאה — זו שגיאת דגימה. 100 דגימות הן מדגם קטן, והממוצע שלו מתנדנד סביב הממוצע האמיתי בסטייה טיפוסית של כ-10 חלקי שורש 100, כלומר כ-1. אם תשנה ל-10000 דגימות תראה את הממוצע מתקרב מאוד ל-75. זהו חוק המספרים הגדולים, והוא הסיבה שאסור להסיק מסקנות ממדגמים קטנים. np.random.seed(42) הוא מה שהופך את התוצאה לדטרמיניסטית וניתנת לשחזור. היום numpy ממליץ על ה-API החדש: rng = np.random.default_rng(42) ואז rng.normal(75, 10, 100).",
          starter: "import numpy as np\n\nnp.random.seed(42)\n# צור 100 דגימות והדפס ממוצע וסטיית תקן בפועל:",
          solution: "import numpy as np\n\nnp.random.seed(42)\ndata = np.random.normal(75, 10, 100)\nprint(f\"ממוצע בפועל: {data.mean():.2f}\")\nprint(f\"סטיית תקן בפועל: {data.std():.2f}\")",
          check: (output) => output.includes('73.96') && output.includes('9.04'),
          hint: 'np.random.normal(75, 10, 100)'
        },
        {
          id: 'adv-np-matrix',
          title: 'מטריצות וכפל',
          theory: '<p>NumPy מתמחה במטריצות:</p><pre>a = np.array([[1,2],[3,4]])\nb = np.array([[5,6],[7,8]])\nprint(a @ b)  # כפל מטריצות</pre>',
          q: "נתונות שתי מטריצות 3x3. חשב את מכפלת המטריצות A @ B והדפס אותה. לאחר מכן הדפס גם את A * B (כפל איבר-איבר) והשווה — שים לב שהתוצאות שונות לגמרי.",
        explain: "שתי הפעולות מחזירות מטריצה 3x3 ואף אחת מהן לא זורקת שגיאה — ובכל זאת הן שונות לחלוטין. A * B הוא כפל איבר-איבר: כל תא מוכפל בתא המקביל. A @ B הוא כפל מטריצות: כל תא בתוצאה הוא מכפלה סקלרית של שורה מ-A בעמודה מ-B. לכן A@B נתן 21 במרכז ו-A*B נתן 15. זו טעות המתחילים הנפוצה ביותר ב-numpy, והיא שקטה — הקוד רץ ומחזיר תוצאה לא נכונה. שים לב גם: כפל מטריצות אינו חילופי, A @ B בדרך כלל שונה מ-B @ A. ולתשומת לבך, אילו B הייתה מטריצת היחידה, A @ B היה מחזיר את A עצמה.",
          starter: "import numpy as np\n\nA = np.array([[1,2,3],[4,5,6],[7,8,9]])\nB = np.array([[2,0,1],[1,3,0],[0,1,2]])\n\n# הדפס A @ B ואז A * B:",
          solution: "import numpy as np\n\nA = np.array([[1,2,3],[4,5,6],[7,8,9]])\nB = np.array([[2,0,1],[1,3,0],[0,1,2]])\n\nresult = A @ B\nprint(result)\nprint(\"A*B (elementwise, NOT matrix mult):\")\nprint(A * B)",
          check: (output) => output.includes('21') && output.includes('33') && output.includes('25') && output.includes('13'),
          hint: 'A @ B'
        },
      ]
    },
    // === Module 3: pandas advanced ===
    {
      module: '🐼 Pandas מתקדם (אמיתי)',
      topics: [
        {
          id: 'adv-pd-create',
          title: 'יצירת DataFrame אמיתי',
          theory: '<p>עם pandas אמיתי יש לנו כל הכוח של DataFrame:</p><pre>import pandas as pd\ndf = pd.DataFrame({\n    "name": ["Avi", "Bnei"],\n    "salary": [15000, 22000]\n})\ndf.describe()  # סטטיסטיקה מלאה</pre>',
          q: "נתון DataFrame של 12 עובדים עם העמודות name, department, salary, years. הדפס את הסטטיסטיקה התיאורית שלו באמצעות describe(). שים לב אילו עמודות מופיעות בפלט ואילו לא.",
        explain: "describe() הוא המבט הראשון על כל DataFrame חדש, והוא נותן במכה אחת count, mean, std, min, max ואת שלושת הרבעונים. שים לב לשתי נקודות. ראשית, בפלט הופיעו רק salary ו-years — describe() מתעלם כברירת מחדל מעמודות לא מספריות. כדי לראות גם את name ו-department צריך describe(include='all'), ואז תקבל עבורן count, unique, top ו-freq. שנית, השורה 50% היא החציון. השוו אותה לשורת mean: כאן 17500 מול 18500, כלומר הממוצע גבוה מהחציון — סימן לזנב ימני, כמה משכורות גבוהות שמושכות את הממוצע כלפי מעלה.",
          starter: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\n\ndf = pd.DataFrame(data)\n# הדפס describe:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\n\ndf = pd.DataFrame(data)\nprint(df.describe())',
          check: (output) => output.includes('18500') && output.includes('5036') && (output.includes('mean') || output.includes('std')),
          hint: 'df.describe() נותן סטטיסטיקה מלאה'
        },
        {
          id: 'adv-pd-filter',
          title: 'סינון מתקדם עם תנאים',
          theory: '<p>בpandas אמיתי - סינון וקטורי:</p><pre>df[df["salary"] > 20000]  # שכר מעל 20K\ndf[(df["years"] > 3) & (df["department"] == "Sales")]\n</pre>',
          q: "סנן מהטבלה את העובדים שמשכורתם גדולה מ-18000 וגם הוותק שלהם גדול מ-3 שנים. הדפס את רשימת שמותיהם ואת מספרם. (רמז: יש יותר משלושה)",
        explain: "שים לב היטב לסוגריים: df[(df[\"salary\"] > 18000) & (df[\"years\"] > 3)]. הם חובה, לא סגנון. בפייתון ל-& יש קדימות גבוהה יותר מאשר ל->, ולכן בלי הסוגריים פייתון ינסה לחשב 18000 & df[\"years\"] ותקבל ValueError. שים לב גם שכותבים & ולא and: המילה and מנסה להמיר Series שלם לערך בוליאני יחיד ונכשלת, בעוד ש-& פועל איבר-איבר ומייצר מסכה בוליאנית באורך הטבלה. נקודה חשובה על הסביבה: המודול הזה רץ על Pyodide עם pandas אמיתי, ולכן df[df[\"salary\"] > 18000] עובד. בשאר הקורס, שרץ על Skulpt, אופרטור ההשוואה נכפה ל-bool והתחביר הזה בלתי אפשרי — שם הגשר הוא df[df[\"salary\"].gt(18000)]. התשובה הנכונה כאן היא חמישה עובדים, ולא שלושה: קל לשכוח את Liat עם 19000 ו-4 שנים.",
          starter: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\n# סנן:\n',
          solution: "import pandas as pd\n\ndata = {\n    \"name\": [\"Avi\",\"Bni\",\"Galit\",\"Dana\",\"Hila\",\"Victor\",\"Zohar\",\"Hani\",\"Tal\",\"Yossi\",\"Carmel\",\"Liat\"],\n    \"salary\": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    \"years\": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\nresult = df[(df[\"salary\"] > 18000) & (df[\"years\"] > 3)]\nprint(result[\"name\"].tolist())\nprint(\"count:\", len(result))",
          check: (output) => ['Bni','Hila','Hani','Yossi','Liat'].every(n => output.includes(n)) && !output.includes('Avi') && !output.includes('Carmel') && !output.includes('Galit'),
          hint: 'df[(df["salary"] > 18000) & (df["years"] > 3)]'
        },
        {
          id: 'adv-pd-groupby',
          title: 'GroupBy עם aggregation מרובה',
          theory: '<p><code>.agg()</code> מאפשרת aggregations שונים בו-זמנית:</p><pre>df.groupby("department").agg({\n    "salary": ["mean", "sum", "count"],\n    "years": "max"\n})</pre>',
          q: "קבץ את הטבלה לפי department והצג בטבלה אחת: ממוצע שכר, סך שכר, מספר העובדים ומקסימום הוותק בכל מחלקה.",
        explain: "groupby מבצע שלושה שלבים: פיצול לקבוצות, החלת פונקציה על כל קבוצה, ואיחוד התוצאות חזרה לטבלה. .agg() עם מילון הוא הצורה החזקה: הוא מאפשר aggregations שונים לעמודות שונות בקריאה אחת. שים לב לתוצאה: מכיוון שהעברת ל-salary רשימה של שלוש פונקציות, פנדס בנה כותרת דו-שכבתית (MultiIndex). המשמעות המעשית היא שגישה לעמודה נעשית עם צמד: result[(\"salary\", \"mean\")], ולא result[\"mean\"]. כדי לקבל טבלה שטוחה ורגילה השתמש ב-.reset_index() או ב-groupby(..., as_index=False). שים לב גם ש-department הפך לאינדקס, והקבוצות מוינו אלפביתית באופן אוטומטי.",
          starter: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\n# קבץ:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\nresult = df.groupby("department").agg({\n    "salary": ["mean", "sum", "count"],\n    "years": "max"\n})\nprint(result)',
          check: (output) => output.includes('24500') && output.includes('98000') && output.includes('85000') && output.includes('39000'),
          hint: 'df.groupby("department").agg({"salary": ["mean", "sum"], "years": "max"})'
        },
        {
          id: 'adv-pd-pivot',
          title: 'Pivot Table',
          theory: '<p><code>pd.pivot_table()</code> דומה לאקסל - שורות, עמודות, ערכים:</p><pre>df.pivot_table(index="dept", columns="plan", values="salary", aggfunc="mean")</pre>',
          q: "הוסף לטבלה עמודת seniority המסווגת כל עובד כ-Senior אם הוותק שלו 4 שנים ומעלה, אחרת Junior. לאחר מכן צור pivot table של שכר ממוצע: שורות=department, עמודות=seniority. שים לב לתאים הריקים בתוצאה והסבר לעצמך מה הם אומרים.",
        explain: "pivot_table בונה טבלה דו-ממדית: ערך אחד לכל הצטלבות של שורה ועמודה. שים לב ש-aggfunc היא ברירת מחדל 'mean' ולא 'sum' — אם רצית סכום, ציין זאת במפורש. הדבר החשוב בפלט הוא שני תאי ה-NaN. אין ב-R&D אף Junior ואין ב-Marketing אף Senior, ולכן אין מה למצע. NaN כאן פירושו 'אין נתון' ולא 'אפס'. זו הבחנה קריטית: אם תוסיף fill_value=0 הטבלה תיראה נקייה יותר, אבל תשדר מסר שקרי — שממוצע השכר של Juniors ב-R&D הוא אפס, במקום שאין שם Juniors בכלל. מלא אפסים רק כשאפס הוא באמת התשובה הנכונה, למשל בספירות. שווה להכיר גם את margins=True שמוסיף שורת ועמודת סיכום.",
          starter: "import pandas as pd\n\ndata = {\n    \"department\": [\"Sales\",\"R&D\",\"Sales\",\"Marketing\",\"R&D\",\"Sales\",\"Marketing\",\"R&D\",\"Sales\",\"R&D\",\"Marketing\",\"Sales\"],\n    \"salary\": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    \"years\": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\n# הוסף seniority ואז בנה pivot_table:",
          solution: "import pandas as pd\n\ndata = {\n    \"department\": [\"Sales\",\"R&D\",\"Sales\",\"Marketing\",\"R&D\",\"Sales\",\"Marketing\",\"R&D\",\"Sales\",\"R&D\",\"Marketing\",\"Sales\"],\n    \"salary\": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    \"years\": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\ndf[\"seniority\"] = df[\"years\"].apply(lambda y: \"Senior\" if y >= 4 else \"Junior\")\n\nresult = df.pivot_table(index=\"department\", columns=\"seniority\", values=\"salary\", aggfunc=\"mean\")\nprint(result)\nprint(\"NaN = no employee in that combination\")",
          check: (output) => output.includes('Senior') && output.includes('Junior') && output.includes('24500') && /1666[67]/.test(output) && output.includes('17500'),
          hint: 'pivot_table(index="department", columns="seniority", values="salary", aggfunc="mean")'
        },
        {
          id: 'adv-pd-merge',
          title: 'Merge - חיבור 2 טבלאות',
          theory: '<p><code>pd.merge()</code> כמו JOIN ב-SQL:</p><pre>pd.merge(df1, df2, on="id", how="inner")</pre>',
          q: "חבר בין טבלת employees לטבלת departments לפי dept_id באמצעות inner join, הדפס את הטבלה המאוחדת ואת מספר השורות שהתקבל. אחר כך שנה how ל-'left' ובדוק אם התוצאה השתנתה — ושאל את עצמך למה.",
        explain: "pd.merge הוא ה-JOIN של pandas: הוא מתאים שורות בין שתי טבלאות לפי מפתח משותף. הפרמטר how קובע מה קורה לשורות שלא מצאו התאמה. inner משאיר רק שורות שנמצאה להן התאמה בשתי הטבלאות. left משאיר את כל שורות הטבלה השמאלית וממלא NaN בעמודות שלא נמצאו. כאן שתי האפשרויות מחזירות אותן 4 שורות, כי לכל עובד יש dept_id קיים — אבל אל תסיק מכך שאין הבדל. נסה להוסיף עובד עם dept_id=4 ותראה מיד: ב-inner הוא נעלם בשקט, ב-left הוא נשאר עם NaN. ההיעלמות השקטה הזו היא באג נפוץ מאוד: בדוק תמיד את len(result) מול len הטבלה המקורית.",
          starter: 'import pandas as pd\n\nemployees = pd.DataFrame({\n    "name": ["Avi", "Bni", "Galit", "Dana"],\n    "dept_id": [1, 2, 1, 3],\n    "salary": [15000, 22000, 18000, 13000]\n})\n\ndepartments = pd.DataFrame({\n    "dept_id": [1, 2, 3],\n    "dept_name": ["Sales", "R&D", "Marketing"],\n    "location": ["TLV", "RAM", "JLM"]\n})\n\n# Merge:\n',
          solution: "import pandas as pd\n\nemployees = pd.DataFrame({\n    \"name\": [\"Avi\", \"Bni\", \"Galit\", \"Dana\"],\n    \"dept_id\": [1, 2, 1, 3],\n    \"salary\": [15000, 22000, 18000, 13000]\n})\n\ndepartments = pd.DataFrame({\n    \"dept_id\": [1, 2, 3],\n    \"dept_name\": [\"Sales\", \"R&D\", \"Marketing\"],\n    \"location\": [\"TLV\", \"RAM\", \"JLM\"]\n})\n\nresult = pd.merge(employees, departments, on=\"dept_id\", how=\"inner\")\nprint(result)\nprint(\"rows:\", len(result))",
          check: (output) => output.split('\n').some(l => l.includes('Avi') && l.includes('TLV') && l.includes('Sales')) && output.split('\n').some(l => l.includes('Dana') && l.includes('JLM')),
          hint: 'pd.merge(employees, departments, on="dept_id")'
        },
      ]
    },
    // === Module 4: Combined - viz + analysis ===
    {
      module: '🎯 ניתוח מלא + ויזואליזציה',
      topics: [
        {
          id: 'adv-combo-churn',
          title: 'ניתוח נטישת לקוחות + גרף',
          theory: '<p>שילוב כל הכלים: pandas לניתוח + matplotlib להצגה. שיעור churn = % לקוחות שעזבו.</p>',
          q: "נתונים 15 לקוחות עם עמודת churn בינארית. חשב והדפס את שיעור הנטישה באחוזים (ספרה אחת אחרי הנקודה), הדפס את ספירת הנשארים והנוטשים, וצור גרף עוגה. ודא שהתוויות בגרף מתאימות לערכים הנכונים.",
        explain: "שני דברים ללמוד כאן. הראשון הוא טריק שימושי: הממוצע של עמודה בינארית 0/1 הוא בדיוק הפרופורציה של האחדות. לכן df[\"churn\"].mean() נותן ישירות את שיעור הנטישה, ואפשר להרחיב אותו ל-df.groupby(\"segment\")[\"churn\"].mean() כדי לקבל שיעור נטישה לכל סגמנט. השני הוא מלכודת אמיתית: value_counts() ממיין לפי שכיחות יורדת, לא לפי הערך. אם תצמיד לתוצאה שלו רשימת תוויות קשיחה כמו [\"Stayed\", \"Churned\"], התוויות יתאימו רק כל עוד הנשארים הם הרוב. ברגע שהנוטשים יהיו הרוב, הגרף יתייג אותם הפוך — בלי שגיאה, בלי אזהרה, ועם מסקנה עסקית הפוכה. לכן תמיד sort_index() או reindex([0, 1]) לפני שמצמידים תוויות.",
          starter: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    "customer_id": list(range(101, 116)),\n    "churn": [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0]\n}\ndf = pd.DataFrame(data)\n\n# חשב churn rate והצג גרף:\n',
          solution: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    \"customer_id\": list(range(101, 116)),\n    \"churn\": [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0]\n}\ndf = pd.DataFrame(data)\n\nchurn_rate = df[\"churn\"].mean() * 100\nprint(f\"Churn rate: {churn_rate:.1f}%\")\n\ncounts = df[\"churn\"].value_counts().sort_index()\nprint(counts)\n\nplt.figure(figsize=(7,7))\nplt.pie(counts.values, labels=[\"Stayed\",\"Churned\"], autopct=\"%1.1f%%\",\n        colors=[\"#4ecdc4\",\"#ff6b6b\"])\nplt.title(\"Customer churn\")\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && output.includes('46.7') && /0\s+8/.test(output) && /1\s+7/.test(output),
          hint: 'mean() של עמודת churn = churn rate'
        },
        {
          id: 'adv-combo-segment',
          title: 'סגמנטציה - תרגיל מסכם',
          theory: '<p>חלוקת לקוחות לפי שכר: Low (<15K), Mid (15-20K), High (>20K). הצג בגרף.</p>',
          q: "חלק 12 משכורות לשלוש קטגוריות: Low (מתחת ל-15000), Mid (15000 עד 20000 כולל), ו-High (מעל 20000). השתמש ב-pd.cut. הדפס את הספירה בכל קטגוריה וצור גרף עמודות — ודא שהעמודות מסודרות לפי Low, Mid, High ולא לפי שכיחות.",
        explain: "pd.cut היא הדרך הנכונה בפנדס לחתוך משתנה רציף לטווחים. היא לא רק מקצרת את הקוד לעומת apply עם פונקציה, אלא מחזירה עמודה מסוג Categorical עם סדר מובנה — וזה בדיוק מה שפותר את המלכודת כאן. value_counts() ממיין כברירת מחדל לפי שכיחות, ולכן בלי reindex היית מקבל גרף שבו העמודות מסודרות Mid, High, Low, ורשימת הצבעים הקשיחה הייתה נצבעת על הקטגוריות הלא נכונות. כשיש לקטגוריות סדר טבעי, כפה אותו תמיד לפני הציור. והנקודה החשובה מכולן: הגבולות עצמם הם החלטה שלך, לא עובדה. הזזת הגבול מ-20000 ל-21000 משנה את גודל הסגמנטים ואת המסקנה — לכן תמיד תעד אותם.",
          starter: "import pandas as pd\nimport matplotlib.pyplot as plt\n\nsalaries = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\n# חלק לקטגוריות עם pd.cut, הדפס ספירות וצייר גרף עמודות:",
          solution: "import pandas as pd\nimport matplotlib.pyplot as plt\n\nsalaries = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\ndf = pd.DataFrame({\"salary\": salaries})\n\ndf[\"segment\"] = pd.cut(df[\"salary\"],\n                       bins=[0, 14999, 20000, float(\"inf\")],\n                       labels=[\"Low\", \"Mid\", \"High\"])\n\ncounts = df[\"segment\"].value_counts().reindex([\"Low\", \"Mid\", \"High\"])\nprint(counts)\n\nplt.figure(figsize=(7,5))\nplt.bar(counts.index.astype(str), counts.values, color=[\"#3b82f6\",\"#10b981\",\"#f59e0b\"])\nplt.title(\"Salary distribution by segment\")\nplt.ylabel(\"Number of employees\")\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && /Low\s+3/.test(output) && /Mid\s+5/.test(output) && /High\s+4/.test(output),
          hint: 'apply(segment) ואז value_counts()'
        },
        {
          id: 'adv-combo-correlation',
          title: 'מטריצת קורלציה + heatmap',
          theory: '<p><code>df.corr()</code> מחזיר מטריצת קורלציה. ערכים: 1 = קורלציה חיובית מלאה, -1 = שלילית, 0 = אין.</p>',
          q: "חשב מטריצת קורלציה בין salary, years ו-age עבור 15 עובדים. הדפס אותה מעוגלת ל-3 ספרות, וצייר אותה כ-heatmap עם סקאלת צבע מ--1 עד 1 וערכים כתובים בתוך התאים.",
        explain: "מטריצת קורלציה סימטרית, והאלכסון שלה תמיד 1 — כל משתנה מתואם לעצמו במלואו. לכן קוראים רק את המשולש שמעל האלכסון. שתי אזהרות שחייבות ללוות כל מטריצה כזו. ראשית, .corr() מחשב כברירת מחדל מתאם פירסון, שמודד קשר לינארי בלבד: שני משתנים בקשר חזק אך מעוקל יכולים לקבל מתאם קרוב לאפס. שנית, מתאם אינו סיבתיות — ותק וגיל מתואמים ב-0.989 לא כי אחד גורם לשני, אלא כי שניהם עולים יחד עם הזמן. ומעשית: ערכים כמו 0.98 בין שני משתנים עסקיים הם דגל אדום. בנתונים אמיתיים זה בדרך כלל מסמן שהמשתנים מודדים את אותו דבר, ואם תכניס את שניהם למודל רגרסיה הקולינאריות תערער את המקדמים.",
          starter: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    \"salary\": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000, 21000, 26000, 16500],\n    \"years\": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4, 5, 7, 3],\n    \"age\": [25, 45, 32, 22, 50, 35, 28, 55, 30, 48, 24, 38, 42, 52, 33]\n}\ndf = pd.DataFrame(data)\n\n# הדפס df.corr() וצייר heatmap:",
          solution: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    \"salary\": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000, 21000, 26000, 16500],\n    \"years\": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4, 5, 7, 3],\n    \"age\": [25, 45, 32, 22, 50, 35, 28, 55, 30, 48, 24, 38, 42, 52, 33]\n}\ndf = pd.DataFrame(data)\n\ncorr = df.corr()\nprint(corr.round(3))\n\nplt.figure(figsize=(6,5))\nplt.imshow(corr, cmap=\"coolwarm\", vmin=-1, vmax=1)\nplt.colorbar()\nplt.xticks(range(len(corr)), corr.columns, rotation=45)\nplt.yticks(range(len(corr)), corr.columns)\nfor i in range(len(corr)):\n    for j in range(len(corr)):\n        plt.text(j, i, f\"{corr.iloc[i, j]:.2f}\", ha=\"center\", va=\"center\")\nplt.title(\"Correlation matrix\")\nplt.show()",
          check: (output, images) => !!images && images.length >= 1 && output.includes('0.981') && output.includes('0.978') && output.includes('0.989'),
          hint: 'df.corr()'
        },
      ]
    },
    // === Module 5: sklearn basics ===
    {
      module: '🤖 Machine Learning בסיסי (sklearn)',
      topics: [
        {
          id: 'adv-ml-linreg',
          title: 'רגרסיה לינארית - תחזית שכר',
          theory: '<p>רגרסיה לינארית מנבאת ערך מתמשך. דוגמה: שכר בהתאם לוותק.</p><pre>from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X, y)\npredictions = model.predict(new_X)</pre>',
          q: "אמן מודל רגרסיה לינארית שמנבא שכר לפי ותק. נבא את השכר עבור 6 שנות ותק, והדפס גם את השיפוע, את החיתוך ואת ציון ה-R2 על נתוני האימון. השתמש ב-NIS ולא בסימן מטבע.",
        explain: "רגרסיה לינארית מתאימה קו ישר, ושני המספרים שמגדירים אותו הם התוצר האמיתי. השיפוע 2125 אומר שכל שנת ותק נוספת מוסיפה בממוצע כ-2125 שקל לשכר. החיתוך 10389 הוא השכר החזוי בוותק אפס. R2 של 0.948 אומר שהמודל מסביר כ-95 אחוז מהשונות בשכר — התאמה טובה מאוד, אבל שים לב שזהו R2 על נתוני האימון עצמם, כלומר על נתונים שהמודל כבר ראה. בפרויקט אמיתי היית מפצל את הנתונים ל-train ול-test ומודד על ה-test, כי מודל תמיד נראה טוב יותר על מה שאימנת עליו. אזהרה אחרונה: אל תבצע אקסטרפולציה. הנתונים כאן נעים בין שנה ל-8 שנים, ותחזית ל-30 שנות ותק תהיה חסרת משמעות — הקו פשוט ימשיך לעלות בלי שיש לו על מה להסתמך.",
          starter: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nyears = np.array([[2],[5],[3],[1],[7],[4],[2],[8],[3],[6]])\nsalary = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000])\n\n# אמן מודל ונבא 6 שנים:\n',
          solution: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nyears = np.array([[2],[5],[3],[1],[7],[4],[2],[8],[3],[6]])\nsalary = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000])\n\nmodel = LinearRegression()\nmodel.fit(years, salary)\n\nprediction = model.predict([[6]])\nprint(f\"Prediction for 6 years: {prediction[0]:.0f} NIS\")\nprint(f\"Slope: {model.coef_[0]:.0f} NIS per year\")\nprint(f\"Intercept: {model.intercept_:.0f}\")\nprint(f\"R2 on training data: {model.score(years, salary):.3f}\")",
          check: (output) => output.includes('23137') && output.includes('2125') && output.includes('10389'),
          hint: 'model.fit(years, salary).predict([[6]])'
        },
        {
          id: 'adv-ml-cluster',
          title: 'K-Means Clustering',
          theory: '<p>K-Means מחלק נקודות ל-K קבוצות. שימושי לסגמנטציה.</p><pre>from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=3, random_state=42, n_init=10)\nkm.fit(X)\nprint(km.labels_)</pre>',
          q: "חלק 12 לקוחות ל-3 קבוצות לפי [age, salary]. שים לב שהעמודות בסקאלות שונות לגמרי — בצע סטנדרטיזציה עם StandardScaler לפני הקיבוץ. הדפס את תוויות הקבוצות ואת מרכזי הקבוצות מוחזרים ליחידות המקוריות (inverse_transform).",
        explain: "הדבר החשוב ביותר כאן הוא הסקיילינג. K-Means מודד מרחק אוקלידי, ו-salary נע בין 12000 ל-28000 בעוד age נע בין 22 ל-55. בלי סטנדרטיזציה, ההפרש בשכר גדול פי מאות מההפרש בגיל, ולכן המרחק נקבע כמעט אך ורק לפי השכר. אפשר להוכיח זאת: הרצה בלי scaler מייצרת בדיוק את אותה חלוקה שמתקבלת מקיבוץ לפי salary בלבד — עמודת age לא משפיעה כלל. StandardScaler מביא כל עמודה לממוצע 0 וסטיית תקן 1 ונותן לשתיהן משקל שווה. זה כלל ברזל לכל אלגוריתם מבוסס מרחק: K-Means, KNN, SVM ו-PCA. שתי נקודות נוספות: n_init=10 מריץ 10 אתחולים אקראיים ובוחר את הטוב ביותר, כי K-Means עלול להתכנס למינימום מקומי; ומספרי התוויות עצמם שרירותיים — קבוצה 0 אינה 'לפני' קבוצה 1, ולכן תמיד מפרשים קבוצות לפי המרכזים שלהן ולא לפי המספר.",
          starter: "import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\ndata = np.array([\n    [25, 15000], [45, 22000], [32, 18000], [22, 13000],\n    [50, 25000], [35, 16000], [28, 14000], [55, 28000],\n    [30, 17000], [48, 23000], [24, 12000], [38, 19000]\n])\n\n# בצע סטנדרטיזציה, הרץ KMeans עם 3 קבוצות, והדפס תוויות ומרכזים:",
          solution: "import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\ndata = np.array([\n    [25, 15000], [45, 22000], [32, 18000], [22, 13000],\n    [50, 25000], [35, 16000], [28, 14000], [55, 28000],\n    [30, 17000], [48, 23000], [24, 12000], [38, 19000]\n])\n\nscaler = StandardScaler()\nscaled = scaler.fit_transform(data)\n\nkm = KMeans(n_clusters=3, random_state=42, n_init=10)\nkm.fit(scaled)\nprint(\"Cluster labels:\", km.labels_)\nprint(\"Centers (original units):\")\nprint(scaler.inverse_transform(km.cluster_centers_).round(0))",
          check: (output) => output.includes('24500') && output.includes('17500') && output.includes('13500') && /\[[0-2]\s+[0-2]/.test(output),
          hint: 'KMeans(n_clusters=3, random_state=42, n_init=10).fit(data)'
        },
        {
          id: 'adv-ml-classify',
          title: 'סיווג - חיזוי churn',
          theory: '<p>לוגיסטית רגרסיה מסווגת לקטגוריות (0/1). שימושי לחיזוי churn.</p>',
          q: "נתונים 30 לקוחות עם שלושה מאפיינים: age, monthly_bill, tenure_months, ועמודת מטרה churn. פצל את הנתונים ל-train ול-test ביחס 70/30 עם stratify, בנה Pipeline של StandardScaler ואחריו LogisticRegression, אמן על ה-train בלבד, והדפס גם את הדיוק על ה-train וגם את הדיוק על ה-test.",
        explain: "זהו הכלל החשוב ביותר בכל למידת מכונה: לעולם אל תמדוד מודל על הנתונים שאימנת עליו. מודל תמיד ייראה טוב יותר על מה שכבר ראה, ולכן דיוק אימון הוא מדד חסר ערך — מודל שפשוט משנן את הנתונים יקבל 100 אחוז ויכשל לחלוטין על לקוח חדש. לכן מפצלים: מאמנים על ה-train ומודדים על ה-test, שהמודל מעולם לא ראה. כאן קיבלנו 90.5 אחוז על האימון מול 88.9 אחוז על המבחן — פער קטן, כלומר המודל מכליל היטב. פער גדול היה מסמן overfitting. stratify=y מבטיח שיחס הנוטשים יישמר בשני החלקים, מה שקריטי במדגם קטן. ה-Pipeline חשוב גם הוא: הוא מבטיח ש-StandardScaler ילמד ממוצע וסטיית תקן מנתוני האימון בלבד ויחיל אותם על המבחן. אילו היית מבצע סקיילינג על כל הנתונים לפני הפיצול, מידע מקבוצת המבחן היה מחלחל לאימון — וזו דליפת נתונים. ולבסוף, דיוק לבדו אינו מספיק ב-churn: כשרק 10 אחוז מהלקוחות נוטשים, מודל שמנבא תמיד 'לא נוטש' מגיע ל-90 אחוז דיוק והוא חסר תועלת. לכן בודקים גם precision ו-recall ואת confusion_matrix.",
          starter: "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.model_selection import train_test_split\n\nX = np.array([\n    [25, 95.0, 4], [31, 110.0, 6], [28, 88.0, 3], [42, 120.0, 8], [35, 99.0, 5],\n    [23, 130.0, 2], [39, 105.0, 7], [46, 115.0, 9], [27, 92.0, 6], [33, 101.0, 4],\n    [52, 45.0, 72], [48, 52.0, 60], [57, 38.0, 84], [44, 60.0, 54], [61, 42.0, 96],\n    [50, 55.0, 66], [38, 48.0, 48], [55, 35.0, 90], [43, 58.0, 58], [59, 40.0, 78],\n    [29, 62.0, 30], [36, 70.0, 26], [41, 66.0, 34], [32, 58.0, 28], [47, 72.0, 38],\n    [26, 75.0, 22], [54, 50.0, 44], [30, 68.0, 32], [45, 64.0, 40], [37, 80.0, 20]\n])\ny = np.array([1,1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0,0, 0,1,0,0,1,1,0,0,0,1])\n\n# פצל ל-train/test (test_size=0.3, random_state=42, stratify=y),\n# בנה Pipeline עם StandardScaler + LogisticRegression, אמן והדפס שני דיוקים:",
          solution: "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.model_selection import train_test_split\n\nX = np.array([\n    [25, 95.0, 4], [31, 110.0, 6], [28, 88.0, 3], [42, 120.0, 8], [35, 99.0, 5],\n    [23, 130.0, 2], [39, 105.0, 7], [46, 115.0, 9], [27, 92.0, 6], [33, 101.0, 4],\n    [52, 45.0, 72], [48, 52.0, 60], [57, 38.0, 84], [44, 60.0, 54], [61, 42.0, 96],\n    [50, 55.0, 66], [38, 48.0, 48], [55, 35.0, 90], [43, 58.0, 58], [59, 40.0, 78],\n    [29, 62.0, 30], [36, 70.0, 26], [41, 66.0, 34], [32, 58.0, 28], [47, 72.0, 38],\n    [26, 75.0, 22], [54, 50.0, 44], [30, 68.0, 32], [45, 64.0, 40], [37, 80.0, 20]\n])\ny = np.array([1,1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0,0, 0,1,0,0,1,1,0,0,0,1])\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, stratify=y)\n\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train, y_train)\n\nprint(f\"Train accuracy: {model.score(X_train, y_train):.2%}\")\nprint(f\"Test accuracy: {model.score(X_test, y_test):.2%}\")",
          check: (output) => /90\.(4[78]|5)/.test(output) && /88\.8[89]/.test(output),
          hint: 'LogisticRegression().fit(X, y).score(X, y)'
        },
      ]
    }
  ],
  // === English versions ===
  en: [
    {
      module: '📊 Visualization with matplotlib',
      topics: [
        {
          id: 'adv-viz-bar',
          title: 'Bar Chart - Monthly Sales',
          theory: '<p><b>matplotlib</b> is the leading plotting library in Python.</p><pre>import matplotlib.pyplot as plt\nplt.bar(x, y)\nplt.title("...")\nplt.show()</pre><p>In Pyodide, plots appear automatically in the output.</p>',
          q: 'Build a bar chart of monthly sales. Use 12 months (jan-dec) with sales [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89] (thousands of NIS).',
          starter: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]\nrevenue = [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89]\n\n# Build bar chart:\n',
          solution: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]\nrevenue = [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89]\n\nplt.figure(figsize=(10,5))\nplt.bar(months, revenue, color="steelblue")\nplt.title("Monthly Sales 2024")\nplt.xlabel("Month")\nplt.ylabel("Sales (k NIS)")\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.bar(months, revenue) then plt.show()'
        },
        {
          id: 'adv-viz-line',
          title: 'Line Chart - COVID Trend',
          theory: '<p>Line charts are great for trends over time. Use <code>plt.plot()</code>.</p><pre>plt.plot(x, y, marker="o")</pre>',
          q: 'Build a line chart of COVID cases over 8 weeks.',
          starter: 'import matplotlib.pyplot as plt\n\ndates = ["01/01","08/01","15/01","22/01","29/01","05/02","12/02","19/02"]\npositive = [3200, 4500, 6100, 8200, 7800, 5300, 3900, 2400]\n\n# Build line chart:\n',
          solution: 'import matplotlib.pyplot as plt\n\ndates = ["01/01","08/01","15/01","22/01","29/01","05/02","12/02","19/02"]\npositive = [3200, 4500, 6100, 8200, 7800, 5300, 3900, 2400]\n\nplt.figure(figsize=(10,5))\nplt.plot(dates, positive, marker="o", color="crimson", linewidth=2)\nplt.title("COVID Cases Trend")\nplt.xlabel("Date")\nplt.ylabel("Positive Cases")\nplt.xticks(rotation=45)\nplt.grid(True, alpha=0.3)\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.plot(dates, positive, marker="o")'
        },
        {
          id: 'adv-viz-pie',
          title: 'Pie Chart - Department Distribution',
          theory: '<p>Pie charts show parts of a whole. <code>plt.pie(values, labels=...)</code>.</p>',
          q: 'Build a pie chart of employees by department. Sales: 5, R&D: 4, Marketing: 3',
          starter: 'import matplotlib.pyplot as plt\n\ndepartments = ["Sales", "R&D", "Marketing"]\nemployees = [5, 4, 3]\n\n# Pie chart:\n',
          solution: 'import matplotlib.pyplot as plt\n\ndepartments = ["Sales", "R&D", "Marketing"]\nemployees = [5, 4, 3]\n\nplt.figure(figsize=(7,7))\nplt.pie(employees, labels=departments, autopct="%1.1f%%", colors=["#ff6b6b","#4ecdc4","#ffe66d"])\nplt.title("Employee Distribution by Department")\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.pie(employees, labels=departments, autopct="%1.1f%%")'
        },
        {
          id: 'adv-viz-scatter',
          title: 'Scatter Plot - Salary vs Tenure',
          theory: '<p>Scatter plot shows relationship between two variables. <code>plt.scatter(x, y)</code>.</p>',
          q: 'Build scatter plot of salary (y) vs years of tenure (x).',
          starter: 'import matplotlib.pyplot as plt\n\nyears = [2,5,3,1,7,4,2,8,3,6,1,4]\nsalary = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\n# Scatter plot:\n',
          solution: 'import matplotlib.pyplot as plt\n\nyears = [2,5,3,1,7,4,2,8,3,6,1,4]\nsalary = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\nplt.figure(figsize=(8,6))\nplt.scatter(years, salary, s=80, c="purple", alpha=0.7)\nplt.title("Salary vs Years of Tenure")\nplt.xlabel("Years")\nplt.ylabel("Monthly Salary (NIS)")\nplt.grid(True, alpha=0.3)\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.scatter(years, salary)'
        },
        {
          id: 'adv-viz-hist',
          title: 'Histogram - Age Distribution',
          theory: '<p>Histogram shows distribution of values. <code>plt.hist(data, bins=10)</code>.</p>',
          q: 'Build a histogram of 15 customer ages: [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]. Use 5 bins.',
          starter: 'import matplotlib.pyplot as plt\n\nages = [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]\n\n# Histogram:\n',
          solution: 'import matplotlib.pyplot as plt\n\nages = [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]\n\nplt.figure(figsize=(8,5))\nplt.hist(ages, bins=5, color="teal", edgecolor="white")\nplt.title("Customer Age Distribution")\nplt.xlabel("Age")\nplt.ylabel("Number of Customers")\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.hist(ages, bins=5)'
        },
      ]
    },
    {
      module: '🧮 NumPy - Fast Computation',
      topics: [
        {
          id: 'adv-np-array',
          title: 'Arrays and Vector Operations',
          theory: '<p>NumPy arrays enable fast vector operations (100x faster than regular Python):</p><pre>import numpy as np\narr = np.array([1, 2, 3, 4])\nprint(arr * 2)  # [2, 4, 6, 8]\nprint(arr.mean())  # 2.5</pre>',
          q: 'Create a numpy array of test scores [88, 76, 92, 84, 70, 95]. Print: mean, max, standard deviation (3 decimals).',
          starter: 'import numpy as np\n\nscores = np.array([88, 76, 92, 84, 70, 95])\n\n# Computations:\n',
          solution: 'import numpy as np\n\nscores = np.array([88, 76, 92, 84, 70, 95])\n\nprint(f"Mean: {scores.mean():.3f}")\nprint(f"Max: {scores.max()}")\nprint(f"Std dev: {scores.std():.3f}")',
          check: (output) => output.includes('84.') && output.includes('95') && (output.includes('8.') || output.includes('9.')),
          hint: 'scores.mean(), scores.max(), scores.std()'
        },
        {
          id: 'adv-np-stats',
          title: 'Descriptive Statistics',
          theory: '<p><code>np.percentile()</code>, <code>np.median()</code>, <code>np.var()</code> for advanced stats.</p>',
          q: 'We have 12 salaries: [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]. Print: median, Q1, Q3, and variance.',
          starter: 'import numpy as np\n\nsalaries = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000])\n\n# Statistics:\n',
          solution: 'import numpy as np\n\nsalaries = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000])\n\nprint(f"Median: {np.median(salaries):.0f}")\nprint(f"Q1 (25%): {np.percentile(salaries, 25):.0f}")\nprint(f"Q3 (75%): {np.percentile(salaries, 75):.0f}")\nprint(f"Variance: {np.var(salaries):.0f}")',
          check: (output) => output.includes('Q1') || output.includes('17500') || output.includes('Median'),
          hint: 'np.median(), np.percentile(salaries, 25)'
        },
        {
          id: 'adv-np-random',
          title: 'Random Data Generation',
          theory: '<p><code>np.random</code> for generating random test data:</p><pre>np.random.seed(42)  # reproducibility\nnp.random.normal(50, 10, 100)  # normal distribution</pre>',
          q: 'Generate 100 random data points with normal distribution (mean=75, std=10, seed=42). Print actual mean and std.',
          starter: 'import numpy as np\n\nnp.random.seed(42)\n# Generate data:\n',
          solution: 'import numpy as np\n\nnp.random.seed(42)\ndata = np.random.normal(75, 10, 100)\nprint(f"Actual mean: {data.mean():.2f}")\nprint(f"Actual std: {data.std():.2f}")',
          check: (output) => /\d{2}\.\d{2}/.test(output) && (output.includes('75.') || output.includes('74.') || output.includes('76.') || output.includes('73.')),
          hint: 'np.random.normal(75, 10, 100)'
        },
        {
          id: 'adv-np-matrix',
          title: 'Matrices and Multiplication',
          theory: '<p>NumPy specializes in matrices:</p><pre>a @ b  # matrix multiplication</pre>',
          q: 'Create 2 matrices 3x3 and multiply them. Print the result.',
          starter: 'import numpy as np\n\nA = np.array([[1,2,3],[4,5,6],[7,8,9]])\nB = np.array([[1,0,0],[0,1,0],[0,0,1]])\n\n# Multiply A by B:\n',
          solution: 'import numpy as np\n\nA = np.array([[1,2,3],[4,5,6],[7,8,9]])\nB = np.array([[1,0,0],[0,1,0],[0,0,1]])\n\nresult = A @ B\nprint(result)',
          check: (output) => output.includes('[[1 2 3]') || (output.includes('1') && output.includes('5') && output.includes('9')),
          hint: 'A @ B'
        },
      ]
    },
    {
      module: '🐼 Advanced Pandas (Real)',
      topics: [
        {
          id: 'adv-pd-create',
          title: 'Creating a Real DataFrame',
          theory: '<p>With real pandas, we have all the DataFrame power:</p><pre>import pandas as pd\ndf = pd.DataFrame({...})\ndf.describe()  # full stats</pre>',
          q: 'Create a DataFrame of 12 employees. Use describe() to print stats.',
          starter: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\n\ndf = pd.DataFrame(data)\n# Print describe:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\n\ndf = pd.DataFrame(data)\nprint(df.describe())',
          check: (output) => output.includes('salary') && (output.includes('mean') || output.includes('std')),
          hint: 'df.describe() gives full statistics'
        },
        {
          id: 'adv-pd-filter',
          title: 'Advanced Filtering',
          theory: '<p>In real pandas - vector filtering:</p><pre>df[df["salary"] > 20000]\ndf[(df["years"] > 3) & (df["department"] == "Sales")]</pre>',
          q: 'Filter employees with salary > 18000 AND years > 3. Print their names.',
          starter: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\n# Filter:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\nresult = df[(df["salary"] > 18000) & (df["years"] > 3)]\nprint(result["name"].tolist())',
          check: (output) => output.includes('Bni') && output.includes('Hila') && output.includes('Yossi'),
          hint: 'df[(df["salary"] > 18000) & (df["years"] > 3)]'
        },
        {
          id: 'adv-pd-groupby',
          title: 'GroupBy with Multiple Aggregations',
          theory: '<p><code>.agg()</code> allows multiple aggregations at once.</p>',
          q: 'Group by department: mean salary + total + count + max years.',
          starter: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\n# Group:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\nresult = df.groupby("department").agg({\n    "salary": ["mean", "sum", "count"],\n    "years": "max"\n})\nprint(result)',
          check: (output) => output.includes('R&D') && output.includes('Sales') && output.includes('Marketing'),
          hint: 'df.groupby("department").agg({"salary": ["mean", "sum"], "years": "max"})'
        },
        {
          id: 'adv-pd-pivot',
          title: 'Pivot Table',
          theory: '<p><code>pd.pivot_table()</code> like Excel - rows, columns, values.</p>',
          q: 'Create pivot table of mean salary. Rows=department, columns=seniority (Senior/Junior by years>=4).',
          starter: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\ndf["seniority"] = df["years"].apply(lambda y: "Senior" if y >= 4 else "Junior")\n\n# Pivot table:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\ndf["seniority"] = df["years"].apply(lambda y: "Senior" if y >= 4 else "Junior")\n\nresult = df.pivot_table(index="department", columns="seniority", values="salary", aggfunc="mean")\nprint(result)',
          check: (output) => output.includes('Senior') && output.includes('Junior'),
          hint: 'pivot_table(index="department", columns="seniority", values="salary", aggfunc="mean")'
        },
        {
          id: 'adv-pd-merge',
          title: 'Merge - Joining 2 Tables',
          theory: '<p><code>pd.merge()</code> like JOIN in SQL.</p>',
          q: 'Merge employees and departments on dept_id. Print result.',
          starter: 'import pandas as pd\n\nemployees = pd.DataFrame({\n    "name": ["Avi", "Bni", "Galit", "Dana"],\n    "dept_id": [1, 2, 1, 3],\n    "salary": [15000, 22000, 18000, 13000]\n})\n\ndepartments = pd.DataFrame({\n    "dept_id": [1, 2, 3],\n    "dept_name": ["Sales", "R&D", "Marketing"],\n    "location": ["TLV", "RAM", "JLM"]\n})\n\n# Merge:\n',
          solution: 'import pandas as pd\n\nemployees = pd.DataFrame({\n    "name": ["Avi", "Bni", "Galit", "Dana"],\n    "dept_id": [1, 2, 1, 3],\n    "salary": [15000, 22000, 18000, 13000]\n})\n\ndepartments = pd.DataFrame({\n    "dept_id": [1, 2, 3],\n    "dept_name": ["Sales", "R&D", "Marketing"],\n    "location": ["TLV", "RAM", "JLM"]\n})\n\nresult = pd.merge(employees, departments, on="dept_id", how="inner")\nprint(result)',
          check: (output) => output.includes('Sales') && output.includes('TLV') && output.includes('Avi'),
          hint: 'pd.merge(employees, departments, on="dept_id")'
        },
      ]
    },
    {
      module: '🎯 Full Analysis + Visualization',
      topics: [
        {
          id: 'adv-combo-churn',
          title: 'Customer Churn Analysis + Chart',
          theory: '<p>Combine all tools: pandas for analysis + matplotlib for display.</p>',
          q: 'Compute churn rate (% with churn=1) and create a pie chart of churn vs stayed.',
          starter: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    "customer_id": list(range(101, 116)),\n    "churn": [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0]\n}\ndf = pd.DataFrame(data)\n\n# Compute churn rate and create chart:\n',
          solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    "customer_id": list(range(101, 116)),\n    "churn": [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0]\n}\ndf = pd.DataFrame(data)\n\nchurn_rate = df["churn"].mean() * 100\nprint(f"Churn rate: {churn_rate:.1f}%")\n\ncounts = df["churn"].value_counts()\nplt.figure(figsize=(7,7))\nplt.pie(counts, labels=["Stayed","Churned"], autopct="%1.1f%%", colors=["#4ecdc4","#ff6b6b"])\nplt.title("Customer Churn")\nplt.show()',
          check: (output, images) => output.includes('Churn') && images && images.length >= 1,
          hint: 'mean() of churn column = churn rate'
        },
        {
          id: 'adv-combo-segment',
          title: 'Segmentation - Summary Exercise',
          theory: '<p>Segment customers by salary: Low (<15K), Mid (15-20K), High (>20K).</p>',
          q: 'Segment 12 salaries into categories and create bar chart.',
          starter: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\nsalaries = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\n# Segment:\n',
          solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\nsalaries = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\ndf = pd.DataFrame({"salary": salaries})\n\ndef segment(s):\n    if s < 15000: return "Low"\n    elif s <= 20000: return "Mid"\n    else: return "High"\n\ndf["segment"] = df["salary"].apply(segment)\ncounts = df["segment"].value_counts()\nprint(counts)\n\nplt.figure(figsize=(7,5))\nplt.bar(counts.index, counts.values, color=["#3b82f6","#10b981","#f59e0b"])\nplt.title("Salary Distribution by Segment")\nplt.ylabel("Number of Employees")\nplt.show()',
          check: (output, images) => (output.includes('Low') || output.includes('Mid') || output.includes('High')) && images && images.length >= 1,
          hint: 'apply(segment) then value_counts()'
        },
        {
          id: 'adv-combo-correlation',
          title: 'Correlation Matrix',
          theory: '<p><code>df.corr()</code> returns correlation matrix.</p>',
          q: 'Compute correlation matrix between salary, years, age.',
          starter: 'import pandas as pd\n\ndata = {\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000, 21000, 26000, 16500],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4, 5, 7, 3],\n    "age": [25, 45, 32, 22, 50, 35, 28, 55, 30, 48, 24, 38, 42, 52, 33]\n}\ndf = pd.DataFrame(data)\n\n# Correlation:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000, 21000, 26000, 16500],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4, 5, 7, 3],\n    "age": [25, 45, 32, 22, 50, 35, 28, 55, 30, 48, 24, 38, 42, 52, 33]\n}\ndf = pd.DataFrame(data)\n\nprint(df.corr().round(3))',
          check: (output) => output.includes('salary') && output.includes('years') && output.includes('age'),
          hint: 'df.corr()'
        },
      ]
    },
    {
      module: '🤖 Basic Machine Learning (sklearn)',
      topics: [
        {
          id: 'adv-ml-linreg',
          title: 'Linear Regression - Salary Prediction',
          theory: '<p>Linear regression predicts continuous value.</p>',
          q: 'Train a linear regression: years → salary. Predict salary for 6 years.',
          starter: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nyears = np.array([[2],[5],[3],[1],[7],[4],[2],[8],[3],[6]])\nsalary = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000])\n\n# Train and predict for 6 years:\n',
          solution: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nyears = np.array([[2],[5],[3],[1],[7],[4],[2],[8],[3],[6]])\nsalary = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000])\n\nmodel = LinearRegression()\nmodel.fit(years, salary)\n\nprediction = model.predict([[6]])\nprint(f"Prediction for 6 years: NIS {prediction[0]:.0f}")\nprint(f"Slope: {model.coef_[0]:.0f} NIS per year")\nprint(f"Intercept: {model.intercept_:.0f}")',
          check: (output) => output.includes('NIS') && /NIS\s*\d{5}/.test(output),
          hint: 'model.fit(years, salary).predict([[6]])'
        },
        {
          id: 'adv-ml-cluster',
          title: 'K-Means Clustering',
          theory: '<p>K-Means partitions points into K groups. Useful for segmentation.</p>',
          q: 'Cluster 12 customers into 3 groups by [age, salary]. Print labels.',
          starter: 'import numpy as np\nfrom sklearn.cluster import KMeans\n\ndata = np.array([\n    [25, 15000], [45, 22000], [32, 18000], [22, 13000],\n    [50, 25000], [35, 16000], [28, 14000], [55, 28000],\n    [30, 17000], [48, 23000], [24, 12000], [38, 19000]\n])\n\n# K-Means with 3 clusters:\n',
          solution: 'import numpy as np\nfrom sklearn.cluster import KMeans\n\ndata = np.array([\n    [25, 15000], [45, 22000], [32, 18000], [22, 13000],\n    [50, 25000], [35, 16000], [28, 14000], [55, 28000],\n    [30, 17000], [48, 23000], [24, 12000], [38, 19000]\n])\n\nkm = KMeans(n_clusters=3, random_state=42, n_init=10)\nkm.fit(data)\nprint("Cluster labels:", km.labels_)\nprint("Centers:")\nprint(km.cluster_centers_.round(0))',
          check: (output) => output.includes('Cluster') || output.includes('labels'),
          hint: 'KMeans(n_clusters=3, random_state=42, n_init=10).fit(data)'
        },
        {
          id: 'adv-ml-classify',
          title: 'Classification - Predict Churn',
          theory: '<p>Logistic regression classifies into categories (0/1).</p>',
          q: 'Train a model to predict churn. Print accuracy.',
          starter: 'import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\nX = np.array([\n    [25, 45.5, 12], [45, 120.0, 60], [32, 80.3, 24], [58, 150.0, 84], [29, 35.0, 6],\n    [41, 95.0, 36], [36, 70.5, 18], [52, 130.0, 72], [27, 50.0, 8], [48, 110.0, 48],\n    [33, 65.0, 30], [60, 140.0, 96], [30, 55.0, 14], [44, 100.0, 42], [38, 75.0, 22]\n])\ny = np.array([0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0])\n\n# Train model:\n',
          solution: 'import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\nX = np.array([\n    [25, 45.5, 12], [45, 120.0, 60], [32, 80.3, 24], [58, 150.0, 84], [29, 35.0, 6],\n    [41, 95.0, 36], [36, 70.5, 18], [52, 130.0, 72], [27, 50.0, 8], [48, 110.0, 48],\n    [33, 65.0, 30], [60, 140.0, 96], [30, 55.0, 14], [44, 100.0, 42], [38, 75.0, 22]\n])\ny = np.array([0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0])\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X, y)\naccuracy = model.score(X, y)\nprint(f"Training accuracy: {accuracy:.2%}")',
          check: (output) => output.includes('%') || output.includes('accuracy') || output.includes('0.'),
          hint: 'LogisticRegression().fit(X, y).score(X, y)'
        },
      ]
    }
  ]
};
