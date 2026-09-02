/* =========================================================
   C LEARNING PLATFORM — chapters/ch11-for-loops/ch11.js
   Chapter 11: For Loops
   6 topics · 7-step structure · Assessment opens as popup modal
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch11'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — FOR LOOP STRUCTURE
     ══════════════════════════════════════════════════════════ */
  function initTopic_forloop() {
    const topicId = 'ch11-forloop'
    const sm = StepManager.init(topicId, 7, CH)

    /* ── Step 1: Explore ── */
    CCompiler.initBlock($('compiler-ch11-forloop-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`for (int i = 1; i <= 5; i++) {
    printf("i = %d\\n", i);
}

printf("Loop done. i no longer exists here.\\n");`,
      onPass: () => sm.complete(1)
    })

    /* ── Step 2: Instant question ── */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch11-forloop',
      question: 'The for loop printed 5 lines. It has three parts separated by semicolons. Which part controlled how many times the loop ran?',
      options: [
        'for — the keyword itself determines 5 iterations',
        'int i = 1 — the starting value controls the count',
        'i <= 5 — the condition determines when the loop stops',
        'i++ — the increment decides the total count'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — the condition (i <= 5) is checked before each iteration. When it becomes false, the loop stops. Change it to (i <= 10) and the loop runs 10 times.',
        incorrect: 'The condition (i <= 5) is evaluated before every iteration. The loop runs as long as it is true. When i becomes 6, the condition is false and the loop stops.'
      },
      onAnswer: () => sm.complete(2)
    })

    /* ── Step 3: Explanation ── */
    $('step-ch11-forloop-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* ── Step 4: Modify ── */
    CCompiler.initBlock($('compiler-ch11-forloop-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the loop to count from 10 down to 1. The initializer, condition, and update all need to change.',
      includes: ['<stdio.h>'],
      starterCode:
`for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
}`,
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
        return nums.includes(10) && nums.includes(1) && nums[0] === 10 && nums[nums.length-1] === 1
      },
      hint: 'Start at i=10, condition becomes i>=1, update becomes i-- (decrement).',
      solution:
`for (int i = 10; i >= 1; i--) {
    printf("%d\\n", i);
}`,
      onPass: () => sm.complete(4)
    })

    /* ── Step 5: Fill ── */
    CCompiler.initBlock($('compiler-ch11-forloop-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to print all even numbers from 2 to 10.',
      includes: ['<stdio.h>'],
      starterCode:
`for ([?] i = 2; i <= [?]; [?]) {
    printf("%d\\n", i);
}`,
      blanks: ['int', '10', 'i+=2'],
      hint: 'First: variable type. Second: the stopping value. Third: how to advance by 2 each time.',
      onPass: () => sm.complete(5)
    })

    /* ── Step 6: Build ── */
    CCompiler.initBlock($('compiler-ch11-forloop-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a for loop that prints the sum of all numbers from 1 to 100. Expected output: Sum: 5050',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('5050'),
      hint: 'int sum=0; for(int i=1; i<=100; i++){ sum+=i; } printf("Sum: %d\\n", sum);',
      solution:
`int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
printf("Sum: %d\\n", sum);`,
      onPass: () => sm.complete(6)
    })

    /* ── Step 7: Real-world (completes immediately) ── */
    sm.complete(7)

    /* ── Assessment ── */
    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch11-fl-p1', type: 'predict',
          question: 'What prints?',
          code: `for (int i = 0; i < 4; i++) {\n    printf("%d ", i);\n}`,
          correct: ['0 1 2 3', '0 1 2 3 '],
          caseSensitive: true, orderMatters: true,
          hint: 'i starts at 0 and the condition is strictly less than 4.',
          feedback: {
            correct: 'Correct — i takes values 0, 1, 2, 3. When i becomes 4, the condition (i<4) is false.',
            incorrect: 'i starts at 0 and increments: 0, 1, 2, 3. When i=4, (i<4) is false, loop stops. Output: 0 1 2 3.'
          }
        },
        {
          id: 'ch11-fl-p2', type: 'predict',
          question: 'What prints?',
          code: `for (int i = 2; i <= 8; i += 3) {\n    printf("%d\\n", i);\n}`,
          correct: ['2\n5\n8'],
          caseSensitive: true, orderMatters: true,
          hint: 'i starts at 2 and increases by 3 each iteration: 2, 5, 8, then 11 which fails i<=8.',
          feedback: {
            correct: 'Correct — i goes 2 → 5 → 8 → 11 (fails). Prints 2, 5, 8.',
            incorrect: 'i goes 2, then 2+3=5, then 5+3=8, then 8+3=11 which fails (i<=8). Prints 2, 5, 8.'
          }
        },
        {
          id: 'ch11-fl-p3', type: 'predict',
          question: 'What prints?',
          code: `int total = 0;\nfor (int i = 1; i <= 4; i++) {\n    total += i;\n}\nprintf("%d\\n", total);`,
          correct: ['10'],
          caseSensitive: true, orderMatters: true,
          hint: 'Accumulate: total goes 0+1=1, +2=3, +3=6, +4=10.',
          feedback: {
            correct: 'Correct — total accumulates: 0+1+2+3+4 = 10.',
            incorrect: 'total starts at 0 and adds each i: +1=1, +2=3, +3=6, +4=10. Output: 10.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch11-fl-m1', type: 'mcq',
          question: 'What is the correct order of execution in each for loop iteration?',
          options: [
            'initializer → body → condition → update',
            'initializer → condition → body → update',
            'condition → initializer → body → update',
            'condition → body → update → initializer'
          ],
          correct: ['initializer → condition → body → update'],
          caseSensitive: false, orderMatters: false,
          hint: 'The initializer only runs once. After that, it is condition first.',
          feedback: {
            correct: 'Correct — initializer runs once before anything. Then: check condition → run body → run update → back to check condition.',
            incorrect: 'The initializer runs once at the very start. Each subsequent iteration: condition check → body → update → back to condition.'
          }
        },
        {
          id: 'ch11-fl-m2', type: 'mcq',
          question: 'for (int i = 5; i <= 5; i++) — how many times does the body run?',
          options: ['0', '1', '5', 'Infinite'],
          correct: ['1'],
          caseSensitive: false, orderMatters: false,
          hint: 'Check: is (5 <= 5) true?',
          feedback: {
            correct: 'Correct — i starts at 5, condition (5<=5) is true, body runs once, i becomes 6, condition (6<=5) is false, loop exits.',
            incorrect: 'i=5 on first check. (5<=5) is true → body runs. i becomes 6. (6<=5) is false → exits. Body ran exactly once.'
          }
        },
        {
          id: 'ch11-fl-m3', type: 'mcq',
          question: 'What separates the three parts of a for loop header?',
          options: ['Commas', 'Colons', 'Semicolons', 'Parentheses'],
          correct: ['Semicolons'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think: for (part1 X part2 X part3)',
          feedback: {
            correct: 'Correct — for (init; condition; update) — two semicolons separate the three parts.',
            incorrect: 'for (init; condition; update) — semicolons separate the three parts. Always exactly two semicolons inside the parentheses.'
          }
        },
        {
          id: 'ch11-fl-m4', type: 'mcq',
          question: 'for (int i = 1; i < 10; i += 2) — what are the values i takes?',
          options: [
            '1, 3, 5, 7, 9',
            '1, 2, 4, 6, 8',
            '1, 3, 5, 7, 9, 11',
            '2, 4, 6, 8, 10'
          ],
          correct: ['1, 3, 5, 7, 9'],
          caseSensitive: false, orderMatters: false,
          hint: 'Start at 1, add 2 each time, stop before reaching 10.',
          feedback: {
            correct: 'Correct — starting at 1, adding 2: 1, 3, 5, 7, 9. Next would be 11 which fails (i<10).',
            incorrect: 'i starts at 1 and increases by 2: 1, 3, 5, 7, 9. After 9, i becomes 11 which fails (i<10).'
          }
        },
        {
          id: 'ch11-fl-m5', type: 'mcq',
          question: 'What happens when you leave the condition blank: for (int i=0; ; i++)?',
          options: [
            'The loop runs 0 times',
            'The loop runs once',
            'The loop runs forever — blank condition is always true',
            'Compile error — condition is required'
          ],
          correct: ['The loop runs forever — blank condition is always true'],
          caseSensitive: false, orderMatters: false,
          hint: 'An empty for loop condition is a special case in C.',
          feedback: {
            correct: 'Correct — in C, a blank for loop condition is treated as always-true. for(;;) is the idiomatic infinite loop.',
            incorrect: 'An empty condition in a for loop is treated as always true in C. for(;;) creates an infinite loop — it needs a break or return inside to exit.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Print numbers 1 through 10 using a for loop, each on its own line.',
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
            return nums.includes(1) && nums.includes(10) && nums.length >= 10
          },
          hint: 'for (int i = 1; i <= 10; i++) { printf("%d\\n", i); }',
          solution: `for (int i = 1; i <= 10; i++) {\n    printf("%d\\n", i);\n}`
        },
        {
          id: 'p2',
          task: 'Print all odd numbers from 1 to 19 using a for loop.',
          check: output => {
            const text = output
            return text.includes('1') && text.includes('19') && text.includes('11') && text.includes('7')
          },
          hint: 'for (int i = 1; i <= 19; i += 2) { printf("%d\\n", i); }',
          solution: `for (int i = 1; i <= 19; i += 2) {\n    printf("%d\\n", i);\n}`
        },
        {
          id: 'p3',
          task: 'Count from 100 down to 0 in steps of 10 (100, 90, 80, ... 0).',
          check: output => {
            const text = output.replace(/\s+/g, ' ')
            return text.includes('100') && text.includes('0') && text.includes('50') && text.includes('90')
          },
          hint: 'for (int i = 100; i >= 0; i -= 10) { printf("%d\\n", i); }',
          solution: `for (int i = 100; i >= 0; i -= 10) {\n    printf("%d\\n", i);\n}`
        },
        {
          id: 'p4',
          task: 'Compute 5 factorial (5! = 1×2×3×4×5 = 120). Print: Factorial: 120',
          check: output => output.includes('120'),
          hint: 'int f=1; for(int i=1; i<=5; i++){ f*=i; } printf("Factorial: %d\\n", f);',
          solution: `int f=1;\nfor(int i=1; i<=5; i++){ f*=i; }\nprintf("Factorial: %d\\n", f);`
        },
        {
          id: 'p5',
          task: 'Print the first 8 powers of 2 starting at 2^1: 2, 4, 8, 16, 32, 64, 128, 256.',
          check: output => {
            const text = output.replace(/\s+/g, ' ')
            return text.includes('2') && text.includes('256') && text.includes('64') && text.includes('128')
          },
          hint: 'for(int p=1; p<=8; p++){ int v=1; for(int j=0;j<p;j++) v*=2; printf("%d\\n",v); }',
          solution:
`int power = 1;
for (int i = 0; i < 8; i++) {
    power *= 2;
    printf("%d\\n", power);
}`
        }
      ]

      renderPracticeCh11('practice-ch11-forloop', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch11-forloop-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch11-forloop-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch11-forloop-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 1 through 5 but prints nothing. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`for (int i = 1; i <= 5; i++);
{
    printf("%d\\n", i);
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
          return nums.includes(1) && nums.includes(5) && nums.length >= 5
        },
        hint: 'Look very carefully at the end of the for line — is there anything that should not be there?',
        hintTwo: 'There is a semicolon after the closing parenthesis: for(...); — this creates an empty body. The for loop runs 5 times doing nothing. Remove the semicolon after the ).',
        solution:
`for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'The for Loop — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — FOR WITH ARRAYS (PREVIEW)
     ══════════════════════════════════════════════════════════ */
  function initTopic_arrays() {
    const topicId = 'ch11-arrays'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch11-arrays-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int scores[5] = {88, 72, 95, 61, 84};

for (int i = 0; i < 5; i++) {
    printf("scores[%d] = %d\\n", i, scores[i]);
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch11-arrays',
      question: 'The array has 5 elements. The loop uses i < 5, not i <= 5. What would happen if you changed it to i <= 5?',
      options: [
        'Nothing — both conditions access the same elements',
        'The loop would access index 5, which is past the end of the array',
        'The loop would only access 4 elements instead of 5',
        'The loop would run twice as many times'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — index 5 does not exist in a 5-element array (valid indices: 0–4). C will not stop you — it reads whatever memory happens to be at that location.',
        incorrect: 'i <= 5 would include i=5. A 5-element array has valid indices 0, 1, 2, 3, 4. Index 5 is out of bounds — C reads undefined memory and may crash or produce garbage.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch11-arrays-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch11-arrays-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a second loop after the first that computes and prints the sum of all scores. Expected format: Sum: 400',
      includes: ['<stdio.h>'],
      starterCode:
`int scores[5] = {88, 72, 95, 61, 84};

for (int i = 0; i < 5; i++) {
    printf("scores[%d] = %d\\n", i, scores[i]);
}`,
      checkFn: output => output.includes('400') || output.includes('Sum'),
      hint: 'int sum=0; for(int i=0; i<5; i++){ sum += scores[i]; } printf("Sum: %d\\n", sum);',
      solution:
`int scores[5] = {88, 72, 95, 61, 84};
for (int i = 0; i < 5; i++) {
    printf("scores[%d] = %d\\n", i, scores[i]);
}
int sum = 0;
for (int i = 0; i < 5; i++) { sum += scores[i]; }
printf("Sum: %d\\n", sum);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch11-arrays-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to find and print the maximum value in the array.',
      includes: ['<stdio.h>'],
      starterCode:
`int nums[6] = {14, 3, 27, 9, 41, 5};
int max = nums[[?]];

for (int i = [?]; i < 6; i++) {
    if (nums[i] > [?]) {
        max = nums[i];
    }
}
printf("Max: %d\\n", max);`,
      blanks: ['0', '1', 'max'],
      hint: 'First: initialize max from the first element at index 0. Second: start comparing from index 1. Third: the variable holding the current maximum.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch11-arrays-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Given: int temps[7] = {22, 18, 25, 30, 19, 27, 24};\nCompute and print:\n  Average: [value]\n  Max: 30\n  Min: 18',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('30') && text.includes('18') &&
               (text.includes('Average') || text.includes('average') || text.includes('avg'))
      },
      hint: 'Use one loop to find sum, max, min all at once. int sum=0, max=temps[0], min=temps[0]; then loop updating all three.',
      solution:
