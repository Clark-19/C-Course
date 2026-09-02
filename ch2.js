/* =========================================================
   C LEARNING PLATFORM — chapters/ch2-data-types/ch2.js
   Chapter 2: Data Types — all interactive logic
   8 topics · Every compiler block · Every quiz · Progress saving
   ========================================================= */

;(function () {
  'use strict'

  const CHAPTER_ID = 'ch2'

  /* -------------------------------------------------------
     SHARED HELPERS
     ------------------------------------------------------- */

  function _addContinueBtn(stepId, label, onConfirm) {
    const btn = document.getElementById(stepId + '-continue')
    if (!btn) return
    btn.addEventListener('click', () => { onConfirm(); btn.style.display = 'none' }, { once: true })
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
    const topics = [
      'ch2-overview','ch2-integers','ch2-floats','ch2-char',
      'ch2-sizeof','ch2-signedness','ch2-limits','ch2-selection'
    ]
    if (topics.every(t => Progress.isTopicComplete(CHAPTER_ID, t))) {
      Progress.saveChapterComplete(CHAPTER_ID)
      const banner = document.getElementById('ch2-chapter-complete')
      if (banner) banner.style.display = 'block'
    }
  }

  /* -------------------------------------------------------
     TOPIC 1 — PRIMITIVE DATA TYPES OVERVIEW
     ------------------------------------------------------- */

  const sm1 = StepManager.init('ch2-overview', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-overview-explore'), {
    mode: 'explore',
    topicId: 'ch2-overview',
    question: 'Compile and run this — every primitive type in one program. Notice how each prints differently.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int    count    = 42;
    float  price    = 9.99;
    double pi       = 3.14159265;
    char   grade    = 'A';
    printf("int:    %d\\n",   count);
    printf("float:  %.2f\\n", price);
    printf("double: %.8f\\n", pi);
    printf("char:   %c\\n",   grade);
    return 0;
}`,
    hint: 'Click ▶ Run. Each type uses a different format specifier: %d for int, %f for float/double, %c for char.',
    onPass: () => { sm1.complete(1); Progress.saveStepComplete(CHAPTER_ID, 'ch2-overview', 'step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-overview',
    question: 'Four types printed four different values. Which type is used to store a single character like <code>\'A\'</code>?',
    options: ['int', 'float', 'double', 'char'],
    correctIndex: 3,
    feedback: {
      correct: 'Correct — <code>char</code> stores a single character. It uses single quotes: <code>\'A\'</code>, not double quotes.',
      incorrect: '<code>char</code> stores a single character. Single quotes are required — <code>\'A\'</code> is a char; <code>"A"</code> would be a string (different thing in C).'
    },
    onAnswer: () => { sm1.complete(2); Progress.saveStepComplete(CHAPTER_ID, 'ch2-overview', 'step2') }
  })

  _addContinueBtn('step-ch2-overview-3', 'Got it — continue →', () => {
    sm1.complete(3); Progress.saveStepComplete(CHAPTER_ID, 'ch2-overview', 'step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-overview-modify'), {
    mode: 'modify',
    topicId: 'ch2-overview',
    question: 'Change <code>count</code> to 100, <code>price</code> to 49.95, and <code>grade</code> to <code>\'B\'</code>. Print all three.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int   count = 42;
    float price = 9.99;
    char  grade = 'A';
    printf("%d  %.2f  %c\\n", count, price, grade);
    return 0;
}`,
    expected: '100  49.95  B',
    hint: 'Change the three values. The format string and printf stay the same.',
    solution: `#include <stdio.h>

int main() {
    int   count = 100;
    float price = 49.95;
    char  grade = 'B';
    printf("%d  %.2f  %c\\n", count, price, grade);
    return 0;
}`,
    onPass: () => { sm1.complete(4); Progress.saveStepComplete(CHAPTER_ID, 'ch2-overview', 'step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-overview-fill'), {
    mode: 'fill',
    topicId: 'ch2-overview',
    question: 'Fill in the blanks to declare each primitive type correctly.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ]    speed    = 299;
    [ ? ]    ratio    = 0.75;
    [ ? ]    accuracy = 0.99999;
    [ ? ]    status   = 'Y';
    printf("%d  %.2f  %.5f  %c\\n", speed, ratio, accuracy, status);
    return 0;
}`,
    expected: '299  0.75  0.99999  Y',
    hint: 'From top to bottom: whole number, single-precision decimal, double-precision decimal, single character.',
    solution: `#include <stdio.h>

int main() {
    int    speed    = 299;
    float  ratio    = 0.75;
    double accuracy = 0.99999;
    char   status   = 'Y';
    printf("%d  %.2f  %.5f  %c\\n", speed, ratio, accuracy, status);
    return 0;
}`,
    onPass: () => { sm1.complete(5); Progress.saveStepComplete(CHAPTER_ID, 'ch2-overview', 'step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-overview-build'), {
    mode: 'build',
    topicId: 'ch2-overview',
    question: 'Declare one variable of each primitive type (int, float, double, char) using meaningful names. Print all four on separate lines.',
    includes: ['<stdio.h>'],
    starterCode: '',
    checkFn: (out) => out.trim().split('\n').filter(l => l.trim()).length >= 4,
    hint: 'int age = ...; float weight = ...; double height = ...; char grade = ...;',
    solution: `int age = 20;\nfloat weight = 65.5;\ndouble height = 1.7034;\nchar grade = 'A';\nprintf("%d\\n%.1f\\n%.4f\\n%c\\n", age, weight, height, grade);`,
    onPass: () => { sm1.complete(6); Progress.saveStepComplete(CHAPTER_ID, 'ch2-overview', 'step6') }
  })

  document.getElementById('step-ch2-overview-7')?.addEventListener('click', function () {
    sm1.complete(7); Progress.saveStepComplete(CHAPTER_ID, 'ch2-overview', 'step7')
    _markTopicDone('ch2-overview')
  }, { once: true })

  _initTabs('ch2-overview')

  QuizEngine.init({
    containerId: 'quiz-ch2-overview-mcq',
    questions: [
      { id:'ch2-ov-m1', type:'mcq', question:'Which type stores whole numbers (no decimal)?', options:['float','double','int','char'], correct:['int'], caseSensitive:true, orderMatters:false, hint:'Think counting, indexing, whole values.', feedback:{ correct:'Correct — int stores whole numbers. No decimal part.', incorrect:'int stores whole numbers. float and double store decimals. char stores a single character.' } },
      { id:'ch2-ov-m2', type:'mcq', question:'Which type is used for a single character like <code>\'Z\'</code>?', options:['int','string','char','letter'], correct:['char'], caseSensitive:true, orderMatters:false, hint:'char is short for "character."', feedback:{ correct:'Correct — char stores one character, wrapped in single quotes.', incorrect:'char stores a single character. There is no "string" or "letter" type in basic C.' } },
      { id:'ch2-ov-m3', type:'mcq', question:'What format specifier prints a float with printf()?', options:['%d','%c','%f','%i'], correct:['%f'], caseSensitive:true, orderMatters:false, hint:'f stands for floating-point.', feedback:{ correct:'Correct — %f prints float and double values.', incorrect:'%f is for floating-point numbers. %d is for int, %c is for char.' } },
      { id:'ch2-ov-m4', type:'mcq', question:'What keyword is used to declare a variable with high-precision decimals?', options:['float','real','decimal','double'], correct:['double'], caseSensitive:true, orderMatters:false, hint:'More bytes = more precision.', feedback:{ correct:'Correct — double uses 8 bytes and provides about twice the precision of float.', incorrect:'double is the high-precision decimal type in C. float exists too but has less precision.' } },
      { id:'ch2-ov-m5', type:'mcq', question:'Which of these is NOT a primitive data type in C?', options:['int','string','char','double'], correct:['string'], caseSensitive:true, orderMatters:false, hint:'C does not have a built-in string type.', feedback:{ correct:'Correct — there is no "string" keyword in C. Strings are arrays of char — you will learn this in Chapter 15.', incorrect:'string is not a primitive type in C. C uses arrays of char for strings. The four primitives are int, float, double, and char.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-overview-mcq',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-overview-identify',
    questions: [
      { id:'ch2-ov-id1', type:'identify', question:'What format specifier prints an integer with printf()?', correct:['%d','%i'], caseSensitive:true, orderMatters:false, hint:'d for decimal/digit.', feedback:{ correct:'Correct — %d prints integers.', incorrect:'%d (or %i) is the format specifier for integers.' } },
      { id:'ch2-ov-id2', type:'identify', question:'What C keyword declares a character variable?', correct:['char'], caseSensitive:true, orderMatters:false, hint:'Short for "character."', feedback:{ correct:'Correct — char declares character variables.', incorrect:'The keyword is char — short for character.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-overview-identify',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-overview-debug'), {
    mode: 'debug', topicId: 'ch2-overview',
    question: 'The wrong format specifier is used for the char variable. Fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    char initial = 'J';
    printf("Initial: %d\\n", initial);
    return 0;
}`,
    expected: 'Initial: J',
    hint: 'initial is a char. Which format specifier prints a character symbol instead of its number?',
    hintTwo: 'Change %d to %c — that prints the character, not its ASCII code.',
    solution: `#include <stdio.h>

int main() {
    char initial = 'J';
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-overview-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 2 — INTEGER TYPES
     ------------------------------------------------------- */

  const sm2 = StepManager.init('ch2-integers', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-integers-explore'), {
    mode: 'explore', topicId: 'ch2-integers',
    question: 'Run this — four integer types, different sizes and ranges. Note how large values each can hold.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    short      s  = 32000;
    int        i  = 2000000;
    long       l  = 200000000;
    printf("short:     %hd\\n", s);
    printf("int:       %d\\n",  i);
    printf("long:      %ld\\n", l);
    printf("sizeof int:   %d bytes\\n", (int)sizeof(int));
    printf("sizeof long:  %d bytes\\n", (int)sizeof(long));
    return 0;
}`,
    hint: 'Click ▶ Run. Notice each type has a different format specifier: %hd, %d, %ld.',
    onPass: () => { sm2.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch2-integers','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-integers',
    question: 'The program shows different byte sizes for <code>int</code> and <code>long</code>. Why does choosing the right type matter?',
    options: [
      'It makes the code look cleaner',
      'Different types have different maximum values — use the smallest type that fits your data',
      'The compiler always picks the best type anyway',
      'All integer types are identical — only the name differs'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — type choice affects memory usage and maximum value. A short cannot hold 2,000,000; an int cannot hold 9 billion. Pick the type that fits.',
      incorrect: 'Type choice determines maximum value and memory use. short holds ±32,767. int holds ±2 billion. long long holds ±9.2 × 10¹⁸. Always pick the smallest type that fits your data.'
    },
    onAnswer: () => { sm2.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch2-integers','step2') }
  })

  _addContinueBtn('step-ch2-integers-3', 'Got it — continue →', () => {
    sm2.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch2-integers','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-integers-modify'), {
    mode: 'modify', topicId: 'ch2-integers',
    question: 'Change the int variable to hold 1,000,000,000 (one billion). Then print its size using sizeof.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int population = 2000000;
    printf("Population: %d\\n", population);
    return 0;
}`,
    expected: 'Population: 1000000000',
    hint: 'Replace 2000000 with 1000000000. int can hold up to about 2.1 billion.',
    solution: `#include <stdio.h>

int main() {
    int population = 1000000000;
    printf("Population: %d\\n", population);
    return 0;
}`,
    onPass: () => { sm2.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch2-integers','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-integers-fill'), {
    mode: 'fill', topicId: 'ch2-integers',
    question: 'Fill in the correct integer type keyword for each variable.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] port    = 8080;       /* needs only 2 bytes max 32767 */
    [ ? ] score   = 1500000;    /* needs 4 bytes */
    [ ? ] distance = 9460000000000L; /* light-year in km — needs 8 bytes */
    printf("%hd  %d  %lld\\n", port, score, distance);
    return 0;
}`,
    checkFn: (out) => out.includes('8080') && out.includes('1500000') && out.includes('9460000000000'),
    hint: 'First: short (small counts). Second: int (millions). Third: long long (trillions — needs LL suffix).',
    solution: `#include <stdio.h>

int main() {
    short     port     = 8080;
    int       score    = 1500000;
    long long distance = 9460000000000LL;
    printf("%hd  %d  %lld\\n", port, score, distance);
    return 0;
}`,
    onPass: () => { sm2.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch2-integers','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-integers-build'), {
    mode: 'build', topicId: 'ch2-integers',
    question: 'Declare a short for a classroom size (30), an int for a city population (1,200,000), and print both with the correct format specifiers.',
    includes: ['<stdio.h>'],
    starterCode: '',
    expected: '30\n1200000',
    hint: 'short class_size = 30; int city_pop = 1200000; printf("%hd\\n%d\\n", class_size, city_pop);',
    solution: `short class_size = 30;\nint city_pop = 1200000;\nprintf("%hd\\n%d\\n", class_size, city_pop);`,
    onPass: () => { sm2.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch2-integers','step6') }
  })

  document.getElementById('step-ch2-integers-7')?.addEventListener('click', function () {
    sm2.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch2-integers','step7')
    _markTopicDone('ch2-integers')
  }, { once: true })

  _initTabs('ch2-integers')

  QuizEngine.init({
    containerId: 'quiz-ch2-integers-predict',
    questions: [
      { id:'ch2-int-p1', type:'predict', question:'What does this print?', code:'short x = 100;\nprintf("%hd\\n", x);', correct:['100'], caseSensitive:true, orderMatters:true, hint:'%hd prints a short.', feedback:{ correct:'Correct — %hd prints the short value 100.', incorrect:'%hd is the format specifier for short. 100 prints as 100.' } },
      { id:'ch2-int-p2', type:'predict', question:'What does this print?', code:'int a = 1000000;\nint b = 2000000;\nprintf("%d\\n", a + b);', correct:['3000000'], caseSensitive:true, orderMatters:true, hint:'1000000 + 2000000 = 3000000, well within int range.', feedback:{ correct:'Correct — int arithmetic: 1000000 + 2000000 = 3000000.', incorrect:'1000000 + 2000000 = 3000000. Both values and the result fit in an int.' } },
      { id:'ch2-int-p3', type:'predict', question:'What does this print?', code:'int x = 10;\nint y = 3;\nprintf("%d\\n", x / y);', correct:['3'], caseSensitive:true, orderMatters:true, hint:'Integer division — the decimal is dropped.', feedback:{ correct:'Correct — 10 / 3 = 3 in integer division. The .33... is discarded.', incorrect:'Integer division: 10 / 3 = 3. The remainder (1) and decimal (.33) are dropped.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-integers-predict',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-integers-mcq',
    questions: [
      { id:'ch2-int-m1', type:'mcq', question:'Which integer type uses exactly 8 bytes?', options:['short','int','long','long long'], correct:['long long'], caseSensitive:false, orderMatters:false, hint:'LL suffix, always 64-bit.', feedback:{ correct:'Correct — long long always uses 8 bytes on all platforms.', incorrect:'long long always uses 8 bytes. short = 2 bytes, int = 4 bytes, long varies by platform.' } },
      { id:'ch2-int-m2', type:'mcq', question:'What format specifier prints a long long integer?', options:['%d','%ld','%lld','%ll'], correct:['%lld'], caseSensitive:true, orderMatters:false, hint:'Two lowercase L characters before d.', feedback:{ correct:'Correct — %lld is for long long. %ld is for long.', incorrect:'%lld prints long long. %d is int, %ld is long. Note: lowercase LL not uppercase.' } },
      { id:'ch2-int-m3', type:'mcq', question:'A short variable has a maximum value of approximately:', options:['32,000','2 billion','9.2 quintillion','127'], correct:['32,000'], caseSensitive:false, orderMatters:false, hint:'2 bytes = 16 bits.', feedback:{ correct:'Correct — signed short: ±32,767. It fits in 2 bytes.', incorrect:'short uses 2 bytes and holds ±32,767. int uses 4 bytes and holds ±2 billion.' } },
      { id:'ch2-int-m4', type:'mcq', question:'Which type is best for storing a student ID like 20241001?', options:['short','int','long long','char'], correct:['int'], caseSensitive:false, orderMatters:false, hint:'8-digit number, well within int range.', feedback:{ correct:'Correct — 20241001 is well within int range (max ~2.1 billion).', incorrect:'int can hold up to ~2.1 billion. A student ID of 20241001 easily fits.' } },
      { id:'ch2-int-m5', type:'mcq', question:'What suffix marks a long long literal value in C?', options:['L','LL','ll','LNG'], correct:['LL'], caseSensitive:true, orderMatters:false, hint:'Two uppercase L characters after the number.', feedback:{ correct:'Correct — use LL suffix: 9000000000LL tells the compiler this is a long long constant.', incorrect:'LL (two uppercase L) is the suffix for long long literals: 9000000000LL. L alone means long.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-integers-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-integers-debug'), {
    mode: 'debug', topicId: 'ch2-integers',
    question: 'Wrong format specifier — fix it so the output is correct.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    long population = 8000000000L;
    printf("World population: %d\\n", population);
    return 0;
}`,
    expected: 'World population: 8000000000',
    hint: 'population is a long. What format specifier prints a long integer?',
    hintTwo: 'Change %d to %ld for long. The l in %ld means "long."',
    solution: `#include <stdio.h>

int main() {
    long population = 8000000000L;
    printf("World population: %ld\\n", population);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-integers-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 3 — FLOATING POINT TYPES
     ------------------------------------------------------- */

  const sm3 = StepManager.init('ch2-floats', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-floats-explore'), {
    mode: 'explore', topicId: 'ch2-floats',
    question: 'Run this — same value, two types. Notice where float loses accuracy.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    float  f = 3.14159265358979;
    double d = 3.14159265358979;
    printf("float  (6 dec):  %.6f\\n",  f);
    printf("double (6 dec):  %.6f\\n",  d);
    printf("float  (12 dec): %.12f\\n", f);
    printf("double (12 dec): %.12f\\n", d);
    return 0;
}`,
    hint: 'At 12 decimal places, float and double diverge. double stays accurate longer.',
    onPass: () => { sm3.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch2-floats','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-floats',
    question: 'At 12 decimal places, float and double showed different values for the same number. What causes this?',
    options: [
      'A bug in the compiler',
      'float uses fewer bytes and has limited precision — it cannot represent all decimal values exactly',
      'printf is rounding too aggressively',
      'The values were assigned incorrectly'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — float uses 4 bytes and has ~6-7 significant digits. Beyond that, the stored value diverges from the actual value. double uses 8 bytes and gives ~15 significant digits.',
      incorrect: 'float uses 4 bytes = ~6-7 significant digits of precision. double uses 8 bytes = ~15 digits. When you request 12 decimal places, float\'s approximation becomes visible.'
    },
    onAnswer: () => { sm3.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch2-floats','step2') }
  })

  _addContinueBtn('step-ch2-floats-3', 'Got it — continue →', () => {
    sm3.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch2-floats','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-floats-modify'), {
    mode: 'modify', topicId: 'ch2-floats',
    question: 'Change the double to store the exact value 1.0/3.0 and print it to 10 decimal places.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    double result = 3.14;
    printf("Result: %.2f\\n", result);
    return 0;
}`,
    expected: 'Result: 0.3333333333',
    hint: 'double result = 1.0 / 3.0; then change %.2f to %.10f.',
    solution: `#include <stdio.h>

int main() {
    double result = 1.0 / 3.0;
    printf("Result: %.10f\\n", result);
    return 0;
}`,
    onPass: () => { sm3.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch2-floats','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-floats-fill'), {
    mode: 'fill', topicId: 'ch2-floats',
    question: 'Fill in the blanks to complete the declarations and print them at the right precision.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] tax_rate  = 0.12;       /* doesn't need many decimal places */
    [ ? ] exact_pi  = 3.14159265358979;  /* needs maximum precision */
    printf("Tax: [ ? ]\\n", tax_rate);
    printf("Pi:  [ ? ]\\n", exact_pi);
    return 0;
}`,
    checkFn: (out) => out.includes('0.12') && out.includes('3.14159265'),
    hint: 'Tax rate: float is fine. Exact pi: use double. Format specifiers need the % prefix.',
    solution: `#include <stdio.h>

int main() {
    float  tax_rate = 0.12;
    double exact_pi = 3.14159265358979;
    printf("Tax: %.2f\\n", tax_rate);
    printf("Pi:  %.8f\\n", exact_pi);
    return 0;
}`,
    onPass: () => { sm3.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch2-floats','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-floats-build'), {
    mode: 'build', topicId: 'ch2-floats',
    question: 'A circle has radius 5.0. Using <code>double pi = 3.14159</code>, calculate and print: area (π × r²) to 2 decimal places, and circumference (2 × π × r) to 2 decimal places.',
    includes: ['<stdio.h>'],
    starterCode: '',
    expected: 'Area: 78.54\nCircumference: 31.42',
    hint: 'double pi = 3.14159; double r = 5.0; double area = pi * r * r; double circ = 2 * pi * r;',
    solution: `double pi = 3.14159;\ndouble r = 5.0;\ndouble area = pi * r * r;\ndouble circ = 2 * pi * r;\nprintf("Area: %.2f\\n", area);\nprintf("Circumference: %.2f\\n", circ);`,
    onPass: () => { sm3.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch2-floats','step6') }
  })

  document.getElementById('step-ch2-floats-7')?.addEventListener('click', function () {
    sm3.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch2-floats','step7')
    _markTopicDone('ch2-floats')
  }, { once: true })

  _initTabs('ch2-floats')

  QuizEngine.init({
    containerId: 'quiz-ch2-floats-predict',
    questions: [
      { id:'ch2-fl-p1', type:'predict', question:'What does this print?', code:'double d = 2.5;\nprintf("%.1f\\n", d * 2);', correct:['5.0'], caseSensitive:true, orderMatters:true, hint:'2.5 × 2 = 5.0. %.1f shows 1 decimal place.', feedback:{ correct:'Correct — 2.5 × 2 = 5.0, printed to 1 decimal place.', incorrect:'2.5 × 2 = 5.0. %.1f shows exactly 1 decimal place: 5.0.' } },
      { id:'ch2-fl-p2', type:'predict', question:'What does this print?', code:'printf("%.0f\\n", 3.7);', correct:['4'], caseSensitive:true, orderMatters:true, hint:'%.0f rounds to 0 decimal places.', feedback:{ correct:'Correct — %.0f rounds 3.7 to the nearest integer: 4.', incorrect:'%.0f prints with 0 decimal places, rounded. 3.7 rounds to 4.' } },
      { id:'ch2-fl-p3', type:'predict', question:'What does this print?', code:'float f = 10.0;\nprintf("%d\\n", (int)f);', correct:['10'], caseSensitive:true, orderMatters:true, hint:'(int) casts the float to an int, truncating the decimal.', feedback:{ correct:'Correct — (int)10.0 = 10. Cast to int, then %d prints it.', incorrect:'(int) casts the float to int: 10.0 becomes 10. Then %d prints 10.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-floats-predict',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-floats-mcq',
    questions: [
      { id:'ch2-fl-m1', type:'mcq', question:'How many significant digits does float provide?', options:['3–4','6–7','10–11','15–17'], correct:['6–7'], caseSensitive:false, orderMatters:false, hint:'4 bytes of storage.', feedback:{ correct:'Correct — float provides about 6-7 significant digits.', incorrect:'float uses 4 bytes and gives ~6-7 significant digits. double uses 8 bytes and gives ~15-17.' } },
      { id:'ch2-fl-m2', type:'mcq', question:'For financial calculations where precision matters, which should you prefer?', options:['float','double','int','long'], correct:['double'], caseSensitive:false, orderMatters:false, hint:'More precision = fewer rounding errors.', feedback:{ correct:'Correct — use double for precision-sensitive calculations. float\'s 6-7 digits causes cumulative rounding errors.', incorrect:'double is preferred for precision. float can accumulate rounding errors that matter in financial code.' } },
      { id:'ch2-fl-m3', type:'mcq', question:'What does the f suffix in 3.14f do?', options:['Makes it faster','Marks it as a float literal instead of double','Makes it negative','Rounds to 1 decimal'], correct:['Marks it as a float literal instead of double'], caseSensitive:false, orderMatters:false, hint:'Without f, a decimal literal is double by default.', feedback:{ correct:'Correct — by default, 3.14 is a double literal. The f suffix makes it float: 3.14f.', incorrect:'3.14 is double by default in C. The f suffix makes 3.14f a float literal, saving 4 bytes.' } },
      { id:'ch2-fl-m4', type:'mcq', question:'Can you use == to compare two float values?', options:['Yes, always safe','No — floating-point imprecision makes exact equality unreliable','Only for integers','Yes, if they have the same number of decimal places'], correct:['No — floating-point imprecision makes exact equality unreliable'], caseSensitive:false, orderMatters:false, hint:'0.1 + 0.2 is not exactly 0.3 in float.', feedback:{ correct:'Correct — never compare floats with ==. Use fabs(a - b) < epsilon instead.', incorrect:'Float comparison with == is unreliable. 0.1 + 0.2 does not equal exactly 0.3 in float. Use a tolerance: fabs(a - b) < 0.0001.' } },
      { id:'ch2-fl-m5', type:'mcq', question:'What does %.3f mean in a printf format string?', options:['Print 3 total characters','Print with 3 decimal places','Print 3 copies','Round to nearest 3'], correct:['Print with 3 decimal places'], caseSensitive:false, orderMatters:false, hint:'The .3 controls decimal places.', feedback:{ correct:'Correct — %.3f prints the value with exactly 3 decimal places.', incorrect:'%.3f: the .3 sets precision (decimal places). f is the float/double type. Result: 3 decimal places.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-floats-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-floats-debug'), {
    mode: 'debug', topicId: 'ch2-floats',
    question: 'This program uses integer division for a temperature conversion. Fix it to use floating-point division.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int celsius = 37;
    double fahrenheit = celsius * 9 / 5 + 32;
    printf("%.1f F\\n", fahrenheit);
    return 0;
}`,
    expected: '98.6 F',
    hint: '9 / 5 is integer division and gives 1, not 1.8. Force float division.',
    hintTwo: 'Change 9 / 5 to 9.0 / 5.0 — floating-point literals force float division.',
    solution: `#include <stdio.h>

int main() {
    int celsius = 37;
    double fahrenheit = celsius * 9.0 / 5.0 + 32;
    printf("%.1f F\\n", fahrenheit);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-floats-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 4 — char TYPE AND ASCII
     ------------------------------------------------------- */

  const sm4 = StepManager.init('ch2-char', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-char-explore'), {
    mode: 'explore', topicId: 'ch2-char',
    question: 'Run this — chars are stored as integers. The ASCII table is the key.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    char letter = 'A';
    printf("Char:   %c\\n", letter);
    printf("ASCII:  %d\\n", letter);
    printf("A+1:    %c (ASCII %d)\\n", letter+1, letter+1);
    printf("a-A:    %d (difference between upper and lower)\\n", 'a'-'A');
    return 0;
}`,
    hint: '\'A\' = 65 in ASCII. Each next letter adds 1. Uppercase to lowercase is a difference of 32.',
    onPass: () => { sm4.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch2-char','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-char',
    question: 'The program showed that \'a\' - \'A\' = 32. What does this tell you about uppercase vs lowercase letters?',
    options: [
      'Lowercase letters are bigger than uppercase',
      'Their ASCII codes differ by exactly 32 — you can convert between them using arithmetic',
      'They are stored the same way — just displayed differently',
      'The compiler treats them as equal'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — uppercase A=65, lowercase a=97. The difference is always 32. To convert A→a, add 32. To convert a→A, subtract 32.',
      incorrect: 'ASCII codes: A=65, a=97. The difference (32) is consistent across all letters. This means you can convert case with arithmetic: char lower = upper + 32;'
    },
    onAnswer: () => { sm4.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch2-char','step2') }
  })

  _addContinueBtn('step-ch2-char-3', 'Got it — continue →', () => {
    sm4.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch2-char','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-char-modify'), {
    mode: 'modify', topicId: 'ch2-char',
    question: 'Change the letter to \'Z\'. Then add a line that prints its lowercase version using arithmetic (<code>letter + 32</code>).',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    char letter = 'A';
    printf("Upper: %c\\n", letter);
    return 0;
}`,
    expected: 'Upper: Z\nLower: z',
    hint: "char lower = letter + 32; printf(\"Lower: %c\\n\", lower);",
    solution: `#include <stdio.h>

int main() {
    char letter = 'Z';
    char lower  = letter + 32;
    printf("Upper: %c\\n", letter);
    printf("Lower: %c\\n", lower);
    return 0;
}`,
    onPass: () => { sm4.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch2-char','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-char-fill'), {
    mode: 'fill', topicId: 'ch2-char',
    question: 'Fill in the blanks to complete the ASCII arithmetic program.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] c = [ ? ]M[ ? ];        /* declare a char with value 'M' */
    printf("Char: %c  ASCII: [ ? ]\\n", c, c);
    printf("Next: %c  ASCII: %d\\n", c+1, c+1);
    return 0;
}`,
    expected: 'Char: M  ASCII: 77\nNext: N  ASCII: 78',
    hint: "Type is char. Value uses single quotes: 'M'. Format specifier for integer is %d.",
    solution: `#include <stdio.h>

int main() {
    char c = 'M';
    printf("Char: %c  ASCII: %d\\n", c, c);
    printf("Next: %c  ASCII: %d\\n", c+1, c+1);
    return 0;
}`,
    onPass: () => { sm4.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch2-char','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-char-build'), {
    mode: 'build', topicId: 'ch2-char',
    question: 'Print the ASCII codes for \'0\', \'9\', \'A\', \'Z\', \'a\', \'z\' — the key range boundaries. Use %c and %d for each.',
    includes: ['<stdio.h>'],
    starterCode: '',
    checkFn: (out) => out.includes('48') && out.includes('57') && out.includes('65') && out.includes('90') && out.includes('97') && out.includes('122'),
    hint: "printf(\"'0'=%d  '9'=%d\\n\", '0', '9'); — repeat for A, Z, a, z.",
    solution: `printf("'0'=%d  '9'=%d\\n", '0', '9');\nprintf("'A'=%d  'Z'=%d\\n", 'A', 'Z');\nprintf("'a'=%d  'z'=%d\\n", 'a', 'z');`,
    onPass: () => { sm4.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch2-char','step6') }
  })

  document.getElementById('step-ch2-char-7')?.addEventListener('click', function () {
    sm4.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch2-char','step7')
    _markTopicDone('ch2-char')
  }, { once: true })

  _initTabs('ch2-char')

  const ch2charPractice = [
    { q:'Print the ASCII code of the letter <code>\'C\'</code>.', expected:'67', hint:"printf(\"%d\\n\", 'C');", sol:`printf("%d\\n", 'C');` },
    { q:'Declare char grade = \'A\'. Print it as a character and as its ASCII number.', checkFn:(o)=>o.includes('A')&&o.includes('65'), hint:"printf(\"%c %d\\n\", grade, grade);", sol:`char grade = 'A';\nprintf("%c %d\\n", grade, grade);` },
    { q:'Print the character whose ASCII code is 90 (use a char variable set to 90).', expected:'Z', hint:"char c = 90; printf(\"%c\\n\", c);", sol:`char c = 90;\nprintf("%c\\n", c);` },
    { q:"Declare char lower = 'f'. Calculate and print its uppercase version (subtract 32).", expected:'F', hint:`char upper = lower - 32; printf("%c\\n", upper);`, sol:`char lower = 'f';\nchar upper = lower - 32;\nprintf("%c\\n", upper);` },
    { q:"Print whether '5' (a char) is stored as 53 in ASCII. Print its value with %d.", expected:'53', hint:"printf(\"%d\\n\", '5'); — '5' is the character five, not the number 5.", sol:`printf("%d\\n", '5');` }
  ]

  ch2charPractice.forEach((task, i) => {
    const container = document.createElement('div')
    container.style.marginBottom = 'var(--space-12)'
    document.getElementById('practice-ch2-char')?.appendChild(container)
    CCompiler.initBlock(container, {
      mode: 'build', topicId: 'ch2-char',
      question: `Task ${i+1}: ${task.q}`,
      includes: ['<stdio.h>'], starterCode: '',
      expected: task.expected,
      checkFn: task.checkFn,
      hint: task.hint, solution: task.sol
    })
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-char-predict',
    questions: [
      { id:'ch2-ch-p1', type:'predict', question:'What does this print?', code:"printf(\"%d\\n\", 'A');", correct:['65'], caseSensitive:true, orderMatters:true, hint:"'A' has ASCII code 65. %d prints the integer.", feedback:{ correct:"Correct — 'A' = ASCII 65. %d prints the integer value.", incorrect:"%d prints the integer value of the char. 'A' = 65." } },
      { id:'ch2-ch-p2', type:'predict', question:'What does this print?', code:"char c = 66;\nprintf(\"%c\\n\", c);", correct:['B'], caseSensitive:true, orderMatters:true, hint:'66 is the ASCII code for which letter?', feedback:{ correct:"Correct — ASCII 66 = 'B'. %c prints the character.", incorrect:"ASCII 66 = 'B'. %c prints the character symbol, not the number." } },
      { id:'ch2-ch-p3', type:'predict', question:'What does this print?', code:"char c = 'D';\nprintf(\"%c\\n\", c - 3);", correct:['A'], caseSensitive:true, orderMatters:true, hint:"'D' = 68. 68 - 3 = 65 = ?", feedback:{ correct:"Correct — 'D' = 68, 68-3 = 65 = 'A'.", incorrect:"'D' = ASCII 68. 68 - 3 = 65 = 'A'. Char arithmetic gives you other characters." } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-char-predict',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-char-mcq',
    questions: [
      { id:'ch2-ch-m1', type:'mcq', question:"What is the ASCII code for 'A'?", options:['65','97','41','90'], correct:['65'], caseSensitive:false, orderMatters:false, hint:'Uppercase A.', feedback:{ correct:"Correct — 'A' = 65. 'a' = 97.", incorrect:"'A' = 65. 'a' = 97. These are worth memorizing." } },
      { id:'ch2-ch-m2', type:'mcq', question:"How do you declare a char variable with value 'X'?", options:["char c = X;","char c = 'X';","char c = \"X\";","char('X') c;"], correct:["char c = 'X';"], caseSensitive:true, orderMatters:false, hint:'Single quotes for single characters.', feedback:{ correct:"Correct — single quotes wrap char values: 'X'.", incorrect:"char values use single quotes: char c = 'X'; Double quotes are for strings." } },
      { id:'ch2-ch-m3', type:'mcq', question:'How many bytes does a char use?', options:['1 byte','2 bytes','4 bytes','Depends on character'], correct:['1 byte'], caseSensitive:false, orderMatters:false, hint:'ASCII needs only 0-127.', feedback:{ correct:'Correct — char is always 1 byte, storing values 0–255 (unsigned) or -128–127 (signed).', incorrect:'char = 1 byte. Enough for all 128 ASCII characters (0–127) plus extended characters up to 255.' } },
      { id:'ch2-ch-m4', type:'mcq', question:"What is the difference between 'A' and 'a' in ASCII?", options:['0','1','26','32'], correct:['32'], caseSensitive:false, orderMatters:false, hint:"'A'=65, 'a'=97.", feedback:{ correct:"Correct — 97 - 65 = 32. This is consistent across all letters.", incorrect:"'A'=65, 'a'=97. 97-65=32. All uppercase-lowercase pairs differ by exactly 32." } },
      { id:'ch2-ch-m5', type:'mcq', question:"What does printf(\"%d\", 'C'); print?", options:["C","67","3","Error"], correct:['67'], caseSensitive:false, orderMatters:false, hint:"'C' has ASCII code 67. %d prints the integer value.", feedback:{ correct:"Correct — 'C' = ASCII 67. %d prints 67.", incorrect:"%d on a char prints the ASCII integer value. 'C' = 67." } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-char-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-char-debug'), {
    mode: 'debug', topicId: 'ch2-char',
    question: "Double quotes used instead of single quotes for a char value. Fix it.",
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    char grade = "B";
    printf("Grade: %c\\n", grade);
    return 0;
}`,
    expected: 'Grade: B',
    hint: "char values must use single quotes. \"B\" is a string literal, 'B' is a char.",
    hintTwo: "Change \"B\" to 'B' — single quotes for chars, double quotes for strings.",
    solution: `#include <stdio.h>

int main() {
    char grade = 'B';
    printf("Grade: %c\\n", grade);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-char-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 5 — sizeof() OPERATOR
     ------------------------------------------------------- */

  const sm5 = StepManager.init('ch2-sizeof', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-sizeof-explore'), {
    mode: 'explore', topicId: 'ch2-sizeof',
    question: 'Run this — sizeof() reveals exactly how many bytes each type occupies.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("char:        %d byte\\n",  (int)sizeof(char));
    printf("short:       %d bytes\\n", (int)sizeof(short));
    printf("int:         %d bytes\\n", (int)sizeof(int));
    printf("long:        %d bytes\\n", (int)sizeof(long));
    printf("float:       %d bytes\\n", (int)sizeof(float));
    printf("double:      %d bytes\\n", (int)sizeof(double));
    return 0;
}`,
    hint: 'sizeof() returns the byte count as a size_t. Casting to (int) lets us print with %d.',
    onPass: () => { sm5.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch2-sizeof','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-sizeof',
    question: 'Based on what you ran: which of these is true about sizeof()?',
    options: [
      'sizeof() runs the code and times it',
      'sizeof() is determined at compile time — it never changes during program execution',
      'sizeof() counts the number of digits in a number',
      'sizeof() only works on int'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — sizeof() is evaluated by the compiler before the program even runs. It is a compile-time constant, not a runtime function call.',
      incorrect: 'sizeof() is a compile-time operator. The compiler substitutes the actual byte count before your program runs. It works on any type or variable.'
    },
    onAnswer: () => { sm5.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch2-sizeof','step2') }
  })

  _addContinueBtn('step-ch2-sizeof-3', 'Got it — continue →', () => {
    sm5.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch2-sizeof','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-sizeof-modify'), {
    mode: 'modify', topicId: 'ch2-sizeof',
    question: 'Add sizeof() for a char variable — declare <code>char c = \'X\'</code> then print its size.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int x = 42;
    printf("int: %d bytes\\n", (int)sizeof(int));
    printf("x:   %d bytes\\n", (int)sizeof(x));
    return 0;
}`,
    checkFn: (out) => out.includes('1') && out.includes('int'),
    hint: 'char c = \'X\'; printf("char: %d byte\\n", (int)sizeof(c));',
    solution: `#include <stdio.h>

int main() {
    int x = 42;
    char c = 'X';
    printf("int:  %d bytes\\n", (int)sizeof(int));
    printf("x:    %d bytes\\n", (int)sizeof(x));
    printf("char: %d byte\\n",  (int)sizeof(c));
    return 0;
}`,
    onPass: () => { sm5.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch2-sizeof','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-sizeof-fill'), {
    mode: 'fill', topicId: 'ch2-sizeof',
    question: 'Fill in the blanks — sizeof() takes either a type name or a variable.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    double pi = 3.14;
    int size1 = (int)[ ? ](double);  /* size of the double type  */
    int size2 = (int)[ ? ](pi);      /* size of the variable pi  */
    printf("%d == %d\\n", size1, size2);
    return 0;
}`,
    expected: '8 == 8',
    hint: 'Both blanks are the same operator. It starts with s and ends with f.',
    solution: `#include <stdio.h>

int main() {
    double pi = 3.14;
    int size1 = (int)sizeof(double);
    int size2 = (int)sizeof(pi);
    printf("%d == %d\\n", size1, size2);
    return 0;
}`,
    onPass: () => { sm5.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch2-sizeof','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-sizeof-build'), {
    mode: 'build', topicId: 'ch2-sizeof',
    question: 'Calculate and print the total bytes needed to store: one int, one double, and one char — all on separate lines, then print the combined total.',
    includes: ['<stdio.h>'],
    starterCode: '',
    checkFn: (out) => {
      const lines = out.trim().split('\n').filter(l=>l.trim())
      return lines.length >= 4 && out.includes('13')
    },
    hint: 'int s1 = sizeof(int); int s2 = sizeof(double); int s3 = sizeof(char); printf total = s1+s2+s3 = 4+8+1 = 13',
    solution: `int s1 = (int)sizeof(int);\nint s2 = (int)sizeof(double);\nint s3 = (int)sizeof(char);\nprintf("int:    %d bytes\\n", s1);\nprintf("double: %d bytes\\n", s2);\nprintf("char:   %d byte\\n",  s3);\nprintf("Total:  %d bytes\\n", s1+s2+s3);`,
    onPass: () => { sm5.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch2-sizeof','step6') }
  })

  document.getElementById('step-ch2-sizeof-7')?.addEventListener('click', function () {
    sm5.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch2-sizeof','step7')
    _markTopicDone('ch2-sizeof')
  }, { once: true })

  _initTabs('ch2-sizeof')

  QuizEngine.init({
    containerId: 'quiz-ch2-sizeof-predict',
    questions: [
      { id:'ch2-sz-p1', type:'predict', question:'What does this print?', code:'printf("%d\\n", (int)sizeof(int));', correct:['4'], caseSensitive:true, orderMatters:true, hint:'int is 4 bytes on modern systems.', feedback:{ correct:'Correct — int is 4 bytes on most modern platforms.', incorrect:'int is 4 bytes on modern systems. sizeof(int) = 4.' } },
      { id:'ch2-sz-p2', type:'predict', question:'What does this print?', code:'double d = 9.9;\nprintf("%d\\n", (int)sizeof(d));', correct:['8'], caseSensitive:true, orderMatters:true, hint:'sizeof of a variable = sizeof of its type.', feedback:{ correct:'Correct — d is double, sizeof(d) = sizeof(double) = 8 bytes.', incorrect:'sizeof(d) gives the size of the variable\'s type. d is double = 8 bytes.' } },
      { id:'ch2-sz-p3', type:'predict', question:'What does this print?', code:'printf("%d\\n", (int)sizeof(char));', correct:['1'], caseSensitive:true, orderMatters:true, hint:'char is always 1 byte.', feedback:{ correct:'Correct — char is always 1 byte, guaranteed by the C standard.', incorrect:'char is always 1 byte — the only type with a guaranteed size in C.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-sizeof-predict',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-sizeof-mcq',
    questions: [
      { id:'ch2-sz-m1', type:'mcq', question:'What does sizeof() return?', options:['The value of the variable','The number of bytes the type uses','The number of characters in a string','The line number'], correct:['The number of bytes the type uses'], caseSensitive:false, orderMatters:false, hint:'Bytes, not bits.', feedback:{ correct:'Correct — sizeof() returns the size in bytes.', incorrect:'sizeof() returns the size in bytes — not bits, not value, not length.' } },
      { id:'ch2-sz-m2', type:'mcq', question:'Is sizeof() a function or an operator?', options:['A function from stdio.h','A runtime function','A compile-time operator','A preprocessor macro'], correct:['A compile-time operator'], caseSensitive:false, orderMatters:false, hint:'No parentheses required for a type.', feedback:{ correct:'Correct — sizeof is an operator evaluated at compile time. No header needed.', incorrect:'sizeof is a built-in compile-time operator, like + or *. No header file needed.' } },
      { id:'ch2-sz-m3', type:'mcq', question:'What is the return type of sizeof()?', options:['int','long','size_t','double'], correct:['size_t'], caseSensitive:false, orderMatters:false, hint:'An unsigned type defined for sizes.', feedback:{ correct:'Correct — sizeof() returns size_t, an unsigned integer type. Cast to int with (int) for printf %d.', incorrect:'sizeof() returns size_t — use %zu to print it correctly, or cast to (int) for %d.' } },
      { id:'ch2-sz-m4', type:'mcq', question:'sizeof(double) equals:', options:['4','8','2','16'], correct:['8'], caseSensitive:false, orderMatters:false, hint:'double = 64-bit = 8 bytes.', feedback:{ correct:'Correct — double uses 8 bytes (64 bits) on all modern systems.', incorrect:'double = 8 bytes. float = 4 bytes. This is fixed by the IEEE 754 standard.' } },
      { id:'ch2-sz-m5', type:'mcq', question:'Why use sizeof() instead of hardcoding byte sizes?', options:['It is shorter to type','It adapts to different platforms and compilers','It runs faster','It is required by C99'], correct:['It adapts to different platforms and compilers'], caseSensitive:false, orderMatters:false, hint:'Type sizes can vary between platforms.', feedback:{ correct:'Correct — type sizes are not always the same across platforms. sizeof() always gives the correct value.', incorrect:'sizeof() is portable. Hardcoding 4 for int might break on a platform where int is 2 or 8 bytes.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-sizeof-mcq',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-sizeof-debug'), {
    mode: 'debug', topicId: 'ch2-sizeof',
    question: 'Missing cast causes a potential warning or wrong output. Fix it.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Size of int: %d bytes\\n", sizeof(int));
    return 0;
}`,
    checkFn: (out) => out.includes('4') || out.includes('bytes'),
    hint: 'sizeof() returns size_t, not int. Add (int) cast before sizeof() to match %d.',
    hintTwo: 'Change sizeof(int) to (int)sizeof(int).',
    solution: `#include <stdio.h>

int main() {
    printf("Size of int: %d bytes\\n", (int)sizeof(int));
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-sizeof-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 6 — SIGNED vs UNSIGNED
     ------------------------------------------------------- */

  const sm6 = StepManager.init('ch2-signedness', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-signedness-explore'), {
    mode: 'explore', topicId: 'ch2-signedness',
    question: 'Run this — signed can be negative; unsigned cannot but holds twice the positive range.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int           signed_int   = -500;
    unsigned int  unsigned_int = 4000000000U;
    signed char   sc = -100;
    unsigned char uc = 200;
    printf("signed int:    %d\\n", signed_int);
    printf("unsigned int:  %u\\n", unsigned_int);
    printf("signed char:   %d\\n", sc);
    printf("unsigned char: %u\\n", uc);
    return 0;
}`,
    hint: 'Click ▶ Run. Signed int can be negative. Unsigned int cannot go below 0 but reaches 4 billion.',
    onPass: () => { sm6.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch2-signedness','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-signedness',
    question: 'unsigned int reached 4,000,000,000 while signed int\'s max is about 2.1 billion. Why can unsigned hold double?',
    options: [
      'unsigned is a different size than signed',
      'The bit that stores the sign (negative/positive) is repurposed for magnitude in unsigned',
      'Unsigned stores values more efficiently',
      'C compilers optimize unsigned types'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — signed int uses 1 bit for the sign. unsigned int uses all 32 bits for magnitude, doubling the positive range: 0 to 4,294,967,295.',
      incorrect: 'Both are the same size (4 bytes = 32 bits). Signed uses 1 bit to track positive/negative. Unsigned gives all 32 bits to magnitude, so the max doubles: 0 to ~4.3 billion.'
    },
    onAnswer: () => { sm6.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch2-signedness','step2') }
  })

  _addContinueBtn('step-ch2-signedness-3', 'Got it — continue →', () => {
    sm6.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch2-signedness','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-signedness-modify'), {
    mode: 'modify', topicId: 'ch2-signedness',
    question: 'Add an unsigned char variable set to 255 (maximum). Then try setting a signed char to -1 to show the contrast.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    unsigned char uc = 100;
    signed char   sc = 100;
    printf("unsigned char: %u\\n", uc);
    printf("signed char:   %d\\n", sc);
    return 0;
}`,
    checkFn: (out) => out.includes('255') && out.includes('-1'),
    hint: 'Change uc to 255 and sc to -1. Both are valid within their respective ranges.',
    solution: `#include <stdio.h>

int main() {
    unsigned char uc = 255;
    signed char   sc = -1;
    printf("unsigned char: %u\\n", uc);
    printf("signed char:   %d\\n", sc);
    return 0;
}`,
    onPass: () => { sm6.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch2-signedness','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-signedness-fill'), {
    mode: 'fill', topicId: 'ch2-signedness',
    question: 'Fill in the keyword (signed or unsigned) that fits each use case.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ] int  balance      = -5000;    /* bank balance — can be negative */
    [ ? ] int  pixel_count  = 3145728U; /* pixels — never negative        */
    [ ? ] char ascii_code   = 127;      /* ASCII range 0-127 — no negatives needed */
    printf("%d  %u  %u\\n", balance, pixel_count, ascii_code);
    return 0;
}`,
    checkFn: (out) => out.includes('-5000') && out.includes('3145728') && out.includes('127'),
    hint: 'Balance needs signed (negative possible). Pixel count and ASCII range are always >= 0.',
    solution: `#include <stdio.h>

int main() {
    signed   int  balance     = -5000;
    unsigned int  pixel_count = 3145728U;
    unsigned char ascii_code  = 127;
    printf("%d  %u  %u\\n", balance, pixel_count, ascii_code);
    return 0;
}`,
    onPass: () => { sm6.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch2-signedness','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-signedness-build'), {
    mode: 'build', topicId: 'ch2-signedness',
    question: 'Declare: an unsigned int for a user\'s score (2,500,000), and a signed int for a temperature (-15). Print both.',
    includes: ['<stdio.h>'],
    starterCode: '',
    expected: '2500000\n-15',
    hint: 'unsigned int score = 2500000U; int temp = -15; printf("%u\\n%d\\n", score, temp);',
    solution: `unsigned int score = 2500000U;\nint temp = -15;\nprintf("%u\\n%d\\n", score, temp);`,
    onPass: () => { sm6.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch2-signedness','step6') }
  })

  document.getElementById('step-ch2-signedness-7')?.addEventListener('click', function () {
    sm6.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch2-signedness','step7')
    _markTopicDone('ch2-signedness')
  }, { once: true })

  _initTabs('ch2-signedness')

  QuizEngine.init({
    containerId: 'quiz-ch2-signedness-mcq',
    questions: [
      { id:'ch2-sg-m1', type:'mcq', question:'What range does a signed char hold?', options:['-128 to 127','0 to 255','0 to 127','-256 to 256'], correct:['-128 to 127'], caseSensitive:false, orderMatters:false, hint:'1 byte, 8 bits, one bit for sign.', feedback:{ correct:'Correct — signed char: -128 to 127 (1 byte, 1 bit for sign).', incorrect:'Signed char uses 1 of 8 bits for the sign: -128 to 127. Unsigned char: 0 to 255.' } },
      { id:'ch2-sg-m2', type:'mcq', question:'What format specifier prints an unsigned int?', options:['%d','%u','%ud','%i'], correct:['%u'], caseSensitive:true, orderMatters:false, hint:'u for unsigned.', feedback:{ correct:'Correct — %u prints unsigned integers. %d would misinterpret large values.', incorrect:'%u prints unsigned int. Using %d on unsigned can give wrong results for large values.' } },
      { id:'ch2-sg-m3', type:'mcq', question:'What happens when unsigned int goes below 0?', options:['It stores -1','The compiler errors','It wraps around to the maximum value','It stays at 0'], correct:['It wraps around to the maximum value'], caseSensitive:false, orderMatters:false, hint:'No sign bit to absorb the negative.', feedback:{ correct:'Correct — unsigned wrap-around: 0 - 1 gives 4,294,967,295 for unsigned int.', incorrect:'Unsigned types wrap around. unsigned int x = 0; x = x - 1; gives 4,294,967,295 (the maximum), not -1.' } },
      { id:'ch2-sg-m4', type:'mcq', question:'What suffix marks an unsigned integer literal?', options:['S','L','U','N'], correct:['U'], caseSensitive:true, orderMatters:false, hint:'U for Unsigned.', feedback:{ correct:'Correct — the U suffix marks unsigned literals: 4000000000U.', incorrect:'U (or u) suffix marks unsigned literals: 4000000000U. LL marks long long literals.' } },
      { id:'ch2-sg-m5', type:'mcq', question:'For storing RGB color channel values (0–255), which type is most appropriate?', options:['int','signed char','unsigned char','short'], correct:['unsigned char'], caseSensitive:false, orderMatters:false, hint:'Color values are never negative. Range 0-255 fits in 1 byte.', feedback:{ correct:'Correct — unsigned char holds 0–255 exactly, uses only 1 byte, never negative.', incorrect:'unsigned char is perfect: range 0-255, 1 byte, never negative — matches RGB color channels exactly.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-signedness-mcq',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-signedness-identify',
    questions: [
      { id:'ch2-sg-id1', type:'identify', question:'What keyword makes an integer type unable to store negative values?', correct:['unsigned'], caseSensitive:true, orderMatters:false, hint:'The opposite of signed.', feedback:{ correct:'Correct — unsigned prevents negative values but doubles the positive range.', incorrect:'The keyword is unsigned. It prevents negative storage but doubles the positive maximum.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-signedness-identify',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-signedness-debug'), {
    mode: 'debug', topicId: 'ch2-signedness',
    question: 'Using %d for unsigned — fix the format specifier.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    unsigned int count = 3000000000U;
    printf("Count: %d\\n", count);
    return 0;
}`,
    expected: 'Count: 3000000000',
    hint: 'count is unsigned int. %d interprets the bits as signed, giving a wrong value.',
    hintTwo: 'Change %d to %u — the correct specifier for unsigned int.',
    solution: `#include <stdio.h>

int main() {
    unsigned int count = 3000000000U;
    printf("Count: %u\\n", count);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-signedness-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 7 — TYPE LIMITS
     ------------------------------------------------------- */

  const sm7 = StepManager.init('ch2-limits', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-limits-explore'), {
    mode: 'explore', topicId: 'ch2-limits',
    question: 'Run this — limits.h constants reveal the exact boundaries of each integer type.',
    includes: ['<stdio.h>', '<limits.h>'],
    starterCode: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("INT_MAX  = %d\\n",  INT_MAX);
    printf("INT_MIN  = %d\\n",  INT_MIN);
    printf("UINT_MAX = %u\\n",  UINT_MAX);
    printf("SHRT_MAX = %d\\n",  SHRT_MAX);
    printf("CHAR_MAX = %d\\n",  CHAR_MAX);
    printf("CHAR_MIN = %d\\n",  CHAR_MIN);
    return 0;
}`,
    hint: 'INT_MAX and INT_MIN are the largest and smallest values an int can hold.',
    onPass: () => { sm7.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch2-limits','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-limits',
    question: 'What happens if you add 1 to a variable that already holds INT_MAX?',
    options: [
      'The compiler prevents it',
      'The program crashes with an error',
      'The value wraps around to INT_MIN (integer overflow)',
      'The variable automatically changes to long'
    ],
    correctIndex: 2,
    feedback: {
      correct: 'Correct — integer overflow is silent and undefined for signed integers. INT_MAX + 1 wraps to INT_MIN. This is a common source of serious bugs.',
      incorrect: 'Adding 1 to INT_MAX causes integer overflow — the value wraps around to INT_MIN. This is not a compile error or crash. It is silent undefined behavior that causes bugs.'
    },
    onAnswer: () => { sm7.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch2-limits','step2') }
  })

  _addContinueBtn('step-ch2-limits-3', 'Got it — continue →', () => {
    sm7.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch2-limits','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-limits-modify'), {
    mode: 'modify', topicId: 'ch2-limits',
    question: 'Add <code>LLONG_MAX</code> to see the long long maximum — then compare it to INT_MAX.',
    includes: ['<stdio.h>', '<limits.h>'],
    starterCode: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("INT_MAX:   %d\\n",   INT_MAX);
    return 0;
}`,
    checkFn: (out) => out.includes('9223372036854775807') || out.includes('2147483647'),
    hint: 'printf("LLONG_MAX: %lld\\n", LLONG_MAX);',
    solution: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("INT_MAX:   %d\\n",   INT_MAX);
    printf("LLONG_MAX: %lld\\n", LLONG_MAX);
    return 0;
}`,
    onPass: () => { sm7.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch2-limits','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-limits-fill'), {
    mode: 'fill', topicId: 'ch2-limits',
    question: 'Fill the constants from limits.h.',
    includes: ['<stdio.h>', '<limits.h>'],
    starterCode: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("Max signed int:   %d\\n", [ ? ]);
    printf("Min signed int:   %d\\n", [ ? ]);
    printf("Max unsigned int: %u\\n", [ ? ]);
    return 0;
}`,
    expected: '2147483647\n-2147483648',
    hint: 'The three constants from limits.h are INT_MAX, INT_MIN, and UINT_MAX.',
    solution: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("Max signed int:   %d\\n", INT_MAX);
    printf("Min signed int:   %d\\n", INT_MIN);
    printf("Max unsigned int: %u\\n", UINT_MAX);
    return 0;
}`,
    onPass: () => { sm7.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch2-limits','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-limits-build'), {
    mode: 'build', topicId: 'ch2-limits',
    question: 'Write a program that prints INT_MAX, then prints INT_MAX + 1 to observe integer overflow. Include limits.h.',
    includes: ['<stdio.h>', '<limits.h>'],
    starterCode: '',
    checkFn: (out) => out.includes('2147483647'),
    hint: 'printf("%d\\n", INT_MAX); int overflow = INT_MAX + 1; printf("%d\\n", overflow);',
    solution: `printf("INT_MAX:     %d\\n", INT_MAX);\nint overflow = INT_MAX + 1;\nprintf("Overflow:    %d\\n", overflow);`,
    onPass: () => { sm7.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch2-limits','step6') }
  })

  document.getElementById('step-ch2-limits-7')?.addEventListener('click', function () {
    sm7.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch2-limits','step7')
    _markTopicDone('ch2-limits')
  }, { once: true })

  _initTabs('ch2-limits')

  QuizEngine.init({
    containerId: 'quiz-ch2-limits-mcq',
    questions: [
      { id:'ch2-lm-m1', type:'mcq', question:'What header file provides INT_MAX and INT_MIN?', options:['<stdio.h>','<math.h>','<limits.h>','<stdlib.h>'], correct:['<limits.h>'], caseSensitive:true, orderMatters:false, hint:'Think "limits."', feedback:{ correct:'Correct — #include <limits.h> gives you INT_MAX, INT_MIN, UINT_MAX, SHRT_MAX, LLONG_MAX, etc.', incorrect:'#include <limits.h> provides all integer type limit constants.' } },
      { id:'ch2-lm-m2', type:'mcq', question:'INT_MAX for a 32-bit int is approximately:', options:['32,767','2.1 billion','9.2 quintillion','4.3 billion'], correct:['2.1 billion'], caseSensitive:false, orderMatters:false, hint:'2^31 - 1.', feedback:{ correct:'Correct — INT_MAX = 2,147,483,647 ≈ 2.1 billion.', incorrect:'INT_MAX = 2,147,483,647 for a 32-bit signed int (2^31 - 1).' } },
      { id:'ch2-lm-m3', type:'mcq', question:'What happens when a signed int exceeds INT_MAX?', options:['Compile error','Program crash','Silent integer overflow — wraps to INT_MIN','The value stays at INT_MAX'], correct:['Silent integer overflow — wraps to INT_MIN'], caseSensitive:false, orderMatters:false, hint:'No automatic protection in C.', feedback:{ correct:'Correct — C does not protect against integer overflow. The value wraps silently.', incorrect:'Integer overflow in C is silent and causes the value to wrap. It is undefined behavior for signed types.' } },
      { id:'ch2-lm-m4', type:'mcq', question:'Why should you use INT_MAX instead of hardcoding 2147483647?', options:['INT_MAX is shorter to type','INT_MAX adapts if int size changes on different platforms','INT_MAX runs faster','They are identical and interchangeable'], correct:['INT_MAX adapts if int size changes on different platforms'], caseSensitive:false, orderMatters:false, hint:'Platform portability.', feedback:{ correct:'Correct — if int is 2 bytes on an old system, INT_MAX = 32767. Using the constant gives the right value automatically.', incorrect:'INT_MAX is the portable way. The actual value of int\'s maximum depends on the platform; the constant adapts.' } },
      { id:'ch2-lm-m5', type:'mcq', question:'What constant gives the maximum value for an unsigned int?', options:['INT_MAX','UINT_MAX','INT_UMAX','MAX_UINT'], correct:['UINT_MAX'], caseSensitive:true, orderMatters:false, hint:'U for Unsigned.', feedback:{ correct:'Correct — UINT_MAX = 4,294,967,295 on a 32-bit platform.', incorrect:'UINT_MAX gives the maximum for unsigned int — 4,294,967,295 on most platforms.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-limits-mcq',s,t)
  })

  QuizEngine.init({
    containerId: 'quiz-ch2-limits-identify',
    questions: [
      { id:'ch2-lm-id1', type:'identify', question:'What header gives you type limit constants like INT_MAX?', correct:['<limits.h>','limits.h'], caseSensitive:false, orderMatters:false, hint:'The filename contains the word "limits."', feedback:{ correct:'Correct — #include <limits.h>', incorrect:'#include <limits.h> provides INT_MAX, INT_MIN, CHAR_MAX, SHRT_MAX, LLONG_MAX, etc.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-limits-identify',s,t)
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-limits-debug'), {
    mode: 'debug', topicId: 'ch2-limits',
    question: 'Missing the limits.h include — add it so INT_MAX is recognized.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    printf("Max: %d\\n", INT_MAX);
    return 0;
}`,
    expected: 'Max: 2147483647',
    hint: 'INT_MAX is defined in limits.h. Without including it, the compiler does not know what INT_MAX is.',
    hintTwo: 'Add #include <limits.h> after #include <stdio.h>.',
    solution: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("Max: %d\\n", INT_MAX);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-limits-debug',1,1)
  })

  /* -------------------------------------------------------
     TOPIC 8 — PRACTICAL TYPE SELECTION
     ------------------------------------------------------- */

  const sm8 = StepManager.init('ch2-selection', 7, CHAPTER_ID)

  CCompiler.initBlock(document.getElementById('compiler-ch2-selection-explore'), {
    mode: 'explore', topicId: 'ch2-selection',
    question: 'Run this — a real-world data set. Each type is chosen deliberately.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    int          student_id    = 20241001;
    char         year_level    = '3';
    double       gpa           = 3.875;
    unsigned int credits       = 120;
    int          balance       = -500;
    char         initial       = 'J';
    printf("ID:      %d\\n", student_id);
    printf("Year:    %c\\n", year_level);
    printf("GPA:     %.3f\\n", gpa);
    printf("Credits: %u\\n", credits);
    printf("Balance: %d\\n", balance);
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    hint: 'Each type serves a reason. GPA needs decimals. Credits are never negative. Balance can go negative.',
    onPass: () => { sm8.complete(1); Progress.saveStepComplete(CHAPTER_ID,'ch2-selection','step1') }
  })

  QuizEngine.initInstantQuestion({
    containerId: 'iq-ch2-selection',
    question: 'Why is GPA stored as <code>double</code> rather than <code>float</code>?',
    options: [
      'GPA can be negative',
      'double gives more precision — important when small differences in GPA matter academically',
      'float does not work with %f',
      'double is the only type that can hold 3.875'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Correct — the difference between a 3.875 and 3.876 GPA is tiny but real. double\'s extra precision ensures that cumulative arithmetic stays accurate.',
      incorrect: 'GPA uses double for precision. GPA calculations involve many additions and comparisons. float\'s limited precision (6-7 digits) can introduce rounding errors. double gives 15 digits.'
    },
    onAnswer: () => { sm8.complete(2); Progress.saveStepComplete(CHAPTER_ID,'ch2-selection','step2') }
  })

  _addContinueBtn('step-ch2-selection-3', 'Got it — continue →', () => {
    sm8.complete(3); Progress.saveStepComplete(CHAPTER_ID,'ch2-selection','step3')
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-selection-modify'), {
    mode: 'modify', topicId: 'ch2-selection',
    question: 'Fix the types: change <code>float</code> to <code>double</code> for coordinates, and use <code>unsigned</code> for the population count.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    float     latitude   = 10.31574800;  /* should be double */
    int       population = 3000000;      /* should be unsigned */
    printf("Lat: %.8f  Pop: %d\\n", latitude, population);
    return 0;
}`,
    expected: 'Lat: 10.31574800  Pop: 3000000',
    hint: 'Change float to double. Change int to unsigned int. Change %d to %u for unsigned.',
    solution: `#include <stdio.h>

int main() {
    double       latitude   = 10.31574800;
    unsigned int population = 3000000;
    printf("Lat: %.8f  Pop: %u\\n", latitude, population);
    return 0;
}`,
    onPass: () => { sm8.complete(4); Progress.saveStepComplete(CHAPTER_ID,'ch2-selection','step4') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-selection-fill'), {
    mode: 'fill', topicId: 'ch2-selection',
    question: 'Fill in the best type for each variable based on the comment.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    [ ? ]   product_id   = 10052;          /* whole number, never negative  */
    [ ? ]   tax_rate     = 0.12;           /* decimal, moderate precision   */
    [ ? ]   temperature  = -18;            /* whole number, can be negative */
    [ ? ]   symbol       = '$';            /* single character              */
    printf("%u  %.2f  %d  %c\\n", product_id, tax_rate, temperature, symbol);
    return 0;
}`,
    expected: '10052  0.12  -18  $',
    hint: 'unsigned int for non-negative whole. float for moderate decimal. int for possibly negative. char for character.',
    solution: `#include <stdio.h>

int main() {
    unsigned int product_id  = 10052;
    float        tax_rate    = 0.12;
    int          temperature = -18;
    char         symbol      = '$';
    printf("%u  %.2f  %d  %c\\n", product_id, tax_rate, temperature, symbol);
    return 0;
}`,
    onPass: () => { sm8.complete(5); Progress.saveStepComplete(CHAPTER_ID,'ch2-selection','step5') }
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-selection-build'), {
    mode: 'build', topicId: 'ch2-selection',
    question: 'Model a sensor reading: declare an <code>unsigned int</code> for sensor ID, a <code>double</code> for reading value (humidity: 65.432), an <code>int</code> for a status code (−1 = error), and a <code>char</code> for unit (\'%\'). Print all.',
    includes: ['<stdio.h>'],
    starterCode: '',
    checkFn: (out) => out.includes('65.432') && (out.includes('-1') || out.includes('error')) && out.includes('%'),
    hint: 'unsigned int sensor_id = 1; double humidity = 65.432; int status = -1; char unit = \'%\';',
    solution: `unsigned int sensor_id = 1;\ndouble humidity = 65.432;\nint status = -1;\nchar unit = '%';\nprintf("ID: %u  Value: %.3f%c  Status: %d\\n", sensor_id, humidity, unit, status);`,
    onPass: () => { sm8.complete(6); Progress.saveStepComplete(CHAPTER_ID,'ch2-selection','step6') }
  })

  document.getElementById('step-ch2-selection-7')?.addEventListener('click', function () {
    sm8.complete(7); Progress.saveStepComplete(CHAPTER_ID,'ch2-selection','step7')
    _markTopicDone('ch2-selection')
  }, { once: true })

  _initTabs('ch2-selection')

  QuizEngine.init({
    containerId: 'quiz-ch2-selection-mcq',
    questions: [
      { id:'ch2-sl-m1', type:'mcq', question:'What type should you use for a loop counter from 0 to 1000?', options:['char','short','int','double'], correct:['int'], caseSensitive:false, orderMatters:false, hint:'Standard choice for most counting and indexing.', feedback:{ correct:'Correct — int is the standard choice for counters and indices.', incorrect:'int is the standard counter type. short also works for small ranges, but int is idiomatic C.' } },
      { id:'ch2-sl-m2', type:'mcq', question:'Which type stores latitude coordinates that need 8 decimal digits of accuracy?', options:['float','int','double','long'], correct:['double'], caseSensitive:false, orderMatters:false, hint:'float only gives 6-7 significant digits.', feedback:{ correct:'Correct — double gives ~15 significant digits — required for precise GPS coordinates.', incorrect:'GPS coordinates need double. float gives only 6-7 significant digits, which is not enough for precise location.' } },
      { id:'ch2-sl-m3', type:'mcq', question:'A pixel color value is always 0–255. Which type is most efficient?', options:['int','unsigned char','short','double'], correct:['unsigned char'], caseSensitive:false, orderMatters:false, hint:'1 byte, never negative.', feedback:{ correct:'Correct — unsigned char (1 byte, 0–255) matches RGB color values perfectly.', incorrect:'unsigned char is ideal: 1 byte, 0-255 range, never negative — perfectly matches RGB color channels.' } },
      { id:'ch2-sl-m4', type:'mcq', question:'What is the "safe default" float type for new C programmers?', options:['float','double','long double','decimal'], correct:['double'], caseSensitive:false, orderMatters:false, hint:'More precision = fewer surprise bugs.', feedback:{ correct:'Correct — use double unless you have a specific reason for float. More precision causes fewer subtle bugs.', incorrect:'Default to double for decimal values. It has better precision and reduces hard-to-debug rounding errors.' } },
      { id:'ch2-sl-m5', type:'mcq', question:'Three questions to ask when choosing a type:', options:['Size, color, speed','Decimal? Negative? How large?','Signed, unsigned, float?','Name, value, type?'], correct:['Decimal? Negative? How large?'], caseSensitive:false, orderMatters:false, hint:'These three answers narrow down the type.', feedback:{ correct:'Correct — those three questions determine the right type: (1) Does it need a decimal? → float/double (2) Can it be negative? → signed/unsigned (3) How large? → short/int/long.', incorrect:'The three-question framework: Does it have decimals? → float or double. Can it be negative? → signed. How big can it get? → choose size accordingly.' } }
    ],
    onComplete: (s,t) => Progress.saveQuizScore(CHAPTER_ID,'ch2-selection-mcq',s,t)
  })

  ;[
    { q:'Declare a <code>double</code> for the speed of light (299792458.0). Print it with no decimal places.', expected:'299792458', hint:'printf("%.0f\\n", speed_of_light);', sol:'double speed_of_light = 299792458.0;\nprintf("%.0f\\n", speed_of_light);' },
    { q:'Declare three variables for a classroom: <code>unsigned int</code> seats (30), <code>int</code> current_temp (-5), <code>char</code> status (\'A\'). Print all.', checkFn:(o)=>o.includes('30')&&o.includes('-5')&&o.includes('A'), hint:'unsigned int seats=30; int current_temp=-5; char status=\'A\';', sol:`unsigned int seats = 30;\nint current_temp = -5;\nchar status = 'A';\nprintf("%u  %d  %c\\n", seats, current_temp, status);` },
    { q:'Use sizeof() to print the byte sizes of int, double, and char on separate lines.', checkFn:(o)=>o.includes('4')&&o.includes('8')&&o.includes('1'), hint:'printf("%d\\n", (int)sizeof(int)); etc.', sol:'printf("%d\\n", (int)sizeof(int));\nprintf("%d\\n", (int)sizeof(double));\nprintf("%d\\n", (int)sizeof(char));' },
    { q:'Declare an unsigned int for number of website visitors today (1,500,000). Print it.', expected:'1500000', hint:'unsigned int visitors = 1500000U; printf("%u\\n", visitors);', sol:'unsigned int visitors = 1500000U;\nprintf("%u\\n", visitors);' },
    { q:'A thermometer reads 36.6 degrees. Pick the right type, store it, and print to 1 decimal place.', expected:'36.6', hint:'float or double; printf("%.1f\\n", temp);', sol:'double temp = 36.6;\nprintf("%.1f\\n", temp);' }
  ].forEach((task, i) => {
    const container = document.createElement('div')
    container.style.marginBottom = 'var(--space-12)'
    document.getElementById('practice-ch2-selection')?.appendChild(container)
    CCompiler.initBlock(container, {
      mode: 'build', topicId: 'ch2-selection',
      question: `Task ${i+1}: ${task.q}`, includes: ['<stdio.h>'], starterCode: '',
      expected: task.expected, checkFn: task.checkFn, hint: task.hint, solution: task.sol
    })
  })

  CCompiler.initBlock(document.getElementById('compiler-ch2-selection-debug'), {
    mode: 'debug', topicId: 'ch2-selection',
    question: 'All types are wrong. Match each variable to its correct type.',
    includes: ['<stdio.h>'],
    starterCode: `#include <stdio.h>

int main() {
    double grade_letter = 'A';   /* single char */
    char   exam_score   = 98.5;  /* decimal value */
    int    class_id     = 101;   /* whole number -- this one is fine */
    printf("%c  %.1f  %d\\n", grade_letter, exam_score, class_id);
    return 0;
}`,
    expected: 'A  98.5  101',
    hint: 'grade_letter should be char. exam_score should be double (or float).',
    hintTwo: 'Swap: char grade_letter = \'A\'; double exam_score = 98.5;',
    solution: `#include <stdio.h>

int main() {
    char   grade_letter = 'A';
    double exam_score   = 98.5;
    int    class_id     = 101;
    printf("%c  %.1f  %d\\n", grade_letter, exam_score, class_id);
    return 0;
}`,
    onPass: () => Progress.saveQuizScore(CHAPTER_ID,'ch2-selection-debug',1,1)
  })

  /* -------------------------------------------------------
     CHAPTER 2 MASTERY CHALLENGE
     ------------------------------------------------------- */

  CCompiler.initBlock(document.getElementById('compiler-ch2-mastery'), {
    mode: 'build', topicId: 'ch2-mastery',
    question: `Write a student record program that:
<br>1. Declares these with the right types: student_id (int, 20241001), gpa (double, 3.875), credits_earned (unsigned int, 90), year_level (char, '3')
<br>2. Uses sizeof() to print the byte size of each type
<br>3. Prints all four values with correct format specifiers`,
    includes: ['<stdio.h>'],
    starterCode: '',
    checkFn: (out) => {
      return out.includes('20241001') && out.includes('3.875') && out.includes('90') && out.includes('3')
    },
    hint: 'int, double, unsigned int, char — then sizeof each, then print each with %d, %.3f, %u, %c.',
    solution: `int student_id = 20241001;\ndouble gpa = 3.875;\nunsigned int credits = 90;\nchar year = '3';\nprintf("int size:    %d bytes\\n", (int)sizeof(int));\nprintf("double size: %d bytes\\n", (int)sizeof(double));\nprintf("uint size:   %d bytes\\n", (int)sizeof(unsigned int));\nprintf("char size:   %d byte\\n",  (int)sizeof(char));\nprintf("ID: %d  GPA: %.3f  Credits: %u  Year: %c\\n", student_id, gpa, credits, year);`,
    onPass: () => {
      Progress.saveTopicComplete(CHAPTER_ID,'ch2-mastery')
      _checkChapterComplete()
      if (window.onProgressUpdate) window.onProgressUpdate()
    }
  })

  /* -------------------------------------------------------
     NEXT CHAPTER BUTTON
     ------------------------------------------------------- */

  document.getElementById('ch2-next-btn')?.addEventListener('click', () => {
    if (window.loadChapter) window.loadChapter('ch3')
  })

})()
