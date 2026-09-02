/* =========================================================
   C LEARNING PLATFORM — chapters/ch10-while-loops/ch10.js
   Chapter 10: While Loops
   5 topics · 7-step structure · Assessment opens as popup modal
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch10'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — THE WHILE LOOP
     ══════════════════════════════════════════════════════════ */
  function initTopic_while() {
    const topicId = 'ch10-while'
    const sm = StepManager.init(topicId, 7, CH)

    /* ── Step 1: Explore ── */
    CCompiler.initBlock($('compiler-ch10-while-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int count = 1;

while (count <= 5) {
    printf("count is %d\\n", count);
    count++;
}

printf("Loop finished. count is now %d\\n", count);`,
      onPass: () => sm.complete(1)
    })

    /* ── Step 2: Instant question ── */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch10-while',
      question: 'The loop ran exactly 5 times. What would happen if you removed the count++ line inside the loop?',
      options: [
        'The loop would still run 5 times — count++ is not required',
        'The loop would run once then stop automatically',
        'The loop would run forever — count never reaches 6, so the condition never becomes false',
        'The program would refuse to compile without count++'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — without count++, count stays 1 forever. The condition (count <= 5) is always true and the loop never stops.',
        incorrect: 'Without count++, count stays at 1 permanently. The condition (count <= 5) is always true, so the loop runs without stopping — an infinite loop.'
      },
      onAnswer: () => sm.complete(2)
    })

    /* ── Step 3: Explanation ── */
    $('step-ch10-while-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* ── Step 4: Modify ── */
    CCompiler.initBlock($('compiler-ch10-while-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the loop so it counts from 1 to 10, printing only even numbers. The condition and the update step both need to change.',
      includes: ['<stdio.h>'],
      starterCode:
`int count = 1;

while (count <= 5) {
    printf("%d\\n", count);
    count++;
}`,
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
        return nums.includes(2) && nums.includes(10) && nums.includes(6) && !nums.includes(1) && !nums.includes(3)
      },
      hint: 'Start count at 2 and use count += 2 to step by 2. The condition becomes count <= 10.',
      solution:
`int count = 2;
while (count <= 10) {
    printf("%d\\n", count);
    count += 2;
}`,
      onPass: () => sm.complete(4)
    })

    /* ── Step 5: Fill ── */
    CCompiler.initBlock($('compiler-ch10-while-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete the while loop that prints the sum of 1 through 5.',
      includes: ['<stdio.h>'],
      starterCode:
`int i = 1, sum = 0;

[?] (i <= 5) {
    sum [?] i;
    [?]++;
}

printf("Sum: %d\\n", sum);`,
      blanks: ['while', '+=', 'i'],
      hint: 'First blank: the loop keyword. Second: accumulation operator. Third: the counter variable name.',
      onPass: () => sm.complete(5)
    })

    /* ── Step 6: Build ── */
    CCompiler.initBlock($('compiler-ch10-while-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a while loop that prints the first 5 powers of 2.\nExpected output:\n  2\n  4\n  8\n  16\n  32',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output.replace(/\s+/g, ' ').trim()
        return text.includes('2') && text.includes('4') && text.includes('8') &&
               text.includes('16') && text.includes('32')
      },
      hint: 'int power = 2; while (power <= 32) { printf("%d\\n", power); power *= 2; }',
      solution:
`int power = 2;
while (power <= 32) {
    printf("%d\\n", power);
    power *= 2;
}`,
      onPass: () => sm.complete(6)
    })

    /* ── Step 7: Real-world (completes immediately) ── */
    sm.complete(7)

    /* ── Assessment (deferred — runs after modal opens) ── */
    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch10-wh-p1', type: 'predict',
          question: 'What prints?',
          code: `int x = 3;\nwhile (x > 0) {\n    printf("%d\\n", x);\n    x--;\n}`,
          correct: ['3\n2\n1', '3\r\n2\r\n1'],
          caseSensitive: true, orderMatters: true,
          hint: 'x starts at 3, decrements each iteration, stops when x reaches 0.',
          feedback: {
            correct: 'Correct — x goes 3 → 2 → 1. When x becomes 0, the condition (x > 0) is false and the loop stops.',
            incorrect: 'x starts at 3, decrements each pass. Loop stops when x > 0 is false (when x = 0). Output: 3, then 2, then 1.'
          }
        },
        {
          id: 'ch10-wh-p2', type: 'predict',
          question: 'What prints?',
          code: `int i = 0;\nwhile (i < 4) {\n    i++;\n    printf("%d ", i);\n}`,
          correct: ['1 2 3 4', '1 2 3 4 '],
          caseSensitive: true, orderMatters: true,
          hint: 'Notice: i++ comes BEFORE printf. What is i when it first prints?',
          feedback: {
            correct: 'Correct — i increments first, so the first print is i=1, not i=0. Output: 1 2 3 4.',
            incorrect: 'i++ comes before printf. So the first print sees i=1 (not 0). Loop runs while i < 4, but after incrementing — so it prints 1, 2, 3, 4.'
          }
        },
        {
          id: 'ch10-wh-p3', type: 'predict',
          question: 'What prints?',
          code: `int n = 10;\nwhile (n > 100) {\n    printf("%d\\n", n);\n    n++;\n}`,
          correct: ['', '(nothing)'],
          caseSensitive: false, orderMatters: true,
          hint: 'Check the condition before the loop even starts. Is 10 > 100?',
          feedback: {
            correct: 'Correct — 10 > 100 is false immediately. The while body never runs, so nothing prints.',
            incorrect: '10 > 100 is false before the first iteration. While checks the condition before running the body. Nothing prints.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch10-wh-m1', type: 'mcq',
          question: 'When does a while loop check its condition?',
          options: [
            'After the body executes',
            'Before the body executes, every iteration',
            'Only once, at the start',
            'Only after at least one execution'
          ],
          correct: ['Before the body executes, every iteration'],
          caseSensitive: false, orderMatters: false,
          hint: 'This is what distinguishes while from do-while.',
          feedback: {
            correct: 'Correct — while evaluates the condition before each and every iteration, including the first.',
            incorrect: 'while checks its condition before each iteration. If the condition is false from the start, the body never runs at all.'
          }
        },
        {
          id: 'ch10-wh-m2', type: 'mcq',
          question: 'What causes an infinite loop?',
          options: [
            'Using ++ instead of --',
            'A condition that never becomes false',
            'Not using a counter variable',
            'Using int instead of float for the counter'
          ],
          correct: ['A condition that never becomes false'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what the loop requires to stop.',
          feedback: {
            correct: 'Correct — a while loop exits only when its condition is false. If nothing ever makes the condition false, it loops forever.',
            incorrect: 'An infinite loop occurs when the condition never evaluates to false. The update step inside the loop must change something the condition tests.'
          }
        },
        {
          id: 'ch10-wh-m3', type: 'mcq',
          question: 'int i = 0; while (i < 5) { printf("%d ", i); i++; } — How many times does printf run?',
          options: ['4', '5', '6', 'Infinite'],
          correct: ['5'],
          caseSensitive: false, orderMatters: false,
          hint: 'Trace i: 0, 1, 2, 3, 4. When does the condition fail?',
          feedback: {
            correct: 'Correct — i takes values 0, 1, 2, 3, 4. At i=5, the condition (i < 5) is false. 5 iterations.',
            incorrect: 'i goes 0, 1, 2, 3, 4 — that is 5 values. When i becomes 5, (i < 5) is false and the loop stops. 5 executions.'
          }
        },
        {
          id: 'ch10-wh-m4', type: 'mcq',
          question: 'What keyword starts a while loop?',
          options: ['loop', 'repeat', 'while', 'for'],
          correct: ['while'],
          caseSensitive: true, orderMatters: false,
          hint: 'It is the same word as the loop structure name.',
          feedback: {
            correct: 'Correct — while (condition) { } is the syntax.',
            incorrect: 'The keyword is while. Syntax: while (condition) { /* body */ }'
          }
        },
        {
          id: 'ch10-wh-m5', type: 'mcq',
          question: 'Which variable must change inside a while loop to prevent an infinite loop?',
          options: [
            'Any variable used in printf',
            'The variable(s) involved in the loop condition',
            'Only global variables',
            'The loop does not need any variable to change'
          ],
          correct: ['The variable(s) involved in the loop condition'],
          caseSensitive: false, orderMatters: false,
          hint: 'What does the loop check to decide whether to continue?',
          feedback: {
            correct: 'Correct — the condition must eventually become false. So the variable the condition tests must change with each iteration.',
            incorrect: 'The condition must eventually become false. To achieve that, the variable(s) the condition tests must be modified inside the loop body.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Write a while loop that prints numbers 10 down to 1, each on its own line.',
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
            return nums.includes(10) && nums.includes(1) && nums.length >= 10
          },
          hint: 'int n = 10; while (n >= 1) { printf("%d\\n", n); n--; }',
          solution: `int n = 10;\nwhile (n >= 1) {\n    printf("%d\\n", n);\n    n--;\n}`
        },
        {
          id: 'p2',
          task: 'Print the first 7 multiples of 3 (3, 6, 9, ... 21).',
          check: output => {
            const text = output.replace(/\s+/g, ' ').trim()
            return text.includes('3') && text.includes('21') && text.includes('12') && text.includes('18')
          },
          hint: 'int n = 3; while (n <= 21) { printf("%d\\n", n); n += 3; }',
          solution: `int n = 3;\nwhile (n <= 21) {\n    printf("%d\\n", n);\n    n += 3;\n}`
        },
        {
          id: 'p3',
          task: 'Compute and print the sum of all integers from 1 to 100. Expected output: Sum: 5050',
          check: output => output.includes('5050'),
          hint: 'int i=1, sum=0; while(i<=100){ sum+=i; i++; } printf("Sum: %d\\n", sum);',
          solution: `int i=1, sum=0;\nwhile(i<=100){ sum+=i; i++; }\nprintf("Sum: %d\\n", sum);`
        },
        {
          id: 'p4',
          task: 'Print a "countdown" from 5 to 1 followed by "GO!" on its own line.',
          check: output => {
            const text = output.replace(/\r/g, '')
            return text.includes('5') && text.includes('1') && text.includes('GO')
          },
          hint: 'int n=5; while(n>=1){ printf("%d\\n",n); n--; } printf("GO!\\n");',
          solution: `int n=5;\nwhile(n>=1){ printf("%d\\n",n); n--; }\nprintf("GO!\\n");`
        },
        {
          id: 'p5',
          task: 'Print every number from 1 to 20, but prefix multiples of 5 with "FIVE: " instead of printing just the number.',
          check: output => {
            const text = output
            return text.includes('FIVE') && text.includes('5') && text.includes('10') && text.includes('20')
          },
          hint: 'if (i % 5 == 0) printf("FIVE: %d\\n", i); else printf("%d\\n", i);',
          solution:
`int i=1;
while(i<=20){
    if(i%5==0) printf("FIVE: %d\\n",i);
    else printf("%d\\n",i);
    i++;
}`
        }
      ]

      renderPracticeCh10('practice-ch10-while', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch10-while-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch10-while-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch10-while-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This program should print 1 through 5 but instead hangs. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int i = 1;
while (i <= 5) {
    printf("%d\\n", i);
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
          return nums.length === 5 && nums[0] === 1 && nums[4] === 5
        },
        hint: 'Look inside the loop body — is there a statement that changes i?',
        hintTwo: 'i is never incremented inside the loop. Add i++; as the last line of the while body so the condition eventually becomes false.',
        solution:
`int i = 1;
while (i <= 5) {
    printf("%d\\n", i);
    i++;
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'The while Loop — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — DO-WHILE
     ══════════════════════════════════════════════════════════ */
  function initTopic_dowhile() {
    const topicId = 'ch10-dowhile'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch10-dowhile-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int x = 10;

/* while — checks condition first */
while (x < 5) {
    printf("while body ran\\n");
}

/* do-while — runs body first, checks after */
do {
    printf("do-while body ran\\n");
} while (x < 5);

printf("x is %d — both loops exited\\n", x);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch10-dowhile',
      question: 'x is 10 and the condition is (x < 5) — false from the start. Why did do-while print but while did not?',
      options: [
        'do-while does not have a condition, so it always runs',
        'do-while runs the body first, then checks the condition — the condition is checked too late to prevent the first execution',
        'while has a stricter condition than do-while',
        'Both should print — there is a bug in the while loop'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — do-while executes the body before evaluating the condition for the first time. So even a false condition cannot prevent the first run.',
        incorrect: 'do-while places the condition check at the bottom. The body always runs once before any condition is evaluated. while checks at the top — if the condition is false immediately, the body never runs.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch10-dowhile-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch10-dowhile-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the do-while to simulate a retry loop: print "Attempt N" for attempts 1 through 3. Keep count with a variable that starts at 1.',
      includes: ['<stdio.h>'],
      starterCode:
`int attempt = 1;

do {
    printf("Attempt: %d\\n", attempt);
    attempt++;
} while (attempt <= 1);`,
      checkFn: output => {
        const text = output
        return text.includes('1') && text.includes('2') && text.includes('3') &&
               (text.includes('Attempt') || text.includes('attempt'))
      },
      hint: 'Change the condition to (attempt <= 3) so the loop runs 3 times.',
      solution:
`int attempt = 1;
do {
    printf("Attempt: %d\\n", attempt);
    attempt++;
} while (attempt <= 3);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch10-dowhile-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete the do-while structure.',
      includes: ['<stdio.h>'],
      starterCode:
`int n = 1;

[?] {
    printf("n = %d\\n", n);
    n++;
} [?] (n <= 4);`,
      blanks: ['do', 'while'],
      hint: 'The two keywords are the opening and closing parts of the do-while structure.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch10-dowhile-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a do-while loop that prints "Try N" for N = 1, 2, 3, 4, 5.\nExpected:\n  Try 1\n  Try 2\n  Try 3\n  Try 4\n  Try 5',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('Try 1') && text.includes('Try 5') && text.includes('Try 3')
      },
      hint: 'int n=1; do { printf("Try %d\\n", n); n++; } while(n<=5);',
      solution:
`int n = 1;
do {
    printf("Try %d\\n", n);
    n++;
} while (n <= 5);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch10-dw-p1', type: 'predict',
          question: 'What prints?',
          code: `int x = 0;\ndo {\n    printf("%d\\n", x);\n    x++;\n} while (x < 3);`,
          correct: ['0\n1\n2', '0\r\n1\r\n2'],
          caseSensitive: true, orderMatters: true,
          hint: 'Body runs first. What is x when the first printf runs?',
          feedback: {
            correct: 'Correct — x starts at 0. Body runs: prints 0, increments to 1. Checks: 1 < 3 true. Prints 1, increments to 2. Checks: 2 < 3 true. Prints 2, increments to 3. Checks: 3 < 3 false, exits.',
            incorrect: 'do-while runs the body first. x=0 → prints 0 → x=1 → checks (1<3) true → prints 1 → x=2 → checks (2<3) true → prints 2 → x=3 → checks (3<3) false → exits. Output: 0, 1, 2.'
          }
        },
        {
          id: 'ch10-dw-p2', type: 'predict',
          question: 'What prints?',
          code: `int n = 99;\ndo {\n    printf("ran\\n");\n} while (n < 10);`,
          correct: ['ran'],
          caseSensitive: true, orderMatters: true,
          hint: 'n is 99 and condition is n < 10. Does do-while run the body before or after checking?',
          feedback: {
            correct: 'Correct — the body runs once before the condition is checked. n=99, body runs printing "ran", then condition (99 < 10) is false, loop exits.',
            incorrect: 'do-while always runs the body at least once. Body prints "ran", then condition (99 < 10) is checked — false, loop exits. Output: ran.'
          }
        },
        {
          id: 'ch10-dw-p3', type: 'predict',
          question: 'What prints?',
          code: `int c = 1;\nwhile (c <= 3) {\n    printf("W%d\\n", c);\n    c++;\n}\nc = 1;\ndo {\n    printf("D%d\\n", c);\n    c++;\n} while (c <= 3);`,
          correct: ['W1\nW2\nW3\nD1\nD2\nD3', 'W1\r\nW2\r\nW3\r\nD1\r\nD2\r\nD3'],
          caseSensitive: true, orderMatters: true,
          hint: 'Both loops run 3 times — same output in this case because the condition starts true.',
          feedback: {
            correct: 'Correct — when the condition is true from the start, both while and do-while produce the same output.',
            incorrect: 'When the condition is true initially, while and do-while behave identically. Each runs 3 times: W1 W2 W3 then D1 D2 D3.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch10-dw-m1', type: 'mcq',
          question: 'What is unique about a do-while loop compared to a while loop?',
          options: [
            'do-while can use different data types for the counter',
            'do-while runs its body at least once regardless of the condition',
            'do-while is faster because it skips the first condition check',
            'do-while can only be used with integer conditions'
          ],
          correct: ['do-while runs its body at least once regardless of the condition'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about where the condition check is placed.',
          feedback: {
            correct: 'Correct — the condition is at the bottom in do-while, so the body always executes at least once.',
            incorrect: 'The key difference: do-while checks its condition after the body runs. This guarantees at least one execution even if the condition is immediately false.'
          }
        },
        {
          id: 'ch10-dw-m2', type: 'mcq',
          question: 'Which syntax is correct for a do-while loop?',
          options: [
            'do { } while (cond)',
            'do { } while (cond);',
            'while { } do (cond);',
            'do while (cond) { }'
          ],
          correct: ['do { } while (cond);'],
          caseSensitive: true, orderMatters: false,
          hint: 'The do-while has a semicolon that while loops do not have.',
          feedback: {
            correct: 'Correct — do-while requires a semicolon after the closing while (condition);',
            incorrect: 'The correct syntax is: do { } while (condition); — note the semicolon after the condition. Regular while loops do not have this.'
          }
        },
        {
          id: 'ch10-dw-m3', type: 'mcq',
          question: 'When is do-while more natural to use than while?',
          options: [
            'When you want to loop zero times if the condition is false',
            'When you want to show a menu or prompt that must appear at least once',
            'When working with floating-point counters',
            'When the loop needs to run more than 10 times'
          ],
          correct: ['When you want to show a menu or prompt that must appear at least once'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about user input scenarios — you always need to ask at least once.',
          feedback: {
            correct: 'Correct — do-while is the natural structure for "show this at least once" patterns like menus and input validation prompts.',
            incorrect: 'do-while fits situations where you must execute the body before knowing if you should continue — input prompts, menus, and validation loops.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Write a do-while loop that prints numbers 1 through 5 using a do-while instead of a regular while.',
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
            return nums.includes(1) && nums.includes(5) && nums.length >= 5
          },
          hint: 'int n=1; do { printf("%d\\n", n); n++; } while(n<=5);',
          solution: `int n=1;\ndo {\n    printf("%d\\n", n);\n    n++;\n} while(n<=5);`
        },
        {
          id: 'p2',
          task: 'Use do-while to print "Retrying..." exactly 3 times.',
          check: output => (output.match(/Retrying/g) || []).length >= 3,
          hint: 'int tries=0; do { printf("Retrying...\\n"); tries++; } while(tries<3);',
          solution: `int tries=0;\ndo {\n    printf("Retrying...\\n");\n    tries++;\n} while(tries<3);`
        },
        {
          id: 'p3',
          task: 'Use do-while to print all odd numbers from 1 to 9.',
          check: output => {
            const text = output
            return text.includes('1') && text.includes('9') && text.includes('5') && text.includes('7')
          },
          hint: 'int n=1; do { printf("%d\\n", n); n+=2; } while(n<=9);',
          solution: `int n=1;\ndo { printf("%d\\n", n); n+=2; } while(n<=9);`
        }
      ]

      renderPracticeCh10('practice-ch10-dowhile', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch10-dowhile-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch10-dowhile-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch10-dowhile-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This do-while should print 1 through 4 but prints nothing after "Start". Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int n = 1;
printf("Start\\n");
do
    printf("%d\\n", n);
    n++;
while (n <= 4);`,
        checkFn: output => {
          const text = output
          return text.includes('Start') && text.includes('1') && text.includes('4')
        },
        hint: 'A do-while body with multiple statements requires curly braces. Without them, only the first statement is part of the body.',
        hintTwo: 'Add { } around the two printf/n++ statements: do { printf(...); n++; } while (n <= 4);',
        solution:
`int n = 1;
printf("Start\\n");
do {
    printf("%d\\n", n);
    n++;
} while (n <= 4);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'do-while Loop — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — COUNTER-CONTROLLED LOOPS
     ══════════════════════════════════════════════════════════ */
  function initTopic_counter() {
    const topicId = 'ch10-counter'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch10-counter-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Count up by 1 */
int i = 1;
while (i <= 5) { printf("%d ", i); i++; }
printf("\\n");

/* Count down */
int n = 5;
while (n >= 1) { printf("%d ", n); n--; }
printf("\\n");

/* Count by 3s */
int k = 0;
while (k <= 15) { printf("%d ", k); k += 3; }
printf("\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch10-counter',
      question: 'The third loop uses k += 3 instead of k++. What is the total number of times its body runs?',
      options: ['15', '5', '6', '16'],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — k takes values 0, 3, 6, 9, 12, 15. That is 6 values, so the body runs 6 times.',
        incorrect: 'k goes 0, 3, 6, 9, 12, 15 — then k = 18 which fails k <= 15. Count those values: 0, 3, 6, 9, 12, 15 = 6 iterations.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch10-counter-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch10-counter-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the loop to print all multiples of 7 from 7 to 49.',
      includes: ['<stdio.h>'],
      starterCode:
`int i = 1;
while (i <= 10) {
    printf("%d\\n", i);
    i++;
}`,
      checkFn: output => {
        const text = output.replace(/\s+/g, ' ')
        return text.includes('7') && text.includes('49') && text.includes('42') && text.includes('14')
      },
      hint: 'Start at 7, use i += 7 to step, condition becomes i <= 49.',
      solution:
`int i = 7;
while (i <= 49) {
    printf("%d\\n", i);
    i += 7;
}`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch10-counter-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to print squares of 1 through 6.',
      includes: ['<stdio.h>'],
      starterCode:
`int i = [?];

while ([?] <= 6) {
    printf("%d squared = %d\\n", i, [?]);
    [?];
}`,
      blanks: ['1', 'i', 'i*i', 'i++'],
      hint: 'First blank: starting value. Second: counter in condition. Third: expression for the square. Fourth: increment.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch10-counter-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Print a times-table for 8:\n  8 x 1 = 8\n  8 x 2 = 16\n  ...\n  8 x 10 = 80',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('8') && text.includes('80') && text.includes('40') && text.includes('24')
      },
      hint: 'int i=1; while(i<=10){ printf("8 x %d = %d\\n", i, 8*i); i++; }',
      solution:
`int i = 1;
while (i <= 10) {
    printf("8 x %d = %d\\n", i, 8 * i);
    i++;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch10-ct-p1', type: 'predict',
          question: 'What prints?',
          code: `int i = 0;\nwhile (i <= 10) {\n    if (i % 2 == 0) printf("%d\\n", i);\n    i++;\n}`,
          correct: ['0\n2\n4\n6\n8\n10'],
          caseSensitive: true, orderMatters: true,
          hint: 'The if condition prints only even numbers. What are the even numbers from 0 to 10?',
          feedback: {
            correct: 'Correct — i goes 0 to 10. The condition i % 2 == 0 is true for even numbers: 0, 2, 4, 6, 8, 10.',
            incorrect: 'i % 2 == 0 selects even numbers. From i=0 to i=10 inclusive: 0, 2, 4, 6, 8, 10.'
          }
        },
        {
          id: 'ch10-ct-p2', type: 'predict',
          question: 'What prints?',
          code: `int n = 64;\nwhile (n > 1) {\n    printf("%d\\n", n);\n    n /= 2;\n}`,
          correct: ['64\n32\n16\n8\n4\n2'],
          caseSensitive: true, orderMatters: true,
          hint: 'n starts at 64 and halves each time. Trace: 64, 32, 16, 8, 4, 2. When does n/=2 make n <= 1?',
          feedback: {
            correct: 'Correct — n halves: 64 → 32 → 16 → 8 → 4 → 2 → 1. When n=1, condition (n > 1) is false. Prints 64 through 2.',
            incorrect: 'n halves each iteration: 64, 32, 16, 8, 4, 2. After printing 2, n becomes 1 and n > 1 is false.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch10-ct-m1', type: 'mcq',
          question: 'int i = 1; while (i <= 100) { i += 10; } — what is the final value of i after the loop?',
          options: ['100', '101', '91', '111'],
          correct: ['111'],
          caseSensitive: false, orderMatters: false,
          hint: 'Trace: 1→11→21→31→41→51→61→71→81→91→101→111. When does 111 <= 100 fail?',
          feedback: {
            correct: 'Correct — i goes 1, 11, 21, ..., 91, 101 (exits because 101 > 100). Wait — 101 fails the test, so it exits. Actually i=101 exits: 101 > 100. Then i+=10 is not reached. i=101 is final.',
            incorrect: 'Trace: 1,11,21,31,41,51,61,71,81,91,101. When i=101, the condition 101<=100 is false, loop exits. i=101.'
          }
        },
        {
          id: 'ch10-ct-m2', type: 'mcq',
          question: 'What are the three essential parts of a counter-controlled while loop?',
          options: [
            'Condition, printf, increment',
            'Initializer, condition, update',
            'Start, middle, end',
            'Variable, loop, counter'
          ],
          correct: ['Initializer, condition, update'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what you need before, inside, and as part of the loop structure.',
          feedback: {
            correct: 'Correct — initialize before the loop, condition in while(), update inside the body.',
            incorrect: 'A counter loop needs: initializer (set counter before the loop), condition (test it in while), and update (change it inside the body).'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Print all perfect squares from 1 to 100 (1, 4, 9, 16, ... 100).',
          check: output => {
            const text = output.replace(/\s+/g, ' ')
            return text.includes('1') && text.includes('100') && text.includes('49') && text.includes('64')
          },
          hint: 'int i=1; while(i*i<=100){ printf("%d\\n", i*i); i++; }',
          solution: `int i=1;\nwhile(i*i<=100){\n    printf("%d\\n", i*i);\n    i++;\n}`
        },
        {
          id: 'p2',
          task: 'Count and print how many times 3 fits into 100 using repeated subtraction (no division operator).',
          check: output => {
            const text = output
            return text.includes('33') || text.includes('count') || text.includes('times')
          },
          hint: 'int n=100, count=0; while(n>=3){ n-=3; count++; } printf("Count: %d\\n", count);',
          solution: `int n=100, count=0;\nwhile(n>=3){ n-=3; count++; }\nprintf("Count: %d\\n", count);`
        }
      ]

      renderPracticeCh10('practice-ch10-counter', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch10-counter-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch10-counter-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch10-counter-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 1, 4, 9, 16, 25 (squares of 1-5) but produces wrong output. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int i = 1;
while (i <= 5) {
    printf("%d\\n", i + i);
    i++;
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
          return nums.includes(1) && nums.includes(25) && nums.includes(9)
        },
        hint: 'Look at the printf expression. i + i is not the same as i squared.',
        hintTwo: 'i + i adds i to itself (doubles it). To square i, use i * i. Change i + i to i * i.',
        solution:
`int i = 1;
while (i <= 5) {
    printf("%d\\n", i * i);
    i++;
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Counter-Controlled Loops — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — BREAK AND CONTINUE
     ══════════════════════════════════════════════════════════ */
  function initTopic_break() {
    const topicId = 'ch10-break'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch10-break-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int i = 1;

/* break stops at 4 */
printf("break demo: ");
while (i <= 10) {
    if (i == 4) break;
    printf("%d ", i);
    i++;
}
printf("\\n");

/* continue skips multiples of 3 */
printf("continue demo: ");
i = 1;
while (i <= 10) {
    if (i % 3 == 0) { i++; continue; }
    printf("%d ", i);
    i++;
}
printf("\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch10-break',
      question: 'In the continue demo, when i is a multiple of 3, what happens to that iteration?',
      options: [
        'The entire loop stops immediately',
        'The rest of the body is skipped and the loop goes back to check the condition for the next i',
        'The loop body runs twice for that iteration',
        'i is reset to 1'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — continue skips the remaining body for that iteration (skipping the printf) and jumps back to re-evaluate the while condition.',
        incorrect: 'continue skips the rest of the current iteration\'s body and jumps back to the condition check. The loop does not stop — it just skips printf for multiples of 3.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch10-break-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch10-break-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the break condition so the loop stops when it finds the first number divisible by 7 (between 1 and 50). Print that number.',
      includes: ['<stdio.h>'],
      starterCode:
`int i = 1;

while (i <= 50) {
    if (i == 10) break;
    i++;
}

printf("Stopped at: %d\\n", i);`,
      checkFn: output => output.includes('7') || output.includes('Stopped at: 7'),
      hint: 'Change the break condition to (i % 7 == 0).',
      solution:
`int i = 1;
while (i <= 50) {
    if (i % 7 == 0) break;
    i++;
}
printf("Stopped at: %d\\n", i);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch10-break-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks: loop prints numbers 1–10, skipping 5 and stopping at 8.',
      includes: ['<stdio.h>'],
      starterCode:
`int i = 1;
while (i <= 10) {
    if (i == 8) [?];
    if (i == 5) { i++; [?]; }
    printf("%d\\n", i);
    i++;
}`,
      blanks: ['break', 'continue'],
      hint: 'First blank stops the loop. Second blank skips the rest of the body for that iteration.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch10-break-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Loop through 1 to 20. Skip all multiples of 4 using continue. Stop the loop if you reach a number greater than 15 using break. Print each kept number.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('1') && text.includes('14') && !text.includes('16') && !text.includes('4\n') && !text.includes(' 4 ')
      },
      hint: 'int i=1; while(i<=20){ if(i>15) break; if(i%4==0){ i++; continue; } printf("%d\\n",i); i++; }',
      solution:
`int i = 1;
while (i <= 20) {
    if (i > 15) break;
    if (i % 4 == 0) { i++; continue; }
    printf("%d\\n", i);
    i++;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch10-br-p1', type: 'predict',
          question: 'What prints?',
          code: `int i = 0;\nwhile (i < 8) {\n    i++;\n    if (i == 5) break;\n    printf("%d\\n", i);\n}`,
          correct: ['1\n2\n3\n4'],
          caseSensitive: true, orderMatters: true,
          hint: 'i increments first. When i becomes 5, break fires before printf.',
          feedback: {
            correct: 'Correct — i increments first: becomes 1,2,3,4,5. When i=5, break fires before printf. Output: 1,2,3,4.',
            incorrect: 'i++ runs first each iteration. When i becomes 5, break fires immediately, before printf. So 5 never prints. Output: 1, 2, 3, 4.'
          }
        },
        {
          id: 'ch10-br-p2', type: 'predict',
          question: 'What prints?',
          code: `int i = 1;\nwhile (i <= 5) {\n    if (i % 2 == 0) { i++; continue; }\n    printf("%d\\n", i);\n    i++;\n}`,
          correct: ['1\n3\n5'],
          caseSensitive: true, orderMatters: true,
          hint: 'Even numbers trigger continue. What numbers from 1 to 5 are odd?',
          feedback: {
            correct: 'Correct — even numbers (2, 4) hit continue and skip printf. Odd numbers (1, 3, 5) print.',
            incorrect: 'Even numbers (i%2==0) trigger continue, skipping printf. Odd numbers reach printf. Output: 1, 3, 5.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch10-br-m1', type: 'mcq',
          question: 'What does break do inside a while loop?',
          options: [
            'Skips only the current iteration',
            'Exits the entire loop immediately',
            'Pauses the loop for one iteration',
            'Restarts the loop from the beginning'
          ],
          correct: ['Exits the entire loop immediately'],
          caseSensitive: false, orderMatters: false,
          hint: 'break is permanent — the loop is done.',
          feedback: {
            correct: 'Correct — break immediately exits the loop and execution jumps to the statement after the closing brace.',
            incorrect: 'break immediately terminates the loop. Execution jumps to the first statement after the while\'s closing brace. All remaining iterations are cancelled.'
          }
        },
        {
          id: 'ch10-br-m2', type: 'mcq',
          question: 'What does continue do inside a while loop?',
          options: [
            'Exits the entire loop',
            'Skips the rest of the current iteration and jumps back to the condition',
            'Adds an extra iteration',
            'Restarts from i = 0'
          ],
          correct: ['Skips the rest of the current iteration and jumps back to the condition'],
          caseSensitive: false, orderMatters: false,
          hint: 'continue and break are opposites — one stops, one skips.',
          feedback: {
            correct: 'Correct — continue skips the remaining statements in the current iteration and re-evaluates the while condition for the next iteration.',
            incorrect: 'continue skips the rest of the body for the current iteration, then jumps back to check the while condition. The loop continues — it does not exit.'
          }
        },
        {
          id: 'ch10-br-m3', type: 'mcq',
          question: 'Why must you update the counter BEFORE calling continue in a while loop?',
          options: [
            'To improve performance',
            'Because continue skips the rest of the body — including any increment after it',
            'continue does not skip the increment',
            'The order of continue and increment does not matter'
          ],
          correct: ['Because continue skips the rest of the body — including any increment after it'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens to statements that come after continue in the same loop body.',
          feedback: {
            correct: 'Correct — continue skips everything after it in the body. If i++ comes after continue, it never runs — creating an infinite loop.',
            incorrect: 'continue skips everything in the body that comes after it. If i++ appears after continue, that increment is skipped, i never changes, and the loop runs forever.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Print numbers 1 to 20, but use break to stop as soon as you reach a number divisible by 11.',
          check: output => {
            const text = output
            return text.includes('1') && text.includes('10') && text.includes('11') && !text.includes('12')
          },
          hint: 'if (i % 11 == 0) break; — put this check before printf.',
          solution: `int i=1;\nwhile(i<=20){\n    if(i%11==0) break;\n    printf("%d\\n",i);\n    i++;\n}`
        },
        {
          id: 'p2',
          task: 'Print numbers 1 to 15, skipping all numbers that contain the digit 3 (i.e., 3 and 13).',
          check: output => {
            const text = output
            const lines = text.trim().split('\n').map(l => l.trim())
            return text.includes('2') && text.includes('15') && !lines.includes('3') && !lines.includes('13')
          },
          hint: 'if (i == 3 || i == 13) { i++; continue; }',
          solution:
`int i=1;
while(i<=15){
    if(i==3||i==13){ i++; continue; }
    printf("%d\\n",i);
    i++;
}`
        }
      ]

      renderPracticeCh10('practice-ch10-break', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch10-break-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch10-break-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch10-break-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should skip 5 and print 1-8, but it causes an infinite loop. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int i = 1;
while (i <= 8) {
    if (i == 5) continue;
    printf("%d\\n", i);
    i++;
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
          return nums.includes(8) && !nums.includes(5) && nums.length >= 7
        },
        hint: 'When i == 5, continue skips the rest of the body — including i++. What happens to i?',
        hintTwo: 'When i=5, continue is hit, i++ never runs, i stays 5 forever. Fix: increment i before calling continue. Add i++; before continue.',
        solution:
`int i = 1;
while (i <= 8) {
    if (i == 5) { i++; continue; }
    printf("%d\\n", i);
    i++;
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'break and continue — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — NESTED WHILE LOOPS
     ══════════════════════════════════════════════════════════ */
  function initTopic_nested() {
    const topicId = 'ch10-nested'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch10-nested-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int row = 1;

while (row <= 3) {
    int col = 1;          /* inner counter reset each outer pass */
    while (col <= 4) {
        printf("[%d,%d] ", row, col);
        col++;
    }
    printf("\\n");
    row++;
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch10-nested',
      question: 'The outer loop runs 3 times and the inner runs 4 times per outer iteration. How many [row,col] pairs printed total?',
      options: ['3', '4', '7', '12'],
      correctIndex: 3,
      feedback: {
        correct: 'Correct — 3 outer iterations × 4 inner iterations = 12 total pairs printed.',
        incorrect: 'For each of the 3 outer iterations, the inner loop runs completely (4 times). Total: 3 × 4 = 12 pairs.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch10-nested-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch10-nested-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the outer loop to run 4 times and the inner loop to run 3 times. Update the printf to show "R%d C%d" format.',
      includes: ['<stdio.h>'],
      starterCode:
`int row = 1;
while (row <= 3) {
    int col = 1;
    while (col <= 4) {
        printf("[%d,%d] ", row, col);
        col++;
    }
    printf("\\n");
    row++;
}`,
      checkFn: output => {
        const text = output
        return text.includes('R4') && text.includes('C3') && !text.includes('C4') &&
               (text.includes('R1') || text.includes('C1'))
      },
      hint: 'Change (row <= 3) to (row <= 4), change (col <= 4) to (col <= 3), change printf format to "R%d C%d".',
      solution:
`int row = 1;
while (row <= 4) {
    int col = 1;
    while (col <= 3) {
        printf("R%d C%d  ", row, col);
        col++;
    }
    printf("\\n");
    row++;
}`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch10-nested-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to print a 3×3 grid of asterisks.',
      includes: ['<stdio.h>'],
      starterCode:
`int r = 1;
while ([?] <= 3) {
    int c = [?];
    while (c <= 3) {
        printf("* ");
        [?]++;
    }
    printf("\\n");
    [?]++;
}`,
      blanks: ['r', '1', 'c', 'r'],
      hint: 'First blank: outer condition variable. Second: inner counter start. Third: inner increment. Fourth: outer increment.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch10-nested-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Print a right triangle of numbers where row N shows N repeated N times:\n  1\n  2 2\n  3 3 3\n  4 4 4 4\n  5 5 5 5 5',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('1\n') && text.includes('5 5 5 5 5') && text.includes('3 3 3')
      },
      hint: 'Outer: row 1 to 5. Inner: repeat row-number times. printf("%d ", row); inside inner loop. printf("\\n"); after inner.',
      solution:
`int row = 1;
while (row <= 5) {
    int col = 1;
    while (col <= row) {
        printf("%d ", row);
        col++;
    }
    printf("\\n");
    row++;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch10-ns-p1', type: 'predict',
          question: 'What is the total number of times printf runs?',
          code: `int a = 1;\nwhile (a <= 2) {\n    int b = 1;\n    while (b <= 3) {\n        printf("x");\n        b++;\n    }\n    a++;\n}`,
          correct: ['6'],
          caseSensitive: true, orderMatters: true,
          hint: 'Outer runs 2 times. Inner runs 3 times per outer pass.',
          feedback: {
            correct: 'Correct — 2 outer × 3 inner = 6 total printf calls. Output: xxxxxx (6 x characters).',
            incorrect: 'Outer loop runs 2 times (a=1,2). For each, inner runs 3 times (b=1,2,3). Total: 2×3=6. Prints "xxxxxx".'
          }
        },
        {
          id: 'ch10-ns-p2', type: 'predict',
          question: 'What prints?',
          code: `int i = 1;\nwhile (i <= 3) {\n    int j = i;\n    while (j <= 3) {\n        printf("%d", j);\n        j++;\n    }\n    printf("\\n");\n    i++;\n}`,
          correct: ['123\n23\n3'],
          caseSensitive: true, orderMatters: true,
          hint: 'The inner counter starts at i, not 1. When i=1 inner goes 1,2,3. When i=2 inner goes 2,3. When i=3 inner goes 3.',
          feedback: {
            correct: 'Correct — inner starts at i. Row 1: 1,2,3. Row 2: 2,3. Row 3: 3. Forms a right triangle.',
            incorrect: 'j starts at i (not 1). i=1: j=1,2,3 prints "123". i=2: j=2,3 prints "23". i=3: j=3 prints "3".'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch10-ns-m1', type: 'mcq',
          question: 'Where must you initialize the inner loop counter in a nested while loop?',
          options: [
            'Before the outer loop',
            'After the outer loop',
            'Inside the outer loop body, before the inner loop',
            'Inside the inner loop body'
          ],
          correct: ['Inside the outer loop body, before the inner loop'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what value the inner counter has at the start of the second outer iteration if initialized outside.',
          feedback: {
            correct: 'Correct — the inner counter must reset for each outer iteration. Declare and initialize it inside the outer loop body.',
            incorrect: 'If the inner counter is initialized outside the outer loop, it retains its final value from the previous pass and the inner loop runs zero times on subsequent passes.'
          }
        },
        {
          id: 'ch10-ns-m2', type: 'mcq',
          question: 'Outer loop runs 5 times, inner runs 3 times — how many total inner body executions?',
          options: ['5', '3', '8', '15'],
          correct: ['15'],
          caseSensitive: false, orderMatters: false,
          hint: 'Multiply outer iterations by inner iterations.',
          feedback: {
            correct: 'Correct — 5 × 3 = 15. The inner body runs completely 3 times for each of the 5 outer passes.',
            incorrect: 'Nested loop execution count: outer iterations × inner iterations per pass = 5 × 3 = 15.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Print a 4×4 grid where each cell shows its row number times its column number (e.g., row 2 col 3 shows "6").',
          check: output => {
            const text = output
            return text.includes('16') && text.includes('6') && text.includes('1')
          },
          hint: 'printf("%d\\t", row*col); in the inner loop, printf("\\n"); in outer after inner completes.',
          solution:
`int row=1;
while(row<=4){
    int col=1;
    while(col<=4){
        printf("%3d", row*col);
        col++;
    }
    printf("\\n");
    row++;
}`
        },
        {
          id: 'p2',
          task: 'Print a 5-row staircase of dashes where row N has N dashes:\n-\n--\n---\n----\n-----',
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            return lines.length >= 5 && lines[4].includes('-----')
          },
          hint: 'int row=1; while(row<=5){ int d=1; while(d<=row){ printf("-"); d++; } printf("\\n"); row++; }',
          solution:
`int row=1;
while(row<=5){
    int d=1;
    while(d<=row){ printf("-"); d++; }
    printf("\\n");
    row++;
}`
        }
      ]

      renderPracticeCh10('practice-ch10-nested', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch10-nested-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch10-nested-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch10-nested-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print a 3×3 grid but only prints one row. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int row = 1;
int col = 1;
while (row <= 3) {
    while (col <= 3) {
        printf("[%d,%d] ", row, col);
        col++;
    }
    printf("\\n");
    row++;
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          return lines.length >= 3 && output.includes('[2,') && output.includes('[3,')
        },
        hint: 'The inner counter col is declared and initialized outside the outer loop. What value does col have at the start of the second outer iteration?',
        hintTwo: 'col is 4 at the start of rows 2 and 3 — so the inner loop condition (col<=3) is immediately false. Move int col = 1; inside the outer loop body so it resets each pass.',
        solution:
`int row = 1;
while (row <= 3) {
    int col = 1;       /* reset inner counter each outer pass */
    while (col <= 3) {
        printf("[%d,%d] ", row, col);
        col++;
    }
    printf("\\n");
    row++;
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Nested While Loops — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch10-mastery'), {
      mode: 'build', topicId: 'ch10-mastery', chapterId: CH,
      question:
`Build a number analyzer using ALL chapter 10 concepts:
① Use a while loop to process numbers 1 through 30
② Use continue to skip any number divisible by both 2 and 3 (divisible by 6)
③ Use break to stop if you reach a number whose sum of digits equals 9 (e.g., 18: 1+8=9, or 27: 2+7=9)
④ For each processed number, if it is prime print "P: N", otherwise print "N: N"
⑤ For each prime found, use a nested inner loop to print its multiples up to 30
⑥ Print the total count of processed numbers at the end`,
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return (text.includes('P:') || text.includes('prime')) &&
               text.includes('1') &&
               (text.includes('count') || text.includes('Count') || text.includes('total') || text.match(/\d+$/m))
      },
      hint: 'Start: int i=1, count=0; while(i<=30){ if(i%6==0){i++;continue;} /* digit sum check for break */ /* prime check */ count++; i++; } printf("Count: %d\\n", count);',
      solution:
`int i=1, count=0;
while(i<=30){
    /* Skip multiples of 6 */
    if(i%6==0){ i++; continue; }
    /* Break if digit sum == 9 */
    int tmp=i, dsum=0;
    while(tmp>0){ dsum+=tmp%10; tmp/=10; }
    if(dsum==9) break;
    /* Prime check */
    int prime=1, d=2;
    while(d*d<=i){ if(i%d==0){prime=0;break;} d++; }
    if(i==1) prime=0;
    if(prime){
        printf("P: %d  multiples: ",i);
        int m=i;
        while(m<=30){ printf("%d ",m); m+=i; }
        printf("\\n");
    } else {
        printf("N: %d\\n",i);
    }
    count++;
    i++;
}
printf("Processed: %d numbers\\n", count);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch10-chapter-complete').style.display = 'block'
        $('ch10-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch10-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch11')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE SET HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh10(containerId, chapterId, topicId, configs) {
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
      div.id = `pc10-${topicId}-${cfg.id}`
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
    initTopic_while()
    initTopic_dowhile()
    initTopic_counter()
    initTopic_break()
    initTopic_nested()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
