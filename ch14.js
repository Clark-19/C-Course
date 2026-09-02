/* =========================================================
   C LEARNING PLATFORM — chapters/ch14-scope-storage-stdlib/ch14.js
   Chapter 14: Scope, Storage Classes & stdlib
   10 topics · 7-step structure · Assessment opens as popup modal
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch14'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — LOCAL VS GLOBAL
     ══════════════════════════════════════════════════════════ */
  function initTopic_scope() {
    const topicId = 'ch14-scope'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-scope-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int globalX = 100;      /* global — lives for entire program */

void showGlobal() {
    globalX += 10;
    printf("globalX = %d\\n", globalX);
}

void localDemo() {
    int localX = 5;     /* local — only exists inside localDemo */
    printf("localX  = %d\\n", localX);
}

showGlobal();
showGlobal();
localDemo();
printf("globalX after calls = %d\\n", globalX);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-scope',
      question: 'showGlobal was called twice — globalX became 110 then 120. Why did globalX keep its value between calls?',
      options: [
        'Local variables always persist between function calls',
        'globalX is a global — it lives for the entire program, not just one function call',
        'The += operator stores values permanently',
        'printf saved the value of globalX'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — global variables exist for the entire program lifetime. No function call destroys them. That is why globalX accumulated across two calls.',
        incorrect: 'globalX is declared outside all functions — it is global. Global variables are never destroyed between function calls. They persist for the entire program run.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-scope-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-scope-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a second function called reset() that sets globalX back to 0 and prints "Reset". Call the sequence: showGlobal, showGlobal, reset, showGlobal.',
      includes: ['<stdio.h>'],
      starterCode:
`int globalX = 100;

void showGlobal() {
    globalX += 10;
    printf("globalX = %d\\n", globalX);
}

showGlobal();
showGlobal();`,
      checkFn: out => out.includes('0') || out.includes('Reset') || out.includes('reset'),
      hint: 'void reset() { globalX = 0; printf("Reset\\n"); }',
      solution:
`int globalX = 100;
void showGlobal() { globalX += 10; printf("globalX = %d\\n", globalX); }
void reset() { globalX = 0; printf("Reset\\n"); }
showGlobal(); showGlobal(); reset(); showGlobal();`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-scope-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks: declare a global int, access it in two functions.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] total = 0;   /* global */

void addFive()  { [?] += 5; }
void addThree() { [?] += 3; }

addFive();
addThree();
printf("%d\\n", [?]);`,
      blanks: ['int', 'total', 'total', 'total'],
      hint: 'First: variable type. Next three: the global variable name referenced inside each function and printf.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-scope-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Create a global int score = 0. Write void addPoints(int n) that adds n to score. Call it with 10, 25, 5. Print the final score.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('40'),
      hint: 'int score=0; void addPoints(int n){ score+=n; } addPoints(10); addPoints(25); addPoints(5); printf("%d\\n",score);',
      solution:
`int score = 0;
void addPoints(int n) { score += n; }
addPoints(10); addPoints(25); addPoints(5);
printf("Score: %d\\n", score);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch14-sc-p1', type: 'predict',
          question: 'What prints?',
          code: `int n = 1;\nvoid inc() { n++; }\ninc(); inc(); inc();\nprintf("%d\\n", n);`,
          correct: ['4'],
          caseSensitive: true, orderMatters: true,
          hint: 'n is global. Each inc() call increments the same n.',
          feedback: {
            correct: 'Correct — n starts at 1, incremented 3 times → 4.',
            incorrect: 'n is global. Three inc() calls: 1→2→3→4. Output: 4.'
          }
        },
        {
          id: 'ch14-sc-p2', type: 'predict',
          question: 'What prints?',
          code: `int g = 10;\nvoid f() { int g = 99; printf("%d\\n", g); }\nf();\nprintf("%d\\n", g);`,
          correct: ['99\n10'],
          caseSensitive: true, orderMatters: true,
          hint: 'f() has a LOCAL g that shadows the global. After f() returns, the global g is still 10.',
          feedback: {
            correct: 'Correct — f() prints its local g (99). Outside, the global g is still 10.',
            incorrect: 'Inside f(), local int g=99 shadows the global. Prints 99. After f(), global g is still 10. Output: 99 then 10.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch14-sc-m1', type: 'mcq',
          question: 'Where is a global variable declared?',
          options: [
            'Inside main()',
            'Inside any function',
            'Outside all functions, at file scope',
            'In the return statement'
          ],
          correct: ['Outside all functions, at file scope'],
          caseSensitive: false, orderMatters: false,
          hint: 'Global means belonging to the whole file, not one function.',
          feedback: {
            correct: 'Correct — global variables are declared outside all function bodies, at the top-level of the source file.',
            incorrect: 'Global variables are declared outside all functions. Any declaration inside { } is local to that block.'
          }
        },
        {
          id: 'ch14-sc-m2', type: 'mcq',
          question: 'What is the risk of using global variables?',
          options: [
            'They use more memory than locals',
            'Any function can modify them, making bugs hard to trace',
            'They can only hold int values',
            'They are slower to access than locals'
          ],
          correct: ['Any function can modify them, making bugs hard to trace'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what it means when any code anywhere can change a value.',
          feedback: {
            correct: 'Correct — any function can read or write a global. When a bug corrupts it, finding which of many functions caused it is difficult.',
            incorrect: 'The primary risk: any function anywhere can modify a global. Tracing unexpected changes across a large codebase is very difficult.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Create a global int counter = 0. Write void tick() that increments it and prints the count as "Tick: N". Call tick() 4 times.',
          check: out => out.includes('4') && (out.match(/Tick/g)||[]).length >= 4,
          hint: 'int counter=0; void tick(){ counter++; printf("Tick: %d\\n",counter); }',
          solution: `int counter=0;\nvoid tick(){ counter++; printf("Tick: %d\\n",counter); }\ntick();tick();tick();tick();`
        },
        {
          id: 'p2',
          task: 'Show the difference between local and global: write getGlobal() that returns a global int (starting at 50) incremented by 1 each call. Also write getLocal() that always returns a fresh local int starting at 50 incremented by 1. Call both 3 times and print results.',
          check: out => out.includes('51') && out.includes('53'),
          hint: 'int g=50; int getGlobal(){ return ++g; } int getLocal(){ int l=50; return l+1; }',
          solution:
`int g=50;
int getGlobal(){ return ++g; }
int getLocal(){ int l=50; return l+1; }
printf("G:%d G:%d G:%d\\n", getGlobal(), getGlobal(), getGlobal());
printf("L:%d L:%d L:%d\\n", getLocal(), getLocal(), getLocal());`
        }
      ]

      renderPracticeCh14('practice-ch14-scope', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-scope-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-scope-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-scope-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'Two functions each declare their own "result" but the program still has a bug. Find and fix it.',
        includes: ['<stdio.h>'],
        starterCode:
`int result = 0;

void computeA() { result = 100; }
void computeB() { result = 200; }

computeA();
printf("A result: %d\\n", result);
computeB();
printf("B result: %d\\n", result);
printf("A result: %d\\n", result);`,
        checkFn: out => out.includes('100') && (out.match(/100/g)||[]).length >= 2,
        hint: 'Both functions modify the SAME global result. After computeB(), result is 200 — computeA\'s 100 is gone.',
        hintTwo: 'Save A\'s result before calling B: int a = result; computeA(); printf("A: %d\\n", a); — or use separate variables.',
        solution:
`void computeA() { printf("A result: 100\\n"); }
void computeB() { printf("B result: 200\\n"); }
computeA();
computeB();
computeA();`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Local vs Global — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — SCOPE RULES
     ══════════════════════════════════════════════════════════ */
  function initTopic_scoperules() {
    const topicId = 'ch14-scoperules'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-scoperules-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int x = 1;              /* outer x */

{
    int x = 2;          /* inner x — shadows outer */
    printf("inner block: x = %d\\n", x);

    {
        int x = 3;      /* innermost — shadows both */
        printf("innermost: x = %d\\n", x);
    }

    printf("back to inner: x = %d\\n", x);
}

printf("outer: x = %d\\n", x);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-scoperules',
      question: 'All three variables are named x but they print 3, 2, then 1 in the outer scope. Why does the outer x stay at 1 even though inner blocks declared x = 2 and x = 3?',
      options: [
        'C copies the outer x into inner blocks automatically',
        'Inner x declarations create separate, independent variables — they do not modify the outer x',
        'The inner x is destroyed and the outer one is restored',
        'Only the last assignment to x matters'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — each inner int x = N is a NEW variable in that block\'s scope. Declaring a new variable named x does not modify the outer x — it creates a shadow.',
        incorrect: 'int x = N in an inner block declares a brand-new variable. It does not write to the outer x. When the inner block ends, its x is destroyed and the outer x is visible again — unchanged.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-scoperules-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-scoperules-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the inner block so it modifies the OUTER x (assigns 99 to it) instead of declaring a new x. Print x inside and outside the block to verify.',
      includes: ['<stdio.h>'],
      starterCode:
`int x = 10;

{
    int x = 99;        /* declares a NEW x — change this */
    printf("inside: %d\\n", x);
}

printf("outside: %d\\n", x);`,
      checkFn: out => (out.match(/99/g)||[]).length >= 2,
      hint: 'Remove the int keyword inside the block. x = 99; without int assigns to the existing outer x.',
      solution:
`int x = 10;
{
    x = 99;            /* modifies outer x */
    printf("inside: %d\\n", x);
}
printf("outside: %d\\n", x);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-scoperules-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill the blanks so each block sees its own scoped variable.',
      includes: ['<stdio.h>'],
      starterCode:
`int val = 0;

if (1) {
    [?] val = 10;         /* shadows outer val */
    printf("if: %d\\n", val);
}

for ([?] i = 0; i < 2; i++) {
    printf("for: %d\\n", i); /* i scoped to for */
}

printf("outer val: [?]\\n", val);`,
      blanks: ['int', 'int', '%d'],
      hint: 'First two: declare variables in their scopes. Third: the format specifier to print the outer val.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-scoperules-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Demonstrate block scope: declare int result = 0 outside. Inside an if(1) block, declare a separate int result = 42. Print both — show the inner block sees 42, the outer scope still sees 0.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('42') && out.includes('0'),
      hint: 'int result=0; if(1){ int result=42; printf("inner: %d\\n",result); } printf("outer: %d\\n",result);',
      solution:
`int result = 0;
if (1) {
    int result = 42;
    printf("inner: %d\\n", result);
}
printf("outer: %d\\n", result);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch14-sr-p1', type: 'predict',
          question: 'What prints?',
          code: `int a = 5;\n{\n    int a = 10;\n    a++;\n    printf("%d\\n", a);\n}\nprintf("%d\\n", a);`,
          correct: ['11\n5'],
          caseSensitive: true, orderMatters: true,
          hint: 'Inner a starts at 10, incremented to 11. Outer a is unchanged.',
          feedback: {
            correct: 'Correct — inner a is 10, a++ makes it 11. Outer a stays at 5.',
            incorrect: 'Inner block: a=10, a++=11, prints 11. Outer block: a still 5. Output: 11 then 5.'
          }
        },
        {
          id: 'ch14-sr-p2', type: 'predict',
          question: 'What prints?',
          code: `for (int i = 0; i < 3; i++) {\n    int doubled = i * 2;\n}\nprintf("%d\\n", doubled);`,
          correct: ['[error]', 'compile error', 'error'],
          caseSensitive: false, orderMatters: false,
          hint: 'Where is doubled declared? Can it be accessed after the for loop?',
          feedback: {
            correct: 'Correct — doubled is declared inside the for loop body. It does not exist after the closing brace. This is a compile error.',
            incorrect: 'doubled is declared inside the for loop body — its scope ends at the closing brace. Using it after the loop is a compile error: "undeclared identifier."'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch14-sr-m1', type: 'mcq',
          question: 'What is variable shadowing?',
          options: [
            'A variable that becomes read-only',
            'An inner block declares a variable with the same name as an outer one — hiding the outer',
            'A global variable that overwrites a local',
            'A variable with no initial value'
          ],
          correct: ['An inner block declares a variable with the same name as an outer one — hiding the outer'],
          caseSensitive: false, orderMatters: false,
          hint: '"Shadow" — one blocks light from the other.',
          feedback: {
            correct: 'Correct — shadowing occurs when an inner scope re-declares a name already used in an outer scope. The inner name "shadows" (hides) the outer one within that block.',
            incorrect: 'Shadowing: an inner scope declares a name identical to an outer scope\'s variable. Inside the inner block, references to that name resolve to the inner (shadow) variable.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Write code where a for loop\'s counter variable i is NOT accessible after the loop. Try to use i after the loop and explain via a comment why it won\'t compile.',
          check: out => {
            const lines = out.trim().split('\n').filter(l=>l.trim())
            return lines.length >= 1
          },
          hint: 'for(int i=0;i<3;i++){ printf("%d\\n",i); } /* i does not exist here */',
          solution: `for(int i=0;i<3;i++){\n    printf("%d\\n",i);\n}\n/* printf("%d\\n",i); would be a compile error */\nprintf("loop done\\n");`
        }
      ]

      renderPracticeCh14('practice-ch14-scoperules', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-scoperules-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-scoperules-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-scoperules-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print the outer total after the loop, but gets the wrong value. Find the scope bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int total = 0;
for (int i = 1; i <= 5; i++) {
    int total = i;   /* bug here */
}
printf("Total: %d\\n", total);`,
        checkFn: out => out.includes('15'),
        hint: 'Inside the loop, int total = i declares a NEW local total — the outer total is never modified.',
        hintTwo: 'Remove int from inside the loop: total = i becomes total += i which modifies the outer total.',
        solution: `int total = 0;\nfor (int i = 1; i <= 5; i++) {\n    total += i;\n}\nprintf("Total: %d\\n", total);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Scope Rules — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — STORAGE CLASSES
     ══════════════════════════════════════════════════════════ */
  function initTopic_storage() {
    const topicId = 'ch14-storage'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-storage-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`const int LIMIT = 10;
const float RATE = 0.15;

void applyRate(int value) {
    float result = value * RATE;
    printf("%.2f applied to %d = %.2f\\n", RATE, value, result);
}

applyRate(100);
applyRate(250);
printf("Limit is: %d\\n", LIMIT);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-storage',
      question: 'LIMIT and RATE are declared with const. What does const prevent?',
      options: [
        'The variable from being accessed by functions',
        'The variable\'s value from being changed after initialization',
        'The variable from being printed',
        'The variable from being passed as a function argument'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — const makes the variable read-only after its initial assignment. Any attempt to assign a new value is a compile error.',
        incorrect: 'const declares a read-only variable. After initialization, its value cannot be changed. Trying to do so produces a compile error.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-storage-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-storage-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add two more const values: MAX_SCORE (100) and MIN_PASS (60). Use them in a function checkPass(int score) that prints "Pass" or "Fail".',
      includes: ['<stdio.h>'],
      starterCode:
`const int LIMIT = 10;

void checkLimit(int n) {
    if (n > LIMIT) printf("Over limit\\n");
    else printf("OK\\n");
}
checkLimit(5);
checkLimit(15);`,
      checkFn: out => (out.includes('Pass') || out.includes('Fail')) && out.includes('OK'),
      hint: 'const int MAX_SCORE=100, MIN_PASS=60; void checkPass(int s){ if(s>=MIN_PASS) printf("Pass\\n"); else printf("Fail\\n"); }',
      solution:
`const int LIMIT=10, MAX_SCORE=100, MIN_PASS=60;
void checkLimit(int n){ if(n>LIMIT) printf("Over limit\\n"); else printf("OK\\n"); }
void checkPass(int s){ if(s>=MIN_PASS) printf("Pass\\n"); else printf("Fail\\n"); }
checkLimit(5); checkLimit(15);
checkPass(75); checkPass(45);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-storage-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to declare read-only constants for a simple area calculator.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] float PI = 3.14159;
[?] int SIDES = 4;

void printArea(float radius) {
    printf("Area: %.2f\\n", [?] * radius * radius);
}

printArea(5.0);
printf("Polygon sides: %d\\n", [?]);`,
      blanks: ['const', 'const', 'PI', 'SIDES'],
      hint: 'First two: the keyword that makes variables read-only. Third: the constant for area formula. Fourth: the sides constant.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-storage-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define const values: SPEED_LIMIT=120, FINE_PER_KMH=50. Write void speedCheck(int speed) that prints the fine if over the limit (fine = (speed-SPEED_LIMIT)*FINE_PER_KMH) or "OK" if within limit.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('OK') && (out.includes('Fine') || out.includes('fine') || out.includes('1000') || out.includes('500')),
      hint: 'const int SPEED_LIMIT=120, FINE_PER_KMH=50; void speedCheck(int s){ if(s>SPEED_LIMIT) printf("Fine: %d\\n",(s-SPEED_LIMIT)*FINE_PER_KMH); else printf("OK\\n"); }',
      solution:
`const int SPEED_LIMIT=120, FINE_PER_KMH=50;
void speedCheck(int s){
    if(s>SPEED_LIMIT) printf("Fine: %d\\n",(s-SPEED_LIMIT)*FINE_PER_KMH);
    else printf("OK\\n");
}
speedCheck(100);
speedCheck(140);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch14-st-p1', type: 'predict',
        question: 'What happens?',
        code: `const int X = 5;\nX = 10;\nprintf("%d\\n", X);`,
        correct: ['[error]', 'compile error', 'error'],
        caseSensitive: false, orderMatters: false,
        hint: 'Can a const variable be reassigned?',
        feedback: {
          correct: 'Correct — X is const. Assigning X=10 is a compile error. The program cannot even be run.',
          incorrect: 'X is declared const. Any assignment after initialization is a compile error.'
        }
      }]

      const mcqQ = [
        {
          id: 'ch14-st-m1', type: 'mcq',
          question: 'What keyword makes a variable read-only in C?',
          options: ['final', 'readonly', 'const', 'fixed'],
          correct: ['const'],
          caseSensitive: true, orderMatters: false,
          hint: 'Same word as in many other languages.',
          feedback: {
            correct: 'Correct — const int X = 5; declares X as read-only.',
            incorrect: 'The keyword is const. C does not have final or readonly.'
          }
        },
        {
          id: 'ch14-st-m2', type: 'mcq',
          question: 'What is the default storage class for a local variable in C?',
          options: ['static', 'extern', 'const', 'auto'],
          correct: ['auto'],
          caseSensitive: false, orderMatters: false,
          hint: 'It is the implicit default — almost never written.',
          feedback: {
            correct: 'Correct — local variables are auto by default. Stack-allocated, function-scoped lifetime.',
            incorrect: 'auto is the default storage class for local variables. It is stack-allocated and has function-call lifetime.'
          }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Create const values: TAX_RATE=0.08, DISCOUNT=0.1. Write void printPrice(float price) that prints original price, discount amount, tax, and final price.',
        check: out => out.includes('.') && out.match(/\d+\.\d+/),
        hint: 'const float TAX_RATE=0.08, DISCOUNT=0.1; void printPrice(float p){ float disc=p*DISCOUNT; float tax=(p-disc)*TAX_RATE; printf("Final: %.2f\\n",p-disc+tax); }',
        solution:
`const float TAX_RATE=0.08, DISCOUNT=0.1;
void printPrice(float p){
    float disc=p*DISCOUNT;
    float tax=(p-disc)*TAX_RATE;
    printf("Orig: %.2f Disc: %.2f Tax: %.2f Final: %.2f\\n",p,disc,tax,p-disc+tax);
}
printPrice(100.0);`
      }]

      renderPracticeCh14('practice-ch14-storage', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-storage-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-storage-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-storage-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should use a named constant but the magic number appears directly. Refactor to use a const.',
        includes: ['<stdio.h>'],
        starterCode:
`void checkAge(int age) {
    if (age >= 18) printf("Adult\\n");
    else printf("Minor\\n");
}
checkAge(16);
checkAge(20);`,
        checkFn: out => out.includes('Adult') && out.includes('Minor'),
        hint: 'Define const int ADULT_AGE = 18; and use ADULT_AGE in the comparison instead of the literal 18.',
        hintTwo: 'const int ADULT_AGE=18; void checkAge(int age){ if(age>=ADULT_AGE) ... }',
        solution:
`const int ADULT_AGE = 18;
void checkAge(int age){
    if(age>=ADULT_AGE) printf("Adult\\n");
    else printf("Minor\\n");
}
checkAge(16); checkAge(20);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Storage Classes — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — STATIC
     ══════════════════════════════════════════════════════════ */
  function initTopic_static() {
    const topicId = 'ch14-static'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-static-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`void withStatic() {
    static int s = 0;  /* initialized ONCE */
    s++;
    printf("static: %d\\n", s);
}

void withLocal() {
    int n = 0;         /* re-initialized every call */
    n++;
    printf("local:  %d\\n", n);
}

withStatic(); withStatic(); withStatic();
withLocal();  withLocal();  withLocal();`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-static',
      question: 'withStatic printed 1, 2, 3 — withLocal printed 1, 1, 1. What causes the difference?',
      options: [
        'static variables are global and shared across all functions',
        'static s is initialized only once and keeps its value between calls; local n is reset to 0 on every call',
        'static functions run faster than regular ones',
        'Local variables lose their values when the CPU switches tasks'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — static int s = 0 executes that assignment exactly once. After that, s lives on and retains whatever value it had. int n = 0 runs on every call, resetting n.',
        incorrect: 'The key: static local variables are initialized once (when the program first reaches them) and never re-initialized. Local variables reset to their initializer every call.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-static-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-static-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a second static variable "total" that accumulates the sum of all calls. Pass an int n to the function and add n to total each call. Print both count and total.',
      includes: ['<stdio.h>'],
      starterCode:
`void track() {
    static int count = 0;
    count++;
    printf("calls: %d\\n", count);
}
track(); track(); track();`,
      checkFn: out => {
        const nums = out.match(/\d+/g) || []
        return nums.includes('3') && nums.length >= 4
      },
      hint: 'void track(int n){ static int count=0, total=0; count++; total+=n; printf("calls:%d total:%d\\n",count,total); }',
      solution:
`void track(int n) {
    static int count=0, total=0;
    count++; total+=n;
    printf("calls:%d total:%d\\n", count, total);
}
track(10); track(25); track(5);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-static-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to build a function that generates sequential IDs.',
      includes: ['<stdio.h>'],
      starterCode:
`int nextId() {
    [?] int id = 0;
    [?]++;
    return [?];
}

printf("%d\\n", nextId());
printf("%d\\n", nextId());
printf("%d\\n", nextId());`,
      blanks: ['static', 'id', 'id'],
      hint: 'First: the keyword that makes id persist between calls. Second and third: the variable name to increment and return.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-static-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a function int runningMax(int n) using a static variable that returns the maximum value seen across all calls. Test: call with 5, 3, 9, 2, 7 — each call should print the running max.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('9') && out.includes('5'),
      hint: 'int runningMax(int n){ static int max=0; if(n>max) max=n; return max; }',
      solution:
`int runningMax(int n) {
    static int max = 0;
    if (n > max) max = n;
    return max;
}
printf("%d\\n", runningMax(5));
printf("%d\\n", runningMax(3));
printf("%d\\n", runningMax(9));
printf("%d\\n", runningMax(2));
printf("%d\\n", runningMax(7));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch14-sl-p1', type: 'predict',
          question: 'What prints?',
          code: `void f() { static int x=10; x*=2; printf("%d\\n",x); }\nf(); f(); f();`,
          correct: ['20\n40\n80'],
          caseSensitive: true, orderMatters: true,
          hint: 'x starts at 10, doubled each call. Persists between calls.',
          feedback: {
            correct: 'Correct — static x starts at 10: 10*2=20, 20*2=40, 40*2=80.',
            incorrect: 'static x=10 once. Each call doubles: 20, 40, 80.'
          }
        },
        {
          id: 'ch14-sl-p2', type: 'predict',
          question: 'What prints?',
          code: `void g() { static int n=5; printf("%d ",n); n=99; }\ng(); g(); g();`,
          correct: ['5 99 99 ', '5 99 99'],
          caseSensitive: true, orderMatters: true,
          hint: 'First call: prints 5 (initial value), then sets n=99. Subsequent calls start with n=99.',
          feedback: {
            correct: 'Correct — first call: n=5 (prints 5), then n=99. Calls 2 and 3: n=99 already.',
            incorrect: 'static n initialized to 5 once. Call 1: prints 5, sets n=99. Calls 2,3: n=99.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch14-sl-m1', type: 'mcq',
          question: 'How many times does the initializer of a static local variable execute?',
          options: ['Every function call', 'Only the first time the function is called', 'Never', 'Once per program run and once per restart'],
          correct: ['Only the first time the function is called'],
          caseSensitive: false, orderMatters: false,
          hint: 'That is what makes static special.',
          feedback: {
            correct: 'Correct — static int x = 0 initializes x exactly once. All subsequent calls see whatever value x had at the end of the previous call.',
            incorrect: 'static locals are initialized exactly once — the first time execution reaches that declaration. Subsequent calls skip the initialization.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Write void callLog() that uses a static int to count how many times it has been called. Print "Call #N" each time. Call it 5 times.',
          check: out => out.includes('Call #5') || out.includes('Call: 5') || (out.match(/5/g)||[]).length >= 1,
          hint: 'void callLog(){ static int c=0; c++; printf("Call #%d\\n",c); }',
          solution: `void callLog(){ static int c=0; c++; printf("Call #%d\\n",c); }\ncallLog();callLog();callLog();callLog();callLog();`
        }
      ]

      renderPracticeCh14('practice-ch14-static', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-static-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-static-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-static-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This counter always prints 1 — it should count up. Fix it.',
        includes: ['<stdio.h>'],
        starterCode:
`void counter() {
    int count = 0;
    count++;
    printf("count = %d\\n", count);
}
counter(); counter(); counter();`,
        checkFn: out => out.includes('3') && out.includes('1') && out.includes('2'),
        hint: 'count is a local variable — reset to 0 every call. What keyword makes it persist?',
        hintTwo: 'Add static before int: static int count = 0; — then count persists between calls.',
        solution: `void counter() {\n    static int count = 0;\n    count++;\n    printf("count = %d\\n", count);\n}\ncounter(); counter(); counter();`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'static Variables — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — STDLIB
     ══════════════════════════════════════════════════════════ */
  function initTopic_stdlib() {
    const topicId = 'ch14-stdlib'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-stdlib-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>', '<stdlib.h>', '<ctype.h>'],
      starterCode:
`int neg = -42;
printf("abs(-42) = %d\\n", abs(neg));

char c = 'G';
printf("isalpha: %d\\n", isalpha(c));
printf("toupper: %c\\n", toupper('a'));
printf("tolower: %c\\n", tolower('Z'));
printf("isdigit('5'): %d\\n", isdigit('5'));
printf("isdigit('A'): %d\\n", isdigit('A'));`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-stdlib',
      question: 'isdigit(\'5\') returned non-zero (true) but isdigit(\'A\') returned 0 (false). What does isdigit test?',
      options: [
        'Whether the argument is a number greater than 0',
        'Whether the character is one of the digit characters 0-9',
        'Whether the character is a letter',
        'Whether the character is printable'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — isdigit tests if a char is one of \'0\', \'1\', ..., \'9\'. \'A\' is a letter, not a digit character.',
        incorrect: 'isdigit(c) returns true if c is the character \'0\' through \'9\'. It is testing the character representation, not a numeric value.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-stdlib-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-stdlib-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a loop that processes the string "Hello, World! 123" and counts letters, digits, and other characters separately.',
      includes: ['<stdio.h>', '<ctype.h>'],
      starterCode:
`char str[] = "Hello, World! 123";
printf("Length processed\\n");`,
      checkFn: out => {
        const text = out
        return (text.includes('letter') || text.includes('alpha') || text.includes('Letter')) &&
               (text.includes('digit') || text.includes('Digit'))
      },
      hint: 'int letters=0,digits=0,other=0; for(int i=0;str[i];i++){ if(isalpha(str[i])) letters++; else if(isdigit(str[i])) digits++; else other++; }',
      solution:
`char str[] = "Hello, World! 123";
int letters=0,digits=0,other=0;
for(int i=0;str[i];i++){
    if(isalpha(str[i])) letters++;
    else if(isdigit(str[i])) digits++;
    else other++;
}
printf("Letters: %d Digits: %d Other: %d\\n",letters,digits,other);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-stdlib-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct stdlib/ctype function names.',
      includes: ['<stdio.h>', '<stdlib.h>', '<ctype.h>'],
      starterCode:
`printf("%d\\n", [?](-99));          /* absolute value → 99 */
printf("%c\\n", [?]('b'));           /* uppercase → B */
printf("%d\\n", [?]('7'));           /* is it a digit? → non-zero */
printf("%d\\n", [?](' '));           /* is it whitespace? → non-zero */`,
      blanks: ['abs', 'toupper', 'isdigit', 'isspace'],
      hint: 'abs from stdlib.h, toupper/isdigit/isspace from ctype.h.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-stdlib-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a function int countVowels(char str[]) that counts vowels (a,e,i,o,u) in a string using isalpha and tolower. Test with "Hello World".',
      includes: ['<stdio.h>', '<ctype.h>'],
      starterCode: '',
      checkFn: out => out.includes('3'),
      hint: 'for(int i=0;str[i];i++){ char c=tolower(str[i]); if(c==\'a\'||c==\'e\'||c==\'i\'||c==\'o\'||c==\'u\') count++; }',
      solution:
`int countVowels(char str[]) {
    int count=0;
    for(int i=0;str[i];i++){
        char c=tolower(str[i]);
        if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;
    }
    return count;
}
printf("Vowels: %d\\n", countVowels("Hello World"));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch14-lib-p1', type: 'predict',
        question: 'What prints?',
        code: `#include <ctype.h>\nprintf("%c%c%c\\n", toupper('h'), toupper('i'), tolower('!'));`,
        correct: ['HI!'],
        caseSensitive: true, orderMatters: true,
        hint: 'toupper converts letters to uppercase. tolower on a non-letter returns it unchanged.',
        feedback: {
          correct: 'Correct — toupper(\'h\')=\'H\', toupper(\'i\')=\'I\', tolower(\'!\')=\'!\' (non-letter unchanged). Output: HI!',
          incorrect: 'toupper converts letters. Non-letters are returned unchanged. Output: HI!'
        }
      }]

      const mcqQ = [
        {
          id: 'ch14-lib-m1', type: 'mcq',
          question: 'Which header contains abs() for integer absolute value?',
          options: ['math.h', 'string.h', 'stdlib.h', 'ctype.h'],
          correct: ['stdlib.h'],
          caseSensitive: false, orderMatters: false,
          hint: 'abs is a general utility, not a math.h function. math.h has fabs() for doubles.',
          feedback: {
            correct: 'Correct — abs() for integers is in stdlib.h. math.h has fabs() for floating-point absolute values.',
            incorrect: 'abs() (integer absolute value) is in stdlib.h. math.h\'s fabs() handles double/float.'
          }
        },
        {
          id: 'ch14-lib-m2', type: 'mcq',
          question: 'What does isalpha(\'3\') return?',
          options: ['3', 'Non-zero (true)', '0 (false)', '\'3\''],
          correct: ['0 (false)'],
          caseSensitive: false, orderMatters: false,
          hint: '\'3\' is a digit character, not a letter.',
          feedback: {
            correct: 'Correct — \'3\' is a digit, not a letter. isalpha returns 0 for non-alphabetic characters.',
            incorrect: 'isalpha returns non-zero only for letters (a-z, A-Z). \'3\' is a digit, so isalpha(\'3\') = 0.'
          }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write a function that converts a string to ALL CAPS using toupper in a loop. Test with "hello world".',
        check: out => out.includes('HELLO') && out.includes('WORLD'),
        hint: 'for(int i=0;str[i];i++) printf("%c",toupper(str[i]));',
        solution:
`char s[]="hello world";
for(int i=0;s[i];i++) printf("%c",toupper(s[i]));
printf("\\n");`
      }]

      renderPracticeCh14('practice-ch14-stdlib', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-stdlib-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-stdlib-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-stdlib-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should count only digit characters but counts all non-space characters. Fix it.',
        includes: ['<stdio.h>', '<ctype.h>'],
        starterCode:
`char s[] = "abc 123 def 456";
int count = 0;
for (int i = 0; s[i]; i++) {
    if (!isspace(s[i])) count++;
}
printf("Digits: %d\\n", count);`,
        checkFn: out => out.includes('6'),
        hint: 'The condition !isspace checks for non-space, not specifically digits. What function checks for digit characters?',
        hintTwo: 'Change !isspace(s[i]) to isdigit(s[i]) to count only digit characters.',
        solution:
`char s[] = "abc 123 def 456";
int count = 0;
for (int i = 0; s[i]; i++) {
    if (isdigit(s[i])) count++;
}
printf("Digits: %d\\n", count);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Standard Library — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 6 — MATH.H
     ══════════════════════════════════════════════════════════ */
  function initTopic_math() {
    const topicId = 'ch14-math'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-math-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>', '<math.h>'],
      starterCode:
`printf("sqrt(49)   = %.1f\\n", sqrt(49.0));
printf("pow(2,8)   = %.0f\\n", pow(2.0, 8.0));
printf("floor(3.9) = %.1f\\n", floor(3.9));
printf("ceil(3.1)  = %.1f\\n", ceil(3.1));
printf("round(3.5) = %.1f\\n", round(3.5));
printf("fabs(-7.3) = %.1f\\n", fabs(-7.3));`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-math',
      question: 'floor(3.9) returned 3.0 and ceil(3.1) returned 4.0. What is the key difference between floor and ceil?',
      options: [
        'floor rounds to the nearest integer; ceil does not round',
        'floor always rounds DOWN (toward negative infinity); ceil always rounds UP',
        'floor removes decimals; ceil adds 1',
        'There is no difference — they both round to the nearest integer'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — floor always goes down (3.9 → 3). ceil always goes up (3.1 → 4). Neither rounds to nearest — round() does that.',
        incorrect: 'floor rounds toward negative infinity (always down). ceil rounds toward positive infinity (always up). round() rounds to nearest.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-math-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-math-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a distance function using the Pythagorean theorem. Compute the distance between (0,0) and (3,4) — expected: 5.00.',
      includes: ['<stdio.h>', '<math.h>'],
      starterCode:
`printf("sqrt(25) = %.2f\\n", sqrt(25.0));`,
      checkFn: out => out.includes('5.00') || out.includes('5.0'),
      hint: 'double dx=3, dy=4; double dist=sqrt(dx*dx + dy*dy); printf("%.2f\\n", dist);',
      solution:
`printf("sqrt(25) = %.2f\\n", sqrt(25.0));
double dx=3, dy=4;
printf("Distance: %.2f\\n", sqrt(dx*dx + dy*dy));`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-math-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct math.h functions.',
      includes: ['<stdio.h>', '<math.h>'],
      starterCode:
`double x = 16.0;
printf("%.1f\\n", [?](x));         /* square root → 4.0 */
printf("%.0f\\n", [?](2.0, 10.0)); /* 2 to the power 10 → 1024 */
printf("%.1f\\n", [?](-5.5));      /* absolute value → 5.5 */
printf("%.1f\\n", [?](7.8));       /* round down → 7.0 */`,
      blanks: ['sqrt', 'pow', 'fabs', 'floor'],
      hint: 'Square root, power, float absolute value, floor round-down.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-math-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a function double hypotenuse(double a, double b) that uses sqrt and pow to return the hypotenuse. Test: hypotenuse(3,4)=5, hypotenuse(5,12)=13.',
      includes: ['<stdio.h>', '<math.h>'],
      starterCode: '',
      checkFn: out => out.includes('5') && out.includes('13'),
      hint: 'double hypotenuse(double a, double b){ return sqrt(pow(a,2)+pow(b,2)); }',
      solution:
`double hypotenuse(double a, double b) {
    return sqrt(pow(a,2) + pow(b,2));
}
printf("%.0f\\n", hypotenuse(3,4));
printf("%.0f\\n", hypotenuse(5,12));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch14-mh-p1', type: 'predict',
        question: 'What prints?',
        code: `#include <math.h>\nprintf("%.0f\\n", floor(4.0));\nprintf("%.0f\\n", ceil(4.0));\nprintf("%.0f\\n", round(4.5));`,
        correct: ['4\n4\n5'],
        caseSensitive: true, orderMatters: true,
        hint: 'floor(4.0)=4, ceil(4.0)=4 (already integer), round(4.5)=5.',
        feedback: {
          correct: 'Correct — floor(4.0)=4, ceil(4.0)=4 (exactly integer, no rounding needed), round(4.5)=5.',
          incorrect: 'floor(4.0)→4, ceil(4.0)→4 (4.0 is already whole), round(4.5)→5. Output: 4 4 5.'
        }
      }]

      const mcqQ = [
        {
          id: 'ch14-mh-m1', type: 'mcq',
          question: 'What does pow(3.0, 4.0) return?',
          options: ['7.0', '12.0', '81.0', '64.0'],
          correct: ['81.0'],
          caseSensitive: false, orderMatters: false,
          hint: '3 to the power of 4 = 3×3×3×3.',
          feedback: {
            correct: 'Correct — 3^4 = 3×3×3×3 = 81.',
            incorrect: 'pow(3,4) = 3^4 = 3×3×3×3 = 81.'
          }
        },
        {
          id: 'ch14-mh-m2', type: 'mcq',
          question: 'What is the difference between abs() and fabs()?',
          options: [
            'No difference — they both work on int and double',
            'abs() is for integers (stdlib.h); fabs() is for doubles (math.h)',
            'fabs() is for integers; abs() is for doubles',
            'abs() returns negative values; fabs() returns positive'
          ],
          correct: ['abs() is for integers (stdlib.h); fabs() is for doubles (math.h)'],
          caseSensitive: false, orderMatters: false,
          hint: 'f in fabs stands for float/double.',
          feedback: {
            correct: 'Correct — abs() from stdlib.h works on int; fabs() from math.h works on double. Using abs() on a double truncates it first.',
            incorrect: 'abs() is integer absolute value (stdlib.h). fabs() handles floating-point absolute value (math.h).'
          }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Use math.h to print sqrt of 1, 4, 9, 16, 25 — all should print whole numbers (1.0, 2.0, 3.0, 4.0, 5.0).',
        check: out => out.includes('5') && out.includes('4') && out.includes('3'),
        hint: 'for(int i=1;i<=5;i++) printf("%.1f\\n", sqrt(i*i));',
        solution: `for(int i=1;i<=5;i++) printf("%.1f\\n", sqrt((double)(i*i)));`
      }]

      renderPracticeCh14('practice-ch14-math', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-math-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-math-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-math-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This primality check should only test divisors up to sqrt(n) but goes all the way to n. Fix it.',
        includes: ['<stdio.h>', '<math.h>'],
        starterCode:
`int isPrime(int n) {
    if (n < 2) return 0;
    for (int d = 2; d < n; d++) {
        if (n % d == 0) return 0;
    }
    return 1;
}
printf("%d %d %d\\n", isPrime(7), isPrime(9), isPrime(11));`,
        checkFn: out => out.includes('1') && out.includes('0'),
        hint: 'The loop runs all the way to n-1. The optimization is to stop at sqrt(n) — any factor above sqrt(n) must pair with one below it.',
        hintTwo: 'Change d < n to d <= (int)sqrt((double)n). Include math.h at the top.',
        solution:
`int isPrime(int n) {
    if (n < 2) return 0;
    for (int d = 2; d <= (int)sqrt((double)n); d++) {
        if (n % d == 0) return 0;
    }
    return 1;
}
printf("%d %d %d\\n", isPrime(7), isPrime(9), isPrime(11));`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'math.h — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPICS 7-10 — RECURSION (shared helper)
     Each topic: explore, IQ, explain, modify, fill, build, real-world + assessment
     ══════════════════════════════════════════════════════════ */

  function initTopic_recursion() {
    const topicId = 'ch14-recursion'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-recursion-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`void trace(int n) {
    printf("entering trace(%d)\\n", n);
    if (n <= 0) { printf("base case!\\n"); return; }
    trace(n - 1);
    printf("returning from trace(%d)\\n", n);
}
trace(3);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-recursion',
      question: '"entering" messages went 3, 2, 1, 0. "returning" messages went 1, 2, 3. Why are the returns in reverse order?',
      options: [
        'C reverses output when using recursion',
        'Each return goes back to the call site — the first to return is the deepest (last called), unwinding in reverse',
        'The printf statements are reversed in the function',
        'The base case reverses the call stack'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — each recursive call waits for the deeper call to return. The deepest call (trace(0)) returns first. Then trace(1) resumes, prints, returns. Then trace(2), then trace(3). LIFO — last in, first out.',
        incorrect: 'The call stack is LIFO. trace(3) called trace(2) then waited. trace(2) called trace(1) then waited. Deepest returns first. Unwinding is reverse of calling order.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-recursion-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-recursion-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change trace so it prints a message both entering AND returning, and add indentation (spaces) proportional to the depth level for clear visual nesting.',
      includes: ['<stdio.h>'],
      starterCode:
`void trace(int n) {
    printf("trace(%d)\\n", n);
    if (n <= 0) return;
    trace(n - 1);
}
trace(3);`,
      checkFn: out => {
        const lines = out.trim().split('\n').filter(l=>l.trim())
        return lines.length >= 5
      },
      hint: 'Add spaces: for(int i=0;i<depth;i++) printf(" "); printf("enter(%d)\\n",n); ... printf("exit(%d)\\n",n);',
      solution:
`void trace(int n, int depth) {
    for(int i=0;i<depth;i++) printf("  ");
    printf("enter(%d)\\n", n);
    if (n <= 0) return;
    trace(n - 1, depth + 1);
    for(int i=0;i<depth;i++) printf("  ");
    printf("exit(%d)\\n", n);
}
trace(3, 0);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-recursion-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete a recursive sum function.',
      includes: ['<stdio.h>'],
      starterCode:
`int sumDown(int n) {
    [?] (n <= 0) return 0;         /* base case */
    return [?] + sumDown([?] - 1); /* recursive case */
}
printf("%d\\n", sumDown(5));       /* 1+2+3+4+5 = 15 */`,
      blanks: ['if', 'n', 'n'],
      hint: 'First: the condition keyword. Second: current value to add. Third: argument for the recursive call (smaller input).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-recursion-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a recursive void function printBinary(int n) that prints n in binary (e.g. printBinary(6) → 110, printBinary(10) → 1010). Hint: print the bits on the way back UP.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('110') && (out.includes('1010') || out.includes('10')),
      hint: 'void printBinary(int n){ if(n>1) printBinary(n/2); printf("%d",n%2); }',
      solution:
`void printBinary(int n) {
    if (n > 1) printBinary(n / 2);
    printf("%d", n % 2);
}
printBinary(6);  printf("\\n");
printBinary(10); printf("\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch14-rc-p1', type: 'predict',
        question: 'What prints?',
        code: `void f(int n){\n    if(n==0) return;\n    f(n-1);\n    printf("%d ",n);\n}\nf(4);`,
        correct: ['1 2 3 4 ', '1 2 3 4'],
        caseSensitive: true, orderMatters: true,
        hint: 'printf is AFTER the recursive call — it runs on the way back up.',
        feedback: {
          correct: 'Correct — printf runs after the recursive call returns. Deepest f(1) prints 1 first, then 2, 3, 4.',
          incorrect: 'printf is after the recursive call — runs on unwind. f(0) returns, f(1) prints 1, f(2) prints 2, ... Output: 1 2 3 4.'
        }
      }]

      const mcqQ = [{
        id: 'ch14-rc-m1', type: 'mcq',
        question: 'Code placed BEFORE the recursive call runs in what order?',
        options: [
          'In reverse — last called runs first',
          'In call order — outermost first, deepest last (on the way DOWN)',
          'Randomly — order is not guaranteed',
          'Only once — it is shared across all recursive calls'
        ],
        correct: ['In call order — outermost first, deepest last (on the way DOWN)'],
        caseSensitive: false, orderMatters: false,
        hint: 'Before the call = on the way down = as frames are created.',
        feedback: {
          correct: 'Correct — code before the recursive call runs as frames are pushed: outermost first (top of stack most recently created = not first to run... wait, outermost IS first called). On the way down: f(4) code runs, then f(3), f(2), f(1).',
          incorrect: 'Before the recursive call = runs going DOWN. f(4)\'s pre-call code runs first, then f(3)\'s, f(2)\'s, f(1)\'s — same order as the calls.'
        }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write a recursive function to print all numbers from n down to 1 (going down). Then write one to print 1 up to n (going up). Both use the same base case.',
        check: out => out.includes('1') && out.includes('5'),
        hint: 'Down: print n then recurse n-1. Up: recurse n-1 then print n.',
        solution:
`void down(int n){ if(n<1) return; printf("%d ",n); down(n-1); }
void up(int n){ if(n<1) return; up(n-1); printf("%d ",n); }
down(5); printf("\\n");
up(5);   printf("\\n");`
      }]

      renderPracticeCh14('practice-ch14-recursion', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-recursion-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-recursion-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-recursion-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This recursive function should print n down to 1 but prints in reverse. Fix by moving one line.',
        includes: ['<stdio.h>'],
        starterCode: `void countdown(int n){\n    if(n<1) return;\n    countdown(n-1);\n    printf("%d\\n",n);\n}\ncountdown(4);`,
        checkFn: out => {
          const lines = out.trim().split('\n').filter(l=>l.trim())
          return parseInt(lines[0]) === 4 && parseInt(lines[lines.length-1]) === 1
        },
        hint: 'Currently printf is after the recursive call — so it prints on the way UP (1,2,3,4). To print going DOWN, move printf before the recursive call.',
        hintTwo: 'Move printf("%d\\n",n); to BEFORE countdown(n-1); — then n prints as each frame is created.',
        solution: `void countdown(int n){\n    if(n<1) return;\n    printf("%d\\n",n);\n    countdown(n-1);\n}\ncountdown(4);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Recursion — Call Stack — Assessment', renderAssessment))
  }

  function initTopic_recbase() {
    const topicId = 'ch14-recbase'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-recbase-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int gcd(int a, int b) {
    if (b == 0) return a;          /* base case */
    return gcd(b, a % b);          /* recursive case — Euclid's algorithm */
}

printf("gcd(48,18) = %d\\n", gcd(48, 18));
printf("gcd(100,75) = %d\\n", gcd(100, 75));
printf("gcd(7,3) = %d\\n", gcd(7, 3));`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-recbase',
      question: 'gcd(48,18): b=18≠0 → gcd(18,48%18)=gcd(18,12) → gcd(12,6) → gcd(6,0) → return 6. What is the base case here?',
      options: [
        'When a == b',
        'When b == 0 — return a directly',
        'When a % b == 0',
        'When a is less than b'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — when b reaches 0, a is the GCD. That is the base case: no further recursion needed.',
        incorrect: 'Base case: b == 0. When b is 0, a is the answer — return it without another recursive call.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-recbase-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-recbase-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add an input guard: if either a or b is negative, return -1 (invalid). Test with gcd(48,18), gcd(-5,10), and gcd(0,8).',
      includes: ['<stdio.h>'],
      starterCode:
`int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
printf("%d\\n", gcd(48, 18));`,
      checkFn: out => out.includes('6') && (out.includes('-1') || out.includes('8')),
      hint: 'Add at the top: if(a<0 || b<0) return -1;',
      solution:
`int gcd(int a, int b) {
    if (a < 0 || b < 0) return -1;
    if (b == 0) return a;
    return gcd(b, a % b);
}
printf("%d\\n", gcd(48, 18));
printf("%d\\n", gcd(-5, 10));
printf("%d\\n", gcd(0, 8));`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-recbase-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the two base cases for a recursive min function.',
      includes: ['<stdio.h>'],
      starterCode:
`int minArr(int arr[], int n) {
    if (n == [?]) return arr[0];              /* single element */
    int rest = minArr(arr + 1, [?]);          /* min of rest */
    return arr[0] < rest ? [?] : rest;        /* smaller of first vs rest */
}

int data[] = {5, 2, 8, 1, 9, 3};
printf("Min: %d\\n", minArr(data, 6));`,
      blanks: ['1', 'n-1', 'arr[0]'],
      hint: 'First: when only one element remains. Second: size of the remaining sub-array. Third: which value to return when arr[0] is smaller.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-recbase-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a recursive int countDown(int n) that returns the sum of n + (n-1) + ... + 1 + 0. Base case: n <= 0 returns 0. Test: countDown(10) = 55.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('55'),
      hint: 'int countDown(int n){ if(n<=0) return 0; return n + countDown(n-1); }',
      solution: `int countDown(int n){ if(n<=0) return 0; return n + countDown(n-1); }\nprintf("%d\\n", countDown(10));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch14-rb-p1', type: 'predict',
        question: 'What prints?',
        code: `int f(int n){\n    if(n==1) return 1;\n    return 2 * f(n-1);\n}\nprintf("%d\\n", f(5));`,
        correct: ['16'],
        caseSensitive: true, orderMatters: true,
        hint: 'f(5)=2*f(4)=2*2*f(3)=2*2*2*f(2)=2*2*2*2*f(1)=2*2*2*2*1=16.',
        feedback: {
          correct: 'Correct — f(5)=2^4=16. f(1)=1, f(2)=2, f(3)=4, f(4)=8, f(5)=16.',
          incorrect: 'Each call doubles: f(1)=1, f(2)=2, f(3)=4, f(4)=8, f(5)=16.'
        }
      }]

      const mcqQ = [{
        id: 'ch14-rb-m1', type: 'mcq',
        question: 'What must be true of the recursive call\'s argument to avoid infinite recursion?',
        options: [
          'It must be larger than the current argument',
          'It must always be the same value',
          'It must move closer to the base case with each call',
          'It must be a float'
        ],
        correct: ['It must move closer to the base case with each call'],
        caseSensitive: false, orderMatters: false,
        hint: 'If the argument never changes toward the base case, the base case is never reached.',
        feedback: {
          correct: 'Correct — every recursive call must bring the input closer to the base case. f(n-1) moves n toward 0. Without this, the base case is never reached.',
          incorrect: 'The recursive argument must progress toward the base case each call. If it does not, the base case is never hit and recursion continues forever.'
        }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write int power2(int n) that recursively computes 2^n. Base: power2(0)=1. Test: power2(8)=256.',
        check: out => out.includes('256'),
        hint: 'int power2(int n){ if(n==0) return 1; return 2*power2(n-1); }',
        solution: `int power2(int n){ if(n==0) return 1; return 2*power2(n-1); }\nprintf("%d\\n", power2(8));`
      }]

      renderPracticeCh14('practice-ch14-recbase', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-recbase-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-recbase-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-recbase-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This recursive function causes infinite recursion. Find the missing base case.',
        includes: ['<stdio.h>'],
        starterCode: `int sumTo(int n){ return n + sumTo(n-1); }\nprintf("%d\\n", sumTo(5));`,
        checkFn: out => out.includes('15'),
        hint: 'There is no base case! What value of n should cause the function to return without recursing?',
        hintTwo: 'Add: if(n <= 0) return 0; at the start of sumTo.',
        solution: `int sumTo(int n){ if(n<=0) return 0; return n+sumTo(n-1); }\nprintf("%d\\n", sumTo(5));`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Base Case Design — Assessment', renderAssessment))
  }

  function initTopic_factorial() {
    const topicId = 'ch14-factorial'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-factorial-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int fibFast(int n) {
    if (n <= 1) return n;
    int a=0, b=1;
    for (int i=2; i<=n; i++) { int t=a+b; a=b; b=t; }
    return b;
}

for (int i=0; i<=7; i++)
    printf("fib(%d)=%d  fact(%d)=%d\\n", i,fibFast(i), i,factorial(i));`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-factorial',
      question: 'The fibonacci function here uses a loop, not recursion. Why was the iterative version chosen instead?',
      options: [
        'Loops are required for fibonacci — recursion is invalid',
        'Recursive fibonacci makes exponentially more function calls — the iterative version does the same work in O(n)',
        'Fibonacci cannot be defined recursively',
        'The loop version uses less code'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — recursive fib(n) calls fib(n-1) AND fib(n-2). Those each make two more calls. The total grows as 2^n. fib(40) would make billions of calls. The loop does it in 40 steps.',
        incorrect: 'Recursive Fibonacci recomputes the same values exponentially. fib(5) calls fib(4)+fib(3), fib(4) calls fib(3)+fib(2)... fib(3) is computed multiple times. The loop avoids all redundant work.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-factorial-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-factorial-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a function int choose(int n, int k) that computes combinations C(n,k) = n!/(k!*(n-k)!) using the factorial function. Test: choose(5,2)=10, choose(6,3)=20.',
      includes: ['<stdio.h>'],
      starterCode:
`int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
printf("5! = %d\\n", factorial(5));`,
      checkFn: out => out.includes('10') && out.includes('20'),
      hint: 'int choose(int n, int k){ return factorial(n)/(factorial(k)*factorial(n-k)); }',
      solution:
`int factorial(int n){ if(n<=1) return 1; return n*factorial(n-1); }
int choose(int n, int k){ return factorial(n)/(factorial(k)*factorial(n-k)); }
printf("5! = %d\\n", factorial(5));
printf("C(5,2) = %d\\n", choose(5,2));
printf("C(6,3) = %d\\n", choose(6,3));`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-factorial-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete the iterative Fibonacci.',
      includes: ['<stdio.h>'],
      starterCode:
`int fib(int n) {
    if (n <= 1) return [?];
    int a=0, b=1;
    for (int i=2; i<=[?]; i++) {
        int t = [?] + b;
        a = b;
        b = t;
    }
    return [?];
}
printf("%d\\n", fib(10));`,
      blanks: ['n', 'n', 'a', 'b'],
      hint: 'First: what fib(0) and fib(1) return. Second: loop limit. Third: old a in the sum. Fourth: result.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-factorial-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a Pascal\'s triangle row calculator using choose(). Print rows 0-4 of Pascal\'s triangle.\nRow 0: 1\nRow 1: 1 1\nRow 2: 1 2 1\nRow 3: 1 3 3 1\nRow 4: 1 4 6 4 1',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('1 4 6 4 1') || (out.includes('6') && out.includes('4') && out.includes('1 3 3 1')),
      hint: 'int factorial(int n){...} int choose(int n,int k){...} for(int r=0;r<=4;r++){ for(int k=0;k<=r;k++) printf("%d ",choose(r,k)); printf("\\n"); }',
      solution:
`int factorial(int n){ if(n<=1) return 1; return n*factorial(n-1); }
int choose(int n, int k){ return factorial(n)/(factorial(k)*factorial(n-k)); }
for(int r=0;r<=4;r++){
    for(int k=0;k<=r;k++) printf("%d ",choose(r,k));
    printf("\\n");
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch14-fc-p1', type: 'predict',
        question: 'What is factorial(0)?',
        code: `int f(int n){ if(n<=1) return 1; return n*f(n-1); }\nprintf("%d\\n", f(0));`,
        correct: ['1'],
        caseSensitive: true, orderMatters: true,
        hint: 'n<=1 includes n=0. What does the base case return?',
        feedback: {
          correct: 'Correct — n=0 satisfies n<=1, so the base case returns 1. 0! = 1 by mathematical convention.',
          incorrect: '0 <= 1 is true, so base case fires: return 1. 0! = 1.'
        }
      }]

      const mcqQ = [{
        id: 'ch14-fc-m1', type: 'mcq',
        question: 'Why is recursive Fibonacci exponentially slow?',
        options: [
          'It uses floats instead of ints',
          'Each call makes two recursive calls, causing the same sub-problems to be recomputed many times',
          'Fibonacci numbers grow very large',
          'The base case is wrong'
        ],
        correct: ['Each call makes two recursive calls, causing the same sub-problems to be recomputed many times'],
        caseSensitive: false, orderMatters: false,
        hint: 'fib(5) calls fib(4) and fib(3). fib(4) calls fib(3) and fib(2). How many times is fib(3) computed?',
        feedback: {
          correct: 'Correct — fib(n) calls fib(n-1) and fib(n-2). fib(n-1) calls fib(n-2) again. fib(n-2) is computed twice. The redundancy compounds exponentially.',
          incorrect: 'Two recursive calls per step causes exponential growth. fib(n-2) is computed from both fib(n-1) and directly from fib(n). The same values are recomputed over and over.'
        }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write a function int permutations(int n, int k) that returns P(n,k) = n!/(n-k)! (permutations). Test: P(5,2)=20, P(6,3)=120.',
        check: out => out.includes('20') && out.includes('120'),
        hint: 'int factorial(int n){...} int permutations(int n,int k){ return factorial(n)/factorial(n-k); }',
        solution:
`int factorial(int n){ if(n<=1) return 1; return n*factorial(n-1); }
int permutations(int n, int k){ return factorial(n)/factorial(n-k); }
printf("P(5,2)=%d\\n", permutations(5,2));
printf("P(6,3)=%d\\n", permutations(6,3));`
      }]

      renderPracticeCh14('practice-ch14-factorial', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-factorial-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-factorial-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-factorial-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This factorial returns 0 for all inputs. Find the base case bug.',
        includes: ['<stdio.h>'],
        starterCode: `int factorial(int n){ if(n==0) return 0; return n*factorial(n-1); }\nprintf("%d\\n", factorial(5));`,
        checkFn: out => out.includes('120'),
        hint: 'What is 0! mathematically? The base case returns 0 but it should return 1.',
        hintTwo: 'Change return 0 to return 1 in the base case. 0! = 1 by definition. Returning 0 makes all products 0.',
        solution: `int factorial(int n){ if(n==0) return 1; return n*factorial(n-1); }\nprintf("%d\\n", factorial(5));`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Factorial & Fibonacci — Assessment', renderAssessment))
  }

  function initTopic_recviter() {
    const topicId = 'ch14-recviter'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch14-recviter-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Iterative sum */
int sumIter(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++) total += i;
    return total;
}

/* Recursive sum */
int sumRec(int n) {
    if (n <= 0) return 0;
    return n + sumRec(n - 1);
}

printf("Iterative: %d\\n", sumIter(10));
printf("Recursive: %d\\n", sumRec(10));`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch14-recviter',
      question: 'Both produced 55. For sum(10), which approach creates more overhead?',
      options: [
        'Iterative — a loop creates more frames than recursion',
        'Recursive — each of the 10 calls creates a stack frame with its own variables',
        'They have identical overhead',
        'Iterative — for loops are slower than function calls'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — sumRec(10) creates 10 stack frames, each holding its own n. sumIter(10) uses one stack frame and one loop counter. Same result, more memory for recursion.',
        incorrect: 'Every recursive call pushes a new stack frame. sumRec(10) creates 10 frames. sumIter(10) stays in one frame with a counter. Recursion has higher stack overhead here.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch14-recviter-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch14-recviter-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Convert the recursive sumRec into an iterative version using a while loop (not for). Verify both produce the same result for n=15.',
      includes: ['<stdio.h>'],
      starterCode:
`int sumRec(int n) {
    if (n <= 0) return 0;
    return n + sumRec(n - 1);
}
printf("%d\\n", sumRec(15));`,
      checkFn: out => (out.match(/120/g)||[]).length >= 2,
      hint: 'int sumWhile(int n){ int total=0; while(n>0){ total+=n; n--; } return total; }',
      solution:
`int sumRec(int n){ if(n<=0) return 0; return n+sumRec(n-1); }
int sumWhile(int n){ int total=0; while(n>0){ total+=n; n--; } return total; }
printf("rec:   %d\\n", sumRec(15));
printf("while: %d\\n", sumWhile(15));`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch14-recviter-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the iterative conversion of a recursive power function.',
      includes: ['<stdio.h>'],
      starterCode:
`/* Recursive: int powRec(int b,int e){ if(e==0) return 1; return b*powRec(b,e-1); } */

int powIter(int base, int exp) {
    int result = [?];
    [?] (exp > 0) {
        result *= [?];
        [?]--;
    }
    return result;
}
printf("%d\\n", powIter(2, 8));`,
      blanks: ['1', 'while', 'base', 'exp'],
      hint: 'First: starting value (anything^0=1). Second: the loop keyword. Third: multiply by base each iteration. Fourth: decrement the exponent.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch14-recviter-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write BOTH a recursive and iterative version of int countDigits(int n) that counts the number of digits in a positive integer. Test both with n=12345 (expect 5).',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => (out.match(/5/g)||[]).length >= 2,
      hint: 'Rec: if(n<10) return 1; return 1+countRec(n/10); Iter: while(n>0){count++;n/=10;}',
      solution:
`int countRec(int n){ if(n<10) return 1; return 1+countRec(n/10); }
int countIter(int n){ int c=0; while(n>0){c++;n/=10;} return c; }
printf("rec:  %d\\n", countRec(12345));
printf("iter: %d\\n", countIter(12345));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch14-ri-p1', type: 'predict',
        question: 'What prints?',
        code: `int f(int n){\n    int s=0;\n    while(n>0){s+=n;n--;}\n    return s;\n}\nprintf("%d\\n", f(5));`,
        correct: ['15'],
        caseSensitive: true, orderMatters: true,
        hint: '5+4+3+2+1=15.',
        feedback: {
          correct: 'Correct — iterative sum: 5+4+3+2+1=15.',
          incorrect: 'The while loop sums n down to 1: 5+4+3+2+1=15.'
        }
      }]

      const mcqQ = [
        {
          id: 'ch14-ri-m1', type: 'mcq',
          question: 'When should you prefer iteration over recursion?',
          options: [
            'Always — recursion is never correct',
            'When the problem does not have a naturally recursive structure and the depth could be large',
            'Only when using arrays',
            'When you need exactly two loops'
          ],
          correct: ['When the problem does not have a naturally recursive structure and the depth could be large'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about stack overflow risk and when recursion adds clarity vs complexity.',
          feedback: {
            correct: 'Correct — prefer iteration when: (1) no natural recursive structure, (2) large n risks stack overflow, (3) the iterative version is equally clear.',
            incorrect: 'Use iteration when the problem is best expressed as a loop (known count, simple accumulation) or when n is large enough to risk stack overflow with recursion.'
          }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Convert this recursive function to iterative: int sumSquares(int n){ if(n<=0) return 0; return n*n + sumSquares(n-1); } Test with n=5 (expect 55: 1+4+9+16+25).',
        check: out => out.includes('55'),
        hint: 'int sumSquares(int n){ int s=0; for(int i=1;i<=n;i++) s+=i*i; return s; }',
        solution: `int sumSquares(int n){ int s=0; for(int i=1;i<=n;i++) s+=i*i; return s; }\nprintf("%d\\n", sumSquares(5));`
      }]

      renderPracticeCh14('practice-ch14-recviter', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch14-recviter-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch14-recviter-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch14-recviter-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This iterative factorial has an off-by-one — it returns wrong values. Fix the loop.',
        includes: ['<stdio.h>'],
        starterCode: `int factIter(int n){ int r=1; for(int i=2;i<n;i++) r*=i; return r; }\nprintf("%d\\n", factIter(5));`,
        checkFn: out => out.includes('120'),
        hint: 'The loop uses i<n — what values of i does that include for n=5? Does it include n itself?',
        hintTwo: 'i<n stops before n (at 4 for n=5). Change to i<=n to include n in the product.',
        solution: `int factIter(int n){ int r=1; for(int i=2;i<=n;i++) r*=i; return r; }\nprintf("%d\\n", factIter(5));`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Recursion vs Iteration — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch14-mastery'), {
      mode: 'build', topicId: 'ch14-mastery', chapterId: CH,
      question:
`Chapter 14 Mastery — combine ALL chapter 14 concepts:
① Use const to define MAX=10 and BASE=2
② Write a static-local call counter function that tracks invocations
③ Use abs() and a math.h function (your choice)
④ Write a recursive int sumOdd(int n) that sums all odd numbers from 1 to n
⑤ Write an iterative equivalent sumOddIter(n) and verify they match
⑥ Use ctype.h to count digits vs letters in a literal string
Print all results clearly labeled`,
      includes: ['<stdio.h>', '<stdlib.h>', '<ctype.h>', '<math.h>'],
      starterCode: '',
      checkFn: out => {
        const text = out
        return text.includes('25') &&   /* sumOdd(10) = 1+3+5+7+9 = 25 */
               (text.includes('abs') || text.includes('sqrt') || text.match(/\d+\.\d/)) &&
               (text.includes('digit') || text.includes('letter') || text.includes('count'))
      },
      hint: 'Build piece by piece. sumOdd: if(n<1) return 0; if(n%2==0) return sumOdd(n-1); return n+sumOdd(n-2);',
      solution:
`const int MAX=10, BASE=2;

void callCount() {
    static int c=0; c++;
    printf("Called %d time(s)\\n",c);
}

int sumOdd(int n) {
    if(n<1) return 0;
    if(n%2==0) return sumOdd(n-1);
    return n + sumOdd(n-2);
}

int sumOddIter(int n) {
    int s=0;
    for(int i=1;i<=n;i+=2) s+=i;
    return s;
}

callCount(); callCount();
printf("abs(-42) = %d\\n", abs(-42));
printf("sqrt(MAX*MAX) = %.0f\\n", sqrt((double)(MAX*MAX)));
printf("sumOdd(%d) = %d\\n", MAX, sumOdd(MAX));
printf("sumOddIter(%d) = %d\\n", MAX, sumOddIter(MAX));
char s[]="Hello123";
int letters=0, digits=0;
for(int i=0;s[i];i++){
    if(isalpha(s[i])) letters++;
    else if(isdigit(s[i])) digits++;
}
printf("letters=%d digits=%d\\n", letters, digits);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch14-chapter-complete').style.display = 'block'
        $('ch14-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch14-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch15')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh14(containerId, chapterId, topicId, configs) {
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
      header.innerHTML = `<span class="practice-task__num">Task ${i+1} of ${configs.length}</span>` +
        `<span class="practice-task__dots">${configs.map((_,j) =>
          `<span class="dot ${j<i?'dot--done':j===i?'dot--active':''}"></span>`).join('')}</span>`
      container.appendChild(header)
      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      container.appendChild(desc)
      const div = document.createElement('div')
      div.id = `pc14-${topicId}-${cfg.id}`
      container.appendChild(div)
      CCompiler.initBlock(div, {
        mode: 'build', topicId: topicId+'-p-'+cfg.id, chapterId,
        question: null,
        includes: cfg.includes || ['<stdio.h>'],
        starterCode: '',
        checkFn: cfg.check, hint: cfg.hint, solution: cfg.solution,
        onPass: () => {
          Progress.saveStepComplete(chapterId, topicId, 'p'+cfg.id)
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
    initTopic_scope()
    initTopic_scoperules()
    initTopic_storage()
    initTopic_static()
    initTopic_stdlib()
    initTopic_math()
    initTopic_recursion()
    initTopic_recbase()
    initTopic_factorial()
    initTopic_recviter()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
