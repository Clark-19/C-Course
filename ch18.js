/* =============================================================
   C LEARNING PLATFORM — chapters/ch18-memory-files-macros/ch18.js
   Chapter 18: Memory, Files & Macros
   4 topics · 7-step structure · Modal popup assessments
   ============================================================= */

;(function () {
  'use strict'

  const CH = 'ch18'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ── renderPracticeSet ─────────────────────────────────────── */
  function renderPracticeSet (containerId, chapterId, topicId, configs) {
    const container = $(containerId)
    if (!container) return
    let idx = 0
    function renderTask (i) {
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
        topicId: topicId + '-p' + (i + 1),
        chapterId: chapterId,
        question: cfg.task,
        includes: cfg.includes || ['<stdio.h>', '<stdlib.h>'],
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
     TOPIC 1 — malloc, calloc, free
     ══════════════════════════════════════════════════════════════ */
  function initTopic_malloc () {
    const topicId = 'ch18-malloc'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — Explore */
    CCompiler.initBlock($('compiler-ch18-malloc-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>', '<stdlib.h>'],
      starterCode:
`int n = 5;
int *arr = (int *)malloc(n * sizeof(int));
int i;
if (arr != NULL) {
    for (i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    for (i = 0; i < n; i++) {
        printf("%d\\n", arr[i]);
    }
    free(arr);
    arr = NULL;
}`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — Instant Question */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch18-malloc',
      question: 'The malloc call succeeded and arr is not NULL. Before the for loop writes to arr[0]..arr[4], what do those memory slots contain?',
      options: [
        'Zeroes — malloc always initializes to zero',
        'Garbage — malloc does not initialize the memory',
        'The value of n (5)',
        'NULL pointers for each element'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — malloc only allocates the bytes; it does not touch their contents. Use calloc if you need zero initialization.',
        incorrect: 'malloc does NOT initialize memory. The allocated bytes contain whatever was in that memory before — garbage. Use calloc to get zeroed memory.'
      },
      onAnswer: () => sm.complete(2)
    })

    /* Step 3 — Continue button */
    $('step-ch18-malloc-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — Modify */
    CCompiler.initBlock($('compiler-ch18-malloc-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Switch from malloc to calloc. calloc(n, size) allocates n elements of given size, all zero. Print the values before assigning anything to prove they start at 0.',
      includes: ['<stdio.h>', '<stdlib.h>'],
      starterCode:
`int n = 4;
int *arr = (int *)malloc(n * sizeof(int));
int i;
if (arr != NULL) {
    for (i = 0; i < n; i++) {
        arr[i] = i * 5;
        printf("%d\\n", arr[i]);
    }
    free(arr);
}`,
      checkFn: output => output.includes('0') && (output.includes('calloc') || output.split('\n').filter(l => l.trim() === '0').length >= 2),
      hint: 'Replace malloc(n * sizeof(int)) with calloc(n, sizeof(int)). Then add a loop BEFORE assigning values that prints arr[i] to show they are all 0.',
      solution:
`int n = 4;
int *arr = (int *)calloc(n, sizeof(int));
int i;
if (arr != NULL) {
    printf("Before assignment:\\n");
    for (i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    for (i = 0; i < n; i++) {
        arr[i] = i * 5;
    }
    printf("After assignment:\\n");
    for (i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    free(arr);
}`,
      onPass: () => sm.complete(4)
    })

    /* Step 5 — Fill */
    CCompiler.initBlock($('compiler-ch18-malloc-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to allocate, use, and free a dynamic int array.',
      includes: ['<stdio.h>', '<stdlib.h>'],
      starterCode:
`int n = 3;
int *nums = (int *)[?](n * [?](int));
int i;
if (nums [?] NULL) {
    for (i = 0; i < n; i++) nums[i] = i + 1;
    for (i = 0; i < n; i++) printf("%d\\n", nums[i]);
    [?](nums);
}`,
      blanks: ['malloc', 'sizeof', '!=', 'free'],
      hint: 'malloc allocates raw bytes. sizeof(int) gives the byte size of one int. != NULL checks for success. free releases the memory.',
      onPass: () => sm.complete(5)
    })

    /* Step 6 — Build */
    CCompiler.initBlock($('compiler-ch18-malloc-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Use calloc to allocate 5 floats initialized to zero. Assign values: arr[0]=1.5, arr[1]=2.5, arr[2]=3.5, arr[3]=4.5, arr[4]=5.5. Print all 5 values and their sum. Free when done.',
      includes: ['<stdio.h>', '<stdlib.h>'],
      starterCode: '',
      checkFn: output => {
        const has15 = output.includes('1.5') || output.includes('1.50')
        const has55 = output.includes('5.5') || output.includes('5.50')
        const hasSum = output.includes('17.5') || output.includes('17.50')
        return has15 && has55 && hasSum
      },
      hint: 'float *arr = (float *)calloc(5, sizeof(float)); Assign each element. Loop to print. Sum as float. free(arr).',
      solution:
`float *arr = (float *)calloc(5, sizeof(float));
int i;
float sum = 0.0f;
if (arr != NULL) {
    arr[0]=1.5f; arr[1]=2.5f; arr[2]=3.5f; arr[3]=4.5f; arr[4]=5.5f;
    for (i = 0; i < 5; i++) {
        printf("%.1f\\n", arr[i]);
        sum += arr[i];
    }
    printf("Sum: %.1f\\n", sum);
    free(arr);
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    /* Assessment */
    function renderAssessment () {
      const predictQ = [
        {
          id: 'ch18-m-p1', type: 'predict',
          question: 'What does this print?',
          code: `int *p = (int *)calloc(3, sizeof(int));\nif (p != NULL) {\n    printf("%d\\n", p[0]);\n    printf("%d\\n", p[1]);\n    free(p);\n}`,
          correct: ['0\n0', '0\r\n0'],
          caseSensitive: true, orderMatters: true,
          hint: 'calloc initializes all bytes to zero.',
          feedback: {
            correct: 'Correct — calloc zeroes all allocated memory, so p[0] and p[1] are both 0.',
            incorrect: 'calloc (unlike malloc) initializes all bytes to zero. p[0] and p[1] are both 0.'
          }
        },
        {
          id: 'ch18-m-p2', type: 'predict',
          question: 'What does this print?',
          code: `int *arr = (int *)malloc(2 * sizeof(int));\nif (arr != NULL) {\n    arr[0] = 10;\n    arr[1] = 20;\n    printf("%d\\n", arr[0] + arr[1]);\n    free(arr);\n}`,
          correct: ['30'],
          caseSensitive: true, orderMatters: true,
          hint: '10 + 20 = 30.',
          feedback: {
            correct: 'Correct — arr[0]=10, arr[1]=20, sum is 30.',
            incorrect: 'arr[0] is 10 and arr[1] is 20. Their sum is 30.'
          }
        },
        {
          id: 'ch18-m-p3', type: 'predict',
          question: 'What does this print?',
          code: `int n = 3;\nint *arr = (int *)malloc(n * sizeof(int));\nint i;\nif (arr != NULL) {\n    for (i = 0; i < n; i++) arr[i] = i * i;\n    for (i = 0; i < n; i++) printf("%d\\n", arr[i]);\n    free(arr);\n}`,
          correct: ['0\n1\n4', '0\r\n1\r\n4'],
          caseSensitive: true, orderMatters: true,
          hint: 'i*i for i=0,1,2 gives 0,1,4.',
          feedback: {
            correct: 'Correct — 0²=0, 1²=1, 2²=4.',
            incorrect: 'arr[0]=0*0=0, arr[1]=1*1=1, arr[2]=2*2=4. Printed on separate lines.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch18-m-m1', type: 'mcq',
          question: 'What does malloc return if memory allocation fails?',
          options: ['0 (zero)', 'NULL', '-1', 'It crashes the program immediately'],
          correct: ['NULL'],
          caseSensitive: false, orderMatters: false,
          hint: 'This is why you always check the return value.',
          feedback: {
            correct: 'Correct — malloc returns NULL on failure. Always check before using the pointer.',
            incorrect: 'malloc returns NULL when it cannot allocate memory. Dereferencing NULL crashes the program, which is why you always check.'
          }
        },
        {
          id: 'ch18-m-m2', type: 'mcq',
          question: 'What is the difference between malloc and calloc?',
          options: [
            'malloc allocates on the stack; calloc allocates on the heap',
            'malloc takes one argument; calloc takes two — and zeros the memory',
            'calloc is faster because it skips initialization',
            'They are identical — calloc is just an older name for malloc'
          ],
          correct: ['malloc takes one argument; calloc takes two — and zeros the memory'],
          caseSensitive: false, orderMatters: false,
          hint: 'One key difference is initialization.',
          feedback: {
            correct: 'Correct — malloc(n*size) allocates raw bytes. calloc(n, size) allocates and zero-initializes.',
            incorrect: 'calloc(n, size) takes count and element size, allocates n*size bytes, and initializes all bytes to zero. malloc only allocates.'
          }
        },
        {
          id: 'ch18-m-m3', type: 'mcq',
          question: 'What is a memory leak?',
          options: [
            'When malloc allocates more memory than requested',
            'When allocated heap memory is never freed before the pointer goes out of scope',
            'When a local variable is accessed after a function returns',
            'When two pointers point to the same memory address'
          ],
          correct: ['When allocated heap memory is never freed before the pointer goes out of scope'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens to heap memory the program can no longer reach.',
          feedback: {
            correct: 'Correct — a memory leak occurs when malloc\'d memory is never free\'d, so the process holds memory it will never use again.',
            incorrect: 'A memory leak is heap memory that was malloc\'d but never free\'d. The program loses the pointer so it can never release that memory — it\'s wasted for the program\'s lifetime.'
          }
        },
        {
          id: 'ch18-m-m4', type: 'mcq',
          question: 'Why is it good practice to set a pointer to NULL immediately after calling free?',
          options: [
            'free does not actually release the memory until the pointer is NULL',
            'To prevent accidental double-free and use-after-free bugs on that pointer',
            'NULL pointers automatically trigger garbage collection',
            'It is required by the C standard — free fails otherwise'
          ],
          correct: ['To prevent accidental double-free and use-after-free bugs on that pointer'],
          caseSensitive: false, orderMatters: false,
          hint: 'What could go wrong if you call free twice on the same non-NULL pointer?',
          feedback: {
            correct: 'Correct — nullifying after free prevents double-free (undefined behavior) and makes the dangling pointer visibly invalid.',
            incorrect: 'After free, the pointer still holds the old address — a dangling pointer. Setting it to NULL makes it obvious it\'s no longer valid, preventing accidental double-free or use-after-free.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Use malloc to allocate a single int on the heap. Set its value to 99. Print it. Then free it.',
          includes: ['<stdio.h>', '<stdlib.h>'],
          check: output => output.includes('99'),
          hint: 'int *p = (int *)malloc(sizeof(int)); if (p != NULL) { *p = 99; printf("%d\\n", *p); free(p); }',
          solution: `int *p = (int *)malloc(sizeof(int));\nif (p != NULL) {\n    *p = 99;\n    printf("%d\\n", *p);\n    free(p);\n    p = NULL;\n}`
        },
        {
          id: 'p2',
          task: 'Use calloc to allocate 4 ints. Without assigning anything, print all 4 values to confirm they are zero. Then free.',
          includes: ['<stdio.h>', '<stdlib.h>'],
          check: output => {
            const lines = output.trim().split('\n').filter(l => l.trim() !== '')
            return lines.length >= 4 && lines.every(l => l.trim() === '0')
          },
          hint: 'int *arr = (int *)calloc(4, sizeof(int)); loop and printf each element. All should be 0.',
          solution: `int *arr = (int *)calloc(4, sizeof(int));\nint i;\nif (arr != NULL) {\n    for (i = 0; i < 4; i++) printf("%d\\n", arr[i]);\n    free(arr);\n}`
        },
        {
          id: 'p3',
          task: 'malloc an array of 5 ints. Fill it with the first 5 multiples of 3 (3, 6, 9, 12, 15). Print each. Print the total. Free.',
          includes: ['<stdio.h>', '<stdlib.h>'],
          check: output => output.includes('3') && output.includes('15') && output.includes('45'),
          hint: 'arr[i] = (i+1)*3; Sum=3+6+9+12+15=45.',
          solution: `int *arr = (int *)malloc(5 * sizeof(int));\nint i, sum = 0;\nif (arr != NULL) {\n    for (i = 0; i < 5; i++) arr[i] = (i+1)*3;\n    for (i = 0; i < 5; i++) { printf("%d\\n", arr[i]); sum += arr[i]; }\n    printf("Total: %d\\n", sum);\n    free(arr);\n}`
        }
      ]

      renderPracticeSet('practice-ch18-malloc', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch18-malloc-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch18-malloc-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch18-malloc-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This program has a classic memory bug. Find and fix it so it prints 1 2 3 correctly.',
        includes: ['<stdio.h>', '<stdlib.h>'],
        starterCode:
`int *arr = (int *)malloc(3 * sizeof(int));
int i;
free(arr);
for (i = 0; i < 3; i++) {
    arr[i] = i + 1;
    printf("%d\\n", arr[i]);
}`,
        checkFn: output => output.includes('1') && output.includes('2') && output.includes('3'),
        hint: 'Look at the order of operations. When is free called relative to when arr is used?',
        hintTwo: 'free(arr) is called before arr is assigned or printed. Use-after-free is undefined behavior. Move free(arr) to AFTER all usage of arr — after the printf loop.',
        solution: `int *arr = (int *)malloc(3 * sizeof(int));\nint i;\nfor (i = 0; i < 3; i++) {\n    arr[i] = i + 1;\n    printf("%d\\n", arr[i]);\n}\nfree(arr);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Dynamic Memory — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 2 — File Handling (browser-limited)
     ══════════════════════════════════════════════════════════════ */
  function initTopic_files () {
    const topicId = 'ch18-files'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — Explore (reference code — file I/O not available in browser) */
    CCompiler.initBlock($('compiler-ch18-files-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* This is reference code — file I/O requires a real filesystem.
   Study the pattern, then run it locally with GCC. */

/* --- WRITING to a file --- */
/*
FILE *fp = fopen("scores.txt", "w");
if (fp == NULL) {
    printf("Error: could not open file\\n");
    return 1;
}
fprintf(fp, "Player1: %d\\n", 350);
fprintf(fp, "Player2: %d\\n", 420);
fclose(fp);
*/

/* --- READING from a file --- */
/*
FILE *fr = fopen("scores.txt", "r");
char line[100];
while (fgets(line, sizeof(line), fr) != NULL) {
    printf("%s", line);
}
fclose(fr);
*/

printf("File I/O pattern loaded - run locally with GCC to execute.\\n");
printf("Key steps: fopen -> check NULL -> use -> fclose\\n");`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — Instant Question (conceptual, no output needed) */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch18-files',
      question: 'After calling fopen, the code checks: if (fp == NULL). What does it mean when fopen returns NULL?',
      options: [
        'The file was opened successfully and is empty',
        'The file could not be opened — it may not exist, or permissions denied',
        'The file is too large to open',
        'NULL means fopen is still loading the file asynchronously'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — fopen returns NULL on any failure: file not found, permission denied, disk full. Always check before using the FILE pointer.',
        incorrect: 'fopen returns NULL when it fails — file not found, no permissions, or disk issues. Never use a NULL FILE* pointer; it will crash the program.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch18-files-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — Reference: write pattern */
    CCompiler.initBlock($('compiler-ch18-files-modify'), {
      mode: 'explore', topicId, chapterId: CH,
      question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Write + append pattern — run locally with GCC */
/*
FILE *fw = fopen("log.txt", "w");   // "w" creates/overwrites
fprintf(fw, "Session started\\n");
fclose(fw);

FILE *fa = fopen("log.txt", "a");   // "a" appends — never overwrites
fprintf(fa, "Entry 1: score=100\\n");
fprintf(fa, "Entry 2: score=220\\n");
fclose(fa);

FILE *fr = fopen("log.txt", "r");
char line[128];
while (fgets(line, sizeof(line), fr) != NULL) {
    printf("%s", line);
}
fclose(fr);
*/
printf("Write: \\"w\\" creates/overwrites\\n");
printf("Append: \\"a\\" adds to existing file\\n");
printf("Read:  \\"r\\" opens existing file\\n");`,
      onPass: () => sm.complete(4)
    })

    /* Step 5 — Fill (file I/O syntax) */
    CCompiler.initBlock($('compiler-ch18-files-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill the blanks to complete this file write pattern.',
      includes: ['<stdio.h>'],
      starterCode:
`/* Fill in the correct function names and mode strings */
/* FILE *fp = [?]("data.txt", [?]);  */
/* if (fp [?] NULL) { return 1; }    */
/* [?](fp, "Value: %d\\n", 42);       */
/* [?](fp);                           */

/* Verify you know the pattern: */
printf("[?] opens a file\\n");
printf("[?] writes formatted text\\n");
printf("[?] closes and flushes\\n");`,
      blanks: ['fopen', 'fopen', 'fprintf', 'fclose'],
      hint: 'fopen opens, fprintf writes to file (like printf but with a FILE* first), fclose closes.',
      onPass: () => sm.complete(5)
    })

    /* Step 6 — Build (conceptual verification via printf) */
    CCompiler.initBlock($('compiler-ch18-files-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Demonstrate you know the file I/O API. Print the four steps of writing to a file in order, each on its own line: 1) fopen, 2) check NULL, 3) fprintf, 4) fclose.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const lower = output.toLowerCase()
        return lower.includes('fopen') && lower.includes('null') &&
               lower.includes('fprintf') && lower.includes('fclose')
      },
      hint: 'printf("1. fopen...\\n"); printf("2. check NULL...\\n"); printf("3. fprintf...\\n"); printf("4. fclose...\\n");',
      solution:
`printf("1. fopen(\\"file.txt\\", \\"w\\") - open the file\\n");
printf("2. if (fp == NULL) - check for failure\\n");
printf("3. fprintf(fp, ...) - write to the file\\n");
printf("4. fclose(fp) - flush and close\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment () {
      const predictQ = [
        {
          id: 'ch18-f-p1', type: 'predict',
          question: 'What does this print? (stdio.h included)',
          code: `FILE *fp = NULL;\nif (fp == NULL) {\n    printf("no file\\n");\n} else {\n    printf("file open\\n");\n}`,
          correct: ['no file', 'no file\n'],
          caseSensitive: false, orderMatters: true,
          hint: 'fp is set to NULL directly. NULL is falsy.',
          feedback: {
            correct: 'Correct — fp is NULL, so the if-branch runs and prints "no file".',
            incorrect: 'fp is explicitly set to NULL. The if (fp == NULL) check is true, so "no file" prints.'
          }
        },
        {
          id: 'ch18-f-p2', type: 'predict',
          question: 'What does this print?',
          code: `char mode[] = "a";\nif (mode[0] == 'w') printf("overwrites\\n");\nelse if (mode[0] == 'a') printf("appends\\n");\nelse printf("reads\\n");`,
          correct: ['appends', 'appends\n'],
          caseSensitive: false, orderMatters: true,
          hint: 'mode[0] is \'a\'.',
          feedback: {
            correct: 'Correct — mode "a" is the append mode.',
            incorrect: 'mode[0] is \'a\', matching the else-if branch, printing "appends".'
          }
        },
        {
          id: 'ch18-f-p3', type: 'predict',
          question: 'What does this print?',
          code: `int opened = 1;\nif (!opened) {\n    printf("fopen failed\\n");\n} else {\n    printf("file ready\\n");\n    printf("fclose called\\n");\n}`,
          correct: ['file ready\nfclose called', 'file ready\r\nfclose called'],
          caseSensitive: false, orderMatters: true,
          hint: 'opened is 1 (truthy), so !opened is false.',
          feedback: {
            correct: 'Correct — opened is 1, so !opened is false; the else branch runs both prints.',
            incorrect: '!opened is false when opened is 1, so the else branch runs: "file ready" then "fclose called".'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch18-f-m1', type: 'mcq',
          question: 'Which fopen mode creates a new file (or overwrites if it exists) for writing?',
          options: ['"r"', '"w"', '"a"', '"rw"'],
          correct: ['"w"'],
          caseSensitive: true, orderMatters: false,
          hint: 'Write mode.',
          feedback: {
            correct: 'Correct — "w" opens for writing, creating the file if it doesn\'t exist, truncating it if it does.',
            incorrect: '"w" is the write mode. "r" reads, "a" appends, "rw" is not a valid C file mode.'
          }
        },
        {
          id: 'ch18-f-m2', type: 'mcq',
          question: 'What is the correct type for the variable returned by fopen?',
          options: ['int', 'void *', 'FILE *', 'char *'],
          correct: ['FILE *'],
          caseSensitive: true, orderMatters: false,
          hint: 'It is a pointer to an opaque structure defined in stdio.h.',
          feedback: {
            correct: 'Correct — fopen returns FILE *, a pointer to an opaque FILE structure.',
            incorrect: 'fopen returns FILE * — a pointer to the FILE structure defined in stdio.h. You pass this pointer to fprintf, fgets, fclose, etc.'
          }
        },
        {
          id: 'ch18-f-m3', type: 'mcq',
          question: 'Why should you always call fclose after you finish using a file?',
          options: [
            'fclose deletes the file when you are done',
            'Without fclose, the FILE* becomes NULL',
            'fclose flushes the buffer and releases the file handle — data may be lost without it',
            'fclose is optional in modern C — the OS closes files automatically'
          ],
          correct: ['fclose flushes the buffer and releases the file handle — data may be lost without it'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what "buffered I/O" means.',
          feedback: {
            correct: 'Correct — fprintf writes to a buffer. fclose flushes that buffer to disk. Without fclose, buffered data may not be written.',
            incorrect: 'C uses buffered I/O — fprintf data sits in a buffer. fclose flushes it to disk and releases the OS file handle. Missing fclose can silently lose written data.'
          }
        },
        {
          id: 'ch18-f-m4', type: 'mcq',
          question: 'Which function safely reads a line from a file with a buffer size limit?',
          options: ['fscanf(fp, "%s", buf)', 'fgets(buf, sizeof(buf), fp)', 'fread(buf, fp)', 'gets(fp)'],
          correct: ['fgets(buf, sizeof(buf), fp)'],
          caseSensitive: false, orderMatters: false,
          hint: 'One of these can overflow the buffer.',
          feedback: {
            correct: 'Correct — fgets(buf, size, fp) reads at most size-1 chars including whitespace, preventing overflow.',
            incorrect: 'fgets is the safe choice — it takes a max length argument and won\'t overflow. fscanf("%s") stops at whitespace and can overflow. gets is deprecated and always unsafe.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'File modes quiz: print the correct fopen mode string for each case — (1) opening to overwrite, (2) opening to append, (3) opening to read.',
          includes: ['<stdio.h>'],
          check: output => output.includes('w') && output.includes('a') && output.includes('r'),
          hint: 'printf the mode strings: "w" for write/overwrite, "a" for append, "r" for read.',
          solution: `printf("Overwrite: w\\n");\nprintf("Append: a\\n");\nprintf("Read: r\\n");`
        },
        {
          id: 'p2',
          task: 'Print the complete 4-step file write sequence including function signatures: fopen (with mode "w"), NULL check, fprintf call, fclose call — one per line.',
          includes: ['<stdio.h>'],
          check: output => {
            const l = output.toLowerCase()
            return l.includes('fopen') && l.includes('null') && l.includes('fprintf') && l.includes('fclose')
          },
          hint: 'printf each step: 1. FILE *fp = fopen(...), 2. if (fp == NULL), 3. fprintf(fp, ...), 4. fclose(fp)',
          solution: `printf("1. FILE *fp = fopen(\\"out.txt\\", \\"w\\");\\n");\nprintf("2. if (fp == NULL) { return 1; }\\n");\nprintf("3. fprintf(fp, \\"data\\\\n\\");\\n");\nprintf("4. fclose(fp);\\n");`
        },
        {
          id: 'p3',
          task: 'Print TRUE or FALSE for each: (1) fopen always succeeds, (2) fclose flushes buffered data, (3) "a" mode overwrites the file, (4) FILE* is the correct type for fopen\'s return.',
          includes: ['<stdio.h>'],
          check: output => {
            const l = output.toUpperCase()
            const lines = l.split('\n').filter(ln => ln.trim())
            return lines.some(ln => ln.includes('FALSE')) && lines.some(ln => ln.includes('TRUE'))
          },
          hint: '(1) FALSE — can return NULL, (2) TRUE, (3) FALSE — "a" appends, (4) TRUE',
          solution: `printf("1. fopen always succeeds: FALSE\\n");\nprintf("2. fclose flushes buffer: TRUE\\n");\nprintf("3. 'a' mode overwrites: FALSE\\n");\nprintf("4. FILE* is correct type: TRUE\\n");`
        }
      ]

      renderPracticeSet('practice-ch18-files', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch18-files-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch18-files-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch18-files-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'Fix this file I/O stub — the NULL check is backwards, so the code runs even when fopen fails. Fix the condition to correctly reject a NULL file pointer.',
        includes: ['<stdio.h>'],
        starterCode:
`FILE *fp = NULL;  /* simulating fopen failure */
if (fp != NULL) {
    printf("File is ready\\n");
} else {
    printf("Error: file could not be opened\\n");
}`,
        checkFn: output => output.toLowerCase().includes('error') || output.toLowerCase().includes('could not'),
        hint: 'When fp is NULL, fopen FAILED. The error message should run when fp IS NULL — swap the condition.',
        hintTwo: 'The condition should be: if (fp == NULL) to detect failure. Currently it\'s != NULL which runs when fopen succeeded, but here fp is NULL so it runs the wrong branch.',
        solution: `FILE *fp = NULL;\nif (fp == NULL) {\n    printf("Error: file could not be opened\\n");\n} else {\n    printf("File is ready\\n");\n}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'File Handling — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 3 — Macros: #define constants and function macros
     ══════════════════════════════════════════════════════════════ */
  function initTopic_macros () {
    const topicId = 'ch18-macros'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — Explore */
    CCompiler.initBlock($('compiler-ch18-macros-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`#define PI       3.14159
#define MAX_SIZE 10
#define DOUBLE(x) ((x) * 2)
#define MAX(a,b)  ((a) > (b) ? (a) : (b))

printf("PI = %.5f\\n",    PI);
printf("MAX_SIZE = %d\\n", MAX_SIZE);
printf("DOUBLE(7) = %d\\n", DOUBLE(7));
printf("MAX(3,9) = %d\\n",  MAX(3, 9));`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — Instant Question */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch18-macros',
      question: 'DOUBLE(7) printed 14. The macro is defined as ((x) * 2). What does the preprocessor replace DOUBLE(7) with in your source code before compilation begins?',
      options: [
        '14',
        '((7) * 2)',
        'double(7)',
        'x * 2 where x=7'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — the preprocessor does text substitution: DOUBLE(7) becomes ((7) * 2). The compiler then evaluates that expression to get 14.',
        incorrect: 'The preprocessor replaces DOUBLE(7) with the literal text ((7) * 2). The compiler then evaluates the arithmetic to get 14. Macros are text substitution, not function calls.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch18-macros-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — Modify */
    CCompiler.initBlock($('compiler-ch18-macros-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a SQUARE(x) macro that returns x squared. Also add a MIN(a,b) macro that returns the smaller value. Use both and print the results.',
      includes: ['<stdio.h>'],
      starterCode:
`#define DOUBLE(x) ((x) * 2)
#define MAX(a,b)  ((a) > (b) ? (a) : (b))

printf("DOUBLE(6) = %d\\n", DOUBLE(6));
printf("MAX(4,9)  = %d\\n", MAX(4, 9));`,
      checkFn: output => {
        const hasSquare = output.includes('25') || output.includes('16') || output.includes('9')
        const hasMin = output.includes('MIN') || output.split('\n').some(l => {
          const n = parseInt(l.trim())
          return !isNaN(n) && n < 4
        })
        return hasSquare || (output.split('\n').length > 3)
      },
      hint: '#define SQUARE(x) ((x)*(x)) and #define MIN(a,b) ((a)<(b)?(a):(b)). Then: printf("%d\\n", SQUARE(5)); printf("%d\\n", MIN(3,7));',
      solution:
`#define DOUBLE(x)  ((x) * 2)
#define MAX(a,b)   ((a) > (b) ? (a) : (b))
#define SQUARE(x)  ((x) * (x))
#define MIN(a,b)   ((a) < (b) ? (a) : (b))

printf("DOUBLE(6) = %d\\n", DOUBLE(6));
printf("MAX(4,9)  = %d\\n", MAX(4, 9));
printf("SQUARE(5) = %d\\n", SQUARE(5));
printf("MIN(3,7)  = %d\\n", MIN(3, 7));`,
      onPass: () => sm.complete(4)
    })

    /* Step 5 — Fill */
    CCompiler.initBlock($('compiler-ch18-macros-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to define and use a CELSIUS_TO_F macro.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] BOILING   100
[?] FREEZING  0
[?] C_TO_F(c) (((c) * 9.0 / 5.0) + 32.0)

printf("Boiling: %.1f F\\n",  C_TO_F([?]));
printf("Freezing: %.1f F\\n", C_TO_F([?]));`,
      blanks: ['#define', '#define', '#define', 'BOILING', 'FREEZING'],
      hint: 'All three definitions need #define. Then use the constant macro names as arguments to C_TO_F.',
      onPass: () => sm.complete(5)
    })

    /* Step 6 — Build */
    CCompiler.initBlock($('compiler-ch18-macros-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define GRAVITY as 9.81 and KINETIC_ENERGY(m,v) as ((m)*(v)*(v)/2.0). Compute and print: KE for mass=10kg at velocity=5m/s, and KE for mass=2kg at velocity=20m/s.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('125') && output.includes('400'),
      hint: '#define KINETIC_ENERGY(m,v) (((m)*(v)*(v))/2.0) — KE(10,5)=125.0, KE(2,20)=400.0',
      solution:
`#define GRAVITY          9.81
#define KINETIC_ENERGY(m,v) (((m)*(v)*(v))/2.0)

printf("KE(10kg, 5m/s)  = %.1f J\\n", KINETIC_ENERGY(10, 5));
printf("KE(2kg,  20m/s) = %.1f J\\n", KINETIC_ENERGY(2, 20));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment () {
      const predictQ = [
        {
          id: 'ch18-mac-p1', type: 'predict',
          question: 'What does this print?',
          code: `#define TRIPLE(x) ((x) * 3)\nprintf("%d\\n", TRIPLE(4));\nprintf("%d\\n", TRIPLE(TRIPLE(2)));`,
          correct: ['12\n18', '12\r\n18'],
          caseSensitive: true, orderMatters: true,
          hint: 'TRIPLE(4)=12. TRIPLE(TRIPLE(2))=TRIPLE(6)=18.',
          feedback: {
            correct: 'Correct — TRIPLE(4)=12. TRIPLE(2)=6 then TRIPLE(6)=18.',
            incorrect: 'TRIPLE(4)=4*3=12. TRIPLE(TRIPLE(2)) = TRIPLE(2*3) = TRIPLE(6) = 6*3 = 18.'
          }
        },
        {
          id: 'ch18-mac-p2', type: 'predict',
          question: 'What does this print?',
          code: `#define AREA(w,h) ((w)*(h))\n#define W 6\n#define H 4\nprintf("%d\\n", AREA(W, H));`,
          correct: ['24'],
          caseSensitive: true, orderMatters: true,
          hint: '6 * 4 = 24.',
          feedback: {
            correct: 'Correct — W=6, H=4, AREA(6,4)=24.',
            incorrect: 'W expands to 6, H to 4. AREA(6,4)=6*4=24.'
          }
        },
        {
          id: 'ch18-mac-p3', type: 'predict',
          question: 'What does this print?',
          code: `#define ABS(x) ((x) < 0 ? -(x) : (x))\nprintf("%d\\n", ABS(-5));\nprintf("%d\\n", ABS(3));`,
          correct: ['5\n3', '5\r\n3'],
          caseSensitive: true, orderMatters: true,
          hint: 'ABS(-5)=5, ABS(3)=3.',
          feedback: {
            correct: 'Correct — ABS returns the absolute value: -5 → 5, 3 → 3.',
            incorrect: 'ABS(-5): -5<0 so -(-5)=5. ABS(3): 3 is not <0 so returns 3.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch18-mac-m1', type: 'mcq',
          question: 'What does the preprocessor do with a #define macro?',
          options: [
            'Allocates a read-only variable in memory',
            'Performs text substitution before the compiler runs',
            'Creates a typed constant checked at runtime',
            'Compiles the macro into an inline function'
          ],
          correct: ['Performs text substitution before the compiler runs'],
          caseSensitive: false, orderMatters: false,
          hint: 'The preprocessor runs before compilation.',
          feedback: {
            correct: 'Correct — #define is purely textual. The preprocessor replaces every occurrence before the compiler ever sees the code.',
            incorrect: '#define is text substitution. The preprocessor replaces every macro occurrence with its definition before the compiler runs. No memory is allocated, no type is assigned.'
          }
        },
        {
          id: 'ch18-mac-m2', type: 'mcq',
          question: 'Why must every argument in a function-like macro be wrapped in parentheses?',
          options: [
            'To make the code look consistent',
            'Without them, operator precedence can break the expansion — e.g. SQUARE(2+3) becomes 2+3*2+3 not (2+3)*(2+3)',
            'C syntax requires parentheses around macro arguments',
            'Parentheses signal to the compiler that a macro is being used'
          ],
          correct: ['Without them, operator precedence can break the expansion — e.g. SQUARE(2+3) becomes 2+3*2+3 not (2+3)*(2+3)'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens when you pass an expression like a+b.',
          feedback: {
            correct: 'Correct — without parentheses around each argument, an expression like a+b produces wrong results due to operator precedence.',
            incorrect: 'If SQUARE(x) is defined as x*x without parens, SQUARE(2+3) expands to 2+3*2+3 = 11 instead of 25. Always wrap: ((x)*(x)).'
          }
        },
        {
          id: 'ch18-mac-m3', type: 'mcq',
          question: 'Why should you avoid passing expressions with ++ to a function-like macro?',
          options: [
            'The ++ operator is not allowed in macro arguments',
            'The argument may be expanded multiple times, incrementing ++ more than once — undefined behavior',
            'Macros convert ++ to + + which is a syntax error',
            'There is no problem — macros handle ++ correctly'
          ],
          correct: ['The argument may be expanded multiple times, incrementing ++ more than once — undefined behavior'],
          caseSensitive: false, orderMatters: false,
          hint: 'SQUARE(x++) expands to ((x++)*(x++)) — how many times is x incremented?',
          feedback: {
            correct: 'Correct — SQUARE(x++) expands to ((x++)*(x++)), incrementing x twice. This is undefined behavior in C.',
            incorrect: 'SQUARE(x++) expands to ((x++)*(x++)) — x is incremented twice. Undefined behavior. Never pass expressions with side effects (++, --, function calls) to function-like macros.'
          }
        },
        {
          id: 'ch18-mac-m4', type: 'mcq',
          question: 'Which is the correct definition of a constant macro for the value 512?',
          options: [
            '#define BUFFER_SIZE = 512',
            '#define BUFFER_SIZE 512',
            'const #define BUFFER_SIZE 512',
            '#define BUFFER_SIZE(512)'
          ],
          correct: ['#define BUFFER_SIZE 512'],
          caseSensitive: true, orderMatters: false,
          hint: '#define has a specific syntax: directive, name, value — no = sign.',
          feedback: {
            correct: 'Correct — #define NAME value with no = sign. Everything after the name (with a space) is the replacement text.',
            incorrect: '#define NAME value — no equals sign, no semicolon, no parentheses around the value. The = is a common mistake from C variable assignment syntax.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Define PI as 3.14159 and CIRCLE_AREA(r) as PI*r*r (properly parenthesised). Compute the area of a circle with radius 5 and print it with 2 decimal places.',
          includes: ['<stdio.h>'],
          check: output => output.includes('78'),
          hint: '#define CIRCLE_AREA(r) ((3.14159) * (r) * (r)) — area of r=5 is ≈78.54',
          solution: `#define PI 3.14159\n#define CIRCLE_AREA(r) (PI * (r) * (r))\nprintf("%.2f\\n", CIRCLE_AREA(5));`
        },
        {
          id: 'p2',
          task: 'Define CLAMP(v, lo, hi) that returns lo if v < lo, hi if v > hi, otherwise v. Test with: CLAMP(-10, 0, 100), CLAMP(50, 0, 100), CLAMP(200, 0, 100). Print each result.',
          includes: ['<stdio.h>'],
          check: output => output.includes('0') && output.includes('50') && output.includes('100'),
          hint: '#define CLAMP(v,lo,hi) ((v)<(lo)?(lo):((v)>(hi)?(hi):(v))) — results: 0, 50, 100',
          solution: `#define CLAMP(v,lo,hi) ((v)<(lo)?(lo):((v)>(hi)?(hi):(v)))\nprintf("%d\\n", CLAMP(-10, 0, 100));\nprintf("%d\\n", CLAMP(50,  0, 100));\nprintf("%d\\n", CLAMP(200, 0, 100));`
        },
        {
          id: 'p3',
          task: 'Define METERS_TO_CM as 100, KM_TO_METERS as 1000, and KM_TO_CM(km) using both. Convert 2.5 km to cm and print the result.',
          includes: ['<stdio.h>'],
          check: output => output.includes('250000'),
          hint: '#define KM_TO_CM(km) ((km) * KM_TO_METERS * METERS_TO_CM) — 2.5*1000*100=250000',
          solution: `#define METERS_TO_CM  100\n#define KM_TO_METERS  1000\n#define KM_TO_CM(km)  ((km) * KM_TO_METERS * METERS_TO_CM)\nprintf("%.0f cm\\n", KM_TO_CM(2.5));`
        }
      ]

      renderPracticeSet('practice-ch18-macros', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch18-macros-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch18-macros-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch18-macros-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This macro gives wrong results for expressions like 2+3. Find and fix the missing parentheses.',
        includes: ['<stdio.h>'],
        starterCode:
`#define SQUARE(x) x * x

printf("%d\\n", SQUARE(5));      /* should print 25 */
printf("%d\\n", SQUARE(2 + 3));  /* should print 25 */`,
        checkFn: output => {
          const lines = output.trim().split('\n').filter(l => l.trim())
          return lines[0] && lines[0].trim() === '25' && lines[1] && lines[1].trim() === '25'
        },
        hint: 'SQUARE(2+3) with the current definition expands to 2+3*2+3. What does operator precedence do to that?',
        hintTwo: 'Without parentheses: 2+3*2+3 = 2+6+3 = 11, not 25. Fix: #define SQUARE(x) ((x)*(x)) — wrap both the argument and the whole expression.',
        solution: `#define SQUARE(x) ((x) * (x))\nprintf("%d\\n", SQUARE(5));\nprintf("%d\\n", SQUARE(2 + 3));`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Macros — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     TOPIC 4 — Preprocessor: #ifdef, #ifndef, include guards
     ══════════════════════════════════════════════════════════════ */
  function initTopic_preprocessor () {
    const topicId = 'ch18-preprocessor'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — Explore */
    CCompiler.initBlock($('compiler-ch18-preprocessor-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`#define DEBUG
#define VERSION 2

#ifdef DEBUG
    printf("Debug mode: ON\\n");
#else
    printf("Release mode\\n");
#endif

#ifndef RELEASE
    printf("Not a release build\\n");
#endif

#if VERSION >= 2
    printf("Version 2 or higher\\n");
#endif`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — Instant Question */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch18-preprocessor',
      question: 'DEBUG is defined. The #else branch contains printf("Release mode"). Why did "Release mode" NOT print?',
      options: [
        'The #else compiled but was skipped at runtime',
        '#ifdef includes the #else block only if the name is NOT defined',
        'The compiler optimized the dead branch away',
        '#else runs when the defined value equals zero'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — #ifdef includes ONLY the code between #ifdef and #else when the name IS defined. The #else block is completely erased before compilation.',
        incorrect: '#ifdef / #else / #endif is a preprocessor choice — the losing branch is erased before compilation. The compiler never sees it. Since DEBUG is defined, only the #ifdef branch is compiled.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch18-preprocessor-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — Modify */
    CCompiler.initBlock($('compiler-ch18-preprocessor-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Comment out the #define DEBUG line. Observe the output change — the else branch should now compile and run. Then add a #define PRODUCTION and use #ifdef PRODUCTION to print a production message.',
      includes: ['<stdio.h>'],
      starterCode:
`#define DEBUG

#ifdef DEBUG
    printf("Debug build\\n");
#else
    printf("Non-debug build\\n");
#endif`,
      checkFn: output => output.toLowerCase().includes('production') || output.toLowerCase().includes('non-debug') || output.toLowerCase().includes('release'),
      hint: 'Remove or comment out #define DEBUG so the #else branch runs. Then add #define PRODUCTION and #ifdef PRODUCTION to print a production message.',
      solution:
`/* #define DEBUG  -- commented out */
#define PRODUCTION

#ifdef DEBUG
    printf("Debug build\\n");
#else
    printf("Non-debug build\\n");
#endif

#ifdef PRODUCTION
    printf("Production mode active\\n");
#endif`,
      onPass: () => sm.complete(4)
    })

    /* Step 5 — Fill */
    CCompiler.initBlock($('compiler-ch18-preprocessor-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete this conditional compilation block.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] VERBOSE

[?] VERBOSE
    printf("Verbose output: all details\\n");
[?]
    printf("Quiet output: summary only\\n");
[?]`,
      blanks: ['#define', '#ifdef', '#else', '#endif'],
      hint: '#define creates the symbol. #ifdef checks if it exists. #else provides the alternative. #endif closes the block.',
      onPass: () => sm.complete(5)
    })

    /* Step 6 — Build */
    CCompiler.initBlock($('compiler-ch18-preprocessor-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Define VERSION as 3. Use #if / #elif / #else / #endif to print: "Legacy" if VERSION < 2, "Standard" if VERSION == 2, "Modern" if VERSION >= 3.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.toLowerCase().includes('modern'),
      hint: '#define VERSION 3. Then: #if VERSION < 2 ... #elif VERSION == 2 ... #else ... #endif',
      solution:
`#define VERSION 3

#if VERSION < 2
    printf("Legacy\\n");
#elif VERSION == 2
    printf("Standard\\n");
#else
    printf("Modern\\n");
#endif`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment () {
      const predictQ = [
        {
          id: 'ch18-pp-p1', type: 'predict',
          question: 'What does this print?',
          code: `#define FAST\n#ifdef FAST\n    printf("Speed mode\\n");\n#else\n    printf("Normal mode\\n");\n#endif`,
          correct: ['Speed mode', 'Speed mode\n'],
          caseSensitive: false, orderMatters: true,
          hint: 'FAST is defined, so the #ifdef branch runs.',
          feedback: {
            correct: 'Correct — FAST is defined, so the #ifdef block compiles and runs.',
            incorrect: 'FAST is defined, so #ifdef FAST is true. "Speed mode" is compiled and runs. "Normal mode" is erased by the preprocessor.'
          }
        },
        {
          id: 'ch18-pp-p2', type: 'predict',
          question: 'What does this print?',
          code: `#define X 5\n#if X > 3\n    printf("big\\n");\n#elif X > 1\n    printf("medium\\n");\n#else\n    printf("small\\n");\n#endif`,
          correct: ['big', 'big\n'],
          caseSensitive: false, orderMatters: true,
          hint: 'X is 5. 5 > 3 is true so the first branch runs.',
          feedback: {
            correct: 'Correct — X=5, 5>3 is true, so "big" prints.',
            incorrect: 'X=5. The first condition 5>3 is true, so "big" prints. The #elif and #else are erased.'
          }
        },
        {
          id: 'ch18-pp-p3', type: 'predict',
          question: 'What does this print?',
          code: `/* #define TRACE */\n#ifdef TRACE\n    printf("tracing\\n");\n#endif\nprintf("done\\n");`,
          correct: ['done', 'done\n'],
          caseSensitive: false, orderMatters: true,
          hint: 'TRACE is commented out — not defined. The #ifdef block is erased.',
          feedback: {
            correct: 'Correct — TRACE is commented out (not defined). The #ifdef block is erased. Only "done" prints.',
            incorrect: '#define TRACE is a comment, so TRACE is NOT defined. #ifdef TRACE is false — that block is erased. Only "done" prints.'
          }
        }
      ]

      const mcqQ = [
        {
          id: 'ch18-pp-m1', type: 'mcq',
          question: 'What does #ifndef mean?',
          options: [
            'If the name IS defined',
            'If the name is NOT defined',
            'If the name is not a number',
            'A comment directive — it has no effect'
          ],
          correct: ['If the name is NOT defined'],
          caseSensitive: false, orderMatters: false,
          hint: 'n = not.',
          feedback: {
            correct: 'Correct — #ifndef means "if NOT defined." It is the opposite of #ifdef.',
            incorrect: '#ifndef = "if not defined." #ifdef = "if defined." They are opposites. #ifndef is most commonly used in include guards.'
          }
        },
        {
          id: 'ch18-pp-m2', type: 'mcq',
          question: 'What is the purpose of an include guard in a header file?',
          options: [
            'To prevent the header from being modified by other files',
            'To prevent the header\'s contents from being compiled more than once in the same translation unit',
            'To lock the header file for thread-safe access',
            'To declare that all functions in the header are private'
          ],
          correct: ['To prevent the header\'s contents from being compiled more than once in the same translation unit'],
          caseSensitive: false, orderMatters: false,
          hint: 'What goes wrong if two .c files both include the same header?',
          feedback: {
            correct: 'Correct — if two files include the same header, the declarations would appear twice, causing "duplicate symbol" errors. Guards prevent this.',
            incorrect: 'Without include guards, if a.c includes both utils.h and math.h, and math.h also includes utils.h, utils.h gets compiled twice — causing duplicate declaration errors.'
          }
        },
        {
          id: 'ch18-pp-m3', type: 'mcq',
          question: 'When is conditional compilation code removed from the program?',
          options: [
            'At runtime when the condition evaluates to false',
            'At link time when unused symbols are stripped',
            'By the preprocessor before the compiler runs',
            'By the optimizer during compilation'
          ],
          correct: ['By the preprocessor before the compiler runs'],
          caseSensitive: false, orderMatters: false,
          hint: 'The preprocessor runs first.',
          feedback: {
            correct: 'Correct — the preprocessor erases excluded branches before compilation. The compiler never sees them — there is no runtime cost.',
            incorrect: 'Conditional compilation is resolved by the preprocessor, before the compiler runs. The excluded code is completely erased. It is not a runtime check — it\'s a compile-time selection.'
          }
        },
        {
          id: 'ch18-pp-m4', type: 'mcq',
          question: 'Which directive closes an #ifdef / #ifndef / #if block?',
          options: ['#close', '#end', '#endif', '#done'],
          correct: ['#endif'],
          caseSensitive: true, orderMatters: false,
          hint: 'Every opened conditional block must be closed.',
          feedback: {
            correct: 'Correct — #endif closes the conditional block opened by #ifdef, #ifndef, or #if.',
            incorrect: '#endif is the closing directive for all conditional compilation blocks (#ifdef, #ifndef, #if, #elif, #else). Missing #endif is a common compile error.'
          }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Define LOG_LEVEL as 2. Use #if / #elif / #else to print: "VERBOSE" if level is 3, "NORMAL" if level is 2, "QUIET" if level is 1 or less.',
          includes: ['<stdio.h>'],
          check: output => output.toUpperCase().includes('NORMAL'),
          hint: '#define LOG_LEVEL 2. #if LOG_LEVEL == 3 ... #elif LOG_LEVEL == 2 ... #else ... #endif',
          solution: `#define LOG_LEVEL 2\n#if LOG_LEVEL == 3\n    printf("VERBOSE\\n");\n#elif LOG_LEVEL == 2\n    printf("NORMAL\\n");\n#else\n    printf("QUIET\\n");\n#endif`
        },
        {
          id: 'p2',
          task: 'Use #ifndef to define a safety default: if MAX_ITEMS is not defined, define it as 10. Then print MAX_ITEMS.',
          includes: ['<stdio.h>'],
          check: output => output.includes('10'),
          hint: '#ifndef MAX_ITEMS → #define MAX_ITEMS 10 → #endif. Then printf("%d\\n", MAX_ITEMS);',
          solution: `#ifndef MAX_ITEMS\n#define MAX_ITEMS 10\n#endif\nprintf("%d\\n", MAX_ITEMS);`
        },
        {
          id: 'p3',
          task: 'Write an include guard skeleton for "myheader.h". Define the guard symbol MYHEADER_H. Inside the guard, print "Header loaded". Show the full #ifndef / #define / #endif structure.',
          includes: ['<stdio.h>'],
          check: output => output.toLowerCase().includes('header') || output.toLowerCase().includes('loaded'),
          hint: '#ifndef MYHEADER_H → #define MYHEADER_H → content → #endif /* MYHEADER_H */',
          solution: `#ifndef MYHEADER_H\n#define MYHEADER_H\n\nprintf("Header loaded\\n");\n\n#endif /* MYHEADER_H */`
        }
      ]

      renderPracticeSet('practice-ch18-preprocessor', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch18-preprocessor-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch18-preprocessor-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch18-preprocessor-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'The #endif is missing, causing a compile error. Find where it belongs and add it.',
        includes: ['<stdio.h>'],
        starterCode:
`#define RELEASE

#ifdef DEBUG
    printf("Debug build\\n");
#else
    printf("Release build\\n");

printf("Program started\\n");`,
        checkFn: output => output.toLowerCase().includes('release') && output.toLowerCase().includes('started'),
        hint: 'Every #ifdef needs a matching #endif. The #else block needs to be closed before the non-conditional code.',
        hintTwo: 'Add #endif between the end of the #else block and printf("Program started"). The structure: #ifdef → #else → #endif → normal code.',
        solution: `#define RELEASE\n\n#ifdef DEBUG\n    printf("Debug build\\n");\n#else\n    printf("Release build\\n");\n#endif\n\nprintf("Program started\\n");`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Preprocessor — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════════ */
  function initMastery () {
    CCompiler.initBlock($('compiler-ch18-mastery'), {
      mode: 'build',
      topicId: 'ch18-mastery',
      chapterId: CH,
      question: 'Build a unit converter using only #define. Define: CM_TO_INCH (0.3937), KG_TO_LB (2.2046), and C_TO_F(c) as a function-like macro (c * 9.0/5.0 + 32). Then convert and print: 100 cm, 50 kg, 30°C. Use #ifdef METRIC to print a "Metric system" header if defined.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => {
        const has39  = output.includes('39')
        const has110 = output.includes('110')
        const has86  = output.includes('86')
        return has39 && has110 && has86
      },
      hint: '#define CM_TO_INCH 0.3937f  /  #define KG_TO_LB 2.2046f  /  #define C_TO_F(c) ((c)*9.0f/5.0f+32.0f) — results: 39.37, 110.23, 86.00',
      solution:
`#define CM_TO_INCH  0.3937f
#define KG_TO_LB    2.2046f
#define C_TO_F(c)   ((c) * 9.0f / 5.0f + 32.0f)
#define METRIC

#ifdef METRIC
printf("=== Metric Converter ===\\n");
#endif

printf("100 cm  = %.2f inches\\n", 100.0f * CM_TO_INCH);
printf("50 kg   = %.2f lbs\\n",    50.0f  * KG_TO_LB);
printf("30 C    = %.2f F\\n",      C_TO_F(30.0f));`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        const el = $('ch18-chapter-complete')
        if (el) el.style.display = 'block'
        const nb = $('ch18-next-btn')
        if (nb) nb.addEventListener('click', () => loadChapter('ch19'))
      }
    })
  }

  /* ══════════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════════ */
  function init () {
    initTopic_malloc()
    initTopic_files()
    initTopic_macros()
    initTopic_preprocessor()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
