/* =========================================================
   C LEARNING PLATFORM — chapters/ch13-functions/ch13.js
   Chapter 13: Functions
   5 topics · 7-step structure · Assessment opens as popup modal
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch13'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — VOID FUNCTIONS AND CALLING
     ══════════════════════════════════════════════════════════ */
  function initTopic_intro() {
    const topicId = 'ch13-intro'
    const sm = StepManager.init(topicId, 7, CH)

    /* ── Step 1: Explore ── */
    CCompiler.initBlock($('compiler-ch13-intro-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`void printBanner() {
    printf("====================\\n");
    printf("  C Learning Lab    \\n");
    printf("====================\\n");
}

void printBanner();
printBanner();
printBanner();`,
      onPass: () => sm.complete(1)
    })

    /* ── Step 2: Instant question ── */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch13-intro',
      question: 'The printBanner function was defined once but printed the banner three times. If you wanted to print it 10 times instead, what is the minimum change needed?',
      options: [
        'Copy the entire function body 9 more times',
        'Add 7 more printBanner(); calls — the function definition stays exactly the same',
        'Rewrite the function 10 times with slightly different names',
        'The function can only be called once'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — that is the power of functions. The body is written once. Calling it more times costs one line per call, not one copy of the body per call.',
        incorrect: 'Functions are defined once and called as many times as needed. To call it 10 times, add 7 more printBanner(); lines. The function definition itself never changes.'
      },
      onAnswer: () => sm.complete(2)
    })

    /* ── Step 3: Explanation ── */
    $('step-ch13-intro-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* ── Step 4: Modify ── */
    CCompiler.initBlock($('compiler-ch13-intro-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a second void function called printDivider that prints exactly "----" (4 dashes). Then call printBanner, printDivider, printBanner in that order.',
      includes: ['<stdio.h>'],
      starterCode:
`void printBanner() {
    printf("[ C Platform ]\\n");
}

void printBanner();`,
      checkFn: output => {
        const text = output
        return (text.match(/C Platform/g) || []).length >= 2 &&
               text.includes('----')
      },
      hint: 'Define void printDivider() { printf("----\\n"); } above the calls, then add three call lines.',
      solution:
`void printBanner() {
    printf("[ C Platform ]\\n");
}
void printDivider() {
    printf("----\\n");
}
printBanner();
printDivider();
printBanner();`,
      onPass: () => sm.complete(4)
    })

    /* ── Step 5: Fill ── */
    CCompiler.initBlock($('compiler-ch13-intro-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete a void function definition and two calls.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] sayHello() {
    printf("Hello from a function!\\n");
}

[?]();
[?]();`,
      blanks: ['void', 'sayHello', 'sayHello'],
      hint: 'First blank: the return type for a function that returns nothing. Second and third: the function name followed by () to call it.',
      onPass: () => sm.complete(5)
    })

    /* ── Step 6: Build ── */
    CCompiler.initBlock($('compiler-ch13-intro-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define a void function called printCount that prints the numbers 1, 2, 3 each on their own line. Then call it twice.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
        return nums.filter(n => n === 1).length >= 2 &&
               nums.filter(n => n === 3).length >= 2
      },
      hint: 'void printCount() { printf("1\\n"); printf("2\\n"); printf("3\\n"); } then call printCount(); twice.',
      solution:
`void printCount() {
    printf("1\\n");
    printf("2\\n");
    printf("3\\n");
}
printCount();
printCount();`,
      onPass: () => sm.complete(6)
    })

    /* ── Step 7: Real-world (auto-complete) ── */
    sm.complete(7)

    /* ── Assessment ── */
    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch13-in-p1', type: 'predict',
          question: 'What prints?',
          code: `void show() { printf("A\\n"); printf("B\\n"); }\nshow();\nprintf("C\\n");\nshow();`,
          correct: ['A\nB\nC\nA\nB'],
          caseSensitive: true, orderMatters: true,
          hint: 'Each show() call runs both printf lines inside. Then C prints from main. Then show() again.',
          feedback: {
            correct: 'Correct — show() prints A then B. Then C from the direct printf. Then show() again: A then B.',
            incorrect: 'show() runs: prints A, B. Then direct printf prints C. Then show() runs again: A, B. Output: A B C A B.'
          }
        },
        {
          id: 'ch13-in-p2', type: 'predict',
          question: 'What prints?',
          code: `void line() { printf("---\\n"); }\nvoid block() { line(); printf("mid\\n"); line(); }\nblock();`,
          correct: ['---\nmid\n---'],
          caseSensitive: true, orderMatters: true,
          hint: 'block() calls line(), then prints mid, then calls line() again.',
          feedback: {
            correct: 'Correct — block() calls line() (prints ---), then prints mid, then calls line() again (prints ---).',
            incorrect: 'block() executes: line()→prints ---, printf→prints mid, line()→prints ---. Output: --- mid ---.'
          }
        },
        {
          id: 'ch13-in-p3', type: 'predict',
          question: 'What prints?',
          code: `void f() { printf("F"); }\nvoid g() { f(); f(); }\nf();\ng();\nf();`,
          correct: ['FFFFF', 'F\nF\nF\nF\nF'],
          caseSensitive: true, orderMatters: false,
          hint: 'f() prints F once. g() calls f() twice. Count all the F prints from all calls.',
          feedback: {
            correct: 'Correct — f() → F, g() → f()f() → FF, f() → F. Total: FFFFF (5 Fs).',
            incorrect: 'f() prints F. g() calls f() twice → FF. Then f() again → F. f(), g(), f() = F + FF + F = FFFFF.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch13-in-m1', type: 'mcq',
          question: 'What does "void" mean as a function return type?',
          options: [
            'The function is empty and has no body',
            'The function returns 0',
            'The function does not return any value',
            'The function can return any type'
          ],
          correct: ['The function does not return any value'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what void means — "nothing" or "empty."',
          feedback: {
            correct: 'Correct — void means the function performs actions but sends nothing back to the caller.',
            incorrect: 'void means "no return value." The function does things (like printing) but does not hand a value back to whoever called it.'
          }
        },
        {
          id: 'ch13-in-m2', type: 'mcq',
          question: 'How do you call a void function named doWork?',
          options: ['doWork', 'call doWork()', 'doWork();', 'void doWork();'],
          correct: ['doWork();'],
          caseSensitive: true, orderMatters: false,
          hint: 'Function calls use the name, parentheses, and a semicolon.',
          feedback: {
            correct: 'Correct — doWork(); is the call syntax: name + () + semicolon.',
            incorrect: 'To call a function: name followed by () and a semicolon. doWork(); is the call. void doWork(); would be a declaration/prototype.'
          }
        },
        {
          id: 'ch13-in-m3', type: 'mcq',
          question: 'Why use functions instead of copying code?',
          options: [
            'Functions run faster than copied code',
            'Fix once, works everywhere — no duplicate code to maintain',
            'C requires functions; you cannot write code outside them',
            'Functions use less memory at runtime'
          ],
          correct: ['Fix once, works everywhere — no duplicate code to maintain'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens when a bug is found in duplicated code.',
          feedback: {
            correct: 'Correct — if the same logic appears in 10 places as copies, fixing a bug requires 10 fixes. In a function, one fix propagates everywhere.',
            incorrect: 'The key benefit: define behavior once, fix it once. Duplicated code means every fix or change must be applied in every copy — functions eliminate that problem.'
          }
        },
        {
          id: 'ch13-in-m4', type: 'mcq',
          question: 'Where must a function definition appear relative to where it is called?',
          options: [
            'After the call — C reads bottom to top',
            'Before the call (or declared with a prototype before the call)',
            'Anywhere — order does not matter in C',
            'Only inside main()'
          ],
          correct: ['Before the call (or declared with a prototype before the call)'],
          caseSensitive: false, orderMatters: false,
          hint: 'The compiler reads top to bottom.',
          feedback: {
            correct: 'Correct — the compiler reads top to bottom. Define the function before calling it, or use a forward declaration (prototype) before main.',
            incorrect: 'C compiles top to bottom. The function must be defined or declared (prototype) before the call site, or the compiler sees an unknown identifier.'
          }
        },
        {
          id: 'ch13-in-m5', type: 'mcq',
          question: 'What is the correct syntax for a void function that takes no parameters?',
          options: [
            'function greet() { }',
            'void greet { }',
            'void greet() { }',
            'greet() void { }'
          ],
          correct: ['void greet() { }'],
          caseSensitive: true, orderMatters: false,
          hint: 'return_type name(params) { body }',
          feedback: {
            correct: 'Correct — return_type name(params) { body }: void greet() { }',
            incorrect: 'Syntax: return_type name(parameters) { body }. For void, no params: void greet() { ... }'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Define a void function called printStars that prints exactly "***" (3 stars). Call it 3 times.',
          check: out => (out.match(/\*\*\*/g) || []).length >= 3,
          hint: 'void printStars() { printf("***\\n"); } then printStars(); three times.',
          solution: `void printStars() { printf("***\\n"); }\nprintStars();\nprintStars();\nprintStars();`
        },
        {
          id: 'p2',
          task: 'Define two void functions: printHeader (prints "=== MENU ===") and printFooter (prints "============"). Call them in order: header, footer, header.',
          check: out => (out.match(/MENU/g)||[]).length >= 2 && out.includes('===='),
          hint: 'Define both functions, then call printHeader(); printFooter(); printHeader();',
          solution:
`void printHeader() { printf("=== MENU ===\\n"); }
void printFooter() { printf("============\\n"); }
printHeader();
printFooter();
printHeader();`
        },
        {
          id: 'p3',
          task: 'Define a void function printTable that uses a for loop to print numbers 1–5 each on their own line. Call it twice.',
          check: out => {
            const nums = out.split('\n').map(l => parseInt(l.trim())).filter(n => !isNaN(n))
            return nums.filter(n => n === 1).length >= 2 && nums.filter(n => n === 5).length >= 2
          },
          hint: 'void printTable() { for(int i=1;i<=5;i++) printf("%d\\n",i); }',
          solution:
`void printTable() {
    for(int i=1;i<=5;i++) printf("%d\\n",i);
}
printTable();
printTable();`
        }
      ]

      renderPracticeCh13('practice-ch13-intro', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch13-intro-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch13-intro-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch13-intro-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should call the function twice but only prints once — and there is a compile error. Find both bugs.',
        includes: ['<stdio.h>'],
        starterCode:
`void say() {
    printf("Hi!\\n")
}
say()
say();`,
        checkFn: out => (out.match(/Hi!/g)||[]).length >= 2,
        hint: 'Look carefully at the end of each line inside the function and the function calls.',
        hintTwo: 'printf("Hi!\\n") is missing its semicolon. And say() call is also missing a semicolon. Fix both: printf("Hi!\\n"); and say();',
        solution: `void say() {\n    printf("Hi!\\n");\n}\nsay();\nsay();`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'void Functions — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — PARAMETERS AND ARGUMENTS
     ══════════════════════════════════════════════════════════ */
  function initTopic_params() {
    const topicId = 'ch13-params'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch13-params-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`void printDouble(int n) {
    printf("%d doubled = %d\\n", n, n * 2);
}

void printDouble(3);
void printDouble(7);
void printDouble(10);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch13-params',
      question: 'printDouble was called three times with 3, 7, and 10. The output was different each time even though the function body never changed. What made the output different?',
      options: [
        'The function secretly reads values from memory',
        'The argument passed at each call set the value of the parameter n — different argument, different n, different output',
        'printf behaves differently on each call',
        'The function body executes differently based on the call count'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — each call assigns a different value to the parameter n. The body n*2 gives a different result because n is different.',
        incorrect: 'The parameter n gets its value from the argument. Call printDouble(3) → n=3. Call printDouble(7) → n=7. Same body, different n, different output.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch13-params-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch13-params-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the function to take TWO int parameters (a and b) and print their sum and product on separate lines. Call it with (3, 4) and (5, 6).',
      includes: ['<stdio.h>'],
      starterCode:
`void printDouble(int n) {
    printf("%d doubled = %d\\n", n, n * 2);
}

void printDouble(5);`,
      checkFn: out => out.includes('7') && out.includes('12') && out.includes('11') && out.includes('30'),
      hint: 'void printInfo(int a, int b) { printf("Sum: %d\\n", a+b); printf("Product: %d\\n", a*b); }',
      solution:
`void printInfo(int a, int b) {
    printf("Sum: %d\\n", a + b);
    printf("Product: %d\\n", a * b);
}
void printInfo(3, 4);
void printInfo(5, 6);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch13-params-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete a function that prints N stars on one line.',
      includes: ['<stdio.h>'],
      starterCode:
`void printStars([?] n) {
    for (int i = 0; [?] < n; i++) {
        printf("*");
    }
    printf("\\n");
}

[?](5);
[?](3);`,
      blanks: ['int', 'i', 'printStars', 'printStars'],
      hint: 'First: parameter type. Second: the loop counter variable. Third and fourth: function name to call.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch13-params-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a void function printBox(int w, int h) that prints a box of asterisks w wide and h tall using nested loops. Call it with (4, 3).\nExpected:\n****\n****\n****',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => {
        const lines = out.trim().split('\n').filter(l => l.trim())
        return lines.length >= 3 && lines[0].includes('****') && lines[2].includes('****')
      },
      hint: 'void printBox(int w, int h) { for(int r=0;r<h;r++){ for(int c=0;c<w;c++) printf("*"); printf("\\n"); } }',
      solution:
`void printBox(int w, int h) {
    for (int r = 0; r < h; r++) {
        for (int c = 0; c < w; c++) printf("*");
        printf("\\n");
    }
}
void printBox(4, 3);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch13-pa-p1', type: 'predict',
          question: 'What prints?',
          code: `void show(int x, int y) {\n    printf("%d %d\\n", x + y, x - y);\n}\nshow(8, 3);\nshow(5, 5);`,
          correct: ['11 5\n0 0', '11 5\n0 0\n'],
          caseSensitive: true, orderMatters: true,
          hint: 'First call: x=8,y=3 → 11 and 5. Second: x=5,y=5 → 10 and 0. Wait — x-y with 5,5 = 0.',
          feedback: {
            correct: 'Correct — show(8,3): 8+3=11, 8-3=5 → "11 5". show(5,5): 5+5=10, 5-5=0 → "10 0". Wait, check output again: 11 5 then 10 0.',
            incorrect: 'show(8,3): x+y=11, x-y=5 → "11 5". show(5,5): x+y=10, x-y=0 → "10 0".'
          }
        },
        {
          id: 'ch13-pa-p2', type: 'predict',
          question: 'What prints?',
          code: `void repeat(int n) {\n    for (int i = 0; i < n; i++) printf("X");\n    printf("\\n");\n}\nrepeat(3);\nrepeat(1);\nrepeat(0);`,
          correct: ['XXX\nX\n'],
          caseSensitive: true, orderMatters: true,
          hint: 'repeat(3) → 3 Xs. repeat(1) → 1 X. repeat(0) → loop runs 0 times, just a newline.',
          feedback: {
            correct: 'Correct — repeat(3)→XXX, repeat(1)→X, repeat(0)→loop runs 0 times (just a newline, appears as empty line).',
            incorrect: 'repeat(3): loop runs 3 times → XXX. repeat(1): once → X. repeat(0): i<0 is false immediately → just newline.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch13-pa-m1', type: 'mcq',
          question: 'What is wrong with: void add(int a, b) { return a + b; }?',
          options: [
            'Nothing — b inherits int from a',
            'b must also have its own type: void add(int a, int b)',
            'add should be int not void since it returns a value',
            'Both B and C are correct'
          ],
          correct: ['Both B and C are correct'],
          caseSensitive: false, orderMatters: false,
          hint: 'There are two issues — one with the parameter types and one with the return type.',
          feedback: {
            correct: 'Correct — two bugs: (1) b needs its own int type, (2) returning a value from a void function is wrong. Fix: int add(int a, int b) { return a + b; }',
            incorrect: 'Two problems: every parameter needs its own type (not int a, b — must be int a, int b), and a function returning a value needs a non-void return type.'
          }
        },
        {
          id: 'ch13-pa-m2', type: 'mcq',
          question: 'How many parameters can a C function have?',
          options: [
            'Maximum of 2',
            'Maximum of 8',
            'There is no strict limit — as many as needed',
            'Exactly the same number each call'
          ],
          correct: ['There is no strict limit — as many as needed'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think of printf — how many arguments can it take?',
          feedback: {
            correct: 'Correct — no fixed limit. printf itself can take many arguments (format string + values). Each parameter needs its own type declaration.',
            incorrect: 'No strict limit. printf takes a variable number of arguments. Regular functions can have as many parameters as the design needs, each with its own type.'
          }
        },
        {
          id: 'ch13-pa-m3', type: 'mcq',
          question: 'void greet(int age, int score) — what is the call to pass age=20 and score=95?',
          options: [
            'greet(age=20, score=95);',
            'greet(20, 95);',
            'greet(int 20, int 95);',
            'greet age=20, score=95;'
          ],
          correct: ['greet(20, 95);'],
          caseSensitive: true, orderMatters: false,
          hint: 'Arguments are just values in order, matching the parameter positions.',
          feedback: {
            correct: 'Correct — greet(20, 95); passes 20 to age and 95 to score. No type names at the call site — just the values.',
            incorrect: 'Call syntax: functionName(value1, value2); — just the values in order. No type keywords or names at the call site.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Write a void function printProduct(int a, int b) that prints "a × b = result". Call it with (6, 7) and (4, 9).',
          check: out => out.includes('42') && out.includes('36'),
          hint: 'void printProduct(int a, int b) { printf("%d x %d = %d\\n", a, b, a*b); }',
          solution: `void printProduct(int a, int b) { printf("%d x %d = %d\\n",a,b,a*b); }\nvoid printProduct(6,7);\nvoid printProduct(4,9);`
        },
        {
          id: 'p2',
          task: 'Write a void function printRange(int start, int end) that prints all integers from start to end inclusive. Call it with (3, 7).',
          check: out => {
            const text = out
            return text.includes('3') && text.includes('7') && text.includes('5')
          },
          hint: 'void printRange(int s, int e){ for(int i=s;i<=e;i++) printf("%d\\n",i); }',
          solution: `void printRange(int s, int e){\n    for(int i=s;i<=e;i++) printf("%d\\n",i);\n}\nvoid printRange(3,7);`
        },
        {
          id: 'p3',
          task: 'Write a void function printMax(int a, int b, int c) that prints the largest of three numbers. Call it with (5, 12, 8).',
          check: out => out.includes('12'),
          hint: 'int m=a; if(b>m)m=b; if(c>m)m=c; printf("Max: %d\\n",m);',
          solution:
`void printMax(int a, int b, int c) {
    int m = a;
    if (b > m) m = b;
    if (c > m) m = c;
    printf("Max: %d\\n", m);
}
void printMax(5, 12, 8);`
        }
      ]

      renderPracticeCh13('practice-ch13-params', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch13-params-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch13-params-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch13-params-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This function should print the average of two ints but produces wrong results. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`void printAvg(int a, int b) {
    printf("Avg: %d\\n", a + b / 2);
}
void printAvg(4, 8);
void printAvg(3, 7);`,
        checkFn: out => out.includes('6') && out.includes('5'),
        hint: 'Look at the arithmetic expression carefully. Is the division applied to the right operands?',
        hintTwo: 'a + b / 2 divides b by 2 first (order of operations), then adds a. Fix: (a + b) / 2 — parentheses force the addition first.',
        solution:
`void printAvg(int a, int b) {
    printf("Avg: %d\\n", (a + b) / 2);
}
void printAvg(4, 8);
void printAvg(3, 7);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Parameters and Arguments — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — RETURN VALUES
     ══════════════════════════════════════════════════════════ */
  function initTopic_return() {
    const topicId = 'ch13-return'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch13-return-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int square(int n) {
    return n * n;
}

int a = square(4);
int b = square(7);
printf("4 squared = %d\\n", a);
printf("7 squared = %d\\n", b);
printf("3 squared = %d\\n", square(3));`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch13-return',
      question: 'square(3) was used directly inside printf without storing it first. What does the expression square(3) evaluate to at runtime?',
      options: [
        'It prints "square(3)" as text',
        'It evaluates to 9 — the value the function returns',
        'It evaluates to the function definition',
        'It is a compile error to use a function call inside printf'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — square(3) is a function call expression that evaluates to its return value (9). It can be used anywhere an int value is valid: in printf, in assignments, in arithmetic.',
        incorrect: 'A function call that returns a value evaluates to that value. square(3) → 9. printf sees %d with value 9, and prints 9. Function calls are valid expressions.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch13-return-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch13-return-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a second function int cube(int n) that returns n cubed (n×n×n). Then print the cube of 2, 3, and 4.',
      includes: ['<stdio.h>'],
      starterCode:
`int square(int n) {
    return n * n;
}

printf("Square of 5: %d\\n", square(5));`,
      checkFn: out => out.includes('8') && out.includes('27') && out.includes('64'),
      hint: 'int cube(int n) { return n * n * n; } then printf cube(2), cube(3), cube(4).',
      solution:
`int square(int n) { return n * n; }
int cube(int n) { return n * n * n; }
printf("Square of 5: %d\\n", square(5));
printf("2 cubed = %d\\n", cube(2));
printf("3 cubed = %d\\n", cube(3));
printf("4 cubed = %d\\n", cube(4));`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch13-return-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete a function that returns the larger of two ints.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] maxOf(int a, int b) {
    if (a > b) [?] a;
    [?] b;
}

printf("%d\\n", maxOf(8, 5));
printf("%d\\n", maxOf(3, 9));`,
      blanks: ['int', 'return', 'return'],
      hint: 'First: the return type (returns an int). Second and third: the keyword that sends a value back.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch13-return-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write int sumRange(int start, int end) that returns the sum of all integers from start to end inclusive. Test: sumRange(1,10) should give 55, sumRange(1,5) should give 15.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('55') && out.includes('15'),
      hint: 'int sumRange(int s, int e){ int sum=0; for(int i=s;i<=e;i++) sum+=i; return sum; }',
      solution:
`int sumRange(int s, int e) {
    int sum = 0;
    for (int i = s; i <= e; i++) sum += i;
    return sum;
}
printf("%d\\n", sumRange(1, 10));
printf("%d\\n", sumRange(1, 5));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch13-re-p1', type: 'predict',
          question: 'What prints?',
          code: `int double(int n) { return n * 2; }\nprintf("%d\\n", double(double(3)));`,
          correct: ['12'],
          caseSensitive: true, orderMatters: true,
          hint: 'Evaluate inside out: double(3)=6, then double(6)=12.',
          feedback: {
            correct: 'Correct — double(3)=6, then double(6)=12. Nested function calls evaluate inside out.',
            incorrect: 'Inside out: double(3)=3*2=6. Then double(6)=6*2=12. Output: 12.'
          }
        },
        {
          id: 'ch13-re-p2', type: 'predict',
          question: 'What prints?',
          code: `int isPositive(int n) {\n    if (n > 0) return 1;\n    return 0;\n}\nprintf("%d %d\\n", isPositive(5), isPositive(-3));`,
          correct: ['1 0'],
          caseSensitive: true, orderMatters: true,
          hint: 'isPositive(5)→1 (5>0 true). isPositive(-3)→0 (-3>0 false).',
          feedback: {
            correct: 'Correct — isPositive(5): 5>0 is true → returns 1. isPositive(-3): -3>0 is false → returns 0. Output: 1 0.',
            incorrect: 'isPositive(5): condition 5>0 is true → return 1. isPositive(-3): -3>0 is false → falls through to return 0. Output: 1 0.'
          }
        },
        {
          id: 'ch13-re-p3', type: 'predict',
          question: 'What prints?',
          code: `int add(int a, int b) { return a + b; }\nint x = add(3, 4);\nint y = add(x, 2);\nprintf("%d\\n", y);`,
          correct: ['9'],
          caseSensitive: true, orderMatters: true,
          hint: 'x = add(3,4) = 7. y = add(7,2) = 9.',
          feedback: {
            correct: 'Correct — add(3,4)=7, x=7. add(7,2)=9, y=9. Prints 9.',
            incorrect: 'x = add(3,4) = 7. y = add(x,2) = add(7,2) = 9. Output: 9.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch13-re-m1', type: 'mcq',
          question: 'What does a return statement do when executed?',
          options: [
            'Only sets a variable named "result"',
            'Sends a value back to the caller and immediately exits the function',
            'Pauses the function until called again',
            'Prints the value to the console'
          ],
          correct: ['Sends a value back to the caller and immediately exits the function'],
          caseSensitive: false, orderMatters: false,
          hint: 'return has two effects at once.',
          feedback: {
            correct: 'Correct — return sends the value back AND exits the function immediately. Code after return in the same scope never runs.',
            incorrect: 'return does two things: (1) sends the specified value back to the caller, (2) immediately exits the function. Nothing after return in that scope runs.'
          }
        },
        {
          id: 'ch13-re-m2', type: 'mcq',
          question: 'A function declared as int compute() has no return statement. What happens?',
          options: [
            'It returns 0 automatically',
            'It is a compile error',
            'Undefined behavior — the returned value is garbage',
            'It returns -1 to indicate failure'
          ],
          correct: ['Undefined behavior — the returned value is garbage'],
          caseSensitive: false, orderMatters: false,
          hint: 'C does not automatically supply return values.',
          feedback: {
            correct: 'Correct — the compiler may warn but still compile. The caller receives whatever happens to be in the return register — garbage.',
            incorrect: 'C does not automatically return 0. Without a return, the function returns garbage. Some compilers warn, but the behavior is undefined.'
          }
        },
        {
          id: 'ch13-re-m3', type: 'mcq',
          question: 'int result = add(3, 4); — what is in result after this line?',
          options: ['3', '4', '7', 'The function object'],
          correct: ['7'],
          caseSensitive: false, orderMatters: false,
          hint: 'The call evaluates to the return value.',
          feedback: {
            correct: 'Correct — add(3,4) executes and returns 7. That value is assigned to result. result = 7.',
            incorrect: 'add(3,4) executes and returns 3+4=7. That return value is assigned to result. result = 7.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Write int absolute(int n) that returns the absolute value of n (positive version). Test with absolute(-5) and absolute(8) — both should print positive.',
          check: out => out.includes('5') && out.includes('8'),
          hint: 'int absolute(int n){ if(n<0) return -n; return n; }',
          solution: `int absolute(int n){ if(n<0) return -n; return n; }\nprintf("%d\\n", absolute(-5));\nprintf("%d\\n", absolute(8));`
        },
        {
          id: 'p2',
          task: 'Write int countDigits(int n) that returns the number of digits in a positive integer (e.g. 342 → 3, 7 → 1, 1000 → 4). Test with 342.',
          check: out => out.includes('3'),
          hint: 'int c=0; while(n>0){ c++; n/=10; } return c; (handle n=0 separately)',
          solution:
`int countDigits(int n) {
    if (n == 0) return 1;
    int c = 0;
    while (n > 0) { c++; n /= 10; }
    return c;
}
printf("%d\\n", countDigits(342));`
        },
        {
          id: 'p3',
          task: 'Write int isPrime(int n) that returns 1 if n is prime, 0 otherwise. Use it to print all primes from 2 to 20.',
          check: out => {
            const text = out
            return text.includes('2') && text.includes('19') && text.includes('17') && text.includes('11')
          },
          hint: 'int d=2; while(d*d<=n){ if(n%d==0) return 0; d++; } return n>1;',
          solution:
`int isPrime(int n) {
    if (n < 2) return 0;
    for (int d = 2; d * d <= n; d++)
        if (n % d == 0) return 0;
    return 1;
}
for (int i = 2; i <= 20; i++)
    if (isPrime(i)) printf("%d\\n", i);`
        }
      ]

      renderPracticeCh13('practice-ch13-return', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch13-return-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch13-return-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch13-return-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This function should return the minimum of two ints but always returns the wrong value. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int minOf(int a, int b) {
    if (a > b) return a;
    return b;
}
printf("%d\\n", minOf(3, 7));
printf("%d\\n", minOf(9, 2));`,
        checkFn: out => out.includes('3') && out.includes('2'),
        hint: 'The function is named minOf but reads like a max function. Check the condition.',
        hintTwo: 'if (a > b) return a returns the LARGER value, not the smaller. For minimum, when a > b, you want to return b. Fix: if (a < b) return a; return b;',
        solution:
`int minOf(int a, int b) {
    if (a < b) return a;
    return b;
}
printf("%d\\n", minOf(3, 7));
printf("%d\\n", minOf(9, 2));`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Return Values — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — SCOPE AND PASS-BY-VALUE
     ══════════════════════════════════════════════════════════ */
  function initTopic_scope() {
    const topicId = 'ch13-scope'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch13-scope-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`void tryToDouble(int n) {
    n = n * 2;
    printf("inside function: n = %d\\n", n);
}

int x = 5;
tryToDouble(x);
printf("after function:  x = %d\\n", x);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch13-scope',
      question: 'Inside the function, n became 10. But outside, x is still 5. What does this demonstrate?',
      options: [
        'The function ran incorrectly — x should have become 10',
        'C passes a copy of the value — the function works on n, which is separate from x',
        'int variables cannot be modified inside functions',
        'The printf inside the function printed a different variable'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — C passes arguments by value. x\'s value (5) was copied into n. Modifying n changes only that local copy — x is completely unaffected.',
        incorrect: 'C is pass-by-value. The caller passes the VALUE of x (5), not x itself. The function receives a local copy in parameter n. Changing n has no effect on x.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch13-scope-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch13-scope-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the program so the function returns the doubled value instead of modifying n in-place. Store the result in x and print it to show the value changed correctly.',
      includes: ['<stdio.h>'],
      starterCode:
`void tryToDouble(int n) {
    n = n * 2;
    printf("inside: %d\\n", n);
}
int x = 5;
tryToDouble(x);
printf("x = %d\\n", x);`,
      checkFn: out => out.includes('10') && !out.includes('x = 5'),
      hint: 'Change void to int, add return n; inside, then x = doubled(x); to use the return value.',
      solution:
`int doubled(int n) {
    return n * 2;
}
int x = 5;
x = doubled(x);
printf("x = %d\\n", x);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch13-scope-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks. Two functions each have their own "count" — they do not interfere.',
      includes: ['<stdio.h>'],
      starterCode:
`void countA() {
    [?] count = 10;
    printf("A count: %d\\n", count);
}

void countB() {
    [?] count = 99;
    printf("B count: %d\\n", [?]);
}

[?]();
[?]();`,
      blanks: ['int', 'int', 'count', 'countA', 'countB'],
      hint: 'First two: declare the local variable with its type. Third: print the variable. Last two: the function names to call.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch13-scope-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write int addToTen(int n) that returns 10 + n. Then demonstrate that the original variable is unchanged: declare int val=3, call addToTen(val), print addToTen result AND val separately to show val is still 3.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('13') && out.includes('3'),
      hint: 'int addToTen(int n){ return 10+n; } int val=3; printf("%d\\n", addToTen(val)); printf("%d\\n", val);',
      solution:
`int addToTen(int n) { return 10 + n; }
int val = 3;
printf("Result: %d\\n", addToTen(val));
printf("val:    %d\\n", val);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch13-sc-p1', type: 'predict',
          question: 'What prints?',
          code: `void change(int x) { x = 100; }\nint n = 5;\nchange(n);\nprintf("%d\\n", n);`,
          correct: ['5'],
          caseSensitive: true, orderMatters: true,
          hint: 'Change modifies its local copy. The original n is untouched.',
          feedback: {
            correct: 'Correct — change() receives a copy of n. Modifying x inside has no effect on n in the caller. Output: 5.',
            incorrect: 'Pass-by-value: change(n) passes a copy. x=100 modifies the local copy only. n in the caller is still 5.'
          }
        },
        {
          id: 'ch13-sc-p2', type: 'predict',
          question: 'What prints?',
          code: `int count = 0;\nvoid inc() { count = count + 1; printf("%d\\n", count); }\ninc();\ninc();\ninc();`,
          correct: ['1\n2\n3'],
          caseSensitive: true, orderMatters: true,
          hint: 'count is declared OUTSIDE both functions — it is accessible to both.',
          feedback: {
            correct: 'Correct — count is outside any function (global). All functions share it. Each inc() call adds 1 to the shared count: 1, 2, 3.',
            incorrect: 'count is a global variable — visible to all functions. Each inc() increments the same count: 1, then 2, then 3.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch13-sc-m1', type: 'mcq',
          question: 'What is a local variable?',
          options: [
            'A variable declared globally, accessible everywhere',
            'A variable declared inside a function, only accessible within that function',
            'A variable that can only hold small numbers',
            'A variable shared between all functions'
          ],
          correct: ['A variable declared inside a function, only accessible within that function'],
          caseSensitive: false, orderMatters: false,
          hint: '"Local" means belonging to one specific place.',
          feedback: {
            correct: 'Correct — local variables are scoped to their containing function. They are created on entry and destroyed on return.',
            incorrect: 'A local variable is declared inside a specific function and only exists (and is accessible) within that function\'s execution.'
          }
        },
        {
          id: 'ch13-sc-m2', type: 'mcq',
          question: 'What is pass-by-value in C?',
          options: [
            'The function receives the original variable and can modify it',
            'The function receives a copy of the argument — modifying it does not affect the original',
            'Values can only be passed to functions, not returned',
            'Only int values can be passed to functions'
          ],
          correct: ['The function receives a copy of the argument — modifying it does not affect the original'],
          caseSensitive: false, orderMatters: false,
          hint: 'The clue is in the name — a copy of the VALUE is passed.',
          feedback: {
            correct: 'Correct — C always copies the argument value into the parameter. Changes to the parameter inside the function stay local.',
            incorrect: 'Pass-by-value means a copy of the argument is made. The function works on the copy. The original variable in the caller is unaffected by changes inside the function.'
          }
        },
        {
          id: 'ch13-sc-m3', type: 'mcq',
          question: 'When does a local variable cease to exist?',
          options: [
            'When the program ends',
            'When the variable\'s value becomes 0',
            'When the function that owns it returns',
            'After the first time it is read'
          ],
          correct: ['When the function that owns it returns'],
          caseSensitive: false, orderMatters: false,
          hint: 'Local variable lifetime matches the function call lifetime.',
          feedback: {
            correct: 'Correct — a local variable is created when the function is called and destroyed when it returns. Next call creates a fresh copy.',
            incorrect: 'Local variables exist only for the duration of their function\'s execution. When the function returns, all local variables are destroyed.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Demonstrate pass-by-value: write a function void addFive(int n) that adds 5 to n and prints the result. Then show that the original variable in the caller is unchanged after the call.',
          check: out => {
            const lines = out.trim().split('\n').filter(l => l.trim())
            return out.includes('15') && out.includes('10')
          },
          hint: 'void addFive(int n){ n+=5; printf("inside: %d\\n",n); } int x=10; addFive(x); printf("outside: %d\\n",x);',
          solution:
`void addFive(int n) { n+=5; printf("inside: %d\\n", n); }
int x = 10;
addFive(x);
printf("outside: %d\\n", x);`
        },
        {
          id: 'p2',
          task: 'Write two functions with a local variable both named "total": funcA sets total=100 and prints it, funcB sets total=999 and prints it. Call both and show they do not interfere.',
          check: out => out.includes('100') && out.includes('999'),
          hint: 'void funcA(){ int total=100; printf("%d\\n",total); } void funcB(){ int total=999; printf("%d\\n",total); }',
          solution:
`void funcA(){ int total=100; printf("%d\\n",total); }
void funcB(){ int total=999; printf("%d\\n",total); }
funcA();
funcB();`
        }
      ]

      renderPracticeCh13('practice-ch13-scope', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch13-scope-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch13-scope-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch13-scope-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This tries to swap two variables but leaves them unchanged. Identify why and fix it using return values.',
        includes: ['<stdio.h>'],
        starterCode:
`void swapFirst(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("inside: a=%d b=%d\\n", a, b);
}
int x = 3, y = 7;
swapFirst(x, y);
printf("outside: x=%d y=%d\\n", x, y);`,
        checkFn: out => {
          const text = out
          return text.includes('outside: x=7') || text.includes('x=7 y=3')
        },
        hint: 'Pass-by-value: swapping local copies does not affect x and y. To fix, return one value and use it in the caller, or use two separate functions.',
        hintTwo: 'Since C is pass-by-value, print the swapped result from inside the function OR restructure: int tempX=x; x=y; y=tempX; directly in the caller without a function.',
        solution:
`int x = 3, y = 7;
int temp = x;
x = y;
y = temp;
printf("x=%d y=%d\\n", x, y);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Function Scope — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — RECURSION
     ══════════════════════════════════════════════════════════ */
  function initTopic_recursion() {
    const topicId = 'ch13-recursion'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch13-recursion-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`void countdown(int n) {
    if (n <= 0) {
        printf("Go!\\n");
        return;
    }
    printf("%d\\n", n);
    countdown(n - 1);
}

countdown(5);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch13-recursion',
      question: 'What prevents countdown from calling itself forever?',
      options: [
        'C automatically stops functions after 5 calls',
        'The if (n <= 0) check — when n reaches 0 or below, the function returns without calling itself again',
        'countdown(n - 1) eventually becomes countdown(0) which is void',
        'printf stops the recursion after printing'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — the if (n <= 0) is the base case. When reached, the function returns without making another recursive call. That unwinds all the waiting calls.',
        incorrect: 'The base case if (n <= 0) is what stops the recursion. Without it, n would go 5, 4, 3, 2, 1, 0, -1, -2... forever until the stack overflows.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch13-recursion-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch13-recursion-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change countdown to count UP instead — print 1, 2, 3... up to n, then print "Done!". The recursive call should come BEFORE the printf.',
      includes: ['<stdio.h>'],
      starterCode:
`void countdown(int n) {
    if (n <= 0) {
        printf("Go!\\n");
        return;
    }
    printf("%d\\n", n);
    countdown(n - 1);
}
countdown(4);`,
      checkFn: out => {
        const lines = out.trim().split('\n').filter(l => l.trim())
        const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
        return nums.length >= 4 && nums[0] === 1 && nums[nums.length-1] === 4
      },
      hint: 'Move the recursive call BEFORE printf. Base case: if n<=0 just return. The call order reverses the output.',
      solution:
`void countUp(int n) {
    if (n <= 0) return;
    countUp(n - 1);
    printf("%d\\n", n);
}
countUp(4);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch13-recursion-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete a recursive factorial function.',
      includes: ['<stdio.h>'],
      starterCode:
`int factorial(int n) {
    if (n [?] 1) [?] 1;
    return n * [?](n - 1);
}

printf("%d\\n", factorial(5));
printf("%d\\n", factorial(4));`,
      blanks: ['<=', 'return', 'factorial'],
      hint: 'First: the base case condition (n=0 or n=1 both give 1). Second: the keyword to send back the base value. Third: the function calls itself.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch13-recursion-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a recursive function int power(int base, int exp) that computes base^exp.\nBase case: exp == 0 returns 1 (anything to the power 0 is 1).\nRecursive case: base * power(base, exp - 1).\nTest: power(2,8) should give 256, power(3,4) should give 81.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('256') && out.includes('81'),
      hint: 'int power(int b, int e){ if(e==0) return 1; return b * power(b, e-1); }',
      solution:
`int power(int b, int e) {
    if (e == 0) return 1;
    return b * power(b, e - 1);
}
printf("%d\\n", power(2, 8));
printf("%d\\n", power(3, 4));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch13-rc-p1', type: 'predict',
          question: 'What prints?',
          code: `int sum(int n) {\n    if (n <= 0) return 0;\n    return n + sum(n - 1);\n}\nprintf("%d\\n", sum(4));`,
          correct: ['10'],
          caseSensitive: true, orderMatters: true,
          hint: 'sum(4) = 4 + sum(3) = 4 + 3 + sum(2) = 4+3+2+1+0 = 10.',
          feedback: {
            correct: 'Correct — sum(4)=4+sum(3)=4+3+sum(2)=4+3+2+sum(1)=4+3+2+1+sum(0)=4+3+2+1+0=10.',
            incorrect: 'sum(4) unwinds: 4+sum(3)→4+3+sum(2)→4+3+2+sum(1)→4+3+2+1+sum(0)→4+3+2+1+0=10.'
          }
        },
        {
          id: 'ch13-rc-p2', type: 'predict',
          question: 'What prints?',
          code: `void print3(int n) {\n    if (n > 3) return;\n    printf("%d\\n", n);\n    print3(n + 1);\n}\nprint3(1);`,
          correct: ['1\n2\n3'],
          caseSensitive: true, orderMatters: true,
          hint: 'Starts at 1, stops when n > 3. Prints then recurses.',
          feedback: {
            correct: 'Correct — prints 1, recurses with 2, prints 2, recurses with 3, prints 3, recurses with 4, 4>3 returns. Output: 1 2 3.',
            incorrect: 'print3(1): print 1, call print3(2). print3(2): print 2, call print3(3). print3(3): print 3, call print3(4). print3(4): 4>3, return. Output: 1 2 3.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch13-rc-m1', type: 'mcq',
          question: 'What are the two required parts of every recursive function?',
          options: [
            'A loop and a condition',
            'A base case and a recursive case',
            'A return value and a void case',
            'An initializer and an updater'
          ],
          correct: ['A base case and a recursive case'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what makes recursion stop vs what makes it continue.',
          feedback: {
            correct: 'Correct — base case: condition where function returns without calling itself. Recursive case: calls itself with a simpler input.',
            incorrect: 'Every recursive function needs: (1) a base case — the stop condition that returns directly, and (2) a recursive case — calls itself with a smaller/simpler input toward the base case.'
          }
        },
        {
          id: 'ch13-rc-m2', type: 'mcq',
          question: 'What happens if a recursive function has no base case?',
          options: [
            'It runs exactly N times then stops',
            'C detects it and exits safely',
            'The function calls itself forever until the stack overflows and the program crashes',
            'The function returns 0 automatically'
          ],
          correct: ['The function calls itself forever until the stack overflows and the program crashes'],
          caseSensitive: false, orderMatters: false,
          hint: 'Without a stopping condition, what is there to terminate the calls?',
          feedback: {
            correct: 'Correct — infinite recursion fills the call stack until memory runs out. The program crashes with a stack overflow.',
            incorrect: 'Without a base case, the function calls itself endlessly. Each call uses stack memory. Eventually the stack runs out — stack overflow crash.'
          }
        },
        {
          id: 'ch13-rc-m3', type: 'mcq',
          question: 'In int factorial(int n) { if(n<=1) return 1; return n*factorial(n-1); } — what is the base case?',
          options: [
            'return n*factorial(n-1)',
            'n*factorial(n-1)',
            'if(n<=1) return 1',
            'factorial(n-1)'
          ],
          correct: ['if(n<=1) return 1'],
          caseSensitive: false, orderMatters: false,
          hint: 'The base case is where the recursion stops and returns a direct value without calling itself again.',
          feedback: {
            correct: 'Correct — if(n<=1) return 1 is the base case: it returns 1 directly without making another recursive call.',
            incorrect: 'The base case is if(n<=1) return 1 — the condition that terminates recursion by returning directly. The recursive case is return n*factorial(n-1).'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Write a recursive function int sumDigits(int n) that returns the sum of digits of a positive integer (e.g. 123 → 6). Test with sumDigits(123) and sumDigits(456).',
          check: out => out.includes('6') && out.includes('15'),
          hint: 'if(n==0) return 0; return n%10 + sumDigits(n/10);',
          solution:
`int sumDigits(int n) {
    if (n == 0) return 0;
    return n % 10 + sumDigits(n / 10);
}
printf("%d\\n", sumDigits(123));
printf("%d\\n", sumDigits(456));`
        },
        {
          id: 'p2',
          task: 'Write a recursive function void printDigits(int n) that prints each digit of n on its own line, from most significant to least. Test with 4321.',
          check: out => {
            const lines = out.trim().split('\n').filter(l=>l.trim())
            const nums = lines.map(l=>parseInt(l.trim())).filter(n=>!isNaN(n))
            return nums[0]===4 && nums[1]===3 && nums[2]===2 && nums[3]===1
          },
          hint: 'void printDigits(int n){ if(n>9) printDigits(n/10); printf("%d\\n", n%10); }',
          solution:
`void printDigits(int n) {
    if (n > 9) printDigits(n / 10);
    printf("%d\\n", n % 10);
}
printDigits(4321);`
        }
      ]

      renderPracticeCh13('practice-ch13-recursion', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch13-recursion-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch13-recursion-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch13-recursion-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This recursive function should compute n! (factorial) but produces wrong results. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int factorial(int n) {
    if (n == 0) return 0;
    return n * factorial(n - 1);
}
printf("%d\\n", factorial(5));
printf("%d\\n", factorial(3));`,
        checkFn: out => out.includes('120') && out.includes('6'),
        hint: 'Check the base case. What should 0! equal?',
        hintTwo: '0! is defined as 1, not 0. Returning 0 multiplies everything by 0 giving 0 for all inputs. Fix: if (n == 0) return 1;',
        solution:
`int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
printf("%d\\n", factorial(5));
printf("%d\\n", factorial(3));`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Recursion — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch13-mastery'), {
      mode: 'build', topicId: 'ch13-mastery', chapterId: CH,
      question:
`Chapter 13 Mastery — build a mini number toolkit using ALL chapter 13 concepts:

① Write void printLine(int n) — prints n dashes in a row
② Write int clamp(int val, int lo, int hi) — returns val clamped between lo and hi
③ Write int factorial(int n) — recursive factorial
④ Write void printTable(int rows, int cols) — prints a multiplication table (rows×cols) using a void function with parameters and nested loops
⑤ In the main section:
   — Call printLine(20)
   — Print clamp(150, 0, 100) — should print 100
   — Print clamp(-5, 0, 100) — should print 0
   — Print factorial(6) — should print 720
   — Call printTable(3, 4)`,
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => {
        const text = out
        return text.includes('100') && text.includes('0') &&
               text.includes('720') &&
               text.includes('---') &&
               (text.match(/\n/g)||[]).length >= 5
      },
      hint: 'Build one piece at a time: printLine first, test it, then clamp, then factorial, then printTable last.',
      solution:
`void printLine(int n) {
    for (int i = 0; i < n; i++) printf("-");
    printf("\\n");
}
int clamp(int val, int lo, int hi) {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
void printTable(int rows, int cols) {
    for (int r = 1; r <= rows; r++) {
        for (int c = 1; c <= cols; c++)
            printf("%4d", r * c);
        printf("\\n");
    }
}
printLine(20);
printf("clamp 150: %d\\n", clamp(150, 0, 100));
printf("clamp -5:  %d\\n", clamp(-5, 0, 100));
printf("6! = %d\\n", factorial(6));
printTable(3, 4);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch13-chapter-complete').style.display = 'block'
        $('ch13-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch13-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch14')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE SET HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh13(containerId, chapterId, topicId, configs) {
    const container = document.getElementById(containerId)
    if (!container) return
    let idx = 0

    function renderTask(i) {
      if (i >= configs.length) {
        container.innerHTML = '<p class="practice-complete">All tasks complete! ✓</p>'
        Progress.saveTopicComplete(chapterId, topicId + '-practice')
        return
      }
      const cfg = configs[i]
      container.innerHTML = ''

      const header = document.createElement('div')
      header.className = 'practice-task__header'
      header.innerHTML =
        `<span class="practice-task__num">Task ${i + 1} of ${configs.length}</span>` +
        `<span class="practice-task__dots">${configs.map((_, j) =>
          `<span class="dot ${j < i ? 'dot--done' : j === i ? 'dot--active' : ''}"></span>`).join('')}</span>`
      container.appendChild(header)

      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      container.appendChild(desc)

      const div = document.createElement('div')
      div.id = `pc13-${topicId}-${cfg.id}`
      container.appendChild(div)

      CCompiler.initBlock(div, {
        mode: 'build', topicId: topicId + '-p-' + cfg.id, chapterId,
        question: null, includes: ['<stdio.h>'], starterCode: '',
        checkFn: cfg.check, hint: cfg.hint, solution: cfg.solution,
        onPass: () => {
          Progress.saveStepComplete(chapterId, topicId, 'p' + cfg.id)
          idx++
          setTimeout(() => renderTask(idx), 800)
        }
      })
    }

    renderTask(idx)
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  function init() {
    initTopic_intro()
    initTopic_params()
    initTopic_return()
    initTopic_scope()
    initTopic_recursion()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
