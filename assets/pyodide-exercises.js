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
          q: 'בנה גרף עמודות של מכירות חודשיות. השתמש ב-12 חודשים (jan, feb, mar...) עם נתוני מכירות [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89] (אלפי שקלים).',
          starter: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]\nrevenue = [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89]\n\n# בנה גרף עמודות:\n',
          solution: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]\nrevenue = [45, 38, 52, 49, 61, 72, 68, 71, 58, 53, 64, 89]\n\nplt.figure(figsize=(10,5))\nplt.bar(months, revenue, color="steelblue")\nplt.title("מכירות חודשיות 2024")\nplt.xlabel("חודש")\nplt.ylabel("מכירות (אלפי ₪)")\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.bar(months, revenue) ואחר כך plt.show()'
        },
        {
          id: 'adv-viz-line',
          title: 'גרף קו - מגמת קורונה',
          theory: '<p>גרף קו טוב להצגת מגמה לאורך זמן. השתמש ב-<code>plt.plot()</code>.</p><pre>plt.plot(x, y, marker="o")</pre>',
          q: 'בנה גרף קו של מקרי קורונה לאורך 8 שבועות. נתונים: dates = ["01/01","08/01","15/01","22/01","29/01","05/02","12/02","19/02"], positive = [3200, 4500, 6100, 8200, 7800, 5300, 3900, 2400]',
          starter: 'import matplotlib.pyplot as plt\n\ndates = ["01/01","08/01","15/01","22/01","29/01","05/02","12/02","19/02"]\npositive = [3200, 4500, 6100, 8200, 7800, 5300, 3900, 2400]\n\n# בנה גרף קו:\n',
          solution: 'import matplotlib.pyplot as plt\n\ndates = ["01/01","08/01","15/01","22/01","29/01","05/02","12/02","19/02"]\npositive = [3200, 4500, 6100, 8200, 7800, 5300, 3900, 2400]\n\nplt.figure(figsize=(10,5))\nplt.plot(dates, positive, marker="o", color="crimson", linewidth=2)\nplt.title("מקרי קורונה - מגמה")\nplt.xlabel("תאריך")\nplt.ylabel("מקרים חיוביים")\nplt.xticks(rotation=45)\nplt.grid(True, alpha=0.3)\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.plot(dates, positive, marker="o")'
        },
        {
          id: 'adv-viz-pie',
          title: 'גרף עוגה - התפלגות מחלקות',
          theory: '<p>גרף עוגה מציג חלקים מסך. <code>plt.pie(values, labels=...)</code>.</p>',
          q: 'בנה גרף עוגה של עובדים לפי מחלקה. נתונים: Sales: 5, R&D: 4, Marketing: 3',
          starter: 'import matplotlib.pyplot as plt\n\ndepartments = ["Sales", "R&D", "Marketing"]\nemployees = [5, 4, 3]\n\n# גרף עוגה:\n',
          solution: 'import matplotlib.pyplot as plt\n\ndepartments = ["Sales", "R&D", "Marketing"]\nemployees = [5, 4, 3]\n\nplt.figure(figsize=(7,7))\nplt.pie(employees, labels=departments, autopct="%1.1f%%", colors=["#ff6b6b","#4ecdc4","#ffe66d"])\nplt.title("התפלגות עובדים לפי מחלקה")\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.pie(employees, labels=departments, autopct="%1.1f%%")'
        },
        {
          id: 'adv-viz-scatter',
          title: 'Scatter plot - שכר מול ותק',
          theory: '<p>Scatter plot מציג קשר בין שני משתנים. <code>plt.scatter(x, y)</code>.</p>',
          q: 'בנה scatter plot המציג שכר (y) לעומת ותק בשנים (x). נתונים: years = [2,5,3,1,7,4,2,8,3,6,1,4], salary = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]',
          starter: 'import matplotlib.pyplot as plt\n\nyears = [2,5,3,1,7,4,2,8,3,6,1,4]\nsalary = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\n# scatter plot:\n',
          solution: 'import matplotlib.pyplot as plt\n\nyears = [2,5,3,1,7,4,2,8,3,6,1,4]\nsalary = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\nplt.figure(figsize=(8,6))\nplt.scatter(years, salary, s=80, c="purple", alpha=0.7)\nplt.title("שכר לעומת ותק")\nplt.xlabel("שנות ותק")\nplt.ylabel("שכר חודשי (₪)")\nplt.grid(True, alpha=0.3)\nplt.show()',
          check: (output, images) => images && images.length >= 1,
          hint: 'plt.scatter(years, salary)'
        },
        {
          id: 'adv-viz-hist',
          title: 'היסטוגרמה - התפלגות גילאים',
          theory: '<p>היסטוגרמה מציגה התפלגות של ערכים. <code>plt.hist(data, bins=10)</code>.</p>',
          q: 'בנה היסטוגרמה של גילאי 15 לקוחות: [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]. השתמש ב-5 bins.',
          starter: 'import matplotlib.pyplot as plt\n\nages = [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]\n\n# היסטוגרמה:\n',
          solution: 'import matplotlib.pyplot as plt\n\nages = [25, 45, 32, 58, 29, 41, 36, 52, 27, 48, 33, 60, 30, 44, 38]\n\nplt.figure(figsize=(8,5))\nplt.hist(ages, bins=5, color="teal", edgecolor="white")\nplt.title("התפלגות גילאי לקוחות")\nplt.xlabel("גיל")\nplt.ylabel("מספר לקוחות")\nplt.show()',
          check: (output, images) => images && images.length >= 1,
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
          q: 'צור מערך numpy של ציוני מבחן [88, 76, 92, 84, 70, 95]. הדפס: ממוצע, מקסימום, סטיית תקן (3 ספרות אחרי הנקודה).',
          starter: 'import numpy as np\n\nscores = np.array([88, 76, 92, 84, 70, 95])\n\n# חישובים:\n',
          solution: 'import numpy as np\n\nscores = np.array([88, 76, 92, 84, 70, 95])\n\nprint(f"ממוצע: {scores.mean():.3f}")\nprint(f"מקסימום: {scores.max()}")\nprint(f"סטיית תקן: {scores.std():.3f}")',
          check: (output) => output.includes('84.') && output.includes('95') && (output.includes('8.') || output.includes('9.')),
          hint: 'scores.mean(), scores.max(), scores.std()'
        },
        {
          id: 'adv-np-stats',
          title: 'סטטיסטיקה תיאורית',
          theory: '<p><code>np.percentile()</code>, <code>np.median()</code>, <code>np.var()</code> לסטטיסטיקה מתקדמת.</p>',
          q: 'יש לנו 12 משכורות: [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]. הדפס: חציון, רבעון Q1, רבעון Q3, ושונות.',
          starter: 'import numpy as np\n\nsalaries = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000])\n\n# סטטיסטיקה:\n',
          solution: 'import numpy as np\n\nsalaries = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000])\n\nprint(f"חציון: {np.median(salaries):.0f}")\nprint(f"Q1 (25%): {np.percentile(salaries, 25):.0f}")\nprint(f"Q3 (75%): {np.percentile(salaries, 75):.0f}")\nprint(f"שונות: {np.var(salaries):.0f}")',
          check: (output) => output.includes('17500') || (output.includes('Q1') && output.includes('Q3')),
          hint: 'np.median(), np.percentile(salaries, 25)'
        },
        {
          id: 'adv-np-random',
          title: 'יצירת נתונים אקראיים',
          theory: '<p><code>np.random</code> ליצירת נתונים אקראיים לבדיקות:</p><pre>np.random.seed(42)  # לשחזור\nnp.random.randint(1, 100, 10)  # 10 מספרים בין 1-100\nnp.random.normal(50, 10, 100)  # התפלגות נורמלית</pre>',
          q: 'צור 100 נתונים אקראיים בהתפלגות נורמלית עם ממוצע 75 וסטיית תקן 10 (seed=42). הדפס את הממוצע והסטיית תקן בפועל.',
          starter: 'import numpy as np\n\nnp.random.seed(42)\n# צור נתונים:\n',
          solution: 'import numpy as np\n\nnp.random.seed(42)\ndata = np.random.normal(75, 10, 100)\nprint(f"ממוצע בפועל: {data.mean():.2f}")\nprint(f"סטיית תקן בפועל: {data.std():.2f}")',
          check: (output) => /\d{2}\.\d{2}/.test(output) && (output.includes('75.') || output.includes('74.') || output.includes('76.') || output.includes('73.')),
          hint: 'np.random.normal(75, 10, 100)'
        },
        {
          id: 'adv-np-matrix',
          title: 'מטריצות וכפל',
          theory: '<p>NumPy מתמחה במטריצות:</p><pre>a = np.array([[1,2],[3,4]])\nb = np.array([[5,6],[7,8]])\nprint(a @ b)  # כפל מטריצות</pre>',
          q: 'צור 2 מטריצות 3x3 והכפל אותן (matrix multiplication). הדפס את התוצאה.',
          starter: 'import numpy as np\n\nA = np.array([[1,2,3],[4,5,6],[7,8,9]])\nB = np.array([[1,0,0],[0,1,0],[0,0,1]])\n\n# כפול את A ב-B:\n',
          solution: 'import numpy as np\n\nA = np.array([[1,2,3],[4,5,6],[7,8,9]])\nB = np.array([[1,0,0],[0,1,0],[0,0,1]])\n\nresult = A @ B\nprint(result)',
          check: (output) => output.includes('[[1 2 3]') || (output.includes('1') && output.includes('5') && output.includes('9')),
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
          q: 'צור DataFrame של 12 עובדים: name, department, salary, years. השתמש ב-describe() להדפיס סטטיסטיקה.',
          starter: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\n\ndf = pd.DataFrame(data)\n# הדפס describe:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\n\ndf = pd.DataFrame(data)\nprint(df.describe())',
          check: (output) => output.includes('salary') && (output.includes('mean') || output.includes('std')),
          hint: 'df.describe() נותן סטטיסטיקה מלאה'
        },
        {
          id: 'adv-pd-filter',
          title: 'סינון מתקדם עם תנאים',
          theory: '<p>בpandas אמיתי - סינון וקטורי:</p><pre>df[df["salary"] > 20000]  # שכר מעל 20K\ndf[(df["years"] > 3) & (df["department"] == "Sales")]\n</pre>',
          q: 'מתוך הטבלה: סנן עובדים שמשכורת > 18000 וגם ותק > 3 שנים. הדפס את שמותיהם.',
          starter: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\n# סנן:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "name": ["Avi","Bni","Galit","Dana","Hila","Victor","Zohar","Hani","Tal","Yossi","Carmel","Liat"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\nresult = df[(df["salary"] > 18000) & (df["years"] > 3)]\nprint(result["name"].tolist())',
          check: (output) => output.includes('Bni') && output.includes('Hila') && output.includes('Yossi'),
          hint: 'df[(df["salary"] > 18000) & (df["years"] > 3)]'
        },
        {
          id: 'adv-pd-groupby',
          title: 'GroupBy עם aggregation מרובה',
          theory: '<p><code>.agg()</code> מאפשרת aggregations שונים בו-זמנית:</p><pre>df.groupby("department").agg({\n    "salary": ["mean", "sum", "count"],\n    "years": "max"\n})</pre>',
          q: 'קבץ לפי department והדפס: ממוצע שכר + סך שכר + מספר עובדים + מקסימום ותק.',
          starter: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\n# קבץ:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\n\nresult = df.groupby("department").agg({\n    "salary": ["mean", "sum", "count"],\n    "years": "max"\n})\nprint(result)',
          check: (output) => output.includes('R&D') && output.includes('Sales') && output.includes('Marketing'),
          hint: 'df.groupby("department").agg({"salary": ["mean", "sum"], "years": "max"})'
        },
        {
          id: 'adv-pd-pivot',
          title: 'Pivot Table',
          theory: '<p><code>pd.pivot_table()</code> דומה לאקסל - שורות, עמודות, ערכים:</p><pre>df.pivot_table(index="dept", columns="plan", values="salary", aggfunc="mean")</pre>',
          q: 'צור pivot table של שכר ממוצע, שורות=department, עמודות=plan_type (Senior/Junior - תקבע לפי years>=4).',
          starter: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\ndf["seniority"] = df["years"].apply(lambda y: "Senior" if y >= 4 else "Junior")\n\n# pivot table:\n',
          solution: 'import pandas as pd\n\ndata = {\n    "department": ["Sales","R&D","Sales","Marketing","R&D","Sales","Marketing","R&D","Sales","R&D","Marketing","Sales"],\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4]\n}\ndf = pd.DataFrame(data)\ndf["seniority"] = df["years"].apply(lambda y: "Senior" if y >= 4 else "Junior")\n\nresult = df.pivot_table(index="department", columns="seniority", values="salary", aggfunc="mean")\nprint(result)',
          check: (output) => output.includes('Senior') && output.includes('Junior'),
          hint: 'pivot_table(index="department", columns="seniority", values="salary", aggfunc="mean")'
        },
        {
          id: 'adv-pd-merge',
          title: 'Merge - חיבור 2 טבלאות',
          theory: '<p><code>pd.merge()</code> כמו JOIN ב-SQL:</p><pre>pd.merge(df1, df2, on="id", how="inner")</pre>',
          q: 'יש 2 טבלאות - employees ו-departments. חבר ביניהם לפי dept_id והדפס תוצאה.',
          starter: 'import pandas as pd\n\nemployees = pd.DataFrame({\n    "name": ["Avi", "Bni", "Galit", "Dana"],\n    "dept_id": [1, 2, 1, 3],\n    "salary": [15000, 22000, 18000, 13000]\n})\n\ndepartments = pd.DataFrame({\n    "dept_id": [1, 2, 3],\n    "dept_name": ["Sales", "R&D", "Marketing"],\n    "location": ["TLV", "RAM", "JLM"]\n})\n\n# Merge:\n',
          solution: 'import pandas as pd\n\nemployees = pd.DataFrame({\n    "name": ["Avi", "Bni", "Galit", "Dana"],\n    "dept_id": [1, 2, 1, 3],\n    "salary": [15000, 22000, 18000, 13000]\n})\n\ndepartments = pd.DataFrame({\n    "dept_id": [1, 2, 3],\n    "dept_name": ["Sales", "R&D", "Marketing"],\n    "location": ["TLV", "RAM", "JLM"]\n})\n\nresult = pd.merge(employees, departments, on="dept_id", how="inner")\nprint(result)',
          check: (output) => output.includes('Sales') && output.includes('TLV') && output.includes('Avi'),
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
          q: 'יש 15 לקוחות. חשב churn rate (אחוז עם churn=1) וצור גרף עוגה של נטישו vs נשארו.',
          starter: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    "customer_id": list(range(101, 116)),\n    "churn": [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0]\n}\ndf = pd.DataFrame(data)\n\n# חשב churn rate והצג גרף:\n',
          solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    "customer_id": list(range(101, 116)),\n    "churn": [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0]\n}\ndf = pd.DataFrame(data)\n\nchurn_rate = df["churn"].mean() * 100\nprint(f"Churn rate: {churn_rate:.1f}%")\n\ncounts = df["churn"].value_counts()\nplt.figure(figsize=(7,7))\nplt.pie(counts, labels=["Stayed","Churned"], autopct="%1.1f%%", colors=["#4ecdc4","#ff6b6b"])\nplt.title("נטישת לקוחות")\nplt.show()',
          check: (output, images) => output.includes('Churn') && images && images.length >= 1,
          hint: 'mean() של עמודת churn = churn rate'
        },
        {
          id: 'adv-combo-segment',
          title: 'סגמנטציה - תרגיל מסכם',
          theory: '<p>חלוקת לקוחות לפי שכר: Low (<15K), Mid (15-20K), High (>20K). הצג בגרף.</p>',
          q: 'חלק 12 משכורות לקטגוריות (Low/Mid/High) וצור גרף עמודות שמראה כמה בכל קטגוריה.',
          starter: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\nsalaries = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\n# חלק לקטגוריות:\n',
          solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\nsalaries = [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000]\n\ndf = pd.DataFrame({"salary": salaries})\n\ndef segment(s):\n    if s < 15000: return "Low"\n    elif s <= 20000: return "Mid"\n    else: return "High"\n\ndf["segment"] = df["salary"].apply(segment)\ncounts = df["segment"].value_counts()\nprint(counts)\n\nplt.figure(figsize=(7,5))\nplt.bar(counts.index, counts.values, color=["#3b82f6","#10b981","#f59e0b"])\nplt.title("התפלגות שכר לפי סגמנט")\nplt.ylabel("מספר עובדים")\nplt.show()',
          check: (output, images) => (output.includes('Low') || output.includes('Mid') || output.includes('High')) && images && images.length >= 1,
          hint: 'apply(segment) ואז value_counts()'
        },
        {
          id: 'adv-combo-correlation',
          title: 'מטריצת קורלציה + heatmap',
          theory: '<p><code>df.corr()</code> מחזיר מטריצת קורלציה. ערכים: 1 = קורלציה חיובית מלאה, -1 = שלילית, 0 = אין.</p>',
          q: 'חשב והדפס מטריצת קורלציה בין salary, years, age (15 עובדים).',
          starter: 'import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\ndata = {\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000, 21000, 26000, 16500],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4, 5, 7, 3],\n    "age": [25, 45, 32, 22, 50, 35, 28, 55, 30, 48, 24, 38, 42, 52, 33]\n}\ndf = pd.DataFrame(data)\n\n# קורלציה:\n',
          solution: 'import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\ndata = {\n    "salary": [15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000, 12000, 19000, 21000, 26000, 16500],\n    "years": [2, 5, 3, 1, 7, 4, 2, 8, 3, 6, 1, 4, 5, 7, 3],\n    "age": [25, 45, 32, 22, 50, 35, 28, 55, 30, 48, 24, 38, 42, 52, 33]\n}\ndf = pd.DataFrame(data)\n\nprint(df.corr().round(3))',
          check: (output) => output.includes('salary') && output.includes('years') && output.includes('age'),
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
          q: 'אמן מודל רגרסיה לינארית: years → salary. נבא שכר עבור 6 שנות ותק.',
          starter: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nyears = np.array([[2],[5],[3],[1],[7],[4],[2],[8],[3],[6]])\nsalary = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000])\n\n# אמן מודל ונבא 6 שנים:\n',
          solution: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nyears = np.array([[2],[5],[3],[1],[7],[4],[2],[8],[3],[6]])\nsalary = np.array([15000, 22000, 18000, 13000, 25000, 16000, 14000, 28000, 17000, 23000])\n\nmodel = LinearRegression()\nmodel.fit(years, salary)\n\nprediction = model.predict([[6]])\nprint(f"תחזית עבור 6 שנים: ₪{prediction[0]:.0f}")\nprint(f"שיפוע: {model.coef_[0]:.0f} ₪ לשנה")\nprint(f"חיתוך: {model.intercept_:.0f}")',
          check: (output) => output.includes('₪') && /₪\s*\d{5}/.test(output),
          hint: 'model.fit(years, salary).predict([[6]])'
        },
        {
          id: 'adv-ml-cluster',
          title: 'K-Means Clustering',
          theory: '<p>K-Means מחלק נקודות ל-K קבוצות. שימושי לסגמנטציה.</p><pre>from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=3, random_state=42, n_init=10)\nkm.fit(X)\nprint(km.labels_)</pre>',
          q: 'חלק 12 לקוחות ל-3 קבוצות לפי [age, salary]. הדפס את התוויות.',
          starter: 'import numpy as np\nfrom sklearn.cluster import KMeans\n\ndata = np.array([\n    [25, 15000], [45, 22000], [32, 18000], [22, 13000],\n    [50, 25000], [35, 16000], [28, 14000], [55, 28000],\n    [30, 17000], [48, 23000], [24, 12000], [38, 19000]\n])\n\n# K-Means עם 3 קבוצות:\n',
          solution: 'import numpy as np\nfrom sklearn.cluster import KMeans\n\ndata = np.array([\n    [25, 15000], [45, 22000], [32, 18000], [22, 13000],\n    [50, 25000], [35, 16000], [28, 14000], [55, 28000],\n    [30, 17000], [48, 23000], [24, 12000], [38, 19000]\n])\n\nkm = KMeans(n_clusters=3, random_state=42, n_init=10)\nkm.fit(data)\nprint("Cluster labels:", km.labels_)\nprint("Centers:")\nprint(km.cluster_centers_.round(0))',
          check: (output) => output.includes('Cluster') || output.includes('labels'),
          hint: 'KMeans(n_clusters=3, random_state=42, n_init=10).fit(data)'
        },
        {
          id: 'adv-ml-classify',
          title: 'סיווג - חיזוי churn',
          theory: '<p>לוגיסטית רגרסיה מסווגת לקטגוריות (0/1). שימושי לחיזוי churn.</p>',
          q: 'אמן מודל לחיזוי churn לפי [age, monthly_bill, tenure_months]. הדפס דיוק.',
          starter: 'import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\n\nX = np.array([\n    [25, 45.5, 12], [45, 120.0, 60], [32, 80.3, 24], [58, 150.0, 84], [29, 35.0, 6],\n    [41, 95.0, 36], [36, 70.5, 18], [52, 130.0, 72], [27, 50.0, 8], [48, 110.0, 48],\n    [33, 65.0, 30], [60, 140.0, 96], [30, 55.0, 14], [44, 100.0, 42], [38, 75.0, 22]\n])\ny = np.array([0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0])\n\n# אמן מודל:\n',
          solution: 'import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\n\nX = np.array([\n    [25, 45.5, 12], [45, 120.0, 60], [32, 80.3, 24], [58, 150.0, 84], [29, 35.0, 6],\n    [41, 95.0, 36], [36, 70.5, 18], [52, 130.0, 72], [27, 50.0, 8], [48, 110.0, 48],\n    [33, 65.0, 30], [60, 140.0, 96], [30, 55.0, 14], [44, 100.0, 42], [38, 75.0, 22]\n])\ny = np.array([0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0])\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X, y)\naccuracy = model.score(X, y)\nprint(f"דיוק האימון: {accuracy:.2%}")',
          check: (output) => output.includes('%') || output.includes('דיוק') || output.includes('accuracy') || output.includes('0.'),
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
