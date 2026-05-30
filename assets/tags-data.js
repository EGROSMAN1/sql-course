/* ============================================================
   REAL EXERCISES CATALOG - 64 individual exercises
   Each links directly to the exercise via ?topic=<id>
   ============================================================ */

window.TAGS_DATA = {

  tagGroups: {
    'יסודות Python': ['Print', 'Variables', 'Strings', 'Numbers', 'Input', 'Booleans'],
    'בקרת זרימה': ['If/Else', 'Loops', 'While', 'Break/Continue'],
    'מבני נתונים': ['Lists', 'Tuples', 'Dicts', 'Sets'],
    'פונקציות': ['Functions', 'Lambda', 'Args'],
    'מתקדם': ['Files', 'Errors', 'Modules'],
    'Pandas': ['Load Data', 'Filter', 'Sort', 'GroupBy', 'Merge', 'Pivot', 'Aggregations', 'New Columns', 'Statistics'],
  },
  
  exercises: [
  {
    "id": "hello-world",
    "title": "Hello World — הריצה הראשונה",
    "icon": "🌍",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M1: הצצה ראשונה — נכיר את פייתון",
    "module_icon": "👋",
    "difficulty": "easy",
    "tags": [
      "Print"
    ],
    "url": "python-lesson.html?topic=hello-world"
  },
  {
    "id": "comments",
    "title": "הערות בקוד — Comments",
    "icon": "💬",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M1: הצצה ראשונה — נכיר את פייתון",
    "module_icon": "👋",
    "difficulty": "easy",
    "tags": [
      "Variables"
    ],
    "url": "python-lesson.html?topic=comments"
  },
  {
    "id": "errors-intro",
    "title": "שגיאות נפוצות — לא להיבהל",
    "icon": "⚠️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M1: הצצה ראשונה — נכיר את פייתון",
    "module_icon": "👋",
    "difficulty": "easy",
    "tags": [
      "Errors"
    ],
    "url": "python-lesson.html?topic=errors-intro"
  },
  {
    "id": "variables",
    "title": "משתנים — הקופסאות של פייתון",
    "icon": "📥",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M2: משתנים וסוגי נתונים",
    "module_icon": "📦",
    "difficulty": "easy",
    "tags": [
      "Variables"
    ],
    "url": "python-lesson.html?topic=variables"
  },
  {
    "id": "data-types",
    "title": "סוגי נתונים בסיסיים",
    "icon": "🔢",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M2: משתנים וסוגי נתונים",
    "module_icon": "📦",
    "difficulty": "easy",
    "tags": [
      "Variables"
    ],
    "url": "python-lesson.html?topic=data-types"
  },
  {
    "id": "type-casting",
    "title": "המרת סוגי נתונים (Type Casting)",
    "icon": "🔄",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M2: משתנים וסוגי נתונים",
    "module_icon": "📦",
    "difficulty": "easy",
    "tags": [
      "Variables"
    ],
    "url": "python-lesson.html?topic=type-casting"
  },
  {
    "id": "math-operators",
    "title": "אופרטורים מתמטיים",
    "icon": "➕",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M2: משתנים וסוגי נתונים",
    "module_icon": "📦",
    "difficulty": "easy",
    "tags": [
      "Numbers"
    ],
    "url": "python-lesson.html?topic=math-operators"
  },
  {
    "id": "input",
    "title": "קבלת קלט מהמשתמש — input()",
    "icon": "📝",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M3: קלט מהמשתמש ועבודה עם טקסטים",
    "module_icon": "⌨️",
    "difficulty": "easy",
    "tags": [
      "Input"
    ],
    "url": "python-lesson.html?topic=input"
  },
  {
    "id": "f-strings",
    "title": "שרשור מחרוזות ו-f-strings",
    "icon": "🔗",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M3: קלט מהמשתמש ועבודה עם טקסטים",
    "module_icon": "⌨️",
    "difficulty": "easy",
    "tags": [
      "Strings"
    ],
    "url": "python-lesson.html?topic=f-strings"
  },
  {
    "id": "string-methods",
    "title": "פונקציות לעבודה עם טקסט",
    "icon": "🔤",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M3: קלט מהמשתמש ועבודה עם טקסטים",
    "module_icon": "⌨️",
    "difficulty": "medium",
    "tags": [
      "Functions",
      "Strings"
    ],
    "url": "python-lesson.html?topic=string-methods"
  },
  {
    "id": "comparison",
    "title": "אופרטורים של השוואה",
    "icon": "⚖️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M4: תנאים, לוגיקה וקבלת החלטות",
    "module_icon": "🔀",
    "difficulty": "easy",
    "tags": [
      "Booleans",
      "Numbers"
    ],
    "url": "python-lesson.html?topic=comparison"
  },
  {
    "id": "logical-ops",
    "title": "אופרטורים לוגיים — and, or, not",
    "icon": "🧠",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M4: תנאים, לוגיקה וקבלת החלטות",
    "module_icon": "🔀",
    "difficulty": "easy",
    "tags": [
      "Booleans",
      "Numbers"
    ],
    "url": "python-lesson.html?topic=logical-ops"
  },
  {
    "id": "if-else",
    "title": "if, elif, else — מבנה תנאים מלא",
    "icon": "🚦",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M4: תנאים, לוגיקה וקבלת החלטות",
    "module_icon": "🔀",
    "difficulty": "easy",
    "tags": [
      "If/Else"
    ],
    "url": "python-lesson.html?topic=if-else"
  },
  {
    "id": "for-range",
    "title": "לולאת for ופונקציית range",
    "icon": "🔂",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M5: לולאות ותהליכים חזרתיים",
    "module_icon": "🔁",
    "difficulty": "medium",
    "tags": [
      "Functions",
      "Loops"
    ],
    "url": "python-lesson.html?topic=for-range"
  },
  {
    "id": "while",
    "title": "לולאת while — כל עוד",
    "icon": "⏳",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M5: לולאות ותהליכים חזרתיים",
    "module_icon": "🔁",
    "difficulty": "medium",
    "tags": [
      "Loops",
      "While"
    ],
    "url": "python-lesson.html?topic=while"
  },
  {
    "id": "break-continue",
    "title": "break ו-continue",
    "icon": "⏭️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M5: לולאות ותהליכים חזרתיים",
    "module_icon": "🔁",
    "difficulty": "medium",
    "tags": [
      "Break/Continue",
      "Loops"
    ],
    "url": "python-lesson.html?topic=break-continue"
  },
  {
    "id": "lists-basics",
    "title": "יצירת רשימות וגישה לפי אינדקס",
    "icon": "📜",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M6: רשימות וטופלים",
    "module_icon": "📋",
    "difficulty": "medium",
    "tags": [
      "Lists"
    ],
    "url": "python-lesson.html?topic=lists-basics"
  },
  {
    "id": "list-methods",
    "title": "פונקציות לניהול רשימות",
    "icon": "🛠️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M6: רשימות וטופלים",
    "module_icon": "📋",
    "difficulty": "medium",
    "tags": [
      "Functions",
      "Lists"
    ],
    "url": "python-lesson.html?topic=list-methods"
  },
  {
    "id": "tuples",
    "title": "טופלים — קבועים ולא ניתנים לשינוי",
    "icon": "🔒",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M6: רשימות וטופלים",
    "module_icon": "📋",
    "difficulty": "medium",
    "tags": [
      "Tuples"
    ],
    "url": "python-lesson.html?topic=tuples"
  },
  {
    "id": "dict-basics",
    "title": "מילונים — יצירה וגישה",
    "icon": "🗝️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M7: מילונים וסטים",
    "module_icon": "📖",
    "difficulty": "medium",
    "tags": [
      "Dicts"
    ],
    "url": "python-lesson.html?topic=dict-basics"
  },
  {
    "id": "dict-operations",
    "title": "פעולות במילון — עדכון, מחיקה ולולאות",
    "icon": "⚙️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M7: מילונים וסטים",
    "module_icon": "📖",
    "difficulty": "medium",
    "tags": [
      "Dicts",
      "Loops"
    ],
    "url": "python-lesson.html?topic=dict-operations"
  },
  {
    "id": "sets",
    "title": "סטים — אוספים ללא כפילויות",
    "icon": "🎯",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M7: מילונים וסטים",
    "module_icon": "📖",
    "difficulty": "medium",
    "tags": [
      "Sets"
    ],
    "url": "python-lesson.html?topic=sets"
  },
  {
    "id": "func-define",
    "title": "הגדרה וקריאה לפונקציות",
    "icon": "🎁",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M8: פונקציות וכתיבת קוד יעיל",
    "module_icon": "🔧",
    "difficulty": "medium",
    "tags": [
      "Functions"
    ],
    "url": "python-lesson.html?topic=func-define"
  },
  {
    "id": "func-return",
    "title": "החזרת ערכים וטווח ראייה",
    "icon": "↩️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M8: פונקציות וכתיבת קוד יעיל",
    "module_icon": "🔧",
    "difficulty": "medium",
    "tags": [
      "Functions"
    ],
    "url": "python-lesson.html?topic=func-return"
  },
  {
    "id": "func-defaults",
    "title": "ערכי ברירת מחדל ועקרון DRY",
    "icon": "⚡",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M8: פונקציות וכתיבת קוד יעיל",
    "module_icon": "🔧",
    "difficulty": "medium",
    "tags": [
      "Args",
      "Functions"
    ],
    "url": "python-lesson.html?topic=func-defaults"
  },
  {
    "id": "files-rw",
    "title": "קריאה וכתיבה של קבצי טקסט",
    "icon": "📄",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M9: קבצים וטיפול בשגיאות",
    "module_icon": "📂",
    "difficulty": "hard",
    "tags": [
      "Files",
      "Strings"
    ],
    "url": "python-lesson.html?topic=files-rw"
  },
  {
    "id": "try-except",
    "title": "try & except — טיפול בשגיאות",
    "icon": "🛡️",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M9: קבצים וטיפול בשגיאות",
    "module_icon": "📂",
    "difficulty": "hard",
    "tags": [
      "Errors"
    ],
    "url": "python-lesson.html?topic=try-except"
  },
  {
    "id": "specific-errors",
    "title": "סוגי שגיאות ספציפיים",
    "icon": "🎯",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M9: קבצים וטיפול בשגיאות",
    "module_icon": "📂",
    "difficulty": "hard",
    "tags": [
      "Errors",
      "If/Else"
    ],
    "url": "python-lesson.html?topic=specific-errors"
  },
  {
    "id": "builtin-modules",
    "title": "מודולים מובנים — math, random, datetime",
    "icon": "🧰",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M10: ספריות, מודולים ומבוא לדאטה",
    "module_icon": "📚",
    "difficulty": "hard",
    "tags": [
      "Modules"
    ],
    "url": "python-lesson.html?topic=builtin-modules"
  },
  {
    "id": "pip-packages",
    "title": "חבילות חיצוניות ו-pip",
    "icon": "📦",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M10: ספריות, מודולים ומבוא לדאטה",
    "module_icon": "📚",
    "difficulty": "hard",
    "tags": [
      "Modules"
    ],
    "url": "python-lesson.html?topic=pip-packages"
  },
  {
    "id": "pandas-intro",
    "title": "מבוא ל-Pandas ו-DataFrame",
    "icon": "🐼",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M10: ספריות, מודולים ומבוא לדאטה",
    "module_icon": "📚",
    "difficulty": "hard",
    "tags": [
      "Load Data"
    ],
    "url": "python-lesson.html?topic=pandas-intro"
  },
  {
    "id": "project-planning",
    "title": "תכנון פרויקט ופירוק לפונקציות",
    "icon": "📐",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M11: פרויקט סיום מסכם",
    "module_icon": "🏆",
    "difficulty": "hard",
    "tags": [
      "Functions",
      "Loops"
    ],
    "url": "python-lesson.html?topic=project-planning"
  },
  {
    "id": "project-persistence",
    "title": "שמירת מצב — קבצים ופרויקט",
    "icon": "💾",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M11: פרויקט סיום מסכם",
    "module_icon": "🏆",
    "difficulty": "hard",
    "tags": [
      "Functions",
      "Loops"
    ],
    "url": "python-lesson.html?topic=project-persistence"
  },
  {
    "id": "main-loop",
    "title": "הלולאה הראשית של הפרויקט",
    "icon": "🎮",
    "course": "python",
    "course_label": "יסודות Python",
    "module": "M11: פרויקט סיום מסכם",
    "module_icon": "🏆",
    "difficulty": "hard",
    "tags": [
      "Functions",
      "Loops"
    ],
    "url": "python-lesson.html?topic=main-loop"
  },
  {
    "id": "pd-create-df",
    "title": "יצירת DataFrame",
    "icon": "🎯",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M1: הכרת DataFrame",
    "module_icon": "📦",
    "difficulty": "easy",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-create-df"
  },
  {
    "id": "pd-load-data",
    "title": "טעינת דאטהסטים",
    "icon": "📥",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M1: הכרת DataFrame",
    "module_icon": "📦",
    "difficulty": "easy",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-load-data"
  },
  {
    "id": "pd-head-info",
    "title": "head, tail, info, describe",
    "icon": "👀",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M1: הכרת DataFrame",
    "module_icon": "📦",
    "difficulty": "easy",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-head-info"
  },
  {
    "id": "pd-select-cols",
    "title": "בחירת עמודות",
    "icon": "📋",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M2: חיתוך וסינון",
    "module_icon": "🔍",
    "difficulty": "easy",
    "tags": [
      "Load Data",
      "New Columns"
    ],
    "url": "pandas-lesson.html?topic=pd-select-cols"
  },
  {
    "id": "pd-filter-rows",
    "title": "סינון שורות לפי תנאי",
    "icon": "🎯",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M2: חיתוך וסינון",
    "module_icon": "🔍",
    "difficulty": "easy",
    "tags": [
      "Filter"
    ],
    "url": "pandas-lesson.html?topic=pd-filter-rows"
  },
  {
    "id": "pd-where-lambda",
    "title": "סינון מורכב עם where + lambda",
    "icon": "🧩",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M2: חיתוך וסינון",
    "module_icon": "🔍",
    "difficulty": "hard",
    "tags": [
      "Filter",
      "Lambda"
    ],
    "url": "pandas-lesson.html?topic=pd-where-lambda"
  },
  {
    "id": "pd-new-cols",
    "title": "יצירת עמודות חדשות",
    "icon": "➕",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M3: פעולות על עמודות",
    "module_icon": "⚙️",
    "difficulty": "easy",
    "tags": [
      "Load Data",
      "New Columns"
    ],
    "url": "pandas-lesson.html?topic=pd-new-cols"
  },
  {
    "id": "pd-apply",
    "title": "apply ו-map",
    "icon": "🔧",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M3: פעולות על עמודות",
    "module_icon": "⚙️",
    "difficulty": "medium",
    "tags": [
      "New Columns"
    ],
    "url": "pandas-lesson.html?topic=pd-apply"
  },
  {
    "id": "pd-series-ops",
    "title": "פעולות על Series",
    "icon": "🧮",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M3: פעולות על עמודות",
    "module_icon": "⚙️",
    "difficulty": "easy",
    "tags": [
      "New Columns"
    ],
    "url": "pandas-lesson.html?topic=pd-series-ops"
  },
  {
    "id": "pd-groupby-basic",
    "title": "GroupBy בסיסי",
    "icon": "📊",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M4: GroupBy ואגרגציות",
    "module_icon": "🎯",
    "difficulty": "medium",
    "tags": [
      "GroupBy"
    ],
    "url": "pandas-lesson.html?topic=pd-groupby-basic"
  },
  {
    "id": "pd-groupby-deep",
    "title": "GroupBy מתקדם",
    "icon": "🔬",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M4: GroupBy ואגרגציות",
    "module_icon": "🎯",
    "difficulty": "medium",
    "tags": [
      "GroupBy"
    ],
    "url": "pandas-lesson.html?topic=pd-groupby-deep"
  },
  {
    "id": "pd-pivot-like",
    "title": "pivot-like ניתוחים",
    "icon": "🔀",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M4: GroupBy ואגרגציות",
    "module_icon": "🎯",
    "difficulty": "medium",
    "tags": [
      "Pivot"
    ],
    "url": "pandas-lesson.html?topic=pd-pivot-like"
  },
  {
    "id": "pd-sort",
    "title": "sort_values",
    "icon": "🔢",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M5: מיון וסדר",
    "module_icon": "🔄",
    "difficulty": "medium",
    "tags": [
      "Sort"
    ],
    "url": "pandas-lesson.html?topic=pd-sort"
  },
  {
    "id": "pd-set-index",
    "title": "set_index, reset_index",
    "icon": "🗝️",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M5: מיון וסדר",
    "module_icon": "🔄",
    "difficulty": "medium",
    "tags": [
      "Sort"
    ],
    "url": "pandas-lesson.html?topic=pd-set-index"
  },
  {
    "id": "pd-top-n",
    "title": "Top-N (מיון + head)",
    "icon": "🏆",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M5: מיון וסדר",
    "module_icon": "🔄",
    "difficulty": "medium",
    "tags": [
      "Sort"
    ],
    "url": "pandas-lesson.html?topic=pd-top-n"
  },
  {
    "id": "pd-describe",
    "title": "describe ועוד",
    "icon": "📐",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M6: סטטיסטיקה תיאורית",
    "module_icon": "📊",
    "difficulty": "medium",
    "tags": [
      "Aggregations",
      "Statistics"
    ],
    "url": "pandas-lesson.html?topic=pd-describe"
  },
  {
    "id": "pd-value-counts",
    "title": "value_counts, unique, nunique",
    "icon": "📈",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M6: סטטיסטיקה תיאורית",
    "module_icon": "📊",
    "difficulty": "medium",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-value-counts"
  },
  {
    "id": "pd-cumulative",
    "title": "cumsum, pct_change",
    "icon": "📈",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M6: סטטיסטיקה תיאורית",
    "module_icon": "📊",
    "difficulty": "medium",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-cumulative"
  },
  {
    "id": "pd-missing",
    "title": "ערכים חסרים (None / NaN)",
    "icon": "❓",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M7: ניקוי נתונים",
    "module_icon": "🧹",
    "difficulty": "medium",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-missing"
  },
  {
    "id": "pd-rename-drop",
    "title": "rename, drop, drop_duplicates",
    "icon": "✏️",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M7: ניקוי נתונים",
    "module_icon": "🧹",
    "difficulty": "medium",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-rename-drop"
  },
  {
    "id": "pd-astype-clip",
    "title": "astype, clip",
    "icon": "🔧",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M7: ניקוי נתונים",
    "module_icon": "🧹",
    "difficulty": "medium",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-astype-clip"
  },
  {
    "id": "pd-merge-inner",
    "title": "merge - אינר ג",
    "icon": "🔀",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M8: איחוד טבלאות",
    "module_icon": "🔗",
    "difficulty": "medium",
    "tags": [
      "Merge"
    ],
    "url": "pandas-lesson.html?topic=pd-merge-inner"
  },
  {
    "id": "pd-merge-left",
    "title": "merge - LEFT JOIN",
    "icon": "⬅️",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M8: איחוד טבלאות",
    "module_icon": "🔗",
    "difficulty": "medium",
    "tags": [
      "Merge"
    ],
    "url": "pandas-lesson.html?topic=pd-merge-left"
  },
  {
    "id": "pd-concat",
    "title": "concat - UNION",
    "icon": "🧱",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M8: איחוד טבלאות",
    "module_icon": "🔗",
    "difficulty": "medium",
    "tags": [
      "Merge"
    ],
    "url": "pandas-lesson.html?topic=pd-concat"
  },
  {
    "id": "pd-pipeline",
    "title": "Pipelines רב-שלביים",
    "icon": "🚰",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M9: פעולות מתקדמות",
    "module_icon": "🔢",
    "difficulty": "hard",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-pipeline"
  },
  {
    "id": "pd-multistep",
    "title": "ניתוחים רב-שלבים",
    "icon": "🎬",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M9: פעולות מתקדמות",
    "module_icon": "🔢",
    "difficulty": "hard",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-multistep"
  },
  {
    "id": "pd-complex-conditions",
    "title": "תנאים מורכבים",
    "icon": "🧠",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M9: פעולות מתקדמות",
    "module_icon": "🔢",
    "difficulty": "hard",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-complex-conditions"
  },
  {
    "id": "pd-project-churn",
    "title": "Case Study: ניתוח נטישה",
    "icon": "📞",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M10: פרויקטים מסכמים",
    "module_icon": "🏆",
    "difficulty": "hard",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-project-churn"
  },
  {
    "id": "pd-project-salary",
    "title": "Case Study: פערי שכר",
    "icon": "💰",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M10: פרויקטים מסכמים",
    "module_icon": "🏆",
    "difficulty": "hard",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-project-salary"
  },
  {
    "id": "pd-project-sales",
    "title": "Case Study: ניתוח מכירות",
    "icon": "📊",
    "course": "pandas",
    "course_label": "Pandas",
    "module": "M10: פרויקטים מסכמים",
    "module_icon": "🏆",
    "difficulty": "hard",
    "tags": [
      "Load Data"
    ],
    "url": "pandas-lesson.html?topic=pd-project-sales"
  }
],
  
  courses: {
    python: { name: 'יסודות Python', icon: '🐍', color: '#3776ab' },
    pandas: { name: 'Pandas', icon: '🐼', color: '#150458' },
  },
  
  difficulties: {
    easy: { name: 'קל', color: '#10b981', emoji: '🟢' },
    medium: { name: 'בינוני', color: '#f59e0b', emoji: '🟡' },
    hard: { name: 'קשה', color: '#ef4444', emoji: '🔴' },
  }
};