`int temps[7] = {22, 18, 25, 30, 19, 27, 24};
int sum=0, max=temps[0], min=temps[0];
for (int i = 0; i < 7; i++) {
    sum += temps[i];
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
}
printf("Average: %d\\n", sum/7);
printf("Max: %d\\n", max);
printf("Min: %d\\n", min);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch11-ar-p1', type: 'predict',
          question: 'What prints?',
          code: `int a[4] = {10, 20, 30, 40};\nfor (int i = 0; i < 4; i++) {\n    printf("%d\\n", a[i] * 2);\n}`,
          correct: ['20\n40\n60\n80'],
          caseSensitive: true, orderMatters: true,
          hint: 'Each element is doubled before printing.',
          feedback: {
            correct: 'Correct — 10×2=20, 20×2=40, 30×2=60, 40×2=80.',
            incorrect: 'Each a[i] is multiplied by 2: 20, 40, 60, 80.'
          }
        },
        {
          id: 'ch11-ar-p2', type: 'predict',
          question: 'What prints?',
          code: `int n[5] = {3, 1, 4, 1, 5};\nint cnt = 0;\nfor (int i = 0; i < 5; i++) {\n    if (n[i] > 2) cnt++;\n}\nprintf("%d\\n", cnt);`,
          correct: ['3'],
          caseSensitive: true, orderMatters: true,
          hint: 'Count elements greater than 2: 3, 4, 5 qualify. 1 and 1 do not.',
          feedback: {
            correct: 'Correct — 3 > 2, 1 not, 4 > 2, 1 not, 5 > 2. Count = 3.',
            incorrect: 'Elements > 2: 3 (yes), 1 (no), 4 (yes), 1 (no), 5 (yes). cnt = 3.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch11-ar-m1', type: 'mcq',
          question: 'For an array declared as int x[6], what is the valid index range?',
          options: ['1 to 6', '0 to 6', '0 to 5', '1 to 5'],
          correct: ['0 to 5'],
          caseSensitive: false, orderMatters: false,
          hint: 'Arrays in C start at index 0.',
          feedback: {
            correct: 'Correct — a 6-element array has indices 0, 1, 2, 3, 4, 5. Index 6 is out of bounds.',
            incorrect: 'C arrays start at index 0. A 6-element array has valid indices 0 through 5 (N elements = indices 0 to N-1).'
          }
        },
        {
          id: 'ch11-ar-m2', type: 'mcq',
          question: 'What is the correct for loop condition to safely iterate all elements of int data[8]?',
          options: ['i <= 8', 'i < 8', 'i < 9', 'i <= 7'],
          correct: ['i < 8'],
          caseSensitive: true, orderMatters: false,
          hint: 'The size is 8. The last valid index is 7.',
          feedback: {
            correct: 'Correct — i < 8 generates i = 0,1,2,3,4,5,6,7 which are all valid indices for an 8-element array.',
            incorrect: 'For int data[8]: valid indices are 0–7. The loop condition should be i < 8 (equivalent to i <= 7). i <= 8 would access index 8 which is out of bounds.'
          }
        },
        {
          id: 'ch11-ar-m3', type: 'mcq',
          question: 'What happens if you access array[size] in C (one past the end)?',
          options: [
            'C prints an error message automatically',
            'The program always crashes immediately',
            'Undefined behavior — anything can happen including crashes or silent corruption',
            'The value is always 0'
          ],
          correct: ['Undefined behavior — anything can happen including crashes or silent corruption'],
          caseSensitive: false, orderMatters: false,
          hint: 'C does not have bounds checking built in.',
          feedback: {
            correct: 'Correct — C has no runtime bounds checking. Accessing out-of-bounds memory is undefined behavior: it may crash, silently corrupt other variables, or appear to work.',
            incorrect: 'C does not check array bounds at runtime. Going out of bounds is undefined behavior — results vary: sometimes crashes, sometimes garbage values, sometimes corruption of other variables.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Given int vals[5] = {7, 3, 9, 2, 6}; print each element on its own line.',
          check: output => {
            const text = output.replace(/\s+/g, ' ')
            return text.includes('7') && text.includes('3') && text.includes('9') && text.includes('2') && text.includes('6')
          },
          hint: 'int vals[5]={7,3,9,2,6}; for(int i=0;i<5;i++){ printf("%d\\n",vals[i]); }',
          solution: `int vals[5]={7,3,9,2,6};\nfor(int i=0;i<5;i++){\n    printf("%d\\n",vals[i]);\n}`
        },
        {
          id: 'p2',
          task: 'Given int nums[6] = {4, 8, 15, 16, 23, 42}; find and print the minimum value.',
          check: output => output.includes('4'),
          hint: 'int min=nums[0]; for(int i=1;i<6;i++){ if(nums[i]<min) min=nums[i]; } printf("Min: %d\\n",min);',
          solution:
`int nums[6]={4,8,15,16,23,42};
int min=nums[0];
for(int i=1;i<6;i++){
    if(nums[i]<min) min=nums[i];
}
printf("Min: %d\\n",min);`
        },
        {
          id: 'p3',
          task: 'Given int data[8] = {5,2,8,1,9,3,7,4}; count how many values are above 5 and print: Count: N',
          check: output => output.includes('3') || output.includes('Count'),
          hint: 'int count=0; for(int i=0;i<8;i++){ if(data[i]>5) count++; } printf("Count: %d\\n",count);',
          solution:
`int data[8]={5,2,8,1,9,3,7,4};
int count=0;
for(int i=0;i<8;i++){
    if(data[i]>5) count++;
}
printf("Count: %d\\n",count);`
        }
      ]

      renderPracticeCh11('practice-ch11-arrays', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch11-arrays-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch11-arrays-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch11-arrays-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print all 5 array values but the last one is wrong or missing. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int arr[5] = {10, 20, 30, 40, 50};

for (int i = 1; i <= 5; i++) {
    printf("%d\\n", arr[i]);
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
          return nums.includes(10) && nums.includes(50) && nums.length === 5
        },
        hint: 'Check the starting index and the condition. What is the first element of a C array?',
        hintTwo: 'i starts at 1, missing arr[0] which is 10. Also i<=5 accesses arr[5] which is out of bounds. Fix: start at i=0 and use i<5.',
        solution:
`int arr[5] = {10, 20, 30, 40, 50};
for (int i = 0; i < 5; i++) {
    printf("%d\\n", arr[i]);
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'for with Arrays — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — NESTED FOR LOOPS
     ══════════════════════════════════════════════════════════ */
  function initTopic_nested() {
    const topicId = 'ch11-nested'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch11-nested-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 4; col++) {
        printf("%3d", row * col);
    }
    printf("\\n");
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch11-nested',
      question: 'The outer loop ran 3 times and the inner ran 4 times each pass. How many total times did printf run?',
      options: ['3', '4', '7', '12'],
      correctIndex: 3,
      feedback: {
        correct: 'Correct — 3 outer × 4 inner = 12 total printf calls. Nested loops multiply their iteration counts.',
        incorrect: 'For each of the 3 outer iterations, the inner loop runs completely 4 times. Total: 3 × 4 = 12 printf calls.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch11-nested-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch11-nested-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the nested loop to print a 5×5 multiplication table. Align columns using printf("%4d", ...).',
      includes: ['<stdio.h>'],
      starterCode:
`for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 4; col++) {
        printf("%3d", row * col);
    }
    printf("\\n");
}`,
      checkFn: output => {
        const text = output
        return text.includes('25') && text.includes('5') &&
               (text.match(/\n/g) || []).length >= 4
      },
      hint: 'Change both loop limits to <= 5.',
      solution:
`for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= 5; col++) {
        printf("%4d", row * col);
    }
    printf("\\n");
}`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch11-nested-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to print a right triangle of asterisks (5 rows).',
      includes: ['<stdio.h>'],
      starterCode:
`for (int i = 1; i <= 5; [?]) {
    for (int j = 1; j [?] i; j++) {
        printf("*");
    }
    printf("[?]");
}`,
      blanks: ['i++', '<=', '\\n'],
      hint: 'First: outer increment. Second: inner condition using row number. Third: newline to move to next row.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch11-nested-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Print a 4×4 grid where each cell shows the sum of its row and column indices (row+col):\n  2 3 4 5\n  3 4 5 6\n  4 5 6 7\n  5 6 7 8',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('2') && text.includes('8') &&
               (text.match(/\n/g) || []).length >= 3
      },
      hint: 'for(int r=1;r<=4;r++){ for(int c=1;c<=4;c++){ printf("%3d",r+c); } printf("\\n"); }',
      solution:
`for (int r = 1; r <= 4; r++) {
    for (int c = 1; c <= 4; c++) {
        printf("%3d", r + c);
    }
    printf("\\n");
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch11-ns-p1', type: 'predict',
          question: 'How many characters print total?',
          code: `for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        printf("X");\n    }\n}\nprintf("\\n");`,
          correct: ['XXXXXXXXX'],
          caseSensitive: true, orderMatters: true,
          hint: '3 × 3 = 9 X characters, then a newline.',
          feedback: {
            correct: 'Correct — 3 outer × 3 inner = 9 X characters on one line.',
            incorrect: '3 outer iterations, 3 inner each = 9 printf("X") calls. Output: XXXXXXXXX on one line.'
          }
        },
        {
          id: 'ch11-ns-p2', type: 'predict',
          question: 'What prints?',
          code: `for (int i = 1; i <= 3; i++) {\n    for (int j = i; j <= 3; j++) {\n        printf("%d", j);\n    }\n    printf("\\n");\n}`,
          correct: ['123\n23\n3'],
          caseSensitive: true, orderMatters: true,
          hint: 'Inner starts at i. Row 1: j=1,2,3. Row 2: j=2,3. Row 3: j=3.',
          feedback: {
            correct: 'Correct — inner starts at i each time. Row 1: 1,2,3. Row 2: 2,3. Row 3: 3.',
            incorrect: 'j starts at i (not 0). Row i=1: j=1,2,3 → "123". Row i=2: j=2,3 → "23". Row i=3: j=3 → "3".'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch11-ns-m1', type: 'mcq',
          question: 'Why does inner for loops NOT need manual counter reset like nested while loops do?',
          options: [
            'for loops automatically reset after 10 iterations',
            'The initializer in the for header re-runs at the start of each outer iteration',
            'The compiler resets inner for loop variables automatically',
            'For loops share counter state so no reset is needed'
          ],
          correct: ['The initializer in the for header re-runs at the start of each outer iteration'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about when the initializer part of a for loop runs.',
          feedback: {
            correct: 'Correct — for (int j = 0; ...) re-executes the initializer (int j=0) fresh each time the outer loop body runs, automatically resetting j.',
            incorrect: 'The for loop header includes the initializer which runs at the start of each entry into that loop block — meaning it resets j automatically for each outer iteration.'
          }
        },
        {
          id: 'ch11-ns-m2', type: 'mcq',
          question: 'Outer loop runs 4 times, inner runs 6 times — total inner body executions?',
          options: ['4', '6', '10', '24'],
          correct: ['24'],
          caseSensitive: false, orderMatters: false,
          hint: 'Multiply.',
          feedback: {
            correct: 'Correct — 4 outer passes × 6 inner iterations each = 24 total inner body executions.',
            incorrect: 'Nested loop total = outer × inner = 4 × 6 = 24.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Print a 3×5 grid of the number 0 (3 rows, 5 columns per row).',
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            return lines.length >= 3 && lines[0].includes('0')
          },
          hint: 'for(int r=0;r<3;r++){ for(int c=0;c<5;c++){ printf("0 "); } printf("\\n"); }',
          solution: `for(int r=0;r<3;r++){\n    for(int c=0;c<5;c++){ printf("0 "); }\n    printf("\\n");\n}`
        },
        {
          id: 'p2',
          task: 'Print a staircase pattern using # where row N has N hashes:\n#\n##\n###\n####\n#####',
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim())
            return lines.length >= 5 && lines[4].includes('#####')
          },
          hint: 'for(int r=1;r<=5;r++){ for(int c=1;c<=r;c++){ printf("#"); } printf("\\n"); }',
          solution:
`for (int r = 1; r <= 5; r++) {
    for (int c = 1; c <= r; c++) { printf("#"); }
    printf("\\n");
}`
        }
      ]

      renderPracticeCh11('practice-ch11-nested', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch11-nested-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch11-nested-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch11-nested-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print a 3×3 multiplication table but each row is identical. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 3; col++) {
        printf("%4d", col * col);
    }
    printf("\\n");
}`,
        checkFn: output => {
          const text = output
          return text.includes('2') && text.includes('4') && text.includes('6') && text.includes('9')
        },
        hint: 'Look at what the printf calculates. Is it using both row and col?',
        hintTwo: 'printf prints col * col (squaring col) instead of row * col. Change col * col to row * col.',
        solution:
