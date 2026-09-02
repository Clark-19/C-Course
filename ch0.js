/* =========================================================
   C LEARNING PLATFORM — chapters/ch0-intro/ch0.js
   Chapter 0: Introduction to C
   All compiler blocks, quizzes, step management
   ========================================================= */

(function () {
  'use strict'

  const CHAPTER_ID = 'ch0'

  /* -------------------------------------------------------
     TOPIC 1: WHAT IS C?
     ------------------------------------------------------- */

  const sm_whatisC = StepManager.init('ch0-whatisC', 7, CHAPTER_ID)

  // Step 1 — Explore: Hello World — the very first thing the student runs
  CCompiler.initBlock(document.getElementById('compiler-ch0-whatisC-explore'), {
    mode: 'explore',
    topicId: 'ch0-whatisC',
    question: 'Compile and run this — your very first C program.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("I am running C in the browser.\\n");
    return 0;
}`,
    hint: 'Click the ▶ Run button to compile and execute the program.',
    onPass: () => {
      sm_whatisC.complete(1)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step1')
    }
  })

  // Step 2 — Instant Question
  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch0-whatisC',
    question: 'You clicked Run and the program printed two lines. What had to happen between clicking Run and seeing the output?',
    options: [
      'The browser interpreted the code line by line',
      'The code was translated into machine instructions first',
      'The text was fetched from a server',
      'Nothing — it runs directly as text'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — C code is <strong>compiled</strong> into machine instructions before it runs. The compiler read your code, translated it, and then the machine executed it.',
      incorrect: 'C is <strong>compiled</strong>, not interpreted. The compiler translated your source code into machine instructions, then those instructions ran — that\'s why it\'s so fast.'
    },
    onAnswer: (correct) => {
      sm_whatisC.complete(2)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step2')
    }
  })

  // Step 3 reveals automatically when step 2 completes (StepManager handles it)
  // Manually mark step 3 complete after a brief read time
  setTimeout(() => {
    const step3 = document.getElementById('step-ch0-whatisC-3')
    if (step3 && step3.classList.contains('step--visible')) {
      step3.addEventListener('click', function markRead() {
        sm_whatisC.complete(3)
        Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step3')
        step3.removeEventListener('click', markRead)
      }, { once: true })
    }
  }, 500);

  // Add a "Got it →" button to explanation card to explicitly advance step 3
  (()  => {  // was DOMContentLoaded — now runs immediately
    const step3 = document.getElementById('step-ch0-whatisC-3')
    if (step3) {
      const gotItBtn = document.createElement('button')
      gotItBtn.className = 'btn-continue'
      gotItBtn.textContent = 'Got it — next step →'
      gotItBtn.style.marginTop = 'var(--space-20)'
      gotItBtn.addEventListener('click', () => {
        sm_whatisC.complete(3)
        Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step3')
        gotItBtn.remove()
      })
      step3.appendChild(gotItBtn)
    }
  })()

  // Step 4 — Modify: change the output string
  CCompiler.initBlock(document.getElementById('compiler-ch0-whatisC-modify'), {
    mode: 'modify',
    topicId: 'ch0-whatisC',
    question: 'Change line 4 so the program prints your name instead of "Hello, World!" — then compile it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("I am running C in the browser.\\n");
    return 0;
}`,
    expected: null,
    checkFn: (output) => output.trim().length > 0 && !output.includes('Hello, World!'),
    hint: 'Replace the text inside the double quotes on line 4. Keep the \\n at the end — that\'s the newline character.',
    solution: `#include <stdio.h>

int main() {
    printf("Hello, Alex!\\n");
    printf("I am running C in the browser.\\n");
    return 0;
}`,
    onPass: () => {
      sm_whatisC.complete(4)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step4')
    }
  })

  // Step 5 — Fill-in-the-blank
  CCompiler.initBlock(document.getElementById('compiler-ch0-whatisC-fill'), {
    mode: 'fill',
    topicId: 'ch0-whatisC',
    question: 'Complete the blanks to make this program print: C is powerful',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ]("C is powerful\\n");
    [ ? ] 0;
}`,
    expected: 'C is powerful',
    hint: 'The first blank is the output function. The second blank is how you end main() — it signals success to the operating system.',
    solution: `#include <stdio.h>

int main() {
    printf("C is powerful\\n");
    return 0;
}`,
    onPass: () => {
      sm_whatisC.complete(5)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step5')
    }
  })

  // Step 6 — Build: independent mini challenge
  CCompiler.initBlock(document.getElementById('compiler-ch0-whatisC-build'), {
    mode: 'build',
    topicId: 'ch0-whatisC',
    question: 'Write a C program that prints exactly three lines — anything you want on each line.',
    includes: ['<stdio.h>'],
    starterCode: ``,
    checkFn: (output) => {
      const lines = output.trim().split('\n').filter(l => l.trim().length > 0)
      return lines.length === 3
    },
    hint: 'Use printf() three times, each with a \\n at the end. Remember: boilerplate is already filled in.',
    solution: `printf("Line one\\n");
printf("Line two\\n");
printf("Line three\\n");`,
    onPass: () => {
      sm_whatisC.complete(6)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step6')
    }
  });

  // Step 7 — Real-world snap (static, just reveal it)
  (()  => {  // was DOMContentLoaded — now runs immediately
    const step7 = document.getElementById('step-ch0-whatisC-7')
    if (step7) {
      step7.addEventListener('click', function onRead() {
        sm_whatisC.complete(7)
        Progress.saveStepComplete(CHAPTER_ID, 'ch0-whatisC', 'step7')
        Progress.saveTopicComplete(CHAPTER_ID, 'ch0-whatisC')
        _updateBadge('ch0-whatisC')
        _checkChapterComplete()
        if (window.onProgressUpdate) window.onProgressUpdate()
      }, { once: true })
    }
  })()

  /* — Assessment: What is C? — */

  // Assessment tab switching
  _initAssessmentTabs('ch0-whatisC')

  // MCQ
  QuizEngine.init({
    containerId: 'quiz-ch0-whatisC-mcq',
    questions: [
      {
        id: 'ch0-q1-1',
        type: 'mcq',
        question: 'C is a compiled language. What does "compiled" mean?',
        options: [
          'The code runs line by line as the user reads it',
          'Source code is translated into machine instructions before running',
          'The code is sent to a remote server to execute',
          'The browser reads the code as plain text'
        ],
        correct: ['Source code is translated into machine instructions before running'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'Think about what happens between writing the code and seeing the output.',
        feedback: {
          correct: 'Correct — a compiler converts your entire source file into machine code that the processor can execute directly.',
          incorrect: 'Compilation means the source code is translated into machine instructions <em>before</em> running — not during. This is what makes C programs so fast.'
        }
      },
      {
        id: 'ch0-q1-2',
        type: 'mcq',
        question: 'Which file extension do C source code files use?',
        options: ['.py', '.java', '.c', '.cpp'],
        correct: ['.c'],
        caseSensitive: true,
        orderMatters: false,
        hint: 'It matches the language name.',
        feedback: {
          correct: 'Right — C source files use the .c extension. The compiler reads .c files and produces executable programs.',
          incorrect: 'C source files use the <code>.c</code> extension. .py is Python, .java is Java, .cpp is C++.'
        }
      },
      {
        id: 'ch0-q1-3',
        type: 'mcq',
        question: 'printf() in the program you just ran — what does it do?',
        options: [
          'Prints text to the terminal / output',
          'Reads text from the user',
          'Stores a value in memory',
          'Ends the program'
        ],
        correct: ['Prints text to the terminal / output'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'The "f" in printf stands for "formatted".',
        feedback: {
          correct: 'Correct — printf() prints formatted text to standard output (the terminal or output panel).',
          incorrect: 'printf() prints to the output — "print formatted." scanf() reads input. printf() only sends text out.'
        }
      },
      {
        id: 'ch0-q1-4',
        type: 'mcq',
        question: 'What does \\n do inside a printf() string?',
        options: [
          'Prints the letter n',
          'Moves to the next line (newline)',
          'Ends the program',
          'Creates a tab indent'
        ],
        correct: ['Moves to the next line (newline)'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'n stands for "new".',
        feedback: {
          correct: 'Correct — \\n is the newline escape sequence. It moves the cursor to the next line in the output.',
          incorrect: '\\n is the <strong>newline</strong> character — it moves output to the next line. \\t is a tab.'
        }
      },
      {
        id: 'ch0-q1-5',
        type: 'mcq',
        question: 'C was created in:',
        options: ['1960', '1972', '1989', '2001'],
        correct: ['1972'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'It was created at Bell Labs as part of developing Unix.',
        feedback: {
          correct: 'Right — C was created by Dennis Ritchie at Bell Labs in 1972 while developing the Unix operating system.',
          incorrect: 'C was created in <strong>1972</strong> by Dennis Ritchie at Bell Labs to help build the Unix operating system.'
        }
      }
    ],
    onComplete: (score, total) => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-whatisC-mcq', score, total)
      if (window.onProgressUpdate) window.onProgressUpdate()
    }
  })

  // Identification
  QuizEngine.init({
    containerId: 'quiz-ch0-whatisC-identify',
    questions: [
      {
        id: 'ch0-id-1',
        type: 'identify',
        question: 'What is the name of the function used to print output in C?',
        correct: ['printf', 'printf()', 'printf function'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'It stands for "print formatted."',
        feedback: {
          correct: 'Correct — printf() is the standard output function in C from the stdio.h library.',
          incorrect: 'The output function is <code>printf()</code> — short for "print formatted." It comes from <code>&lt;stdio.h&gt;</code>.'
        }
      },
      {
        id: 'ch0-id-2',
        type: 'identify',
        question: 'What escape sequence creates a new line in printf() output?',
        correct: ['\\n', '\\\\n', 'newline', 'new line', 'backslash n'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'It starts with a backslash.',
        feedback: {
          correct: 'Correct — \\n is the newline escape sequence.',
          incorrect: 'The newline escape sequence is <code>\\n</code>. Without it, output from multiple printf() calls appears on the same line.'
        }
      },
      {
        id: 'ch0-id-3',
        type: 'identify',
        question: 'What is the name of the entry point function that every C program must have?',
        correct: ['main', 'main()', 'int main', 'int main()'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'Execution always starts here.',
        feedback: {
          correct: 'Correct — main() is the entry point. Every C program starts executing from the first line of main().',
          incorrect: 'Every C program must have a <code>main()</code> function — this is where execution always begins.'
        }
      }
    ],
    onComplete: (score, total) => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-whatisC-identify', score, total)
    }
  })

  // Debug challenge
  CCompiler.initBlock(document.getElementById('compiler-ch0-whatisC-debug'), {
    mode: 'debug',
    topicId: 'ch0-whatisC',
    question: 'This program has one bug — it will not compile. Find the error and fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Hello, C!"\\n)
    return 0;
}`,
    expected: 'Hello, C!',
    hint: 'Look at the printf() call. The \\n should be inside the double quotes, not outside. Also check for a missing semicolon.',
    hintTwo: 'Line 4 has two problems: the \\n is outside the closing quote, and the semicolon is missing after the closing parenthesis.',
    solution: `#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,
    onPass: () => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-whatisC-debug', 1, 1)
    }
  })

  /* -------------------------------------------------------
     TOPIC 2: HOW C WORKS — COMPILE CYCLE
     ------------------------------------------------------- */

  const sm_howCworks = StepManager.init('ch0-howCworks', 7, CHAPTER_ID)

  // Step 1 — Show a broken program intentionally
  CCompiler.initBlock(document.getElementById('compiler-ch0-howCworks-debug1'), {
    mode: 'debug',
    topicId: 'ch0-howCworks',
    question: 'This code has a missing semicolon. Run it — read what the compiler tells you.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("The compiler will catch this")
    return 0;
}`,
    expected: 'The compiler will catch this',
    hint: 'Every statement in C must end with a semicolon ;',
    solution: `#include <stdio.h>

int main() {
    printf("The compiler will catch this");
    return 0;
}`,
    onPass: () => {
      sm_howCworks.complete(1)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-howCworks', 'step1')
    }
  })

  // Step 2 — Instant question about the error
  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch0-howCworks',
    question: 'The compiler refused to run the program because of a missing semicolon. What is the benefit of this behavior?',
    options: [
      'It makes coding slower and more frustrating',
      'It catches mistakes before the program ever runs — errors are predictable',
      'It forces you to use a specific text editor',
      'It only affects programs that print output'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Exactly — catching errors at compile time means you know <em>before</em> the program runs that something is wrong. In languages that run line-by-line, errors only appear when that specific line executes.',
      incorrect: 'Compile-time errors are a feature, not a flaw. The compiler catches mistakes <em>before</em> the program runs, so errors are predictable and fixable — not random crashes during execution.'
    },
    onAnswer: () => {
      sm_howCworks.complete(2)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-howCworks', 'step2')
    }
  });

  // Step 3 — Add "Got it" button
  (()  => {  // was DOMContentLoaded — now runs immediately
    const step3 = document.getElementById('step-ch0-howCworks-3')
    if (step3) {
      const btn = document.createElement('button')
      btn.className = 'btn-continue'
      btn.textContent = 'Got it — continue →'
      btn.style.marginTop = 'var(--space-16)'
      btn.addEventListener('click', () => {
        sm_howCworks.complete(3)
        Progress.saveStepComplete(CHAPTER_ID, 'ch0-howCworks', 'step3')
        btn.remove()
      })
      step3.appendChild(btn)
    }
  })()

  // Step 4 — Fix a broken program (guided)
  CCompiler.initBlock(document.getElementById('compiler-ch0-howCworks-fix'), {
    mode: 'debug',
    topicId: 'ch0-howCworks',
    question: 'Three semicolons are missing. Find them — the compiler error will show you where.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Line one\\n")
    printf("Line two\\n")
    printf("Line three\\n")
    return 0;
}`,
    expected: 'Line one\nLine two\nLine three',
    hint: 'Every printf() call needs a semicolon at the end. There are three printf() calls — check each one.',
    solution: `#include <stdio.h>

int main() {
    printf("Line one\\n");
    printf("Line two\\n");
    printf("Line three\\n");
    return 0;
}`,
    onPass: () => {
      sm_howCworks.complete(4)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-howCworks', 'step4')
    }
  })

  // Step 5 — Fill
  CCompiler.initBlock(document.getElementById('compiler-ch0-howCworks-fill'), {
    mode: 'fill',
    topicId: 'ch0-howCworks',
    question: 'Fill in the missing pieces to create a valid C program.',
    includes: ['<stdio.h>'],
    starterCode: `[ ? ] <stdio.h>

int main() {
    printf("Compile cycle complete\\n")[ ? ]
    [ ? ] 0;
}`,
    expected: 'Compile cycle complete',
    hint: 'First blank: #include. Second blank: the statement terminator. Third blank: keyword that returns a value from main.',
    solution: `#include <stdio.h>

int main() {
    printf("Compile cycle complete\\n");
    return 0;
}`,
    onPass: () => {
      sm_howCworks.complete(5)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-howCworks', 'step5')
    }
  })

  // Step 6 — Build
  CCompiler.initBlock(document.getElementById('compiler-ch0-howCworks-build'), {
    mode: 'build',
    topicId: 'ch0-howCworks',
    question: 'Write a program that prints exactly: Compile. Run. Done. (on three separate lines)',
    includes: ['<stdio.h>'],
    starterCode: '',
    expected: 'Compile.\nRun.\nDone.',
    hint: 'Use three printf() calls. Each one needs a \\n inside the quotes and a ; after the closing parenthesis.',
    solution: `printf("Compile.\\n");
printf("Run.\\n");
printf("Done.\\n");`,
    onPass: () => {
      sm_howCworks.complete(6)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-howCworks', 'step6')
    }
  });

  // Step 7
  (()  => {  // was DOMContentLoaded — now runs immediately
    const step7 = document.getElementById('step-ch0-howCworks-7')
    if (step7) {
      step7.addEventListener('click', function onRead() {
        sm_howCworks.complete(7)
        Progress.saveStepComplete(CHAPTER_ID, 'ch0-howCworks', 'step7')
        Progress.saveTopicComplete(CHAPTER_ID, 'ch0-howCworks')
        _updateBadge('ch0-howCworks')
        _checkChapterComplete()
        if (window.onProgressUpdate) window.onProgressUpdate()
      }, { once: true })
    }
  })()

  /* — Assessment: How C Works — */

  _initAssessmentTabs('ch0-howCworks')

  QuizEngine.init({
    containerId: 'quiz-ch0-howCworks-mcq',
    questions: [
      {
        id: 'ch0-hcw-1',
        type: 'mcq',
        question: 'What does the compiler do when it finds an error in your code?',
        options: [
          'It runs the program and crashes at that line',
          'It skips the line with the error and continues',
          'It refuses to produce a runnable program and shows an error message',
          'It automatically fixes the error for you'
        ],
        correct: ['It refuses to produce a runnable program and shows an error message'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'The compiler either produces a working program or it doesn\'t — there\'s no partial success.',
        feedback: {
          correct: 'Correct — the compiler stops immediately. If there is a single error, no runnable program is produced.',
          incorrect: 'The compiler is strict — any error prevents a runnable program from being created. It shows you the error so you can fix it.'
        }
      },
      {
        id: 'ch0-hcw-2',
        type: 'mcq',
        question: 'What terminates most statements in C?',
        options: ['A period .', 'A colon :', 'A newline (Enter key)', 'A semicolon ;'],
        correct: ['A semicolon ;'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'It\'s a punctuation mark you may recognize from math.',
        feedback: {
          correct: 'Correct — a semicolon ; ends every statement in C. Missing one is the most common beginner error.',
          incorrect: 'Every statement in C must end with a <code>;</code> (semicolon). Forgetting this is the most common beginner mistake.'
        }
      },
      {
        id: 'ch0-hcw-3',
        type: 'mcq',
        question: 'Which of these is the correct order of the C development cycle?',
        options: [
          'Run → Write → Compile',
          'Compile → Write → Run',
          'Write → Compile → Run',
          'Write → Run → Compile'
        ],
        correct: ['Write → Compile → Run'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'You can only run something after it\'s been compiled.',
        feedback: {
          correct: 'Right — Write the code, Compile it into a program, then Run that program.',
          incorrect: 'The correct cycle is <strong>Write → Compile → Run</strong>. You must compile before you can run.'
        }
      },
      {
        id: 'ch0-hcw-4',
        type: 'mcq',
        question: 'A compiler error message tells you:',
        options: [
          'Nothing useful — errors are random',
          'The file name, line number, and what went wrong',
          'Only that something is wrong, not where',
          'The fix to apply automatically'
        ],
        correct: ['The file name, line number, and what went wrong'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'The error message is a specific guide, not a vague warning.',
        feedback: {
          correct: 'Exactly — compiler errors include the file, line number, and a description of the problem. Read them carefully.',
          incorrect: 'Compiler errors are specific — they include the file, line number, and a description. Learn to read them: they tell you exactly where to look.'
        }
      },
      {
        id: 'ch0-hcw-5',
        type: 'mcq',
        question: 'What should you do when the compiler shows an error on line 7?',
        options: [
          'Delete the whole file and start over',
          'Change random things until it works',
          'Go to line 7 and fix the specific problem described',
          'Ignore it and try to run anyway'
        ],
        correct: ['Go to line 7 and fix the specific problem described'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'The compiler told you exactly where the problem is.',
        feedback: {
          correct: 'Correct — read the error, go to the line it points to, fix the specific issue, compile again.',
          incorrect: 'Always go directly to the line the error specifies and fix that specific issue. The error message is a guide — use it.'
        }
      }
    ],
    onComplete: (score, total) => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-howCworks-mcq', score, total)
    }
  })

  // Debug challenge 2
  CCompiler.initBlock(document.getElementById('compiler-ch0-howCworks-debug2'), {
    mode: 'debug',
    topicId: 'ch0-howCworks',
    question: 'Find and fix the single bug in this program.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Write. Compile. Run.\\n");
    return
}`,
    expected: 'Write. Compile. Run.',
    hint: 'Look at the return statement. Something is missing after the word "return".',
    hintTwo: 'return needs a value (0 for success) and must end with a semicolon.',
    solution: `#include <stdio.h>

int main() {
    printf("Write. Compile. Run.\\n");
    return 0;
}`,
    onPass: () => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-howCworks-debug', 1, 1)
    }
  })

  /* -------------------------------------------------------
     TOPIC 3: BOILERPLATE — #include, main(), return 0
     ------------------------------------------------------- */

  const sm_boilerplate = StepManager.init('ch0-boilerplate', 7, CHAPTER_ID)

  // Step 1 — Explore boilerplate
  CCompiler.initBlock(document.getElementById('compiler-ch0-boilerplate-explore'), {
    mode: 'explore',
    topicId: 'ch0-boilerplate',
    question: 'Run this and observe the output. Each line of the program has a job — you\'ll see what they all do.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("#include loaded the stdio library\\n");
    printf("main() is where execution started\\n");
    printf("return 0 will signal success\\n");
    return 0;
}`,
    hint: 'Just click Run — there is nothing to change yet.',
    onPass: () => {
      sm_boilerplate.complete(1)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-boilerplate', 'step1')
    }
  })

  // Step 2 — Instant question
  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch0-boilerplate',
    question: 'If you removed the #include <stdio.h> line and then tried to call printf() — what would happen?',
    options: [
      'printf() would still work — it\'s built into C',
      'The compiler would warn you but still run',
      'The compiler would error — printf() comes from stdio.h, not built-in C',
      'The program would print nothing'
    ],
    correctIndex: 2,
    feedback: {
      correct: 'Exactly — printf() is not a built-in C keyword. It\'s a function provided by the stdio library. Without #include &lt;stdio.h&gt;, the compiler doesn\'t know what printf() is.',
      incorrect: 'printf() is NOT a core C keyword — it\'s a function from the stdio standard library. Without #include &lt;stdio.h&gt;, the compiler errors: "implicit declaration of function printf".'
    },
    onAnswer: () => {
      sm_boilerplate.complete(2)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-boilerplate', 'step2')
    }
  });

  // Step 3 button
  (()  => {  // was DOMContentLoaded — now runs immediately
    const step3 = document.getElementById('step-ch0-boilerplate-3')
    if (step3) {
      const btn = document.createElement('button')
      btn.className = 'btn-continue'
      btn.textContent = 'Understood — continue →'
      btn.style.marginTop = 'var(--space-16)'
      btn.addEventListener('click', () => {
        sm_boilerplate.complete(3)
        Progress.saveStepComplete(CHAPTER_ID, 'ch0-boilerplate', 'step3')
        btn.remove()
      })
      step3.appendChild(btn)
    }
  })()

  // Step 4 — Modify: remove #include and see the error
  CCompiler.initBlock(document.getElementById('compiler-ch0-boilerplate-modify'), {
    mode: 'debug',
    topicId: 'ch0-boilerplate',
    question: 'The #include line is missing. Add it back — then compile successfully.',
    includes: [],
    starterCode: `int main() {
    printf("stdio.h was missing!\\n");
    return 0;
}`,
    expected: 'stdio.h was missing!',
    hint: 'Add #include <stdio.h> as the very first line of the file.',
    solution: `#include <stdio.h>

int main() {
    printf("stdio.h was missing!\\n");
    return 0;
}`,
    onPass: () => {
      sm_boilerplate.complete(4)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-boilerplate', 'step4')
    }
  })

  // Step 5 — Fill
  CCompiler.initBlock(document.getElementById('compiler-ch0-boilerplate-fill'), {
    mode: 'fill',
    topicId: 'ch0-boilerplate',
    question: 'Complete the boilerplate skeleton.',
    includes: ['<stdio.h>'],
    starterCode: `[ ? ] <stdio.h>

[ ? ] main() {
    printf("Boilerplate complete\\n");
    return [ ? ];
}`,
    expected: 'Boilerplate complete',
    hint: 'First blank: preprocessor directive. Second blank: return type of main. Third blank: the value that signals success.',
    solution: `#include <stdio.h>

int main() {
    printf("Boilerplate complete\\n");
    return 0;
}`,
    onPass: () => {
      sm_boilerplate.complete(5)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-boilerplate', 'step5')
    }
  })

  // Step 6 — Build from scratch
  CCompiler.initBlock(document.getElementById('compiler-ch0-boilerplate-build'), {
    mode: 'build',
    topicId: 'ch0-boilerplate',
    question: 'Write the complete boilerplate from memory and print: I know C boilerplate',
    includes: ['<stdio.h>'],
    starterCode: '',
    expected: 'I know C boilerplate',
    hint: 'You need: #include <stdio.h>, int main(), braces, printf(), and return 0;',
    solution: `printf("I know C boilerplate\\n");`,
    onPass: () => {
      sm_boilerplate.complete(6)
      Progress.saveStepComplete(CHAPTER_ID, 'ch0-boilerplate', 'step6')
    }
  });

  // Step 7
  (()  => {  // was DOMContentLoaded — now runs immediately
    const step7 = document.getElementById('step-ch0-boilerplate-7')
    if (step7) {
      step7.addEventListener('click', function onRead() {
        sm_boilerplate.complete(7)
        Progress.saveStepComplete(CHAPTER_ID, 'ch0-boilerplate', 'step7')
        Progress.saveTopicComplete(CHAPTER_ID, 'ch0-boilerplate')
        _updateBadge('ch0-boilerplate')
        _checkChapterComplete()
        if (window.onProgressUpdate) window.onProgressUpdate()
      }, { once: true })
    }
  })()

  /* — Assessment: Boilerplate — */

  _initAssessmentTabs('ch0-boilerplate')

  QuizEngine.init({
    containerId: 'quiz-ch0-boilerplate-mcq',
    questions: [
      {
        id: 'ch0-bp-1',
        type: 'mcq',
        question: 'What does #include <stdio.h> do?',
        options: [
          'It imports the Python standard library',
          'It makes the stdio functions (like printf, scanf) available',
          'It starts the main function',
          'It prints "stdio" to the output'
        ],
        correct: ['It makes the stdio functions (like printf, scanf) available'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'stdio stands for Standard Input/Output.',
        feedback: {
          correct: 'Correct — #include <stdio.h> pastes the stdio header into your file, making printf(), scanf(), and other I/O functions available.',
          incorrect: '#include &lt;stdio.h&gt; makes Standard I/O functions like printf() and scanf() available. Without it, the compiler doesn\'t know what printf() is.'
        }
      },
      {
        id: 'ch0-bp-2',
        type: 'mcq',
        question: 'Why must every C program have a main() function?',
        options: [
          'It\'s optional — any function name works',
          'It\'s the entry point — execution always starts here',
          'It must be named main to print output',
          'The compiler requires it for historical reasons only'
        ],
        correct: ['It\'s the entry point — execution always starts here'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'Think about where the program "starts."',
        feedback: {
          correct: 'Correct — main() is the entry point. The operating system calls main() to start your program.',
          incorrect: 'main() is required because it is the <strong>entry point</strong> — it\'s where the OS starts executing your program. Without it, the linker won\'t know where to begin.'
        }
      },
      {
        id: 'ch0-bp-3',
        type: 'mcq',
        question: 'What does "return 0;" at the end of main() communicate?',
        options: [
          'It prints the number 0',
          'It ends the file',
          'It tells the OS the program finished successfully',
          'It frees all memory'
        ],
        correct: ['It tells the OS the program finished successfully'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'By convention, 0 means success and non-zero means error.',
        feedback: {
          correct: 'Correct — returning 0 signals success to the operating system. Non-zero return values indicate errors.',
          incorrect: 'return 0 tells the operating system that the program completed <strong>successfully</strong>. Non-zero values signal errors.'
        }
      },
      {
        id: 'ch0-bp-4',
        type: 'mcq',
        question: 'The # at the start of #include is:',
        options: [
          'A comment symbol (like Python)',
          'A preprocessor directive — processed before compilation',
          'A variable declaration',
          'A function call'
        ],
        correct: ['A preprocessor directive — processed before compilation'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'The # starts a line that the preprocessor handles before the compiler even sees it.',
        feedback: {
          correct: 'Correct — # marks preprocessor directives. They run before compilation and can include files (#include), define constants (#define), or conditionally compile code (#ifdef).',
          incorrect: 'In C, # marks a <strong>preprocessor directive</strong> — it\'s processed before compilation. It is NOT a comment like in Python.'
        }
      },
      {
        id: 'ch0-bp-5',
        type: 'mcq',
        question: 'What is the return type of main() in standard C?',
        options: ['void', 'string', 'int', 'char'],
        correct: ['int'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'It matches the type of value returned by return 0.',
        feedback: {
          correct: 'Correct — main() returns int because it returns an integer exit code (0 for success, non-zero for error).',
          incorrect: 'main() returns <code>int</code> — an integer exit code. That\'s why "return 0;" returns the integer 0.'
        }
      }
    ],
    onComplete: (score, total) => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-boilerplate-mcq', score, total)
    }
  })

  QuizEngine.init({
    containerId: 'quiz-ch0-boilerplate-identify',
    questions: [
      {
        id: 'ch0-bp-id-1',
        type: 'identify',
        question: 'What keyword declares the return type of main() in C?',
        correct: ['int', 'int main'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'It\'s the same keyword used to declare integer variables.',
        feedback: {
          correct: 'Correct — int declares that main() returns an integer value.',
          incorrect: 'main() is declared as <code>int main()</code> — the return type is <code>int</code>.'
        }
      },
      {
        id: 'ch0-bp-id-2',
        type: 'identify',
        question: 'What character marks the start of a preprocessor directive in C?',
        correct: ['#', 'hash', 'pound', 'hashtag', 'number sign'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'It\'s a symbol on most keyboards above the 3 key.',
        feedback: {
          correct: 'Correct — # marks preprocessor directives like #include and #define.',
          incorrect: 'The # (hash/pound) symbol starts all preprocessor directives in C.'
        }
      },
      {
        id: 'ch0-bp-id-3',
        type: 'identify',
        question: 'What does stdio stand for in stdio.h?',
        correct: ['standard input output', 'standard i/o', 'standard io', 'standard input/output'],
        caseSensitive: false,
        orderMatters: false,
        hint: 'Think of the two main things a program does with data.',
        feedback: {
          correct: 'Correct — stdio = Standard Input/Output. It provides printf() for output and scanf() for input.',
          incorrect: 'stdio stands for <strong>Standard Input/Output</strong> — the library that provides printf(), scanf(), and file functions.'
        }
      }
    ],
    onComplete: (score, total) => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-boilerplate-identify', score, total)
    }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch0-boilerplate-debug'), {
    mode: 'debug',
    topicId: 'ch0-boilerplate',
    question: 'Something is wrong with this boilerplate. Find it and fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Boilerplate fixed\\n");
    return 0
}`,
    expected: 'Boilerplate fixed',
    hint: 'Look at the return statement — what is every statement supposed to end with?',
    hintTwo: 'return 0 is missing a semicolon. Every statement in C must end with ;',
    solution: `#include <stdio.h>

int main() {
    printf("Boilerplate fixed\\n");
    return 0;
}`,
    onPass: () => {
      Progress.saveQuizScore(CHAPTER_ID, 'ch0-boilerplate-debug', 1, 1)
    }
  });

  /* -------------------------------------------------------
     SETUP GUIDE — Tab switching (static content, no JS quiz)
     ------------------------------------------------------- */

  (()  => {  // was DOMContentLoaded — now runs immediately
    const tabs = document.querySelectorAll('.setup-guide__tab')
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panel = tab.dataset.panel
        const guide = tab.closest('.setup-guide')
        if (!guide) return
        guide.querySelectorAll('.setup-guide__tab').forEach(t => t.classList.remove('setup-guide__tab--active'))
        guide.querySelectorAll('.setup-guide__panel').forEach(p => p.classList.remove('setup-guide__panel--active'))
        tab.classList.add('setup-guide__tab--active')
        guide.querySelector(`#panel-${panel}`)?.classList.add('setup-guide__panel--active')
      })
    })

    // Copy to clipboard for cmd blocks
    document.querySelectorAll('.cmd-block__copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.previousElementSibling?.textContent || btn.parentElement.textContent.replace('Copy', '').trim()
        navigator.clipboard.writeText(cmd).then(() => {
          btn.textContent = 'Copied!'
          setTimeout(() => btn.textContent = 'Copy', 1500)
        })
      })
    })

    // Next chapter button
    const nextBtn = document.getElementById('ch0-next-btn')
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (window.loadChapter) window.loadChapter('ch1')
      })
    }
  })()

  /* -------------------------------------------------------
     INTERNAL HELPERS
     ------------------------------------------------------- */

  function _updateBadge(topicId) {
    const badge = document.getElementById(`badge-${topicId}`)
    if (badge) badge.classList.add('topic__status-badge--visible')
  }

  function _checkChapterComplete() {
    const topics = ['ch0-whatisC', 'ch0-howCworks', 'ch0-boilerplate']
    const allDone = topics.every(t => Progress.isTopicComplete(CHAPTER_ID, t))
    if (allDone) {
      Progress.saveChapterComplete(CHAPTER_ID)
      const banner = document.getElementById('ch0-chapter-complete')
      if (banner) banner.style.display = 'block'
    }
  }

  function _initAssessmentTabs(topicId) {
    (()  => {  // was DOMContentLoaded — now runs immediately
      const block = document.querySelector(`[data-topic="${topicId}"].assessment-block`)
        || document.querySelector(`.assessment-block[data-topic="${topicId}"]`)
      if (!block) return

      block.querySelectorAll('.assessment-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const tabName = tab.dataset.tab
          block.querySelectorAll('.assessment-tab').forEach(t => t.classList.remove('assessment-tab--active'))
          block.querySelectorAll('.assessment-section').forEach(s => s.classList.remove('assessment-section--active'))
          tab.classList.add('assessment-tab--active')
          const section = document.getElementById(`tab-${tabName}-${topicId}`)
          if (section) section.classList.add('assessment-section--active')
        })
      })
    })()
  }

})()
