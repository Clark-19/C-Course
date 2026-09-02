/* =========================================================
   C LEARNING PLATFORM — chapters/ch4-comments/ch4.js
   Chapter 4: Comments
   4 topics · Full 7-step active learning + assessment blocks
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch4'

  function $(id) { return document.getElementById(id) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — SINGLE-LINE COMMENTS //
     ══════════════════════════════════════════════════════════ */
  function initTopic_singleline() {
    const topicId = 'ch4-singleline'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — CODE FIRST */
    CCompiler.initBlock($('compiler-ch4-singleline-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `// This line is a comment — the compiler never sees it
printf("Line 1 runs.\\n");
// printf("This is commented out — it won't run.");
printf("Line 2 runs.\\n");
// A comment can go before code or after it:
printf("Line 3 runs.\\n");  // comment on the same line`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — INSTANT QUESTION */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch4-singleline',
      question: 'The code has 5 printf lines but only 3 printed. Which ones were skipped?',
      options: [
        'Lines 1, 2, and 3 ran; the others were syntax errors',
        'Line 2 (commented printf) and the comment before Line 1',
        'The printf on line 2 was commented out — everything else ran',
        'All five lines ran in order'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — the printf on line 3 (with // in front) was never executed. The compiler ignores everything after // on that line.',
        incorrect: 'Line 3 has // printf(...) — the // tells the compiler to ignore everything after it. Only the three un-commented printf calls ran.'
      },
      onAnswer: () => sm.complete(2)
    })

    /* Step 3 — continue button */
    $('step-ch4-singleline-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — GUIDED PRACTICE */
    CCompiler.initBlock($('compiler-ch4-singleline-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a single-line comment above each printf explaining what it prints. The output must stay exactly the same after adding comments.',
      includes: ['<stdio.h>'],
      starterCode: `printf("C Programming\\n");
printf("Chapter 4\\n");`,
      checkFn: (output) => output.includes('C Programming') && output.includes('Chapter 4'),
      hint: 'Add // Your comment here on the line immediately before each printf. Comments do not change what runs.',
      onPass: () => sm.complete(4)
    })

    /* Step 5 — FILL-IN-THE-BLANK */
    CCompiler.initBlock($('compiler-ch4-singleline-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to add a comment on line 1 and a same-line comment on line 3.',
      includes: ['<stdio.h>'],
      starterCode: `[?] Prints the program title
printf("Comments in C\\n");
printf("Learning is fun\\n"); [?] this line prints encouragement`,
      blanks: ['//', '//'],
      hint: 'Single-line comments start with two forward slashes: //',
      onPass: () => sm.complete(5)
    })

    /* Step 6 — INDEPENDENT BUILD */
    CCompiler.initBlock($('compiler-ch4-singleline-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program that prints two different lines. Put a single-line comment above each printf explaining what it prints. Also put a same-line comment after one of them.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 2
      },
      hint: 'Two printf() calls, each with a // comment above it. One printf() also gets a // comment at the end of the same line.',
      solution: `// Prints the program name\nprintf("My First C Program\\n");\n// Prints the version number\nprintf("Version 1.0\\n"); // initial release`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    /* ── Assessment ── */
    const predictQ = [
      {
        id: 'ch4-sl-p1', type: 'predict',
        question: 'What does this print?',
        code: `// printf("Hello\\n");\nprintf("World\\n");`,
        correct: ['World'],
        caseSensitive: true, orderMatters: true,
        hint: 'The first printf has // before it.',
        feedback: { correct: 'Correct — the first printf is commented out, only World prints.', incorrect: '// before printf comments it out. Only the second printf runs: World' }
      },
      {
        id: 'ch4-sl-p2', type: 'predict',
        question: 'What does this print?',
        code: `printf("A\\n"); // printf("B\\n");\nprintf("C\\n");`,
        correct: ['A\nC', 'A\r\nC'],
        caseSensitive: true, orderMatters: true,
        hint: 'The // only affects everything after it on line 1.',
        feedback: { correct: 'Right — A runs (before //), B is commented out, C runs on its own line.', incorrect: 'A prints (it is before //). printf("B") is commented. C prints. Output: A then C.' }
      },
      {
        id: 'ch4-sl-p3', type: 'predict',
        question: 'What does this print?',
        code: `int x = 5; // x = 10;\nprintf("%d\\n", x);`,
        correct: ['5'],
        caseSensitive: true, orderMatters: true,
        hint: 'The assignment after // is a comment, not code.',
        feedback: { correct: 'Correct — x = 10 is commented out. x stays 5.', incorrect: 'The x = 10 is after // so it is a comment. x remains 5. Output: 5' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch4-sl-m1', type: 'mcq',
        question: 'What two characters start a single-line comment in C?',
        options: ['##', '//', '/*', '--'],
        correct: ['//'], caseSensitive: true, orderMatters: false,
        hint: 'Two forward slash characters.',
        feedback: { correct: 'Correct — // starts a single-line comment.', incorrect: '// is the single-line comment marker in C. # is for preprocessor, /* starts a block comment.' }
      },
      {
        id: 'ch4-sl-m2', type: 'mcq',
        question: 'Where does a // comment end?',
        options: ['At the next */', 'At the end of the file', 'At the end of the current line', 'After the next semicolon'],
        correct: ['At the end of the current line'], caseSensitive: false, orderMatters: false,
        hint: "It's a single-LINE comment.",
        feedback: { correct: 'Correct — // comments end at the newline. Everything else on that line is ignored.', incorrect: '// comments end at the end of the line they appear on.' }
      },
      {
        id: 'ch4-sl-m3', type: 'mcq',
        question: 'Which of these is a valid C single-line comment?',
        options: ['# This is a comment', '-- This is a comment', '// This is a comment', '** This is a comment'],
        correct: ['// This is a comment'], caseSensitive: false, orderMatters: false,
        hint: 'C uses forward slashes, not hyphens or hashes.',
        feedback: { correct: 'Correct — // is the valid single-line comment marker in C.', incorrect: '// is the only valid single-line comment marker. # is Python/bash, -- is SQL/Lua.' }
      },
      {
        id: 'ch4-sl-m4', type: 'mcq',
        question: 'What does the compiler do with comments?',
        options: ['Prints them as warnings', 'Stores them in the binary', 'Ignores them completely', 'Converts them to documentation'],
        correct: ['Ignores them completely'], caseSensitive: false, orderMatters: false,
        hint: 'They have zero effect on the compiled program.',
        feedback: { correct: 'Correct — the compiler strips all comments before processing. They have zero runtime effect.', incorrect: 'Comments are completely stripped by the compiler. Nothing about them appears in the compiled program.' }
      },
      {
        id: 'ch4-sl-m5', type: 'mcq',
        question: 'int age = 20; // int age = 99;\nWhat is the value of age?',
        options: ['99', '20', '0', 'Undefined'],
        correct: ['20'], caseSensitive: true, orderMatters: false,
        hint: 'What comes after // on that line?',
        feedback: { correct: 'Correct — the second assignment is after // so it is a comment. age = 20.', incorrect: 'age = 20 runs. age = 99 is after // so it is a comment and never executes.' }
      }
    ]

    const identifyQ = [
      {
        id: 'ch4-sl-id1', type: 'identify',
        question: 'What do you call text in C code that the compiler completely ignores?',
        correct: ['comment', 'a comment', 'comments', 'code comment'],
        caseSensitive: false, orderMatters: false,
        hint: 'The word for it starts with "c".',
        feedback: { correct: 'Correct — it is called a comment.', incorrect: 'It is called a comment. Comments are ignored by the compiler.' }
      },
      {
        id: 'ch4-sl-id2', type: 'identify',
        question: 'What two characters begin a single-line comment in C?',
        correct: ['//', 'double slash', 'two slashes', 'forward slash forward slash', '//'],
        caseSensitive: false, orderMatters: false,
        hint: 'Two identical characters, each is the division symbol.',
        feedback: { correct: 'Correct — // starts a single-line comment.', incorrect: '// — two forward slashes — starts a single-line comment in C.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch4-singleline-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch4-singleline-mcq', questions: mcqQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch4-singleline-identify', questions: identifyQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch4-singleline-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program should print two lines but prints nothing. Find and fix the bug.',
      includes: ['<stdio.h>'],
      starterCode: `// printf("Hello!\\n");
// printf("Comments rule!\\n");`,
      checkFn: (output) => output.includes('Hello') && output.includes('Comments'),
      hint: 'Both printf lines are commented out. What symbol is causing that?',
      hintTwo: 'Remove the // from the beginning of each line to un-comment the printfs.',
      solution: `printf("Hello!\\n");\nprintf("Comments rule!\\n");`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — MULTI-LINE COMMENTS (slash* ... *slash)
     ══════════════════════════════════════════════════════════ */
  function initTopic_multiline() {
    const topicId = 'ch4-multiline'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch4-multiline-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `/*
 * Program: Comment Demo
 * This entire block is a comment.
 * It spans multiple lines.
 * The compiler ignores all of this.
 */
printf("First line runs.\\n");

/* A short block comment on one line — also valid */
printf("Second line runs.\\n");

/*
   Even code inside a block comment is ignored:
   printf("This will NOT run.\\n");
   int x = 100;
*/
printf("Third line runs.\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch4-multiline',
      question: 'The code has 4 printf lines but only 3 printed. Which one did NOT run?',
      options: [
        'The second printf',
        'The printf inside the last /* */ block',
        'The first printf',
        'All four ran'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — the printf inside the /* */ block is a comment. The compiler never sees it.',
        incorrect: 'The printf("This will NOT run.") is between /* and */ so it is inside a block comment and never executes.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch4-multiline-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch4-multiline-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a multi-line block comment at the top of main that spans exactly 3 lines and describes what the program does. The output must stay the same.',
      includes: ['<stdio.h>'],
      starterCode: `printf("Block comments\\n");
printf("are powerful\\n");`,
      checkFn: (output) => output.includes('Block comments') && output.includes('are powerful'),
      hint: 'Add: /*\\n * Your description\\n */ before the first printf. The output should not change.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch4-multiline-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the opening and closing markers of the multi-line comment.',
      includes: ['<stdio.h>'],
      starterCode: `[?]
 * This program demonstrates
 * multi-line block comments in C.
[?]
printf("Multi-line comments work!\\n");`,
      blanks: ['/*', '*/'],
      hint: 'Block comments open with slash-star and close with star-slash.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch4-multiline-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program that prints your name and a fun fact about yourself. At the very top (before the printfs), write a multi-line block comment with: your name, the date, and what the program does.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 2
      },
      hint: '/* on one line, then your comment lines, then */ on its own line. Then two printf() calls.',
      solution: `/*\n * Student: Your Name\n * Date: 2024\n * Prints personal info\n */\nprintf("Name: Alex\\n");\nprintf("Fact: I love coding\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch4-ml-p1', type: 'predict',
        question: 'What prints?',
        code: `/* printf("Hello\\n"); */\nprintf("World\\n");`,
        correct: ['World'],
        caseSensitive: true, orderMatters: true,
        hint: 'The first printf is inside /* */.',
        feedback: { correct: 'Right — the first printf is inside a block comment. Only World prints.', incorrect: '/* printf("Hello") */ is a comment. Only printf("World") runs.' }
      },
      {
        id: 'ch4-ml-p2', type: 'predict',
        question: 'What prints?',
        code: `printf("Line 1\\n");\n/* printf("Line 2\\n"); */\nprintf("Line 3\\n");`,
        correct: ['Line 1\nLine 3', 'Line 1\r\nLine 3'],
        caseSensitive: true, orderMatters: true,
        hint: 'Line 2 printf is inside /* */.',
        feedback: { correct: 'Correct — Line 1 and Line 3 print. Line 2 is blocked by /* */.', incorrect: '/* */ comments out the printf on line 2. Output: Line 1 then Line 3.' }
      },
      {
        id: 'ch4-ml-p3', type: 'predict',
        question: 'What prints? (hint: count lines of output)',
        code: `/*\nprintf("A\\n");\nprintf("B\\n");\n*/\nprintf("C\\n");`,
        correct: ['C'],
        caseSensitive: true, orderMatters: true,
        hint: 'The /* opens on line 1 and */ closes on line 4.',
        feedback: { correct: 'Correct — A and B are inside the block comment. Only C prints.', incorrect: 'The block comment covers printf("A") and printf("B"). Only printf("C") runs.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch4-ml-m1', type: 'mcq',
        question: 'What two characters open a multi-line comment in C?',
        options: ['\\\\', '/*', '//', '*/'],
        correct: ['/*'], caseSensitive: true, orderMatters: false,
        hint: 'Forward slash then asterisk.',
        feedback: { correct: 'Correct — /* opens a block comment.', incorrect: '/* opens and */ closes a block comment.' }
      },
      {
        id: 'ch4-ml-m2', type: 'mcq',
        question: 'What happens if you open /* but forget to close it with */?',
        options: [
          'The comment ends at the next //.',
          'The compiler ignores everything from /* to the end of the file.',
          'The comment only covers the current line.',
          'It is automatically fixed by the compiler.'
        ],
        correct: ['The compiler ignores everything from /* to the end of the file.'], caseSensitive: false, orderMatters: false,
        hint: 'An unclosed block comment swallows everything after it.',
        feedback: { correct: 'Correct — an unclosed /* treats everything after it as a comment. Your program will not compile.', incorrect: 'Without the closing */, the compiler treats everything from /* onwards as a comment. The file will fail to compile.' }
      },
      {
        id: 'ch4-ml-m3', type: 'mcq',
        question: 'Can you nest block comments in C? (/* inside another /* */)',
        options: ['Yes — comments can be nested freely', 'No — the first */ closes the outer comment too', 'Only if you use //', 'Only in C99 and later'],
        correct: ['No — the first */ closes the outer comment too'], caseSensitive: false, orderMatters: false,
        hint: 'C block comments cannot be nested.',
        feedback: { correct: 'Correct — C does not support nested block comments. The first */ always ends the comment.', incorrect: 'C block comments cannot nest. The first */ encountered always closes the comment, regardless of any /* inside.' }
      },
      {
        id: 'ch4-ml-m4', type: 'mcq',
        question: 'Is this valid C? /* open */ /* second comment */',
        options: ['No — two block comments cannot be on the same line', 'Yes — each /* */ is independent', 'No — block comments cannot appear twice in a file', 'Only if they are on separate lines'],
        correct: ['Yes — each /* */ is independent'], caseSensitive: false, orderMatters: false,
        hint: 'Each /* */ pair is self-contained.',
        feedback: { correct: 'Correct — two separate /* */ comments on the same line is valid C.', incorrect: 'Each /* */ pair is independent. You can have as many block comments as you want, even on the same line.' }
      },
      {
        id: 'ch4-ml-m5', type: 'mcq',
        question: 'What is the main advantage of /* */ over // for disabling large sections of code?',
        options: [
          '/* */ is faster to type',
          '/* */ can span multiple lines with one open/close pair',
          '/* */ is required by the C standard for comments',
          '/* */ compiles to smaller code'
        ],
        correct: ['/* */ can span multiple lines with one open/close pair'], caseSensitive: false, orderMatters: false,
        hint: 'Think about commenting out 20 lines at once.',
        feedback: { correct: 'Correct — one /* ... */ pair can disable 1 or 100 lines. With //, you would need to add // to every single line.', incorrect: '/* */ can cover many lines with just one open and one close. That is its key advantage for commenting out blocks.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch4-multiline-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch4-multiline-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch4-multiline-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program will not compile. Find the bug in the block comment.',
      includes: ['<stdio.h>'],
      starterCode: `/* This prints the greeting
printf("Hello!\\n");
return 0;
}`,
      checkFn: (output) => output.includes('Hello'),
      hint: 'Look at the multi-line comment. It has an opening /* — does it have a closing */?',
      hintTwo: 'Add */ after the comment text on line 1. Without it, the printf and return 0 are inside the comment.',
      solution: `/* This prints the greeting */\nprintf("Hello!\\n");`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — COMMENTS IN PRACTICE
     ══════════════════════════════════════════════════════════ */
  function initTopic_practice() {
    const topicId = 'ch4-practice'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch4-practice-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `/*
 * temperature_converter.c
 * Converts Celsius to Fahrenheit.
 * Formula: F = (C * 9/5) + 32
 */

// Starting temperature in Celsius
float celsius = 100.0;

// Convert using the standard formula
// Multiply by 9/5 then add 32
float fahrenheit = (celsius * 9.0 / 5.0) + 32.0;

// Print both values clearly labeled
printf("Celsius:    %.1f\\n", celsius);
printf("Fahrenheit: %.1f\\n", fahrenheit);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch4-practice',
      question: 'The comments in this program explain WHY and HOW — not just WHAT. Which comment style is the best example of explaining a non-obvious decision?',
      options: [
        '// Starting temperature in Celsius',
        '// Print both values clearly labeled',
        '// Multiply by 9/5 then add 32',
        '/* temperature_converter.c */'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Right — explaining the arithmetic steps helps anyone reading the code understand why that exact formula works.',
        incorrect: '"Multiply by 9/5 then add 32" explains the algorithm — the non-obvious part. "Starting temperature in Celsius" just restates what the code already shows.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch4-practice-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch4-practice-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Improve these comments: replace "what" comments with "why" comments. The first comment just says what the code does (bad). Rewrite it to explain why.',
      includes: ['<stdio.h>'],
      starterCode: `int max_retries = 3;    // set max_retries to 3
int timeout_ms = 5000;  // set timeout_ms to 5000
printf("Config: retries=%d, timeout=%dms\\n", max_retries, timeout_ms);`,
      checkFn: (output) => output.includes('retries=3') && output.includes('timeout=5000'),
      hint: 'Change "set max_retries to 3" to something that explains WHY 3 retries. Example: "3 retries before giving up and reporting failure".',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch4-practice-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the comment markers to create a proper file header block comment and an inline comment.',
      includes: ['<stdio.h>'],
      starterCode: `[?]
 * bmi_calculator.c
 * Calculates Body Mass Index (weight/height^2)
[?]
float weight = 70.0; [?] weight in kilograms
float height = 1.75; [?] height in meters
float bmi = weight / (height * height);
printf("BMI: %.1f\\n", bmi);`,
      blanks: ['/*', '*/', '//', '//'],
      hint: 'Block comment: open with /* and close with */. Inline comments: use //',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch4-practice-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a simple area calculator (rectangle: width × height). Include:\n① A multi-line header comment with file name, what it does, and the formula\n② A // comment explaining why you chose the formula\n③ Inline // comments on each variable explaining the unit\n④ Print the result',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        const num = parseFloat(output)
        return !isNaN(num) && output.trim().length > 0
      },
      hint: 'Header: /* ... */. For each variable: float width = 5.0; // in meters. Formula comment: // area = width * height (basic Euclidean geometry).',
      solution: `/*\n * area_calc.c\n * Calculates the area of a rectangle.\n * Formula: area = width * height\n */\nfloat width  = 5.0;  // in meters\nfloat height = 3.0;  // in meters\n// Multiply dimensions — works for any rectangle\nfloat area = width * height;\nprintf("Area: %.1f sq meters\\n", area);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const mcqQ = [
      {
        id: 'ch4-pr-m1', type: 'mcq',
        question: 'Which comment is better?',
        options: [
          '// increment count by 1',
          '// count++ because we processed one more valid record',
          '// count is a variable',
          '// this is important'
        ],
        correct: ['// count++ because we processed one more valid record'], caseSensitive: false, orderMatters: false,
        hint: 'Comments should explain WHY, not WHAT.',
        feedback: { correct: 'Right — explaining why the increment happens (valid record processed) is more valuable than restating what count++ does.', incorrect: 'Comments should explain WHY, not restate WHAT. "Because we processed one more valid record" adds information the code does not show.' }
      },
      {
        id: 'ch4-pr-m2', type: 'mcq',
        question: 'When should you add a comment?',
        options: [
          'On every single line of code',
          'At decision points, workarounds, and non-obvious logic',
          'Never — good code needs no comments',
          'Only on functions, nowhere else'
        ],
        correct: ['At decision points, workarounds, and non-obvious logic'], caseSensitive: false, orderMatters: false,
        hint: 'Think about where a reader would be confused.',
        feedback: { correct: 'Correct — comment where the why is not obvious. Over-commenting makes code harder to read.', incorrect: 'Comment at decision points and non-obvious places. Too few is confusing. Too many makes code unreadable.' }
      },
      {
        id: 'ch4-pr-m3', type: 'mcq',
        question: 'What does a file header comment typically contain?',
        options: [
          'A copy of the entire program',
          'The name, purpose, and key information about the file',
          'A list of all variable names',
          'Only the date it was created'
        ],
        correct: ['The name, purpose, and key information about the file'], caseSensitive: false, orderMatters: false,
        hint: 'Think about what the first person to open the file needs to know.',
        feedback: { correct: 'Correct — file headers give an overview: filename, purpose, author, date, key notes.', incorrect: 'File header comments briefly describe what the file does, who wrote it, and any key context.' }
      },
      {
        id: 'ch4-pr-m4', type: 'mcq',
        question: 'Which comment style is most appropriate for a function description?',
        options: ['// function does stuff', '/* calculates the average of n scores stored in the scores array */', '#define COMMENT', '/* */ with nothing inside'],
        correct: ['/* calculates the average of n scores stored in the scores array */'], caseSensitive: false, orderMatters: false,
        hint: 'Function comments should describe parameters, purpose, and return value.',
        feedback: { correct: 'Correct — a descriptive block comment before a function is the standard C documentation style.', incorrect: 'Function comments should be descriptive block comments explaining what the function does, its parameters, and return value.' }
      },
      {
        id: 'ch4-pr-m5', type: 'mcq',
        question: 'Why should comments explain "why" rather than "what"?',
        options: [
          'The compiler needs why information',
          'The code itself already shows what it does; the why is what is not obvious',
          'It makes files smaller',
          'It is a C language requirement'
        ],
        correct: ['The code itself already shows what it does; the why is what is not obvious'], caseSensitive: false, orderMatters: false,
        hint: 'If you can read the code and already know what it does, what does a comment add?',
        feedback: { correct: 'Exactly — int count++ already shows that count increments. A comment adds value by explaining why that decision was made.', incorrect: 'Code shows what happens. Comments add value by explaining why — the reasoning, trade-offs, and context that code alone cannot convey.' }
      }
    ]

    const practiceConfigs = [
      { id: 'p1', task: 'Write a program with a 3-line block comment at the top (file name, purpose, and your name). Print one line of output.', check: o => o.trim().length > 0, hint: 'Use /* on one line, two lines of content, then */ on its own line before the printf.', solution: `/*\n * hello.c\n * Prints a greeting.\n * Author: Student\n */\nprintf("Hello, World!\\n");` },
      { id: 'p2', task: 'Write a program with two variables and a // comment on each variable explaining its unit or meaning. Print both.', check: o => o.split('\n').filter(l=>l.trim()).length >= 2, hint: 'int age = 18; // in years — then printf it.', solution: `int age = 18;    // in years\nfloat height = 1.75; // in meters\nprintf("Age: %d years\\n", age);\nprintf("Height: %.2f m\\n", height);` },
      { id: 'p3', task: 'Write a program with a calculation. Add a // comment that explains WHY that formula is used (not just what it does).', check: o => o.trim().length > 0, hint: 'float bmi = weight / (height*height); // BMI formula: kg/m² per WHO standard', solution: `float weight = 70.0;\nfloat height = 1.75;\n// BMI formula: kg/m² (World Health Organization standard)\nfloat bmi = weight / (height * height);\nprintf("BMI: %.1f\\n", bmi);` },
      { id: 'p4', task: 'Write a program where you have two different ways to calculate something. Comment out the old way and use the new way. Print the result.', check: o => o.trim().length > 0, hint: 'Write both approaches, then put // before the old one. Only the new one should run.', solution: `int a = 10, b = 3;\n// Old approach: integer division (loses remainder)\n// int result = a / b;\n// New approach: float division (preserves decimals)\nfloat result = (float)a / b;\nprintf("Result: %.2f\\n", result);` },
      { id: 'p5', task: 'Write a complete well-commented program. Minimum requirements: block header comment at top (3+ lines), at least 2 inline // comments, at least 3 printf calls.', check: o => o.split('\n').filter(l=>l.trim()).length >= 3, hint: 'Header: /* ... */. Then your code with inline // comments on variables and/or logic.', solution: `/*\n * grades.c\n * Calculates and displays a student grade summary.\n */\nchar name[] = "Alice";   // student name\nint score = 92;           // out of 100\nchar grade;\n// Assign letter grade based on standard scale\ngrade = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C';\nprintf("Student: %s\\n", name);\nprintf("Score:   %d%%\\n", score);\nprintf("Grade:   %c\\n", grade);` }
    ]

    renderPracticeSet('practice-ch4-practice', CH, topicId, practiceConfigs)
    QuizEngine.init({ containerId: 'quiz-ch4-practice-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — COMMENTING OUT CODE
     ══════════════════════════════════════════════════════════ */
  function initTopic_commentout() {
    const topicId = 'ch4-commentout'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch4-commentout-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `printf("Line 1: always prints\\n");
printf("Line 2: always prints\\n");
// printf("Line 3: commented out — disabled\\n");
printf("Line 4: always prints\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch4-commentout',
      question: 'Now add // to the beginning of the Line 2 printf — without deleting it. What will happen when you compile?',
      options: [
        'Line 2 will still print',
        'The program will crash',
        'Line 2 will be skipped but can be restored by removing the //',
        'Adding // causes a compile error'
      ],
      correctIndex: 2,
      feedback: {
        correct: 'Exactly — commenting out disables the line without deleting it. Remove the // to restore it instantly.',
        incorrect: 'Adding // disables (comments out) the line. The code is still there — remove the // to re-enable it. No crash, no compile error.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch4-commentout-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch4-commentout-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Comment out the second printf so the program only prints one line. Do NOT delete the line — just disable it with //.',
      includes: ['<stdio.h>'],
      starterCode: `printf("Keep this line.\\n");
printf("Disable this line.\\n");`,
      checkFn: (output) => output.includes('Keep this') && !output.includes('Disable this'),
      hint: 'Add // at the very beginning of the second printf line.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch4-commentout-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the comment markers to disable the old version and keep only the new version active.',
      includes: ['<stdio.h>'],
      starterCode: `[?] int result = a + b;        (old: addition)
int result = a * b;       [?] new: multiplication is what we want
printf("Result: %d\\n", result);`,
      blanks: ['//', '//'],
      hint: 'Use // to comment out the first line and add a // comment after the second.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch4-commentout-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program that has two different formulas to convert temperature (C to F). Use /* */ to comment out Formula A and leave Formula B active. Print the result of Formula B.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        return output.includes('212') || output.includes('32') || output.includes('98.6') || output.includes('37')
      },
      hint: 'Formula A: F = C * 2 + 30 (rough approximation). Formula B: F = C * 9.0/5.0 + 32 (exact). Comment A out with /* */, use B.',
      solution: `float celsius = 100.0;\n/* Rough approximation (commented out — not accurate enough)\nfloat fahrenheit = celsius * 2 + 30;\n*/\n// Exact conversion (active)\nfloat fahrenheit = celsius * 9.0 / 5.0 + 32.0;\nprintf("%.0f C = %.0f F\\n", celsius, fahrenheit);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch4-co-p1', type: 'predict',
        question: 'What prints?',
        code: `printf("A\\n");\n// printf("B\\n");\nprintf("C\\n");`,
        correct: ['A\nC', 'A\r\nC'],
        caseSensitive: true, orderMatters: true,
        hint: 'B is commented out.',
        feedback: { correct: 'Correct — A and C print. B is commented out.', incorrect: '// printf("B") is disabled. A and C run.' }
      },
      {
        id: 'ch4-co-p2', type: 'predict',
        question: 'What prints?',
        code: `int x = 5;\n// x = 10;\nprintf("%d\\n", x);`,
        correct: ['5'],
        caseSensitive: true, orderMatters: true,
        hint: 'x = 10 is commented out.',
        feedback: { correct: 'Correct — x = 10 is disabled. x stays 5.', incorrect: 'x = 10 is after // so it never runs. x remains 5.' }
      },
      {
        id: 'ch4-co-p3', type: 'predict',
        question: 'What prints?',
        code: `printf("On\\n");\n/*\nprintf("Off1\\n");\nprintf("Off2\\n");\n*/\nprintf("On again\\n");`,
        correct: ['On\nOn again', 'On\r\nOn again'],
        caseSensitive: true, orderMatters: true,
        hint: 'Off1 and Off2 are inside /* */.',
        feedback: { correct: 'Correct — the two middle printfs are inside a block comment.', incorrect: '/* ... */ disables Off1 and Off2. Only On and On again print.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch4-co-m1', type: 'mcq',
        question: 'What is the advantage of commenting out code versus deleting it?',
        options: [
          'Commented code compiles faster',
          'You can restore it instantly by removing the comment markers',
          'It reduces file size',
          'The compiler warns you about commented code'
        ],
        correct: ['You can restore it instantly by removing the comment markers'], caseSensitive: false, orderMatters: false,
        hint: 'Deleted code is gone. Commented code is preserved.',
        feedback: { correct: 'Correct — commenting preserves the code. Remove the markers to restore it. Deleted code requires rewriting.', incorrect: 'The key advantage: commented code is still there. Remove // or /* */ to bring it back. Deleted code is gone.' }
      },
      {
        id: 'ch4-co-m2', type: 'mcq',
        question: 'You want to disable 15 lines of code at once. Which is more efficient?',
        options: [
          'Add // to the start of each of the 15 lines',
          'Wrap the entire block with /* and */',
          'Delete the 15 lines',
          'Move them to a different function'
        ],
        correct: ['Wrap the entire block with /* and */'], caseSensitive: false, orderMatters: false,
        hint: 'One opening and one closing covers everything.',
        feedback: { correct: 'Correct — one /* at the top and one */ at the bottom disables everything between them.', incorrect: '/* */ is far more efficient for blocks. Adding // to 15 lines individually is slow and error-prone.' }
      },
      {
        id: 'ch4-co-m3', type: 'mcq',
        question: 'You have commented out code as a debugging technique. You fixed the bug. What should you do next?',
        options: [
          'Leave it commented forever',
          'Delete the commented code or restore it — do not leave it permanently',
          'Add more comments explaining why it is there',
          'Put it inside a function called unused_code()'
        ],
        correct: ['Delete the commented code or restore it — do not leave it permanently'], caseSensitive: false, orderMatters: false,
        hint: 'Commented-out code clutters the codebase long-term.',
        feedback: { correct: 'Correct — temporary comment-outs for debugging should be cleaned up. Either restore or delete.', incorrect: 'Commented-out code left permanently clutters the codebase. Clean it up after debugging is done.' }
      },
      {
        id: 'ch4-co-m4', type: 'mcq',
        question: 'What is "binary search debugging" using comments?',
        options: [
          'Searching for the number 2 in code',
          'Commenting out half the code to see if the bug disappears, then narrowing down',
          'Using binary operators to find bugs',
          'Commenting every other line'
        ],
        correct: ['Commenting out half the code to see if the bug disappears, then narrowing down'], caseSensitive: false, orderMatters: false,
        hint: 'Like binary search in algorithms — divide and conquer.',
        feedback: { correct: 'Correct — comment out half, test, then comment out half of the remaining half until you isolate the bug.', incorrect: 'Binary search debugging: disable half the code, test if bug is gone, then repeat on the relevant half until isolated.' }
      },
      {
        id: 'ch4-co-m5', type: 'mcq',
        question: 'When using /* */ to comment out a block, what can go wrong if the block already contains */?',
        options: [
          'Nothing — /* */ handles nested content fine',
          'The first */ inside the block ends the outer comment early',
          'It causes a segfault',
          'The inner */ becomes part of the output'
        ],
        correct: ['The first */ inside the block ends the outer comment early'], caseSensitive: false, orderMatters: false,
        hint: 'C block comments cannot be nested.',
        feedback: { correct: 'Correct — C comments cannot nest. The first */ ends the comment, leaving any code after it active (and possibly broken).', incorrect: 'C block comments cannot nest. If the code you are commenting out already has */, the comment ends there — not at your intended closing */.' }
      }
    ]

    const practiceConfigs = [
      { id: 'p1', task: 'Start with a program that prints three lines. Comment out the middle one using //. Compile — only two lines should print.', check: o => o.split('\n').filter(l=>l.trim()).length === 2, hint: 'Add // at the start of the middle printf.', solution: `printf("First\\n");\n// printf("Second\\n");\nprintf("Third\\n");` },
      { id: 'p2', task: 'Write a program with two versions of a calculation (version A and version B). Comment out version A with // and run version B.', check: o => o.trim().length > 0, hint: 'Example: // int result = a + b; then int result = a * b;', solution: `int a = 10, b = 3;\n// int result = a + b;  // version A: sum\nint result = a * b;     // version B: product\nprintf("Result: %d\\n", result);` },
      { id: 'p3', task: 'Use /* */ to comment out an entire block of 3 printf lines. Only one printf should run (outside the block).', check: o => o.split('\n').filter(l=>l.trim()).length === 1, hint: 'Open /* before the block, */ after it, and leave one printf outside.', solution: `printf("This runs\\n");\n/*\nprintf("Disabled 1\\n");\nprintf("Disabled 2\\n");\nprintf("Disabled 3\\n");\n*/` },
      { id: 'p4', task: 'Write a debugging scenario: a program that should print "Done" but has two buggy lines. Comment them out (one with //, one with /* */) to fix it.', check: o => o.includes('Done'), hint: 'Example broken line 1: printf("%d"); (missing arg). Line 2: printf(x); (no format string). Comment both out.', solution: `// printf("%d"); // broken - missing variable\n/* printf(x); // broken - wrong syntax */\nprintf("Done\\n");` },
      { id: 'p5', task: 'Write a program with old code and new code side-by-side. Comment out the old code, keep the new code active, and add a comment explaining WHY you switched.', check: o => o.trim().length > 0, hint: 'Old: // float avg = total / count; (integer division). New: float avg = (float)total / count; // fixed: cast to avoid integer truncation', solution: `int total = 17, count = 3;\n// float avg = total / count; // old: integer division loses decimals\nfloat avg = (float)total / count; // new: cast fixes integer truncation\nprintf("Average: %.2f\\n", avg);` }
    ]

    renderPracticeSet('practice-ch4-commentout', CH, topicId, practiceConfigs)
    QuizEngine.init({ containerId: 'quiz-ch4-commentout-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch4-commentout-mcq', questions: mcqQ, onComplete: () => {} })

    CCompiler.initBlock($('compiler-ch4-commentout-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program is supposed to print "Active" but something else is happening. Find and fix it.',
      includes: ['<stdio.h>'],
      starterCode: `/* printf("Active\\n"); */
printf("Also Active\\n");`,
      checkFn: (output) => output.includes('Active') && output.includes('Also Active'),
      hint: 'Look at the first line. What do the /* and */ around it do?',
      hintTwo: 'Remove the /* and */ from around the first printf to un-comment it. Both lines should then run.',
      solution: `printf("Active\\n");\nprintf("Also Active\\n");`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     CHAPTER 4 MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch4-mastery'), {
      mode: 'build',
      topicId: 'ch4-mastery',
      chapterId: CH,
      question: 'The Complete Comment Challenge.\n\n① Write a multi-line header comment (at least 4 lines: filename, purpose, formula used, your name).\n② Declare two variables with inline // comments explaining each.\n③ Write a calculation. Add a // comment explaining WHY that formula is correct.\n④ Comment out an alternative calculation using /* */.\n⑤ Print the final result clearly labeled.\n\nUse: area of a triangle (base × height ÷ 2) vs base × height as the alternative.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        return output.trim().length > 0 && (output.includes('.') || /\d/.test(output))
      },
      hint: 'Header first (/* 4+ lines */), then variables with // comments, then the formula with a // why-comment, then /* */ around the alternative, then printf.',
      solution: `/*\n * triangle_area.c\n * Calculates the area of a triangle.\n * Formula: (base * height) / 2 — standard Euclidean geometry\n * Author: Student\n */\nfloat base   = 10.0;  // base of triangle in cm\nfloat height = 6.0;   // height (perpendicular) in cm\n\n// Correct formula: divide by 2 because triangle is half a rectangle\nfloat area = (base * height) / 2.0;\n\n/* Alternative (wrong — this is rectangle area, not triangle):\nfloat area = base * height;\n*/\n\nprintf("Triangle area: %.1f sq cm\\n", area);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch4-chapter-complete').style.display = 'block'
        $('ch4-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch4-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch5')
    })
  }

  /* ══════════════════════════════════════════════════════════
     SHARED UTILITIES
     ══════════════════════════════════════════════════════════ */
  function setupAssessmentTabs(topicId) {
    const block = document.querySelector(`.assessment-block[data-topic="${topicId}"]`)
    if (!block) return
    const tabs = block.querySelectorAll('.assessment-tab')
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab
        tabs.forEach(t => t.classList.remove('assessment-tab--active'))
        tab.classList.add('assessment-tab--active')
        block.querySelectorAll('.assessment-section').forEach(s => s.classList.remove('assessment-section--active'))
        const target = block.querySelector(`#tab-${tabName}-${topicId}`)
        if (target) target.classList.add('assessment-section--active')
      })
    })
  }

  function renderPracticeSet(containerId, chapterId, topicId, configs) {
    const container = document.getElementById(containerId)
    if (!container) return
    let currentIdx = 0

    function renderTask(idx) {
      if (idx >= configs.length) {
        container.innerHTML = '<p class="practice-complete">All coding tasks complete! ✓</p>'
        Progress.saveTopicComplete(chapterId, topicId + '-practice')
        return
      }
      const cfg = configs[idx]
      container.innerHTML = ''

      const header = document.createElement('div')
      header.className = 'practice-task__header'
      header.innerHTML = `<span class="practice-task__num">Task ${idx + 1} of ${configs.length}</span><span class="practice-task__dots">${configs.map((_, i) => `<span class="dot ${i < idx ? 'dot--done' : i === idx ? 'dot--active' : ''}"></span>`).join('')}</span>`
      container.appendChild(header)

      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      container.appendChild(desc)

      const div = document.createElement('div')
      div.id = `practice-compiler-${topicId}-${cfg.id}`
      container.appendChild(div)

      CCompiler.initBlock(div, {
        mode: 'build',
        topicId: topicId + '-p-' + cfg.id,
        chapterId,
        question: null,
        includes: ['<stdio.h>'],
        starterCode: '',
        checkFn: cfg.check,
        hint: cfg.hint,
        solution: cfg.solution,
        onPass: () => {
          Progress.saveStepComplete(chapterId, topicId, 'p' + cfg.id)
          currentIdx++
          setTimeout(() => renderTask(currentIdx), 800)
        }
      })
    }

    renderTask(currentIdx)
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  function init() {
    initTopic_singleline()
    initTopic_multiline()
    initTopic_practice()
    initTopic_commentout()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
