/* =========================================================
   C LEARNING PLATFORM — chapters/ch5-operators/ch5.js
   Chapter 5: Operators
   6 topics · Full 7-step active learning + assessment blocks
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch5'

  function $(id) { return document.getElementById(id) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — ARITHMETIC OPERATORS + - * / %
     ══════════════════════════════════════════════════════════ */
  function initTopic_arithmetic() {
    const topicId = 'ch5-arithmetic'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch5-arithmetic-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int a = 10, b = 3;
printf("a + b = %d\\n", a + b);
printf("a - b = %d\\n", a - b);
printf("a * b = %d\\n", a * b);
printf("a / b = %d\\n", a / b);
printf("a %% b = %d\\n", a % b);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch5-arithmetic',
      question: '10 / 3 printed 3, not 3.33. What happened to the decimal part?',
      options: [
        'C rounded to the nearest integer',
        'The decimal was dropped — integer division truncates toward zero',
        'You need to add a decimal point to the result',
        'This is a compiler bug'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — integer ÷ integer = integer in C. The decimal is simply dropped, not rounded.',
        incorrect: 'C performs integer division when both operands are integers. The decimal is truncated (dropped). 10/3 = 3, not 3.33 or 4.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch5-arithmetic-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch5-arithmetic-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change a to 17 and b to 5. Predict all five results before running. Then verify.',
      includes: ['<stdio.h>'],
      starterCode: `int a = 10, b = 3;
printf("a + b = %d\\n", a + b);
printf("a - b = %d\\n", a - b);
printf("a * b = %d\\n", a * b);
printf("a / b = %d\\n", a / b);
printf("a %% b = %d\\n", a % b);`,
      checkFn: (output) => output.includes('22') && output.includes('12') && output.includes('85') && output.includes('3') && output.includes('2'),
      hint: '17+5=22, 17-5=12, 17*5=85, 17/5=3 (integer division!), 17%5=2 (remainder)',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch5-arithmetic-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the operators to compute sum, product, and remainder.',
      includes: ['<stdio.h>'],
      starterCode: `int x = 12, y = 5;
printf("Sum:       %d\\n", x [?] y);
printf("Product:   %d\\n", x [?] y);
printf("Remainder: %d\\n", x [?] y);`,
      blanks: ['+', '*', '%'],
      hint: 'Sum uses +, product uses *, remainder uses %',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch5-arithmetic-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program that reads a number of seconds (use: int seconds = 7384;) and prints it broken down into hours, minutes, and remaining seconds.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('2') && output.includes('3') && output.includes('4'),
      hint: 'hours = seconds / 3600. minutes = (seconds % 3600) / 60. remaining = seconds % 60.',
      solution: `int seconds = 7384;\nint hours = seconds / 3600;\nint minutes = (seconds % 3600) / 60;\nint remaining = seconds % 60;\nprintf("%d hours, %d minutes, %d seconds\\n", hours, minutes, remaining);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    /* Assessment */
    const predictQ = [
      {
        id: 'ch5-ar-p1', type: 'predict',
        question: 'What prints?',
        code: `int x = 9, y = 4;\nprintf("%d %d\\n", x/y, x%y);`,
        correct: ['2 1'],
        caseSensitive: true, orderMatters: true,
        hint: '9÷4 = 2 remainder 1',
        feedback: { correct: 'Correct — 9/4 = 2 (integer), 9%4 = 1 (remainder).', incorrect: 'Integer division: 9/4 = 2. Remainder: 9%4 = 1. Output: 2 1' }
      },
      {
        id: 'ch5-ar-p2', type: 'predict',
        question: 'What prints?',
        code: `printf("%d\\n", 2 + 3 * 4);`,
        correct: ['14'],
        caseSensitive: true, orderMatters: true,
        hint: 'Multiplication before addition.',
        feedback: { correct: 'Correct — * before +: 2 + (3*4) = 2 + 12 = 14', incorrect: '3*4=12 first, then 2+12=14. Precedence: * before +.' }
      },
      {
        id: 'ch5-ar-p3', type: 'predict',
        question: 'What prints?',
        code: `int n = 100;\nprintf("%d\\n", n % 7);`,
        correct: ['2'],
        caseSensitive: true, orderMatters: true,
        hint: '100 ÷ 7 = 14 remainder ?',
        feedback: { correct: 'Right — 100 = 7×14 + 2. So 100%7 = 2.', incorrect: '7 × 14 = 98. 100 - 98 = 2. So 100%7 = 2.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch5-ar-m1', type: 'mcq',
        question: 'What does 13 % 5 evaluate to?',
        options: ['2', '3', '1', '0'],
        correct: ['3'], caseSensitive: true, orderMatters: false,
        hint: '5 goes into 13 twice (=10). What is left?',
        feedback: { correct: 'Correct — 5×2=10, 13-10=3. The remainder is 3.', incorrect: '13 ÷ 5 = 2 remainder 3. So 13%5 = 3.' }
      },
      {
        id: 'ch5-ar-m2', type: 'mcq',
        question: 'Which operator gives the remainder after integer division?',
        options: ['/', '%', '//', '//'],
        correct: ['%'], caseSensitive: true, orderMatters: false,
        hint: 'It looks like a percent sign.',
        feedback: { correct: 'Correct — % is the modulo operator. It gives the remainder.', incorrect: '% is the modulo operator. / gives the quotient, % gives the remainder.' }
      },
      {
        id: 'ch5-ar-m3', type: 'mcq',
        question: 'int x = 7 / 2; — What is the value of x?',
        options: ['3.5', '3', '4', '3.0'],
        correct: ['3'], caseSensitive: true, orderMatters: false,
        hint: 'Both operands are integers.',
        feedback: { correct: 'Correct — 7 and 2 are both ints, so the result is integer division: 3 (decimal dropped).', incorrect: 'Integer division: 7/2 = 3. The decimal is truncated. To get 3.5, use 7.0/2 or (float)7/2.' }
      },
      {
        id: 'ch5-ar-m4', type: 'mcq',
        question: 'What does modulo % help check?',
        options: ['Whether a number is prime', 'Whether a number is even or odd', 'Division precision', 'Float conversion'],
        correct: ['Whether a number is even or odd'], caseSensitive: false, orderMatters: false,
        hint: 'Even numbers have a specific remainder when divided by 2.',
        feedback: { correct: 'Correct — n%2 == 0 means even, n%2 == 1 means odd.', incorrect: 'n%2 gives 0 for even, 1 for odd. This is the classic even/odd check in C.' }
      },
      {
        id: 'ch5-ar-m5', type: 'mcq',
        question: 'What is the result of -7 / 2 in C?',
        options: ['3', '-3', '-4', '-3.5'],
        correct: ['-3'], caseSensitive: true, orderMatters: false,
        hint: 'C truncates toward zero for integer division.',
        feedback: { correct: 'Correct — C truncates toward zero: -7/2 = -3.5 → truncated to -3.', incorrect: '-7/2 = -3.5, truncated toward zero = -3 (not -4). C always truncates toward zero.' }
      }
    ]

    const practiceConfigs = [
      { id: 'p1', task: 'Declare a=25, b=7. Print the result of a/b and a%b on the same line separated by a space.', check: o => o.includes('3') && o.includes('4'), hint: 'printf("%d %d\\n", a/b, a%b);', solution: `int a=25,b=7;\nprintf("%d %d\\n",a/b,a%b);` },
      { id: 'p2', task: 'Given price=87 and quantity=4, print the total cost.', check: o => o.includes('348'), hint: 'total = price * quantity. printf it with %d.', solution: `int price=87,qty=4;\nprintf("Total: %d\\n",price*qty);` },
      { id: 'p3', task: 'Print whether 42 is even or odd using the modulo operator. Print "even" or "odd".', check: o => o.toLowerCase().includes('even'), hint: 'if (42 % 2 == 0) printf("even"); else printf("odd");', solution: `if(42%2==0)printf("even\\n");else printf("odd\\n");` },
      { id: 'p4', task: 'A baker has 145 cookies and packs them in boxes of 12. Print how many full boxes and how many cookies remain.', check: o => o.includes('12') && o.includes('1'), hint: 'boxes = 145/12; remainder = 145%12;', solution: `int cookies=145,box=12;\nprintf("Boxes: %d, Remaining: %d\\n",cookies/box,cookies%box);` },
      { id: 'p5', task: 'Print a multiplication table row for 6: 6×1 through 6×5, one per line, in the format "6 x 1 = 6".', check: o => o.includes('6') && o.includes('12') && o.includes('30'), hint: 'Five printf statements: printf("6 x %d = %d\\n", i, 6*i);', solution: `int i;\nfor(i=1;i<=5;i++)printf("6 x %d = %d\\n",i,6*i);` }
    ]

    renderPracticeSet('practice-ch5-arithmetic', CH, topicId, practiceConfigs)
    QuizEngine.init({ containerId: 'quiz-ch5-arithmetic-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch5-arithmetic-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch5-arithmetic-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program is supposed to print the average of 3 numbers but it gives the wrong answer. Find the bug.',
      includes: ['<stdio.h>'],
      starterCode: `int a = 10, b = 20, c = 30;
float avg = a + b + c / 3;
printf("Average: %.1f\\n", avg);`,
      checkFn: (output) => output.includes('20'),
      hint: 'Look at the operator precedence. Division happens before addition.',
      hintTwo: 'Without parentheses: a + b + (c/3) = 10+20+10 = 40. You need: (a+b+c)/3. Add parentheses.',
      solution: `int a=10,b=20,c=30;\nfloat avg=(a+b+c)/3.0;\nprintf("Average: %.1f\\n",avg);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — INTEGER vs FLOAT DIVISION
     ══════════════════════════════════════════════════════════ */
  function initTopic_division() {
    const topicId = 'ch5-division'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch5-division-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int a = 7, b = 2;

/* All three divide 7 by 2 — different results */
int    r1 = a / b;
float  r2 = a / b;
float  r3 = (float)a / b;

printf("int    / int   = %d\\n",   r1);
printf("float  = int/int = %.1f\\n", r2);
printf("(float)int/int = %.1f\\n",  r3);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch5-division',
      question: 'r2 is declared as float but still got 3.0, not 3.5. Why did storing in float not help?',
      options: [
        'float cannot hold decimals',
        'The division 7/2 happens first (integer ÷ integer = 3), then 3 is stored as 3.0',
        'r2 needs to be declared as double instead',
        'The compiler made a mistake'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — the calculation happens before the storage. int/int = int (3), which then becomes 3.0f when stored as float. You lost the decimal before it could be saved.',
        incorrect: 'The type of the result variable does not change HOW the calculation is done. 7/2 = integer division = 3 first, then 3 becomes 3.0 when stored. To get 3.5, you must cast before dividing.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch5-division-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch5-division-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Fix this program so it prints 2.5 instead of 2. Use a cast to force float division.',
      includes: ['<stdio.h>'],
      starterCode: `int numerator = 5, denominator = 2;
float result = numerator / denominator;
printf("Result: %.1f\\n", result);`,
      checkFn: (output) => output.includes('2.5'),
      hint: 'Change the division to: (float)numerator / denominator',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch5-division-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the cast to get float division for the grade percentage.',
      includes: ['<stdio.h>'],
      starterCode: `int correct = 17, total = 20;
float pct = [?]correct / total * 100.0;
printf("Score: %.1f%%\\n", pct);`,
      blanks: ['(float)'],
      hint: 'Cast correct to float before dividing: (float)correct',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch5-division-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'A class has 23 students. 17 passed. Print:\n① The pass rate as a float percentage with 1 decimal place\n② How many failed\n③ The failure rate as a float percentage with 1 decimal place',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('73') && output.includes('6') && output.includes('26'),
      hint: 'Pass rate: (float)passed/total*100. Failed: total-passed. Fail rate: (float)failed/total*100.',
      solution: `int total=23, passed=17, failed=23-17;\nfloat pass_pct=(float)passed/total*100;\nfloat fail_pct=(float)failed/total*100;\nprintf("Pass rate: %.1f%%\\n",pass_pct);\nprintf("Failed:    %d\\n",failed);\nprintf("Fail rate: %.1f%%\\n",fail_pct);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch5-dv-p1', type: 'predict',
        question: 'What prints?',
        code: `float r = 5 / 2;\nprintf("%.1f\\n", r);`,
        correct: ['2.0'],
        caseSensitive: true, orderMatters: true,
        hint: 'Both operands of / are integers.',
        feedback: { correct: 'Correct — 5/2 is integer division = 2, stored as 2.0 in float.', incorrect: 'Both 5 and 2 are ints. Integer division gives 2, then stored as 2.0.' }
      },
      {
        id: 'ch5-dv-p2', type: 'predict',
        question: 'What prints?',
        code: `float r = 5.0 / 2;\nprintf("%.1f\\n", r);`,
        correct: ['2.5'],
        caseSensitive: true, orderMatters: true,
        hint: '5.0 is a float literal.',
        feedback: { correct: 'Right — 5.0 is float, so float÷int = float. Result is 2.5.', incorrect: '5.0 is a float literal, so float/int = float. Result: 2.5.' }
      },
      {
        id: 'ch5-dv-p3', type: 'predict',
        question: 'What prints?',
        code: `int a=9, b=4;\nprintf("%.2f\\n", (float)a/b);`,
        correct: ['2.25'],
        caseSensitive: true, orderMatters: true,
        hint: 'Cast a to float before dividing.',
        feedback: { correct: 'Correct — (float)9/4 = 2.25', incorrect: 'Cast makes a float: 9.0/4 = 2.25.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch5-dv-m1', type: 'mcq',
        question: 'float result = 9 / 4; — What is stored in result?',
        options: ['2.25', '2.0', '2', '2.5'],
        correct: ['2.0'], caseSensitive: false, orderMatters: false,
        hint: 'Calculate 9/4 first, then think about storing it.',
        feedback: { correct: 'Correct — 9/4 = 2 (integer division), then 2 is stored as 2.0f.', incorrect: '9/4 = 2 (integer division first). Then 2 becomes 2.0 when stored as float. Not 2.25.' }
      },
      {
        id: 'ch5-dv-m2', type: 'mcq',
        question: 'Which expression correctly computes float division of int a by int b?',
        options: ['float(a/b)', '(float)(a/b)', '(float)a/b', 'a.0/b'],
        correct: ['(float)a/b'], caseSensitive: true, orderMatters: false,
        hint: 'You need to cast BEFORE dividing.',
        feedback: { correct: 'Correct — (float)a casts a to float first, then divides by b as float/int.', incorrect: '(float)(a/b) casts the integer result — too late. (float)a/b casts a first so the division becomes float.' }
      },
      {
        id: 'ch5-dv-m3', type: 'mcq',
        question: 'What is 1 / 3 in C?',
        options: ['0.333', '0', '1', '0.5'],
        correct: ['0'], caseSensitive: true, orderMatters: false,
        hint: 'Both are integers. 1 goes into 3... how many complete times?',
        feedback: { correct: 'Correct — 1/3 = 0 (integer division, 1 is less than 3, quotient = 0).', incorrect: '1 divided by 3 = 0 complete times with remainder 1. Integer division gives 0.' }
      },
      {
        id: 'ch5-dv-m4', type: 'mcq',
        question: 'To get 3.5 from int a=7, int b=2, which works?',
        options: ['a/b', 'float a/b', '(float)a/b', 'a/float b'],
        correct: ['(float)a/b'], caseSensitive: true, orderMatters: false,
        hint: 'The cast must be a C expression.',
        feedback: { correct: 'Correct — (float)a converts a to float before the division.', incorrect: '(float)a/b is the correct syntax. float a/b is not valid C outside a declaration.' }
      },
      {
        id: 'ch5-dv-m5', type: 'mcq',
        question: 'What produces the same result as (float)a/b?',
        options: ['a/(float)b', 'a*1.0/b', 'a/b*1.0', 'All of the first two'],
        correct: ['All of the first two'], caseSensitive: false, orderMatters: false,
        hint: 'Any way to make one operand a float before the division.',
        feedback: { correct: 'Correct — casting either operand works. a*1.0/b also works. a/b*1.0 does NOT work because a/b is done first.', incorrect: 'Casting either operand promotes the other. a/(float)b and a*1.0/b both work. But a/b*1.0 is too late.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch5-division-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch5-division-mcq', questions: mcqQ, onComplete: () => {} })

    CCompiler.initBlock($('compiler-ch5-division-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This average calculator gives wrong results. Find and fix the integer division bug.',
      includes: ['<stdio.h>'],
      starterCode: `int score1 = 88, score2 = 73, score3 = 91;
float avg = score1 + score2 + score3 / 3;
printf("Average: %.1f\\n", avg);`,
      checkFn: (output) => output.includes('84'),
      hint: 'Two problems: precedence and integer division. Add parentheses and cast.',
      hintTwo: 'score3/3 runs first due to precedence. Fix: (float)(score1+score2+score3)/3',
      solution: `int s1=88,s2=73,s3=91;\nfloat avg=(float)(s1+s2+s3)/3;\nprintf("Average: %.1f\\n",avg);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — ASSIGNMENT OPERATORS += -= *= /= %=
     ══════════════════════════════════════════════════════════ */
  function initTopic_assignment() {
    const topicId = 'ch5-assignment'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch5-assignment-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int x = 100;
printf("Start: %d\\n", x);
x += 20;
printf("After += 20: %d\\n", x);
x -= 15;
printf("After -= 15: %d\\n", x);
x *= 2;
printf("After *= 2: %d\\n", x);
x /= 3;
printf("After /= 3: %d\\n", x);
x %= 7;
printf("After %%= 7: %d\\n", x);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch5-assignment',
      question: 'After x += 20, x -= 15 gives 105. What does x += 20 mean in plain English?',
      options: [
        'Add x to 20 and print the result',
        'Take x, add 20 to it, and store the result back in x',
        'Create a new variable with value x+20',
        'Assign 20 to x'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — x += 20 is shorthand for x = x + 20. It reads the current value of x, adds 20, and writes it back.',
        incorrect: 'x += 20 means x = x + 20. Read x, add 20 to it, store back into x. It modifies x in place.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch5-assignment-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch5-assignment-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Rewrite all five lines using compound assignment operators instead of the long form. The output must stay identical.',
      includes: ['<stdio.h>'],
      starterCode: `int score = 50;
score = score + 30;
score = score - 10;
score = score * 2;
score = score / 4;
printf("Final: %d\\n", score);`,
      checkFn: (output) => output.includes('35'),
      hint: 'Replace "score = score + 30" with "score += 30", and so on for each line.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch5-assignment-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the compound operators to apply the salary adjustments.',
      includes: ['<stdio.h>'],
      starterCode: `int salary = 50000;
salary [?] 5000;   /* annual raise */
salary [?] 0.9;    /* 10% deduction (integer, drops decimal) */
salary [?] 2;      /* double after promotion */
printf("Final salary: %d\\n", salary);`,
      blanks: ['+=', '*=', '*='],
      hint: 'Raise: +=. Deduction: *=. Double: *=',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch5-assignment-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Simulate a shopping cart. Start with a total of 0. Add three items: 25, 14, and 38. Apply a 10% discount (multiply by 0.9). Print the final total with 2 decimal places. Use compound operators for every operation.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        const n = parseFloat(output)
        return Math.abs(n - 69.3) < 1
      },
      hint: 'float total = 0; total += 25; total += 14; total += 38; total *= 0.9;',
      solution: `float total = 0;\ntotal += 25;\ntotal += 14;\ntotal += 38;\ntotal *= 0.9;\nprintf("Total: %.2f\\n", total);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch5-as-p1', type: 'predict',
        question: 'What prints?',
        code: `int n = 10;\nn *= 3;\nn -= 5;\nprintf("%d\\n", n);`,
        correct: ['25'],
        caseSensitive: true, orderMatters: true,
        hint: '10*3=30, 30-5=25',
        feedback: { correct: 'Correct — 10*3=30, 30-5=25.', incorrect: 'n*=3 → 30. n-=5 → 25.' }
      },
      {
        id: 'ch5-as-p2', type: 'predict',
        question: 'What prints?',
        code: `int x = 20;\nx /= 3;\nprintf("%d\\n", x);`,
        correct: ['6'],
        caseSensitive: true, orderMatters: true,
        hint: 'Integer division.',
        feedback: { correct: 'Correct — 20/3 = 6 (integer division).', incorrect: '20/3 with integers = 6 (truncated).' }
      },
      {
        id: 'ch5-as-p3', type: 'predict',
        question: 'What prints?',
        code: `int a = 7;\na %= 3;\na += 10;\nprintf("%d\\n", a);`,
        correct: ['11'],
        caseSensitive: true, orderMatters: true,
        hint: '7%3=1, 1+10=11',
        feedback: { correct: 'Correct — 7%3=1, then 1+10=11.', incorrect: 'a%=3 → 7%3=1. a+=10 → 1+10=11.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch5-as-m1', type: 'mcq',
        question: 'x -= 5 is equivalent to:',
        options: ['x = 5 - x', 'x = x - 5', 'x = x + (-5)', 'Both B and C'],
        correct: ['Both B and C'], caseSensitive: false, orderMatters: false,
        hint: 'Think about what -= does.',
        feedback: { correct: 'Correct — x -= 5 means x = x - 5, which is also x = x + (-5).', incorrect: 'x -= 5 is x = x - 5. Note: x = 5 - x is different (reversed subtraction).' }
      },
      {
        id: 'ch5-as-m2', type: 'mcq',
        question: 'Which shorthand adds 1 to x?',
        options: ['x =+ 1', 'x += 1', 'x +== 1', 'x =1+'],
        correct: ['x += 1'], caseSensitive: true, orderMatters: false,
        hint: 'Compound assignment: operator then equals sign.',
        feedback: { correct: 'Correct — x += 1 adds 1 to x. (Note: x++ is even shorter.)', incorrect: 'x += 1 is the compound assignment for adding 1.' }
      },
      {
        id: 'ch5-as-m3', type: 'mcq',
        question: 'What does total *= 1.1 do?',
        options: ['Divides total by 1.1', 'Multiplies total by 1.1 (adds 10%)', 'Sets total to 1.1', 'Adds 1.1 to total'],
        correct: ['Multiplies total by 1.1 (adds 10%)'], caseSensitive: false, orderMatters: false,
        hint: 'It is multiplication assignment.',
        feedback: { correct: 'Correct — total *= 1.1 means total = total * 1.1 (a 10% increase).', incorrect: 'total *= 1.1 means total = total * 1.1. Multiplying by 1.1 adds 10%.' }
      },
      {
        id: 'ch5-as-m4', type: 'mcq',
        question: 'int x = 15; x /= 4; — What is x?',
        options: ['3.75', '3', '4', '0'],
        correct: ['3'], caseSensitive: true, orderMatters: false,
        hint: 'Integer /= is still integer division.',
        feedback: { correct: 'Correct — x /= 4 is x = x/4 = 15/4 = 3 (integer division).', incorrect: '15/4 = 3 with integer division (truncated). x /= still performs integer division when both are ints.' }
      },
      {
        id: 'ch5-as-m5', type: 'mcq',
        question: 'Why use x += 5 instead of x = x + 5?',
        options: ['They produce different results', 'x += 5 is shorter and more idiomatic C', 'x = x + 5 is faster', 'x += 5 creates a new variable'],
        correct: ['x += 5 is shorter and more idiomatic C'], caseSensitive: false, orderMatters: false,
        hint: 'They are identical in effect.',
        feedback: { correct: 'Correct — identical result, but += is shorter, clearer, and is the standard C style.', incorrect: 'x += 5 and x = x+5 produce exactly the same result. += is preferred for being concise.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch5-assignment-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch5-assignment-mcq', questions: mcqQ, onComplete: () => {} })

    CCompiler.initBlock($('compiler-ch5-assignment-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program should multiply x by 5 then subtract 3, giving 47. Find the error.',
      includes: ['<stdio.h>'],
      starterCode: `int x = 10;\nx =* 5;\nx -= 3;\nprintf("%d\\n", x);`,
      checkFn: (output) => output.includes('47'),
      hint: 'Look at the compound assignment on line 2. The operator order is wrong.',
      hintTwo: '=* is not a valid operator. The compound multiply is *=, not =*.',
      solution: `int x=10;\nx*=5;\nx-=3;\nprintf("%d\\n",x);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — INCREMENT AND DECREMENT ++ --
     ══════════════════════════════════════════════════════════ */
  function initTopic_increment() {
    const topicId = 'ch5-increment'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch5-increment-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int a = 5;
int b = 5;

/* Prefix: ++a increments first, THEN uses value */
printf("prefix  ++a: %d\\n", ++a);
printf("a after:     %d\\n", a);

/* Postfix: b++ uses value first, THEN increments */
printf("postfix b++: %d\\n", b++);
printf("b after:     %d\\n", b);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch5-increment',
      question: 'Prefix printed 6 and postfix printed 5 — even though both started at 5. What is the key difference?',
      options: [
        'Prefix adds 2, postfix adds 1',
        'Prefix: increment first then use. Postfix: use current value first then increment',
        'Prefix works on the left, postfix on the right of expressions',
        'There is no difference — the results should be the same'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — ++a increments a to 6 THEN evaluates to 6. b++ evaluates to 5 (old value) THEN increments b to 6.',
        incorrect: 'The key difference is when the increment happens. Prefix (++a) increments first. Postfix (b++) uses the current value first, then increments.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch5-increment-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch5-increment-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Replace the long forms (x = x + 1, y = y - 1) with increment and decrement operators. Test both prefix and postfix.',
      includes: ['<stdio.h>'],
      starterCode: `int x = 10;
int y = 10;
x = x + 1;
y = y - 1;
printf("x=%d y=%d\\n", x, y);`,
      checkFn: (output) => output.includes('11') && output.includes('9'),
      hint: 'x = x + 1 becomes x++ (or ++x on its own line — same result). y = y - 1 becomes y-- (or --y).',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch5-increment-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct prefix/postfix forms so the stored values are correct.',
      includes: ['<stdio.h>'],
      starterCode: `int n = 5;
int pre = [?]n;   /* store AFTER increment: should be 6 */
int pos = n[?];   /* store BEFORE increment: should be 6, n becomes 7 */
printf("pre=%d pos=%d n=%d\\n", pre, pos, n);`,
      blanks: ['++', '++'],
      hint: 'Pre: ++n (increment n to 6, store 6). Post: n++ (store current 6, then n becomes 7).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch5-increment-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a simple counter program:\n① Start count at 0\n② Increment it three times using ++\n③ Print the value after each increment\n④ Then decrement twice and print after each\n⑤ Print final value',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 5 && output.includes('3') && output.includes('1')
      },
      hint: 'count=0; count++; printf; count++; printf; count++; printf; count--; printf; count--; printf;',
      solution: `int count=0;\ncount++; printf("Count: %d\\n",count);\ncount++; printf("Count: %d\\n",count);\ncount++; printf("Count: %d\\n",count);\ncount--; printf("Count: %d\\n",count);\ncount--; printf("Count: %d\\n",count);\nprintf("Final: %d\\n",count);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch5-inc-p1', type: 'predict',
        question: 'What prints?',
        code: `int x = 3;\nprintf("%d %d\\n", x++, x);`,
        correct: ['3 4'],
        caseSensitive: true, orderMatters: true,
        hint: 'x++ uses 3 first, then x becomes 4.',
        feedback: { correct: 'Correct — x++ yields 3 (old value), then x is 4.', incorrect: 'x++ evaluates as 3 (old), then increments. So printf gets 3, and x is now 4.' }
      },
      {
        id: 'ch5-inc-p2', type: 'predict',
        question: 'What prints?',
        code: `int n = 8;\nn--;\n--n;\nprintf("%d\\n", n);`,
        correct: ['6'],
        caseSensitive: true, orderMatters: true,
        hint: 'Two decrements on separate lines.',
        feedback: { correct: 'Right — on their own lines, n-- and --n both just subtract 1. 8-1-1=6.', incorrect: 'n-- on its own line = 7. --n on its own line = 6. Output: 6.' }
      },
      {
        id: 'ch5-inc-p3', type: 'predict',
        question: 'What prints?',
        code: `int a=5;\nint b=++a + a++;\nprintf("%d %d\\n",b,a);`,
        correct: ['12 7'],
        caseSensitive: false, orderMatters: true,
        hint: '++a makes a=6 first. Then a++ uses 6, makes a=7. b=6+6=12.',
        feedback: { correct: 'Correct — ++a: a=6, yields 6. a++: yields 6, a=7. b=6+6=12. a=7.', incorrect: '++a increments first (a→6, yields 6). Then a++ uses current 6 (a→7). b=6+6=12.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch5-inc-m1', type: 'mcq',
        question: 'On its own line, int x=5; x++; — what is x after?',
        options: ['5', '6', '4', '55'],
        correct: ['6'], caseSensitive: true, orderMatters: false,
        hint: 'Postfix on its own line adds 1.',
        feedback: { correct: 'Correct — x++ adds 1. On its own line, the old value (5) is unused. x becomes 6.', incorrect: 'x++ increments x. On its own line (not in an expression), it is identical to ++x: x becomes 6.' }
      },
      {
        id: 'ch5-inc-m2', type: 'mcq',
        question: 'int y=10; int z=y++; — What are y and z after?',
        options: ['y=10, z=11', 'y=11, z=10', 'y=11, z=11', 'y=10, z=10'],
        correct: ['y=11, z=10'], caseSensitive: false, orderMatters: false,
        hint: 'Postfix: z gets old value, then y increments.',
        feedback: { correct: 'Correct — z gets the old value (10), then y increments to 11.', incorrect: 'Postfix y++ stores old y(10) in z, then y becomes 11.' }
      },
      {
        id: 'ch5-inc-m3', type: 'mcq',
        question: 'int y=10; int z=++y; — What are y and z after?',
        options: ['y=10, z=11', 'y=11, z=10', 'y=11, z=11', 'y=10, z=10'],
        correct: ['y=11, z=11'], caseSensitive: false, orderMatters: false,
        hint: 'Prefix: y increments first, then z gets the new value.',
        feedback: { correct: 'Correct — ++y increments y to 11 first, then z gets 11.', incorrect: 'Prefix ++y: y becomes 11 first, then z receives 11.' }
      },
      {
        id: 'ch5-inc-m4', type: 'mcq',
        question: 'Where is the difference between prefix and postfix significant?',
        options: ['Only when comparing two variables', 'When used in an expression where the value matters', 'Only in loops', 'There is never a difference'],
        correct: ['When used in an expression where the value matters'], caseSensitive: false, orderMatters: false,
        hint: 'On their own line, they are identical.',
        feedback: { correct: 'Correct — in x = n++ vs x = ++n, the stored value differs. On a standalone line, both just add 1.', incorrect: 'The difference matters when used in expressions that capture the value. On their own line, n++ and ++n are identical.' }
      },
      {
        id: 'ch5-inc-m5', type: 'mcq',
        question: 'In a for loop: for(i=0; i<5; i++) — why is i++ used here instead of ++i?',
        options: ['i++ is required for loops', 'Performance: i++ is faster', 'No functional difference here — both increment i once', 'i++ goes to the next line, ++i stays'],
        correct: ['No functional difference here — both increment i once'], caseSensitive: false, orderMatters: false,
        hint: 'The update expression is evaluated after the loop body, and its value is discarded.',
        feedback: { correct: 'Correct — in the update part of a for loop, i++ and ++i both just increment i. Either works.', incorrect: 'In the for loop update, the value of i++ vs ++i is discarded. Both increment i by 1. No difference in practice.' }
      }
    ]

    const identifyQ = [
      {
        id: 'ch5-inc-id1', type: 'identify',
        question: 'What operator adds 1 to a variable (any form)?',
        correct: ['++', 'increment', 'increment operator'],
        caseSensitive: false, orderMatters: false,
        hint: 'Two of the same character.',
        feedback: { correct: 'Correct — ++ is the increment operator.', incorrect: '++ is the increment operator. x++ or ++x both add 1 to x.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch5-increment-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch5-increment-mcq', questions: mcqQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch5-increment-identify', questions: identifyQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch5-increment-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program intends to print 1 2 3 on separate lines but something is wrong.',
      includes: ['<stdio.h>'],
      starterCode: `int i = 0;
printf("%d\\n", i++);
printf("%d\\n", i++);
printf("%d\\n", i++);`,
      checkFn: (output) => output.includes('1') && output.includes('2') && output.includes('3'),
      hint: 'What is i when the first printf runs? postfix prints current, then increments.',
      hintTwo: 'i starts at 0. Change to start at 1, or use prefix ++i inside printf, or print after incrementing.',
      solution: `int i=1;\nprintf("%d\\n",i++);\nprintf("%d\\n",i++);\nprintf("%d\\n",i++);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — OPERATOR PRECEDENCE
     ══════════════════════════════════════════════════════════ */
  function initTopic_precedence() {
    const topicId = 'ch5-precedence'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch5-precedence-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `printf("%d\\n", 2 + 3 * 4);
printf("%d\\n", (2 + 3) * 4);
printf("%d\\n", 10 - 3 + 2);
printf("%d\\n", 10 / 2 * 3);
printf("%d\\n", 2 + 3 * 4 - 1);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch5-precedence',
      question: 'Line 1 (2+3*4) gave 14, not 20. Line 2 ((2+3)*4) gave 20. What did the parentheses change?',
      options: [
        'Parentheses make C print a different number format',
        'Parentheses force the addition to happen before multiplication',
        'Line 1 is a bug — it should give 20',
        'Parentheses have no effect in C'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — parentheses override the default precedence. Without them, * happens before +. With them, (2+3)=5 happens first, then 5*4=20.',
        incorrect: 'C follows math precedence: * before +. So 2+3*4 = 2+12 = 14. Parentheses force addition first: (2+3)*4 = 5*4 = 20.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch5-precedence-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch5-precedence-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'This computes average wrong due to precedence. Add parentheses so it prints 20.0.',
      includes: ['<stdio.h>'],
      starterCode: `int a = 10, b = 20, c = 30;
float avg = a + b + c / 3.0;
printf("Average: %.1f\\n", avg);`,
      checkFn: (output) => output.includes('20'),
      hint: 'The entire sum must be inside parentheses before dividing: (a + b + c) / 3.0',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch5-precedence-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Add parentheses in the right places to make each expression equal the target value.',
      includes: ['<stdio.h>'],
      starterCode: `/* Target: 20 */
printf("%d\\n", [?]2 + 3[?] * 4);

/* Target: 25 — add parens so all three are added first */
printf("%d\\n", [?]10 + 5 + 10[?] / 5);`,
      blanks: ['(', ')', '(', ')'],
      hint: 'Wrap the addition inside () to force it before multiplication or division.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch5-precedence-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a compound interest calculator. Formula: A = P * (1 + r)^n — but since we do not have pow() yet, use multiplication.\n① P = 1000 (principal)\n② r = 0.05 (5% rate)\n③ year 1: A = P * (1.0 + r)\n④ year 2: A = A * (1.0 + r)\n⑤ year 3: A = A * (1.0 + r)\n⑥ Print each year\'s amount with 2 decimal places',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('1050') && output.includes('1102') && output.includes('1157'),
      hint: 'float A = 1000.0; float r = 0.05; A = A * (1.0 + r); printf("Year 1: %.2f\\n", A);',
      solution: `float P=1000.0, r=0.05, A;\nA = P * (1.0+r); printf("Year 1: %.2f\\n",A);\nA = A * (1.0+r); printf("Year 2: %.2f\\n",A);\nA = A * (1.0+r); printf("Year 3: %.2f\\n",A);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch5-pr-p1', type: 'predict',
        question: 'What prints?',
        code: `printf("%d\\n", 5 + 2 * 3 - 1);`,
        correct: ['10'],
        caseSensitive: true, orderMatters: true,
        hint: '* first, then left to right for + and -',
        feedback: { correct: 'Correct — 2*3=6, then 5+6-1=10.', incorrect: '* before +/-: 2*3=6, then 5+6=11, 11-1=10.' }
      },
      {
        id: 'ch5-pr-p2', type: 'predict',
        question: 'What prints?',
        code: `printf("%d\\n", (5+2) * (3-1));`,
        correct: ['14'],
        caseSensitive: true, orderMatters: true,
        hint: '() first: 7 and 2',
        feedback: { correct: 'Right — (5+2)=7, (3-1)=2, 7*2=14.', incorrect: '(5+2)=7, (3-1)=2, 7*2=14.' }
      },
      {
        id: 'ch5-pr-p3', type: 'predict',
        question: 'What prints?',
        code: `printf("%d\\n", 20 / 4 / 2);`,
        correct: ['2'],
        caseSensitive: true, orderMatters: true,
        hint: 'Left to right: do first division, then second.',
        feedback: { correct: 'Correct — left to right: 20/4=5, then 5/2=2.', incorrect: 'Same precedence → left to right: (20/4)=5, then 5/2=2.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch5-pr-m1', type: 'mcq',
        question: 'Which operators have higher precedence than + and -?',
        options: ['= and +=', '++ and --', '*, /, %', 'All of the above'],
        correct: ['*, /, %'], caseSensitive: false, orderMatters: false,
        hint: 'Think of the standard math precedence rule.',
        feedback: { correct: 'Correct — * / % have higher precedence than + -. (++ -- as postfix are even higher, but the key one to know is * before +).', incorrect: 'The key precedence rule: * / % are evaluated before + -.' }
      },
      {
        id: 'ch5-pr-m2', type: 'mcq',
        question: 'int mid = a + b / 2; — This computes the average of a and b incorrectly. What is wrong?',
        options: ['/ should be *', 'Division happens before addition: b/2 is calculated first', 'b should be cast to float', 'int cannot hold the result'],
        correct: ['Division happens before addition: b/2 is calculated first'], caseSensitive: false, orderMatters: false,
        hint: 'What does / before + mean here?',
        feedback: { correct: 'Correct — b/2 runs first (higher precedence), then a is added. Fix: (a+b)/2.', incorrect: 'b/2 runs first, then added to a. You get a + (b/2), not (a+b)/2. Add parentheses: (a+b)/2.' }
      },
      {
        id: 'ch5-pr-m3', type: 'mcq',
        question: 'When operators have equal precedence, how are they evaluated?',
        options: ['Right to left always', 'Left to right', 'Randomly', 'The compiler decides'],
        correct: ['Left to right'], caseSensitive: false, orderMatters: false,
        hint: 'The same direction you read.',
        feedback: { correct: 'Correct — equal precedence operators evaluate left to right. 10-3+2 = (10-3)+2 = 9.', incorrect: 'Equal precedence: left to right. 10/2*3 = (10/2)*3 = 15.' }
      },
      {
        id: 'ch5-pr-m4', type: 'mcq',
        question: 'What is the safest way to handle complex expressions?',
        options: ['Memorize all precedence rules', 'Use parentheses to make intent explicit', 'Avoid operators', 'Use only + and -'],
        correct: ['Use parentheses to make intent explicit'], caseSensitive: false, orderMatters: false,
        hint: 'Parentheses are free to add.',
        feedback: { correct: 'Correct — parentheses remove all ambiguity. Even if you know the rules, parentheses make code easier to read.', incorrect: 'Parentheses are the safest approach. They override precedence and make intent clear to anyone reading the code.' }
      },
      {
        id: 'ch5-pr-m5', type: 'mcq',
        question: 'What does 2 * 3 + 4 * 5 evaluate to?',
        options: ['50', '26', '70', '46'],
        correct: ['26'], caseSensitive: true, orderMatters: false,
        hint: 'Both multiplications happen before the addition.',
        feedback: { correct: 'Correct — 2*3=6 and 4*5=20 (both first), then 6+20=26.', incorrect: 'Both * before +: 2*3=6, 4*5=20, then 6+20=26.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch5-precedence-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch5-precedence-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch5-precedence-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This tip calculator gives the wrong total. The tip should be 15% of the subtotal. Fix it.',
      includes: ['<stdio.h>'],
      starterCode: `float subtotal = 85.0;
float tip = subtotal * 15 / 100;
float total = subtotal + tip;
printf("Tip: %.2f, Total: %.2f\\n", tip, total);`,
      checkFn: (output) => output.includes('12.75') && output.includes('97.75'),
      hint: 'Actually this looks correct — but try running it. Does it print 12.75 and 97.75?',
      hintTwo: 'The calculation is actually correct here. If it is not giving 12.75, check if there is an issue with the data types. 15/100 = 0 in integer math! Change to 15.0/100.0.',
      solution: `float subtotal=85.0;\nfloat tip=subtotal*15.0/100.0;\nfloat total=subtotal+tip;\nprintf("Tip: %.2f, Total: %.2f\\n",tip,total);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 6 — TYPE MIXING
     ══════════════════════════════════════════════════════════ */
  function initTopic_mixing() {
    const topicId = 'ch5-mixing'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch5-mixing-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int   i = 5;
float f = 2.0;

printf("int + float:  %.1f\\n", i + f);
printf("int * float:  %.1f\\n", i * f);
printf("int / float:  %.1f\\n", i / f);

/* Storing float result in int truncates it */
int t = i + f;
printf("stored in int: %d\\n", t);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch5-mixing',
      question: 'int i=5, float f=2.0: the result of i+f was 7.0, not 7. What happened to the int?',
      options: [
        'The int was rounded to the nearest float',
        'C automatically promoted int to float before computing, giving a float result',
        'The float was converted to int first',
        'The result type depends on which variable is first'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — C promotes int to float before the operation. int+float → float+float → float result.',
        incorrect: 'C promotion: when mixing types, the less precise type is promoted to the more precise one. int becomes float, then float+float = float result.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch5-mixing-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch5-mixing-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a line that mixes int and double, and store the result in a double. Print it with 6 decimal places.',
      includes: ['<stdio.h>'],
      starterCode: `int i = 3;
float f = 2.5;
double d = 1.23456789;
printf("int+float: %.2f\\n", i + f);`,
      checkFn: (output) => output.includes('4.23456789') || output.includes('4.234568'),
      hint: 'double r = i + d; printf("int+double: %.8f\\n", r);',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch5-mixing-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the format specifiers and casts to handle mixed types correctly.',
      includes: ['<stdio.h>'],
      starterCode: `int score = 7, total = 10;
float pct = [?]score / total * 100.0;
printf("Score: [?]%%\\n", pct);

/* Truncation: storing 9.9 in int */
int t = 9.9;
printf("Truncated: [?]\\n", t);`,
      blanks: ['(float)', '%.1f', '%d'],
      hint: 'Cast to float first. Float: %.1f. Int: %d.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch5-mixing-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a BMI calculator.\n① weight = 70 (kg, int)\n② height = 1.75 (m, float)\n③ Compute BMI = weight / (height * height) — be careful about the types!\n④ Print BMI with 2 decimal places\n⑤ Print the category: < 18.5 = Underweight, 18.5-24.9 = Normal, 25+ = Overweight',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('22') && (output.toLowerCase().includes('normal')),
      hint: 'float bmi = weight / (height * height); — weight is int but height is float so it promotes. Then check bmi < 18.5, etc.',
      solution: `int weight = 70;\nfloat height = 1.75;\nfloat bmi = weight / (height * height);\nprintf("BMI: %.2f\\n", bmi);\nif(bmi < 18.5) printf("Underweight\\n");\nelse if(bmi < 25.0) printf("Normal\\n");\nelse printf("Overweight\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch5-mx-p1', type: 'predict',
        question: 'What prints?',
        code: `int a=3;\nfloat b=1.5;\nprintf("%.1f\\n", a*b);`,
        correct: ['4.5'],
        caseSensitive: true, orderMatters: true,
        hint: 'int * float → float',
        feedback: { correct: 'Correct — a is promoted to float, 3.0*1.5=4.5.', incorrect: 'int * float promotes int to float. 3*1.5 = 4.5.' }
      },
      {
        id: 'ch5-mx-p2', type: 'predict',
        question: 'What prints?',
        code: `float f = 9.9;\nint i = f;\nprintf("%d\\n", i);`,
        correct: ['9'],
        caseSensitive: true, orderMatters: true,
        hint: 'Truncation, not rounding.',
        feedback: { correct: 'Correct — 9.9 truncates to 9 (not rounded to 10).', incorrect: 'Storing float in int truncates: 9.9 → 9. C does not round.' }
      },
      {
        id: 'ch5-mx-p3', type: 'predict',
        question: 'What prints?',
        code: `int x=5;\ndouble d=3.3;\nprintf("%.1f\\n", x+d);`,
        correct: ['8.3'],
        caseSensitive: true, orderMatters: true,
        hint: 'int + double → double',
        feedback: { correct: 'Correct — int promoted to double: 5.0+3.3=8.3.', incorrect: 'int is promoted to double. 5+3.3=8.3.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch5-mx-m1', type: 'mcq',
        question: 'When you mix int and float in an expression, which type wins?',
        options: ['int — it is more common', 'float — it is more precise', 'The first type mentioned', 'The type of the result variable'],
        correct: ['float — it is more precise'], caseSensitive: false, orderMatters: false,
        hint: 'The more precise type is preserved.',
        feedback: { correct: 'Correct — C promotes to the more precise type. int is promoted to float.', incorrect: 'The more precise type wins. int + float → float (int is promoted to float before computing).' }
      },
      {
        id: 'ch5-mx-m2', type: 'mcq',
        question: 'What happens when you store a float (3.7) into an int?',
        options: ['Rounds to 4', 'Truncates to 3', 'Compile error', 'Stores as 3.7 without the dot'],
        correct: ['Truncates to 3'], caseSensitive: false, orderMatters: false,
        hint: 'C truncates toward zero — no rounding.',
        feedback: { correct: 'Correct — C truncates (chops off the decimal). 3.7 becomes 3.', incorrect: 'C truncates, not rounds. 3.7 stored as int = 3.' }
      },
      {
        id: 'ch5-mx-m3', type: 'mcq',
        question: 'int i=4; float f=i; — Is this valid, and what is f?',
        options: ['Error: cannot mix types', 'f=4 (int stays int)', 'f=4.0 (int promoted to float)', 'f=0.4 (decimal moved)'],
        correct: ['f=4.0 (int promoted to float)'], caseSensitive: false, orderMatters: false,
        hint: 'Assigning int to float is automatic promotion.',
        feedback: { correct: 'Correct — assigning int to float is an implicit conversion. 4 becomes 4.0.', incorrect: 'int → float is safe implicit promotion. 4 becomes 4.0 in float f.' }
      },
      {
        id: 'ch5-mx-m4', type: 'mcq',
        question: 'int a=5, b=3; double r = a/b; — What is r?',
        options: ['1.666', '1.0', '2.0', '1'],
        correct: ['1.0'], caseSensitive: false, orderMatters: false,
        hint: 'Which types are a and b?',
        feedback: { correct: 'Correct — a/b is int/int = 1 (integer division), then 1 is promoted to 1.0 when stored as double.', incorrect: 'a and b are both ints. int/int = 1 (integer division). 1 stored as double = 1.0.' }
      },
      {
        id: 'ch5-mx-m5', type: 'mcq',
        question: 'What is the promotion order in C (least to most precise)?',
        options: ['float → int → double', 'int → float → double', 'double → float → int', 'All have the same precision'],
        correct: ['int → float → double'], caseSensitive: false, orderMatters: false,
        hint: 'More bytes = more precision.',
        feedback: { correct: 'Correct — when mixing, int is promoted to float which is promoted to double.', incorrect: 'Promotion goes toward more precision: int → float → double.' }
      }
    ]

    const practiceConfigs = [
      { id: 'p1', task: 'Declare int a=9, float b=2.0. Print a/b with 2 decimal places. Result should be 4.50.', check: o => o.includes('4.50') || o.includes('4.5'), hint: 'float result = a/b; printf("%.2f", result);', solution: `int a=9;\nfloat b=2.0;\nfloat r=a/b;\nprintf("%.2f\\n",r);` },
      { id: 'p2', task: 'Show truncation: declare float f=7.9. Store it in int i. Print both f and i to show the difference.', check: o => o.includes('7.9') && o.includes('7') && !o.trim().endsWith('7.9'), hint: 'float f=7.9; int i=f; printf("%.1f %d\\n", f, i);', solution: `float f=7.9;\nint i=f;\nprintf("Float: %.1f, Int: %d\\n",f,i);` },
      { id: 'p3', task: 'Calculate what fraction of 365 days = 52 full weeks, and what the remaining days are. Print both as integers using integer division and modulo.', check: o => o.includes('52') && o.includes('1'), hint: 'int weeks = 365/7; int days = 365%7;', solution: `printf("Weeks: %d, Remaining days: %d\\n", 365/7, 365%7);` },
      { id: 'p4', task: 'Compute the area of a circle with radius 7 (use PI=3.14159). Area = PI * r * r. Print with 2 decimal places.', check: o => o.includes('153.93') || o.includes('153.94'), hint: 'float pi=3.14159; float r=7; printf("%.2f", pi*r*r);', solution: `float pi=3.14159,r=7;\nprintf("Area: %.2f\\n",pi*r*r);` },
      { id: 'p5', task: 'A temperature sensor gives celsius as an integer (28). Convert to Fahrenheit (F = C*9/5 + 32) and print with 1 decimal place. Make sure float division is used.', check: o => o.includes('82.4'), hint: 'float f = celsius*9.0/5.0 + 32; — use 9.0 to force float division.', solution: `int celsius=28;\nfloat f=celsius*9.0/5.0+32;\nprintf("%.1f F\\n",f);` }
    ]

    renderPracticeSet('practice-ch5-mixing', CH, topicId, practiceConfigs)
    QuizEngine.init({ containerId: 'quiz-ch5-mixing-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch5-mixing-mcq', questions: mcqQ, onComplete: () => {} })

    CCompiler.initBlock($('compiler-ch5-mixing-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program should print the GPA as a decimal like 3.67 but prints 3.00. Find the type mixing bug.',
      includes: ['<stdio.h>'],
      starterCode: `int total_points = 11;
int courses = 3;
float gpa = total_points / courses;
printf("GPA: %.2f\\n", gpa);`,
      checkFn: (output) => output.includes('3.67') || output.includes('3.66'),
      hint: 'total_points / courses are both integers — what type of division is this?',
      hintTwo: 'Change to: float gpa = (float)total_points / courses; to force float division.',
      solution: `int tp=11,c=3;\nfloat gpa=(float)tp/c;\nprintf("GPA: %.2f\\n",gpa);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     CHAPTER 5 MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch5-mastery'), {
      mode: 'build',
      topicId: 'ch5-mastery',
      chapterId: CH,
      question: 'Build a complete grade calculator.\n\n① Read four test scores as ints: 78, 91, 65, 88\n② Calculate the sum using += for each\n③ Calculate float average — use a cast to avoid integer division\n④ Use % to check if sum is divisible by 4 exactly\n⑤ Use compound operators to apply a 5% bonus to the average\n⑥ Print: sum, average (2 dec), bonus average (2 dec), and "Exact average" or "Rounded average"',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('322') && output.includes('80.5') && output.includes('84.52') || output.includes('84.5'),
      hint: 'int sum=0; sum+=78; sum+=91; sum+=65; sum+=88; float avg=(float)sum/4; avg*=1.05;',
      solution: `int sum=0;\nsum+=78; sum+=91; sum+=65; sum+=88;\nfloat avg=(float)sum/4;\nfloat bonus=avg*1.05;\nprintf("Sum:    %d\\n",sum);\nprintf("Avg:    %.2f\\n",avg);\nprintf("Bonus:  %.2f\\n",bonus);\nif(sum%4==0) printf("Exact average\\n");\nelse printf("Rounded average\\n");`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch5-chapter-complete').style.display = 'block'
        $('ch5-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch5-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch6')
    })
  }

  /* ══════════════════════════════════════════════════════════
     SHARED UTILITIES
     ══════════════════════════════════════════════════════════ */
  function setupAssessmentTabs(topicId) {
    const block = document.querySelector(`.assessment-block[data-topic="${topicId}"]`)
    if (!block) return
    block.querySelectorAll('.assessment-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const name = tab.dataset.tab
        block.querySelectorAll('.assessment-tab').forEach(t => t.classList.remove('assessment-tab--active'))
        tab.classList.add('assessment-tab--active')
        block.querySelectorAll('.assessment-section').forEach(s => s.classList.remove('assessment-section--active'))
        const target = block.querySelector(`#tab-${name}-${topicId}`)
        if (target) target.classList.add('assessment-section--active')
      })
    })
  }

  function renderPracticeSet(containerId, chapterId, topicId, configs) {
    const container = document.getElementById(containerId)
    if (!container) return
    let idx = 0

    function renderTask(i) {
      if (i >= configs.length) {
        container.innerHTML = '<p class="practice-complete">All coding tasks complete! ✓</p>'
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
      div.id = `pc-${topicId}-${cfg.id}`
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
    initTopic_arithmetic()
    initTopic_division()
    initTopic_assignment()
    initTopic_increment()
    initTopic_precedence()
    initTopic_mixing()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
