/* =========================================================
   C LEARNING PLATFORM — chapters/ch6-type-conversion/ch6.js
   Chapter 6: Type Conversion
   5 topics · 7-step blocks init immediately (inline, unaffected)
   Assessment content is deferred — only initialized AFTER
   Modal.open() inserts it into the DOM (see openAssessmentModal
   in shared.js). Calling QuizEngine.init()/CCompiler.initBlock()
   against the hidden #modal-content-* containers before the modal
   opens would silently no-op, since those ids would either not
   exist yet in the active DOM path or get destroyed/recreated by
   Modal.open()'s innerHTML assignment.
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch6'

  function $(id) { return document.getElementById(id) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — IMPLICIT CONVERSION
     ══════════════════════════════════════════════════════════ */
  function initTopic_implicit() {
    const topicId = 'ch6-implicit'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch6-implicit-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int i = 5;
float f = 2.5;
double d = 1.1;

printf("int+float:  %.1f\\n", i + f);
printf("int+double: %.1f\\n", i + d);
printf("float+double: %.2f\\n", f + d);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch6-implicit',
      question: 'None of these printf calls used a cast, yet every mixed-type expression worked correctly. What converted i (an int) before the addition happened?',
      options: [
        'printf() converts the types automatically',
        'C silently promotes the less precise type to match the more precise one before computing',
        'The %f specifier converts int to float',
        'Nothing was converted — int and float are the same in memory'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — this is implicit conversion. The compiler promotes int to float (or double) automatically whenever they appear together in an expression.',
        incorrect: 'C automatically promotes the less precise type when mixing types in an expression. int + float promotes the int to float before adding. No cast needed — this happens silently.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch6-implicit-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch6-implicit-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a fourth printf that mixes a char with an int (char promotes to int automatically). Use char letter = \'A\'; and print letter + 1 as %d.',
      includes: ['<stdio.h>'],
      starterCode: `int i = 5;
float f = 2.5;
printf("%.1f\\n", i + f);`,
      checkFn: (output) => output.includes('66'),
      hint: 'char letter = \'A\'; printf("%d\\n", letter + 1); — \'A\' is ASCII 65, so this should print 66.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch6-implicit-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct format specifier for each implicit conversion result.',
      includes: ['<stdio.h>'],
      starterCode: `int a = 3;
double b = 2.5;
printf("[?]\\n", a + b);   /* int+double -> double */

char c = 'Z';
printf("[?]\\n", c + 0);    /* char+int -> int */`,
      blanks: ['%.1f', '%d'],
      hint: 'int+double promotes to double: use %.1f or %f. char+int promotes to int: use %d.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch6-implicit-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'A sensor gives an int reading of 340. A calibration factor is 0.92 (float). Multiply them (relying on implicit conversion — no cast needed) and print the result with 2 decimal places.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('312.8'),
      hint: 'int reading = 340; float calibration = 0.92; printf("%.2f\\n", reading * calibration);',
      solution: `int reading = 340;\nfloat calibration = 0.92;\nprintf("%.2f\\n", reading * calibration);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    /* Question banks for the assessment — NOT initialized yet.
       Rendered only when the modal opens (see button handler below). */
    function renderAssessment() {
      const predictQ = [
        { id: 'ch6-im-p1', type: 'predict', question: 'What prints?', code: `int x=4;\ndouble y=1.5;\nprintf("%.1f\\n", x+y);`, correct: ['5.5'], caseSensitive: true, orderMatters: true, hint: 'int promotes to double.', feedback: { correct: 'Right — x is promoted to double, 4.0+1.5=5.5.', incorrect: 'int promotes to double here: 4.0+1.5=5.5.' } },
        { id: 'ch6-im-p2', type: 'predict', question: 'What prints?', code: `char c = 'B';\nprintf("%d\\n", c+1);`, correct: ['67'], caseSensitive: true, orderMatters: true, hint: "'B' is ASCII 66.", feedback: { correct: "Correct — 'B' is 66, char promotes to int for the +, giving 67.", incorrect: "'B' = ASCII 66. char promotes to int: 66+1=67." } },
        { id: 'ch6-im-p3', type: 'predict', question: 'What prints?', code: `float a=2.0;\nint b=3;\nprintf("%.1f\\n", a*b);`, correct: ['6.0'], caseSensitive: true, orderMatters: true, hint: 'int promotes to float.', feedback: { correct: 'Correct — b promotes to float, 2.0*3.0=6.0.', incorrect: 'b is promoted to float: 2.0*3.0=6.0.' } }
      ]
      const mcqQ = [
        { id: 'ch6-im-m1', type: 'mcq', question: 'What is the conversion ladder, least to most precise?', options: ['float → int → double', 'int → float → double', 'double → int → float', 'They are all equal'], correct: ['int → float → double'], caseSensitive: false, orderMatters: false, hint: 'More bytes = more precision.', feedback: { correct: 'Correct — int is promoted to float, which is promoted to double.', incorrect: 'The ladder is int → float → double, from least to most precise.' } },
        { id: 'ch6-im-m2', type: 'mcq', question: 'Does implicit conversion require any special syntax?', options: ['Yes, always (type)', 'No — it happens automatically', 'Only for char', 'Only inside printf()'], correct: ['No — it happens automatically'], caseSensitive: false, orderMatters: false, hint: 'That is what makes it "implicit".', feedback: { correct: 'Correct — implicit conversion needs zero extra syntax. The compiler does it silently.', incorrect: 'Implicit means automatic — no syntax required. That is the defining feature.' } },
        { id: 'ch6-im-m3', type: 'mcq', question: 'int x=5; double y=2.0; double r = x/y; — What is r?', options: ['2.5', '2.0', '2', 'Error'], correct: ['2.5'], caseSensitive: false, orderMatters: false, hint: 'x is promoted before the division happens.', feedback: { correct: 'Correct — x is promoted to double BEFORE dividing, so it is true float division: 5.0/2.0=2.5.', incorrect: 'x is promoted to double before the division runs (not after). 5.0/2.0=2.5.' } },
        { id: 'ch6-im-m4', type: 'mcq', question: 'Why does mixing int and int NOT trigger implicit conversion?', options: ['int cannot be converted', 'Both operands are already the same type — nothing to promote', 'C forbids it', 'It does trigger conversion'], correct: ['Both operands are already the same type — nothing to promote'], caseSensitive: false, orderMatters: false, hint: 'Promotion only happens between DIFFERENT types.', feedback: { correct: 'Correct — implicit conversion only happens when mixing different types. int+int stays int.', incorrect: 'Implicit conversion activates when types differ. int+int has nothing to promote.' } },
        { id: 'ch6-im-m5', type: 'mcq', question: 'Which type always "wins" when mixed with any other numeric type?', options: ['int', 'char', 'double', 'They never mix'], correct: ['double'], caseSensitive: false, orderMatters: false, hint: 'It is the most precise type in this chapter.', feedback: { correct: 'Correct — double is the most precise of int/float/double/char, so it always wins promotion.', incorrect: 'double is the most precise type covered here — everything promotes toward it.' } }
      ]
      QuizEngine.init({ containerId: 'quiz-ch6-implicit-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch6-implicit-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch6-implicit-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 7.5 but prints 7.0. Find the implicit conversion bug.',
        includes: ['<stdio.h>'],
        starterCode: `int a = 5;\nint b = 2;\nfloat result = a + b * 0.5;\nprintf("%.1f\\n", a + b);`,
        checkFn: (output) => output.includes('7.0') || output.includes('7'),
        hint: 'Look closely at the final printf — is it even using "result"?',
        hintTwo: 'The printf prints a+b (both ints = 7), not the "result" variable. Fix: printf("%.1f\\n", result);',
        solution: `int a=5,b=2;\nfloat result=a+b*0.5;\nprintf("%.1f\\n",result);`,
        onPass: () => {}
      })
    }

    $('[data-topic="ch6-implicit"].btn-assessment') // no-op placeholder, real listener below
    const btn1 = document.querySelector('.btn-assessment[data-topic="ch6-implicit"]')
    if (btn1) btn1.addEventListener('click', () => openAssessmentModal(topicId, 'Implicit Conversion — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — EXPLICIT CASTING
     ══════════════════════════════════════════════════════════ */
  function initTopic_explicit() {
    const topicId = 'ch6-explicit'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch6-explicit-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int a = 10, b = 3;
printf("No cast:    %d\\n", a / b);
printf("With cast:  %.4f\\n", (float)a / b);
printf("Cast to int: %d\\n", (int)9.99);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch6-explicit',
      question: '(float)a / b gave 3.3333 while a / b alone gave 3. What exactly does (float) do here?',
      options: [
        'It rounds a to the nearest float',
        'It immediately converts a to a float value before the division operator runs',
        'It tells printf to use more decimals',
        'It has no real effect — the result would be the same either way'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — (float)a converts a right there, before division happens, forcing float division for the whole expression.',
        incorrect: '(float)a immediately converts a to a float value at that exact point in the expression — before the / runs. That forces float division instead of integer division.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch6-explicit-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch6-explicit-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change this so it casts b instead of a, and confirm you get the same correct result (3.3333).',
      includes: ['<stdio.h>'],
      starterCode: `int a = 10, b = 3;
printf("%.4f\\n", (float)a / b);`,
      checkFn: (output) => output.includes('3.3333'),
      hint: 'Casting either operand works: a / (float)b gives the same float division result.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch6-explicit-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the casts to force float division and truncate a result to int.',
      includes: ['<stdio.h>'],
      starterCode: `int correct = 9, total = 12;
float pct = [?]correct / total * 100;
printf("%.1f%%\\n", pct);

float price = 19.95;
int dollars = [?]price;
printf("%d\\n", dollars);`,
      blanks: ['(float)', '(int)'],
      hint: 'Cast correct to float before dividing. Cast price to int to truncate.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch6-explicit-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'A survey has 350 responses, 287 were positive. Cast and compute the positive percentage with 1 decimal place.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('82.0'),
      hint: 'int positive=287, total=350; float pct=(float)positive/total*100;',
      solution: `int positive=287, total=350;\nfloat pct=(float)positive/total*100;\nprintf("%.1f%%\\n", pct);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch6-ex-p1', type: 'predict', question: 'What prints?', code: `printf("%d\\n", (int)4.9);`, correct: ['4'], caseSensitive: true, orderMatters: true, hint: 'Truncates, does not round.', feedback: { correct: 'Correct — (int) truncates, never rounds. 4.9 becomes 4.', incorrect: 'Casts truncate. 4.9 becomes 4, not 5.' } },
        { id: 'ch6-ex-p2', type: 'predict', question: 'What prints?', code: `int a=8,b=5;\nprintf("%.2f\\n",(float)a/b);`, correct: ['1.60'], caseSensitive: true, orderMatters: true, hint: '8/5=1.6', feedback: { correct: 'Correct — (float)8/5 = 1.6, printed with 2 decimals: 1.60', incorrect: '(float)a forces float division: 8.0/5=1.6, shown as 1.60 with %.2f.' } },
        { id: 'ch6-ex-p3', type: 'predict', question: 'What prints?', code: `printf("%d\\n",(int)(3.2+2.9));`, correct: ['6'], caseSensitive: true, orderMatters: true, hint: 'Add first: 3.2+2.9=6.1, then truncate.', feedback: { correct: 'Correct — 3.2+2.9=6.1, then (int) truncates to 6.', incorrect: '3.2+2.9=6.1 first (inside parens), then cast truncates to 6.' } }
      ]
      const mcqQ = [
        { id: 'ch6-ex-m1', type: 'mcq', question: 'What is the syntax for an explicit cast to float?', options: ['float(x)', '(float)x', 'x.float', 'cast<float>(x)'], correct: ['(float)x'], caseSensitive: true, orderMatters: false, hint: 'Type name in parentheses before the value.', feedback: { correct: 'Correct — (float)x is C cast syntax.', incorrect: '(float)x is correct. float(x) is C++ style, not valid in C.' } },
        { id: 'ch6-ex-m2', type: 'mcq', question: '(float)(a/b) vs (float)a/b — what is the difference?', options: ['No difference', 'First casts the int-division RESULT (too late); second casts a operand BEFORE dividing', 'Both are syntax errors', 'First is faster'], correct: ['First casts the int-division RESULT (too late); second casts a operand BEFORE dividing'], caseSensitive: false, orderMatters: false, hint: 'Parentheses change what gets cast.', feedback: { correct: 'Correct — (float)(a/b) casts AFTER int division already happened. (float)a/b casts BEFORE.', incorrect: 'Placement matters: (float)(a/b) is too late (int division already done). (float)a/b casts a first.' } },
        { id: 'ch6-ex-m3', type: 'mcq', question: 'Which gives float division for int a, int b?', options: ['(float)a/b', '(float)(a/b)', 'a/b', 'float a/b'], correct: ['(float)a/b'], caseSensitive: true, orderMatters: false, hint: 'Cast before, not after.', feedback: { correct: 'Correct — casting a operand before the division forces float math.', incorrect: '(float)a/b casts a first. The others either cast too late or not at all.' } },
        { id: 'ch6-ex-m4', type: 'mcq', question: 'What type can you NOT cast a float to using (int)?', options: ['Nothing — int is always valid', 'char', 'double', 'Both B and C are valid targets, this is a trick question'], correct: ['Both B and C are valid targets, this is a trick question'], caseSensitive: false, orderMatters: false, hint: 'You can cast to any numeric type.', feedback: { correct: 'Correct — you can cast a float to int, char, double, etc. All numeric casts are valid in C.', incorrect: 'All numeric types are valid cast targets in C — int, char, double, float, etc.' } },
        { id: 'ch6-ex-m5', type: 'mcq', question: 'You want to round 7.6 to the nearest int (8), not truncate. What do you do?', options: ['(int)7.6', '(int)(7.6+0.5)', 'round(7.6) — always available', '(int)7.6 already rounds'], correct: ['(int)(7.6+0.5)'], caseSensitive: true, orderMatters: false, hint: 'Add 0.5 before truncating, for positive numbers.', feedback: { correct: 'Correct — adding 0.5 before truncating gives manual rounding for positive numbers: (int)(7.6+0.5)=(int)8.1=8.', incorrect: '(int) alone truncates (gives 7). Add 0.5 first: (int)(7.6+0.5)=8.' } }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Declare int x=17, int y=5. Print x/y forced to float with 3 decimal places.', check: o => o.includes('3.400'), hint: 'printf("%.3f\\n", (float)x/y);', solution: `int x=17,y=5;\nprintf("%.3f\\n",(float)x/y);` },
        { id: 'p2', task: 'Cast 12.87 to int and print it. Result should be 12 (truncated, not rounded).', check: o => o.trim() === '12', hint: 'printf("%d\\n", (int)12.87);', solution: `printf("%d\\n",(int)12.87);` },
        { id: 'p3', task: 'Declare int correct=42, int total=50. Print the percentage with exactly 1 decimal place using a cast.', check: o => o.includes('84.0'), hint: '(float)correct/total*100', solution: `int correct=42,total=50;\nprintf("%.1f%%\\n",(float)correct/total*100);` },
        { id: 'p4', task: 'Round 6.3 to the nearest integer manually (not using library functions) and print it. Should give 6.', check: o => o.trim() === '6', hint: '(int)(6.3+0.5)', solution: `printf("%d\\n",(int)(6.3+0.5));` },
        { id: 'p5', task: 'A car travels 245 miles using 9 gallons (both ints). Print miles-per-gallon with 2 decimal places using a proper cast.', check: o => o.includes('27.22'), hint: '(float)miles/gallons', solution: `int miles=245,gallons=9;\nprintf("%.2f mpg\\n",(float)miles/gallons);` }
      ]
      renderPracticeSetCh6('practice-ch6-explicit', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch6-explicit-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch6-explicit-mcq', questions: mcqQ, onComplete: () => {} })
      CCompiler.initBlock($('compiler-ch6-explicit-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 4.50 but prints 4.00. Find the cast placement bug.',
        includes: ['<stdio.h>'],
        starterCode: `int total = 9;\nint count = 2;\nfloat avg = (float)(total / count);\nprintf("%.2f\\n", avg);`,
        checkFn: (output) => output.includes('4.50'),
        hint: 'Where exactly is the (float) cast placed relative to the division?',
        hintTwo: '(float)(total/count) casts AFTER division. Fix: (float)total/count casts BEFORE.',
        solution: `int total=9,count=2;\nfloat avg=(float)total/count;\nprintf("%.2f\\n",avg);`,
        onPass: () => { Progress.saveTopicComplete(CH, topicId) }
      })
    }

    const btn2 = document.querySelector('.btn-assessment[data-topic="ch6-explicit"]')
    if (btn2) btn2.addEventListener('click', () => openAssessmentModal(topicId, 'Explicit Casting — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — INT TO FLOAT CASTING
     ══════════════════════════════════════════════════════════ */
  function initTopic_int2float() {
    const topicId = 'ch6-int2float'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch6-int2float-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int total = 17, count = 3;
float avg_wrong = total / count;
float avg_right = (float)total / count;
printf("Wrong: %.2f\\n", avg_wrong);
printf("Right: %.2f\\n", avg_right);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch6-int2float',
      question: 'avg_wrong is declared as float but still printed 5.00 instead of 5.67. Why did the float type not save it?',
      options: [
        'float cannot hold 5.67',
        'total/count is computed as integer division FIRST (giving 5), then 5 is stored into the float variable',
        'It is a printf formatting bug',
        'avg_wrong needs to be double instead'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — the calculation happens before the assignment. total/count = 5 (integer division) computes first; only then does that 5 get stored as 5.0 in the float variable. Too late to recover the decimal.',
        incorrect: 'The variable type does not change HOW the math is done. total/count runs as integer division (=5) first. Only after that is the result stored into avg_wrong as 5.0.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch6-int2float-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch6-int2float-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'This GPA calculator is broken (gives 3.00 instead of the real decimal). Fix it with a cast.',
      includes: ['<stdio.h>'],
      starterCode: `int total_points = 11;
int num_courses = 3;
float gpa = total_points / num_courses;
printf("GPA: %.2f\\n", gpa);`,
      checkFn: (output) => output.includes('3.67') || output.includes('3.66'),
      hint: 'float gpa = (float)total_points / num_courses;',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch6-int2float-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the cast to fix the batting average calculation.',
      includes: ['<stdio.h>'],
      starterCode: `int hits = 89, at_bats = 312;
float average = [?]hits / at_bats;
printf("%.3f\\n", average);`,
      blanks: ['(float)'],
      hint: 'Cast hits to float before the division.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch6-int2float-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'A delivery company made 1,847 deliveries over 62 days (both ints). Print the average deliveries per day with 2 decimal places, using the correct cast pattern.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('29.79'),
      hint: 'float avg = (float)deliveries / days;',
      solution: `int deliveries=1847, days=62;\nfloat avg=(float)deliveries/days;\nprintf("%.2f\\n", avg);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch6-if-p1', type: 'predict', question: 'What prints?', code: `int a=22,b=7;\nfloat r=a/b;\nprintf("%.1f\\n",r);`, correct: ['3.0'], caseSensitive: true, orderMatters: true, hint: 'No cast — integer division happens first.', feedback: { correct: 'Correct — a/b is integer division (=3) first, then stored as 3.0.', incorrect: 'No cast means a/b runs as int division = 3, stored as 3.0 in the float.' } },
        { id: 'ch6-if-p2', type: 'predict', question: 'What prints?', code: `int a=22,b=7;\nfloat r=(float)a/b;\nprintf("%.2f\\n",r);`, correct: ['3.14'], caseSensitive: true, orderMatters: true, hint: '22/7 with float division.', feedback: { correct: 'Correct — (float)22/7 ≈ 3.142857, rounded to 2 decimals: 3.14', incorrect: '(float)a forces float division: 22.0/7≈3.142857, shown as 3.14.' } },
        { id: 'ch6-if-p3', type: 'predict', question: 'What prints?', code: `int x=6;\nfloat y=(float)x/4;\nprintf("%.2f\\n",y);`, correct: ['1.50'], caseSensitive: true, orderMatters: true, hint: '6/4 with float division.', feedback: { correct: 'Correct — (float)6/4=1.5, shown with 2 decimals as 1.50.', incorrect: '(float)x forces float division: 6.0/4=1.5, printed as 1.50.' } }
      ]
      const mcqQ = [
        { id: 'ch6-if-m1', type: 'mcq', question: 'float avg = total / count; — does declaring avg as float fix integer division?', options: ['Yes, always', 'No — the division still happens as integer math first', 'Only if total is large', 'Only with %f'], correct: ['No — the division still happens as integer math first'], caseSensitive: false, orderMatters: false, hint: 'The variable type does not control how the math runs.', feedback: { correct: 'Correct — the result variable type has no effect on the calculation. total/count is still integer division if both are int.', incorrect: 'Declaring the result as float does NOT fix it. The division itself still happens as int/int first.' } },
        { id: 'ch6-if-m2', type: 'mcq', question: 'What is the standard fix pattern for int/int division bugs?', options: ['Use %f in printf', 'Cast one operand to float BEFORE the division operator runs', 'Declare both as float from the start', 'Both B and C work'], correct: ['Both B and C work'], caseSensitive: false, orderMatters: false, hint: 'There is more than one valid fix.', feedback: { correct: 'Correct — either cast one operand right before dividing, OR declare the inputs as float in the first place. Both work.', incorrect: 'Two valid fixes: cast an operand before dividing, or declare the variables as float to begin with.' } },
        { id: 'ch6-if-m3', type: 'mcq', question: 'int a=10, b=4; What does (float)a/b give vs a/(float)b?', options: ['Different results', 'The same result: 2.5', 'a/(float)b is invalid', '(float)a/b is invalid'], correct: ['The same result: 2.5'], caseSensitive: false, orderMatters: false, hint: 'Casting either operand promotes the whole expression.', feedback: { correct: 'Correct — casting either side works. Both give 2.5.', incorrect: 'Casting either operand forces float division. Both (float)a/b and a/(float)b give 2.5.' } },
        { id: 'ch6-if-m4', type: 'mcq', question: 'Which fixes int x=5, int y=2, want 2.5: int z = x/y;', options: ['int z = (float)x/y;', 'float z = (float)x/y;', 'float z = x/y;', 'double z = x/y;'], correct: ['float z = (float)x/y;'], caseSensitive: true, orderMatters: false, hint: 'You need BOTH the cast and a float-type variable to store it.', feedback: { correct: 'Correct — you need the cast for correct math AND a float variable to store the decimal.', incorrect: 'You need both: the cast (float)x to get 2.5 from the division, and a float variable z to actually store that decimal.' } },
        { id: 'ch6-if-m5', type: 'mcq', question: 'When is the int/int division bug NOT a problem?', options: ['Never — always a problem', 'When you actually want the integer quotient (e.g. counting full boxes)', 'Only with negative numbers', 'When using printf'], correct: ['When you actually want the integer quotient (e.g. counting full boxes)'], caseSensitive: false, orderMatters: false, hint: 'Sometimes truncated division IS the correct behavior.', feedback: { correct: 'Correct — integer division is exactly right when you want whole-number results, like counting full boxes or pages.', incorrect: 'Integer division is a feature, not a bug, when you genuinely want the truncated whole-number result.' } }
      ]
      QuizEngine.init({ containerId: 'quiz-ch6-int2float-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch6-int2float-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch6-int2float-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This unit-price calculator is wrong (gives 2.00 instead of the real value). Fix it.',
        includes: ['<stdio.h>'],
        starterCode: `int total_cents = 750;\nint quantity = 4;\nfloat unit_price = total_cents / quantity / 100;\nprintf("$%.2f\\n", unit_price);`,
        checkFn: (output) => output.includes('1.88') || output.includes('1.87'),
        hint: 'Both divisions here are int/int. Where should the cast go?',
        hintTwo: 'Cast total_cents to float at the very start: (float)total_cents / quantity / 100',
        solution: `int total_cents=750,quantity=4;\nfloat unit_price=(float)total_cents/quantity/100;\nprintf("$%.2f\\n",unit_price);`,
        onPass: () => {}
      })
    }

    const btn3 = document.querySelector('.btn-assessment[data-topic="ch6-int2float"]')
    if (btn3) btn3.addEventListener('click', () => openAssessmentModal(topicId, 'Int to Float Casting — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — FLOAT TO INT CASTING (TRUNCATION)
     ══════════════════════════════════════════════════════════ */
  function initTopic_float2int() {
    const topicId = 'ch6-float2int'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch6-float2int-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `printf("(int)9.99  = %d\\n", (int)9.99);
printf("(int)9.01  = %d\\n", (int)9.01);
printf("(int)-9.99 = %d\\n", (int)-9.99);
printf("(int)-9.01 = %d\\n", (int)-9.01);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch6-float2int',
      question: '(int)9.99 gave 9. (int)-9.99 gave -9, not -10. What rule explains both results?',
      options: [
        'C always rounds down (floor)',
        'C always truncates toward zero — it chops the decimal regardless of sign',
        'C rounds to the nearest integer',
        'Negative numbers behave randomly'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — truncation always moves toward zero. 9.99 → 9 (down toward zero). -9.99 → -9 (up toward zero, not down to -10).',
        incorrect: 'C truncation always moves toward zero, not "down" in the math sense. 9.99→9 and -9.99→-9 both just chop the decimal, landing closer to zero than floor() would.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch6-float2int-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch6-float2int-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add manual rounding: print 9.99 rounded to the nearest int (should be 10) using the +0.5 trick.',
      includes: ['<stdio.h>'],
      starterCode: `printf("Truncated: %d\\n", (int)9.99);`,
      checkFn: (output) => output.includes('10'),
      hint: 'printf("Rounded: %d\\n", (int)(9.99 + 0.5));',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch6-float2int-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the casts: one to truncate, one to round.',
      includes: ['<stdio.h>'],
      starterCode: `float price = 12.87;
int truncated = [?]price;
int rounded = [?](price + 0.5);
printf("%d %d\\n", truncated, rounded);`,
      blanks: ['(int)', '(int)'],
      hint: 'Both blanks use (int) — the difference is the +0.5 added before the second cast.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch6-float2int-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'A 3D printer estimates 47.6 minutes per print. Print: ① the truncated whole minutes, ② the rounded whole minutes (using +0.5).',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('47') && output.includes('48'),
      hint: 'float minutes=47.6; int trunc=(int)minutes; int rounded=(int)(minutes+0.5);',
      solution: `float minutes=47.6;\nint trunc=(int)minutes;\nint rounded=(int)(minutes+0.5);\nprintf("Truncated: %d\\n",trunc);\nprintf("Rounded:   %d\\n",rounded);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id: 'ch6-fi-p1', type: 'predict', question: 'What prints?', code: `printf("%d\\n",(int)3.99);`, correct: ['3'], caseSensitive: true, orderMatters: true, hint: 'Truncates.', feedback: { correct: 'Correct — truncation, not rounding: 3.99 → 3.', incorrect: '(int) truncates: 3.99 becomes 3, not 4.' } },
        { id: 'ch6-fi-p2', type: 'predict', question: 'What prints?', code: `printf("%d\\n",(int)-3.01);`, correct: ['-3'], caseSensitive: true, orderMatters: true, hint: 'Toward zero, not down.', feedback: { correct: 'Correct — truncation toward zero: -3.01 → -3 (not -4).', incorrect: 'Truncation moves toward zero. -3.01 becomes -3, not -4.' } },
        { id: 'ch6-fi-p3', type: 'predict', question: 'What prints?', code: `float x=8.49;\nprintf("%d\\n",(int)(x+0.5));`, correct: ['8'], caseSensitive: true, orderMatters: true, hint: '8.49+0.5=8.99, truncated.', feedback: { correct: 'Correct — 8.49+0.5=8.99, truncated to 8 (still rounds correctly since 8.49 rounds to 8 anyway).', incorrect: '8.49+0.5=8.99, then (int) truncates to 8. Since 8.49 is closer to 8 than 9, this is the correct rounded result.' } }
      ]
      const mcqQ = [
        { id: 'ch6-fi-m1', type: 'mcq', question: 'Does (int) round or truncate?', options: ['Rounds to nearest', 'Truncates (chops decimal)', 'Rounds up always', 'Rounds down always'], correct: ['Truncates (chops decimal)'], caseSensitive: false, orderMatters: false, hint: 'It never rounds.', feedback: { correct: 'Correct — (int) always truncates, never rounds.', incorrect: '(int) truncates by simply dropping the decimal part. It never rounds.' } },
        { id: 'ch6-fi-m2', type: 'mcq', question: 'What does (int)-4.7 give?', options: ['-5', '-4', '-4.7', '0'], correct: ['-4'], caseSensitive: true, orderMatters: false, hint: 'Toward zero.', feedback: { correct: 'Correct — truncation toward zero: -4.7 → -4.', incorrect: 'Truncation moves toward zero, so -4.7 becomes -4, not -5.' } },
        { id: 'ch6-fi-m3', type: 'mcq', question: 'How do you round a POSITIVE float to the nearest int without library functions?', options: ['(int)x', '(int)(x+0.5)', '(int)(x-0.5)', 'x rounds automatically'], correct: ['(int)(x+0.5)'], caseSensitive: true, orderMatters: false, hint: 'Add half before truncating.', feedback: { correct: 'Correct — adding 0.5 before truncating gives correct rounding for positive numbers.', incorrect: '(int)(x+0.5) is the manual rounding trick. Truncation alone (int)x does not round.' } },
        { id: 'ch6-fi-m4', type: 'mcq', question: 'Why does the +0.5 rounding trick need adjustment for negative numbers?', options: ['It does not — works the same', 'For negatives you would need -0.5, since truncation moves toward zero', 'Negative numbers cannot be rounded', 'C forbids casting negative floats'], correct: ['For negatives you would need -0.5, since truncation moves toward zero'], caseSensitive: false, orderMatters: false, hint: 'Truncation direction flips for negatives.', feedback: { correct: 'Correct — for negative numbers, you would subtract 0.5 before truncating, since truncation already moves toward zero (which is "up" for negatives).', incorrect: 'For negative numbers, truncation toward zero is the opposite direction of floor. You would need x-0.5 instead of x+0.5.' } },
        { id: 'ch6-fi-m5', type: 'mcq', question: 'int x = 7.9; — without writing (int) explicitly, does truncation still happen?', options: ['No — compile error', 'Yes — assigning float to int variable silently truncates', 'It rounds instead', 'Undefined behavior'], correct: ['Yes — assigning float to int variable silently truncates'], caseSensitive: false, orderMatters: false, hint: 'The assignment itself is an implicit cast.', feedback: { correct: 'Correct — storing a float value into an int variable IS itself a truncating conversion, even without writing (int) explicitly.', incorrect: 'int x = 7.9; silently truncates to 7. The assignment to an int variable performs the truncation implicitly.' } }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Print (int)15.999. Should be 15.', check: o => o.trim() === '15', hint: 'printf("%d\\n", (int)15.999);', solution: `printf("%d\\n",(int)15.999);` },
        { id: 'p2', task: 'Print (int)-2.5. Should be -2 (toward zero).', check: o => o.trim() === '-2', hint: 'printf("%d\\n", (int)-2.5);', solution: `printf("%d\\n",(int)-2.5);` },
        { id: 'p3', task: 'Given float temp=98.6, print the truncated int value and the rounded int value on separate lines.', check: o => o.includes('98'), hint: 'trunc=(int)temp; rounded=(int)(temp+0.5);', solution: `float temp=98.6;\nprintf("%d\\n",(int)temp);\nprintf("%d\\n",(int)(temp+0.5));` },
        { id: 'p4', task: 'A vending machine charges $1.75. A customer pays with a $5 bill (int 500 cents). Print the change owed in whole cents (int).', check: o => o.includes('325'), hint: 'change_cents = 500 - 175;', solution: `printf("%d\\n",500-175);` },
        { id: 'p5', task: 'Print how many full 8-ounce cups fit in 53.7 ounces of liquid (truncate, do not round).', check: o => o.trim() === '6', hint: '(int)(53.7/8)', solution: `printf("%d\\n",(int)(53.7/8));` }
      ]
      renderPracticeSetCh6('practice-ch6-float2int', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch6-float2int-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch6-float2int-mcq', questions: mcqQ, onComplete: () => {} })
      CCompiler.initBlock($('compiler-ch6-float2int-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This rounding function gives 7 instead of 8 for 7.6. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode: `float value = 7.6;\nint rounded = (int)value + 0.5;\nprintf("%d\\n", rounded);`,
        checkFn: (output) => output.includes('8'),
        hint: 'Check the order: is +0.5 happening before or after the cast?',
        hintTwo: '(int)value truncates FIRST (giving 7), then +0.5 is added to an int (still 7, since int+float stored in int truncates again). Fix: (int)(value+0.5)',
        solution: `float value=7.6;\nint rounded=(int)(value+0.5);\nprintf("%d\\n",rounded);`,
        onPass: () => { Progress.saveTopicComplete(CH, topicId) }
      })
    }

    const btn4 = document.querySelector('.btn-assessment[data-topic="ch6-float2int"]')
    if (btn4) btn4.addEventListener('click', () => openAssessmentModal(topicId, 'Float to Int Casting — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — COMMON CASTING MISTAKES
     ══════════════════════════════════════════════════════════ */
  function initTopic_mistakes() {
    const topicId = 'ch6-mistakes'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch6-mistakes-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int a = 7, b = 2;
float wrong = (float)(a / b);
float right = (float)a / b;
printf("Wrong: %.1f\\n", wrong);
printf("Right: %.1f\\n", right);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch6-mistakes',
      question: 'wrong used (float)(a/b) and got 3.0. right used (float)a/b and got 3.5. Both have the exact same cast keyword. What is actually different?',
      options: [
        'Nothing — this is a compiler inconsistency',
        'Parentheses position: one casts the already-computed int result, the other casts a single operand first',
        '(float) does not work the same way twice',
        'b changed value between the two lines'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — (float)(a/b) computes a/b as int division FIRST (=3), then casts that 3 to 3.0. (float)a/b casts a alone first, forcing the whole division to be float math.',
        incorrect: 'The parentheses placement is everything. (float)(a/b): division happens first (int math, =3), THEN cast (too late). (float)a/b: a is cast first, forcing float division throughout.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch6-mistakes-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch6-mistakes-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'This has the late-cast mistake. Fix it so it prints 4.5, not 4.0.',
      includes: ['<stdio.h>'],
      starterCode: `int a = 9, b = 2;
float result = (float)(a / b);
printf("%.1f\\n", result);`,
      checkFn: (output) => output.includes('4.5'),
      hint: 'Move the cast to apply to a alone: (float)a / b',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch6-mistakes-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the cast in the correct position to fix the bug.',
      includes: ['<stdio.h>'],
      starterCode: `int saved = 15, original = 60;
float pct = [?]saved / original * 100;
printf("%.1f%%\\n", pct);`,
      blanks: ['(float)'],
      hint: 'Cast saved (the first operand) before the division.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch6-mistakes-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write BOTH versions of a percentage calculation for saved=23, original=80: one with the late-cast mistake (label "Wrong"), one fixed correctly (label "Right"). Both should print, showing the difference.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('28.7') || output.includes('28.75'),
      hint: 'Wrong: (float)(saved/original)*100. Right: (float)saved/original*100.',
      solution: `int saved=23, original=80;\nfloat wrong=(float)(saved/original)*100;\nfloat right=(float)saved/original*100;\nprintf("Wrong: %.1f%%\\n",wrong);\nprintf("Right: %.1f%%\\n",right);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const mcqQ = [
        { id: 'ch6-mi-m1', type: 'mcq', question: 'What is the most common casting mistake?', options: ['Casting the wrong type entirely', 'Casting the already-computed integer result instead of an operand before the operation', 'Forgetting semicolons', 'Using float instead of double'], correct: ['Casting the already-computed integer result instead of an operand before the operation'], caseSensitive: false, orderMatters: false, hint: 'It is about WHEN the cast happens.', feedback: { correct: 'Correct — casting too late (after int math already happened) is the classic mistake.', incorrect: 'The most common mistake is casting the result of int math instead of an operand before the math runs.' } },
        { id: 'ch6-mi-m2', type: 'mcq', question: 'int x = 9.7; — is this a cast?', options: ['No, only (int) syntax counts as a cast', 'Yes — assigning float to int is an implicit truncating conversion', 'This is a compile error', 'x becomes 9.7 still'], correct: ['Yes — assigning float to int is an implicit truncating conversion'], caseSensitive: false, orderMatters: false, hint: 'Assignment can silently convert too.', feedback: { correct: 'Correct — this silently truncates to 9, even without writing (int) explicitly.', incorrect: 'Assigning a float value to an int variable IS a conversion — it truncates silently, just without explicit (int) syntax.' } },
        { id: 'ch6-mi-m3', type: 'mcq', question: 'How can you check if a cast is "too late" to fix an integer division bug?', options: ['Check if the division already happened before the cast appears', 'Count the parentheses', 'There is no way to tell', 'Always cast twice to be safe'], correct: ['Check if the division already happened before the cast appears'], caseSensitive: false, orderMatters: false, hint: 'Trace the order of operations.', feedback: { correct: 'Correct — ask "has the int math already run by the time this cast executes?" If yes, it is too late.', incorrect: 'Trace the order of operations: if the division already completed as int math before the cast runs, the cast cannot fix it.' } },
        { id: 'ch6-mi-m4', type: 'mcq', question: 'Which is the SAFEST general habit to avoid casting mistakes?', options: ['Avoid casts entirely', 'Cast the leftmost/first operand immediately, before any operator runs on it', 'Always cast twice', 'Use only double, never float'], correct: ['Cast the leftmost/first operand immediately, before any operator runs on it'], caseSensitive: false, orderMatters: false, hint: 'Cast early, not after the fact.', feedback: { correct: 'Correct — casting the first operand immediately guarantees the whole expression promotes correctly.', incorrect: 'The safe habit: cast an operand before any operator touches it, not after — guaranteeing float math throughout.' } },
        { id: 'ch6-mi-m5', type: 'mcq', question: 'Does float result = a / b; (int a, b) ever give a correct decimal result?', options: ['Always', 'Never — result type does not affect the calculation', 'Only if a > b', 'Only with %d'], correct: ['Never — result type does not affect the calculation'], caseSensitive: false, orderMatters: false, hint: 'The bug is the same every time.', feedback: { correct: 'Correct — without a cast on an operand, int/int is always integer division, regardless of what type stores the result.', incorrect: 'This is always wrong without a cast. The result variable type never changes how a/b itself is computed.' } }
      ]
      const identifyQ = [
        { id: 'ch6-mi-id1', type: 'identify', question: 'What do you call converting a value\'s type using (type) syntax?', correct: ['cast', 'casting', 'explicit cast', 'type cast'], caseSensitive: false, orderMatters: false, hint: 'It starts with c.', feedback: { correct: 'Correct — this is called casting.', incorrect: 'This is called a cast (or explicit type cast / casting).' } },
        { id: 'ch6-mi-id2', type: 'identify', question: 'What does C do to a float value when it is stored into an int variable without explicit (int)?', correct: ['truncates', 'truncate', 'truncation', 'it truncates'], caseSensitive: false, orderMatters: false, hint: 'Not rounds — the opposite.', feedback: { correct: 'Correct — it truncates (drops the decimal).', incorrect: 'It truncates — drops the decimal part, never rounds.' } }
      ]
      const practiceConfigs = [
        { id: 'p1', task: 'Write the WRONG version: int a=11, b=4. Cast the division result (too late). Print it.', check: o => o.includes('2.0'), hint: '(float)(a/b)', solution: `int a=11,b=4;\nprintf("%.1f\\n",(float)(a/b));` },
        { id: 'p2', task: 'Now write the RIGHT version of the same calculation. Should print 2.8 (approx).', check: o => o.includes('2.8') || o.includes('2.75'), hint: '(float)a/b', solution: `int a=11,b=4;\nprintf("%.1f\\n",(float)a/b);` },
        { id: 'p3', task: 'Given int sale=340, int original=400, print discount percentage with 1 decimal, using the correct (early) cast.', check: o => o.includes('15.0'), hint: '(float)(original-sale)/original*100', solution: `int sale=340,original=400;\nprintf("%.1f%%\\n",(float)(original-sale)/original*100);` },
        { id: 'p4', task: 'Declare int x=7.9 — wait, that is wrong syntax. Instead: float f=7.9; int x=f; Print x to show silent truncation (no explicit cast keyword used).', check: o => o.trim() === '7', hint: 'int x = f; truncates automatically.', solution: `float f=7.9;\nint x=f;\nprintf("%d\\n",x);` },
        { id: 'p5', task: 'A recipe calls for 750g flour, split into 4 equal portions. Print each portion size with 2 decimals, using a correctly-placed cast.', check: o => o.includes('187.50') || o.includes('187.5'), hint: '(float)750/4', solution: `printf("%.2f\\n",(float)750/4);` }
      ]
      renderPracticeSetCh6('practice-ch6-mistakes', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch6-mistakes-mcq', questions: mcqQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch6-mistakes-identify', questions: identifyQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch6-mistakes-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This batting average shows 0.00 for a player with hits. Find the late-cast bug.',
        includes: ['<stdio.h>'],
        starterCode: `int hits = 3, at_bats = 10;\nfloat avg = (float)(hits / at_bats);\nprintf("%.3f\\n", avg);`,
        checkFn: (output) => output.includes('0.300'),
        hint: 'hits/at_bats with int division gives 0 before the cast ever runs.',
        hintTwo: 'Move the cast: (float)hits / at_bats — cast hits before dividing.',
        solution: `int hits=3,at_bats=10;\nfloat avg=(float)hits/at_bats;\nprintf("%.3f\\n",avg);`,
        onPass: () => {}
      })
    }

    const btn5 = document.querySelector('.btn-assessment[data-topic="ch6-mistakes"]')
    if (btn5) btn5.addEventListener('click', () => openAssessmentModal(topicId, 'Casting Mistakes — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     CHAPTER 6 MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch6-mastery'), {
      mode: 'build',
      topicId: 'ch6-mastery',
      chapterId: CH,
      question: 'Build a unit converter.\n\n① int meters = 1500 (a race distance)\n② Convert to kilometers using a correctly-placed cast: float km = (float)meters / 1000;\n③ int finishers = 87, int starters = 100\n④ Calculate finish rate as a percentage with 1 decimal, using a correctly-placed cast\n⑤ Print both results clearly labeled',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('1.5') && output.includes('87.0'),
      hint: 'float km = (float)meters/1000; float rate = (float)finishers/starters*100;',
      solution: `int meters=1500;\nfloat km=(float)meters/1000;\nint finishers=87, starters=100;\nfloat rate=(float)finishers/starters*100;\nprintf("Distance: %.1f km\\n",km);\nprintf("Finish rate: %.1f%%\\n",rate);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch6-chapter-complete').style.display = 'block'
        $('ch6-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch6-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch7')
    })
  }

  /* ══════════════════════════════════════════════════════════
     SHARED PRACTICE-SET HELPER (local to this chapter's modal
     content — separate name from ch3-ch5's renderPracticeSet
     since those render inline at load time; this one only ever
     gets called from inside a renderAssessment closure, after
     Modal.open() has already placed the container in the DOM)
     ══════════════════════════════════════════════════════════ */
  function renderPracticeSetCh6(containerId, chapterId, topicId, configs) {
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
    initTopic_implicit()
    initTopic_explicit()
    initTopic_int2float()
    initTopic_float2int()
    initTopic_mistakes()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
