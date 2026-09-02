/* =============================================================
   C LEARNING PLATFORM — chapters/ch17-structs-enums/ch17.js
   Chapter 17: Structs & Enums
   11 topics · 7-step structure · Modal popup assessments
   ============================================================= */

;(function () {
  'use strict'

  const CH = 'ch17'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ── renderPracticeSet ─────────────────────────────────────── */
  function renderPracticeSet(containerId, chapterId, topicId, configs) {
    const container = $(containerId)
    if (!container) return
    let idx = 0
    function renderTask(i) {
      if (i >= configs.length) {
        container.innerHTML = '<p class="practice-complete">All tasks complete! ✓</p>'
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
      num.textContent = 'Task ' + (i + 1) + ' of ' + configs.length
      const dots = document.createElement('div')
      dots.className = 'practice-task__dots'
      for (let j = 0; j < configs.length; j++) {
        const dot = document.createElement('span')
        dot.className = 'dot' + (j < i ? ' dot--done' : j === i ? ' dot--active' : '')
        dots.appendChild(dot)
      }
      hdr.appendChild(num)
      hdr.appendChild(dots)
      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      const compEl = document.createElement('div')
      compEl.id = 'prac-' + containerId + '-t' + i
      wrap.appendChild(hdr)
      wrap.appendChild(desc)
      wrap.appendChild(compEl)
      container.innerHTML = ''
      container.appendChild(wrap)
      CCompiler.initBlock(compEl, {
        mode: 'build',
        topicId: topicId + '-p' + (i + 1),
        chapterId: chapterId,
        question: cfg.task,
        includes: ['<stdio.h>', '<string.h>'],
        starterCode: '',
        checkFn: cfg.check,
        hint: cfg.hint,
        solution: cfg.solution,
        onPass: function () { idx++; setTimeout(function () { renderTask(idx) }, 800) }
      })
    }
    renderTask(0)
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 1 — What is a struct?
     ══════════════════════════════════════════════════════════════ */
  function initTopic_struct() {
    const topicId = 'ch17-struct'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1: Explore */
    CCompiler.initBlock($('compiler-ch17-struct-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`struct Box {
    int width;
    int height;
    int depth;
};
struct Box b;
b.width  = 10;
b.height = 5;
b.depth  = 3;
printf("W:%d H:%d D:%d\\n", b.width, b.height, b.depth);
printf("Volume: %d\\n", b.width * b.height * b.depth);`,
      onPass: () => sm.complete(1)
    })

    /* Step 2: IQ */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-struct',
      question: 'The Box struct has 3 members: width, height, depth. One struct Box variable stores all three together. Without a struct, how many separate int variables would you need for one box?',
      options: [
        '1 — you can store multiple values in one int',
        '2 — width and height are enough',
        '3 — one variable per member',
        'It depends on the box size'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — without a struct you need box_width, box_height, box_depth — 3 separate unrelated variables. The struct bundles them into one named unit.',
        incorrect: 'Each member needs its own variable without a struct: box_width, box_height, box_depth — that is 3 separate variables for one box. A struct groups them into one.'
      },
      onAnswer: () => sm.complete(2)
    })

    /* Step 3: Continue */
    $('step-ch17-struct-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4: Modify */
    CCompiler.initBlock($('compiler-ch17-struct-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a fourth member called color (int, value 1 for red) to the Box struct. Set it and print all four members.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Box {
    int width;
    int height;
    int depth;
};
struct Box b;
b.width  = 10;
b.height = 5;
b.depth  = 3;
printf("W:%d H:%d D:%d\\n", b.width, b.height, b.depth);`,
      checkFn: output => output.includes('10') && output.includes('5') && output.includes('3') && output.includes('1'),
      hint: 'Add "int color;" inside the struct braces. After declaring b, set b.color = 1; then add a printf to print it.',
      solution:
`struct Box {
    int width;
    int height;
    int depth;
    int color;
};
struct Box b;
b.width  = 10;
b.height = 5;
b.depth  = 3;
b.color  = 1;
printf("W:%d H:%d D:%d Color:%d\\n", b.width, b.height, b.depth, b.color);`,
      onPass: () => sm.complete(4)
    })

    /* Step 5: Fill */
    CCompiler.initBlock($('compiler-ch17-struct-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to define a Score struct and use it.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] Score {
    [?] points;
    [?] level;
};
struct Score s;
s.points = 500;
s.level  = 3;
printf("%d\\n", s.points);
printf("%d\\n", s.level);`,
      blanks: ['struct', 'int', 'int'],
      hint: 'A struct definition starts with the struct keyword. Both points and level are whole numbers — use int.',
      onPass: () => sm.complete(5)
    })

    /* Step 6: Build */
    CCompiler.initBlock($('compiler-ch17-struct-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define a struct Rectangle with int width and int height. Declare one (width=8, height=4). Print both values and the area (width * height).',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('8') && output.includes('4') && output.includes('32'),
      hint: 'struct Rectangle { int width; int height; }; Then: struct Rectangle r; r.width=8; r.height=4; printf area.',
      solution:
`struct Rectangle {
    int width;
    int height;
};
struct Rectangle r;
r.width  = 8;
r.height = 4;
printf("Width: %d\\n",  r.width);
printf("Height: %d\\n", r.height);
printf("Area: %d\\n",   r.width * r.height);`,
      onPass: () => sm.complete(6)
    })

    /* Step 7: auto-complete */
    sm.complete(7)

    /* Assessment */
    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-st-p1', type: 'predict', question: 'What does this print?',
          code: `struct Pt { int x; int y; };\nstruct Pt p;\np.x = 3;\np.y = 7;\nprintf("%d\\n", p.x);\nprintf("%d\\n", p.y);`,
          correct: ['3\n7', '3\r\n7'], caseSensitive: true, orderMatters: true,
          hint: 'p.x was set to 3 and p.y to 7. Each printf prints one member on its own line.',
          feedback: { correct: 'Correct — p.x is 3, p.y is 7, printed on separate lines.', incorrect: 'p.x=3 and p.y=7. Two printf calls print them on separate lines: 3 then 7.' }
        },
        {
          id: 'ch17-st-p2', type: 'predict', question: 'What does this print?',
          code: `struct Val { int a; int b; };\nstruct Val v = {10, 20};\nprintf("%d\\n", v.a + v.b);`,
          correct: ['30'], caseSensitive: true, orderMatters: true,
          hint: 'The initializer list sets v.a=10 and v.b=20 in order. printf prints their sum.',
          feedback: { correct: 'Correct — 10 + 20 = 30.', incorrect: 'The initializer {10, 20} sets v.a=10, v.b=20. printf prints 10+20 = 30.' }
        },
        {
          id: 'ch17-st-p3', type: 'predict', question: 'What does this print?',
          code: `struct Pair { int x; int y; };\nstruct Pair a = {5, 8};\nstruct Pair b = a;\nb.x = 99;\nprintf("%d\\n", a.x);\nprintf("%d\\n", b.x);`,
          correct: ['5\n99', '5\r\n99'], caseSensitive: true, orderMatters: true,
          hint: 'b = a copies the struct. After that, changing b.x does not affect a.x.',
          feedback: { correct: 'Correct — struct assignment copies values independently. a.x stays 5; b.x becomes 99.', incorrect: 'b = a copies all members. After the copy, b and a are independent. b.x = 99 changes only b — a.x stays 5.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-st-m1', type: 'mcq',
          question: 'What is the main purpose of a struct in C?',
          options: ['To repeat code using a loop', 'To group related variables of different types under one name', 'To define a function with multiple return values', 'To allocate memory on the heap'],
          correct: ['To group related variables of different types under one name'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think of a student record: name, age, grade — three different types in one unit.',
          feedback: { correct: 'Correct — a struct bundles related variables (possibly different types) into one named unit.', incorrect: 'A struct groups related data. A Student struct can hold char name[], int age, and float grade — all in one variable.' }
        },
        {
          id: 'ch17-st-m2', type: 'mcq',
          question: 'What is required at the very end of a struct definition?',
          options: ['Just a closing brace }', 'A semicolon ; only', 'A closing brace followed by a semicolon };', 'Nothing — the last member ends it'],
          correct: ['A closing brace followed by a semicolon };'],
          caseSensitive: false, orderMatters: false,
          hint: 'Forgetting this causes the most confusing struct compiler errors.',
          feedback: { correct: 'Correct — every struct definition must end with }; — both the closing brace AND the semicolon.', incorrect: 'struct definitions end with }; — the semicolon after } is mandatory. Omitting it causes a confusing error on the next line.' }
        },
        {
          id: 'ch17-st-m3', type: 'mcq',
          question: 'When does a struct definition allocate memory?',
          options: ['When you write the struct definition', 'When you declare a variable of that type', 'When you access the first member', 'When the program starts'],
          correct: ['When you declare a variable of that type'],
          caseSensitive: false, orderMatters: false,
          hint: 'The definition is a blueprint — no building, no memory.',
          feedback: { correct: 'Correct — struct Box { ... }; is just a blueprint. Memory allocates when you declare: struct Box b;', incorrect: 'The definition describes the shape only. Memory is allocated when you declare a variable: struct Box b;' }
        },
        {
          id: 'ch17-st-m4', type: 'mcq',
          question: 'What does struct assignment (b = a) do in C?',
          options: ['Makes b an alias for a — same memory', 'Copies all member values from a into b independently', 'Only copies the first member', 'Causes a compile error — structs cannot use ='],
          correct: ['Copies all member values from a into b independently'],
          caseSensitive: false, orderMatters: false,
          hint: 'Unlike arrays, struct = works and makes an independent copy.',
          feedback: { correct: 'Correct — b = a copies every member value. After that, b and a are completely independent.', incorrect: 'Struct = copies all members independently. Changing b afterwards does not affect a. This is different from arrays, which cannot be assigned with =.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define a struct Circle with one int member called radius. Declare a variable, set radius to 7, and print it.',
          check: o => o.trim().includes('7'),
          hint: 'struct Circle { int radius; }; Then: struct Circle c; c.radius = 7; printf("%d\\n", c.radius);',
          solution: `struct Circle { int radius; };\nstruct Circle c;\nc.radius = 7;\nprintf("%d\\n", c.radius);` },
        { id: 'p2', task: 'Define a struct Temp with int celsius and int fahrenheit. Use an initializer list: {100, 212}. Print both members.',
          check: o => o.includes('100') && o.includes('212'),
          hint: 'struct Temp { int celsius; int fahrenheit; }; struct Temp t = {100, 212}; then print t.celsius and t.fahrenheit.',
          solution: `struct Temp { int celsius; int fahrenheit; };\nstruct Temp t = {100, 212};\nprintf("%d\\n", t.celsius);\nprintf("%d\\n", t.fahrenheit);` },
        { id: 'p3', task: 'Define struct Pair with int first and int second. Declare a={5,10}, copy to b, change b.first to 99. Print a.first then b.first.',
          check: o => o.includes('5') && o.includes('99'),
          hint: 'struct Pair b = a; copies the struct. b.first = 99; changes only b, not a.',
          solution: `struct Pair { int first; int second; };\nstruct Pair a = {5, 10};\nstruct Pair b = a;\nb.first = 99;\nprintf("%d\\n", a.first);\nprintf("%d\\n", b.first);` },
        { id: 'p4', task: 'Define struct Vec2 with float x and float y. Declare v={3.0, 4.0}. Print both with 1 decimal place, then print x+y.',
          check: o => o.includes('3.0') && o.includes('4.0') && o.includes('7.0'),
          hint: 'struct Vec2 { float x; float y; }; struct Vec2 v = {3.0f, 4.0f}; printf("%.1f\\n", v.x); printf("%.1f\\n", v.y); printf("%.1f\\n", v.x+v.y);',
          solution: `struct Vec2 { float x; float y; };\nstruct Vec2 v = {3.0f, 4.0f};\nprintf("%.1f\\n", v.x);\nprintf("%.1f\\n", v.y);\nprintf("%.1f\\n", v.x + v.y);` },
        { id: 'p5', task: 'Define struct Product with int id, int qty, float price. Create {1,10,9.99} and {2,5,24.99}. Print each total (qty*price) with 2 decimal places.',
          check: o => o.includes('99.9') && o.includes('124.9'),
          hint: 'struct Product p1 = {1, 10, 9.99f}; printf("%.2f\\n", p1.qty * p1.price); Do same for p2.',
          solution: `struct Product { int id; int qty; float price; };\nstruct Product p1 = {1, 10, 9.99f};\nstruct Product p2 = {2, 5, 24.99f};\nprintf("%.2f\\n", p1.qty * p1.price);\nprintf("%.2f\\n", p2.qty * p2.price);` }
      ]
      renderPracticeSet('practice-ch17-struct', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-struct-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-struct-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-struct-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This struct definition causes a mysterious error on the next line. Find the missing character.',
        includes: ['<stdio.h>'],
        starterCode:
`struct Point {
    int x;
    int y;
}
struct Point p;
p.x = 5;
printf("%d\\n", p.x);`,
        checkFn: output => output.includes('5'),
        hint: 'Look at the end of the struct definition on line 4. Is there something required after the closing brace?',
        hintTwo: 'Every struct definition must end with }; — the semicolon after the closing brace is required. Without it, the compiler treats the next line as a continuation of the struct definition and gives a confusing error.',
        solution: `struct Point {\n    int x;\n    int y;\n};\nstruct Point p;\np.x = 5;\nprintf("%d\\n", p.x);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'What Is a Struct? — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 2 — Declaring and Initializing Structs
     ══════════════════════════════════════════════════════════════ */
  function initTopic_declare() {
    const topicId = 'ch17-declare'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-declare-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`struct Point { int x; int y; };

/* Style 1: initializer list */
struct Point a = {10, 20};
printf("a: %d,%d\\n", a.x, a.y);

/* Style 2: member-by-member */
struct Point b;
b.x = 5;
b.y = 15;
printf("b: %d,%d\\n", b.x, b.y);

/* Style 3: struct assignment */
struct Point c = a;
c.x = 99;
printf("c: %d,%d\\n", c.x, c.y);
printf("a: %d,%d\\n", a.x, a.y);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-declare',
      question: 'After "struct Point c = a;" and then "c.x = 99;", what does a.x equal?',
      options: ['99 — c and a share the same memory', '10 — struct assignment copies values, a is unchanged', '0 — assignment resets the original', 'Undefined — you cannot assign structs'],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — struct assignment copies all member values. After c = a, they are independent. c.x = 99 changes only c.',
        incorrect: 'Struct assignment copies all member values independently. After c = a, changing c.x does not affect a.x. a.x stays 10.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-declare-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-declare-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the initializer list for point a to use values {7, 14}. Also add a third struct variable d using member-by-member: d.x=1, d.y=2. Print d.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Point { int x; int y; };
struct Point a = {10, 20};
printf("a: %d,%d\\n", a.x, a.y);`,
      checkFn: output => output.includes('7') && output.includes('14') && output.includes('1') && output.includes('2'),
      hint: 'Change {10, 20} to {7, 14}. Then add: struct Point d; d.x=1; d.y=2; printf("d: %d,%d\\n", d.x, d.y);',
      solution:
`struct Point { int x; int y; };
struct Point a = {7, 14};
printf("a: %d,%d\\n", a.x, a.y);
struct Point d;
d.x = 1;
d.y = 2;
printf("d: %d,%d\\n", d.x, d.y);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-declare-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks — one declares with an initializer list, one assigns member-by-member.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Size { int w; int h; };
struct Size a [?] {800, 600};
struct Size b;
b[?]w = 1920;
b[?]h = 1080;
printf("%d x %d\\n", a.w, a.h);
printf("%d x %d\\n", b.w, b.h);`,
      blanks: ['=', '.', '.'],
      hint: 'Initializer list uses the = sign. Member access uses the dot operator.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-declare-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define struct Color with int r, g, b. Declare red={255,0,0} using an initializer list. Declare white using member-by-member (255,255,255). Print both.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('255') && output.includes('0') && (output.match(/255/g) || []).length >= 3,
      hint: 'struct Color { int r; int g; int b; }; struct Color red = {255, 0, 0}; struct Color white; white.r=255; white.g=255; white.b=255;',
      solution:
`struct Color { int r; int g; int b; };
struct Color red = {255, 0, 0};
struct Color white;
white.r = 255;
white.g = 255;
white.b = 255;
printf("Red: %d,%d,%d\\n", red.r, red.g, red.b);
printf("White: %d,%d,%d\\n", white.r, white.g, white.b);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-dc-p1', type: 'predict', question: 'What does this print?',
          code: `struct Pt { int x; int y; };\nstruct Pt a = {4, 8};\nstruct Pt b = a;\nb.x = 0;\nprintf("%d %d\\n", a.x, b.x);`,
          correct: ['4 0'], caseSensitive: true, orderMatters: true,
          hint: 'b = a copies values. b.x = 0 changes only b. a.x stays 4.',
          feedback: { correct: 'Correct — struct assignment is a value copy. a.x stays 4; b.x becomes 0.', incorrect: 'b = a copies members independently. b.x = 0 changes only b — a.x is still 4. Output: "4 0".' }
        },
        {
          id: 'ch17-dc-p2', type: 'predict', question: 'What does this print?',
          code: `struct P { int x; int y; };\nstruct P p = {3, 6};\np.x = p.x * 2;\nprintf("%d\\n", p.x);`,
          correct: ['6'], caseSensitive: true, orderMatters: true,
          hint: 'p.x starts as 3. p.x = p.x * 2 = 6.',
          feedback: { correct: 'Correct — p.x starts at 3, multiplied by 2 gives 6.', incorrect: 'p.x is initialized to 3 via the initializer list. p.x = 3 * 2 = 6.' }
        },
        {
          id: 'ch17-dc-p3', type: 'predict', question: 'What does this print?',
          code: `struct N { int a; int b; };\nstruct N n;\nn.a = 10;\nprintf("%d\\n", n.a);`,
          correct: ['10'], caseSensitive: true, orderMatters: true,
          hint: 'n.a was set to 10 by member-by-member assignment.',
          feedback: { correct: 'Correct — member-by-member sets n.a = 10, which is then printed.', incorrect: 'n.a was assigned 10 after declaration. printf prints 10.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-dc-m1', type: 'mcq',
          question: 'Which initialization style sets all members at declaration time based on their position?',
          options: ['Member-by-member assignment', 'Struct assignment from another variable', 'Initializer list {val1, val2, ...}', 'You must always initialize separately'],
          correct: ['Initializer list {val1, val2, ...}'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think of how arrays are initialized: int arr[] = {1, 2, 3};',
          feedback: { correct: 'Correct — the initializer list sets members in declaration order at declaration time.', incorrect: 'The initializer list style: struct Point p = {3, 7}; sets members in order at declaration time.' }
        },
        {
          id: 'ch17-dc-m2', type: 'mcq',
          question: 'What is the value of an uninitialized struct member?',
          options: ['0 — C zeroes all memory', 'NULL — C uses null for structs', 'Garbage — whatever was in that memory before', '-1 — a sentinel value'],
          correct: ['Garbage — whatever was in that memory before'],
          caseSensitive: false, orderMatters: false,
          hint: 'Uninitialized local variables contain whatever bytes were previously at that memory address.',
          feedback: { correct: 'Correct — uninitialized struct members contain garbage values, just like any uninitialized local variable.', incorrect: 'C does not zero-initialize local struct members. They contain whatever bytes happen to be at that memory address.' }
        },
        {
          id: 'ch17-dc-m3', type: 'mcq',
          question: 'Which is NOT a valid way to initialize a struct in C?',
          options: ['struct Point p = {3, 7};', 'struct Point p; p.x=3; p.y=7;', 'struct Point p; p = {3, 7};', 'struct Point b = a; (copying from another)'],
          correct: ['struct Point p; p = {3, 7};'],
          caseSensitive: false, orderMatters: false,
          hint: 'The initializer list syntax only works at declaration time, not in a separate assignment statement.',
          feedback: { correct: 'Correct — you cannot use {3, 7} in an assignment after declaration. The braces-initializer only works at the point of declaration.', incorrect: 'p = {3, 7}; after declaration is not valid C — the initializer list syntax only works at the point of declaration.' }
        },
        {
          id: 'ch17-dc-m4', type: 'mcq',
          question: 'After "struct Box a = {5, 10, 2};" the initializer fills members in what order?',
          options: ['Alphabetical by member name', 'Reverse order of declaration', 'The order the members are declared in the struct', 'Random — the compiler decides'],
          correct: ['The order the members are declared in the struct'],
          caseSensitive: false, orderMatters: false,
          hint: 'Struct initializers mirror the layout of the struct definition.',
          feedback: { correct: 'Correct — initializer list values are assigned to members in the order they appear in the struct definition.', incorrect: 'The initializer list maps values to members in declaration order. If struct Box is {width, height, depth}, then {5, 10, 2} sets width=5, height=10, depth=2.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define struct Point with int x, int y. Declare a using initializer list {3, 7}. Print both members.',
          check: o => o.includes('3') && o.includes('7'),
          hint: 'struct Point { int x; int y; }; struct Point a = {3, 7}; printf("%d\\n", a.x); printf("%d\\n", a.y);',
          solution: `struct Point { int x; int y; };\nstruct Point a = {3, 7};\nprintf("%d\\n", a.x);\nprintf("%d\\n", a.y);` },
        { id: 'p2', task: 'Define struct Score with int player and int points. Set player=2 and points=500 using member-by-member. Print both.',
          check: o => o.includes('2') && o.includes('500'),
          hint: 'struct Score s; s.player = 2; s.points = 500; then print both.',
          solution: `struct Score { int player; int points; };\nstruct Score s;\ns.player = 2;\ns.points = 500;\nprintf("%d\\n", s.player);\nprintf("%d\\n", s.points);` },
        { id: 'p3', task: 'Define struct Vec2 with float x, float y. Declare original={1.5, 2.5}. Copy to copy. Change copy.x to 9.9. Print original.x then copy.x.',
          check: o => o.includes('1.5') && o.includes('9.9'),
          hint: 'struct Vec2 copy = original; changes copy independently. copy.x = 9.9f; does not affect original.',
          solution: `struct Vec2 { float x; float y; };\nstruct Vec2 original = {1.5f, 2.5f};\nstruct Vec2 copy = original;\ncopy.x = 9.9f;\nprintf("%.1f\\n", original.x);\nprintf("%.1f\\n", copy.x);` }
      ]
      renderPracticeSet('practice-ch17-declare', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-declare-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-declare-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-declare-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This program should print 5 and 10 but prints wrong values. The initialization order is the bug — find it.',
        includes: ['<stdio.h>'],
        starterCode:
`struct Pair { int first; int second; };
struct Pair p = {10, 5};
printf("first: %d\\n",  p.first);
printf("second: %d\\n", p.second);`,
        checkFn: output => { const lines = output.split('\n'); return lines.some(l => l.includes('5')) && lines.some(l => l.includes('10')) && output.includes('first: 5') },
        hint: 'The struct declares first before second. The initializer list fills them in that order — check if {10, 5} matches the intended values.',
        hintTwo: 'The initializer {10, 5} sets first=10 and second=5. But the intended output is first=5, second=10. Change to {5, 10} to match the declaration order.',
        solution: `struct Pair { int first; int second; };\nstruct Pair p = {5, 10};\nprintf("first: %d\\n", p.first);\nprintf("second: %d\\n", p.second);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Declaring & Initializing — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 3 — Accessing Members with . operator
     ══════════════════════════════════════════════════════════════ */
  function initTopic_access() {
    const topicId = 'ch17-access'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-access-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`struct Student { int id; float grade; };
struct Student s = {101, 88.5};

/* Read members */
printf("ID: %d\\n",    s.id);
printf("Grade: %.1f\\n", s.grade);

/* Write members */
s.grade = 95.0;
printf("New grade: %.1f\\n", s.grade);

/* Use in arithmetic */
s.grade = s.grade + 2.5;
printf("Bonus grade: %.1f\\n", s.grade);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-access',
      question: 'After "s.grade = 95.0;" and then "s.grade = s.grade + 2.5;", what is s.grade?',
      options: ['88.5 — the original value', '95.0 — only the first write counts', '97.5 — the second write adds to the first', '2.5 — only the added value is stored'],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — s.grade is set to 95.0, then updated to 95.0 + 2.5 = 97.5. Each write replaces the previous value.',
        incorrect: 's.grade = 95.0 sets it to 95. Then s.grade = s.grade + 2.5 = 95 + 2.5 = 97.5. The dot operator reads and writes just like a regular variable.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-access-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-access-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a deduction: subtract 5 from the grade after the existing bonus. Print the final grade. Also add a student count member (int count=1) and print it.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Student { int id; float grade; };
struct Student s = {101, 80.0};
s.grade = s.grade + 10.0;
printf("Grade: %.1f\\n", s.grade);`,
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 2 && output.includes('85.0')
      },
      hint: 'After the bonus line, add: s.grade = s.grade - 5.0; printf("Final: %.1f\\n", s.grade); Then also add int count to the struct and print it.',
      solution:
`struct Student { int id; float grade; int count; };
struct Student s = {101, 80.0, 1};
s.grade = s.grade + 10.0;
s.grade = s.grade - 5.0;
printf("Grade: %.1f\\n", s.grade);
printf("Count: %d\\n", s.count);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-access-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to read and update a struct member.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Counter { int value; };
struct Counter c;
c[?]value = 0;
c[?]value = c[?]value + 1;
c[?]value = c[?]value + 1;
printf("%d\\n", c[?]value);`,
      blanks: ['.', '.', '.', '.', '.', '.'],
      hint: 'Every time you access a struct member — read or write — you use the dot operator between the variable name and the member name.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-access-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define struct Timer with int seconds. Declare t with seconds=0. Add 10, then add 25, then subtract 5. Print the final value.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.trim().includes('30'),
      hint: 'struct Timer { int seconds; }; struct Timer t; t.seconds=0; t.seconds += 10; t.seconds += 25; t.seconds -= 5; printf("%d\\n", t.seconds);',
      solution:
`struct Timer { int seconds; };
struct Timer t;
t.seconds = 0;
t.seconds = t.seconds + 10;
t.seconds = t.seconds + 25;
t.seconds = t.seconds - 5;
printf("%d\\n", t.seconds);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-ac-p1', type: 'predict', question: 'What does this print?',
          code: `struct Box { int w; int h; };\nstruct Box b = {6, 4};\nprintf("%d\\n", b.w * b.h);`,
          correct: ['24'], caseSensitive: true, orderMatters: true,
          hint: 'b.w is 6 and b.h is 4. 6 * 4 = 24.',
          feedback: { correct: 'Correct — 6 * 4 = 24.', incorrect: 'b.w=6, b.h=4. The expression b.w * b.h = 24.' }
        },
        {
          id: 'ch17-ac-p2', type: 'predict', question: 'What does this print?',
          code: `struct N { int x; };\nstruct N a = {5};\nstruct N b = {3};\na.x = a.x + b.x;\nprintf("%d\\n", a.x);`,
          correct: ['8'], caseSensitive: true, orderMatters: true,
          hint: 'a.x starts as 5, b.x is 3. a.x = 5 + 3 = 8.',
          feedback: { correct: 'Correct — a.x = 5 + 3 = 8.', incorrect: 'a.x=5, b.x=3. a.x = a.x + b.x = 5+3 = 8.' }
        },
        {
          id: 'ch17-ac-p3', type: 'predict', question: 'What does this print?',
          code: `struct T { int v; };\nstruct T t = {10};\nt.v = t.v * 2;\nt.v = t.v - 3;\nprintf("%d\\n", t.v);`,
          correct: ['17'], caseSensitive: true, orderMatters: true,
          hint: 'Start: 10. After *2: 20. After -3: 17.',
          feedback: { correct: 'Correct — 10 * 2 = 20, then 20 - 3 = 17.', incorrect: 't.v starts at 10. t.v*2 = 20. 20-3 = 17.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-ac-m1', type: 'mcq',
          question: 'Which operator accesses a member of a struct variable (not a pointer)?',
          options: ['-> (arrow)', ': (colon)', '. (dot)', '* (star)'],
          correct: ['. (dot)'],
          caseSensitive: false, orderMatters: false,
          hint: 'The dot is between the variable name and the member name.',
          feedback: { correct: 'Correct — the dot operator accesses members of a struct variable directly.', incorrect: 'The dot operator accesses struct members: s.grade, s.id. Arrow (->) is for pointers to structs.' }
        },
        {
          id: 'ch17-ac-m2', type: 'mcq',
          question: 'Can you use a struct member in arithmetic expressions like s.grade + 5?',
          options: ['No — struct members are read-only', 'Yes — each member behaves like its declared type', 'Only if the struct is passed by pointer', 'Only if you cast it first'],
          correct: ['Yes — each member behaves like its declared type'],
          caseSensitive: false, orderMatters: false,
          hint: 'A float member acts exactly like a regular float variable.',
          feedback: { correct: 'Correct — struct members behave exactly like the type they are declared as. s.grade + 5 is the same as any float + int.', incorrect: 'Struct members are full variables of their declared type. s.grade is a float, so s.grade + 5 works exactly like any float arithmetic.' }
        },
        {
          id: 'ch17-ac-m3', type: 'mcq',
          question: 'What is the correct way to assign a new value to member id of struct variable s?',
          options: ['id(s) = 200;', 's->id = 200;', 's.id = 200;', 'struct.s.id = 200;'],
          correct: ['s.id = 200;'],
          caseSensitive: false, orderMatters: false,
          hint: 'variable.member is the access pattern.',
          feedback: { correct: 'Correct — s.id = 200; uses the dot operator to write to a member.', incorrect: 's.id = 200; is the correct write pattern. Arrow (->) is for pointer variables, not direct variables.' }
        },
        {
          id: 'ch17-ac-m4', type: 'mcq',
          question: 'Does updating s.grade affect any other member of the same struct?',
          options: ['Yes — all members share memory in a struct', 'Yes — the struct tracks changes across members', 'No — each member is independent', 'Only if they are the same type'],
          correct: ['No — each member is independent'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think of members as separate variables that happen to live together.',
          feedback: { correct: 'Correct — each member is independent. Changing s.grade has no effect on s.id.', incorrect: 'Members are fully independent. Changing one member never affects another — they just share a name prefix.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define struct Circle with float radius. Declare c with radius=5.0. Print radius, then set radius=10.0, print again.',
          check: o => o.includes('5.0') && o.includes('10.0'),
          hint: 'struct Circle { float radius; }; struct Circle c; c.radius=5.0f; printf("%.1f\\n", c.radius); c.radius=10.0f; printf("%.1f\\n", c.radius);',
          solution: `struct Circle { float radius; };\nstruct Circle c;\nc.radius = 5.0f;\nprintf("%.1f\\n", c.radius);\nc.radius = 10.0f;\nprintf("%.1f\\n", c.radius);` },
        { id: 'p2', task: 'Define struct Budget with int income and int expense. Set income=5000, expense=3200. Print both, then print profit (income - expense).',
          check: o => o.includes('5000') && o.includes('3200') && o.includes('1800'),
          hint: 'printf profit: printf("%d\\n", b.income - b.expense);',
          solution: `struct Budget { int income; int expense; };\nstruct Budget b;\nb.income = 5000;\nb.expense = 3200;\nprintf("%d\\n", b.income);\nprintf("%d\\n", b.expense);\nprintf("%d\\n", b.income - b.expense);` },
        { id: 'p3', task: 'Define struct Counter with int hits and int misses. hits=7, misses=3. Print total (hits+misses) then accuracy as a percentage (hits*100/(hits+misses)).',
          check: o => o.includes('10') && o.includes('70'),
          hint: 'Total = c.hits + c.misses = 10. Accuracy = c.hits*100/total = 70.',
          solution: `struct Counter { int hits; int misses; };\nstruct Counter c;\nc.hits = 7;\nc.misses = 3;\nint total = c.hits + c.misses;\nprintf("%d\\n", total);\nprintf("%d\\n", c.hits * 100 / total);` }
      ]
      renderPracticeSet('practice-ch17-access', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-access-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-access-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-access-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print the sum of both members but prints wrong output. The update line has the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`struct Vals { int a; int b; };
struct Vals v = {10, 5};
v.a = v.b + 3;
printf("%d\\n", v.a + v.b);`,
        checkFn: output => output.trim() === '23',
        hint: 'What is v.a after "v.a = v.b + 3;"? Does that match what you intend?',
        hintTwo: 'v.a = v.b + 3 sets v.a = 5+3 = 8. Then v.a + v.b = 8+5 = 13. To get 23, you should NOT overwrite v.a — remove the assignment line and just print v.a + v.b + 3.',
        solution: `struct Vals { int a; int b; };\nstruct Vals v = {10, 5};\nprintf("%d\\n", v.a + v.b + 3);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'The Dot Operator — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 4 — Nested Structs
     ══════════════════════════════════════════════════════════════ */
  function initTopic_nested() {
    const topicId = 'ch17-nested'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-nested-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`struct Date { int day; int month; int year; };
struct Event { int code; struct Date when; };

struct Event e;
e.code       = 42;
e.when.day   = 15;
e.when.month = 8;
e.when.year  = 2024;

printf("Event %d on %d/%d/%d\\n",
    e.code, e.when.day, e.when.month, e.when.year);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-nested',
      question: 'To access the year field inside the nested Date struct, the access chain is e.when.year. How many dots are in that chain?',
      options: ['0 — you access year directly', '1 — one dot is enough', '2 — two dots to go through the nested struct', '3 — one per level plus one for the field'],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — e.when.year uses two dots: the first reaches the when member (a Date struct), the second reaches year inside that Date.',
        incorrect: 'You need two dots: e.when gives you the Date struct, then .year gives you the year field inside it. Two levels = two dots.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-nested-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-nested-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a second Event f initialized with nested braces: {99, {1, 1, 2025}}. Print its code and year.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Date { int day; int month; int year; };
struct Event { int code; struct Date when; };
struct Event e;
e.code = 42; e.when.day = 15; e.when.month = 8; e.when.year = 2024;
printf("Event %d year %d\\n", e.code, e.when.year);`,
      checkFn: output => output.includes('99') && output.includes('2025'),
      hint: 'struct Event f = {99, {1, 1, 2025}}; then printf("Event %d year %d\\n", f.code, f.when.year);',
      solution:
`struct Date { int day; int month; int year; };
struct Event { int code; struct Date when; };
struct Event e;
e.code = 42; e.when.day = 15; e.when.month = 8; e.when.year = 2024;
printf("Event %d year %d\\n", e.code, e.when.year);
struct Event f = {99, {1, 1, 2025}};
printf("Event %d year %d\\n", f.code, f.when.year);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-nested-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the dots to access the nested struct members.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Pos { int x; int y; };
struct Player { int score; struct Pos loc; };
struct Player p = {100, {3, 7}};
printf("%d\\n",  p[?]score);
printf("%d\\n",  p[?]loc[?]x);
printf("%d\\n",  p[?]loc[?]y);`,
      blanks: ['.', '.', '.', '.', '.'],
      hint: 'Score is a direct member: p.score. Position is nested: p.loc.x needs two dots.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-nested-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define struct Size {int w; int h;}. Define struct Window {char title[20]; struct Size dims;}. Create a window: title="Main", w=800, h=600. Print title, width, and height.',
      includes: ['<stdio.h>', '<string.h>'],
      starterCode: '',
      checkFn: output => output.includes('800') && output.includes('600'),
      hint: 'struct Window win; strcpy(win.title, "Main"); win.dims.w=800; win.dims.h=600; printf them.',
      solution:
`struct Size { int w; int h; };
struct Window { char title[20]; struct Size dims; };
struct Window win;
strcpy(win.title, "Main");
win.dims.w = 800;
win.dims.h = 600;
printf("%s\\n", win.title);
printf("%d x %d\\n", win.dims.w, win.dims.h);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-ne-p1', type: 'predict', question: 'What does this print?',
          code: `struct Inner { int v; };\nstruct Outer { struct Inner in; };\nstruct Outer o;\no.in.v = 42;\nprintf("%d\\n", o.in.v);`,
          correct: ['42'], caseSensitive: true, orderMatters: true,
          hint: 'o.in is the Inner struct, .v is the value inside it.',
          feedback: { correct: 'Correct — o.in.v was set to 42 and is printed as 42.', incorrect: 'o.in.v accesses the v member inside the nested in struct. It was set to 42.' }
        },
        {
          id: 'ch17-ne-p2', type: 'predict', question: 'What does this print?',
          code: `struct Pt { int x; int y; };\nstruct Line { struct Pt a; struct Pt b; };\nstruct Line L = {{1,2},{3,4}};\nprintf("%d %d\\n", L.a.x, L.b.y);`,
          correct: ['1 4'], caseSensitive: true, orderMatters: true,
          hint: 'L.a is {1,2} and L.b is {3,4}. L.a.x=1, L.b.y=4.',
          feedback: { correct: 'Correct — L.a.x=1 and L.b.y=4, printed as "1 4".', incorrect: 'L.a={1,2} so L.a.x=1. L.b={3,4} so L.b.y=4. Output: "1 4".' }
        },
        {
          id: 'ch17-ne-p3', type: 'predict', question: 'What does this print?',
          code: `struct D { int n; };\nstruct E { struct D d; };\nstruct E e = {{7}};\ne.d.n = e.d.n * 3;\nprintf("%d\\n", e.d.n);`,
          correct: ['21'], caseSensitive: true, orderMatters: true,
          hint: 'e.d.n starts as 7. 7 * 3 = 21.',
          feedback: { correct: 'Correct — e.d.n starts at 7, multiplied by 3 gives 21.', incorrect: 'The initializer {{7}} sets e.d.n=7. Then e.d.n * 3 = 21.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-ne-m1', type: 'mcq',
          question: 'To access year inside "struct Event { int code; struct Date when; };", the syntax is:',
          options: ['event.year', 'event->when.year', 'event.when.year', 'event.Date.year'],
          correct: ['event.when.year'],
          caseSensitive: false, orderMatters: false,
          hint: 'You navigate through each member name with dots.',
          feedback: { correct: 'Correct — event.when reaches the Date struct, then .year accesses its member.', incorrect: 'event.when.year: first .when reaches the nested struct, then .year reaches the field inside it.' }
        },
        {
          id: 'ch17-ne-m2', type: 'mcq',
          question: 'How do you initialize a nested struct at declaration time?',
          options: [
            'struct Outer o = {42, year=2024};',
            'struct Outer o = {42, {15, 8, 2024}};',
            'struct Outer o = {42}; o.when = {15, 8, 2024};',
            'Nested structs cannot be initialized at declaration'
          ],
          correct: ['struct Outer o = {42, {15, 8, 2024}};'],
          caseSensitive: false, orderMatters: false,
          hint: 'Each nested struct gets its own set of braces in the initializer.',
          feedback: { correct: 'Correct — nested braces initialize the nested struct: the inner {} initializes the Date members.', incorrect: 'Use nested braces: {outerVal, {nestedVal1, nestedVal2}}. Each {} level corresponds to one struct level.' }
        },
        {
          id: 'ch17-ne-m3', type: 'mcq',
          question: 'How many dot operators access "p.loc.x" where loc is a nested struct?',
          options: ['0', '1', '2', '3'],
          correct: ['2'],
          caseSensitive: false, orderMatters: false,
          hint: 'Count the dots in p.loc.x.',
          feedback: { correct: 'Correct — two dots: p.loc accesses the nested struct, .x accesses the field inside it.', incorrect: 'p.loc.x has two dots. The first reaches the nested struct (loc), the second reaches the field (x) inside it.' }
        },
        {
          id: 'ch17-ne-m4', type: 'mcq',
          question: 'Why are nested structs useful?',
          options: [
            'They run faster than flat structs',
            'They group sub-concepts that have their own coherent identity',
            'They reduce the total number of members',
            'They are required for struct arrays'
          ],
          correct: ['They group sub-concepts that have their own coherent identity'],
          caseSensitive: false, orderMatters: false,
          hint: 'An address has street, city, zip — it makes sense as its own type.',
          feedback: { correct: 'Correct — a Date has day/month/year and makes sense as its own type. Nesting it models the real relationship.', incorrect: 'Nested structs model real-world containment: a Student has an Address, which has street/city/zip — each with its own meaning.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define struct Inner {int val;}. Define struct Outer {struct Inner i;}. Create o with o.i.val=100. Print it.',
          check: o => o.trim().includes('100'),
          hint: 'struct Outer o; o.i.val = 100; printf("%d\\n", o.i.val);',
          solution: `struct Inner { int val; };\nstruct Outer { struct Inner i; };\nstruct Outer o;\no.i.val = 100;\nprintf("%d\\n", o.i.val);` },
        { id: 'p2', task: 'Define struct Coords {int x; int y;}. Define struct Ship {int id; struct Coords pos;}. Initialize ship {7, {10, 20}}. Print id, x, and y.',
          check: o => o.includes('7') && o.includes('10') && o.includes('20'),
          hint: 'struct Ship s = {7, {10, 20}}; printf ship.id, ship.pos.x, ship.pos.y.',
          solution: `struct Coords { int x; int y; };\nstruct Ship { int id; struct Coords pos; };\nstruct Ship s = {7, {10, 20}};\nprintf("%d\\n", s.id);\nprintf("%d %d\\n", s.pos.x, s.pos.y);` },
        { id: 'p3', task: 'Define struct Time {int h; int m;}. Define struct Alarm {struct Time start; struct Time end;}. Set start={9,0} end={10,30}. Print "9:00 to 10:30".',
          check: o => o.includes('9') && o.includes('10') && o.includes('30'),
          hint: 'struct Alarm a = {{9,0},{10,30}}; printf("%d:%02d to %d:%02d\\n", a.start.h, a.start.m, a.end.h, a.end.m);',
          solution: `struct Time { int h; int m; };\nstruct Alarm { struct Time start; struct Time end; };\nstruct Alarm a = {{9,0},{10,30}};\nprintf("%d:%02d to %d:%02d\\n", a.start.h, a.start.m, a.end.h, a.end.m);` }
      ]
      renderPracticeSet('practice-ch17-nested', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-nested-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-nested-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-nested-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 5 but does not compile. The nested member access is wrong.',
        includes: ['<stdio.h>'],
        starterCode:
`struct Inner { int x; };
struct Outer { struct Inner in; };
struct Outer o = {{5}};
printf("%d\\n", o.x);`,
        checkFn: output => output.trim() === '5',
        hint: 'Look at the printf — is o.x the right way to access the nested member?',
        hintTwo: 'x is inside the inner struct, not directly in Outer. The correct access is o.in.x — first .in reaches the Inner struct, then .x reaches the field.',
        solution: `struct Inner { int x; };\nstruct Outer { struct Inner in; };\nstruct Outer o = {{5}};\nprintf("%d\\n", o.in.x);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Nested Structs — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 5 — Arrays of Structs
     ══════════════════════════════════════════════════════════════ */
  function initTopic_array() {
    const topicId = 'ch17-array'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-array-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`struct Score { int player; int points; };
struct Score board[3] = {
    {1, 350},
    {2, 420},
    {3, 280}
};
int i;
for (i = 0; i < 3; i++) {
    printf("P%d: %d pts\\n", board[i].player, board[i].points);
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-array',
      question: 'To access the points of the second player, the syntax is board[1].points. Why is the index 1, not 2?',
      options: [
        'Arrays start at 0 — index 1 is the second element',
        'The index skips the first element',
        'board[2] would access the third player',
        'Both A and C are correct'
      ],
      correctIndex: 3,
      feedback: {
        correct: 'Correct — arrays are zero-indexed. Index 0 = first, index 1 = second, index 2 = third. So board[1].points is the second player, and board[2] is the third.',
        incorrect: 'C arrays start at index 0. board[0] is player 1, board[1] is player 2, board[2] is player 3. So board[1].points gives the second player\'s points.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-array-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-array-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'After the loop, add code to find and print the highest score. (Hint: use a variable to track the max as you scan the array.)',
      includes: ['<stdio.h>'],
      starterCode:
`struct Score { int player; int points; };
struct Score board[3] = {{1,350},{2,420},{3,280}};
int i;
for (i = 0; i < 3; i++) {
    printf("P%d: %d\\n", board[i].player, board[i].points);
}`,
      checkFn: output => output.includes('420'),
      hint: 'int max = board[0].points; for(i=1;i<3;i++) if(board[i].points > max) max = board[i].points; printf("Max: %d\\n", max);',
      solution:
`struct Score { int player; int points; };
struct Score board[3] = {{1,350},{2,420},{3,280}};
int i;
for (i = 0; i < 3; i++) {
    printf("P%d: %d\\n", board[i].player, board[i].points);
}
int max = board[0].points;
for (i = 1; i < 3; i++) {
    if (board[i].points > max) max = board[i].points;
}
printf("Max: %d\\n", max);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-array-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to access array-of-struct elements.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Item { int id; int qty; };
struct Item inv[2] = {{101, 50}, {102, 30}};
printf("%d\\n", inv[?].id);
printf("%d\\n", inv[?].qty);
printf("%d\\n", inv[?].id);
printf("%d\\n", inv[?].qty);`,
      blanks: ['0', '0', '1', '1'],
      hint: 'Use index 0 for the first item and index 1 for the second. The pattern is array[index].member.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-array-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define struct Student with int id and float gpa. Declare 3 students: {1,3.8}, {2,2.5}, {3,3.1}. Loop to print each. Then print the highest GPA.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('3.8') && output.includes('2.5') && output.includes('3.1') && (output.match(/3\.8/g)||[]).length >= 2,
      hint: 'struct Student cls[3] = {{1,3.8f},{2,2.5f},{3,3.1f}}; for loop prints each; then find max gpa.',
      solution:
`struct Student { int id; float gpa; };
struct Student cls[3] = {{1, 3.8f}, {2, 2.5f}, {3, 3.1f}};
int i;
for (i = 0; i < 3; i++) {
    printf("ID:%d GPA:%.1f\\n", cls[i].id, cls[i].gpa);
}
float max = cls[0].gpa;
for (i = 1; i < 3; i++) {
    if (cls[i].gpa > max) max = cls[i].gpa;
}
printf("Max GPA: %.1f\\n", max);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-ar-p1', type: 'predict', question: 'What does this print?',
          code: `struct P { int x; };\nstruct P arr[3] = {{10},{20},{30}};\nprintf("%d\\n", arr[1].x);`,
          correct: ['20'], caseSensitive: true, orderMatters: true,
          hint: 'arr[1] is the second element (zero-indexed). Its x value is 20.',
          feedback: { correct: 'Correct — arr[1] is the second element, x=20.', incorrect: 'arr[0].x=10, arr[1].x=20, arr[2].x=30. arr[1].x = 20.' }
        },
        {
          id: 'ch17-ar-p2', type: 'predict', question: 'What does this print?',
          code: `struct N { int v; };\nstruct N a[2] = {{5},{8}};\na[0].v = a[0].v + a[1].v;\nprintf("%d\\n", a[0].v);`,
          correct: ['13'], caseSensitive: true, orderMatters: true,
          hint: 'a[0].v starts at 5, a[1].v is 8. After the assignment: a[0].v = 5+8=13.',
          feedback: { correct: 'Correct — 5 + 8 = 13.', incorrect: 'a[0].v=5, a[1].v=8. a[0].v = 5+8 = 13.' }
        },
        {
          id: 'ch17-ar-p3', type: 'predict', question: 'What does this print?',
          code: `struct S { int n; };\nstruct S arr[3] = {{1},{2},{3}};\nint sum = 0;\nint i;\nfor(i=0;i<3;i++) sum += arr[i].n;\nprintf("%d\\n", sum);`,
          correct: ['6'], caseSensitive: true, orderMatters: true,
          hint: '1 + 2 + 3 = 6.',
          feedback: { correct: 'Correct — 1 + 2 + 3 = 6.', incorrect: 'arr[0].n=1, arr[1].n=2, arr[2].n=3. Sum = 1+2+3=6.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-ar-m1', type: 'mcq',
          question: 'What is the correct way to access the points member of the third element in struct Score board[5]?',
          options: ['board.points[2]', 'board[3].points', 'board[2].points', 'board->points[2]'],
          correct: ['board[2].points'],
          caseSensitive: false, orderMatters: false,
          hint: 'Arrays are zero-indexed. Third element = index 2.',
          feedback: { correct: 'Correct — board[2] selects the third element (index 2), then .points accesses the member.', incorrect: 'board[2].points: index 2 for the third element (zero-based), then .points. The pattern is always array[index].member.' }
        },
        {
          id: 'ch17-ar-m2', type: 'mcq',
          question: 'How do you declare an array of 10 Student structs?',
          options: ['Student[10] class;', 'struct Student class = [10];', 'struct Student class[10];', 'array<Student, 10> class;'],
          correct: ['struct Student class[10];'],
          caseSensitive: false, orderMatters: false,
          hint: 'Same syntax as int arr[10]; — just use the struct type instead of int.',
          feedback: { correct: 'Correct — struct Student class[10]; declares an array of 10 Student structs.', incorrect: 'Declaration syntax: struct TypeName arrayName[size]; — same pattern as int arr[10];' }
        },
        {
          id: 'ch17-ar-m3', type: 'mcq',
          question: 'In a loop "for(i=0; i<3; i++)", which expression correctly accesses the grade of each student in struct Student s[3]?',
          options: ['s.grade[i]', 'grade[i].s', 's[i].grade', 's->grade[i]'],
          correct: ['s[i].grade'],
          caseSensitive: false, orderMatters: false,
          hint: 'Index selects the struct, dot accesses the member.',
          feedback: { correct: 'Correct — s[i].grade: use i to pick which student, then .grade to get the member.', incorrect: 's[i].grade is the correct pattern. First [i] selects the struct at index i, then .grade accesses the member.' }
        },
        {
          id: 'ch17-ar-m4', type: 'mcq',
          question: 'What is the size of struct Score board[5] if sizeof(struct Score) == 8?',
          options: ['8 bytes', '13 bytes', '5 bytes', '40 bytes'],
          correct: ['40 bytes'],
          caseSensitive: false, orderMatters: false,
          hint: 'Array size = number of elements × size of one element.',
          feedback: { correct: 'Correct — 5 elements × 8 bytes each = 40 bytes total.', incorrect: 'Total size = count × sizeof(element). 5 × 8 = 40 bytes.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define struct Point with int x, int y. Declare pts[3] = {{1,2},{3,4},{5,6}}. Print the x and y of the second point.',
          check: o => o.includes('3') && o.includes('4'),
          hint: 'printf("%d %d\\n", pts[1].x, pts[1].y); — index 1 for the second element.',
          solution: `struct Point { int x; int y; };\nstruct Point pts[3] = {{1,2},{3,4},{5,6}};\nprintf("%d %d\\n", pts[1].x, pts[1].y);` },
        { id: 'p2', task: 'Define struct Val with int n. Declare v[5] = {10,20,30,40,50}. Use a loop to print each n.',
          check: o => o.includes('10') && o.includes('20') && o.includes('30') && o.includes('40') && o.includes('50'),
          hint: 'struct Val v[5] = {{10},{20},{30},{40},{50}}; for(int i=0;i<5;i++) printf("%d\\n", v[i].n);',
          solution: `struct Val { int n; };\nstruct Val v[5] = {{10},{20},{30},{40},{50}};\nint i;\nfor(i=0;i<5;i++) printf("%d\\n", v[i].n);` },
        { id: 'p3', task: 'Define struct Num with int v. Declare arr[4] = {3,7,2,9}. Loop to compute and print their sum.',
          check: o => o.trim().includes('21'),
          hint: 'int sum=0; for(i=0;i<4;i++) sum += arr[i].v; printf("%d\\n", sum); 3+7+2+9=21.',
          solution: `struct Num { int v; };\nstruct Num arr[4] = {{3},{7},{2},{9}};\nint sum=0, i;\nfor(i=0;i<4;i++) sum += arr[i].v;\nprintf("%d\\n", sum);` }
      ]
      renderPracticeSet('practice-ch17-array', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-array-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-array-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-array-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This loop should print 3 values but the access pattern is wrong. Find it.',
        includes: ['<stdio.h>'],
        starterCode:
`struct Item { int id; int qty; };
struct Item inv[3] = {{1,10},{2,20},{3,30}};
int i;
for (i = 0; i < 3; i++) {
    printf("%d\\n", inv.qty[i]);
}`,
        checkFn: output => output.includes('10') && output.includes('20') && output.includes('30'),
        hint: 'Look at inv.qty[i] — is that the right order for array-of-struct access?',
        hintTwo: 'The correct pattern is inv[i].qty — index the array first to select the struct, then dot to access the member. "inv.qty[i]" treats qty as an array, which it is not.',
        solution: `struct Item { int id; int qty; };\nstruct Item inv[3] = {{1,10},{2,20},{3,30}};\nint i;\nfor (i = 0; i < 3; i++) {\n    printf("%d\\n", inv[i].qty);\n}`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Arrays of Structs — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 6 — Pointers to Structs and -> operator
     ══════════════════════════════════════════════════════════════ */
  function initTopic_ptr() {
    const topicId = 'ch17-ptr'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-ptr-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`struct Point { int x; int y; };
struct Point  s  = {3, 7};
struct Point *p  = &s;

printf("dot:   %d %d\\n", s.x,   s.y);
printf("arrow: %d %d\\n", p->x, p->y);

p->x = 99;
printf("after arrow write: %d\\n", s.x);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-ptr',
      question: 'After "p->x = 99;", s.x printed as 99 — not 3. Why?',
      options: [
        'p->x creates a new copy of x',
        'p points to s — they share the same memory, so p->x writes directly to s.x',
        'The = operator copies to both s and p',
        'printf read p instead of s by mistake'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — p = &s makes p point to s. Writing through p->x modifies the same memory as s.x. There is no copy.',
        incorrect: 'p = &s means p stores the address of s. p->x and s.x are the same memory location — writing to one changes the other.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-ptr-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-ptr-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add code to also modify p->y to 50 through the pointer, then print both s.x and s.y to confirm both changed.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Point { int x; int y; };
struct Point  s = {3, 7};
struct Point *p = &s;
p->x = 99;
printf("x: %d\\n", s.x);`,
      checkFn: output => output.includes('99') && output.includes('50'),
      hint: 'Add: p->y = 50; then printf("y: %d\\n", s.y);',
      solution:
`struct Point { int x; int y; };
struct Point  s = {3, 7};
struct Point *p = &s;
p->x = 99;
p->y = 50;
printf("x: %d\\n", s.x);
printf("y: %d\\n", s.y);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-ptr-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in: dot for the variable, arrow for the pointer.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Val { int n; };
struct Val  v = {42};
struct Val *p = &v;
printf("%d\\n", v[?]n);
printf("%d\\n", p[?]n);
p[?]n = 100;
printf("%d\\n", v[?]n);`,
      blanks: ['.', '->', '->', '.'],
      hint: 'v is a variable — use dot. p is a pointer — use arrow (->) for both reading and writing.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-ptr-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define struct Counter {int count;}. Declare c={0}. Declare pointer p=&c. Use the arrow operator to increment count 3 times. Print c.count.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.trim() === '3',
      hint: 'struct Counter c={0}; struct Counter *p=&c; p->count++; p->count++; p->count++; printf("%d\\n", c.count);',
      solution:
`struct Counter { int count; };
struct Counter  c = {0};
struct Counter *p = &c;
p->count++;
p->count++;
p->count++;
printf("%d\\n", c.count);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-pt-p1', type: 'predict', question: 'What does this print?',
          code: `struct N { int v; };\nstruct N  a = {10};\nstruct N *p = &a;\nprintf("%d\\n", p->v);`,
          correct: ['10'], caseSensitive: true, orderMatters: true,
          hint: 'p points to a. p->v is the same as a.v which is 10.',
          feedback: { correct: 'Correct — p->v accesses a.v through the pointer, which is 10.', incorrect: 'p = &a makes p point to a. p->v = a.v = 10.' }
        },
        {
          id: 'ch17-pt-p2', type: 'predict', question: 'What does this print?',
          code: `struct N { int v; };\nstruct N  a = {5};\nstruct N *p = &a;\np->v = p->v * 4;\nprintf("%d\\n", a.v);`,
          correct: ['20'], caseSensitive: true, orderMatters: true,
          hint: 'p->v = a.v = 5. After *4: p->v writes 20 to a.v.',
          feedback: { correct: 'Correct — p->v reads 5, multiplies by 4, and writes 20 back to a.v.', incorrect: 'p->v=a.v=5. p->v * 4 = 20. Writing through p->v modifies a.v. So a.v = 20.' }
        },
        {
          id: 'ch17-pt-p3', type: 'predict', question: 'What does this print?',
          code: `struct S { int a; int b; };\nstruct S s = {3, 7};\nstruct S *p = &s;\nprintf("%d\\n", (*p).a + p->b);`,
          correct: ['10'], caseSensitive: true, orderMatters: true,
          hint: '(*p).a is the same as p->a = 3. p->b = 7. 3+7=10.',
          feedback: { correct: 'Correct — (*p).a = s.a = 3 and p->b = s.b = 7. 3+7=10.', incorrect: '(*p).a and p->a mean the same thing — both equal s.a = 3. p->b = s.b = 7. Sum = 10.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-pt-m1', type: 'mcq',
          question: 'When should you use -> instead of . to access a struct member?',
          options: ['When the struct has more than 3 members', 'When the variable is a pointer to a struct', 'When the member is a float', 'Whenever you want to modify a member'],
          correct: ['When the variable is a pointer to a struct'],
          caseSensitive: false, orderMatters: false,
          hint: 'The choice depends on the variable type — variable or pointer.',
          feedback: { correct: 'Correct — use . for direct struct variables, -> for pointers to structs.', incorrect: '-> is used when your variable is a pointer: struct Point *p; p->x. Use . when it is a direct variable: struct Point s; s.x.' }
        },
        {
          id: 'ch17-pt-m2', type: 'mcq',
          question: 'p->x is shorthand for which expression?',
          options: ['p.x', '&p.x', '(*p).x', '*(p.x)'],
          correct: ['(*p).x'],
          caseSensitive: false, orderMatters: false,
          hint: 'Arrow dereferences the pointer first, then accesses the member.',
          feedback: { correct: 'Correct — p->x means (*p).x: dereference p to get the struct, then access .x.', incorrect: 'p->x is exactly shorthand for (*p).x — dereference the pointer with *, then access the member with dot.' }
        },
        {
          id: 'ch17-pt-m3', type: 'mcq',
          question: 'If struct Point *p = &s; and you write p->x = 10, what happens to s.x?',
          options: ['Nothing — p->x and s.x are separate', 's.x becomes 10 — p points to s, same memory', 's.x becomes a copy of 10 at declaration', 'It depends on the type of x'],
          correct: ['s.x becomes 10 — p points to s, same memory'],
          caseSensitive: false, orderMatters: false,
          hint: 'A pointer does not copy — it stores the address.',
          feedback: { correct: 'Correct — p = &s means p stores s\'s address. p->x and s.x are the same memory location.', incorrect: 'p = &s makes p hold the address of s. There is no copy. p->x = 10 writes to the same location as s.x.' }
        },
        {
          id: 'ch17-pt-m4', type: 'mcq',
          question: 'What error does "struct Point *p = &s; p.x = 5;" cause?',
          options: ['A runtime crash', 'No error — both . and -> work on pointers', 'A compile error — . cannot be used on a pointer', 'A warning but still compiles'],
          correct: ['A compile error — . cannot be used on a pointer'],
          caseSensitive: false, orderMatters: false,
          hint: 'The compiler enforces the dot/arrow distinction strictly.',
          feedback: { correct: 'Correct — using . on a pointer is a compile error. The compiler says "request for member in something not a struct."', incorrect: 'p.x on a pointer is a compile error. Use p->x when p is a pointer.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define struct Box {int w;}. Declare b={5}. Declare pointer p=&b. Print b.w using the arrow operator through p.',
          check: o => o.trim() === '5',
          hint: 'struct Box *p = &b; printf("%d\\n", p->w);',
          solution: `struct Box { int w; };\nstruct Box b = {5};\nstruct Box *p = &b;\nprintf("%d\\n", p->w);` },
        { id: 'p2', task: 'Define struct Score {int pts;}. Declare s={100}. Declare pointer p=&s. Use p->pts to double the score. Print s.pts.',
          check: o => o.trim() === '200',
          hint: 'p->pts = p->pts * 2; then printf s.pts — or p->pts after the write.',
          solution: `struct Score { int pts; };\nstruct Score s = {100};\nstruct Score *p = &s;\np->pts = p->pts * 2;\nprintf("%d\\n", s.pts);` },
        { id: 'p3', task: 'Define struct Pt {int x; int y;}. Declare a={1,1} and b={5,5}. Declare pointer p. Point p to a, add 2 to x and y through p. Then point p to b and set both to 0. Print both structs.',
          check: o => o.includes('3') && o.includes('0'),
          hint: 'struct Pt *p = &a; p->x += 2; p->y += 2; p = &b; p->x = 0; p->y = 0; print both.',
          solution: `struct Pt { int x; int y; };\nstruct Pt a = {1,1};\nstruct Pt b = {5,5};\nstruct Pt *p = &a;\np->x += 2; p->y += 2;\np = &b;\np->x = 0; p->y = 0;\nprintf("%d %d\\n", a.x, a.y);\nprintf("%d %d\\n", b.x, b.y);` }
      ]
      renderPracticeSet('practice-ch17-ptr', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-ptr-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-ptr-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-ptr-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 42 but uses the wrong operator for the pointer. Find and fix it.',
        includes: ['<stdio.h>'],
        starterCode:
`struct Val { int n; };
struct Val  v = {42};
struct Val *p = &v;
printf("%d\\n", p.n);`,
        checkFn: output => output.trim() === '42',
        hint: 'Look at p.n — is p a direct variable or a pointer?',
        hintTwo: 'p is declared as struct Val *p — it is a pointer. Use p->n instead of p.n. The dot operator only works on direct struct variables, not pointers.',
        solution: `struct Val { int n; };\nstruct Val  v = {42};\nstruct Val *p = &v;\nprintf("%d\\n", p->n);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Pointers to Structs — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 7 — Passing Structs to Functions
     ══════════════════════════════════════════════════════════════ */
  function initTopic_fn() {
    const topicId = 'ch17-fn'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-fn-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`struct Box { int w; int h; };

void printBox(struct Box b) {
    printf("%d x %d\\n", b.w, b.h);
}

void doubleBox(struct Box *b) {
    b->w *= 2;
    b->h *= 2;
}

struct Box box = {5, 3};
printBox(box);
doubleBox(&box);
printBox(box);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-fn',
      question: 'printBox(box) passes the struct by value. If you added "b.w = 0;" inside printBox, what would happen to box.w after the call?',
      options: [
        'box.w would become 0 — the function modifies the original',
        'box.w would stay 5 — printBox got a copy, not the original',
        'It depends on whether box was declared locally or globally',
        'The compiler would refuse to compile it'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — pass by value copies all members. Changes inside printBox only affect the local copy — the original is untouched.',
        incorrect: 'Pass by value copies the struct. printBox receives its own independent copy. Any changes inside printBox are invisible to the caller — box.w stays 5.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-fn-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-fn-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a function makeBox(int w, int h) that returns a struct Box by value. Call it to create a new box and print it.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Box { int w; int h; };

void printBox(struct Box b) {
    printf("%d x %d\\n", b.w, b.h);
}

struct Box b1 = {4, 2};
printBox(b1);`,
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 2
      },
      hint: 'struct Box makeBox(int w, int h) { struct Box b = {w, h}; return b; } then: struct Box b2 = makeBox(10, 5); printBox(b2);',
      solution:
`struct Box { int w; int h; };

void printBox(struct Box b) {
    printf("%d x %d\\n", b.w, b.h);
}

struct Box makeBox(int w, int h) {
    struct Box b = {w, h};
    return b;
}

struct Box b1 = {4, 2};
printBox(b1);
struct Box b2 = makeBox(10, 5);
printBox(b2);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-fn-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete the function that modifies a struct through a pointer.',
      includes: ['<stdio.h>'],
      starterCode:
`struct Score { int pts; };

void addPoints([?] Score [?]s, int amount) {
    s[?]pts [?]= amount;
}

struct Score sc = {100};
addPoints([?]sc, 50);
printf("%d\\n", sc.pts);`,
      blanks: ['struct', '*', '->', '+', '&'],
      hint: 'The parameter must be a pointer (struct Score *s). Inside, use arrow to access: s->pts. Pass with address-of: &sc.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-fn-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define struct Rect {int w; int h;}. Write area(struct Rect r) returning int. Write scale(struct Rect *r, int f) multiplying both w and h by f. Declare r={4,3}, print area. Scale by 2, print new area.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('12') && output.includes('48'),
      hint: 'int area(struct Rect r){return r.w*r.h;} void scale(struct Rect *r, int f){r->w*=f; r->h*=f;} area of 4x3=12; after scale(2): 8x6, area=48.',
      solution:
`struct Rect { int w; int h; };

int area(struct Rect r) {
    return r.w * r.h;
}

void scale(struct Rect *r, int f) {
    r->w *= f;
    r->h *= f;
}

struct Rect r = {4, 3};
printf("%d\\n", area(r));
scale(&r, 2);
printf("%d\\n", area(r));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-fn-p1', type: 'predict', question: 'What does this print?',
          code: `struct N { int v; };\nvoid zero(struct N n) { n.v = 0; }\nstruct N a = {5};\nzero(a);\nprintf("%d\\n", a.v);`,
          correct: ['5'], caseSensitive: true, orderMatters: true,
          hint: 'zero() receives a copy — changes to the copy do not affect a.',
          feedback: { correct: 'Correct — zero() gets a copy. Setting n.v=0 inside the function does not change a.v.', incorrect: 'Pass by value copies the struct. Changes inside zero() are to the local copy only — a.v stays 5.' }
        },
        {
          id: 'ch17-fn-p2', type: 'predict', question: 'What does this print?',
          code: `struct N { int v; };\nvoid dbl(struct N *n) { n->v *= 2; }\nstruct N a = {7};\ndbl(&a);\nprintf("%d\\n", a.v);`,
          correct: ['14'], caseSensitive: true, orderMatters: true,
          hint: 'dbl() receives a pointer to a. n->v *= 2 modifies a.v directly.',
          feedback: { correct: 'Correct — pass by pointer lets dbl() modify a.v. 7 * 2 = 14.', incorrect: 'dbl receives &a (pointer to a). n->v *= 2 writes through the pointer to a.v. 7*2=14.' }
        },
        {
          id: 'ch17-fn-p3', type: 'predict', question: 'What does this print?',
          code: `struct P { int x; };\nstruct P make(int v) { struct P p = {v}; return p; }\nstruct P a = make(99);\nprintf("%d\\n", a.x);`,
          correct: ['99'], caseSensitive: true, orderMatters: true,
          hint: 'make(99) creates a struct P with x=99 and returns it by value.',
          feedback: { correct: 'Correct — make(99) returns a struct with x=99. That value is assigned to a.', incorrect: 'make() creates a local struct with x=v=99 and returns it by value. a.x = 99.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-fn-m1', type: 'mcq',
          question: 'When you pass a struct to a function by value, what does the function receive?',
          options: ['A pointer to the original struct', 'A reference to the original struct', 'An independent copy of all members', 'Only the first member'],
          correct: ['An independent copy of all members'],
          caseSensitive: false, orderMatters: false,
          hint: 'Pass by value means copy — the original is untouched.',
          feedback: { correct: 'Correct — pass by value copies all members into the function\'s local parameter. The original is not affected by any changes inside.', incorrect: 'Passing by value creates a complete copy of all members. The function\'s local struct and the caller\'s original are independent.' }
        },
        {
          id: 'ch17-fn-m2', type: 'mcq',
          question: 'To write a function that modifies the caller\'s struct, the parameter should be:',
          options: ['struct Box b', 'struct Box b[]', 'struct Box *b', 'const struct Box b'],
          correct: ['struct Box *b'],
          caseSensitive: false, orderMatters: false,
          hint: 'A pointer lets the function write to the caller\'s memory.',
          feedback: { correct: 'Correct — struct Box *b accepts a pointer, allowing the function to modify the original via b->member.', incorrect: 'To modify the caller\'s struct, pass a pointer: struct Box *b. Then call with &myBox and access with b->member inside the function.' }
        },
        {
          id: 'ch17-fn-m3', type: 'mcq',
          question: 'Can a function return a struct by value in C?',
          options: ['No — only pointers can be returned', 'Yes — the entire struct is copied to the caller', 'Only if the struct has one member', 'Only in C99 or later'],
          correct: ['Yes — the entire struct is copied to the caller'],
          caseSensitive: false, orderMatters: false,
          hint: 'C has always supported returning structs by value.',
          feedback: { correct: 'Correct — C allows returning structs by value. The entire struct is copied to the caller\'s variable.', incorrect: 'C supports returning structs by value: struct Box makeBox(){ struct Box b={1,2}; return b; }. The return copies all members to the caller.' }
        },
        {
          id: 'ch17-fn-m4', type: 'mcq',
          question: 'Why use "const struct Box *b" as a parameter instead of "struct Box b"?',
          options: [
            'const pointers are faster than values',
            'Pointer avoids copying the struct; const prevents accidental writes',
            'Only const parameters can access struct members',
            'struct values cannot be passed to functions'
          ],
          correct: ['Pointer avoids copying the struct; const prevents accidental writes'],
          caseSensitive: false, orderMatters: false,
          hint: 'It combines two benefits: efficiency and safety.',
          feedback: { correct: 'Correct — passing a pointer avoids copying (efficient); const prevents the function from accidentally modifying the struct (safe).', incorrect: 'const struct Box *b: the pointer avoids copying all members (faster for large structs), while const ensures the function cannot modify the struct (safety).' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define struct Circle {float radius;}. Write area(struct Circle c) returning float (area = 3.14 * r * r). Declare c={5.0}. Print area with 2 decimals.',
          check: o => o.includes('78.5'),
          hint: 'float area(struct Circle c) { return 3.14f * c.radius * c.radius; } struct Circle c={5.0f}; printf("%.2f\\n", area(c));',
          solution: `struct Circle { float radius; };\nfloat area(struct Circle c) { return 3.14f * c.radius * c.radius; }\nstruct Circle c = {5.0f};\nprintf("%.2f\\n", area(c));` },
        { id: 'p2', task: 'Define struct Counter {int n;}. Write increment(struct Counter *c) adding 1. Declare c={0}, call increment 5 times. Print c.n.',
          check: o => o.trim() === '5',
          hint: 'void increment(struct Counter *c) { c->n++; } Call 5 times with &c.',
          solution: `struct Counter { int n; };\nvoid increment(struct Counter *c) { c->n++; }\nstruct Counter c = {0};\nincrement(&c); increment(&c); increment(&c); increment(&c); increment(&c);\nprintf("%d\\n", c.n);` },
        { id: 'p3', task: 'Define struct Vec {int x; int y;}. Write makeVec(int x, int y) returning struct Vec. Write magnitude(struct Vec v) returning int (x*x + y*y). Create v=makeVec(3,4). Print magnitude.',
          check: o => o.trim() === '25',
          hint: 'struct Vec makeVec(int x, int y){struct Vec v={x,y}; return v;} int magnitude(struct Vec v){return v.x*v.x+v.y*v.y;} 3*3+4*4=25.',
          solution: `struct Vec { int x; int y; };\nstruct Vec makeVec(int x, int y) { struct Vec v = {x, y}; return v; }\nint magnitude(struct Vec v) { return v.x*v.x + v.y*v.y; }\nstruct Vec v = makeVec(3, 4);\nprintf("%d\\n", magnitude(v));` }
      ]
      renderPracticeSet('practice-ch17-fn', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-fn-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-fn-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-fn-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This function should double the value in the struct but the caller\'s struct is unchanged. Find why.',
        includes: ['<stdio.h>'],
        starterCode:
`struct N { int v; };

void dbl(struct N n) {
    n.v = n.v * 2;
}

struct N a = {5};
dbl(a);
printf("%d\\n", a.v);`,
        checkFn: output => output.trim() === '10',
        hint: 'Look at the parameter type — is dbl() receiving a copy or the original?',
        hintTwo: 'dbl receives struct N n — a copy. Changes to the copy are invisible to the caller. Change to void dbl(struct N *n) and use n->v = n->v * 2; inside. Call with dbl(&a);',
        solution: `struct N { int v; };\nvoid dbl(struct N *n) {\n    n->v = n->v * 2;\n}\nstruct N a = {5};\ndbl(&a);\nprintf("%d\\n", a.v);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Structs & Functions — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 8 — typedef
     ══════════════════════════════════════════════════════════════ */
  function initTopic_typedef() {
    const topicId = 'ch17-typedef'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-typedef-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Without typedef */
struct Point { int x; int y; };
struct Point a = {3, 7};
printf("struct Point: %d %d\\n", a.x, a.y);

/* With typedef — combined form */
typedef struct {
    int x;
    int y;
} Vec2;

Vec2 b = {10, 20};
printf("Vec2: %d %d\\n", b.x, b.y);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-typedef',
      question: 'After "typedef struct { int x; int y; } Vec2;", what keyword do you use when declaring a variable?',
      options: [
        'struct Vec2 v = {1,2}; — still need struct keyword',
        'Vec2 v = {1, 2}; — no struct keyword needed',
        'typedef Vec2 v = {1,2}; — typedef keyword required',
        'type Vec2 v = {1,2}; — short form'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — typedef creates an alias so you write Vec2 v = {1,2}; without the struct keyword.',
        incorrect: 'typedef Vec2 creates an alias for the struct type. After typedef, you declare with just Vec2 v = {1,2}; — no struct keyword needed.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-typedef-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-typedef-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a float z member to the Vec2 typedef (making it Vec3 instead). Update the declaration and print all three members.',
      includes: ['<stdio.h>'],
      starterCode:
`typedef struct {
    int x;
    int y;
} Vec2;
Vec2 v = {5, 10};
printf("%d %d\\n", v.x, v.y);`,
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 1 && output.includes('5') && output.includes('10')
      },
      hint: 'Rename to Vec3, add "float z;", update to Vec3 v = {5, 10, 3.0f}; and add a third printf for v.z.',
      solution:
`typedef struct {
    int x;
    int y;
    float z;
} Vec3;
Vec3 v = {5, 10, 3.0f};
printf("%d %d %.1f\\n", v.x, v.y, v.z);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-typedef-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to create and use a typedef\'d struct.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] struct {
    int id;
    float gpa;
} [?];

[?] s = {101, 3.8};
printf("%d\\n",  s.id);
printf("%.1f\\n", s.gpa);`,
      blanks: ['typedef', 'Student', 'Student'],
      hint: 'typedef comes before struct. The alias name (Student) goes after the closing }. Then use Student as the type name to declare variables.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-typedef-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Create a typedef Color with int r, g, b members. Declare red={255,0,0} and blue={0,0,255}. Print both using the Color type name (no struct keyword).',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('255') && output.includes('0') && (output.match(/255/g)||[]).length >= 2,
      hint: 'typedef struct { int r; int g; int b; } Color; Color red={255,0,0}; Color blue={0,0,255}; printf both.',
      solution:
`typedef struct {
    int r;
    int g;
    int b;
} Color;
Color red  = {255, 0, 0};
Color blue = {0, 0, 255};
printf("%d %d %d\\n", red.r,  red.g,  red.b);
printf("%d %d %d\\n", blue.r, blue.g, blue.b);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-td-p1', type: 'predict', question: 'What does this print?',
          code: `typedef struct { int n; } Num;\nNum x = {42};\nprintf("%d\\n", x.n);`,
          correct: ['42'], caseSensitive: true, orderMatters: true,
          hint: 'Num is the typedef alias. x.n = 42.',
          feedback: { correct: 'Correct — Num is the typedef alias. x.n = 42.', incorrect: 'typedef struct { int n; } Num; makes Num a type alias. Num x = {42}; creates x with n=42.' }
        },
        {
          id: 'ch17-td-p2', type: 'predict', question: 'What does this print?',
          code: `typedef struct { int a; int b; } Pair;\nPair p = {3, 7};\nPair q = p;\nq.a = 99;\nprintf("%d %d\\n", p.a, q.a);`,
          correct: ['3 99'], caseSensitive: true, orderMatters: true,
          hint: 'q = p copies values. q.a = 99 only changes q.',
          feedback: { correct: 'Correct — q = p copies. Changing q.a does not affect p.a. Output: 3 99.', incorrect: 'Typedef struct assignment copies values. p.a stays 3; q.a becomes 99. Output: "3 99".' }
        },
        {
          id: 'ch17-td-p3', type: 'predict', question: 'What does this print?',
          code: `typedef int Score;\nScore s = 85;\ns = s + 10;\nprintf("%d\\n", s);`,
          correct: ['95'], caseSensitive: true, orderMatters: true,
          hint: 'typedef int Score makes Score an alias for int. s=85, s+10=95.',
          feedback: { correct: 'Correct — typedef also works for primitive types. Score is just int. 85+10=95.', incorrect: 'typedef int Score creates an alias — Score is just int. s=85+10=95.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-td-m1', type: 'mcq',
          question: 'What does typedef do?',
          options: [
            'Creates a new type with different memory behavior',
            'Creates a new name (alias) for an existing type',
            'Defines a type that can only be used once',
            'Allocates memory for a struct'
          ],
          correct: ['Creates a new name (alias) for an existing type'],
          caseSensitive: false, orderMatters: false,
          hint: 'The underlying type does not change — only the name.',
          feedback: { correct: 'Correct — typedef creates an alias. The underlying type and memory are identical.', incorrect: 'typedef creates a name alias. "typedef int Score;" makes Score another name for int — same type, same memory.' }
        },
        {
          id: 'ch17-td-m2', type: 'mcq',
          question: 'Where does the type alias name go in "typedef struct { ... } Name;"?',
          options: ['Before the struct keyword', 'Between struct and the {', 'After the closing } before the ;', 'After the semicolon'],
          correct: ['After the closing } before the ;'],
          caseSensitive: false, orderMatters: false,
          hint: 'The pattern is: typedef struct { members } TypeName;',
          feedback: { correct: 'Correct — the alias name goes after the closing brace: typedef struct { int x; } Point; — Point is the alias.', incorrect: 'Pattern: typedef struct { members } AliasName; — the alias name appears after the } and before the ;' }
        },
        {
          id: 'ch17-td-m3', type: 'mcq',
          question: 'For a self-referential struct (like a linked list node), why is the struct tag needed?',
          options: [
            'Tags are always required — typedef cannot define anonymous structs',
            'The alias name is not yet defined inside the struct body, so the tag provides a usable name',
            'Self-referential structs require two typedefs',
            'The tag prevents infinite memory allocation'
          ],
          correct: ['The alias name is not yet defined inside the struct body, so the tag provides a usable name'],
          caseSensitive: false, orderMatters: false,
          hint: 'Inside the struct body, the typedef alias does not exist yet.',
          feedback: { correct: 'Correct — inside the struct body, the alias (Node) is not yet defined. The tag (struct Node) provides a name that can be used for the self-pointer.', incorrect: 'Inside "typedef struct { struct Node *next; } Node;", Node is not yet defined. Use "typedef struct Node { struct Node *next; } Node;" — the struct tag Node IS defined at struct { start.' }
        },
        {
          id: 'ch17-td-m4', type: 'mcq',
          question: 'After "typedef struct { int w; int h; } Size;", which is the correct declaration?',
          options: ['struct Size s = {4, 3};', 'typedef Size s = {4, 3};', 'Size s = {4, 3};', 'size s = {4, 3};'],
          correct: ['Size s = {4, 3};'],
          caseSensitive: true, orderMatters: false,
          hint: 'The whole point of typedef is to remove the struct keyword from declarations.',
          feedback: { correct: 'Correct — with typedef, just write Size s = {4, 3}; No struct keyword needed.', incorrect: 'After typedef, use the alias directly: Size s = {4, 3}; — no struct keyword. typedef\'s whole purpose is removing that keyword.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Create a typedef Point with int x, int y. Declare p={5,10} using just Point (no struct keyword). Print x and y.',
          check: o => o.includes('5') && o.includes('10'),
          hint: 'typedef struct { int x; int y; } Point; Point p = {5, 10}; printf both.',
          solution: `typedef struct { int x; int y; } Point;\nPoint p = {5, 10};\nprintf("%d\\n", p.x);\nprintf("%d\\n", p.y);` },
        { id: 'p2', task: 'Create typedef Student with int id and float gpa. Declare array of 2 students: {{1,3.5},{2,2.8}}. Loop to print each.',
          check: o => o.includes('3.5') && o.includes('2.8'),
          hint: 'typedef struct { int id; float gpa; } Student; Student s[2]={{1,3.5f},{2,2.8f}}; for loop.',
          solution: `typedef struct { int id; float gpa; } Student;\nStudent s[2] = {{1, 3.5f}, {2, 2.8f}};\nint i;\nfor(i=0;i<2;i++) printf("%d %.1f\\n", s[i].id, s[i].gpa);` },
        { id: 'p3', task: 'Create typedef Vec with float x, y. Write function add(Vec a, Vec b) returning Vec with summed components. Create v1={1,2}, v2={3,4}. Print result x and y.',
          check: o => o.includes('4') && o.includes('6'),
          hint: 'typedef struct {float x; float y;} Vec; Vec add(Vec a, Vec b){Vec r={a.x+b.x,a.y+b.y}; return r;} result=add(v1,v2); 1+3=4, 2+4=6.',
          solution: `typedef struct { float x; float y; } Vec;\nVec add(Vec a, Vec b) { Vec r = {a.x+b.x, a.y+b.y}; return r; }\nVec v1={1,2}, v2={3,4};\nVec result = add(v1, v2);\nprintf("%.0f %.0f\\n", result.x, result.y);` }
      ]
      renderPracticeSet('practice-ch17-typedef', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-typedef-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-typedef-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-typedef-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This typedef declaration has a bug — the alias name is in the wrong place.',
        includes: ['<stdio.h>'],
        starterCode:
`typedef Rect struct {
    int w;
    int h;
};
Rect r = {8, 4};
printf("%d\\n", r.w);`,
        checkFn: output => output.trim() === '8',
        hint: 'Look at where Rect appears in the typedef statement. Where should it be?',
        hintTwo: 'The pattern is: typedef struct { members } AliasName; — the alias goes AFTER the closing brace, not before struct. Fix: typedef struct { int w; int h; } Rect;',
        solution: `typedef struct {\n    int w;\n    int h;\n} Rect;\nRect r = {8, 4};\nprintf("%d\\n", r.w);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'typedef — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 9 — Enums — Named Integer Constants
     ══════════════════════════════════════════════════════════════ */
  function initTopic_enum() {
    const topicId = 'ch17-enum'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-enum-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };

enum Day today = WED;
printf("Today value: %d\\n", today);
printf("MON=%d FRI=%d SUN=%d\\n", MON, FRI, SUN);

enum Status { OK=200, NOT_FOUND=404, ERROR=500 };
enum Status code = NOT_FOUND;
printf("Status: %d\\n", code);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-enum',
      question: 'enum Day { MON, TUE, WED, ... } — MON starts at 0 automatically. What is WED\'s integer value?',
      options: ['0', '1', '2', '3'],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — MON=0, TUE=1, WED=2. Each constant is one more than the previous.',
        incorrect: 'Auto-numbering starts at 0: MON=0, TUE=1, WED=2. Each constant increments by 1 from the previous.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-enum-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-enum-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the enum to start from 1 (not 0): set MON=1, and let the rest auto-increment. Print MON, WED, and SUN values.',
      includes: ['<stdio.h>'],
      starterCode:
`enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };
printf("MON=%d WED=%d SUN=%d\\n", MON, WED, SUN);`,
      checkFn: output => output.includes('1') && output.includes('3') && output.includes('7'),
      hint: 'Change to: enum Day { MON=1, TUE, WED, THU, FRI, SAT, SUN }; Now MON=1, TUE=2, WED=3, ..., SUN=7.',
      solution:
`enum Day { MON=1, TUE, WED, THU, FRI, SAT, SUN };
printf("MON=%d WED=%d SUN=%d\\n", MON, WED, SUN);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-enum-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to declare an enum and use it.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] Color { RED, GREEN, BLUE };
[?] Color c = GREEN;
printf("%d\\n", c);
printf("%d\\n", [?]);`,
      blanks: ['enum', 'enum', 'BLUE'],
      hint: 'Both the definition and the variable declaration use the enum keyword. GREEN=1, BLUE=2 (auto-numbered from 0).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-enum-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define an enum Season with SPRING=1, SUMMER, FALL, WINTER. Declare a variable set to FALL. Print its name (use if/else or directly) and its integer value.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('3') || (output.toLowerCase().includes('fall') && output.includes('3')),
      hint: 'enum Season { SPRING=1, SUMMER, FALL, WINTER }; FALL = 3. enum Season s = FALL; printf("%d\\n", s); If you want the name: printf("FALL = %d\\n", s);',
      solution:
`enum Season { SPRING=1, SUMMER, FALL, WINTER };
enum Season s = FALL;
printf("FALL = %d\\n", s);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-en-p1', type: 'predict', question: 'What does this print?',
          code: `enum Dir { NORTH, EAST, SOUTH, WEST };\nprintf("%d\\n", SOUTH);`,
          correct: ['2'], caseSensitive: true, orderMatters: true,
          hint: 'NORTH=0, EAST=1, SOUTH=2.',
          feedback: { correct: 'Correct — SOUTH is the third constant (index 2).', incorrect: 'Auto-numbering: NORTH=0, EAST=1, SOUTH=2. printf prints 2.' }
        },
        {
          id: 'ch17-en-p2', type: 'predict', question: 'What does this print?',
          code: `enum Lvl { LOW=10, MED=20, HIGH=30 };\nenum Lvl x = MED;\nprintf("%d\\n", x + HIGH);`,
          correct: ['50'], caseSensitive: true, orderMatters: true,
          hint: 'x = MED = 20. HIGH = 30. 20 + 30 = 50.',
          feedback: { correct: 'Correct — MED=20, HIGH=30. 20+30=50.', incorrect: 'Custom values: MED=20, HIGH=30. x+HIGH = 20+30 = 50.' }
        },
        {
          id: 'ch17-en-p3', type: 'predict', question: 'What does this print?',
          code: `enum E { A=5, B, C };\nprintf("%d %d %d\\n", A, B, C);`,
          correct: ['5 6 7'], caseSensitive: true, orderMatters: true,
          hint: 'A=5. B auto-increments to 6. C auto-increments to 7.',
          feedback: { correct: 'Correct — A=5 sets the start; B and C auto-increment from there.', incorrect: 'When you set one value, subsequent constants auto-increment from it. A=5, B=6, C=7.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-en-m1', type: 'mcq',
          question: 'What integer does the first enum constant get if no value is specified?',
          options: ['1', '-1', '0', 'Undefined'],
          correct: ['0'],
          caseSensitive: false, orderMatters: false,
          hint: 'C enums count from zero by default.',
          feedback: { correct: 'Correct — the first enum constant defaults to 0 if no value is specified.', incorrect: 'The first enum constant automatically starts at 0. MON in "enum Day { MON, TUE, WED };" equals 0.' }
        },
        {
          id: 'ch17-en-m2', type: 'mcq',
          question: 'Why use an enum instead of #define constants like #define MON 0?',
          options: [
            'enum uses less memory',
            'enum groups related constants under one named type, making intent clear',
            '#define is not allowed in modern C',
            'enum constants can change at runtime'
          ],
          correct: ['enum groups related constants under one named type, making intent clear'],
          caseSensitive: false, orderMatters: false,
          hint: 'Grouping and naming matter for readability.',
          feedback: { correct: 'Correct — enum groups related constants under one named type. The compiler also knows they belong together.', incorrect: 'enum groups constants conceptually: "enum Day" tells the reader these are days of the week. #define constants are separate and unrelated.' }
        },
        {
          id: 'ch17-en-m3', type: 'mcq',
          question: 'What is the value of C in "enum E { A=10, B=20, C };"?',
          options: ['0', '10', '21', '30'],
          correct: ['21'],
          caseSensitive: false, orderMatters: false,
          hint: 'Each constant is one more than the previous unless specified.',
          feedback: { correct: 'Correct — C follows B=20, so C = 20+1 = 21.', incorrect: 'C auto-increments from B=20: C = 21. Each unspecified constant is one more than the previous.' }
        },
        {
          id: 'ch17-en-m4', type: 'mcq',
          question: 'Can two enum constants in the same scope share a name?',
          options: ['Yes — enum constants are scoped to their enum type', 'No — enum constants are global to the scope where the enum is defined', 'Yes — but only if they have the same value', 'Yes — if they are in different enum types'],
          correct: ['No — enum constants are global to the scope where the enum is defined'],
          caseSensitive: false, orderMatters: false,
          hint: 'Try defining two enums with a constant named RED.',
          feedback: { correct: 'Correct — enum constants in C are global to their enclosing scope. Two enums in the same scope cannot share a constant name.', incorrect: 'In C, enum constants are visible in the enclosing scope. If two enums define RED, the compiler sees a naming conflict.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define enum Rank {BRONZE, SILVER, GOLD, PLATINUM}. Print the integer value of GOLD.',
          check: o => o.trim() === '2',
          hint: 'enum Rank { BRONZE, SILVER, GOLD, PLATINUM }; GOLD is the third constant = 2. printf("%d\\n", GOLD);',
          solution: `enum Rank { BRONZE, SILVER, GOLD, PLATINUM };\nprintf("%d\\n", GOLD);` },
        { id: 'p2', task: 'Define enum HTTP {OK=200, REDIRECT=301, NOT_FOUND=404}. Declare a variable set to REDIRECT. Print its value.',
          check: o => o.trim() === '301',
          hint: 'enum HTTP code = REDIRECT; printf("%d\\n", code);',
          solution: `enum HTTP { OK=200, REDIRECT=301, NOT_FOUND=404 };\nenum HTTP code = REDIRECT;\nprintf("%d\\n", code);` },
        { id: 'p3', task: 'Define enum Priority {LOW=1, MED=5, HIGH=10}. Create three variables set to each. Print their sum.',
          check: o => o.trim() === '16',
          hint: 'LOW+MED+HIGH = 1+5+10 = 16. printf("%d\\n", low+med+high);',
          solution: `enum Priority { LOW=1, MED=5, HIGH=10 };\nenum Priority a=LOW, b=MED, c=HIGH;\nprintf("%d\\n", a+b+c);` }
      ]
      renderPracticeSet('practice-ch17-enum', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-enum-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-enum-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-enum-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 3 but prints wrong output. The enum values are incorrectly assigned.',
        includes: ['<stdio.h>'],
        starterCode:
`enum Level { EASY=1, NORMAL, HARD=1, EXPERT };
printf("%d\\n", HARD);`,
        checkFn: output => output.trim() === '3',
        hint: 'Look at HARD=1. Is that the intended value for HARD if EASY=1 and NORMAL=2?',
        hintTwo: 'Setting HARD=1 resets the sequence — HARD would equal 1 and EXPERT would equal 2. Change HARD to continue from NORMAL: remove the =1 assignment so HARD=3 and EXPERT=4 auto-increment correctly.',
        solution: `enum Level { EASY=1, NORMAL, HARD, EXPERT };\nprintf("%d\\n", HARD);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Enums — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 10 — Using Enums for State and Flags
     ══════════════════════════════════════════════════════════════ */
  function initTopic_enumuse() {
    const topicId = 'ch17-enumuse'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-enumuse-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`enum State { IDLE=0, RUNNING, PAUSED, DONE };
enum State current = IDLE;

switch (current) {
    case IDLE:    printf("Waiting\\n");   break;
    case RUNNING: printf("Working\\n");  break;
    case PAUSED:  printf("Paused\\n");   break;
    case DONE:    printf("Finished\\n"); break;
}

current = RUNNING;
switch (current) {
    case IDLE:    printf("Waiting\\n");   break;
    case RUNNING: printf("Working\\n");  break;
    case PAUSED:  printf("Paused\\n");   break;
    case DONE:    printf("Finished\\n"); break;
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-enumuse',
      question: 'After changing current to RUNNING and running the second switch, what printed?',
      options: ['Waiting', 'Working', 'Paused', 'Finished'],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — RUNNING matches case RUNNING, printing "Working".',
        incorrect: 'current = RUNNING. The switch matches case RUNNING and prints "Working" then breaks.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-enumuse-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-enumuse-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a new state CANCELED to the enum. Add a case for it that prints "Canceled". Set current=CANCELED and run the switch.',
      includes: ['<stdio.h>'],
      starterCode:
`enum State { IDLE, RUNNING, PAUSED, DONE };
enum State current = DONE;
switch (current) {
    case IDLE:    printf("Waiting\\n");   break;
    case RUNNING: printf("Working\\n");  break;
    case PAUSED:  printf("Paused\\n");   break;
    case DONE:    printf("Finished\\n"); break;
}`,
      checkFn: output => output.toLowerCase().includes('cancel'),
      hint: 'Add CANCELED to the enum. Add "case CANCELED: printf(\\"Canceled\\\\n\\"); break;" to the switch. Set current = CANCELED;',
      solution:
`enum State { IDLE, RUNNING, PAUSED, DONE, CANCELED };
enum State current = CANCELED;
switch (current) {
    case IDLE:     printf("Waiting\\n");   break;
    case RUNNING:  printf("Working\\n");  break;
    case PAUSED:   printf("Paused\\n");   break;
    case DONE:     printf("Finished\\n"); break;
    case CANCELED: printf("Canceled\\n"); break;
}`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-enumuse-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete the state machine switch.',
      includes: ['<stdio.h>'],
      starterCode:
`enum Light { RED, YELLOW, GREEN };
enum Light signal = GREEN;

[?] (signal) {
    [?] RED:    printf("Stop\\n");   [?];
    case YELLOW: printf("Slow\\n");   break;
    [?] GREEN:  printf("Go\\n");     break;
}`,
      blanks: ['switch', 'case', 'break', 'case'],
      hint: 'switch (variable) { case VALUE: action; break; } — switch and case are separate keywords.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-enumuse-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define enum Season {SPRING, SUMMER, FALL, WINTER}. Write a function describe(enum Season s) that prints one sentence for each season. Call it for SUMMER and WINTER.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 2
      },
      hint: 'void describe(enum Season s){ switch(s){ case SUMMER: printf("Hot\\n"); break; case WINTER: printf("Cold\\n"); break; ...}} describe(SUMMER); describe(WINTER);',
      solution:
`enum Season { SPRING, SUMMER, FALL, WINTER };
void describe(enum Season s) {
    switch (s) {
        case SPRING: printf("Warm and rainy\\n");  break;
        case SUMMER: printf("Hot and sunny\\n");   break;
        case FALL:   printf("Cool and windy\\n");  break;
        case WINTER: printf("Cold and snowy\\n");  break;
    }
}
describe(SUMMER);
describe(WINTER);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-eu-p1', type: 'predict', question: 'What does this print?',
          code: `enum S { A, B, C };\nenum S x = B;\nswitch(x){\n  case A: printf("AA\\n"); break;\n  case B: printf("BB\\n"); break;\n  case C: printf("CC\\n"); break;\n}`,
          correct: ['BB'], caseSensitive: true, orderMatters: true,
          hint: 'x=B. The switch matches case B and prints BB then breaks.',
          feedback: { correct: 'Correct — x=B matches case B: "BB".', incorrect: 'x=B. switch(B) matches case B: prints "BB" and breaks.' }
        },
        {
          id: 'ch17-eu-p2', type: 'predict', question: 'What does this print?',
          code: `enum S { ON=1, OFF=0 };\nenum S s = OFF;\nif (s) printf("On\\n"); else printf("Off\\n");`,
          correct: ['Off'], caseSensitive: true, orderMatters: true,
          hint: 'OFF=0. In C, 0 is false. So if(s) is if(0) — false — goes to else.',
          feedback: { correct: 'Correct — OFF=0, which is false in C. The else branch runs: "Off".', incorrect: 'OFF=0. In C, 0 is false. if(s) = if(0) is false, so the else branch prints "Off".' }
        },
        {
          id: 'ch17-eu-p3', type: 'predict', question: 'What does this print?',
          code: `enum D { N, E, S, W };\nenum D d = W;\nswitch(d){\n  case N: printf("N\\n"); break;\n  case E: printf("E\\n"); break;\n  default: printf("Other\\n");\n}`,
          correct: ['Other'], caseSensitive: true, orderMatters: true,
          hint: 'W is not matched by case N or case E. It falls through to default.',
          feedback: { correct: 'Correct — W is not N or E, so default prints "Other".', incorrect: 'd=W (=3). case N and case E do not match. default prints "Other".' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-eu-m1', type: 'mcq',
          question: 'What is the main advantage of using enum + switch over int + if/else chains?',
          options: ['switch runs faster than if/else', 'enum + switch is self-documenting — each case has a name, not a magic number', 'switch can handle more cases than if/else', 'enum constants use less memory than integers'],
          correct: ['enum + switch is self-documenting — each case has a name, not a magic number'],
          caseSensitive: false, orderMatters: false,
          hint: 'Compare "case 2:" to "case RUNNING:" — which one tells you what it means?',
          feedback: { correct: 'Correct — named cases (RUNNING, PAUSED) are self-documenting. "case 2:" tells you nothing.', incorrect: '"case RUNNING:" is immediately understandable. "case 2:" requires looking up what 2 means. That is the core advantage of enum + switch.' }
        },
        {
          id: 'ch17-eu-m2', type: 'mcq',
          question: 'When you switch on an enum and omit a case, what may the compiler do?',
          options: ['Crashes the program', 'Falls through silently with no behavior', 'Warns you that a case is unhandled (in -Wall mode)', 'Automatically adds a default'],
          correct: ['Warns you that a case is unhandled (in -Wall mode)'],
          caseSensitive: false, orderMatters: false,
          hint: 'This warning is one of the advantages of using enum with switch.',
          feedback: { correct: 'Correct — with warnings enabled, the compiler tells you which enum values have no case. This catches missing state handlers at compile time.', incorrect: 'With -Wall, GCC warns about unhandled enum values in a switch. This is a safety net that raw integer switches cannot provide.' }
        },
        {
          id: 'ch17-eu-m3', type: 'mcq',
          question: 'Why should you be careful about adding a "default:" case to every enum switch?',
          options: [
            'default is not valid with enum values',
            'default silences the warning about unhandled cases, removing the safety net',
            'default always causes fallthrough',
            'default runs before the named cases'
          ],
          correct: ['default silences the warning about unhandled cases, removing the safety net'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens when you add a new enum value later.',
          feedback: { correct: 'Correct — default catches all unmatched values and silences the "unhandled case" warning. If you add a new enum value, the bug hides silently.', incorrect: 'Adding default silences the compiler warning about unhandled enum values. If you add STOPPED to the enum later, the compiler won\'t remind you to handle it.' }
        },
        {
          id: 'ch17-eu-m4', type: 'mcq',
          question: 'What is a "state machine" in the context of enum + switch?',
          options: [
            'A hardware device that processes enums',
            'A variable that holds the current state, with a switch deciding behavior based on that state',
            'A function that returns different enum values each call',
            'An array of enum values representing a sequence'
          ],
          correct: ['A variable that holds the current state, with a switch deciding behavior based on that state'],
          caseSensitive: false, orderMatters: false,
          hint: 'IDLE → RUNNING → PAUSED → DONE is a sequence of states.',
          feedback: { correct: 'Correct — a state machine has a current state variable and decides what to do based on that state.', incorrect: 'A state machine: one variable holds the current state (IDLE, RUNNING, etc.); a switch handles what happens in each state. State changes drive behavior.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define enum Traffic {RED, YELLOW, GREEN}. Print "Stop", "Slow", or "Go" based on a variable set to YELLOW.',
          check: o => o.toLowerCase().includes('slow'),
          hint: 'enum Traffic light = YELLOW; switch(light){ case RED: printf("Stop\\n"); break; case YELLOW: printf("Slow\\n"); break; case GREEN: printf("Go\\n"); break; }',
          solution: `enum Traffic { RED, YELLOW, GREEN };\nenum Traffic light = YELLOW;\nswitch(light){\n  case RED:    printf("Stop\\n"); break;\n  case YELLOW: printf("Slow\\n"); break;\n  case GREEN:  printf("Go\\n");   break;\n}` },
        { id: 'p2', task: 'Define enum Grade {F=0, D, C, B, A}. Declare g=B. Print its integer value and print "Pass" if g >= C, otherwise "Fail".',
          check: o => o.includes('3') && o.toLowerCase().includes('pass'),
          hint: 'B=3 (auto-increment from F=0). if(g >= C) printf("Pass\\n"); else printf("Fail\\n");',
          solution: `enum Grade { F=0, D, C, B, A };\nenum Grade g = B;\nprintf("%d\\n", g);\nif(g >= C) printf("Pass\\n"); else printf("Fail\\n");` },
        { id: 'p3', task: 'Define enum Op {ADD, SUB, MUL}. Write compute(int a, int b, enum Op op) returning int. Test: compute(10,3,ADD), compute(10,3,SUB), compute(10,3,MUL). Print all three.',
          check: o => o.includes('13') && o.includes('7') && o.includes('30'),
          hint: 'int compute(int a, int b, enum Op op){ switch(op){ case ADD: return a+b; case SUB: return a-b; case MUL: return a*b; } return 0; }',
          solution: `enum Op { ADD, SUB, MUL };\nint compute(int a, int b, enum Op op){\n  switch(op){\n    case ADD: return a+b;\n    case SUB: return a-b;\n    case MUL: return a*b;\n  }\n  return 0;\n}\nprintf("%d\\n", compute(10,3,ADD));\nprintf("%d\\n", compute(10,3,SUB));\nprintf("%d\\n", compute(10,3,MUL));` }
      ]
      renderPracticeSet('practice-ch17-enumuse', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-enumuse-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-enumuse-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-enumuse-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This switch should print "RUNNING" but falls through to print something else. Find the missing break.',
        includes: ['<stdio.h>'],
        starterCode:
`enum State { IDLE, RUNNING, DONE };
enum State s = RUNNING;
switch (s) {
    case IDLE:    printf("IDLE\\n");
    case RUNNING: printf("RUNNING\\n");
    case DONE:    printf("DONE\\n");
}`,
        checkFn: output => output.trim() === 'RUNNING',
        hint: 'Look at what happens after "RUNNING" prints — does execution stop there?',
        hintTwo: 'Without break, execution falls through to the next case. RUNNING prints, then DONE prints too. Add "break;" after each case\'s printf to stop the fallthrough.',
        solution: `enum State { IDLE, RUNNING, DONE };\nenum State s = RUNNING;\nswitch (s) {\n    case IDLE:    printf("IDLE\\n");    break;\n    case RUNNING: printf("RUNNING\\n"); break;\n    case DONE:    printf("DONE\\n");    break;\n}`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Enums for State — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 11 — Unions — Shared Memory
     ══════════════════════════════════════════════════════════════ */
  function initTopic_union() {
    const topicId = 'ch17-union'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch17-union-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`union Data {
    int   i;
    float f;
    char  c;
};

union Data u;

u.i = 42;
printf("int: %d\\n", u.i);

u.f = 3.14;
printf("float: %.2f\\n", u.f);

/* After writing float, int is garbage */
printf("int after float write: %d (garbage)\\n", u.i);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch17-union',
      question: 'After "u.f = 3.14;", reading u.i gave garbage. Why?',
      options: [
        'The union has a bug — members should be initialized separately',
        'All union members share the same memory — writing f overwrites the bytes that i used',
        'printf used the wrong format specifier for i',
        'Floats and ints cannot share a union in C'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — union members share one block of memory. Writing to f reinterprets (overwrites) those bytes. Reading i afterwards gives whatever the float bytes look like as an integer.',
        incorrect: 'A union\'s all members occupy the same memory location. Writing f stores float bits there. Reading i interprets those same bits as an integer — which is garbage.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch17-union-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch17-union-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a char member called c to the union. Write \'Z\' to c, then print c immediately. Print sizeof the union to see the total size.',
      includes: ['<stdio.h>'],
      starterCode:
`union Num {
    int   i;
    float f;
};
union Num u;
u.i = 100;
printf("int: %d\\n", u.i);`,
      checkFn: output => output.includes('Z') && output.includes('100'),
      hint: 'Add "char c;" to the union. Then: u.c = \'Z\'; printf("char: %c\\n", u.c); printf("size: %d\\n", (int)sizeof(union Num));',
      solution:
`union Num {
    int   i;
    float f;
    char  c;
};
union Num u;
u.i = 100;
printf("int: %d\\n", u.i);
u.c = 'Z';
printf("char: %c\\n", u.c);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch17-union-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to define and use a union.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] Num {
    int   i;
    float f;
};

[?] Num n;
n[?]i = 55;
printf("%d\\n", n[?]i);`,
      blanks: ['union', 'union', '.', '.'],
      hint: 'Union syntax mirrors struct: union keyword, variable declaration, and dot access for members.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch17-union-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define union Val with int i and float f. Write 100 to i and print it. Then write 9.5 to f and print it. Show that only one member should be read at a time.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('100') && output.includes('9.5'),
      hint: 'union Val u; u.i=100; printf("%d\\n", u.i); u.f=9.5f; printf("%.1f\\n", u.f);',
      solution:
`union Val { int i; float f; };
union Val u;
u.i = 100;
printf("%d\\n", u.i);
u.f = 9.5f;
printf("%.1f\\n", u.f);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch17-un-p1', type: 'predict', question: 'What does this print?',
          code: `union U { int i; char c; };\nunion U u;\nu.i = 65;\nprintf("%d\\n", u.i);`,
          correct: ['65'], caseSensitive: true, orderMatters: true,
          hint: 'u.i was written last and is being read — this is valid.',
          feedback: { correct: 'Correct — u.i was written and then read immediately — valid usage. 65.', incorrect: 'u.i = 65 then reading u.i is valid (same member). 65.' }
        },
        {
          id: 'ch17-un-p2', type: 'predict', question: 'What does this print?',
          code: `union U { int i; float f; };\nunion U u;\nu.f = 1.0;\nprintf("%.1f\\n", u.f);`,
          correct: ['1.0'], caseSensitive: true, orderMatters: true,
          hint: 'u.f was written and is immediately read — the correct member.',
          feedback: { correct: 'Correct — reading the same member just written is valid. 1.0.', incorrect: 'u.f = 1.0f then printf u.f — reading the same member just written. Output: 1.0.' }
        },
        {
          id: 'ch17-un-p3', type: 'predict', question: 'What is sizeof(union Data) if int=4, float=4, char=1?',
          code: `union Data { int i; float f; char c; };\nprintf("%d\\n", (int)sizeof(union Data));`,
          correct: ['4'], caseSensitive: true, orderMatters: true,
          hint: 'A union is as large as its largest member.',
          feedback: { correct: 'Correct — sizeof(union) = size of the largest member = 4 (int or float).', incorrect: 'A union is sized to fit its largest member. int=4, float=4, char=1. Largest is 4.' }
        }
      ]
      const mcqQ = [
        {
          id: 'ch17-un-m1', type: 'mcq',
          question: 'How much memory does a union with int (4 bytes) and char (1 byte) use?',
          options: ['5 bytes', '1 byte', '4 bytes', '2 bytes'],
          correct: ['4 bytes'],
          caseSensitive: false, orderMatters: false,
          hint: 'A union is only as large as it needs to be — which is the largest member.',
          feedback: { correct: 'Correct — a union is sized to fit the largest member. int=4 bytes wins.', incorrect: 'A union uses space for its largest member only. int(4) > char(1), so sizeof = 4.' }
        },
        {
          id: 'ch17-un-m2', type: 'mcq',
          question: 'How is a union different from a struct?',
          options: [
            'A union has no members — only methods',
            'A union gives all members the same memory location — only one is valid at a time',
            'A union members are automatically initialized to zero',
            'A union cannot be passed to functions'
          ],
          correct: ['A union gives all members the same memory location — only one is valid at a time'],
          caseSensitive: false, orderMatters: false,
          hint: 'A struct stores all members; a union stores only one.',
          feedback: { correct: 'Correct — struct members each have their own location; union members share one location. Only the last written member is valid.', incorrect: 'Key difference: struct members have separate memory; union members share the same memory location. Writing one member overwrites the others.' }
        },
        {
          id: 'ch17-un-m3', type: 'mcq',
          question: 'What is a "tagged union" in C?',
          options: [
            'A union with member names that start with tags',
            'A union paired with an enum that tracks which member is currently valid',
            'A union that uses typedef',
            'A union inside a struct array'
          ],
          correct: ['A union paired with an enum that tracks which member is currently valid'],
          caseSensitive: false, orderMatters: false,
          hint: 'The tag is the enum that says "right now, this union holds an int."',
          feedback: { correct: 'Correct — a tagged union: a struct containing a union AND an enum tag that records which member was last written.', incorrect: 'Tagged union = union + enum tag. The enum records "currently an int" or "currently a float" so you always know which member is valid.' }
        },
        {
          id: 'ch17-un-m4', type: 'mcq',
          question: 'Which situation is a valid and safe use of a union?',
          options: [
            'Write u.i then immediately read u.f',
            'Write u.f then read u.i to see the integer representation',
            'Write u.i then immediately read u.i',
            'Read all members without writing first'
          ],
          correct: ['Write u.i then immediately read u.i'],
          caseSensitive: false, orderMatters: false,
          hint: 'Read the same member you just wrote.',
          feedback: { correct: 'Correct — write and read the same member. Reading a different member after writing one is undefined behavior in C.', incorrect: 'Only reading the same member you just wrote is safe. Reading a different member (u.f after writing u.i) gives undefined behavior — the bytes are reinterpreted.' }
        }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Define union Num {int i; float f;}. Write 42 to i and print it. Write 3.14 to f and print it. One at a time — never both.',
          check: o => o.includes('42') && o.includes('3.14'),
          hint: 'union Num u; u.i=42; printf("%d\\n", u.i); u.f=3.14f; printf("%.2f\\n", u.f);',
          solution: `union Num { int i; float f; };\nunion Num u;\nu.i = 42;\nprintf("%d\\n", u.i);\nu.f = 3.14f;\nprintf("%.2f\\n", u.f);` },
        { id: 'p2', task: 'Define union Mix {int n; char c;}. Print sizeof the union. Then write \'A\' to c and print it as both a char (%c) and as an integer (%d).',
          check: o => o.includes('A') && o.includes('65'),
          hint: 'sizeof(union Mix)=4. u.c=\'A\'; printf("%c %d\\n", u.c, u.c); \'A\'=65 in ASCII.',
          solution: `union Mix { int n; char c; };\nunion Mix u;\nprintf("%d\\n", (int)sizeof(union Mix));\nu.c = 'A';\nprintf("%c %d\\n", u.c, u.c);` },
        { id: 'p3', task: 'Make a tagged union: typedef struct {int type; union {int i; float f;} data;} Value. type=0 means int, type=1 means float. Create a Value with int 99 (type=0) and print it.',
          check: o => o.trim().includes('99'),
          hint: 'typedef struct { int type; union { int i; float f; } data; } Value; Value v; v.type=0; v.data.i=99; if(v.type==0) printf("%d\\n", v.data.i);',
          solution: `typedef struct { int type; union { int i; float f; } data; } Value;\nValue v;\nv.type = 0;\nv.data.i = 99;\nif (v.type == 0) printf("%d\\n", v.data.i);` }
      ]
      renderPracticeSet('practice-ch17-union', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch17-union-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch17-union-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch17-union-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This program should print 42 but reads the wrong member. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`union U { int i; float f; };
union U u;
u.i = 42;
printf("%d\\n", u.f);`,
        checkFn: output => output.trim() === '42',
        hint: 'Look at the format specifier and the member being read in the printf.',
        hintTwo: 'u.i = 42 writes an int, but printf reads u.f (float) with %d. Reading the wrong member is undefined behavior. Fix: change u.f to u.i in the printf.',
        solution: `union U { int i; float f; };\nunion U u;\nu.i = 42;\nprintf("%d\\n", u.i);`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Unions — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch17-mastery'), {
      mode: 'build',
      topicId: 'ch17-mastery',
      chapterId: CH,
      question:
`Build a student record system combining ALL Chapter 17 concepts:
1. typedef struct Student with int id, float gpa
2. enum Grade { FAIL=0, PASS, HONORS } where FAIL < 2.0, PASS 2.0-3.4, HONORS >= 3.5
3. function getGrade(float gpa) returning enum Grade
4. Array of 3 students: {101, 3.8}, {102, 2.3}, {103, 1.5}
5. Loop printing each student: id, gpa, grade name
6. Print the highest GPA

Expected output includes: IDs 101/102/103, values 3.8/2.3/1.5, grade names (HONORS/PASS/FAIL), and highest GPA.`,
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const o = output.toLowerCase()
        return output.includes('101') && output.includes('102') && output.includes('103') &&
               output.includes('3.8') && output.includes('2.3') && output.includes('1.5') &&
               (o.includes('honors') || o.includes('HONORS')) &&
               (o.includes('fail') || o.includes('FAIL'))
      },
      hint:
`typedef struct { int id; float gpa; } Student;
enum Grade { FAIL, PASS, HONORS };
enum Grade getGrade(float g) {
    if (g >= 3.5) return HONORS;
    if (g >= 2.0) return PASS;
    return FAIL;
}
Student s[3] = {{101,3.8f},{102,2.3f},{103,1.5f}};
for loop: print id, gpa, and the grade name based on getGrade(s[i].gpa)`,
      solution:
`typedef struct { int id; float gpa; } Student;

enum Grade { FAIL=0, PASS, HONORS };

enum Grade getGrade(float gpa) {
    if (gpa >= 3.5f) return HONORS;
    if (gpa >= 2.0f) return PASS;
    return FAIL;
}

Student s[3] = {{101, 3.8f}, {102, 2.3f}, {103, 1.5f}};
int i;
float maxGpa = s[0].gpa;

for (i = 0; i < 3; i++) {
    enum Grade g = getGrade(s[i].gpa);
    const char *name;
    if      (g == HONORS) name = "HONORS";
    else if (g == PASS)   name = "PASS";
    else                  name = "FAIL";

    printf("ID:%d GPA:%.1f Grade:%s\\n", s[i].id, s[i].gpa, name);
    if (s[i].gpa > maxGpa) maxGpa = s[i].gpa;
}
printf("Highest GPA: %.1f\\n", maxGpa);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch17-chapter-complete').style.display = 'block'
        $('ch17-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch17-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch18')
    })
  }

  /* ══════════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════════ */
  function init() {
    initTopic_struct()
    initTopic_declare()
    initTopic_access()
    initTopic_nested()
    initTopic_array()
    initTopic_ptr()
    initTopic_fn()
    initTopic_typedef()
    initTopic_enum()
    initTopic_enumuse()
    initTopic_union()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
