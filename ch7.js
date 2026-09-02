/* =========================================================
   C LEARNING PLATFORM — chapters/ch7-booleans-comparison/ch7.js
   Chapter 7: Booleans & Comparison Operators
   7 topics · 7-step blocks · Assessment deferred to modal popup
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch7'
  function $(id) { return document.getElementById(id) }
  function btn(topic) { return document.querySelector(`.btn-assessment[data-topic="${topic}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — BOOLEANS: 0 AND NOT-0
     ══════════════════════════════════════════════════════════ */
  function initTopic_booleans() {
    const topicId = 'ch7-booleans'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch7-booleans-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `/* In C, any non-zero value is true, zero is false */
printf("0 is false: %d\\n", 0);
printf("1 is true:  %d\\n", 1);
printf("-1 is true: %d\\n", -1);
printf("42 is true: %d\\n", 42);

/* Comparison operators return 0 or 1 */
printf("5 > 3 = %d\\n", 5 > 3);
printf("5 < 3 = %d\\n", 5 < 3);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch7-booleans',
      question: 'The expression (5 > 3) printed 1, not "true". What type does C use to represent truth values?',
      options: [
        'A special boolean type called bool',
        'The integer 1 for true and 0 for false — no separate boolean type',
        'The strings "true" and "false"',
        'A char: T or F'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — C uses plain integers. 1 means true, 0 means false. There is no separate bool type in classic C.',
        incorrect: 'C uses integers: 1 for true, 0 for false. Comparison operators return these integer values directly.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch7-booleans-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch7-booleans-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add lines that test whether -42 and 0.0 are treated as true or false by printing them inside an if-statement that prints "true" or "false".',
      includes: ['<stdio.h>'],
      starterCode: `if (1)    printf("1 is true\\n");
if (0)    printf("0 is true\\n");`,
      checkFn: (output) => output.includes('-42') || output.toLowerCase().includes('negative'),
      hint: 'if (-42) printf("-42 is true\\n"); if (0.0) printf("0.0 is true\\n"); else printf("0.0 is false\\n");',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch7-booleans-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the values: what does each comparison expression evaluate to?',
      includes: ['<stdio.h>'],
      starterCode: `int a = (10 > 5);   /* a = [?] */
int b = (10 < 5);   /* b = [?] */
int c = !0;         /* c = [?] */
printf("%d %d %d\\n", a, b, c);`,
      blanks: ['1', '0', '1'],
      hint: '10>5 is true=1. 10<5 is false=0. !0 flips 0 to 1.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch7-booleans-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program that stores a comparison result in an int variable, then prints:\n① The numeric value (0 or 1)\n② "TRUE" if the value is non-zero, "FALSE" if zero\nTest with: int age = 20; check if age >= 18',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => (output.includes('1') && output.toUpperCase().includes('TRUE')),
      hint: 'int result = (age >= 18); printf("%d\\n", result); if (result) printf("TRUE\\n"); else printf("FALSE\\n");',
      solution: `int age = 20;\nint result = (age >= 18);\nprintf("Value: %d\\n", result);\nif (result) printf("TRUE\\n"); else printf("FALSE\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch7-bo-p1', type: 'predict', question: 'What prints?', code: `printf("%d\\n", 10 > 5);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: '10 > 5 is true.', feedback: { correct: 'Correct — true comparisons return 1.', incorrect: '10 > 5 is true, so it returns 1.' } },
        { id: 'ch7-bo-p2', type: 'predict', question: 'What prints?', code: `printf("%d\\n", -5 > 0);`, correct: ['0'], caseSensitive: true, orderMatters: true, hint: '-5 is not greater than 0.', feedback: { correct: 'Correct — -5 > 0 is false = 0.', incorrect: '-5 > 0 is false, returns 0.' } },
        { id: 'ch7-bo-p3', type: 'predict', question: 'What prints?', code: `int x = -99;\nif (x) printf("A\\n"); else printf("B\\n");`, correct: ['A'], caseSensitive: true, orderMatters: true, hint: '-99 is non-zero.', feedback: { correct: 'Correct — -99 is non-zero, therefore true. Prints A.', incorrect: '-99 is non-zero so it is true. The if branch runs: A.' } }
      ]
      const mcqQ = [
        { id: 'ch7-bo-m1', type: 'mcq', question: 'Which value represents false in C?', options: ['false', '-1', '0', 'NULL'], correct: ['0'], caseSensitive: true, orderMatters: false, hint: 'Only one integer value means false.', feedback: { correct: 'Correct — only 0 is false in C.', incorrect: 'Only 0 is false. -1, 99, -42 are all true (non-zero).' } },
        { id: 'ch7-bo-m2', type: 'mcq', question: 'What does (7 < 3) evaluate to?', options: ['false', 'true', '0', '1'], correct: ['0'], caseSensitive: true, orderMatters: false, hint: 'Comparison operators return integers.', feedback: { correct: 'Correct — 7 < 3 is false = integer 0.', incorrect: 'Comparison returns integer 0 (false). Not the word "false".' } },
        { id: 'ch7-bo-m3', type: 'mcq', question: 'Is -1 true or false in C?', options: ['false — negative numbers are false', 'true — any non-zero is true', 'depends on the compiler', 'only positive numbers are true'], correct: ['true — any non-zero is true'], caseSensitive: false, orderMatters: false, hint: 'The rule is zero vs non-zero.', feedback: { correct: 'Correct — -1 is non-zero, therefore true.', incorrect: 'Any non-zero integer is true in C, including negative numbers.' } },
        { id: 'ch7-bo-m4', type: 'mcq', question: 'int x = (5 == 5); What is x?', options: ['5', 'true', '1', '0'], correct: ['1'], caseSensitive: true, orderMatters: false, hint: '5 == 5 is a true comparison.', feedback: { correct: 'Correct — 5==5 is true = 1. x stores the integer 1.', incorrect: 'A true comparison returns integer 1. x = 1.' } },
        { id: 'ch7-bo-m5', type: 'mcq', question: 'if (0) runs the body — true or false?', options: ['True', 'False — 0 is false, body never runs', 'Only if variable is int', 'Depends on what is inside'], correct: ['False — 0 is false, body never runs'], caseSensitive: false, orderMatters: false, hint: '0 is the only false value.', feedback: { correct: 'Correct — if (0) never executes its body.', incorrect: 'if (0): 0 is false, so the body never runs.' } }
      ]
      QuizEngine.init({ containerId: 'quiz-ch7-booleans-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-booleans-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch7-booleans-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print "Non-zero is true" for the value -5, but prints nothing. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode: `int x = -5;\nif (x == true)\n    printf("Non-zero is true\\n");`,
        checkFn: (output) => output.includes('Non-zero'),
        hint: 'C has no "true" keyword in C89. What does "true" mean here?',
        hintTwo: '"true" is not defined without stdbool.h. Use if (x) or if (x != 0) instead.',
        solution: `int x = -5;\nif (x)\n    printf("Non-zero is true\\n");`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Booleans in C — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — == VERSUS =
     ══════════════════════════════════════════════════════════ */
  function initTopic_equalsequals() {
    const topicId = 'ch7-equalsequals'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch7-equalsequals-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int x = 10;

/* == compares, does NOT change x */
printf("x == 10: %d\\n", x == 10);   /* 1 */
printf("x == 99: %d\\n", x == 99);   /* 0 */
printf("x after ==: %d\\n", x);      /* 10 — unchanged */

/* = assigns, CHANGES x — be careful in if() */
if (x = 0)
    printf("This runs?\\n");
printf("x after =: %d\\n", x);       /* 0 — x was changed! */`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch7-equalsequals',
      question: 'if (x = 0) did not print anything AND changed x from 10 to 0. What exactly happened inside the if condition?',
      options: [
        'The comparison x == 0 ran and found x was not 0',
        'The assignment x = 0 ran (changing x to 0), then 0 was tested as the condition (false)',
        'C detected the bug and skipped the block',
        'The = sign has no effect inside if()'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — x = 0 assigns 0 to x (a side effect), then the if evaluates that 0 as the condition (false). The block never runs, and x is now 0.',
        incorrect: '= inside if() still runs as a real assignment. It sets x = 0, then tests the value 0 — which is false. The body never runs, and x was silently changed.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch7-equalsequals-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch7-equalsequals-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Fix the bug: this if condition assigns instead of comparing. Make it print "Equal" only when x is 5.',
      includes: ['<stdio.h>'],
      starterCode: `int x = 5;
if (x = 5)
    printf("Equal\\n");
else
    printf("Not equal\\n");`,
      checkFn: (output) => output.includes('Equal') && !output.includes('Not equal'),
      hint: 'Change = to ==. The condition should be if (x == 5).',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch7-equalsequals-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in either = or == to make each line correct.',
      includes: ['<stdio.h>'],
      starterCode: `int score [?] 95;           /* store 95 in score */
if (score [?] 100)            /* check if perfect */
    printf("Perfect!\\n");
if (score [?] 90)             /* check if at least 90 */
    printf("Excellent\\n");`,
      blanks: ['=', '==', '>='],
      hint: 'First blank stores a value (=). Second checks equality (==). Third checks range (>=).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch7-equalsequals-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program that:\n① Declares int x = 7\n② Prints whether x equals 7 (should print "Match")\n③ Prints whether x equals 3 (should print "No match")\n④ Uses == for both — never =',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.toLowerCase().includes('match') && output.toLowerCase().includes('no match'),
      hint: 'if (x == 7) printf("Match\\n"); if (x == 3) printf("Match\\n"); else printf("No match\\n");',
      solution: `int x = 7;\nif (x == 7) printf("Match\\n"); else printf("No match\\n");\nif (x == 3) printf("Match\\n"); else printf("No match\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch7-eq-p1', type: 'predict', question: 'What prints?', code: `int x = 5;\nprintf("%d\\n", x == 5);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: '5 == 5 is true.', feedback: { correct: 'Correct — x == 5 is true = 1.', incorrect: 'x equals 5, so x == 5 returns 1 (true).' } },
        { id: 'ch7-eq-p2', type: 'predict', question: 'What prints?', code: `int x = 5;\nif (x = 0) printf("A\\n"); else printf("B\\n");\nprintf("%d\\n", x);`, correct: ['B\n0', 'B\r\n0'], caseSensitive: true, orderMatters: true, hint: '= assigns, does not compare. What value is assigned?', feedback: { correct: 'Correct — x = 0 assigns 0 to x, 0 is false so B prints. x is now 0.', incorrect: 'x = 0 assigns 0 (not ==). Condition is 0 (false) so else runs: B. x is now 0.' } },
        { id: 'ch7-eq-p3', type: 'predict', question: 'What prints?', code: `int a = 3, b = 3;\nprintf("%d\\n", a == b);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: '3 equals 3.', feedback: { correct: 'Correct — a == b is 3 == 3 = true = 1.', incorrect: '3 equals 3, so a == b returns 1.' } }
      ]
      const mcqQ = [
        { id: 'ch7-eq-m1', type: 'mcq', question: 'What does = do inside an if condition?', options: ['Compares the values', 'Assigns and returns the assigned value as the condition', 'Causes a compile error', 'Is ignored by the compiler'], correct: ['Assigns and returns the assigned value as the condition'], caseSensitive: false, orderMatters: false, hint: 'It is a real assignment.', feedback: { correct: 'Correct — = assigns and then the assigned value is tested as true/false.', incorrect: '= inside if() is a real assignment. The result (assigned value) is then tested as the condition.' } },
        { id: 'ch7-eq-m2', type: 'mcq', question: 'if (x = 5) — when is the body guaranteed to always run?', options: ['When x starts at 5', 'Always — because 5 is non-zero', 'Never', 'Only when x was 0 before'], correct: ['Always — because 5 is non-zero'], caseSensitive: false, orderMatters: false, hint: 'What value does = 5 leave as the condition?', feedback: { correct: 'Correct — x = 5 assigns 5, and 5 is non-zero (true), so the body ALWAYS runs regardless of what x was.', incorrect: 'x = 5 sets x to 5. 5 is non-zero = always true. Body always runs.' } },
        { id: 'ch7-eq-m3', type: 'mcq', question: 'What is the Yoda condition technique?', options: ['Writing if backwards', 'Putting the literal on the LEFT: if (5 == x)', 'Using ! instead of ==', 'Commenting out conditions'], correct: ['Putting the literal on the LEFT: if (5 == x)'], caseSensitive: false, orderMatters: false, hint: 'Think: if you type = by accident with a literal on the left...', feedback: { correct: 'Correct — if (5 = x) would be a compile error, catching the typo immediately.', incorrect: 'Yoda conditions put the literal first. if (5 = x) errors at compile time, catching the = vs == mistake.' } },
        { id: 'ch7-eq-m4', type: 'mcq', question: 'x == y — what happens to x and y?', options: ['x is assigned the value of y', 'Both are read, neither is changed', 'y is assigned the value of x', 'Both become 0'], correct: ['Both are read, neither is changed'], caseSensitive: false, orderMatters: false, hint: '== never modifies anything.', feedback: { correct: 'Correct — == only reads and compares. No variable is modified.', incorrect: '== is a pure comparison. It reads both values and returns 0 or 1. Neither variable changes.' } },
        { id: 'ch7-eq-m5', type: 'mcq', question: 'Why does the compiler usually NOT warn about if (x = 5)?', options: ['It is a syntax error', 'It is valid C — assignment inside if is allowed', 'The compiler always warns', 'Only modern compilers compile it'], correct: ['It is valid C — assignment inside if is allowed'], caseSensitive: false, orderMatters: false, hint: 'C allows expressions anywhere a value is expected.', feedback: { correct: 'Correct — assignment is a valid expression in C, so it compiles cleanly. Some compilers warn with -Wall.', incorrect: 'Assignment in a condition is legal C. Some compilers warn with -Wall but many do not by default.' } }
      ]
      QuizEngine.init({ containerId: 'quiz-ch7-equalsequals-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-equalsequals-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch7-equalsequals-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should only print "Access granted" when code is 1234, but it always prints it regardless. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode: `int code = 9999;\nif (code = 1234)\n    printf("Access granted\\n");\nelse\n    printf("Wrong code\\n");`,
        checkFn: (output) => output.includes('Wrong code'),
        hint: 'Look at the condition — is it comparing or assigning?',
        hintTwo: 'Change = to ==. The assignment code = 1234 always sets code to 1234 (non-zero = always true).',
        solution: `int code = 9999;\nif (code == 1234)\n    printf("Access granted\\n");\nelse\n    printf("Wrong code\\n");`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, '== vs = — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — COMPARISON OPERATORS
     ══════════════════════════════════════════════════════════ */
  function initTopic_comparison() {
    const topicId = 'ch7-comparison'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch7-comparison-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int a = 5, b = 3;
printf("a == b: %d\\n", a == b);
printf("a != b: %d\\n", a != b);
printf("a >  b: %d\\n", a >  b);
printf("a <  b: %d\\n", a <  b);
printf("a >= b: %d\\n", a >= b);
printf("a <= b: %d\\n", a <= b);
printf("a >= a: %d\\n", a >= a);   /* equal satisfies >= */`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch7-comparison',
      question: 'a >= a printed 1 — a equals itself. Why does >= return true when they are equal?',
      options: [
        'It is a bug in JSCPP',
        '>= means greater than OR equal — equality alone satisfies it',
        'Only < and > check equality',
        '>= always returns 1'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — >= is true when the left is greater than OR equal to the right. 5 >= 5 is true.',
        incorrect: '>= tests two conditions combined: greater than OR equal. Either one being true makes the result 1.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch7-comparison-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch7-comparison-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change a to 3 and b to 3. Before running, predict which operators will now return 1 and which will return 0.',
      includes: ['<stdio.h>'],
      starterCode: `int a = 5, b = 3;
printf("a == b: %d\\n", a == b);
printf("a != b: %d\\n", a != b);
printf("a >  b: %d\\n", a >  b);
printf("a <  b: %d\\n", a <  b);
printf("a >= b: %d\\n", a >= b);
printf("a <= b: %d\\n", a <= b);`,
      checkFn: (output) => {
        const lines = output.trim().split('\n')
        return output.includes('== b: 1') && output.includes('!= b: 0')
      },
      hint: 'When a == b: == is 1, != is 0, > is 0, < is 0, >= is 1, <= is 1.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch7-comparison-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct comparison operator for each condition.',
      includes: ['<stdio.h>'],
      starterCode: `int score = 75;
if (score [?] 60)   printf("Passed\\n");
if (score [?] 100)  printf("Perfect\\n");
if (score [?] 60)   printf("Not passed\\n");`,
      blanks: ['>=', '==', '<'],
      hint: 'Pass = at least 60 (>=). Perfect = exactly 100 (==). Failed = less than 60 (<).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch7-comparison-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'A speed check: int speed = 72.\n① Print "Safe" if speed <= 60\n② Print "Warning" if speed > 60 and speed <= 80\n③ Print "Danger" if speed > 80\nOnly one message should print.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.toLowerCase().includes('warning'),
      hint: 'if (speed <= 60) ... else if (speed <= 80) printf("Warning\\n"); else ...',
      solution: `int speed = 72;\nif (speed <= 60) printf("Safe\\n");\nelse if (speed <= 80) printf("Warning\\n");\nelse printf("Danger\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch7-cp-p1', type: 'predict', question: 'What prints?', code: `printf("%d %d\\n", 5 != 5, 5 != 3);`, correct: ['0 1'], caseSensitive: true, orderMatters: true, hint: '5 != 5 is false. 5 != 3 is true.', feedback: { correct: 'Correct — 5 != 5 is 0, 5 != 3 is 1.', incorrect: '5 != 5 is false (0). 5 != 3 is true (1). Output: 0 1.' } },
        { id: 'ch7-cp-p2', type: 'predict', question: 'What prints?', code: `int x = 10;\nprintf("%d\\n", x >= 10);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: '10 >= 10 — equal satisfies >=.', feedback: { correct: 'Correct — 10 >= 10 is true (equal satisfies >=). Returns 1.', incorrect: '>= includes equality. 10 >= 10 is true = 1.' } },
        { id: 'ch7-cp-p3', type: 'predict', question: 'What prints?', code: `int a = 7, b = 7;\nprintf("%d %d %d\\n", a>b, a==b, a>=b);`, correct: ['0 1 1'], caseSensitive: true, orderMatters: true, hint: 'a and b are equal. a > b? a == b? a >= b?', feedback: { correct: 'Correct — 7>7 is 0, 7==7 is 1, 7>=7 is 1.', incorrect: 'Equal values: 7>7=0, 7==7=1, 7>=7=1. Output: 0 1 1.' } }
      ]
      const mcqQ = [
        { id: 'ch7-cp-m1', type: 'mcq', question: 'Which operator checks "not equal"?', options: ['<>', '!=', '~=', '/='], correct: ['!='], caseSensitive: true, orderMatters: false, hint: 'Exclamation mark + equals.', feedback: { correct: 'Correct — != is the not-equal operator.', incorrect: '!= is not-equal in C. <> is Pascal/VB, ~= is Lua.' } },
        { id: 'ch7-cp-m2', type: 'mcq', question: 'What does 5 >= 5 return?', options: ['0', '1', '5', 'Error'], correct: ['1'], caseSensitive: true, orderMatters: false, hint: 'Equal satisfies >=.', feedback: { correct: 'Correct — 5 >= 5 is true because 5 equals 5.', incorrect: '>= is true when equal. 5 >= 5 = 1 (true).' } },
        { id: 'ch7-cp-m3', type: 'mcq', question: 'What is wrong with: if (1 < x < 10) to check if x is between 1 and 10?', options: ['Nothing — it works correctly', 'It is always true: (1<x) gives 0 or 1, then that is always < 10', 'The < operator does not exist in C', 'It only works for integers'], correct: ['It is always true: (1<x) gives 0 or 1, then that is always < 10'], caseSensitive: false, orderMatters: false, hint: 'What does (1 < x) evaluate to first?', feedback: { correct: 'Correct — (1<x) returns 0 or 1, then C tests if that is < 10. Always true. Use x > 1 && x < 10.', incorrect: '(1<x) returns 0 or 1. Then 0 < 10 and 1 < 10 are both true. Always true! Use && instead.' } },
        { id: 'ch7-cp-m4', type: 'mcq', question: 'Which stores the result of a comparison in a variable?', options: ['bool r = (a > b)', 'int r = (a > b)', 'compare r = (a > b)', 'result r = a > b'], correct: ['int r = (a > b)'], caseSensitive: true, orderMatters: false, hint: 'Comparisons return integers in C.', feedback: { correct: 'Correct — store in int. Comparisons return 0 or 1.', incorrect: 'int r = (a > b) stores the integer result (0 or 1). bool is not built into C89.' } },
        { id: 'ch7-cp-m5', type: 'mcq', question: 'How many of the six comparison operators return 1 when a = 5, b = 5?', options: ['1', '2', '3', '4'], correct: ['3'], caseSensitive: true, orderMatters: false, hint: 'Which ones are true when values are equal?', feedback: { correct: 'Correct — ==, >=, <= all return 1 when values are equal. 3 operators.', incorrect: 'When a == b: == (1), >= (1), <= (1) are true. >, <, != are false. 3 return 1.' } }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Print the result (0 or 1) of all six comparisons for int x=8, int y=12.', check: o => o.includes('0') && o.includes('1'), hint: 'printf("%d\\n", x==y); for each of the 6 operators.', solution: `int x=8,y=12;\nprintf("==: %d\\n",x==y);\nprintf("!=: %d\\n",x!=y);\nprintf(">:  %d\\n",x>y);\nprintf("<:  %d\\n",x<y);\nprintf(">=: %d\\n",x>=y);\nprintf("<=: %d\\n",x<=y);` },
        { id: 'p2', task: 'int temp=37. Print "Normal" if temp >= 36 and temp <= 37. Must use two comparisons with &&.', check: o => o.includes('Normal'), hint: 'if (temp >= 36 && temp <= 37) printf("Normal\\n");', solution: `int temp=37;\nif(temp>=36&&temp<=37)printf("Normal\\n");` },
        { id: 'p3', task: 'int items=0. Print "Empty" if items == 0, "Has items" otherwise.', check: o => o.includes('Empty'), hint: 'if (items == 0) printf("Empty\\n"); else printf("Has items\\n");', solution: `int items=0;\nif(items==0)printf("Empty\\n");else printf("Has items\\n");` },
        { id: 'p4', task: 'int a=5, b=10. Print "a is larger", "b is larger", or "equal" using > < ==.', check: o => o.toLowerCase().includes('b is larger') || o.toLowerCase().includes('larger'), hint: 'if (a > b) ... else if (b > a) ... else ...', solution: `int a=5,b=10;\nif(a>b)printf("a is larger\\n");\nelse if(b>a)printf("b is larger\\n");\nelse printf("equal\\n");` },
        { id: 'p5', task: 'int year=2024. Print "Leap year" if year is divisible by 4 (hint: use modulo and ==). 2024 % 4 should equal 0.', check: o => o.toLowerCase().includes('leap'), hint: 'if (year % 4 == 0) printf("Leap year\\n");', solution: `int year=2024;\nif(year%4==0)printf("Leap year\\n");else printf("Not a leap year\\n");` }
      ]
      renderPracticeCh7('practice-ch7-comparison', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch7-comparison-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-comparison-mcq', questions: mcqQ, onComplete: () => {} })
      CCompiler.initBlock($('compiler-ch7-comparison-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This discount checker gives "Full price" even when discount is 10. Find the operator bug.',
        includes: ['<stdio.h>'],
        starterCode: `int discount = 10;\nif (discount = 0)\n    printf("Full price\\n");\nelse\n    printf("Discounted\\n");`,
        checkFn: (output) => output.includes('Discounted'),
        hint: 'Look at the condition in the if statement carefully.',
        hintTwo: '= 0 assigns 0 to discount (making it false). Change to == 0 to compare.',
        solution: `int discount=10;\nif(discount==0)printf("Full price\\n");\nelse printf("Discounted\\n");`,
        onPass: () => { Progress.saveTopicComplete(CH, topicId) }
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Comparison Operators — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — LOGICAL OPERATORS && || !
     ══════════════════════════════════════════════════════════ */
  function initTopic_logical() {
    const topicId = 'ch7-logical'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch7-logical-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int a = 1, b = 0;
printf("a && b: %d\\n", a && b);   /* AND */
printf("a || b: %d\\n", a || b);   /* OR  */
printf("!a:     %d\\n", !a);       /* NOT */
printf("!b:     %d\\n", !b);
printf("!42:    %d\\n", !42);      /* any non-zero */
printf("a && a: %d\\n", a && a);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch7-logical',
      question: '!42 printed 0, not 1. You might expect NOT of a large number to still be "true". Why is !42 equal to 0?',
      options: [
        'C only accepts 1 as true for the ! operator',
        '! flips any non-zero value to 0, and 0 to 1 — it does not care about the magnitude',
        '42 is too large to be a boolean',
        'It is a JSCPP limitation'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — ! converts: non-zero → 0, zero → 1. The actual value of the non-zero number does not matter. !42 = !(-1) = !(99) = 0.',
        incorrect: '! always maps non-zero → 0 and 0 → 1. It treats all non-zero values identically as "true" and flips them to 0 (false).'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch7-logical-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch7-logical-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Rewrite the condition using && to check if a number is in the range 10–20 (inclusive). Test with int n = 15.',
      includes: ['<stdio.h>'],
      starterCode: `int n = 15;
if (n >= 10)
    if (n <= 20)
        printf("In range\\n");`,
      checkFn: (output) => output.includes('In range'),
      hint: 'Combine both into one condition: if (n >= 10 && n <= 20)',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch7-logical-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the logical operators.',
      includes: ['<stdio.h>'],
      starterCode: `int has_ticket = 1, is_vip = 0, is_staff = 1;

if (has_ticket [?] is_vip)   printf("VIP entry\\n");
if (has_ticket [?] is_staff) printf("Entry allowed\\n");
if ([?]is_vip)                printf("Not VIP\\n");`,
      blanks: ['&&', '||', '!'],
      hint: 'VIP: both ticket AND vip. Entry: ticket OR staff. Not VIP: ! operator.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch7-logical-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build an age-gate check:\n① int age = 17, int has_parent_consent = 1\n② Print "Access granted" if age >= 18 OR has_parent_consent is true\n③ Print "Access denied" if age < 18 AND has_parent_consent is false\n④ Print the actual age beside the result',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.toLowerCase().includes('granted'),
      hint: 'if (age >= 18 || has_parent_consent) printf("Access granted\\n");',
      solution: `int age=17, has_parent_consent=1;\nif(age>=18||has_parent_consent)printf("Access granted (age %d)\\n",age);\nelse printf("Access denied (age %d)\\n",age);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch7-lg-p1', type: 'predict', question: 'What prints?', code: `printf("%d\\n", 1 && 0);`, correct: ['0'], caseSensitive: true, orderMatters: true, hint: 'AND: both must be true.', feedback: { correct: 'Correct — 1 && 0: one is false, AND returns 0.', incorrect: 'AND needs both true. 0 makes it false = 0.' } },
        { id: 'ch7-lg-p2', type: 'predict', question: 'What prints?', code: `printf("%d\\n", 0 || 0 || 1);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: 'OR: any one true is enough.', feedback: { correct: 'Correct — one 1 in an OR chain makes the whole thing 1.', incorrect: 'OR: any non-zero is enough. The final 1 makes it true = 1.' } },
        { id: 'ch7-lg-p3', type: 'predict', question: 'What prints?', code: `int x = 5;\nprintf("%d\\n", !(x > 3));`, correct: ['0'], caseSensitive: true, orderMatters: true, hint: 'x > 3 is true, then ! flips it.', feedback: { correct: 'Correct — x > 3 is 1 (true), !1 = 0.', incorrect: '5 > 3 = 1 (true). !1 = 0 (NOT flips it to false).' } }
      ]
      const mcqQ = [
        { id: 'ch7-lg-m1', type: 'mcq', question: 'What is short-circuit evaluation for &&?', options: ['Evaluates right side first', 'Skips the right side if the left side is false', 'Only works with == operator', 'Rounds the result'], correct: ['Skips the right side if the left side is false'], caseSensitive: false, orderMatters: false, hint: 'If left is already false for AND, what do we know about the result?', feedback: { correct: 'Correct — if left is false, AND cannot be true regardless, so right is skipped.', incorrect: 'Short-circuit: for &&, if left is false, result must be false. Right side is never evaluated.' } },
        { id: 'ch7-lg-m2', type: 'mcq', question: 'What does !0 evaluate to?', options: ['0', '-1', '1', 'Error'], correct: ['1'], caseSensitive: true, orderMatters: false, hint: '! flips 0 to 1.', feedback: { correct: 'Correct — !0 = 1 (NOT false = true).', incorrect: '! maps 0→1 and non-zero→0. !0 = 1.' } },
        { id: 'ch7-lg-m3', type: 'mcq', question: 'a || b: when is it FALSE?', options: ['When a is false', 'When b is false', 'When BOTH a and b are false (zero)', 'When a equals b'], correct: ['When BOTH a and b are false (zero)'], caseSensitive: false, orderMatters: false, hint: 'OR is false only in one situation.', feedback: { correct: 'Correct — OR is false only when all inputs are false.', incorrect: 'OR is false only when every input is 0. One non-zero is enough to make it true.' } },
        { id: 'ch7-lg-m4', type: 'mcq', question: '!5 evaluates to?', options: ['5', '-5', '0', '1'], correct: ['0'], caseSensitive: true, orderMatters: false, hint: '5 is non-zero.', feedback: { correct: 'Correct — !5 = 0. Any non-zero value NOT-ed becomes 0.', incorrect: '! maps non-zero to 0. !5 = 0.' } },
        { id: 'ch7-lg-m5', type: 'mcq', question: 'Which evaluates right side for sure?', options: ['0 && (right)', '1 || (right)', '1 && (right)', '0 || (right)'], correct: ['1 && (right)', '0 || (right)'], caseSensitive: false, orderMatters: false, hint: 'Short-circuit skips when result is already determined.', feedback: { correct: 'Correct — 1&&(right): left is true, AND still needs right. 0||(right): left is false, OR still needs right.', incorrect: '1&&right: must check right (could be false). 0||right: must check right (could be true). These always evaluate right.' } }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'int a=1, b=1. Print the result of a && b, a || b, !a, !b on separate lines.', check: o => o.includes('1') && o.includes('0'), hint: 'printf("%d\\n", a && b); etc.', solution: `int a=1,b=1;\nprintf("%d\\n",a&&b);\nprintf("%d\\n",a||b);\nprintf("%d\\n",!a);\nprintf("%d\\n",!b);` },
        { id: 'p2', task: 'int score=75. Print "Pass with distinction" if score >= 70 AND score <= 100.', check: o => o.toLowerCase().includes('pass'), hint: 'if (score >= 70 && score <= 100)', solution: `int score=75;\nif(score>=70&&score<=100)printf("Pass with distinction\\n");` },
        { id: 'p3', task: 'int is_weekend=0, is_holiday=1. Print "Day off" if either is_weekend OR is_holiday is true.', check: o => o.toLowerCase().includes('day off'), hint: 'if (is_weekend || is_holiday)', solution: `int is_weekend=0,is_holiday=1;\nif(is_weekend||is_holiday)printf("Day off\\n");` },
        { id: 'p4', task: 'int logged_in=1, is_banned=0. Print "Welcome" only if logged_in AND NOT banned.', check: o => o.toLowerCase().includes('welcome'), hint: 'if (logged_in && !is_banned)', solution: `int logged_in=1,is_banned=0;\nif(logged_in&&!is_banned)printf("Welcome\\n");` },
        { id: 'p5', task: 'int x=15. Print "Out of range" if x < 0 OR x > 100. Should NOT print for 15.', check: o => o.trim() === '' || !o.toLowerCase().includes('out'), hint: 'if (x < 0 || x > 100) printf("Out of range\\n"); — 15 is in range so nothing should print.', solution: `int x=15;\nif(x<0||x>100)printf("Out of range\\n");` }
      ]
      renderPracticeCh7('practice-ch7-logical', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch7-logical-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-logical-mcq', questions: mcqQ, onComplete: () => {} })
      CCompiler.initBlock($('compiler-ch7-logical-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print "In range" for x=15, but prints nothing. Fix the range check.',
        includes: ['<stdio.h>'],
        starterCode: `int x = 15;\nif (x > 10 || x < 20)\n    printf("In range\\n");`,
        checkFn: (output) => output.includes('In range'),
        hint: 'Think about whether || or && is the right operator for a range check.',
        hintTwo: '|| means OR — x>10 OR x<20. That is almost always true. Use && (AND) for range checks.',
        solution: `int x=15;\nif(x>10&&x<20)printf("In range\\n");`,
        onPass: () => { Progress.saveTopicComplete(CH, topicId) }
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Logical Operators — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — TRUE AND FALSE EDGE CASES
     ══════════════════════════════════════════════════════════ */
  function initTopic_truefalse() {
    const topicId = 'ch7-truefalse'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch7-truefalse-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `if (0)     printf("0 is true\\n");   else printf("0 is false\\n");
if (1)     printf("1 is true\\n");   else printf("1 is false\\n");
if (-1)    printf("-1 is true\\n");  else printf("-1 is false\\n");
if (100)   printf("100 is true\\n"); else printf("100 is false\\n");
if (0+0)   printf("0+0 true\\n");   else printf("0+0 false\\n");
if (0+1)   printf("0+1 true\\n");   else printf("0+1 false\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch7-truefalse',
      question: '-1 and 100 both printed "true". In some other languages -1 means false. What is C\'s exact rule?',
      options: [
        'Positive numbers are true, negative are false',
        'Numbers above 1 are false, 1 and 0 are the only booleans',
        'Only zero is false — every other value, positive or negative, is true',
        'The rule depends on the data type'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — the rule is binary and simple: exactly zero = false, everything else (any sign, any magnitude) = true.',
        incorrect: 'C\'s rule: 0 is false, everything else is true. -1, -99, 100, 42 are all true. Only 0 is false.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch7-truefalse-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch7-truefalse-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Test three more values: -99, 0.0 (use int i=0), and the expression (2-2). Predict before running.',
      includes: ['<stdio.h>'],
      starterCode: `if (-1) printf("-1 is true\\n"); else printf("-1 is false\\n");`,
      checkFn: (output) => output.toLowerCase().includes('true') || output.toLowerCase().includes('false'),
      hint: 'Add: if (-99) ...; if (i=0) ...; if (2-2) ...;',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch7-truefalse-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in TRUE or FALSE (as 1 or 0) for each expression.',
      includes: ['<stdio.h>'],
      starterCode: `/* What does C evaluate each to? */
int a = !!1;     /* double NOT of 1:    [?] */
int b = !!0;     /* double NOT of 0:    [?] */
int c = !(-5);   /* NOT of -5:          [?] */
printf("%d %d %d\\n", a, b, c);`,
      blanks: ['1', '0', '0'],
      hint: '!!1: !1=0, !0=1. !!0: !0=1, !1=0. !(-5): -5 is non-zero so !(-5)=0.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch7-truefalse-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'A stock system: int stock = 0. Use stock directly in an if condition (not stock == 0) to print "Out of stock" or "In stock".',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.toLowerCase().includes('out'),
      hint: 'if (!stock) printf("Out of stock\\n"); else printf("In stock\\n");',
      solution: `int stock = 0;\nif (!stock) printf("Out of stock\\n"); else printf("In stock\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch7-tf-p1', type: 'predict', question: 'What prints?', code: `if (-100) printf("A\\n"); else printf("B\\n");`, correct: ['A'], caseSensitive: true, orderMatters: true, hint: '-100 is non-zero.', feedback: { correct: 'Correct — -100 is non-zero = true. A prints.', incorrect: 'Non-zero means true. -100 triggers the if branch: A.' } },
        { id: 'ch7-tf-p2', type: 'predict', question: 'What prints?', code: `printf("%d\\n", !!5);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: 'Apply ! twice.', feedback: { correct: 'Correct — !5=0, !0=1. !!5=1 (normalizes to 1).', incorrect: '!5=0 (5 is non-zero so flip to 0). !0=1. !!5=1.' } },
        { id: 'ch7-tf-p3', type: 'predict', question: 'What prints?', code: `int x=0;\nif(x||!x) printf("Y\\n"); else printf("N\\n");`, correct: ['Y'], caseSensitive: true, orderMatters: true, hint: 'What is x || !x when x=0?', feedback: { correct: 'Correct — x=0 so !x=1. 0||1=1 (true). Y prints.', incorrect: 'x=0, !x=1. 0||1=1 (OR with one true). Y prints.' } }
      ]
      const mcqQ = [
        { id: 'ch7-tf-m1', type: 'mcq', question: 'Which of these is FALSE in C?', options: ['-1', '0', '100', 'any expression that equals 0.001'], correct: ['0'], caseSensitive: true, orderMatters: false, hint: 'Only one integer value means false.', feedback: { correct: 'Correct — only 0 is false.', incorrect: 'Only exactly 0 is false. -1 and 100 are non-zero (true). Even 0.001 in a float context is non-zero.' } },
        { id: 'ch7-tf-m2', type: 'mcq', question: 'What does !! (double NOT) do to any non-zero number?', options: ['Doubles it', 'Negates it', 'Normalizes it to 1', 'Returns 0'], correct: ['Normalizes it to 1'], caseSensitive: false, orderMatters: false, hint: '!non-zero = 0, then !0 = 1.', feedback: { correct: 'Correct — !! converts any non-zero to 1, and 0 stays 0. A normalization trick.', incorrect: '!!x: if x is non-zero → !x=0 → !!x=1. If x=0 → !0=1 → !!x=0. Normalizes to 0 or 1.' } },
        { id: 'ch7-tf-m3', type: 'mcq', question: 'if (count) when count=3 — does the body run?', options: ['No — 3 is not 1', 'Yes — 3 is non-zero', 'Only if count was declared as bool', 'Compile error'], correct: ['Yes — 3 is non-zero'], caseSensitive: false, orderMatters: false, hint: 'Non-zero rule.', feedback: { correct: 'Correct — 3 is non-zero = true. Body runs.', incorrect: 'Any non-zero is true. count=3 makes if(count) run.' } },
        { id: 'ch7-tf-m4', type: 'mcq', question: 'What is the practical use of writing if (!ptr) in C programs?', options: ['Checks if ptr is 1', 'Checks if ptr is 0 (null/empty — commonly used for pointer and error checks)', 'Multiplies ptr by -1', 'Prints ptr'], correct: ['Checks if ptr is 0 (null/empty — commonly used for pointer and error checks)'], caseSensitive: false, orderMatters: false, hint: 'Common C idiom for zero-checking.', feedback: { correct: 'Correct — if (!ptr) is a common C idiom meaning "if ptr is null/zero/empty".', incorrect: 'if (!ptr) checks if ptr is 0. This is how C checks for null pointers and similar zero-means-empty patterns.' } },
        { id: 'ch7-tf-m5', type: 'mcq', question: 'int x = 5; int y = !x; What is y?', options: ['5', '-5', '1', '0'], correct: ['0'], caseSensitive: true, orderMatters: false, hint: '!5 flips non-zero to 0.', feedback: { correct: 'Correct — !5 = 0.', incorrect: 'x=5 is non-zero. !non-zero = 0. y = 0.' } }
      ]
      QuizEngine.init({ containerId: 'quiz-ch7-truefalse-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-truefalse-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch7-truefalse-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print "Has items" when count=5, but prints "Empty". Find the logic bug.',
        includes: ['<stdio.h>'],
        starterCode: `int count = 5;\nif (!count)\n    printf("Has items\\n");\nelse\n    printf("Empty\\n");`,
        checkFn: (output) => output.includes('Has items'),
        hint: 'What does !count evaluate to when count=5?',
        hintTwo: '!5=0 (false), so the else branch runs. Remove the ! to check if count is non-zero: if (count)',
        solution: `int count=5;\nif(count)printf("Has items\\n");\nelse printf("Empty\\n");`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'True and False Values — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 6 — COMBINING CONDITIONS
     ══════════════════════════════════════════════════════════ */
  function initTopic_combining() {
    const topicId = 'ch7-combining'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch7-combining-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int x = 15;
/* Range check: x between 10 and 20 */
if (x > 10 && x < 20)  printf("In range 10-20\\n");

/* Multiple exact values via OR */
if (x == 10 || x == 15 || x == 20) printf("Exact match\\n");

/* Combined: passes test OR is special case */
int vip = 0;
if ((x >= 18 && x <= 65) || vip)   printf("Standard eligible\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch7-combining',
      question: 'The range check used x > 10 && x < 20. Why can\'t you write 10 < x < 20 in C like you would in math?',
      options: [
        'C does not have the < operator',
        '10 < x evaluates to 0 or 1 first, then 0 < 20 and 1 < 20 are both always true',
        'Only <= works for ranges',
        'You need parentheses: (10 < x) < 20'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — C processes left to right. (10 < x) gives 0 or 1, then either 0 < 20 or 1 < 20 — both true. The chain never actually checks if x < 20.',
        incorrect: 'Left to right: (10 < x) = 0 or 1, then that result < 20 is always true. Use && to build a range: x > 10 && x < 20.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch7-combining-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch7-combining-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a grade classifier: given int score = 78, add conditions to print A (90+), B (80-89), C (70-79), F (below 70).',
      includes: ['<stdio.h>'],
      starterCode: `int score = 78;
if (score >= 90) printf("A\\n");`,
      checkFn: (output) => output.trim() === 'C',
      hint: 'else if (score >= 80) printf("B\\n"); else if (score >= 70) printf("C\\n"); else printf("F\\n");',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch7-combining-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the logical operators to build valid combined conditions.',
      includes: ['<stdio.h>'],
      starterCode: `int age = 25, has_license = 1, has_insurance = 1;

/* Can rent a car: age >= 21 AND has license AND has insurance */
if (age >= 21 [?] has_license [?] has_insurance)
    printf("Can rent\\n");

/* Cannot: underage OR no license */
if (age < 21 [?] !has_license)
    printf("Cannot rent\\n");`,
      blanks: ['&&', '&&', '||'],
      hint: 'All three required = &&. Either one disqualifies = ||.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch7-combining-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a blood pressure classifier.\n① int systolic = 135, int diastolic = 88\n② Normal: systolic < 120 AND diastolic < 80\n③ Elevated: systolic 120-129 AND diastolic < 80\n④ High: systolic >= 130 OR diastolic >= 80\n⑤ Print exactly one category',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.toLowerCase().includes('high'),
      hint: 'if (systolic < 120 && diastolic < 80) ... else if (systolic < 130 && diastolic < 80) ... else ...',
      solution: `int s=135,d=88;\nif(s<120&&d<80)printf("Normal\\n");\nelse if(s>=120&&s<130&&d<80)printf("Elevated\\n");\nelse printf("High\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch7-cb-p1', type: 'predict', question: 'What prints? int x=5;', code: `int x=5;\nif(x>0&&x<10)printf("Yes\\n");else printf("No\\n");`, correct: ['Yes'], caseSensitive: true, orderMatters: true, hint: '5 is between 0 and 10.', feedback: { correct: 'Correct — 5>0 true, 5<10 true, && gives true. Yes.', incorrect: '5>0 AND 5<10 are both true. &&: Yes.' } },
        { id: 'ch7-cb-p2', type: 'predict', question: 'What prints? int x=15;', code: `int x=15;\nif(x>0||x<10)printf("A\\n");else printf("B\\n");`, correct: ['A'], caseSensitive: true, orderMatters: true, hint: 'x>0 is already true.', feedback: { correct: 'Correct — x>0 is true, OR short-circuits and returns true. A prints.', incorrect: 'x>0 is true. OR short-circuits: A.' } },
        { id: 'ch7-cb-p3', type: 'predict', question: 'What prints?', code: `int a=1,b=0,c=1;\nprintf("%d\\n",a||b&&c);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: '&& has higher precedence than ||.', feedback: { correct: 'Correct — && before ||: (b&&c)=0, then a||0=1.', incorrect: '&& binds tighter: a||(b&&c) = 1||(0&&1) = 1||0 = 1.' } }
      ]
      const mcqQ = [
        { id: 'ch7-cb-m1', type: 'mcq', question: 'How do you check if x is between 5 and 15 (inclusive) in C?', options: ['5 <= x <= 15', 'x >= 5 && x <= 15', 'x >= 5 || x <= 15', 'between(x, 5, 15)'], correct: ['x >= 5 && x <= 15'], caseSensitive: true, orderMatters: false, hint: 'Both boundaries must be true at the same time.', feedback: { correct: 'Correct — x >= 5 && x <= 15 is the correct C range check.', incorrect: 'Use &&: both conditions must hold simultaneously. 5<=x<=15 does not work in C.' } },
        { id: 'ch7-cb-m2', type: 'mcq', question: 'Which operator has higher precedence: && or ||?', options: ['||', '&&', 'They are equal', 'Depends on the operands'], correct: ['&&'], caseSensitive: true, orderMatters: false, hint: 'AND binds tighter than OR.', feedback: { correct: 'Correct — && has higher precedence. a || b && c means a || (b && c).', incorrect: '&& binds tighter than ||. Like * before + in arithmetic.' } },
        { id: 'ch7-cb-m3', type: 'mcq', question: 'if (x == 5 || x == 10) — what does this check?', options: ['x is between 5 and 10', 'x equals exactly 5 or exactly 10', 'x is 5 and 10 at once', 'x is not 5 or 10'], correct: ['x equals exactly 5 or exactly 10'], caseSensitive: false, orderMatters: false, hint: 'OR of two equality checks.', feedback: { correct: 'Correct — true when x is exactly 5 or exactly 10.', incorrect: 'Two == checks with ||: true if x matches either exact value.' } },
        { id: 'ch7-cb-m4', type: 'mcq', question: 'if (age >= 13 && age <= 17) — what group does this describe?', options: ['Adults', 'Teenagers (13 to 17 inclusive)', 'Children under 13', 'Seniors'], correct: ['Teenagers (13 to 17 inclusive)'], caseSensitive: false, orderMatters: false, hint: 'Read the range carefully.', feedback: { correct: 'Correct — ages 13 through 17 inclusive: teenagers.', incorrect: '>= 13 AND <= 17 includes ages 13, 14, 15, 16, 17 — teenager range.' } },
        { id: 'ch7-cb-m5', type: 'mcq', question: 'What is wrong with: if (a || b && c || d)?', options: ['Nothing — works fine', 'Ambiguous without parentheses — intent is unclear even if C resolves it', 'OR and AND cannot be mixed', '|| and && require booleans'], correct: ['Ambiguous without parentheses — intent is unclear even if C resolves it'], caseSensitive: false, orderMatters: false, hint: 'Think about readability and maintenance.', feedback: { correct: 'Correct — C will resolve it, but the intent is unclear to the next reader. Add parentheses.', incorrect: 'C resolves mixed && and || by precedence, but it makes code hard to read. Always parenthesize complex conditions.' } }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'int x=50. Print "In range" if x >= 1 && x <= 100. Should print.', check: o => o.toLowerCase().includes('in range'), hint: 'if (x >= 1 && x <= 100)', solution: `int x=50;\nif(x>=1&&x<=100)printf("In range\\n");` },
        { id: 'p2', task: 'int day=6. Print "Weekend" if day == 6 || day == 7. (6=Sat, 7=Sun)', check: o => o.toLowerCase().includes('weekend'), hint: 'if (day == 6 || day == 7)', solution: `int day=6;\nif(day==6||day==7)printf("Weekend\\n");` },
        { id: 'p3', task: 'int temp=72. Print "Comfortable" if temp >= 65 && temp <= 80.', check: o => o.toLowerCase().includes('comfortable'), hint: 'if (temp >= 65 && temp <= 80)', solution: `int temp=72;\nif(temp>=65&&temp<=80)printf("Comfortable\\n");` },
        { id: 'p4', task: 'int score=55. Classify: A(90+), B(80-89), C(70-79), D(60-69), F(below 60). Print the correct letter.', check: o => o.trim() === 'F', hint: 'Use else if chain. 55 < 60 so F.', solution: `int s=55;\nif(s>=90)printf("A\\n");\nelse if(s>=80)printf("B\\n");\nelse if(s>=70)printf("C\\n");\nelse if(s>=60)printf("D\\n");\nelse printf("F\\n");` },
        { id: 'p5', task: 'int x=5. Print "Out of range" if x < 0 OR x > 10. Print "In range" otherwise.', check: o => o.toLowerCase().includes('in range'), hint: 'if (x < 0 || x > 10) ... else ...', solution: `int x=5;\nif(x<0||x>10)printf("Out of range\\n");\nelse printf("In range\\n");` }
      ]
      renderPracticeCh7('practice-ch7-combining', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch7-combining-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-combining-mcq', questions: mcqQ, onComplete: () => {} })
      CCompiler.initBlock($('compiler-ch7-combining-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print "Valid age" only for age=25, but prints it for any positive age. Fix the range bug.',
        includes: ['<stdio.h>'],
        starterCode: `int age = 25;\nif (age > 0 || age <= 30)\n    printf("Valid age\\n");`,
        checkFn: (output) => output.includes('Valid age'),
        hint: 'What does || do here vs what is intended?',
        hintTwo: 'age > 0 || age <= 30: || means either condition. Any positive age satisfies age>0 alone. Use &&.',
        solution: `int age=25;\nif(age>0&&age<=30)printf("Valid age\\n");`,
        onPass: () => { Progress.saveTopicComplete(CH, topicId) }
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Combining Conditions — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 7 — TRUTH TABLES
     ══════════════════════════════════════════════════════════ */
  function initTopic_truth() {
    const topicId = 'ch7-truth'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch7-truth-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `/* All 4 combinations of A=0/1, B=0/1 */
int a, b;
printf("A B | A&&B | A||B | !A\\n");
printf("----+------+------+----\\n");
for (a = 0; a <= 1; a++) {
    for (b = 0; b <= 1; b++) {
        printf("%d %d |  %d   |  %d   |  %d\\n",
               a, b, a&&b, a||b, !a);
    }
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch7-truth',
      question: 'From the truth table: AND returns 1 in only 1 row, OR returns 0 in only 1 row. What is the pattern?',
      options: [
        'AND is more permissive than OR',
        'AND is strict (needs all true), OR is lenient (needs any true)',
        'They behave identically for most inputs',
        'AND is faster to evaluate'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — AND has one true row (all inputs true). OR has one false row (all inputs false). AND is strict, OR is lenient.',
        incorrect: 'AND is strict: the only true row is when ALL inputs are 1. OR is lenient: the only false row is when ALL inputs are 0.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch7-truth-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch7-truth-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a column for !(a && b) (NAND) to the truth table. NAND is the opposite of AND.',
      includes: ['<stdio.h>'],
      starterCode: `int a, b;
for (a = 0; a <= 1; a++) {
    for (b = 0; b <= 1; b++) {
        printf("A=%d B=%d AND=%d OR=%d\\n", a, b, a&&b, a||b);
    }
}`,
      checkFn: (output) => output.includes('NAND') || output.includes('nand') || (output.match(/1/g) || []).length >= 3,
      hint: 'Add !(a&&b) to the printf: printf("... NAND=%d\\n", a, b, a&&b, a||b, !(a&&b));',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch7-truth-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the expected results for each row of the truth table.',
      includes: ['<stdio.h>'],
      starterCode: `/* A=0, B=0: AND=[?], OR=[?] */
/* A=0, B=1: AND=[?], OR=[?] */
/* A=1, B=0: AND=[?], OR=[?] */
/* A=1, B=1: AND=[?], OR=[?] */
printf("%d %d %d %d\\n", 0&&0, 0||0, 1&&0, 1||0);`,
      blanks: ['0', '0', '0', '1', '0', '1', '1', '1'],
      hint: 'AND: only 1,1 gives 1. OR: only 0,0 gives 0.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch7-truth-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a 3-input truth table for A && B && C.\n① Loop a, b, c from 0 to 1\n② Print each combination and its AND result\n③ There should be 8 rows total (2³)',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 8 && output.includes('1 1 1')
      },
      hint: 'Three nested for loops: for(a=0;a<=1;a++) for(b=0;...) for(c=0;...) printf("%d %d %d | %d\\n", a,b,c, a&&b&&c);',
      solution: `int a,b,c;\nfor(a=0;a<=1;a++)\n  for(b=0;b<=1;b++)\n    for(c=0;c<=1;c++)\n      printf("%d %d %d | %d\\n",a,b,c,a&&b&&c);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch7-tt-p1', type: 'predict', question: 'What is 0 && 1?', code: `printf("%d\\n", 0 && 1);`, correct: ['0'], caseSensitive: true, orderMatters: true, hint: 'AND needs both true.', feedback: { correct: 'Correct — 0 AND anything = 0.', incorrect: 'AND: 0 on left → result is 0 (short-circuit).' } },
        { id: 'ch7-tt-p2', type: 'predict', question: 'What is 0 || 1?', code: `printf("%d\\n", 0 || 1);`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: 'OR needs one true.', feedback: { correct: 'Correct — OR: 1 is non-zero, result is 1.', incorrect: 'OR: one non-zero is enough. 0||1=1.' } },
        { id: 'ch7-tt-p3', type: 'predict', question: 'What prints?', code: `printf("%d\\n", !(0 || 0));`, correct: ['1'], caseSensitive: true, orderMatters: true, hint: '0||0=0, then !0=1.', feedback: { correct: 'Correct — 0||0=0 (all false OR), !0=1.', incorrect: '0||0=0 (false), !(0)=1.' } }
      ]
      const mcqQ = [
        { id: 'ch7-tt-m1', type: 'mcq', question: 'For A && B, how many of the 4 input combinations give 1?', options: ['1', '2', '3', '4'], correct: ['1'], caseSensitive: true, orderMatters: false, hint: 'AND is strict.', feedback: { correct: 'Correct — only (1,1) gives 1 for AND.', incorrect: 'AND: only 1&&1=1. Other 3 combinations give 0.' } },
        { id: 'ch7-tt-m2', type: 'mcq', question: 'For A || B, how many of the 4 input combinations give 0?', options: ['1', '2', '3', '4'], correct: ['1'], caseSensitive: true, orderMatters: false, hint: 'OR is lenient.', feedback: { correct: 'Correct — only (0,0) gives 0 for OR.', incorrect: 'OR: only 0||0=0. The other 3 combinations give 1.' } },
        { id: 'ch7-tt-m3', type: 'mcq', question: 'NOT(A AND B) is also called?', options: ['NOR', 'NAND', 'XOR', 'XNOR'], correct: ['NAND'], caseSensitive: true, orderMatters: false, hint: 'NOT + AND = ?', feedback: { correct: 'Correct — NAND = NOT AND. It is opposite of AND.', incorrect: 'NOT AND = NAND. It is true for all combinations except (1,1).' } },
        { id: 'ch7-tt-m4', type: 'mcq', question: 'With 3 boolean inputs, how many rows does the truth table have?', options: ['3', '6', '8', '9'], correct: ['8'], caseSensitive: true, orderMatters: false, hint: '2 to the power of 3.', feedback: { correct: 'Correct — 2³ = 8 rows for 3 inputs.', incorrect: '2 inputs = 4 rows (2²). 3 inputs = 8 rows (2³). n inputs = 2ⁿ rows.' } },
        { id: 'ch7-tt-m5', type: 'mcq', question: 'What is the result of (1 && 1) || (0 && 1)?', options: ['0', '1', '2', 'Error'], correct: ['1'], caseSensitive: true, orderMatters: false, hint: 'Evaluate each && group first.', feedback: { correct: 'Correct — (1&&1)=1, (0&&1)=0, 1||0=1.', incorrect: '(1&&1)=1, (0&&1)=0, then 1||0=1.' } }
      ]
      const identifyQ = [
        { id: 'ch7-tt-id1', type: 'identify', question: 'What operator returns 1 only when ALL inputs are true?', correct: ['&&', 'and', 'logical and', 'AND'], caseSensitive: false, orderMatters: false, hint: 'The strict one.', feedback: { correct: 'Correct — && (AND) requires all inputs to be true.', incorrect: '&& (logical AND) is true only when all inputs are non-zero.' } },
        { id: 'ch7-tt-id2', type: 'identify', question: 'What operator flips true to false and false to true?', correct: ['!', 'not', 'logical not', 'NOT'], caseSensitive: false, orderMatters: false, hint: 'One character.', feedback: { correct: 'Correct — ! (logical NOT) inverts the boolean value.', incorrect: '! (logical NOT) flips 0 to 1 and non-zero to 0.' } }
      ]
      QuizEngine.init({ containerId: 'quiz-ch7-truth-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-truth-mcq', questions: mcqQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch7-truth-identify', questions: identifyQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch7-truth-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This access control gives everyone admin access. Fix the logic.',
        includes: ['<stdio.h>'],
        starterCode: `int is_admin = 0, is_logged_in = 1;\nif (is_admin || is_logged_in)\n    printf("Admin access\\n");\nelse\n    printf("Standard access\\n");`,
        checkFn: (output) => output.includes('Standard access'),
        hint: 'Should admin access require BOTH admin AND logged in, or just either?',
        hintTwo: 'Change || to &&. Admin access should require is_admin AND is_logged_in — both true.',
        solution: `int is_admin=0,is_logged_in=1;\nif(is_admin&&is_logged_in)printf("Admin access\\n");\nelse printf("Standard access\\n");`,
        onPass: () => {}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Truth Tables — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     CHAPTER 7 MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch7-mastery'), {
      mode: 'build',
      topicId: 'ch7-mastery',
      chapterId: CH,
      question: 'Build a complete eligibility checker for a loan application.\n\n① int age = 25, int income = 45000, int credit_score = 680, int has_debt = 0\n② Must be 18+ AND income >= 30000 AND credit_score >= 650 → "Eligible"\n③ Eligible but has_debt → "Eligible with review"\n④ Not eligible → print which condition(s) failed\n⑤ Use ==, !=, >=, &&, ||, ! correctly throughout',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.toLowerCase().includes('eligible'),
      hint: 'int eligible = (age >= 18 && income >= 30000 && credit_score >= 650); if (eligible && !has_debt) ...',
      solution: `int age=25, income=45000, credit_score=680, has_debt=0;\nint eligible=(age>=18&&income>=30000&&credit_score>=650);\nif(eligible&&!has_debt) printf("Eligible\\n");\nelse if(eligible&&has_debt) printf("Eligible with review\\n");\nelse {\n  if(age<18) printf("Too young\\n");\n  if(income<30000) printf("Low income\\n");\n  if(credit_score<650) printf("Low credit\\n");\n}`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch7-chapter-complete').style.display = 'block'
        $('ch7-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch7-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch8')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE SET HELPER (modal context — DOM exists when called)
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh7(containerId, chapterId, topicId, configs) {
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
      header.innerHTML = `<span class="practice-task__num">Task ${i+1} of ${configs.length}</span><span class="practice-task__dots">${configs.map((_,j)=>`<span class="dot ${j<i?'dot--done':j===i?'dot--active':''}"></span>`).join('')}</span>`
      container.appendChild(header)

      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      container.appendChild(desc)

      const div = document.createElement('div')
      div.id = `pc7-${topicId}-${cfg.id}`
      container.appendChild(div)

      CCompiler.initBlock(div, {
        mode: 'build', topicId: topicId+'-p-'+cfg.id, chapterId,
        question: null, includes: ['<stdio.h>'], starterCode: '',
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
    initTopic_booleans()
    initTopic_equalsequals()
    initTopic_comparison()
    initTopic_logical()
    initTopic_truefalse()
    initTopic_combining()
    initTopic_truth()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