`for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 3; col++) {
        printf("%4d", row * col);
    }
    printf("\\n");
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Nested for Loops — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — LOOP VARIABLE SCOPE
     ══════════════════════════════════════════════════════════ */
  function initTopic_scope() {
    const topicId = 'ch11-scope'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch11-scope-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* i declared outside — survives the loop */
int i;
for (i = 0; i < 5; i++) {
    printf("inside: i = %d\\n", i);
}
printf("after loop: i = %d\\n", i);  /* i still accessible */`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch11-scope',
      question: 'i was declared BEFORE the for loop, not inside it. What value did it have after the loop finished?',
      options: [
        '4 — the last value it held while the loop ran',
        '5 — the value that made the condition false',
        '0 — it resets to the start value after the loop',
        'Undefined — it is destroyed when the loop ends'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — when the condition (i < 5) became false at i=5, the loop exited. i retains that final value of 5.',
        incorrect: 'The loop exits when i=5 makes the condition (i < 5) false. i retains the value 5 after the loop, since it was declared outside.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch11-scope-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch11-scope-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the loop to search for the first value > 50 in the array, then print which index it was found at. Declare i before the loop so it is accessible after.',
      includes: ['<stdio.h>'],
      starterCode:
`int data[5] = {12, 67, 34, 88, 5};
int found_idx = -1;

for (int i = 0; i < 5; i++) {
    printf("data[%d] = %d\\n", i, data[i]);
}`,
      checkFn: output => output.includes('1') && (output.includes('found') || output.includes('Found') || output.includes('idx')),
      hint: 'Declare int i; before the loop. Add: if(data[i]>50){ found_idx=i; break; } inside. After: printf("Found at: %d\\n", found_idx);',
      solution:
`int data[5] = {12, 67, 34, 88, 5};
int found_idx = -1;
int i;
for (i = 0; i < 5; i++) {
    if (data[i] > 50) { found_idx = i; break; }
}
printf("Found at index: %d\\n", found_idx);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch11-scope-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks. The search loop needs i accessible after to report where it stopped.',
      includes: ['<stdio.h>'],
      starterCode:
`int arr[6] = {5, 9, 3, 7, 1, 8};
[?] i;  /* declare outside so it survives the loop */

for ([?] = 0; i < 6; i++) {
    if (arr[i] == 7) break;
}

printf("Found 7 at index: %d\\n", [?]);`,
      blanks: ['int', 'i', 'i'],
      hint: 'First: declare i before the for loop. Second: initialize i in the for header without re-declaring. Third: use i after the loop.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch11-scope-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Search int prices[5] = {45, 120, 30, 87, 60}; for the first price above 80.\nPrint: First expensive item at index: N (or "None found" if none qualify)',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('1') && (text.includes('index') || text.includes('at') || text.includes('found'))
      },
      hint: 'int i; for(i=0;i<5;i++){ if(prices[i]>80) break; } if(i<5) printf("First expensive item at index: %d\\n",i); else printf("None found\\n");',
      solution:
`int prices[5] = {45, 120, 30, 87, 60};
int i;
for (i = 0; i < 5; i++) {
    if (prices[i] > 80) break;
}
if (i < 5) printf("First expensive item at index: %d\\n", i);
else printf("None found\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch11-sc-p1', type: 'predict',
          question: 'What prints?',
          code: `int j;\nfor (j = 0; j < 3; j++) {}\nprintf("%d\\n", j);`,
          correct: ['3'],
          caseSensitive: true, orderMatters: true,
          hint: 'j is declared outside. The loop exits when the condition j<3 is false. What makes it false?',
          feedback: {
            correct: 'Correct — j is declared outside the loop. Loop exits when j=3 makes (j<3) false. j remains 3.',
            incorrect: 'j is outside the loop so it survives. Loop exits when j becomes 3 (condition false). printf prints 3.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch11-sc-m1', type: 'mcq',
          question: 'for (int i = 0; i < 5; i++) {} — can you use i after this loop?',
          options: [
            'Yes — i is still accessible',
            'No — i declared in the for header only exists inside the loop',
            'Only in the same function',
            'Only if i is declared global'
          ],
          correct: ['No — i declared in the for header only exists inside the loop'],
          caseSensitive: false, orderMatters: false,
          hint: 'Where is i declared in this version?',
          feedback: {
            correct: 'Correct — int i in the for header declares i with scope limited to the loop. It ceases to exist after the closing brace.',
            incorrect: 'When you write for (int i = ...), i is scoped to the loop body. It cannot be accessed after the loop\'s closing brace.'
          }
        },
        {
          id: 'ch11-sc-m2', type: 'mcq',
          question: 'When do you need to declare the loop counter BEFORE the for loop?',
          options: [
            'Always — it is better style',
            'Never — for loops must have the counter in the header',
            'When you need to know the final counter value after the loop exits',
            'Only when using nested loops'
          ],
          correct: ['When you need to know the final counter value after the loop exits'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about search patterns — why would you need i after break?',
          feedback: {
            correct: 'Correct — declare before the loop when you need the exit value of i, typically after using break to stop early and want to know where.',
            incorrect: 'Declare i before the for loop only when you need i\'s value after the loop — for example, to know which index triggered a break.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Search int nums[5] = {3, 7, 2, 9, 4}; for the value 9. Print its index. Declare i outside the loop.',
          check: output => output.includes('3'),
          hint: 'int i; for(i=0;i<5;i++){ if(nums[i]==9) break; } printf("Index: %d\\n",i);',
          solution:
`int nums[5]={3,7,2,9,4};
int i;
for(i=0;i<5;i++){
    if(nums[i]==9) break;
}
printf("Index: %d\\n",i);`
        }
      ]

      renderPracticeCh11('practice-ch11-scope', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch11-scope-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch11-scope-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch11-scope-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print where the loop stopped, but does not compile. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`for (int k = 0; k < 10; k++) {
    if (k * k > 50) break;
}
printf("Stopped at k = %d\\n", k);`,
        checkFn: output => output.includes('8') || output.includes('Stopped'),
        hint: 'k is declared inside the for header. Can it be accessed in the printf after the loop?',
        hintTwo: 'k is scoped to the for loop. Declare int k; before the loop and change the for header to just k=0 (no int keyword).',
        solution:
`int k;
for (k = 0; k < 10; k++) {
    if (k * k > 50) break;
}
printf("Stopped at k = %d\\n", k);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Loop Variable Scope — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — FOR VS WHILE
     ══════════════════════════════════════════════════════════ */
  function initTopic_vwhile() {
    const topicId = 'ch11-vwhile'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch11-vwhile-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Both do exactly the same thing */
printf("for loop: ");
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);
}
printf("\\n");

printf("while loop: ");
int j = 1;
while (j <= 5) {
    printf("%d ", j);
    j++;
}
printf("\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch11-vwhile',
      question: 'Both loops produced identical output. When would you prefer for over while?',
      options: [
        'Always — for is faster than while',
        'When the number of iterations is known in advance (fixed count)',
        'When you need the loop to run at least once',
        'When the loop condition involves a boolean variable'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — for is preferred when you know the iteration count upfront. The compact header makes the intent obvious. while is preferred when the stopping condition is discovered dynamically.',
        incorrect: 'for and while are functionally identical. Use for when the count is known (process 10 items, count to 100). Use while when the stopping condition emerges during execution.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch11-vwhile-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch11-vwhile-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Convert the while loop to a for loop that produces the same output. The for version should be more compact.',
      includes: ['<stdio.h>'],
      starterCode:
`int n = 1;
while (n <= 10) {
    printf("%d\\n", n * n);
    n++;
}`,
      checkFn: output => {
        const text = output
        return text.includes('1') && text.includes('100') && text.includes('25') && text.includes('64')
      },
      hint: 'for (int n = 1; n <= 10; n++) { printf("%d\\n", n * n); }',
      solution:
`for (int n = 1; n <= 10; n++) {
    printf("%d\\n", n * n);
}`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch11-vwhile-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to convert this for loop into an equivalent while loop.',
      includes: ['<stdio.h>'],
      starterCode:
`/* Original for loop: for (int i=0; i<8; i+=2) */

[?] i = 0;
[?] (i < 8) {
    printf("%d\\n", i);
    i [?];
}`,
      blanks: ['int', 'while', '+=2'],
      hint: 'First: declare and initialize i. Second: the while keyword. Third: the same update as the for loop.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch11-vwhile-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write BOTH a for loop AND a while loop, each printing the same output: the squares of numbers 1 through 6 (1, 4, 9, 16, 25, 36).',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        const count36 = (text.match(/36/g) || []).length
        const count1 = (text.match(/\b1\b/g) || []).length
        return count36 >= 2 && text.includes('4') && text.includes('25')
      },
      hint: 'Write the for version first, then immediately write an equivalent while version below it.',
      solution:
`/* for loop version */
for (int i = 1; i <= 6; i++) {
    printf("%d\\n", i * i);
}
/* while loop version */
int j = 1;
while (j <= 6) {
    printf("%d\\n", j * j);
    j++;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch11-vw-p1', type: 'predict',
          question: 'What prints?',
          code: `int n = 256;\nwhile (n > 1) { n /= 2; }\nprintf("%d\\n", n);`,
          correct: ['1'],
          caseSensitive: true, orderMatters: true,
          hint: 'n halves: 256,128,64,32,16,8,4,2,1. When n=1, n>1 is false.',
          feedback: {
            correct: 'Correct — n halves repeatedly until it reaches 1. The loop exits and prints 1.',
            incorrect: 'n goes 256→128→64→32→16→8→4→2→1. When n=1, (n>1) is false, loop exits. Prints 1.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch11-vw-m1', type: 'mcq',
          question: 'Which loop is most natural for "print the first 20 lines of a file"?',
          options: ['do-while', 'while', 'for', 'All are equally natural'],
          correct: ['for'],
          caseSensitive: false, orderMatters: false,
          hint: 'Do you know the count in advance?',
          feedback: {
            correct: 'Correct — "first 20 lines" is a known count. for (int i = 0; i < 20; i++) makes the intent immediately clear.',
            incorrect: '"First 20 lines" is a fixed, known count — for is the natural choice. for (int i=0; i<20; i++) expresses exactly 20 iterations.'
          }
        },
        {
          id: 'ch11-vw-m2', type: 'mcq',
          question: 'Which loop is most natural for "keep asking for a password until correct"?',
          options: ['for', 'while', 'for with a large limit', 'Neither — use goto'],
          correct: ['while'],
          caseSensitive: false, orderMatters: false,
          hint: 'Do you know how many attempts it will take?',
          feedback: {
            correct: 'Correct — the count is unknown. while (!correct) { try again } makes the intent obvious.',
            incorrect: 'The number of attempts is unknown in advance. while (!correct) is natural — the stopping condition is what matters, not a count.'
          }
        },
        {
          id: 'ch11-vw-m3', type: 'mcq',
          question: 'Can every for loop be rewritten as a while loop with identical behavior?',
          options: [
            'No — they have different performance',
            'No — for loops have special compiler optimizations',
            'Yes — they are interchangeable, the choice is purely stylistic',
            'Only if the loop body does not use break'
          ],
          correct: ['Yes — they are interchangeable, the choice is purely stylistic'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what makes them different structurally.',
          feedback: {
            correct: 'Correct — for and while are 100% interchangeable. The choice is about readability and communicating intent.',
            incorrect: 'for and while produce identical machine code. They are interchangeable; the choice only affects code clarity.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Use a for loop to print the first 5 multiples of 7: 7, 14, 21, 28, 35.',
          check: output => {
            const text = output.replace(/\s+/g,' ')
            return text.includes('7') && text.includes('35') && text.includes('21')
          },
          hint: 'for(int i=1;i<=5;i++){ printf("%d\\n",i*7); }',
          solution: `for(int i=1;i<=5;i++){ printf("%d\\n",i*7); }`
        },
        {
          id: 'p2',
          task: 'Rewrite using a while loop: for (int i = 0; i < 6; i++) { printf("%d\\n", i*i); }',
          check: output => {
            const text = output
            return text.includes('0') && text.includes('25') && text.includes('16') && text.includes('9')
          },
          hint: 'int i=0; while(i<6){ printf("%d\\n",i*i); i++; }',
          solution: `int i=0;\nwhile(i<6){ printf("%d\\n",i*i); i++; }`
        }
      ]

      renderPracticeCh11('practice-ch11-vwhile', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch11-vwhile-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch11-vwhile-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch11-vwhile-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This while loop should print 1–5 but runs forever. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`int i = 1;
while (i <= 5) {
    printf("%d\\n", i);
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
          return nums.includes(1) && nums.includes(5) && nums.length === 5
        },
        hint: 'Check what changes inside the while loop body. Something is missing.',
        hintTwo: 'i is never incremented. Add i++; as the last statement inside the while body so the condition eventually becomes false.',
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
      openAssessmentModal(topicId, 'for vs while — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 6 — OFF-BY-ONE ERRORS
     ══════════════════════════════════════════════════════════ */
  function initTopic_offbyone() {
    const topicId = 'ch11-offbyone'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch11-offbyone-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Version A — how many numbers? */
printf("A: ");
for (int i = 1; i <= 5; i++) { printf("%d ", i); }
printf("\\n");

/* Version B — one too few */
printf("B: ");
for (int i = 1; i < 5; i++) { printf("%d ", i); }
printf("\\n");

/* Version C — one too many */
printf("C: ");
for (int i = 0; i <= 5; i++) { printf("%d ", i); }
printf("\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch11-offbyone',
      question: 'Version A printed 5 numbers (1-5). Version B printed only 4. What single character difference caused this?',
      options: [
        'Version B used i++ instead of ++i',
        'Version B started at i=0 instead of i=1',
        'Version B used < instead of <= in the condition',
        'Version B used printf differently'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — i < 5 stops when i reaches 5 (5 < 5 is false). i <= 5 continues until i reaches 6. One operator change = one fewer iteration.',
        incorrect: 'The only difference was < vs <=. With i<5, the last value printed is 4 (when i=5, the condition fails). With i<=5, the last value printed is 5.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch11-offbyone-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch11-offbyone-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Fix the off-by-one: the loop should access indices 0 through 4 of the array (all 5 elements). Currently it is wrong.',
      includes: ['<stdio.h>'],
      starterCode:
`int data[5] = {10, 20, 30, 40, 50};

for (int i = 1; i <= 5; i++) {
    printf("data[%d] = %d\\n", i, data[i]);
}`,
      checkFn: output => {
        const text = output
        return text.includes('10') && text.includes('50') && text.includes('[0]') && !text.includes('[5]')
      },
      hint: 'The loop must start at i=0 (first valid index) and use i<5 (not i<=5) to stay within bounds.',
      solution:
`int data[5] = {10, 20, 30, 40, 50};
for (int i = 0; i < 5; i++) {
    printf("data[%d] = %d\\n", i, data[i]);
}`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch11-offbyone-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct conditions for each task (avoid off-by-one).',
      includes: ['<stdio.h>'],
      starterCode:
`/* Print exactly 7 numbers starting at 1 */
for (int i = 1; i [?] 7; i++) {
    printf("%d ", i);
}
printf("\\n");

/* Iterate all 4 elements of arr */
int arr[4] = {5,10,15,20};
for (int i = 0; i [?] 4; i++) {
    printf("%d ", arr[i]);
}
printf("\\n");`,
      blanks: ['<=', '<'],
      hint: 'Counting 1 to 7 needs <=7. Array of size 4 needs <4 (indices 0-3).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch11-offbyone-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write three loops that each print numbers 1 to 5:\n① Using i=1; i<=5 (the clearest form)\n② Using i=0; i<5; then print i+1\n③ Using i=1; i<6\nAll three should print: 1 2 3 4 5',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        const count = (text.match(/1 2 3 4 5/g) || []).length
        return count >= 3 || (text.match(/1/g)||[]).length >= 3
      },
      hint: '① for(int i=1;i<=5;i++) ② for(int i=0;i<5;i++) printf("%d ",i+1) ③ for(int i=1;i<6;i++)',
      solution:
`/* Form 1 */
for(int i=1;i<=5;i++) printf("%d ",i);
printf("\\n");
/* Form 2 */
for(int i=0;i<5;i++) printf("%d ",i+1);
printf("\\n");
/* Form 3 */
for(int i=1;i<6;i++) printf("%d ",i);
printf("\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch11-ob-p1', type: 'predict',
          question: 'How many numbers print?',
          code: `for (int i = 0; i < 10; i += 3) {\n    printf("%d\\n", i);\n}`,
          correct: ['0\n3\n6\n9'],
          caseSensitive: true, orderMatters: true,
          hint: 'i goes 0, 3, 6, 9, then 12 which fails i<10.',
          feedback: {
            correct: 'Correct — i: 0, 3, 6, 9, then 12 which fails (i<10). 4 numbers print.',
            incorrect: 'i takes values 0, 3, 6, 9 (then 12 fails). Prints 0, 3, 6, 9.'
          }
        },
        {
          id: 'ch11-ob-p2', type: 'predict',
          question: 'What prints?',
          code: `int arr[3] = {5, 10, 15};\nfor (int i = 0; i <= 3; i++) {\n    printf("%d\\n", arr[i]);\n}`,
          correct: ['5\n10\n15'],
          caseSensitive: false, orderMatters: true,
          hint: 'The condition is <= 3, not < 3. What happens when i=3?',
          feedback: {
            correct: 'Partially right — 5, 10, 15 print for valid indices 0-2, but i=3 accesses out-of-bounds memory (undefined behavior). The result is unpredictable.',
            incorrect: 'i <= 3 accesses arr[3] which is out of bounds for a size-3 array. Indices 0-2 print normally; arr[3] is undefined behavior.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch11-ob-m1', type: 'mcq',
          question: 'for (int i = 1; i < 10; i++) — how many iterations?',
          options: ['9', '10', '11', '8'],
          correct: ['9'],
          caseSensitive: false, orderMatters: false,
          hint: 'i takes values 1,2,3,...,9. When does i<10 fail?',
          feedback: {
            correct: 'Correct — i goes 1 through 9 (9 values). When i=10, (i<10) is false. 9 iterations.',
            incorrect: 'i runs from 1 to 9 inclusive — that is 9 values (1,2,3,4,5,6,7,8,9). When i=10, the condition fails.'
          }
        },
        {
          id: 'ch11-ob-m2', type: 'mcq',
          question: 'for (int i = 0; i <= 10; i++) — how many iterations?',
          options: ['9', '10', '11', '12'],
          correct: ['11'],
          caseSensitive: false, orderMatters: false,
          hint: 'i goes 0, 1, 2, ..., 10. Count those values.',
          feedback: {
            correct: 'Correct — i goes 0, 1, 2, ..., 10. That is 11 values (0 through 10 inclusive).',
            incorrect: 'i starts at 0 and includes 10 (because of <=). Values: 0,1,2,...,10 = 11 values, 11 iterations.'
          }
        },
        {
          id: 'ch11-ob-m3', type: 'mcq',
          question: 'To print exactly N items starting at 1, which condition is clearest?',
          options: ['i < N', 'i <= N', 'i <= N-1', 'i < N+1'],
          correct: ['i <= N'],
          caseSensitive: true, orderMatters: false,
          hint: 'You want to include N itself. Which operator includes the boundary?',
          feedback: {
            correct: 'Correct — for (int i=1; i<=N; i++) reads directly as "from 1 to N inclusive". The intent is immediately clear.',
            incorrect: 'for (int i=1; i<=N; i++) is clearest — it reads "i from 1 through N". All forms work but i<=N matches the English description exactly.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Print exactly 10 numbers starting at 5: 5, 6, 7, ..., 14.',
          check: output => {
            const text = output.replace(/\s+/g,' ')
            return text.includes('5') && text.includes('14') && text.includes('10') && text.includes('12')
          },
          hint: 'for(int i=5; i<=14; i++) or for(int i=0; i<10; i++) printing i+5.',
          solution: `for(int i=5;i<=14;i++) printf("%d\\n",i);`
        },
        {
          id: 'p2',
          task: 'Fix this bug: for(int i=0; i<=5; i++) printing arr[i] where int arr[5]. Rewrite it correctly to access only valid indices.',
          check: output => {
            const text = output
            return text.includes('10') && text.includes('50') && !text.match(/arr\[5\]/)
          },
          hint: 'int arr[5]={10,20,30,40,50}; for(int i=0; i<5; i++) printf("%d\\n",arr[i]);',
          solution: `int arr[5]={10,20,30,40,50};\nfor(int i=0;i<5;i++) printf("%d\\n",arr[i]);`
        }
      ]

      renderPracticeCh11('practice-ch11-offbyone', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch11-offbyone-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch11-offbyone-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch11-offbyone-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 1 through 10 exactly. It prints 10 numbers but the range is wrong. Find the off-by-one.',
        includes: ['<stdio.h>'],
        starterCode:
`for (int i = 0; i < 10; i++) {
    printf("%d\\n", i);
}`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          const nums = lines.map(l => parseInt(l.trim())).filter(n => !isNaN(n))
          return nums[0] === 1 && nums[nums.length-1] === 10 && nums.length === 10
        },
        hint: 'The loop runs 10 times but prints 0 through 9 instead of 1 through 10. Adjust the start or the condition.',
        hintTwo: 'Change i=0 to i=1 and condition from i<10 to i<=10. Or keep i=0 and print i+1. Either gives 1-10.',
        solution:
`for (int i = 1; i <= 10; i++) {
    printf("%d\\n", i);
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Off-by-One Errors — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch11-mastery'), {
      mode: 'build', topicId: 'ch11-mastery', chapterId: CH,
      question:
`Chapter 11 Mastery — write one program that uses ALL chapter 11 concepts:
① Declare int scores[6] = {72, 88, 45, 91, 63, 77}
② Use a for loop to print each score with its 1-based index: "Score 1: 72"
③ Use a second for loop to find sum, min, and max — print: Sum: N, Min: N, Max: N
④ Use a nested for loop to print a "grade bar" for each score:
   one star (*) for every 10 points (e.g., 72 → 7 stars)
⑤ Count how many scores are above 75 — print: Passing: N/6
⑥ Find the first score below 60 using a for loop with i declared outside — print its index`,
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const text = output
        return text.includes('72') && text.includes('91') &&
               (text.includes('Sum') || text.includes('sum')) &&
               text.includes('*') &&
               (text.includes('Passing') || text.includes('passing') || text.includes('Pass'))
      },
      hint: 'Build it section by section. Start with the print loop, then add sum/min/max, then the star bars, then the count.',
      solution:
`int scores[6] = {72, 88, 45, 91, 63, 77};

/* ① Print each score */
for (int i = 0; i < 6; i++) {
    printf("Score %d: %d\\n", i+1, scores[i]);
}

/* ② Sum, min, max */
int sum=0, min=scores[0], max=scores[0];
for (int i = 0; i < 6; i++) {
    sum += scores[i];
    if (scores[i] < min) min = scores[i];
    if (scores[i] > max) max = scores[i];
}
printf("Sum: %d, Min: %d, Max: %d\\n", sum, min, max);

/* ③ Grade bars */
for (int i = 0; i < 6; i++) {
    printf("Score %d: ", i+1);
    for (int s = 0; s < scores[i]/10; s++) printf("*");
    printf("\\n");
}

/* ④ Passing count */
int pass = 0;
for (int i = 0; i < 6; i++) { if (scores[i] > 75) pass++; }
printf("Passing: %d/6\\n", pass);

/* ⑤ First below 60 */
int k;
for (k = 0; k < 6; k++) { if (scores[k] < 60) break; }
printf("First below 60 at index: %d\\n", k);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch11-chapter-complete').style.display = 'block'
        $('ch11-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch11-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch12')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE SET HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh11(containerId, chapterId, topicId, configs) {
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
      div.id = `pc11-${topicId}-${cfg.id}`
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
    initTopic_forloop()
    initTopic_arrays()
    initTopic_nested()
    initTopic_scope()
    initTopic_vwhile()
    initTopic_offbyone()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
