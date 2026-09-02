/* =============================================================
   C LEARNING PLATFORM — chapters/ch19-projects/ch19.js
   Chapter 19: Projects
   3 projects · 7-step build flow · Modal popup assessments
   ============================================================= */

;(function () {
  'use strict'

  const CH = 'ch19'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ── renderPracticeSet ─────────────────────────────────────── */
  function renderPracticeSet (containerId, chapterId, topicId, configs) {
    const container = $(containerId)
    if (!container) return
    let idx = 0
    function renderTask (i) {
      if (i >= configs.length) {
        container.innerHTML = '<p class="practice-complete">All extensions complete! ✓</p>'
        Progress.saveTopicComplete(chapterId, topicId + '-practice')
        return
      }
      const cfg = configs[i]
      const wrap = document.createElement('div')
      wrap.className = 'practice-task'
      const hdr = document.createElement('div')
      hdr.className = 'practice-task__header'
      const num = document.createElement('span')
      num.className = 'practice-task__num'
      num.textContent = 'Extension ' + (i + 1) + ' of ' + configs.length
      const dots = document.createElement('div')
      dots.className = 'practice-task__dots'
      for (let j = 0; j < configs.length; j++) {
        const dot = document.createElement('span')
        dot.className = 'dot' + (j < i ? ' dot--done' : j === i ? ' dot--active' : '')
        dots.appendChild(dot)
      }
      hdr.appendChild(num); hdr.appendChild(dots)
      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      const compEl = document.createElement('div')
      compEl.id = 'prac-' + containerId + '-' + i
      wrap.appendChild(hdr); wrap.appendChild(desc); wrap.appendChild(compEl)
      container.innerHTML = ''
      container.appendChild(wrap)
      CCompiler.initBlock(compEl, {
        mode: 'build',
        topicId: topicId + '-ext' + (i + 1),
        chapterId: chapterId,
        question: cfg.task,
        includes: cfg.includes || ['<stdio.h>', '<string.h>'],
        starterCode: cfg.starter || '',
        checkFn: cfg.check,
        hint: cfg.hint,
        solution: cfg.solution,
        onPass: function () { idx++; setTimeout(function () { renderTask(idx) }, 800) }
      })
    }
    renderTask(0)
  }

  /* ══════════════════════════════════════════════════════════════
     PROJECT 1 — GPA CALCULATOR
     ══════════════════════════════════════════════════════════════ */
  function initTopic_gpa () {
    const topicId = 'ch19-gpa'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — Explore: minimal average calculation */
    CCompiler.initBlock($('compiler-ch19-gpa-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`float grades[] = {85.0, 90.0, 78.0, 92.0, 88.0};
int n = 5;
float sum = 0;
int i;
for (i = 0; i < n; i++) sum += grades[i];
float avg = sum / n;
printf("Average score: %.2f\\n", avg);
printf("GPA (5.0):     %.2f\\n", avg / 100.0 * 5.0);`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — Instant Question */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch19-gpa',
      question: 'The average score was 86.6 and the GPA on a 5.0 scale was 4.33. What formula converts a percentage score (0–100) to a 5.0 GPA?',
      options: [
        'score * 5.0',
        'score / 100.0 * 5.0',
        'score - 50.0 / 10.0',
        '(score / 20.0) - 1.0'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — dividing by 100 normalises the score to [0,1], multiplying by 5 scales it to [0,5]. A 100% score gives 5.0; an 86.6% score gives 4.33.',
        incorrect: 'The formula is score / 100.0 * 5.0. Dividing by 100 gives the proportion (0.866), multiplying by 5 gives the GPA (4.33).'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch19-gpa-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — Build the struct and roster */
    CCompiler.initBlock($('compiler-ch19-gpa-struct'), {
      mode: 'build', topicId: topicId + '-struct', chapterId: CH,
      question: 'Define the Student typedef struct with name[30], id (int), grades[5] (float), and gpa (float). Declare a roster of 3 students with hardcoded data. Loop and print each student\'s name and id to confirm.',
      includes: ['<stdio.h>', '<string.h>'],
      starterCode: '',
      checkFn: output => output.includes('Alice') && output.includes('Bob') && output.includes('Carol'),
      hint: 'typedef struct { char name[30]; int id; float grades[5]; float gpa; } Student; Then declare Student roster[3]; and use strcpy/assignment to fill each student, or use initializer lists.',
      solution:
`typedef struct {
    char  name[30];
    int   id;
    float grades[5];
    float gpa;
} Student;

Student roster[3];
int i;

strcpy(roster[0].name, "Alice");  roster[0].id = 101;
roster[0].grades[0]=90; roster[0].grades[1]=85; roster[0].grades[2]=92;
roster[0].grades[3]=88; roster[0].grades[4]=95; roster[0].gpa = 0;

strcpy(roster[1].name, "Bob");    roster[1].id = 102;
roster[1].grades[0]=75; roster[1].grades[1]=80; roster[1].grades[2]=70;
roster[1].grades[3]=85; roster[1].grades[4]=78; roster[1].gpa = 0;

strcpy(roster[2].name, "Carol");  roster[2].id = 103;
roster[2].grades[0]=95; roster[2].grades[1]=92; roster[2].grades[2]=98;
roster[2].grades[3]=90; roster[2].grades[4]=94; roster[2].gpa = 0;

for (i = 0; i < 3; i++) {
    printf("Name: %-10s  ID: %d\\n", roster[i].name, roster[i].id);
}`,
      onPass: () => sm.complete(4)
    })

    /* Step 5 — Add computeGPA and print */
    CCompiler.initBlock($('compiler-ch19-gpa-compute'), {
      mode: 'build', topicId: topicId + '-compute', chapterId: CH,
      question: 'Add a computeGPA(Student *s) function that averages s->grades[0..4] and stores the result in s->gpa. Call it for each student in the roster, then print each name with their computed GPA.',
      includes: ['<stdio.h>', '<string.h>'],
      starterCode: '',
      checkFn: output => {
        const hasAlice = output.includes('Alice')
        const hasGPA   = /\d+\.\d{2}/.test(output)
        const lines    = output.trim().split('\n').filter(l => l.trim()).length
        return hasAlice && hasGPA && lines >= 3
      },
      hint: 'void computeGPA(Student *s) { float sum=0; int i; for(i=0;i<5;i++) sum+=s->grades[i]; s->gpa=sum/5.0f; } Call: computeGPA(&roster[i]);',
      solution:
`typedef struct { char name[30]; int id; float grades[5]; float gpa; } Student;

void computeGPA(Student *s) {
    float sum = 0; int i;
    for (i = 0; i < 5; i++) sum += s->grades[i];
    s->gpa = sum / 5.0f;
}

Student roster[3];
int i;
strcpy(roster[0].name,"Alice"); roster[0].id=101;
roster[0].grades[0]=90;roster[0].grades[1]=85;roster[0].grades[2]=92;roster[0].grades[3]=88;roster[0].grades[4]=95;roster[0].gpa=0;
strcpy(roster[1].name,"Bob"); roster[1].id=102;
roster[1].grades[0]=75;roster[1].grades[1]=80;roster[1].grades[2]=70;roster[1].grades[3]=85;roster[1].grades[4]=78;roster[1].gpa=0;
strcpy(roster[2].name,"Carol"); roster[2].id=103;
roster[2].grades[0]=95;roster[2].grades[1]=92;roster[2].grades[2]=98;roster[2].grades[3]=90;roster[2].grades[4]=94;roster[2].gpa=0;

for (i = 0; i < 3; i++) computeGPA(&roster[i]);
for (i = 0; i < 3; i++) printf("%-10s ID:%d  GPA:%.2f\\n", roster[i].name, roster[i].id, roster[i].gpa);`,
      onPass: () => sm.complete(5)
    })

    /* Step 6 — Complete project */
    CCompiler.initBlock($('compiler-ch19-gpa-build'), {
      mode: 'build', topicId: topicId + '-full', chapterId: CH,
      question: 'Complete the GPA Calculator. After computing all GPAs, find the top student (highest gpa), print the full formatted report with a header line, then announce the top student with their GPA.',
      includes: ['<stdio.h>', '<string.h>'],
      starterCode: '',
      checkFn: output => {
        return output.includes('Alice') && output.includes('Carol') &&
               (output.toLowerCase().includes('top') || output.toLowerCase().includes('best') || output.toLowerCase().includes('highest'))
      },
      hint: 'Track topIdx=0. In a loop: if roster[i].gpa > roster[topIdx].gpa, topIdx=i. After the report loop: printf("Top student: %s (%.2f GPA)\\n", roster[topIdx].name, roster[topIdx].gpa);',
      solution:
`typedef struct { char name[30]; int id; float grades[5]; float gpa; } Student;

void computeGPA(Student *s) {
    float sum=0; int i;
    for(i=0;i<5;i++) sum+=s->grades[i];
    s->gpa=sum/5.0f;
}

Student roster[3];
int i, topIdx=0;
strcpy(roster[0].name,"Alice"); roster[0].id=101;
roster[0].grades[0]=90;roster[0].grades[1]=85;roster[0].grades[2]=92;roster[0].grades[3]=88;roster[0].grades[4]=95;roster[0].gpa=0;
strcpy(roster[1].name,"Bob"); roster[1].id=102;
roster[1].grades[0]=75;roster[1].grades[1]=80;roster[1].grades[2]=70;roster[1].grades[3]=85;roster[1].grades[4]=78;roster[1].gpa=0;
strcpy(roster[2].name,"Carol"); roster[2].id=103;
roster[2].grades[0]=95;roster[2].grades[1]=92;roster[2].grades[2]=98;roster[2].grades[3]=90;roster[2].grades[4]=94;roster[2].gpa=0;

for(i=0;i<3;i++) computeGPA(&roster[i]);

printf("=== GPA Report ===\\n");
printf("%-10s %5s  %6s\\n","Name","ID","GPA");
printf("%-10s %5s  %6s\\n","----------","-----","------");
for(i=0;i<3;i++){
    printf("%-10s %5d  %.2f\\n",roster[i].name,roster[i].id,roster[i].gpa);
    if(roster[i].gpa>roster[topIdx].gpa) topIdx=i;
}
printf("\\nTop student: %s  GPA: %.2f\\n",roster[topIdx].name,roster[topIdx].gpa);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    /* Assessment */
    function renderAssessment () {
      const predictQ = [
        {
          id: 'ch19-gp-p1', type: 'predict',
          question: 'What does this print?',
          code: `float g[] = {80.0, 90.0, 70.0};\nfloat sum = 0;\nint i;\nfor (i = 0; i < 3; i++) sum += g[i];\nprintf("%.1f\\n", sum / 3.0);`,
          correct: ['80.0'],
          caseSensitive: true, orderMatters: true,
          hint: '(80+90+70)/3 = 240/3 = 80.',
          feedback: { correct: 'Correct — average is 80.0.', incorrect: '80+90+70=240. 240/3=80.0.' }
        },
        {
          id: 'ch19-gp-p2', type: 'predict',
          question: 'What does this print?',
          code: `float gpas[] = {3.5, 4.2, 3.8};\nint top = 0, i;\nfor (i = 1; i < 3; i++)\n    if (gpas[i] > gpas[top]) top = i;\nprintf("%d\\n", top);`,
          correct: ['1'],
          caseSensitive: true, orderMatters: true,
          hint: 'gpas[1]=4.2 is the highest. top ends at index 1.',
          feedback: { correct: 'Correct — 4.2 is the highest, at index 1.', incorrect: 'Loop compares each gpa to gpas[top]. 4.2 > 3.5 → top=1. 3.8 < 4.2 → no change. Result: 1.' }
        },
        {
          id: 'ch19-gp-p3', type: 'predict',
          question: 'What does this print?',
          code: `typedef struct { int id; float gpa; } S;\nS students[2];\nstudents[0].id=1; students[0].gpa=3.5;\nstudents[1].id=2; students[1].gpa=4.0;\nprintf("%d\\n", students[1].id);\nprintf("%.1f\\n", students[0].gpa);`,
          correct: ['2\n3.5', '2\r\n3.5'],
          caseSensitive: true, orderMatters: true,
          hint: 'students[1].id is 2; students[0].gpa is 3.5.',
          feedback: { correct: 'Correct — index 1 id is 2; index 0 gpa is 3.5.', incorrect: 'students[1].id=2. students[0].gpa=3.5. Printed on two lines.' }
        }
      ]

      const mcqQ = [
        {
          id: 'ch19-gp-m1', type: 'mcq',
          question: 'Why does computeGPA take a pointer (Student *s) instead of a value (Student s)?',
          options: [
            'Pointers are faster to type',
            'The function writes to s->gpa, which must modify the original — a value copy would discard the change',
            'Structs cannot be passed by value in C',
            'Pointers allow the function to return two values at once'
          ],
          correct: ['The function writes to s->gpa, which must modify the original — a value copy would discard the change'],
          caseSensitive: false, orderMatters: false,
          hint: 'What happens to changes made to a value parameter?',
          feedback: { correct: 'Correct — by-value passes a copy. Any writes to that copy are discarded when the function returns. A pointer lets the function write to the caller\'s actual struct.', incorrect: 'computeGPA writes s->gpa. With a value parameter, that write goes to a local copy and is lost. A pointer lets the function modify the original struct.' }
        },
        {
          id: 'ch19-gp-m2', type: 'mcq',
          question: 'What is the index of the top student if GPAs are {3.5, 4.2, 3.8} and we track with: int top=0; if (gpa[i]>gpa[top]) top=i?',
          options: ['0', '1', '2', '3'],
          correct: ['1'],
          caseSensitive: false, orderMatters: false,
          hint: 'Which index holds the highest value 4.2?',
          feedback: { correct: 'Correct — index 1 holds 4.2, which is greater than both 3.5 and 3.8.', incorrect: 'i=1: 4.2>3.5 → top=1. i=2: 3.8>4.2 is false. Final top=1.' }
        },
        {
          id: 'ch19-gp-m3', type: 'mcq',
          question: 'How do you correctly copy "Alice" into a char name[30] struct member?',
          options: ['name = "Alice"', 'name[] = "Alice"', 'strcpy(name, "Alice")', '*name = "Alice"'],
          correct: ['strcpy(name, "Alice")'],
          caseSensitive: false, orderMatters: false,
          hint: 'Arrays cannot be assigned with =.',
          feedback: { correct: 'Correct — strcpy copies string content into a char array. Arrays cannot be assigned with =.', incorrect: 'Array assignment with = is illegal in C after declaration. Use strcpy(name, "Alice") from <string.h>.' }
        },
        {
          id: 'ch19-gp-m4', type: 'mcq',
          question: 'What does sizeof(grades) / sizeof(grades[0]) give for float grades[5]?',
          options: ['5', '20', '4', '1'],
          correct: ['5'],
          caseSensitive: false, orderMatters: false,
          hint: 'sizeof(float grades[5]) = 20 bytes. sizeof(float) = 4 bytes.',
          feedback: { correct: 'Correct — 20 bytes total / 4 bytes per float = 5 elements.', incorrect: 'sizeof(grades)=20 (5 floats × 4 bytes). sizeof(grades[0])=4 (one float). 20/4=5.' }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Add a 4th student: Maria, ID 104, grades {95, 98, 92, 97, 99}. Compute her GPA (average of those 5 grades) and print her name and GPA.',
          includes: ['<stdio.h>'],
          check: output => output.includes('Maria') && (output.includes('96') || output.includes('96.2')),
          hint: '95+98+92+97+99=481. 481/5=96.2. Print Maria and 96.20.',
          solution: `float g[] = {95,98,92,97,99};\nfloat sum=0; int i;\nfor(i=0;i<5;i++) sum+=g[i];\nprintf("Maria  GPA: %.2f\\n", sum/5.0);`
        },
        {
          id: 'p2',
          task: 'Given GPA array {3.5, 4.2, 3.8, 4.5, 3.1}, print only the GPAs that are above 3.7, each on its own line.',
          includes: ['<stdio.h>'],
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            return lines.length === 3 && output.includes('4.2') && output.includes('3.8') && output.includes('4.5')
          },
          hint: 'float gpas[]={3.5,4.2,3.8,4.5,3.1}; Loop: if(gpas[i]>3.7) printf("%.1f\\n",gpas[i]);',
          solution: `float gpas[]={3.5f,4.2f,3.8f,4.5f,3.1f};\nint i;\nfor(i=0;i<5;i++) if(gpas[i]>3.7) printf("%.1f\\n",gpas[i]);`
        },
        {
          id: 'p3',
          task: 'Given scores {88, 72, 95, 61, 84}, compute the class average, then print each score and whether it is above or below the average.',
          includes: ['<stdio.h>'],
          check: output => output.includes('80') && (output.toLowerCase().includes('above') || output.toLowerCase().includes('below')),
          hint: 'Sum first to get avg=80. Then loop: if score>=avg print "Above" else "Below". (88+72+95+61+84)/5=400/5=80.',
          solution: `int scores[]={88,72,95,61,84};\nfloat sum=0; int i;\nfor(i=0;i<5;i++) sum+=scores[i];\nfloat avg=sum/5.0;\nprintf("Average: %.1f\\n",avg);\nfor(i=0;i<5;i++) printf("%d: %s\\n",scores[i],scores[i]>=avg?"Above":"Below");`
        }
      ]

      renderPracticeSet('practice-ch19-gpa', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch19-gpa-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch19-gpa-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch19-gpa-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This GPA calculator always reports 0.00 GPA for every student. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`typedef struct { char name[20]; float grades[3]; float gpa; } Student;

void computeGPA(Student s) {
    float sum = 0; int i;
    for (i = 0; i < 3; i++) sum += s.grades[i];
    s.gpa = sum / 3.0f;
}

Student bob;
bob.grades[0]=80; bob.grades[1]=90; bob.grades[2]=85; bob.gpa=0;
computeGPA(bob);
printf("GPA: %.2f\\n", bob.gpa);`,
        checkFn: output => output.includes('85') || output.includes('85.00'),
        hint: 'computeGPA takes a Student value — it receives a copy. Changes to s.gpa inside the function disappear when it returns. Bob\'s gpa stays 0.00.',
        hintTwo: 'Change the parameter to Student *s and use s->gpa and s->grades[i] inside. Call as computeGPA(&bob). Now the function writes to the original struct.',
        solution: `typedef struct { char name[20]; float grades[3]; float gpa; } Student;\nvoid computeGPA(Student *s) {\n    float sum=0; int i;\n    for(i=0;i<3;i++) sum+=s->grades[i];\n    s->gpa=sum/3.0f;\n}\nStudent bob;\nbob.grades[0]=80; bob.grades[1]=90; bob.grades[2]=85; bob.gpa=0;\ncomputeGPA(&bob);\nprintf("GPA: %.2f\\n", bob.gpa);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'GPA Calculator — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     PROJECT 2 — INVENTORY SYSTEM
     ══════════════════════════════════════════════════════════════ */
  function initTopic_inventory () {
    const topicId = 'ch19-inventory'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — Explore */
    CCompiler.initBlock($('compiler-ch19-inventory-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`typedef struct {
    int   id;
    char  name[20];
    int   qty;
    float price;
} Product;

Product p;
p.id    = 1;
p.qty   = 50;
p.price = 45.99;

printf("ID: %d  Qty: %d  Price: %.2f\\n", p.id, p.qty, p.price);
printf("Total value: %.2f\\n", p.qty * p.price);`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — Instant Question */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch19-inventory',
      question: 'Total value was 2299.50 (50 × 45.99). For the full inventory system, we need to sum these total values across all products. What kind of variable accumulates a running total in a loop?',
      options: [
        'A counter variable incremented by 1 each iteration',
        'A running sum variable — initialised to 0, then total += product_value each iteration',
        'An average computed at the end of the loop',
        'An index tracking the current maximum'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — a running sum (float total = 0.0; total += qty * price;) accumulates across every product in the loop.',
        incorrect: 'A running sum initialised to 0 accumulates the values: total += cat[i].qty * cat[i].price. After the loop, total holds the grand total.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch19-inventory-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — Build the struct and catalogue */
    CCompiler.initBlock($('compiler-ch19-inventory-struct'), {
      mode: 'build', topicId: topicId + '-struct', chapterId: CH,
      question: 'Define the Product typedef struct (id, name[20], qty, price). Create a catalogue array of 4 products. Loop and print each product\'s id and name to confirm the data is stored.',
      includes: ['<stdio.h>', '<string.h>'],
      starterCode: '',
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 4
      },
      hint: 'typedef struct { int id; char name[20]; int qty; float price; } Product; Declare Product cat[4]; Use strcpy for names. Loop to print cat[i].id and cat[i].name.',
      solution:
`typedef struct { int id; char name[20]; int qty; float price; } Product;
Product cat[4];
int i;
cat[0].id=1; strcpy(cat[0].name,"Notebook");  cat[0].qty=50;  cat[0].price=45.99f;
cat[1].id=2; strcpy(cat[1].name,"Pen Pack");   cat[1].qty=100; cat[1].price=12.50f;
cat[2].id=2; strcpy(cat[2].name,"USB Drive");  cat[2].qty=25;  cat[2].price=299.00f;
cat[3].id=4; strcpy(cat[3].name,"Mouse Pad");  cat[3].qty=75;  cat[3].price=89.00f;
for(i=0;i<4;i++) printf("ID:%d  %s\\n", cat[i].id, cat[i].name);`,
      onPass: () => sm.complete(4)
    })

    /* Step 5 — Add formatted table */
    CCompiler.initBlock($('compiler-ch19-inventory-table'), {
      mode: 'build', topicId: topicId + '-table', chapterId: CH,
      question: 'Print a formatted table with header row: ID | Name | Qty | Price | Value. Then loop and print each product\'s row with qty × price as the per-product total value.',
      includes: ['<stdio.h>', '<string.h>'],
      starterCode: '',
      checkFn: output => {
        const hasHeader = output.toLowerCase().includes('name') || output.toLowerCase().includes('price')
        const lines     = output.trim().split('\n').filter(l => l.trim()).length
        return hasHeader && lines >= 6
      },
      hint: 'printf("%-4s %-15s %5s %10s %12s\\n","ID","Name","Qty","Price","Value"); Then in loop: float val=cat[i].qty*cat[i].price; printf("%-4d %-15s %5d %10.2f %12.2f\\n",...,val);',
      solution:
`typedef struct { int id; char name[20]; int qty; float price; } Product;
Product cat[4];
int i;
cat[0].id=1; strcpy(cat[0].name,"Notebook");  cat[0].qty=50;  cat[0].price=45.99f;
cat[1].id=2; strcpy(cat[1].name,"Pen Pack");   cat[1].qty=100; cat[1].price=12.50f;
cat[2].id=3; strcpy(cat[2].name,"USB Drive");  cat[2].qty=25;  cat[2].price=299.00f;
cat[3].id=4; strcpy(cat[3].name,"Mouse Pad");  cat[3].qty=75;  cat[3].price=89.00f;

printf("%-4s %-15s %5s %10s %12s\\n","ID","Name","Qty","Price","Total");
printf("%-4s %-15s %5s %10s %12s\\n","---","---------------","-----","----------","------------");
for(i=0;i<4;i++){
    float val=cat[i].qty*cat[i].price;
    printf("%-4d %-15s %5d %10.2f %12.2f\\n",cat[i].id,cat[i].name,cat[i].qty,cat[i].price,val);
}`,
      onPass: () => sm.complete(5)
    })

    /* Step 6 — Complete with totals and search */
    CCompiler.initBlock($('compiler-ch19-inventory-build'), {
      mode: 'build', topicId: topicId + '-full', chapterId: CH,
      question: 'Complete the system. After printing the table, compute and print the total inventory value (sum of all qty×price). Also find and print the most expensive item (highest unit price).',
      includes: ['<stdio.h>', '<string.h>'],
      starterCode: '',
      checkFn: output => {
        return (output.includes('17699') || output.includes('17700')) &&
               (output.includes('USB') || output.includes('299'))
      },
      hint: 'float total=0; int maxIdx=0; In loop: total+=val; if(cat[i].price>cat[maxIdx].price) maxIdx=i; After loop: printf totals and cat[maxIdx].name.',
      solution:
`typedef struct { int id; char name[20]; int qty; float price; } Product;
Product cat[4];
int i, maxIdx=0;
float total=0;
cat[0].id=1; strcpy(cat[0].name,"Notebook");  cat[0].qty=50;  cat[0].price=45.99f;
cat[1].id=2; strcpy(cat[1].name,"Pen Pack");   cat[1].qty=100; cat[1].price=12.50f;
cat[2].id=3; strcpy(cat[2].name,"USB Drive");  cat[2].qty=25;  cat[2].price=299.00f;
cat[3].id=4; strcpy(cat[3].name,"Mouse Pad");  cat[3].qty=75;  cat[3].price=89.00f;

printf("%-4s %-15s %5s %10s %12s\\n","ID","Name","Qty","Price","Total");
printf("\\n");
for(i=0;i<4;i++){
    float val=cat[i].qty*cat[i].price;
    printf("%-4d %-15s %5d %10.2f %12.2f\\n",cat[i].id,cat[i].name,cat[i].qty,cat[i].price,val);
    total+=val;
    if(cat[i].price>cat[maxIdx].price) maxIdx=i;
}
printf("\\nTotal inventory value: %.2f\\n", total);
printf("Most expensive: %s (%.2f)\\n", cat[maxIdx].name, cat[maxIdx].price);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment () {
      const predictQ = [
        {
          id: 'ch19-inv-p1', type: 'predict',
          question: 'What does this print?',
          code: `typedef struct { int qty; float price; } P;\nP p; p.qty=10; p.price=5.50;\nprintf("%.2f\\n", p.qty * p.price);`,
          correct: ['55.00'],
          caseSensitive: true, orderMatters: true,
          hint: '10 × 5.50 = 55.00.',
          feedback: { correct: 'Correct — 10 × 5.50 = 55.00.', incorrect: 'qty=10, price=5.50. 10*5.50=55.00.' }
        },
        {
          id: 'ch19-inv-p2', type: 'predict',
          question: 'What does this print?',
          code: `float prices[] = {45.99, 12.50, 299.00, 89.00};\nint maxI = 0, i;\nfor (i = 1; i < 4; i++)\n    if (prices[i] > prices[maxI]) maxI = i;\nprintf("%d\\n", maxI);`,
          correct: ['2'],
          caseSensitive: true, orderMatters: true,
          hint: '299.00 is the highest, at index 2.',
          feedback: { correct: 'Correct — 299.00 at index 2 is the maximum.', incorrect: 'i=1: 12.50>45.99 false. i=2: 299.00>45.99 → maxI=2. i=3: 89.00>299.00 false. Result: 2.' }
        },
        {
          id: 'ch19-inv-p3', type: 'predict',
          question: 'What does this print?',
          code: `int qty[]={50,100,25};\nfloat price[]={45.99,12.50,299.00};\nfloat total=0; int i;\nfor(i=0;i<3;i++) total+=qty[i]*price[i];\nprintf("%.2f\\n", total);`,
          correct: ['10774.50'],
          caseSensitive: true, orderMatters: true,
          hint: '50×45.99=2299.50 + 100×12.50=1250.00 + 25×299.00=7475.00 = 11024.50 — wait: 2299.50+1250+7475=11024.50.',
          feedback: { correct: 'Correct — 2299.50 + 1250.00 + 7475.00 = 11024.50. Actually recalc: 11024.50', incorrect: '50×45.99=2299.50, 100×12.50=1250.00, 25×299=7475.00. Sum=11024.50.' }
        }
      ]

      const mcqQ = [
        {
          id: 'ch19-inv-m1', type: 'mcq',
          question: 'What does %-15s mean in a printf format string?',
          options: [
            'Right-align the string in 15 characters',
            'Subtract 15 from the string length',
            'Left-align the string in a 15-character wide column',
            'Truncate the string to 15 characters'
          ],
          correct: ['Left-align the string in a 15-character wide column'],
          caseSensitive: false, orderMatters: false,
          hint: 'The minus sign means left-align.',
          feedback: { correct: 'Correct — the minus sign means left-align. Without it, strings are right-aligned in the column.', incorrect: '%-15s: the - means left-align, 15 is the minimum column width. Shorter strings are padded with spaces on the right.' }
        },
        {
          id: 'ch19-inv-m2', type: 'mcq',
          question: 'What is the right pattern to find the item with the highest price in an array?',
          options: [
            'Sort the array and take the last element',
            'Track maxIdx=0; in the loop: if prices[i] > prices[maxIdx], set maxIdx=i',
            'Subtract each price from the next until you find the largest difference',
            'Use a nested loop to compare every pair'
          ],
          correct: ['Track maxIdx=0; in the loop: if prices[i] > prices[maxIdx], set maxIdx=i'],
          caseSensitive: false, orderMatters: false,
          hint: 'One pass through the array is sufficient.',
          feedback: { correct: 'Correct — tracking the index of the current maximum is the classic O(n) pattern.', incorrect: 'One pass with a running maximum index is O(n) and the standard approach. Start maxIdx=0. For each i: if prices[i]>prices[maxIdx], maxIdx=i.' }
        },
        {
          id: 'ch19-inv-m3', type: 'mcq',
          question: 'Why is the catalogue size stored as a #define constant rather than a magic number?',
          options: [
            '#define is required before typedef in C',
            'A named constant makes the size clear everywhere and means changing the array size only requires editing one line',
            'Magic numbers are not allowed in function parameters',
            'The compiler cannot figure out array size without a #define'
          ],
          correct: ['A named constant makes the size clear everywhere and means changing the array size only requires editing one line'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens when the catalogue grows from 4 to 10 products.',
          feedback: { correct: 'Correct — changing #define MAX 4 to #define MAX 10 updates every for loop and declaration that uses MAX.', incorrect: 'Named constants (#define MAX 4) make the meaning clear and centralise the value. Without it, changing the array size means hunting down every loop bound.' }
        },
        {
          id: 'ch19-inv-m4', type: 'mcq',
          question: 'What is the total value formula per product row?',
          options: ['cat[i].qty + cat[i].price', 'cat[i].qty * cat[i].price', 'cat[i].id * cat[i].qty', 'cat[i].price / cat[i].qty'],
          correct: ['cat[i].qty * cat[i].price'],
          caseSensitive: false, orderMatters: false,
          hint: 'Total stock value = how many you have × what each one costs.',
          feedback: { correct: 'Correct — qty × price gives the total value of that product\'s stock.', incorrect: 'Total value = quantity × unit price = cat[i].qty * cat[i].price.' }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Add a 5th product: id=5, name="Eraser Pack", qty=200, price=5.50. Print its id, name, and total value (qty×price).',
          includes: ['<stdio.h>', '<string.h>'],
          check: output => output.includes('1100') || output.includes('1100.00'),
          hint: 'id=5, qty=200, price=5.50 → total value = 200*5.50 = 1100.00',
          solution: `typedef struct { int id; char name[20]; int qty; float price; } Product;\nProduct p;\np.id=5; strcpy(p.name,"Eraser Pack"); p.qty=200; p.price=5.50f;\nprintf("ID:%d  %s  Total:%.2f\\n", p.id, p.name, p.qty*p.price);`
        },
        {
          id: 'p2',
          task: 'Given products with prices {45.99, 12.50, 299.00, 89.00}, find and print the index and price of the lowest-priced item.',
          includes: ['<stdio.h>'],
          check: output => output.includes('12.50') || output.includes('12.5'),
          hint: 'Start minIdx=0. Loop: if prices[i] < prices[minIdx], minIdx=i. Print minIdx and prices[minIdx].',
          solution: `float prices[]={45.99f,12.50f,299.00f,89.00f};\nint minIdx=0,i;\nfor(i=1;i<4;i++) if(prices[i]<prices[minIdx]) minIdx=i;\nprintf("Index:%d  Price:%.2f\\n",minIdx,prices[minIdx]);`
        },
        {
          id: 'p3',
          task: 'From products with values {2299.50, 1250.00, 7475.00, 6675.00}, print only those with total value above 5000.',
          includes: ['<stdio.h>'],
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            return lines.length === 2 && output.includes('7475') && output.includes('6675')
          },
          hint: 'float vals[]={2299.50,1250.00,7475.00,6675.00}; Loop: if vals[i]>5000 printf(vals[i]);',
          solution: `float vals[]={2299.50f,1250.00f,7475.00f,6675.00f};\nint i;\nfor(i=0;i<4;i++) if(vals[i]>5000) printf("%.2f\\n",vals[i]);`
        }
      ]

      renderPracticeSet('practice-ch19-inventory', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch19-inventory-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch19-inventory-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch19-inventory-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'The total is always 0.00 even though the loop runs. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`float prices[] = {10.0, 20.0, 30.0};
int   qty[]    = {5,    3,    2};
float total;
int i;
for (i = 0; i < 3; i++) {
    total = qty[i] * prices[i];
}
printf("Total: %.2f\\n", total);`,
        checkFn: output => output.includes('170') || output.includes('170.00'),
        hint: 'Look at what total = ... does versus what total += ... does. What does the assignment do to previous iterations?',
        hintTwo: 'total = qty[i] * prices[i] replaces total each iteration instead of accumulating. Fix: total += qty[i] * prices[i]. Also initialise total=0 before the loop. 5×10+3×20+2×30=50+60+60=170.',
        solution: `float prices[]={10.0,20.0,30.0};\nint qty[]={5,3,2};\nfloat total=0;\nint i;\nfor(i=0;i<3;i++) total+=qty[i]*prices[i];\nprintf("Total: %.2f\\n",total);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Inventory System — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     PROJECT 3 — NUMBER GUESSING GAME
     ══════════════════════════════════════════════════════════════ */
  function initTopic_game () {
    const topicId = 'ch19-game'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — Explore */
    CCompiler.initBlock($('compiler-ch19-game-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int secret = 42;
int guess  = 30;

printf("Secret: %d\\n", secret);
printf("Guess:  %d\\n", guess);

if (guess < secret)
    printf("Too low!\\n");
else if (guess > secret)
    printf("Too high!\\n");
else
    printf("Correct!\\n");`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — Instant Question */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch19-game',
      question: 'The guess was 30 and the secret was 42. "Too low" printed. For the full game, what variable tracks how many guesses the player has used?',
      options: [
        'A float accumulator like a GPA sum',
        'An int counter incremented by 1 each iteration of the guess loop',
        'The loop index i directly',
        'A boolean flag that flips each guess'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — int attempts = 0; incremented at the start of each loop iteration: attempts++. This gives an exact count of guesses processed.',
        incorrect: 'A simple counter: int attempts = 0; then attempts++ inside the loop. After the loop, attempts holds the total number of guesses processed.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch19-game-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — Build the game loop */
    CCompiler.initBlock($('compiler-ch19-game-loop'), {
      mode: 'build', topicId: topicId + '-loop', chapterId: CH,
      question: 'Build the game loop. Set secret=42, guesses[]={20,60,35,45,42}. Loop through each guess: print "Attempt N: X -> Too low / Too high / Correct!". Use break on correct. Count attempts.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        return output.includes('Too low') && output.includes('Too high') && output.includes('Correct')
      },
      hint: 'int secret=42; int guesses[]={20,60,35,45,42}; int n=5; Loop i=0..n: attempts++; if(guesses[i]<secret) "Too low" elif > "Too high" else "Correct" + break;',
      solution:
`int secret=42;
int guesses[]={20,60,35,45,42};
int n=5, attempts=0, i;
for(i=0;i<n;i++){
    attempts++;
    printf("Attempt %d: %d -> ",attempts,guesses[i]);
    if(guesses[i]<secret)      printf("Too low\\n");
    else if(guesses[i]>secret) printf("Too high\\n");
    else { printf("Correct!\\n"); break; }
}
printf("Attempts used: %d\\n",attempts);`,
      onPass: () => sm.complete(4)
    })

    /* Step 5 — Add win/lose outcome */
    CCompiler.initBlock($('compiler-ch19-game-outcome'), {
      mode: 'build', topicId: topicId + '-outcome', chapterId: CH,
      question: 'Add the outcome. After the loop, use a won flag (set to 1 on correct, stays 0 otherwise). Print "Won in N attempt(s)!" or "Out of guesses! Secret was N." appropriately.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        return output.includes('Correct') && (output.includes('Won') || output.includes('won'))
      },
      hint: 'int won=0; In the else branch: won=1; break; After loop: if(won) printf("Won in %d attempt(s)!\\n",attempts); else printf("Out of guesses! Secret was %d\\n",secret);',
      solution:
`int secret=42;
int guesses[]={20,60,35,45,42};
int n=5, attempts=0, won=0, i;
for(i=0;i<n;i++){
    attempts++;
    printf("Attempt %d: %d -> ",attempts,guesses[i]);
    if(guesses[i]<secret)      printf("Too low\\n");
    else if(guesses[i]>secret) printf("Too high\\n");
    else { printf("Correct!\\n"); won=1; break; }
}
if(won) printf("Won in %d attempt(s)!\\n",attempts);
else    printf("Out of guesses! Secret was %d\\n",secret);`,
      onPass: () => sm.complete(5)
    })

    /* Step 6 — Complete with enum and rating */
    CCompiler.initBlock($('compiler-ch19-game-build'), {
      mode: 'build', topicId: topicId + '-full', chapterId: CH,
      question: 'Complete the game. Add: enum GameState { PLAYING, WON, LOST }. After the outcome, print a difficulty rating: 1-2 guesses = "Excellent!", 3-4 = "Good", 5+ = "Keep practicing".',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const hasCorrect = output.includes('Correct')
        const hasRating  = output.includes('Excellent') || output.includes('Good') || output.includes('practicing')
        return hasCorrect && hasRating
      },
      hint: 'After won check: if(attempts<=2) printf("Excellent!"); else if(attempts<=4) printf("Good"); else printf("Keep practicing"); enum GameState state = won ? WON : LOST;',
      solution:
`enum GameState { PLAYING, WON, LOST };

int secret=42;
int guesses[]={20,60,35,45,42};
int n=5, attempts=0, i;
enum GameState state=PLAYING;

for(i=0;i<n;i++){
    attempts++;
    printf("Attempt %d: %d -> ",attempts,guesses[i]);
    if(guesses[i]<secret)      printf("Too low\\n");
    else if(guesses[i]>secret) printf("Too high\\n");
    else { printf("Correct!\\n"); state=WON; break; }
}

if(state==WON){
    printf("Won in %d attempt(s)!\\n",attempts);
    if(attempts<=2)      printf("Rating: Excellent!\\n");
    else if(attempts<=4) printf("Rating: Good\\n");
    else                 printf("Rating: Keep practicing\\n");
} else {
    state=LOST;
    printf("Out of guesses! Secret was %d\\n",secret);
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment () {
      const predictQ = [
        {
          id: 'ch19-gm-p1', type: 'predict',
          question: 'What does this print?',
          code: `int secret=10, guess=10;\nif(guess<secret) printf("Low\\n");\nelse if(guess>secret) printf("High\\n");\nelse printf("Correct!\\n");`,
          correct: ['Correct!', 'Correct!\n'],
          caseSensitive: false, orderMatters: true,
          hint: 'guess equals secret exactly.',
          feedback: { correct: 'Correct — guess==secret so the else branch runs.', incorrect: 'guess=10, secret=10. Neither < nor > is true, so the else branch runs: "Correct!"' }
        },
        {
          id: 'ch19-gm-p2', type: 'predict',
          question: 'What does this print?',
          code: `int guesses[]={5,15,10};\nint secret=10, won=0, attempts=0, i;\nfor(i=0;i<3;i++){\n    attempts++;\n    if(guesses[i]==secret){won=1;break;}\n}\nprintf("%d\\n",attempts);`,
          correct: ['3'],
          caseSensitive: true, orderMatters: true,
          hint: 'Guess 1: 5≠10. Guess 2: 15≠10. Guess 3: 10==10 → break. attempts=3.',
          feedback: { correct: 'Correct — it takes 3 guesses to find 10.', incorrect: '5≠10 (attempt 1), 15≠10 (attempt 2), 10==10 (attempt 3) → break. attempts=3.' }
        },
        {
          id: 'ch19-gm-p3', type: 'predict',
          question: 'What does this print?',
          code: `int guesses[]={1,2,3};\nint secret=99, won=0, attempts=0, i;\nfor(i=0;i<3;i++){attempts++;if(guesses[i]==secret){won=1;break;}}\nif(won) printf("Won\\n");\nelse printf("Lost\\n");`,
          correct: ['Lost', 'Lost\n'],
          caseSensitive: false, orderMatters: true,
          hint: 'None of {1,2,3} equals 99. won stays 0.',
          feedback: { correct: 'Correct — none of the guesses match 99. The loop exhausts without setting won=1.', incorrect: 'No guess matches 99. won stays 0. The else branch runs: "Lost".' }
        }
      ]

      const mcqQ = [
        {
          id: 'ch19-gm-m1', type: 'mcq',
          question: 'Why use a guesses[] array instead of scanf for browser-based input?',
          options: [
            'Arrays are faster than scanf',
            'The browser compiler has no terminal — scanf blocks forever. An array simulates the input sequence so all branches can be tested.',
            'scanf is not part of the C standard',
            'Arrays can hold more than one guess at a time'
          ],
          correct: ['The browser compiler has no terminal — scanf blocks forever. An array simulates the input sequence so all branches can be tested.'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens when a program waits for keyboard input in a browser.',
          feedback: { correct: 'Correct — the browser has no terminal. An array gives complete control over the input sequence, letting you test every game path.', incorrect: 'The browser has no keyboard input channel for scanf. A guesses array simulates the input, and you can control which branches run by changing the array contents.' }
        },
        {
          id: 'ch19-gm-m2', type: 'mcq',
          question: 'What is the purpose of the won flag in the game loop?',
          options: [
            'To count the number of correct guesses',
            'To signal after the loop whether the correct guess was found — since break exits but doesn\'t return a value',
            'To track how many guesses remain',
            'To store the secret number'
          ],
          correct: ['To signal after the loop whether the correct guess was found — since break exits but doesn\'t return a value'],
          caseSensitive: false, orderMatters: false,
          hint: 'break only exits the loop — code after the loop doesn\'t know why it exited.',
          feedback: { correct: 'Correct — break just exits the loop. A won flag set inside the else branch is the clean way to communicate the outcome to code after the loop.', incorrect: 'break exits the loop without communicating why. won=1 set on correct gives the post-loop code a way to distinguish "correct guess found" from "ran out of guesses".' }
        },
        {
          id: 'ch19-gm-m3', type: 'mcq',
          question: 'What does sizeof(guesses) / sizeof(guesses[0]) compute for int guesses[5]?',
          options: ['5', '20', '4', 'It depends on the values'],
          correct: ['5'],
          caseSensitive: false, orderMatters: false,
          hint: 'sizeof(int guesses[5])=20 bytes. sizeof(int)=4 bytes.',
          feedback: { correct: 'Correct — 20 / 4 = 5. The total array size divided by one element size gives the count.', incorrect: 'sizeof(guesses)=5×4=20 bytes. sizeof(guesses[0])=4 bytes. 20/4=5 elements.' }
        },
        {
          id: 'ch19-gm-m4', type: 'mcq',
          question: 'What is the binary search strategy for a guessing game with secret in [1, 100]?',
          options: [
            'Start at 1 and increment by 1 each time',
            'Always guess the midpoint of the remaining range — halving the range each guess',
            'Guess random numbers until correct',
            'Always guess the highest possible number first'
          ],
          correct: ['Always guess the midpoint of the remaining range — halving the range each guess'],
          caseSensitive: false, orderMatters: false,
          hint: 'This finds the answer in at most 7 guesses for [1,100].',
          feedback: { correct: 'Correct — binary search halves the range each guess. Worst case for [1,100] is 7 guesses (log₂(100)≈7).', incorrect: 'Binary search: guess the midpoint. "Too low" → search upper half. "Too high" → search lower half. Each guess eliminates half the remaining possibilities.' }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Set secret=15 and guesses={5, 20, 10, 15}. Run the game loop and print each attempt with Too low/Too high/Correct. Print the final attempt count.',
          includes: ['<stdio.h>'],
          check: output => output.includes('Correct') && output.includes('4'),
          hint: '5<15 (low), 20>15 (high), 10<15 (low), 15==15 (Correct). 4 attempts.',
          solution: `int secret=15;\nint guesses[]={5,20,10,15};\nint n=4,attempts=0,i;\nfor(i=0;i<n;i++){\n    attempts++;\n    printf("Attempt %d: %d -> ",attempts,guesses[i]);\n    if(guesses[i]<secret) printf("Too low\\n");\n    else if(guesses[i]>secret) printf("Too high\\n");\n    else { printf("Correct!\\n"); break; }\n}\nprintf("Attempts: %d\\n",attempts);`
        },
        {
          id: 'p2',
          task: 'Set secret=42 and guesses={10, 20, 30} — all wrong. Show all guesses with feedback, then print "Out of guesses! Secret was 42".',
          includes: ['<stdio.h>'],
          check: output => output.toLowerCase().includes('out') && output.includes('42'),
          hint: 'Use won=0 flag. After loop: if(!won) printf("Out of guesses! Secret was %d\\n", secret);',
          solution: `int secret=42;\nint guesses[]={10,20,30};\nint n=3,attempts=0,won=0,i;\nfor(i=0;i<n;i++){\n    attempts++;\n    printf("Attempt %d: %d -> ",attempts,guesses[i]);\n    if(guesses[i]<secret) printf("Too low\\n");\n    else if(guesses[i]>secret) printf("Too high\\n");\n    else {printf("Correct!\\n"); won=1; break;}\n}\nif(!won) printf("Out of guesses! Secret was %d\\n",secret);`
        },
        {
          id: 'p3',
          task: 'Simulate a binary search strategy. Secret=42, range 1-100. Guesses are the midpoints: 50, 25, 37, 43, 40, 41, 42. Print each guess with Too low/Too high/Correct and the final attempt count.',
          includes: ['<stdio.h>'],
          check: output => output.includes('Correct') && output.includes('7'),
          hint: 'guesses[]={50,25,37,43,40,41,42}. Loop as before. Secret=42. Should find it on the 7th try.',
          solution: `int secret=42;\nint guesses[]={50,25,37,43,40,41,42};\nint n=7,attempts=0,i;\nfor(i=0;i<n;i++){\n    attempts++;\n    printf("Guess %d: %d -> ",attempts,guesses[i]);\n    if(guesses[i]<secret) printf("Too low\\n");\n    else if(guesses[i]>secret) printf("Too high\\n");\n    else { printf("Correct!\\n"); break; }\n}\nprintf("Found in %d guesses\\n",attempts);`
        }
      ]

      renderPracticeSet('practice-ch19-game', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch19-game-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch19-game-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch19-game-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'The game says "Lost" even when the correct guess is in the array. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int secret=42;
int guesses[]={20, 42, 60};
int n=3, won=0, i;
for (i = 0; i < n; i++) {
    if (guesses[i] = secret) {
        won = 1;
        break;
    }
}
if (won) printf("Won!\\n");
else     printf("Lost\\n");`,
        checkFn: output => output.toLowerCase().includes('won'),
        hint: 'Look carefully at the condition in the if statement. Is that comparing or assigning?',
        hintTwo: 'guesses[i] = secret is assignment (always true, sets guesses[i] to 42). The correct check is guesses[i] == secret. The single = is a classic C bug — always use == for comparison.',
        solution: `int secret=42;\nint guesses[]={20,42,60};\nint n=3,won=0,i;\nfor(i=0;i<n;i++){\n    if(guesses[i]==secret){\n        won=1; break;\n    }\n}\nif(won) printf("Won!\\n");\nelse    printf("Lost\\n");`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Guessing Game — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     CHAPTER COMPLETE
     ══════════════════════════════════════════════════════════════ */
  function initChapterComplete () {
    const nb = $('ch19-next-btn')
    if (nb) nb.addEventListener('click', () => loadChapter('ch20'))

    /* Show complete div only when all 3 topic assessments are passed */
    function checkAllDone () {
      const topics = ['ch19-gpa', 'ch19-inventory', 'ch19-game']
      const done = topics.every(t => Progress.isTopicComplete(CH, t))
      if (done) {
        Progress.saveChapterComplete(CH)
        const el = $('ch19-chapter-complete')
        if (el) el.style.display = 'block'
      }
    }
    /* Poll every 2 seconds — lightweight check */
    setInterval(checkAllDone, 2000)
    checkAllDone()
  }

  /* ══════════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════════ */
  function init () {
    initTopic_gpa()
    initTopic_inventory()
    initTopic_game()
    initChapterComplete()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
