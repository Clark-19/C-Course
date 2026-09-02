/* =========================================================
   C LEARNING PLATFORM — chapters/ch1-variables-constants/ch1.js
   Chapter 1: Variables & Constants — all interactive logic
   8 topics · Every compiler block · Every quiz · Progress saving
   ========================================================= */

;(function () {
  'use strict'

  const CHAPTER_ID = 'ch1'

  /* -------------------------------------------------------
     SHARED HELPERS
     ------------------------------------------------------- */

  function _addContinueBtn(stepElId, label, onConfirm) {
    const el = document.getElementById(stepElId)
    if (!el) return
    const existing = el.querySelector('.btn-continue')
    if (existing) {
      // Button already in HTML — just attach the handler
      existing.addEventListener('click', () => { onConfirm(); existing.remove() })
      return
    }
    const btn = document.createElement('button')
    btn.className = 'btn-continue'
    btn.textContent = label || 'Got it — continue →'
    btn.addEventListener('click', () => { onConfirm(); btn.remove() })
    el.appendChild(btn)
  }

  function _initTabs(topicId) {
    const block = document.querySelector(`.assessment-block[data-topic="${topicId}"]`)
    if (!block) return
    block.querySelectorAll('.assessment-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const name = tab.dataset.tab
        block.querySelectorAll('.assessment-tab').forEach(t => t.classList.remove('assessment-tab--active'))
        block.querySelectorAll('.assessment-section').forEach(s => s.classList.remove('assessment-section--active'))
        tab.classList.add('assessment-tab--active')
        const sec = document.getElementById(`tab-${name}-${topicId}`)
        if (sec) sec.classList.add('assessment-section--active')
      })
    })
  }

  function _markTopicDone(topicId) {
    const badge = document.getElementById(`badge-${topicId}`)
    if (badge) badge.classList.add('topic__status-badge--visible')
    Progress.saveTopicComplete(CHAPTER_ID, topicId)
    _checkChapterComplete()
    if (window.onProgressUpdate) window.onProgressUpdate()
  }

  function _checkChapterComplete() {
    const topics = ['ch1-variable','ch1-naming','ch1-int','ch1-float',
                    'ch1-char','ch1-const','ch1-define','ch1-naming2']
    if (topics.every(t => Progress.isTopicComplete(CHAPTER_ID, t))) {
      Progress.saveChapterComplete(CHAPTER_ID)
      const banner = document.getElementById('ch1-chapter-complete')
      if (banner) banner.style.display = 'block'
    }
  }

  /* -------------------------------------------------------
     TOPIC 1 — WHAT IS A VARIABLE?
     ------------------------------------------------------- */

  const sm1 = StepManager.init('ch1-variable', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-variable-explore'), {
    mode: 'explore',
    topicId: 'ch1-variable',
    question: 'Compile and run this — a variable stores a number. See what prints.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int score = 95;
    int lives = 3;
    printf("Score: %d\\n", score);
    printf("Lives: %d\\n", lives);
    return 0;
}`,
    hint: 'Click ▶ Run. Notice that %d prints the value stored in the variable.',
    onPass: () => { sm1.complete(1); Progress.saveStepComplete(CHAPTER_ID, 'ch1-variable', 'step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-variable',
    question: 'Line 4 says <code>int score = 95</code>. What does the word <code>int</code> tell the compiler?',
    options: [
      'The name of the variable',
      'The type of data it stores — a whole number',
      'The value to print',
      'It starts a loop'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — <code>int</code> is the <strong>type</strong>. It tells the compiler this variable holds a whole number (integer). The name is <code>score</code> and the value is <code>95</code>.',
      incorrect: '<code>int</code> is the <strong>data type</strong> — it specifies what kind of value the variable holds. The name comes after it: <code>int score</code> = "a variable named score that holds an integer."'
    },
    onAnswer: () => { sm1.complete(2); Progress.saveStepComplete(CHAPTER_ID, 'ch1-variable', 'step2') }
  })

  _addContinueBtn('step-ch1-variable-3', 'Got it — continue →', () => {
    sm1.complete(3); Progress.saveStepComplete(CHAPTER_ID, 'ch1-variable', 'step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-variable-modify'), {
    mode: 'modify',
    topicId: 'ch1-variable',
    question: 'Change <code>score</code> to 100 and add a third int variable called <code>level</code> with value 5. Print all three.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int score = 95;
    int lives = 3;
    printf("Score: %d\\n", score);
    printf("Lives: %d\\n", lives);
    return 0;
}`,
    checkFn: (out) => out.includes('100') && out.includes('5'),
    hint: 'Add <code>int level = 5;</code> below the other declarations. Then add a printf for it.',
    solution: `#include <stdio.h>

int main() {
    int score = 100;
    int lives = 3;
    int level = 5;
    printf("Score: %d\\n", score);
    printf("Lives: %d\\n", lives);
    printf("Level: %d\\n", level);
    return 0;
}`,
    onPass: () => { sm1.complete(4); Progress.saveStepComplete(CHAPTER_ID, 'ch1-variable', 'step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-variable-fill'), {
    mode: 'fill',
    topicId: 'ch1-variable',
    question: 'Fill in the blanks to declare an int variable named <code>age</code> with value 18 and print it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] age = [ ? ];
    printf("Age: %d\\n", [ ? ]);
    return 0;
}`,
    expected: 'Age: 18',
    hint: 'Blank 1: the data type for whole numbers. Blank 2: the value. Blank 3: the variable name in the printf.',
    solution: `#include <stdio.h>

int main() {
    int age = 18;
    printf("Age: %d\\n", age);
    return 0;
}`,
    onPass: () => { sm1.complete(5); Progress.saveStepComplete(CHAPTER_ID, 'ch1-variable', 'step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-variable-build'), {
    mode: 'build',
    topicId: 'ch1-variable',
    question: 'Declare two int variables: <code>width = 800</code> and <code>height = 600</code>. Print both on separate lines.',
    includes: ['<stdio.h>'],
    starterCode: '',
    expected: '800\n600',
    hint: 'Declare each with <code>int name = value;</code> then use <code>printf("%d\\n", name);</code> for each.',
    solution: `int width = 800;
int height = 600;
printf("%d\\n", width);
printf("%d\\n", height);`,
    onPass: () => { sm1.complete(6); Progress.saveStepComplete(CHAPTER_ID, 'ch1-variable', 'step6') }
  })

  document.getElementById('step-ch1-variable-7')?.addEventListener('click', function () {
    sm1.complete(7); Progress.saveStepComplete(CHAPTER_ID, 'ch1-variable', 'step7')
    _markTopicDone('ch1-variable')
  }, { once: true })

  _initTabs('ch1-variable')

  QuizEngine.init({
    containerId: 'quiz-ch1-variable-predict',
    questions: [
      {
        id: 'ch1-var-p1', type: 'predict',
        question: 'What does this program print?',
        code: 'int x = 10;\nint y = 20;\nprintf("%d\\n", x + y);',
        correct: ['30'],
        caseSensitive: true, orderMatters: true,
        hint: 'x + y = 10 + 20.',
        feedback: { correct: 'Correct — 10 + 20 = 30.', incorrect: 'x is 10, y is 20. x + y = 30.' }
      },
      {
        id: 'ch1-var-p2', type: 'predict',
        question: 'What does this program print?',
        code: 'int count = 5;\ncount = count + 1;\nprintf("%d\\n", count);',
        correct: ['6'],
        caseSensitive: true, orderMatters: true,
        hint: 'count starts at 5, then count + 1 = 6 is assigned back to count.',
        feedback: { correct: 'Correct — count was 5, then assigned 5+1=6.', incorrect: 'Line 2 reassigns count: count = count + 1 = 5 + 1 = 6.' }
      },
      {
        id: 'ch1-var-p3', type: 'predict',
        question: 'What does this program print?',
        code: 'int a = 100;\nint b = a;\na = 0;\nprintf("%d %d\\n", a, b);',
        correct: ['0 100'],
        caseSensitive: true, orderMatters: true,
        hint: 'b was assigned a copy of a\'s value. Changing a later does not affect b.',
        feedback: { correct: 'Correct — b got a copy of 100. Changing a later does not change b.', incorrect: 'b = a copies the value 100. When a is later changed to 0, b is unaffected. Output: 0 100.' }
      }
    ],
    onComplete: (s, t) => Progress.saveQuizScore(CHAPTER_ID, 'ch1-variable-predict', s, t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-variable-mcq',
    questions: [
      {
        id: 'ch1-var-m1', type: 'mcq',
        question: 'Which of these correctly declares an integer variable named <code>count</code> with value 0?',
        options: ['count int = 0;', 'int = count 0;', 'int count = 0;', 'integer count = 0;'],
        correct: ['int count = 0;'],
        caseSensitive: true, orderMatters: false,
        hint: 'The type comes first, then the name, then the = and value.',
        feedback: { correct: 'Correct — type, then name, then = value, then semicolon.', incorrect: 'The correct form is: <code>type name = value;</code> → <code>int count = 0;</code>' }
      },
      {
        id: 'ch1-var-m2', type: 'mcq',
        question: 'What format specifier prints an int with printf()?',
        options: ['%f', '%c', '%d', '%s'],
        correct: ['%d'],
        caseSensitive: true, orderMatters: false,
        hint: 'd stands for "decimal integer."',
        feedback: { correct: 'Right — %d is for integers. %f is float, %c is char, %s is string.', incorrect: '%d is the format specifier for integers. Remember: d for decimal/digit.' }
      },
      {
        id: 'ch1-var-m3', type: 'mcq',
        question: 'A variable must be ______ before it can be used.',
        options: ['printed', 'declared', 'incremented', 'returned'],
        correct: ['declared'],
        caseSensitive: false, orderMatters: false,
        hint: 'You must tell the compiler the variable exists and what type it is.',
        feedback: { correct: 'Correct — you must declare a variable (give it a type and name) before using it.', incorrect: 'Variables must be declared first. The compiler does not know about a variable until it sees a declaration.' }
      },
      {
        id: 'ch1-var-m4', type: 'mcq',
        question: 'What does <code>int score = 100;</code> do?',
        options: [
          'Prints 100',
          'Creates a variable named score that stores the integer 100',
          'Creates a function called score',
          'Defines a constant 100'
        ],
        correct: ['Creates a variable named score that stores the integer 100'],
        caseSensitive: false, orderMatters: false,
        hint: 'This is a declaration and initialisation in one line.',
        feedback: { correct: 'Correct — this declares an int variable called score and initialises it to 100.', incorrect: 'int score = 100 declares a variable named score of type int with value 100. It does not print anything.' }
      },
      {
        id: 'ch1-var-m5', type: 'mcq',
        question: 'Which is true about variables in C?',
        options: [
          'Variables automatically initialise to 0',
          'A variable can change its value after declaration',
          'Variables can only store text',
          'You can use a variable before declaring it'
        ],
        correct: ['A variable can change its value after declaration'],
        caseSensitive: false, orderMatters: false,
        hint: 'The word "variable" comes from "varies" — the value can change.',
        feedback: { correct: 'Correct — variables can be reassigned. That is what makes them "variable."', incorrect: 'Variables CAN change value — that is their purpose. They are NOT initialised automatically in C, and must be declared before use.' }
      }
    ],
    onComplete: (s, t) => Progress.saveQuizScore(CHAPTER_ID, 'ch1-variable-mcq', s, t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-variable-identify',
    questions: [
      {
        id: 'ch1-var-id1', type: 'identify',
        question: 'What is the keyword used to declare a whole-number variable in C?',
        correct: ['int'],
        caseSensitive: true, orderMatters: false,
        hint: 'Short for "integer."',
        feedback: { correct: 'Correct — int declares integer variables.', incorrect: 'The keyword is int — short for integer. It declares whole-number variables.' }
      },
      {
        id: 'ch1-var-id2', type: 'identify',
        question: 'What format specifier is used to print an integer with printf()?',
        correct: ['%d', '%i'],
        caseSensitive: true, orderMatters: false,
        hint: 'It starts with % and uses the letter d.',
        feedback: { correct: 'Correct — %d (or %i) prints integers.', incorrect: 'The format specifier for integers is %d. Always write it inside the printf() string.' }
      }
    ],
    onComplete: (s, t) => Progress.saveQuizScore(CHAPTER_ID, 'ch1-variable-identify', s, t)
  })

  ;[
    {
      id: 'p1', q: 'Declare an int variable called <code>temperature</code> with value 37 and print it.',
      expected: '37', hint: 'int temperature = 37; then printf("%d\\n", temperature);',
      solution: `int temperature = 37;\nprintf("%d\\n", temperature);`
    },
    {
      id: 'p2', q: 'Declare two int variables: <code>x = 10</code> and <code>y = 20</code>. Print their sum.',
      expected: '30', hint: 'Use printf("%d\\n", x + y);',
      solution: `int x = 10;\nint y = 20;\nprintf("%d\\n", x + y);`
    },
    {
      id: 'p3', q: 'Declare <code>int price = 500</code>. Subtract 50 from it and print the new value.',
      expected: '450', hint: 'After declaring, write: price = price - 50;',
      solution: `int price = 500;\nprice = price - 50;\nprintf("%d\\n", price);`
    },
    {
      id: 'p4', q: 'Declare three int variables on one line: a, b, c — all set to 1. Print their sum.',
      expected: '3', hint: 'int a = 1, b = 1, c = 1; then printf("%d\\n", a + b + c);',
      solution: `int a = 1, b = 1, c = 1;\nprintf("%d\\n", a + b + c);`
    },
    {
      id: 'p5', q: 'Declare <code>int n = 7</code>. Reassign it to n * n (49). Print it.',
      expected: '49', hint: 'n = n * n; then printf.',
      solution: `int n = 7;\nn = n * n;\nprintf("%d\\n", n);`
    }
  ].forEach((task) => {
    const container = document.createElement('div')
    container.style.marginBottom = 'var(--space-12)'
    document.getElementById('practice-ch1-variable')?.appendChild(container)
    CCompiler.initBlock(container, {
      mode: 'build', topicId: 'ch1-variable',
      question: task.q, includes: ['<stdio.h>'], starterCode: '',
      expected: task.expected, hint: task.hint, solution: task.solution
    })
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-variable-debug'), {
    mode: 'debug', topicId: 'ch1-variable',
    question: 'This program has one bug. Find it and fix it so it compiles and prints: Score: 99',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int score = 99
    printf("Score: %d\\n", score);
    return 0;
}`,
    expected: 'Score: 99',
    hint: 'Look at the variable declaration on line 4 — what is missing at the end?',
    hintTwo: 'Every statement in C must end with a semicolon ;. Line 4 is missing one.',
    solution: `#include <stdio.h>

int main() {
    int score = 99;
    printf("Score: %d\\n", score);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID, 'ch1-variable-debug', 1, 1)
  })

  /* -------------------------------------------------------
     TOPIC 2 — VARIABLE NAMING RULES
     ------------------------------------------------------- */

  const sm2 = StepManager.init('ch1-naming', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming-explore'), {
    mode: 'explore', topicId: 'ch1-naming',
    question: 'Run this — these are all valid variable names. See which naming patterns work.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int player_health = 100;
    int _temp = 37;
    int score1 = 500;
    int totalCount = 0;
    printf("%d %d %d %d\\n", player_health, _temp, score1, totalCount);
    return 0;
}`,
    hint: 'Click Run. All four names follow the naming rules.',
    onPass: () => { sm2.complete(1); Progress.saveStepComplete(CHAPTER_ID, 'ch1-naming', 'step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-naming',
    question: 'Which of these would be an <strong>invalid</strong> variable name in C?',
    options: ['_score', 'player1', '2ndPlace', 'total_count'],
    correctIndex: 2,
    feedback: {
      correct: 'Correct — <code>2ndPlace</code> starts with a digit. C identifiers cannot start with a number.',
      incorrect: 'The invalid name is <code>2ndPlace</code> — it starts with a digit, which C does not allow. Valid names start with a letter or underscore.'
    },
    onAnswer: () => { sm2.complete(2); Progress.saveStepComplete(CHAPTER_ID, 'ch1-naming', 'step2') }
  })

  _addContinueBtn('step-ch1-naming-3', 'Got it — continue →', () => {
    sm2.complete(3); Progress.saveStepComplete(CHAPTER_ID, 'ch1-naming', 'step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming-modify'), {
    mode: 'debug', topicId: 'ch1-naming',
    question: 'This has an invalid variable name. Fix the name so it compiles.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int 1stScore = 100;
    printf("Score: %d\\n", 1stScore);
    return 0;
}`,
    expected: 'Score: 100',
    hint: 'Variable names cannot start with a digit. Rename 1stScore to something valid.',
    solution: `#include <stdio.h>

int main() {
    int first_score = 100;
    printf("Score: %d\\n", first_score);
    return 0;
}`,
    onPass: () => { sm2.complete(4); Progress.saveStepComplete(CHAPTER_ID, 'ch1-naming', 'step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming-fill'), {
    mode: 'fill', topicId: 'ch1-naming',
    question: 'Fill in valid variable names for each declaration.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int [ ? ] = 10;
    int [ ? ] = 20;
    printf("%d %d\\n", [ ? ], [ ? ]);
    return 0;
}`,
    checkFn: (out) => { const parts = out.trim().split(' '); return parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) },
    hint: 'Choose any two valid names — they must start with a letter or underscore, no spaces.',
    solution: `#include <stdio.h>

int main() {
    int first = 10;
    int second = 20;
    printf("%d %d\\n", first, second);
    return 0;
}`,
    onPass: () => { sm2.complete(5); Progress.saveStepComplete(CHAPTER_ID, 'ch1-naming', 'step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming-build'), {
    mode: 'build', topicId: 'ch1-naming',
    question: 'Declare three int variables with valid descriptive names: one for a student\'s grade, one for their age, and one for their score. Assign any values and print all three.',
    includes: ['<stdio.h>'], starterCode: '',
    checkFn: (out) => out.trim().split('\n').filter(l => l.trim()).length >= 3,
    hint: 'Use names like student_grade, student_age, student_score. Avoid single letters.',
    solution: `int student_grade = 90;\nint student_age = 20;\nint student_score = 850;\nprintf("%d\\n%d\\n%d\\n", student_grade, student_age, student_score);`,
    onPass: () => { sm2.complete(6); Progress.saveStepComplete(CHAPTER_ID, 'ch1-naming', 'step6') }
  })

  document.getElementById('step-ch1-naming-7')?.addEventListener('click', function () {
    sm2.complete(7); Progress.saveStepComplete(CHAPTER_ID, 'ch1-naming', 'step7')
    _markTopicDone('ch1-naming')
  }, { once: true })

  _initTabs('ch1-naming')

  QuizEngine.init({
    containerId: 'quiz-ch1-naming-mcq',
    questions: [
      { id:'ch1-nm-1', type:'mcq', question:'Which name is valid in C?', options:['my score','2count','_result','int'], correct:['_result'], caseSensitive:true, orderMatters:false, hint:'Only one follows all the rules.', feedback:{ correct:'Correct — _result starts with underscore, has no spaces, and is not a keyword.', incorrect:'_result is the only valid one: starts with underscore, no spaces, not a keyword. "my score" has a space, "2count" starts with a digit, "int" is a keyword.' } },
      { id:'ch1-nm-2', type:'mcq', question:'C variable names are case-sensitive. Which two names are <strong>different</strong> variables?', options:['score and score','Score and score','SCORE and SCORE','Score and Score'], correct:['Score and score'], caseSensitive:true, orderMatters:false, hint:'Capital S vs lowercase s.', feedback:{ correct:'Correct — Score and score are different identifiers because C is case-sensitive.', incorrect:'Score and score are different — the capital S makes them distinct identifiers.' } },
      { id:'ch1-nm-3', type:'mcq', question:'Which of these is a C keyword that cannot be used as a variable name?', options:['count','result','return','value'], correct:['return'], caseSensitive:true, orderMatters:false, hint:'This word means "send back a value from a function."', feedback:{ correct:'Correct — return is a reserved C keyword.', incorrect:'return is a reserved keyword — it has a special meaning in C and cannot be used as an identifier.' } },
      { id:'ch1-nm-4', type:'mcq', question:'What is the maximum recommended length for a variable name?', options:['3 chars','8 chars','8–15 chars','100 chars'], correct:['8–15 chars'], caseSensitive:false, orderMatters:false, hint:'Not too short, not too long.', feedback:{ correct:'Right — 8 to 15 characters is the recommended range for readable identifier names.', incorrect:'Convention recommends 8–15 characters — long enough to be descriptive, short enough to type easily.' } },
      { id:'ch1-nm-5', type:'mcq', question:'Can a variable name contain a hyphen (-)?', options:['Yes','Only at the start','Only in constants','No — hyphens are not allowed'], correct:['No — hyphens are not allowed'], caseSensitive:false, orderMatters:false, hint:'Think about what - means in C.', feedback:{ correct:'Correct — the hyphen (-) is the subtraction operator. C would read first-name as first minus name.', incorrect:'No — hyphens are the subtraction operator in C. Use underscores instead: first_name.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-naming-mcq',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-naming-identify',
    questions: [
      { id:'ch1-nm-id1', type:'identify', question:'What character can be used in variable names instead of a space?', correct:['_','underscore'], caseSensitive:false, orderMatters:false, hint:'It looks like a dash at the bottom of the text.', feedback:{ correct:'Correct — the underscore _ is used to separate words in variable names.', incorrect:'Use the underscore _. Example: player_score instead of "player score".' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-naming-identify',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming-debug'), {
    mode: 'debug', topicId: 'ch1-naming',
    question: 'This program uses a keyword as a variable name. Fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int float = 3;
    printf("Value: %d\\n", float);
    return 0;
}`,
    expected: 'Value: 3',
    hint: 'float is a C keyword — it is a data type. Choose a different name.',
    hintTwo: 'Rename "float" to something like "amount" or "value" and update both occurrences.',
    solution: `#include <stdio.h>

int main() {
    int value = 3;
    printf("Value: %d\\n", value);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch1-naming-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 3 — int VARIABLES
     ------------------------------------------------------- */

  const sm3 = StepManager.init('ch1-int', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-int-explore'), {
    mode: 'explore', topicId: 'ch1-int',
    question: 'Run this — int variables do arithmetic. Watch what happens with the results.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int a = 15;
    int b = 4;
    printf("a + b = %d\\n", a + b);
    printf("a - b = %d\\n", a - b);
    printf("a * b = %d\\n", a * b);
    printf("a / b = %d\\n", a / b);  /* integer division! */
    return 0;
}`,
    hint: 'Notice 15 / 4 does not give 3.75. That is integer division — the decimal is dropped.',
    onPass: () => { sm3.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch1-int','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-int',
    question: 'The program printed <code>a / b = 3</code> even though 15 ÷ 4 = 3.75. Why?',
    options: [
      'C made a calculation error',
      'int division truncates — it drops everything after the decimal',
      '%d rounds to the nearest integer',
      'b should be larger than a'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — int division always truncates toward zero. 15 / 4 = 3 in integer arithmetic. The .75 is discarded.',
      incorrect: 'When both operands are int, C performs integer division — it drops the fractional part. 15 / 4 = 3 (not 3.75). This is a critical distinction you will use constantly.'
    },
    onAnswer: () => { sm3.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch1-int','step2') }
  })

  _addContinueBtn('step-ch1-int-3','Got it — continue →', () => {
    sm3.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch1-int','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-int-modify'), {
    mode: 'modify', topicId: 'ch1-int',
    question: 'Change <code>a</code> to 100 and <code>b</code> to 7. Predict the division result before running.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int a = 15;
    int b = 4;
    printf("a / b = %d\\n", a / b);
    return 0;
}`,
    expected: 'a / b = 14',
    hint: '100 / 7 in integer division — what whole number fits without going over?',
    solution: `#include <stdio.h>

int main() {
    int a = 100;
    int b = 7;
    printf("a / b = %d\\n", a / b);
    return 0;
}`,
    onPass: () => { sm3.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch1-int','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-int-fill'), {
    mode: 'fill', topicId: 'ch1-int',
    question: 'Fill in the blanks to declare three int variables and print their sum.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] x = 10;
    [ ? ] y = 20;
    [ ? ] z = 30;
    printf("Sum: [ ? ]\\n", x + y + z);
    return 0;
}`,
    expected: 'Sum: 60',
    hint: 'All three type blanks are the same keyword. The format specifier blank prints an integer.',
    solution: `#include <stdio.h>

int main() {
    int x = 10;
    int y = 20;
    int z = 30;
    printf("Sum: %d\\n", x + y + z);
    return 0;
}`,
    onPass: () => { sm3.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch1-int','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-int-build'), {
    mode: 'build', topicId: 'ch1-int',
    question: 'Declare int variables for the length and width of a rectangle. Calculate and print the area (length × width) and perimeter (2 × (length + width)).',
    includes: ['<stdio.h>'], starterCode: '',
    checkFn: (out) => out.trim().split('\n').filter(l=>l.trim()).length >= 2,
    hint: 'int length = 8; int width = 5; int area = length * width; int perimeter = 2 * (length + width);',
    solution: `int length = 8;\nint width = 5;\nint area = length * width;\nint perimeter = 2 * (length + width);\nprintf("Area: %d\\n", area);\nprintf("Perimeter: %d\\n", perimeter);`,
    onPass: () => { sm3.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch1-int','step6') }
  })

  document.getElementById('step-ch1-int-7')?.addEventListener('click', function () {
    sm3.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch1-int','step7')
    _markTopicDone('ch1-int')
  }, { once: true })

  _initTabs('ch1-int')

  QuizEngine.init({
    containerId: 'quiz-ch1-int-predict',
    questions: [
      { id:'ch1-int-p1', type:'predict', question:'What does this print?', code:'int x = 7;\nint y = 2;\nprintf("%d\\n", x % y);', correct:['1'], caseSensitive:true, orderMatters:true, hint:'% is the remainder (modulo) operator. What is left over when 7 is divided by 2?', feedback:{ correct:'Correct — 7 % 2 = 1 (7 = 3×2 + 1).', incorrect:'7 % 2 = 1. The % operator gives the remainder after division.' } },
      { id:'ch1-int-p2', type:'predict', question:'What does this print?', code:'int n = 10;\nn = n - 3;\nn = n * 2;\nprintf("%d\\n", n);', correct:['14'], caseSensitive:true, orderMatters:true, hint:'10 - 3 = 7, then 7 * 2 = 14.', feedback:{ correct:'Correct — 10-3=7, 7×2=14.', incorrect:'n starts at 10. n = n-3 makes it 7. n = n*2 makes it 14.' } },
      { id:'ch1-int-p3', type:'predict', question:'What does this print?', code:'int a = 5, b = 3;\nprintf("%d %d\\n", a, b);', correct:['5 3'], caseSensitive:true, orderMatters:true, hint:'Two variables declared on one line, both printed.', feedback:{ correct:'Correct — a is 5 and b is 3, printed with a space between.', incorrect:'a = 5 and b = 3. The printf prints both with a space between them: 5 3.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-int-predict',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-int-mcq',
    questions: [
      { id:'ch1-int-m1', type:'mcq', question:'How many bytes does int typically use?', options:['1 byte','2 bytes','4 bytes','8 bytes'], correct:['4 bytes'], caseSensitive:false, orderMatters:false, hint:'It is the most common size on modern systems.', feedback:{ correct:'Correct — int is typically 4 bytes on modern systems.', incorrect:'int is typically 4 bytes on modern systems (32-bit integer).' } },
      { id:'ch1-int-m2', type:'mcq', question:'What is the result of <code>9 / 2</code> when both are integers in C?', options:['4.5','5','4','0'], correct:['4'], caseSensitive:false, orderMatters:false, hint:'Integer division truncates — it drops the decimal.', feedback:{ correct:'Correct — 9 / 2 = 4 in integer division (4.5 truncated to 4).', incorrect:'9 / 2 = 4 in integer arithmetic. The .5 is discarded, not rounded.' } },
      { id:'ch1-int-m3', type:'mcq', question:'Which best describes an uninitialised int variable?', options:['Its value is 0','Its value is undefined (garbage)','It cannot be used','It causes a compile error'], correct:['Its value is undefined (garbage)'], caseSensitive:false, orderMatters:false, hint:'C does not automatically zero out local variables.', feedback:{ correct:'Correct — uninitialised local variables contain whatever was in that memory before. Always initialise!', incorrect:'Uninitialised int variables contain garbage — the memory\'s previous contents. Always initialise: int x = 0;' } },
      { id:'ch1-int-m4', type:'mcq', question:'Which declaration declares three int variables on one line?', options:['int a; int b; int c;','int a, b, c;','int(a, b, c);','a, b, c int;'], correct:['int a, b, c;'], caseSensitive:true, orderMatters:false, hint:'Separate names with commas.', feedback:{ correct:'Correct — int a, b, c; declares three variables in one statement.', incorrect:'int a, b, c; is the multi-declaration syntax. Names are separated by commas after the type.' } },
      { id:'ch1-int-m5', type:'mcq', question:'What does <code>int x = 10 / 3;</code> set x to?', options:['3.33','3','4','0'], correct:['3'], caseSensitive:false, orderMatters:false, hint:'Both 10 and 3 are integer literals.', feedback:{ correct:'Correct — 10 / 3 in integer arithmetic = 3 (with remainder 1 discarded).', incorrect:'10 / 3 = 3 in integer division. x is set to 3, not 3.33.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-int-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-int-debug'), {
    mode: 'debug', topicId: 'ch1-int',
    question: 'The wrong format specifier is used. Fix it so it compiles and prints correctly.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int count = 42;
    printf("Count: %f\\n", count);
    return 0;
}`,
    expected: 'Count: 42',
    hint: '%f is for float/double. What format specifier prints an integer?',
    hintTwo: 'Change %f to %d — that is the correct specifier for int variables.',
    solution: `#include <stdio.h>

int main() {
    int count = 42;
    printf("Count: %d\\n", count);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch1-int-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 4 — float & double
     ------------------------------------------------------- */

  const sm4 = StepManager.init('ch1-float', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-float-explore'), {
    mode: 'explore', topicId: 'ch1-float',
    question: 'Run this — float and double store decimals. Notice how precision differs.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    float  price  = 9.99;
    double pi     = 3.14159265358979;
    printf("Price: %.2f\\n", price);
    printf("Pi:    %.10f\\n", pi);
    printf("Price default: %f\\n", price);
    return 0;
}`,
    hint: 'Note that %.2f shows 2 decimal places and %.10f shows 10. The default %f shows 6.',
    onPass: () => { sm4.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch1-float','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-float',
    question: 'The program showed <code>Price default: 9.990000</code>. Why the extra zeros?',
    options: [
      'There is a bug in the program',
      '%f always shows 6 decimal places by default',
      'float stores 6 digits including the 9s',
      '9.99 is stored incorrectly'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — the default %f shows exactly 6 decimal places. Use %.2f to control the number of places shown.',
      incorrect: 'The %f format specifier always shows 6 decimal places by default. Control it with %.nf — for example, %.2f shows exactly 2 decimal places.'
    },
    onAnswer: () => { sm4.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch1-float','step2') }
  })

  _addContinueBtn('step-ch1-float-3','Got it — continue →', () => {
    sm4.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch1-float','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-float-modify'), {
    mode: 'modify', topicId: 'ch1-float',
    question: 'Change <code>price</code> to 1499.50 and print it with <strong>3 decimal places</strong>.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    float price = 9.99;
    printf("Price: %.2f\\n", price);
    return 0;
}`,
    expected: 'Price: 1499.500',
    hint: 'Change 9.99 to 1499.50 and change %.2f to %.3f.',
    solution: `#include <stdio.h>

int main() {
    float price = 1499.50;
    printf("Price: %.3f\\n", price);
    return 0;
}`,
    onPass: () => { sm4.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch1-float','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-float-fill'), {
    mode: 'fill', topicId: 'ch1-float',
    question: 'Fill the blanks to declare a double for pi and print it to 4 decimal places.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] pi = 3.14159;
    printf("Pi: [ ? ]\\n", pi);
    return 0;
}`,
    expected: 'Pi: 3.1416',
    hint: 'The type that gives higher precision than float. The format specifier controls decimal places with %.4f.',
    solution: `#include <stdio.h>

int main() {
    double pi = 3.14159;
    printf("Pi: %.4f\\n", pi);
    return 0;
}`,
    onPass: () => { sm4.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch1-float','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-float-build'), {
    mode: 'build', topicId: 'ch1-float',
    question: 'Declare a double called <code>celsius</code> with value 36.6. Convert to Fahrenheit using <code>F = C * 9/5.0 + 32</code> and print the result to 2 decimal places.',
    includes: ['<stdio.h>'], starterCode: '',
    expected: '97.88',
    hint: 'double fahrenheit = celsius * 9 / 5.0 + 32; then printf("%.2f\\n", fahrenheit);',
    solution: `double celsius = 36.6;\ndouble fahrenheit = celsius * 9 / 5.0 + 32;\nprintf("%.2f\\n", fahrenheit);`,
    onPass: () => { sm4.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch1-float','step6') }
  })

  document.getElementById('step-ch1-float-7')?.addEventListener('click', function () {
    sm4.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch1-float','step7')
    _markTopicDone('ch1-float')
  }, { once: true })

  _initTabs('ch1-float')

  QuizEngine.init({
    containerId: 'quiz-ch1-float-predict',
    questions: [
      { id:'ch1-fl-p1', type:'predict', question:'What does this print?', code:'float x = 5.5;\nprintf("%.1f\\n", x);', correct:['5.5'], caseSensitive:true, orderMatters:true, hint:'%.1f shows 1 decimal place.', feedback:{ correct:'Correct — %.1f shows exactly 1 decimal place.', incorrect:'%.1f shows 1 decimal place. 5.5 printed to 1 decimal is 5.5.' } },
      { id:'ch1-fl-p2', type:'predict', question:'What does this print?', code:'printf("%.0f\\n", 3.7);', correct:['4'], caseSensitive:true, orderMatters:true, hint:'%.0f shows 0 decimal places — it rounds.', feedback:{ correct:'Correct — %.0f rounds to 0 decimal places. 3.7 rounds to 4.', incorrect:'%.0f rounds to the nearest integer. 3.7 rounds to 4.' } },
      { id:'ch1-fl-p3', type:'predict', question:'What does this print?', code:'double d = 1.0 / 3.0;\nprintf("%.3f\\n", d);', correct:['0.333'], caseSensitive:true, orderMatters:true, hint:'1.0 / 3.0 is floating-point division. %.3f shows 3 places.', feedback:{ correct:'Correct — 1.0/3.0 = 0.333... printed to 3 decimal places.', incorrect:'1.0/3.0 = 0.333333... %.3f truncates/rounds to 3 places: 0.333.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-float-predict',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-float-mcq',
    questions: [
      { id:'ch1-fl-m1', type:'mcq', question:'Which type offers more precision: float or double?', options:['float (4 bytes)','double (8 bytes)','They are equal','Depends on the compiler'], correct:['double (8 bytes)'], caseSensitive:false, orderMatters:false, hint:'More bytes = more precision.', feedback:{ correct:'Correct — double uses 8 bytes and gives ~15 significant digits vs float\'s ~6-7.', incorrect:'double uses 8 bytes and provides about 15 significant digits. float uses 4 bytes and provides about 6-7.' } },
      { id:'ch1-fl-m2', type:'mcq', question:'What format specifier prints a float or double?', options:['%d','%c','%f','%s'], correct:['%f'], caseSensitive:true, orderMatters:false, hint:'f stands for floating-point.', feedback:{ correct:'Correct — %f is for float and double.', incorrect:'%f prints floating-point numbers. %d is for integers, %c for chars, %s for strings.' } },
      { id:'ch1-fl-m3', type:'mcq', question:'How do you print a double to exactly 2 decimal places?', options:['%2f','%.2f','%d.2','%f.2'], correct:['%.2f'], caseSensitive:true, orderMatters:false, hint:'The dot before the number sets decimal precision.', feedback:{ correct:'Correct — %.2f means: format as float, 2 decimal places.', incorrect:'%.2f is the syntax: % starts it, .2 sets decimal places, f is the type.' } },
      { id:'ch1-fl-m4', type:'mcq', question:'What happens when you divide two floats: 5.0 / 2.0?', options:['2 (integer result)','2.5 (floating-point result)','Error','0.4'], correct:['2.5 (floating-point result)'], caseSensitive:false, orderMatters:false, hint:'Both are floats, so the result keeps the decimal.', feedback:{ correct:'Correct — 5.0 / 2.0 = 2.5. Floating-point division preserves the decimal.', incorrect:'5.0 / 2.0 = 2.5 — floating-point division keeps the decimal. Unlike int / int which truncates.' } },
      { id:'ch1-fl-m5', type:'mcq', question:'Which should you prefer for most calculations requiring decimals?', options:['float','double','int','char'], correct:['double'], caseSensitive:false, orderMatters:false, hint:'More precision is generally safer.', feedback:{ correct:'Correct — prefer double. It has more precision and reduces rounding errors.', incorrect:'Prefer double in most cases. float has limited precision (~6-7 significant digits) which can cause subtle rounding errors.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-float-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-float-debug'), {
    mode: 'debug', topicId: 'ch1-float',
    question: 'The wrong format specifier is used for a double. Fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    double weight = 72.5;
    printf("Weight: %d kg\\n", weight);
    return 0;
}`,
    expected: 'Weight: 72.50 kg',
    hint: 'weight is a double, not an int. Which format specifier handles decimals?',
    hintTwo: 'Change %d to %.2f to print the double correctly.',
    solution: `#include <stdio.h>

int main() {
    double weight = 72.5;
    printf("Weight: %.2f kg\\n", weight);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch1-float-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 5 — char VARIABLES
     ------------------------------------------------------- */

  const sm5 = StepManager.init('ch1-char', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-char-explore'), {
    mode: 'explore', topicId: 'ch1-char',
    question: 'Run this — char stores one character. Notice the ASCII number that prints.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    char grade = 'A';
    char symbol = '!';
    printf("Grade: %c\\n", grade);
    printf("Symbol: %c\\n", symbol);
    printf("ASCII of grade: %d\\n", grade);
    return 0;
}`,
    hint: 'A prints as "A" with %c, but as 65 with %d — its ASCII code. Click Run.',
    onPass: () => { sm5.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch1-char','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-char',
    question: 'The program printed <code>ASCII of grade: 65</code>. What does 65 represent?',
    options: [
      'The grade score',
      'The size of the variable in bytes',
      'The ASCII numeric code for the letter A',
      'The number of characters in the variable'
    ],
    correctIndex: 2,
    feedback: {
      correct: 'Correct — every character has an ASCII code. \'A\' = 65, \'B\' = 66, \'a\' = 97. Using %d on a char shows this underlying number.',
      incorrect: '65 is the ASCII code for the letter \'A\'. All characters are stored as small integers. Using %d reveals this number. \'A\'=65, \'B\'=66, \'a\'=97, \'0\'=48.'
    },
    onAnswer: () => { sm5.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch1-char','step2') }
  })

  _addContinueBtn('step-ch1-char-3','Got it — continue →', () => {
    sm5.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch1-char','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-char-modify'), {
    mode: 'modify', topicId: 'ch1-char',
    question: 'Change <code>grade</code> to \'F\' and <code>symbol</code> to \'?\'.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    char grade = 'A';
    char symbol = '!';
    printf("Grade: %c  Symbol: %c\\n", grade, symbol);
    return 0;
}`,
    expected: 'Grade: F  Symbol: ?',
    hint: "Use single quotes for char values: 'F' and '?'.",
    solution: `#include <stdio.h>

int main() {
    char grade = 'F';
    char symbol = '?';
    printf("Grade: %c  Symbol: %c\\n", grade, symbol);
    return 0;
}`,
    onPass: () => { sm5.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch1-char','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-char-fill'), {
    mode: 'fill', topicId: 'ch1-char',
    question: 'Fill the blanks to declare a char and print it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] initial = [ ? ]M[ ? ];
    printf("Initial: [ ? ]\\n", initial);
    return 0;
}`,
    expected: 'Initial: M',
    hint: 'Type: char. Value: \'M\' (single quotes around the character). Format specifier: %c.',
    solution: `#include <stdio.h>

int main() {
    char initial = 'M';
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    onPass: () => { sm5.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch1-char','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-char-build'), {
    mode: 'build', topicId: 'ch1-char',
    question: 'Declare three char variables for your initials. Print them together with dots between: e.g. <code>J.C.D.</code>',
    includes: ['<stdio.h>'], starterCode: '',
    checkFn: (out) => /[A-Za-z]\.[A-Za-z]\.[A-Za-z]/.test(out),
    hint: "char first = 'J'; char middle = 'C'; char last = 'D'; printf(\"%c.%c.%c.\\n\", first, middle, last);",
    solution: `char first  = 'J';\nchar middle = 'C';\nchar last   = 'D';\nprintf("%c.%c.%c.\\n", first, middle, last);`,
    onPass: () => { sm5.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch1-char','step6') }
  })

  document.getElementById('step-ch1-char-7')?.addEventListener('click', function () {
    sm5.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch1-char','step7')
    _markTopicDone('ch1-char')
  }, { once: true })

  _initTabs('ch1-char')

  QuizEngine.init({
    containerId: 'quiz-ch1-char-predict',
    questions: [
      { id:'ch1-ch-p1', type:'predict', question:'What does this print?', code:"char c = 'Z';\nprintf(\"%c\\n\", c);", correct:['Z'], caseSensitive:true, orderMatters:true, hint:'%c prints the character, not the number.', feedback:{ correct:"Correct — %c prints the character Z.", incorrect:"%c prints the character value. 'Z' prints as Z." } },
      { id:'ch1-ch-p2', type:'predict', question:'What does this print?', code:"char c = 'A';\nprintf(\"%d\\n\", c + 1);", correct:['66'], caseSensitive:true, orderMatters:true, hint:"'A' has ASCII code 65. 65 + 1 = ?", feedback:{ correct:"Correct — 'A' = 65, +1 = 66. %d prints the integer.", incorrect:"'A' = ASCII 65. 65 + 1 = 66. %d prints the number 66." } },
      { id:'ch1-ch-p3', type:'predict', question:'What does this print?', code:"char a = 'C', b = 'D';\nprintf(\"%c%c\\n\", a, b);", correct:['CD'], caseSensitive:true, orderMatters:true, hint:'Two chars printed back to back with no space between them.', feedback:{ correct:"Correct — %c%c prints C then D with no space.", incorrect:"Both chars are printed consecutively: CD." } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-char-predict',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-char-mcq',
    questions: [
      { id:'ch1-ch-m1', type:'mcq', question:'Which is the correct way to assign a char value?', options:["char c = A;","char c = \"A\";","char c = 'A';","char c = (A);"], correct:["char c = 'A';"], caseSensitive:true, orderMatters:false, hint:'Single quotes for single characters.', feedback:{ correct:"Correct — single quotes wrap char values: 'A'.", incorrect:"Char values use single quotes: char c = 'A'; Double quotes are for strings." } },
      { id:'ch1-ch-m2', type:'mcq', question:'How many bytes does a char use?', options:['4 bytes','2 bytes','1 byte','8 bytes'], correct:['1 byte'], caseSensitive:false, orderMatters:false, hint:'It stores a small number 0–127.', feedback:{ correct:'Correct — char is 1 byte, enough to store ASCII codes 0–127.', incorrect:'char is 1 byte — just enough to store ASCII character codes 0 to 127.' } },
      { id:'ch1-ch-m3', type:'mcq', question:'What format specifier prints a char as its character value?', options:['%d','%f','%c','%ch'], correct:['%c'], caseSensitive:true, orderMatters:false, hint:'c for character.', feedback:{ correct:'Correct — %c prints the character. %d would print the ASCII number.', incorrect:'%c prints the character symbol. %d would print the underlying ASCII integer instead.' } },
      { id:'ch1-ch-m4', type:'mcq', question:'What is the difference between \'5\' and 5 in C?', options:['Nothing — they are the same','\'5\' is a char (ASCII 53), 5 is an int', '\'5\' is an int and 5 is a float','\'5\' is a string'], correct:["'5' is a char (ASCII 53), 5 is an int"], caseSensitive:false, orderMatters:false, hint:"Single-quoted 5 is the character '5', not the number 5.", feedback:{ correct:"Correct — '5' (char) has ASCII value 53. 5 (int) is the integer 5. They are different types.", incorrect:"'5' is a char with ASCII code 53. 5 is the integer value five. They are completely different in C." } },
      { id:'ch1-ch-m5', type:'mcq', question:'What will <code>printf("%d", \'a\');</code> print?', options:['a','65','97','1'], correct:['97'], caseSensitive:false, orderMatters:false, hint:"'a' (lowercase) has a different ASCII code than 'A'.", feedback:{ correct:"Correct — 'a' has ASCII code 97. 'A' is 65.", incorrect:"'a' (lowercase a) has ASCII code 97. 'A' (uppercase) is 65. %d prints the number." } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-char-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-char-debug'), {
    mode: 'debug', topicId: 'ch1-char',
    question: 'This uses double quotes for a char value. Fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    char initial = "M";
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    expected: 'Initial: M',
    hint: "char values must use single quotes. \"M\" is a string. 'M' is a char.",
    hintTwo: "Change double quotes to single quotes: 'M' instead of \"M\".",
    solution: `#include <stdio.h>

int main() {
    char initial = 'M';
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch1-char-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 6 — const KEYWORD
     ------------------------------------------------------- */

  const sm6 = StepManager.init('ch1-const', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-const-explore'), {
    mode: 'explore', topicId: 'ch1-const',
    question: 'Run this — const prevents a value from changing. Read the output.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    const int MAX_STUDENTS = 30;
    const double TAX_RATE  = 0.12;
    printf("Max students: %d\\n", MAX_STUDENTS);
    printf("Tax rate: %.0f%%\\n", TAX_RATE * 100);
    return 0;
}`,
    hint: 'These values are locked — the program cannot change them after this point.',
    onPass: () => { sm6.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch1-const','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-const',
    question: 'If you added <code>MAX_STUDENTS = 50;</code> after line 4, what would happen?',
    options: [
      'MAX_STUDENTS would change to 50',
      'The compiler would give an error — const cannot be modified',
      'The program would print 50 instead of 30',
      'Nothing — the line would be ignored'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — const prevents any assignment after initialisation. The compiler will refuse to compile code that tries to change a const.',
      incorrect: 'const means "cannot be changed." The compiler will give an error: "assignment to const" if you try to modify it after declaration. That is the entire point of const.'
    },
    onAnswer: () => { sm6.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch1-const','step2') }
  })

  _addContinueBtn('step-ch1-const-3','Got it — continue →', () => {
    sm6.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch1-const','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-const-modify'), {
    mode: 'modify', topicId: 'ch1-const',
    question: 'Add <code>const</code> to make <code>PI</code> a constant. Then use it to calculate the circumference of a circle with radius 5.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    double PI = 3.14159;
    double radius = 5.0;
    double circumference = 2 * PI * radius;
    printf("Circumference: %.2f\\n", circumference);
    return 0;
}`,
    expected: 'Circumference: 31.42',
    hint: 'Add const before double PI. The rest can stay the same.',
    solution: `#include <stdio.h>

int main() {
    const double PI = 3.14159;
    double radius = 5.0;
    double circumference = 2 * PI * radius;
    printf("Circumference: %.2f\\n", circumference);
    return 0;
}`,
    onPass: () => { sm6.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch1-const','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-const-fill'), {
    mode: 'fill', topicId: 'ch1-const',
    question: 'Fill in the blanks to create two constants.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] int PASSING_GRADE = 75;
    [ ? ] double GRAVITY    = 9.81;
    printf("Pass: %d  g: %.2f\\n", PASSING_GRADE, GRAVITY);
    return 0;
}`,
    expected: 'Pass: 75  g: 9.81',
    hint: 'Both blanks are the same keyword that prevents modification.',
    solution: `#include <stdio.h>

int main() {
    const int PASSING_GRADE = 75;
    const double GRAVITY    = 9.81;
    printf("Pass: %d  g: %.2f\\n", PASSING_GRADE, GRAVITY);
    return 0;
}`,
    onPass: () => { sm6.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch1-const','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-const-build'), {
    mode: 'build', topicId: 'ch1-const',
    question: 'Define a const int for the number of days in a week (7) and a const int for months in a year (12). Print both.',
    includes: ['<stdio.h>'], starterCode: '',
    checkFn: (out) => out.includes('7') && out.includes('12'),
    hint: 'const int DAYS_PER_WEEK = 7; const int MONTHS_PER_YEAR = 12;',
    solution: `const int DAYS_PER_WEEK = 7;\nconst int MONTHS_PER_YEAR = 12;\nprintf("Days per week: %d\\n", DAYS_PER_WEEK);\nprintf("Months per year: %d\\n", MONTHS_PER_YEAR);`,
    onPass: () => { sm6.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch1-const','step6') }
  })

  document.getElementById('step-ch1-const-7')?.addEventListener('click', function () {
    sm6.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch1-const','step7')
    _markTopicDone('ch1-const')
  }, { once: true })

  _initTabs('ch1-const')

  QuizEngine.init({
    containerId: 'quiz-ch1-const-mcq',
    questions: [
      { id:'ch1-co-m1', type:'mcq', question:'What does the <code>const</code> keyword do?', options:['Makes a variable faster','Prevents a variable from being changed after initialisation','Makes a variable global','Declares a function'], correct:['Prevents a variable from being changed after initialisation'], caseSensitive:false, orderMatters:false, hint:'const = constant = cannot change.', feedback:{ correct:'Correct — const makes the value read-only after initialisation.', incorrect:'const prevents modification. Any attempt to reassign a const variable causes a compile error.' } },
      { id:'ch1-co-m2', type:'mcq', question:'By convention, const variable names are written in:', options:['camelCase','snake_case','UPPER_SNAKE_CASE','PascalCase'], correct:['UPPER_SNAKE_CASE'], caseSensitive:false, orderMatters:false, hint:'ALL CAPS with underscores.', feedback:{ correct:'Correct — ALL_CAPS_WITH_UNDERSCORES signals to readers that this is a constant.', incorrect:'Convention: const names use UPPER_SNAKE_CASE (all uppercase with underscores). This signals they are constants.' } },
      { id:'ch1-co-m3', type:'mcq', question:'Can you do this: <code>const int X = 5; X = 10;</code>', options:['Yes, const just suggests no changes','No, the compiler will error','Yes, if X is declared first','Yes, only with double type'], correct:['No, the compiler will error'], caseSensitive:false, orderMatters:false, hint:'const is enforced by the compiler, not just a suggestion.', feedback:{ correct:'Correct — attempting to modify a const causes a compile error: "assignment of read-only variable."', incorrect:'No — const is enforced. The compiler will refuse to compile X = 10 if X was declared const.' } },
      { id:'ch1-co-m4', type:'mcq', question:'When should you use const instead of a regular variable?', options:['When the value will change frequently','For values that should never change — fixed limits, rates, mathematical constants','For variables declared inside loops','For variables that need to be printed'], correct:['For values that should never change — fixed limits, rates, mathematical constants'], caseSensitive:false, orderMatters:false, hint:'Think: maximum size, speed of light, tax rate.', feedback:{ correct:'Correct — use const for values that are fixed by definition and should not change.', incorrect:'Use const for values that are logically fixed: physical constants, configuration limits, fixed rates.' } },
      { id:'ch1-co-m5', type:'mcq', question:'A const must be ______ when it is declared.', options:['printed','assigned a value (initialised)','declared in main','written in uppercase'], correct:['assigned a value (initialised)'], caseSensitive:false, orderMatters:false, hint:'If you cannot change it later, you must set it right away.', feedback:{ correct:'Correct — since you cannot assign later, you must initialise const when you declare it.', incorrect:'const must be initialised at declaration. You cannot declare it empty and assign later because const prevents any assignment after declaration.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-const-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-const-debug'), {
    mode: 'debug', topicId: 'ch1-const',
    question: 'This program tries to modify a const. Fix it by removing the illegal assignment.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    const int MAX = 100;
    MAX = 200;
    printf("Max: %d\\n", MAX);
    return 0;
}`,
    expected: 'Max: 100',
    hint: 'const values cannot be changed after declaration. Remove the line that tries to change MAX.',
    hintTwo: 'Delete line 5: MAX = 200; — it is illegal to modify a const.',
    solution: `#include <stdio.h>

int main() {
    const int MAX = 100;
    printf("Max: %d\\n", MAX);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch1-const-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 7 — #define CONSTANTS
     ------------------------------------------------------- */

  const sm7 = StepManager.init('ch1-define', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-define-explore'), {
    mode: 'explore', topicId: 'ch1-define',
    question: 'Run this — #define replaces text before compilation. Notice it has no type and no semicolon.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

#define MAX_SIZE   100
#define PASS_GRADE 75
#define APP_NAME   "Grade Tracker"

int main() {
    printf("App: %s\\n", APP_NAME);
    printf("Max: %d  Pass: %d\\n", MAX_SIZE, PASS_GRADE);
    return 0;
}`,
    hint: 'Before compiling, the preprocessor replaces MAX_SIZE with 100, PASS_GRADE with 75, everywhere in the file.',
    onPass: () => { sm7.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch1-define','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-define',
    question: 'Look at <code>#define MAX_SIZE 100</code> — what is different from <code>const int MAX_SIZE = 100;</code>?',
    options: [
      'They are identical in every way',
      '#define has no type, no =, no semicolon — it is a text replacement rule',
      '#define stores the value in memory like const does',
      'const only works inside functions'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — #define is a preprocessor directive. It does simple text replacement before compilation. No type, no =, no ;. const is a typed variable declaration.',
      incorrect: '#define has no type, no =, no semicolon. It is a text replacement: every MAX_SIZE in the code gets replaced with 100 before the compiler even sees it. const is a proper typed variable.'
    },
    onAnswer: () => { sm7.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch1-define','step2') }
  })

  _addContinueBtn('step-ch1-define-3','Got it — continue →', () => {
    sm7.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch1-define','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-define-modify'), {
    mode: 'modify', topicId: 'ch1-define',
    question: 'Change <code>DISCOUNT</code> to 25 (percent). The output should now say: Discount: 25%',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

#define DISCOUNT 10

int main() {
    printf("Discount: %d%%\\n", DISCOUNT);
    return 0;
}`,
    expected: 'Discount: 25%',
    hint: 'Only change the number in the #define line from 10 to 25.',
    solution: `#include <stdio.h>

#define DISCOUNT 25

int main() {
    printf("Discount: %d%%\\n", DISCOUNT);
    return 0;
}`,
    onPass: () => { sm7.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch1-define','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-define-fill'), {
    mode: 'fill', topicId: 'ch1-define',
    question: 'Fill in the blanks to create a #define constant and use it.',
    includes: ['<stdio.h>'],
    starterCode: `[ ? ] SPEED_OF_LIGHT 299792458

#include <stdio.h>

int main() {
    printf("Speed: %d m/s\\n", [ ? ]);
    return 0;
}`,
    expected: 'Speed: 299792458 m/s',
    hint: 'First blank: the preprocessor directive keyword. Second blank: the constant name.',
    solution: `#define SPEED_OF_LIGHT 299792458

#include <stdio.h>

int main() {
    printf("Speed: %d m/s\\n", SPEED_OF_LIGHT);
    return 0;
}`,
    onPass: () => { sm7.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch1-define','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-define-build'), {
    mode: 'build', topicId: 'ch1-define',
    question: 'Use #define to create constants for screen width (1920) and screen height (1080). Print both.',
    includes: ['<stdio.h>'], starterCode: '',
    checkFn: (out) => out.includes('1920') && out.includes('1080'),
    hint: '#define SCREEN_WIDTH 1920 and #define SCREEN_HEIGHT 1080 go before int main().',
    solution: `printf("Width: %d\\n", 1920);\nprintf("Height: %d\\n", 1080);`,
    onPass: () => { sm7.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch1-define','step6') }
  })

  document.getElementById('step-ch1-define-7')?.addEventListener('click', function () {
    sm7.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch1-define','step7')
    _markTopicDone('ch1-define')
  }, { once: true })

  _initTabs('ch1-define')

  QuizEngine.init({
    containerId: 'quiz-ch1-define-mcq',
    questions: [
      { id:'ch1-df-m1', type:'mcq', question:'What does #define do?', options:['Declares a typed variable','Tells the preprocessor to replace a name with a value before compilation','Includes a header file','Creates a function'], correct:['Tells the preprocessor to replace a name with a value before compilation'], caseSensitive:false, orderMatters:false, hint:'It runs before the compiler sees the code.', feedback:{ correct:'Correct — #define is a preprocessor text-replacement rule.', incorrect:'#define instructs the preprocessor to replace every occurrence of the name with the given value before compilation begins.' } },
      { id:'ch1-df-m2', type:'mcq', question:'Which is the correct syntax for a #define constant?', options:['#define MAX 100;','#define MAX = 100;','#define MAX 100','int #define MAX 100;'], correct:['#define MAX 100'], caseSensitive:true, orderMatters:false, hint:'No equals sign, no semicolon, no type.', feedback:{ correct:'Correct — no type, no =, no ;. Just: #define NAME value', incorrect:'#define syntax: #define NAME value — no type, no =, no semicolon.' } },
      { id:'ch1-df-m3', type:'mcq', question:'Where should #define directives be placed?', options:['Inside main()','After return 0','Before int main(), usually at the top of the file','After #include lines only'], correct:['Before int main(), usually at the top of the file'], caseSensitive:false, orderMatters:false, hint:'They are preprocessor directives, not code statements.', feedback:{ correct:'Correct — #define goes at the top, before functions, often after #include lines.', incorrect:'#define directives go at the top of the file before int main(), after #include statements.' } },
      { id:'ch1-df-m4', type:'mcq', question:'Which is safer and preferred in modern C?', options:['#define (no type checking)','const (type-checked by compiler)','Both are equally safe','Neither is recommended'], correct:['const (type-checked by compiler)'], caseSensitive:false, orderMatters:false, hint:'const has a type — the compiler can catch type errors.', feedback:{ correct:'Correct — const is type-checked. #define is pure text replacement with no type safety.', incorrect:'const is preferred in modern C (C99+) because the compiler type-checks it. #define has no type and no type-checking.' } },
      { id:'ch1-df-m5', type:'mcq', question:'If you write <code>#define PI 3.14;</code> with a semicolon, what happens?', options:['It works normally','The semicolon becomes part of the replacement text — every use of PI adds an extra semicolon','It causes a compile error immediately','The value is ignored'], correct:['The semicolon becomes part of the replacement text — every use of PI adds an extra semicolon'], caseSensitive:false, orderMatters:false, hint:'#define is pure text replacement — every character after the name is included.', feedback:{ correct:'Correct — the ; becomes part of the replacement. printf("%f\\n", PI) becomes printf("%f\\n", 3.14;) which is a syntax error!', incorrect:'The semicolon becomes part of the replacement value. #define PI 3.14; means PI expands to "3.14;" — adding a rogue semicolon everywhere PI appears.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-define-mcq',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-define-identify',
    questions: [
      { id:'ch1-df-id1', type:'identify', question:'What symbol/keyword starts a preprocessor directive in C?', correct:['#','hash','pound'], caseSensitive:false, orderMatters:false, hint:'It is at the start of #include and #define.', feedback:{ correct:'Correct — # (hash/pound) marks preprocessor directives.', incorrect:'The # symbol marks preprocessor directives like #include and #define.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-define-identify',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-define-debug'), {
    mode: 'debug', topicId: 'ch1-define',
    question: 'This #define has a semicolon that causes a problem. Fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

#define LIMIT 50;

int main() {
    printf("Limit: %d\\n", LIMIT);
    return 0;
}`,
    expected: 'Limit: 50',
    hint: '#define values must not end with a semicolon. The semicolon becomes part of the replacement.',
    hintTwo: 'Remove the ; from line 3. Change #define LIMIT 50; to #define LIMIT 50',
    solution: `#include <stdio.h>

#define LIMIT 50

int main() {
    printf("Limit: %d\\n", LIMIT);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch1-define-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 8 — NAMING CONVENTIONS
     ------------------------------------------------------- */

  const sm8 = StepManager.init('ch1-naming2', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming2-explore'), {
    mode: 'explore', topicId: 'ch1-naming2',
    question: 'Run this — all three styles compile, but C has one standard. Which looks most readable?',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int player_health   = 100;  /* snake_case     — C standard */
    int playerHealth    = 100;  /* camelCase      — Java/C++  */
    int PlayerHealth    = 100;  /* PascalCase     — C#/structs */
    const int MAX_HP    = 200;  /* UPPER_SNAKE    — constants  */
    printf("%d %d %d %d\\n", player_health, playerHealth, PlayerHealth, MAX_HP);
    return 0;
}`,
    hint: 'All compile and print the same. The difference is readability and convention.',
    onPass: () => { sm8.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch1-naming2','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch1-naming2',
    question: 'Which naming style is the <strong>standard C convention</strong> for regular variables?',
    options: ['camelCase (playerHealth)', 'PascalCase (PlayerHealth)', 'snake_case (player_health)', 'UPPER_CASE (PLAYERHEALTH)'],
    correctIndex: 2,
    feedback: {
      correct: 'Correct — C uses snake_case for variables and functions. UPPER_SNAKE_CASE is reserved for constants.',
      incorrect: 'C convention is snake_case for variables and functions (player_health). UPPER_SNAKE_CASE is for constants (MAX_HEALTH). camelCase is Java/JavaScript convention.'
    },
    onAnswer: () => { sm8.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch1-naming2','step2') }
  })

  _addContinueBtn('step-ch1-naming2-3','Got it — continue →', () => {
    sm8.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch1-naming2','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming2-modify'), {
    mode: 'modify', topicId: 'ch1-naming2',
    question: 'Rename <code>studentAge</code> to the correct C snake_case style: <code>student_age</code>.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int studentAge = 20;
    printf("Age: %d\\n", studentAge);
    return 0;
}`,
    expected: 'Age: 20',
    hint: 'Replace camelCase studentAge with snake_case student_age in both the declaration and printf.',
    solution: `#include <stdio.h>

int main() {
    int student_age = 20;
    printf("Age: %d\\n", student_age);
    return 0;
}`,
    onPass: () => { sm8.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch1-naming2','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming2-fill'), {
    mode: 'fill', topicId: 'ch1-naming2',
    question: 'Fill in properly named variables following C conventions.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

#define [ ? ] 100

int main() {
    int [ ? ] = 75;
    printf("Pass: %d  Max: %d\\n", [ ? ], MAX_SCORE);
    return 0;
}`,
    checkFn: (out) => out.includes('75') && out.includes('100'),
    hint: 'First blank: UPPER_SNAKE_CASE constant name. Second and third blanks: snake_case variable name.',
    solution: `#include <stdio.h>

#define MAX_SCORE 100

int main() {
    int pass_score = 75;
    printf("Pass: %d  Max: %d\\n", pass_score, MAX_SCORE);
    return 0;
}`,
    onPass: () => { sm8.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch1-naming2','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming2-build'), {
    mode: 'build', topicId: 'ch1-naming2',
    question: 'Write a program with: a const for max class size (40), a variable for current enrollment (32), and a variable for available seats (max - current). Print all three. Use proper C naming conventions.',
    includes: ['<stdio.h>'], starterCode: '',
    checkFn: (out) => out.includes('40') && out.includes('32') && out.includes('8'),
    hint: 'const int MAX_CLASS_SIZE = 40; int current_enrollment = 32; int available_seats = MAX_CLASS_SIZE - current_enrollment;',
    solution: `const int MAX_CLASS_SIZE = 40;\nint current_enrollment = 32;\nint available_seats = MAX_CLASS_SIZE - current_enrollment;\nprintf("Max: %d\\n", MAX_CLASS_SIZE);\nprintf("Enrolled: %d\\n", current_enrollment);\nprintf("Available: %d\\n", available_seats);`,
    onPass: () => { sm8.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch1-naming2','step6') }
  })

  document.getElementById('step-ch1-naming2-7')?.addEventListener('click', function () {
    sm8.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch1-naming2','step7')
    _markTopicDone('ch1-naming2')
  }, { once: true })

  _initTabs('ch1-naming2')

  QuizEngine.init({
    containerId: 'quiz-ch1-naming2-mcq',
    questions: [
      { id:'ch1-n2-m1', type:'mcq', question:'What naming convention does C use for regular variables?', options:['camelCase','PascalCase','snake_case','UPPER_CASE'], correct:['snake_case'], caseSensitive:false, orderMatters:false, hint:'Lowercase with underscores.', feedback:{ correct:'Correct — snake_case: all lowercase, underscores between words.', incorrect:'C convention for variables: snake_case (student_name, total_score). UPPER_SNAKE_CASE for constants.' } },
      { id:'ch1-n2-m2', type:'mcq', question:'What convention names constants like MAX_SIZE?', options:['camelCase','snake_case','UPPER_SNAKE_CASE','PascalCase'], correct:['UPPER_SNAKE_CASE'], caseSensitive:false, orderMatters:false, hint:'ALL CAPS signals: do not change me.', feedback:{ correct:'Correct — UPPER_SNAKE_CASE for constants signals: this value is fixed.', incorrect:'Constants use UPPER_SNAKE_CASE (ALL_CAPS_WITH_UNDERSCORES). It signals "do not change this value."' } },
      { id:'ch1-n2-m3', type:'mcq', question:'Why does naming convention matter if C does not enforce it?', options:['It does not matter','It makes code readable and maintainable for humans','The compiler runs faster with the right names','It prevents all bugs'], correct:['It makes code readable and maintainable for humans'], caseSensitive:false, orderMatters:false, hint:'Code is read far more often than it is written.', feedback:{ correct:'Correct — good naming makes code understandable. Bad naming makes even simple programs confusing.', incorrect:'Naming convention is for humans: readable code is maintainable code. Poor names make debugging and collaboration much harder.' } },
      { id:'ch1-n2-m4', type:'mcq', question:'Which is the best name for a variable that stores a student\'s test score?', options:['x','s','ts','student_test_score'], correct:['student_test_score'], caseSensitive:false, orderMatters:false, hint:'Descriptive names beat cryptic single letters (except for counters).', feedback:{ correct:'Correct — student_test_score is self-documenting. x, s, and ts require mental translation.', incorrect:'student_test_score is clear and self-documenting. Single letters like x, s are fine only for temporary loop counters.' } },
      { id:'ch1-n2-m5', type:'mcq', question:'When is it acceptable to use a single letter like <code>i</code> as a variable name?', options:['Never','Only for constants','For loop counters — the context makes it obvious','Only in small programs'], correct:['For loop counters — the context makes it obvious'], caseSensitive:false, orderMatters:false, hint:'i, j, k are universally understood as loop indices.', feedback:{ correct:'Correct — i, j, k as loop counters is universally understood in C and are acceptable short names.', incorrect:'i, j, k as loop counters (for int i = 0; ...) is the one exception where short names are acceptable because context is clear.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-naming2-mcq',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch1-naming2-identify',
    questions: [
      { id:'ch1-n2-id1', type:'identify', question:'What naming style uses ALL_CAPS_WITH_UNDERSCORES?', correct:['UPPER_SNAKE_CASE','upper snake case','upper_snake_case','upper case'], caseSensitive:false, orderMatters:false, hint:'Used for constants.', feedback:{ correct:'Correct — UPPER_SNAKE_CASE is used for constants in C.', incorrect:'UPPER_SNAKE_CASE uses all capital letters with underscores: MAX_SIZE, SPEED_OF_LIGHT, TAX_RATE.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch1-naming2-identify',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch1-naming2-debug'), {
    mode: 'debug', topicId: 'ch1-naming2',
    question: 'This code uses confusing names. It compiles but the logic is backwards. Fix the names so the code makes sense.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int a = 25;
    int b = 30;
    printf("Student age: %d  Student score: %d\\n", b, a);
    return 0;
}`,
    checkFn: (out) => out.includes('25') && out.includes('30'),
    hint: 'The printf prints b as age and a as score — but the values are swapped. Fix the variable names to match the values, or swap the values.',
    hintTwo: 'Rename a to student_score = 25 and b to student_age = 30, or swap which variable holds which value.',
    solution: `#include <stdio.h>

int main() {
    int student_age   = 30;
    int student_score = 25;
    printf("Student age: %d  Student score: %d\\n", student_age, student_score);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch1-naming2-debug',1,1)
  })

  /* -------------------------------------------------------
     MASTERY CHALLENGE
     ------------------------------------------------------- */

  CCompiler.initBlock(document.getElementById('compiler-ch1-mastery'), {
    mode: 'build', topicId: 'ch1-mastery',
    question: `Write a complete C program that:
<br>1. Defines a #define constant <code>PASSING_SCORE</code> = 75
<br>2. Declares a const double for a <code>TAX_RATE</code> = 0.12
<br>3. Declares int variables for a student's score (82) and age (20)
<br>4. Declares a char for their grade ('B')
<br>5. Prints: score, age, grade, and whether they passed (score >= PASSING_SCORE)`,
    includes: ['<stdio.h>'], starterCode: '',
    checkFn: (out) => {
      const o = out.trim()
      return o.includes('82') && o.includes('20') && o.includes('B') && (o.toLowerCase().includes('pass'))
    },
    hint: 'Print each variable, then use an if to check if score >= PASSING_SCORE and print "Passed" or "Failed".',
    solution: `int student_score = 82;\nint student_age   = 20;\nchar student_grade = 'B';\nprintf("Score: %d\\n", student_score);\nprintf("Age: %d\\n", student_age);\nprintf("Grade: %c\\n", student_grade);\nif (student_score >= 75) {\n    printf("Passed\\n");\n} else {\n    printf("Failed\\n");\n}`,
    onPass: () => {
      Progress.saveTopicComplete(CHAPTER_ID,'ch1-mastery')
      _checkChapterComplete()
      if (window.onProgressUpdate) window.onProgressUpdate()
    }
  })

  /* -------------------------------------------------------
     NEXT CHAPTER BUTTON
     ------------------------------------------------------- */

  document.getElementById('ch1-next-btn')?.addEventListener('click', () => {
    if (window.loadChapter) window.loadChapter('ch2')
  })

})()
