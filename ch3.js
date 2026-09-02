/* =========================================================
   C LEARNING PLATFORM — chapters/ch3-input-output/ch3.js
   Chapter 3: Input & Output
   8 topics · Full 7-step active learning + assessment blocks
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch3'

  /* ── helpers ───────────────────────────────────────────── */
  function $(id) { return document.getElementById(id) }
  function el(tag, cls, html) {
    const e = document.createElement(tag)
    if (cls) e.className = cls
    if (html !== undefined) e.innerHTML = html
    return e
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — printf() BASICS
     ══════════════════════════════════════════════════════════ */
  function initTopic_printf() {
    const topicId = 'ch3-printf'
    const sm = StepManager.init(topicId, 7, CH)

    /* Step 1 — CODE FIRST: explore */
    CCompiler.initBlock($('compiler-ch3-printf-explore'), {
      mode: 'explore',
      topicId,
      chapterId: CH,
      question: null,
      includes: ['<stdio.h>'],
      starterCode: `printf("Name:  %s\\n", "Alice");
printf("Age:   %d\\n", 20);
printf("GPA:   %.2f\\n", 3.875);
printf("Grade: %c\\n", 'A');`,
      onPass: () => sm.complete(1)
    })

    /* Step 2 — INSTANT QUESTION */
    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-printf',
      question: 'The fourth line printed a letter. Which format specifier was used for the character?',
      options: ['%s', '%d', '%c', '%f'],
      correctIndex: 2,
      feedback: {
        correct: 'Right — %c is the format specifier for a single char. Each type has its own specifier.',
        incorrect: '%c is the char specifier. %s is for strings, %d for integers, %f for floats.'
      },
      onAnswer: () => sm.complete(2)
    })

    /* Step 3 — continue button already in HTML */
    $('step-ch3-printf-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    /* Step 4 — GUIDED PRACTICE: modify */
    CCompiler.initBlock($('compiler-ch3-printf-modify'), {
      mode: 'modify',
      topicId,
      chapterId: CH,
      question: 'Change the name to your own, the age to 18, and the GPA to 3.5. Keep the same format specifiers.',
      includes: ['<stdio.h>'],
      starterCode: `printf("Name:  %s\\n", "Alice");
printf("Age:   %d\\n", 20);
printf("GPA:   %.2f\\n", 3.875);
printf("Grade: %c\\n", 'A');`,
      checkFn: (output) => output.includes('18') && output.includes('3.50'),
      hint: 'Replace "Alice" with your name in quotes, 20 with 18, and 3.875 with 3.5. The specifiers (%s, %d, %.2f, %c) stay exactly the same.',
      onPass: () => sm.complete(4)
    })

    /* Step 5 — FILL-IN-THE-BLANK */
    CCompiler.initBlock($('compiler-ch3-printf-fill'), {
      mode: 'fill',
      topicId,
      chapterId: CH,
      question: 'Fill in the three format specifiers — one for int, one for float with 1 decimal, one for char.',
      includes: ['<stdio.h>'],
      starterCode: `int score = 95;
float avg = 87.4;
char rank = 'B';
printf("Score: [?]\\n", score);
printf("Avg:   [?]\\n", avg);
printf("Rank:  [?]\\n", rank);`,
      blanks: ['%d', '%.1f', '%c'],
      hint: 'Integer → %d. Float with 1 decimal → %.1f. Single character → %c.',
      onPass: () => sm.complete(5)
    })

    /* Step 6 — INDEPENDENT BUILD */
    CCompiler.initBlock($('compiler-ch3-printf-build'), {
      mode: 'build',
      topicId,
      chapterId: CH,
      question: 'Print a 3-line product label: a product name (string), a price as a float with 2 decimal places, and a quantity as an integer. Use one printf() per line.',
      includes: ['<stdio.h>'],
      starterCode: '',
      expected: null,
      checkFn: (output) => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 3
      },
      hint: 'Three separate printf() calls, one per line. Use %s for the name, %.2f for the price, and %d for the quantity.',
      solution: `printf("Product: %s\\n", "Widget Pro");
printf("Price:   $%.2f\\n", 29.99);
printf("Qty:     %d\\n", 100);`,
      onPass: () => sm.complete(6)
    })

    /* Step 7 — real-world snap is static in HTML */
    sm.complete(7)

    /* ── Assessment ── */
    const predictQuestions = [
      {
        id: 'ch3-printf-p1', type: 'predict',
        question: 'What will this print?',
        code: `int x = 7;\nprintf("Value: %d\\n", x);`,
        correct: ['Value: 7'],
        caseSensitive: true, orderMatters: true,
        hint: '%d substitutes the integer value of x.',
        feedback: { correct: 'Correct — %d is replaced by 7.', incorrect: '%d is replaced by the value of x, which is 7. Output: Value: 7' }
      },
      {
        id: 'ch3-printf-p2', type: 'predict',
        question: 'What will this print?',
        code: `printf("%s is %d years old\\n", "Bob", 22);`,
        correct: ['Bob is 22 years old'],
        caseSensitive: true, orderMatters: true,
        hint: 'Two specifiers: %s takes the first argument, %d takes the second.',
        feedback: { correct: 'Right — specifiers are replaced in order by the arguments after the format string.', incorrect: '%s → "Bob", %d → 22. Output: Bob is 22 years old' }
      },
      {
        id: 'ch3-printf-p3', type: 'predict',
        question: 'What will this print?',
        code: `char c = 'Z';\nprintf("Letter: %c  Code: %d\\n", c, c);`,
        correct: ['Letter: Z  Code: 90'],
        caseSensitive: true, orderMatters: true,
        hint: '%c prints the character, %d prints the ASCII value of the same char.',
        feedback: { correct: 'Correct — Z is character 90 in ASCII. %c shows the letter, %d shows the number.', incorrect: '%c prints Z and %d prints the ASCII code 90. Output: Letter: Z  Code: 90' }
      }
    ]

    const mcqQuestions = [
      {
        id: 'ch3-printf-m1', type: 'mcq',
        question: 'Which format specifier prints a floating-point number?',
        options: ['%d', '%c', '%f', '%s'],
        correct: ['%f'], caseSensitive: true, orderMatters: false,
        hint: 'Think: f for float.',
        feedback: { correct: 'Right — %f prints float and double values.', incorrect: '%f is for floating-point numbers. %d = integer, %c = character, %s = string.' }
      },
      {
        id: 'ch3-printf-m2', type: 'mcq',
        question: 'What does %s print?',
        options: ['A single character', 'A string (char array)', 'A short integer', 'A pointer address'],
        correct: ['A string (char array)'], caseSensitive: false, orderMatters: false,
        hint: 's stands for string.',
        feedback: { correct: 'Correct — %s prints a null-terminated char array (string).', incorrect: '%s prints a string — a null-terminated array of characters.' }
      },
      {
        id: 'ch3-printf-m3', type: 'mcq',
        question: 'What happens if you use %d to print a float variable?',
        options: ['It rounds to the nearest int', 'It prints garbage or 0', 'It prints normally', 'Compile error'],
        correct: ['It prints garbage or 0'], caseSensitive: false, orderMatters: false,
        hint: 'The specifier must match the type.',
        feedback: { correct: 'Correct — mismatching specifier and type gives undefined behavior, usually garbage output.', incorrect: 'Using %d for a float is a type mismatch. The output is undefined — usually garbage or 0.' }
      },
      {
        id: 'ch3-printf-m4', type: 'mcq',
        question: 'How many arguments does this printf() take in total?\n\nprintf("%s scored %d out of %d\\n", name, score, total);',
        options: ['3', '4', '1', '2'],
        correct: ['4'], caseSensitive: true, orderMatters: false,
        hint: 'Count the format string plus each variable after the comma.',
        feedback: { correct: 'Right — 1 format string + 3 variables = 4 total arguments.', incorrect: 'Count them: format string, name, score, total = 4 arguments.' }
      },
      {
        id: 'ch3-printf-m5', type: 'mcq',
        question: 'Which escape sequence moves output to a new line?',
        options: ['\\t', '\\\\', '\\n', '\\r'],
        correct: ['\\n'], caseSensitive: true, orderMatters: false,
        hint: 'n for newline.',
        feedback: { correct: 'Correct — \\n is the newline escape sequence.', incorrect: '\\n is newline. \\t is tab, \\\\ is backslash, \\r is carriage return.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch3-printf-predict', questions: predictQuestions, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch3-printf-mcq', questions: mcqQuestions, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    /* Debug */
    CCompiler.initBlock($('compiler-ch3-printf-debug'), {
      mode: 'debug',
      topicId,
      chapterId: CH,
      question: 'This program has one bug. Find it and fix it so it compiles and prints correctly.',
      includes: ['<stdio.h>'],
      starterCode: `int points = 150;
printf("Score: %f\\n", points);`,
      checkFn: (output) => output.includes('150'),
      hint: 'Look at the format specifier. What type is points?',
      hintTwo: 'points is an int. The specifier for int is %d, not %f.',
      solution: `int points = 150;\nprintf("Score: %d\\n", points);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — FORMAT SPECIFIERS
     ══════════════════════════════════════════════════════════ */
  function initTopic_format() {
    const topicId = 'ch3-format'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch3-format-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int   age  = 20;
long  pop  = 8100000000L;
float temp = 36.6;
double pi  = 3.14159265;
char  init = 'J';
printf("int:    %d\\n",  age);
printf("long:   %ld\\n", pop);
printf("float:  %f\\n",  temp);
printf("double: %lf\\n", pi);
printf("char:   %c\\n",  init);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-format',
      question: 'The long integer (8,100,000,000) used %ld — not %d. Why is a different specifier needed?',
      options: [
        'Long integers print in a different base',
        'long is larger than int — it needs a wider specifier',
        '%d only works for negative numbers',
        'It is a style preference only'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Right — long can hold values too big for int, so C needs %ld to read the full value correctly.',
        incorrect: 'long holds larger numbers than int. Using %d would truncate or corrupt the value. %ld tells printf the full size.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch3-format-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch3-format-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a fifth printf() that prints a string variable called language. Declare it as: char language[] = "C";',
      includes: ['<stdio.h>'],
      starterCode: `int   age  = 20;
float temp = 36.6;
char  init = 'J';
printf("Age:   %d\\n",  age);
printf("Temp:  %f\\n",  temp);
printf("Init:  %c\\n",  init);`,
      checkFn: (output) => output.includes('C') && output.split('\n').filter(l => l.trim()).length >= 4,
      hint: 'Declare: char language[] = "C"; then add printf("Lang: %s\\n", language);',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch3-format-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct format specifier for each variable type.',
      includes: ['<stdio.h>'],
      starterCode: `int items = 5;
double price = 9.99;
char symbol = '$';
char label[] = "Total";
printf("[?]\\n", items);
printf("[?]\\n", price);
printf("[?]\\n", symbol);
printf("[?]\\n", label);`,
      blanks: ['%d', '%lf', '%c', '%s'],
      hint: 'int → %d, double → %lf (or %f), char → %c, char array → %s',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch3-format-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare variables: name (string "Maria"), age (int 21), height (float 1.65), grade (char A). Print all four using correct specifiers.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('Maria') && output.includes('21') && output.includes('1.6') && output.includes('A'),
      hint: 'Four printf() calls: %s for string, %d for int, %f for float, %c for char.',
      solution: `char name[] = "Maria";\nint age = 21;\nfloat height = 1.65;\nchar grade = 'A';\nprintf("Name:   %s\\n", name);\nprintf("Age:    %d\\n", age);\nprintf("Height: %.2f\\n", height);\nprintf("Grade:  %c\\n", grade);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const identifyQuestions = [
      {
        id: 'ch3-format-id1', type: 'identify',
        question: 'What format specifier prints an integer in C?',
        correct: ['%d', 'd', 'percent d'],
        caseSensitive: false, orderMatters: false,
        hint: 'd stands for decimal integer.',
        feedback: { correct: 'Correct — %d is the integer specifier.', incorrect: '%d is used for int. The d stands for decimal.' }
      },
      {
        id: 'ch3-format-id2', type: 'identify',
        question: 'What format specifier is used for a double in scanf()?',
        correct: ['%lf', 'lf', '%lf'],
        caseSensitive: false, orderMatters: false,
        hint: 'Note: in scanf() you must use lf for double, not just f.',
        feedback: { correct: 'Right — %lf is required for double in scanf().', incorrect: 'In scanf(), use %lf for double (not %f). In printf() either works.' }
      }
    ]

    const mcqQuestions = [
      {
        id: 'ch3-format-m1', type: 'mcq',
        question: 'Which specifier prints a long integer?',
        options: ['%d', '%l', '%ld', '%ln'],
        correct: ['%ld'], caseSensitive: true, orderMatters: false,
        hint: 'l modifies the d specifier.',
        feedback: { correct: 'Correct — %ld is long int, %lld is long long int.', incorrect: '%ld prints a long integer. %d alone only handles int-sized values.' }
      },
      {
        id: 'ch3-format-m2', type: 'mcq',
        question: 'What does %s print?',
        options: ['A single character', 'A short int', 'A string / char array', 'A struct'],
        correct: ['A string / char array'], caseSensitive: false, orderMatters: false,
        hint: 's is for string.',
        feedback: { correct: 'Correct — %s prints a null-terminated char array.', incorrect: '%s is the string specifier. It prints a char array up to the null terminator.' }
      },
      {
        id: 'ch3-format-m3', type: 'mcq',
        question: 'You have a variable: double temp = 98.6; Which printf() is correct?',
        options: ['printf("%d", temp)', 'printf("%f", temp)', 'printf("%c", temp)', 'printf("%ld", temp)'],
        correct: ['printf("%f", temp)'], caseSensitive: true, orderMatters: false,
        hint: 'float and double both use %f in printf.',
        feedback: { correct: 'Right — %f works for both float and double in printf().', incorrect: 'In printf(), both float and double use %f. Only in scanf() do you need %lf for double.' }
      },
      {
        id: 'ch3-format-m4', type: 'mcq',
        question: 'Which is the specifier for an unsigned integer?',
        options: ['%d', '%u', '%i', '%un'],
        correct: ['%u'], caseSensitive: true, orderMatters: false,
        hint: 'u for unsigned.',
        feedback: { correct: 'Correct — %u prints an unsigned int (only positive values).', incorrect: '%u is for unsigned int. %d is signed and can print negative values.' }
      },
      {
        id: 'ch3-format-m5', type: 'mcq',
        question: 'char letter = 65; printf("%c", letter); — What prints?',
        options: ['65', 'A', 'B', 'Nothing'],
        correct: ['A'], caseSensitive: true, orderMatters: false,
        hint: 'ASCII code 65 is a specific letter.',
        feedback: { correct: 'Correct — ASCII 65 is the letter A. %c prints the character for that code.', incorrect: 'ASCII code 65 = A. When stored in a char and printed with %c, it shows the character, not the number.' }
      }
    ]

    const predictQuestions = [
      {
        id: 'ch3-format-p1', type: 'predict',
        question: 'What prints?',
        code: `char grade = 'B';\nprintf("%c = %d\\n", grade, grade);`,
        correct: ['B = 66'],
        caseSensitive: true, orderMatters: true,
        hint: '%c prints the character, %d prints its ASCII code.',
        feedback: { correct: 'Right — %c shows B and %d shows 66, the ASCII code for B.', incorrect: '%c prints the character B, %d prints its ASCII value 66.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch3-format-predict', questions: predictQuestions, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch3-format-mcq', questions: mcqQuestions, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch3-format-identify', questions: identifyQuestions, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch3-format-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'One specifier is wrong. Fix it.',
      includes: ['<stdio.h>'],
      starterCode: `char name[] = "Carlos";\nint age = 25;\nprintf("Name: %d  Age: %s\\n", name, age);`,
      checkFn: (output) => output.includes('Carlos') && output.includes('25'),
      hint: 'Look at the two specifiers. Which one should be %s and which should be %d?',
      hintTwo: 'name is a string — needs %s. age is an int — needs %d. They are swapped.',
      solution: `char name[] = "Carlos";\nint age = 25;\nprintf("Name: %s  Age: %d\\n", name, age);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — FORMAT MODIFIERS
     ══════════════════════════════════════════════════════════ */
  function initTopic_modifiers() {
    const topicId = 'ch3-modifiers'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch3-modifiers-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `printf("[%10d]\\n", 42);
printf("[%-10d]\\n", 42);
printf("[%010d]\\n", 42);
printf("[%.2f]\\n", 3.14159);
printf("[%8.2f]\\n", 3.14159);
printf("[%-8.2f]\\n", 3.14159);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-modifiers',
      question: 'The second line used %-10d and the first used %10d. The values are the same but they look different. What does the minus sign (-) control?',
      options: [
        'It prints a negative sign before the number',
        'It reverses left/right alignment in the field',
        'It subtracts 10 from the value',
        'It reduces the width to 0'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — the - flag left-aligns the value inside its field. Without it, values right-align by default.',
        incorrect: 'The - flag controls alignment direction. %-10d left-aligns in a 10-char field. %10d right-aligns.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch3-modifiers-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch3-modifiers-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the float to print with exactly 4 decimal places in a field width of 12, left-aligned.',
      includes: ['<stdio.h>'],
      starterCode: `printf("[%.2f]\\n", 3.14159);`,
      checkFn: (output) => output.includes('3.1416'),
      hint: 'Left-aligned: use - flag. Width 12, 4 decimals: %-12.4f',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch3-modifiers-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Complete the format specifiers to produce right-aligned output in a 8-char field for int, and 2-decimal float in a 10-char field.',
      includes: ['<stdio.h>'],
      starterCode: `printf("[[?]]\\n", 42);
printf("[[?]]\\n", 9.99);`,
      blanks: ['%8d', '%10.2f'],
      hint: 'Width only: %8d. Width + precision: %10.2f',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch3-modifiers-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Print a 3-row table of items and prices. Names left-aligned in 12 chars, prices right-aligned with 2 decimal places in 8 chars. At minimum include "Apple", "Banana", and "Cherry".',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => output.includes('Apple') && output.includes('Banana') && output.includes('Cherry'),
      hint: 'Use %-12s for names and %8.2f for prices.',
      solution: `printf("%-12s %8.2f\\n", "Apple",  1.25);\nprintf("%-12s %8.2f\\n", "Banana", 0.75);\nprintf("%-12s %8.2f\\n", "Cherry", 3.50);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQuestions = [
      {
        id: 'ch3-mod-p1', type: 'predict',
        question: 'What prints? (brackets show field boundaries)',
        code: `printf("[%5d]\\n", 7);`,
        correct: ['[    7]'],
        caseSensitive: true, orderMatters: true,
        hint: '5 total chars, right-aligned by default.',
        feedback: { correct: 'Correct — 4 spaces then 7 fills the 5-char right-aligned field.', incorrect: '%5d right-aligns 7 in a 5-char field. That means 4 spaces then 7.' }
      },
      {
        id: 'ch3-mod-p2', type: 'predict',
        question: 'What prints?',
        code: `printf("%.3f\\n", 3.14159);`,
        correct: ['3.142'],
        caseSensitive: true, orderMatters: true,
        hint: '.3 means exactly 3 decimal places, and it rounds.',
        feedback: { correct: 'Right — %.3f rounds to 3 decimal places: 3.14159 → 3.142', incorrect: '%.3f prints 3 decimal places: 3.14159 rounds to 3.142' }
      },
      {
        id: 'ch3-mod-p3', type: 'predict',
        question: 'What prints?',
        code: `printf("[%05d]\\n", 42);`,
        correct: ['[00042]'],
        caseSensitive: true, orderMatters: true,
        hint: '0 flag pads with zeros instead of spaces.',
        feedback: { correct: 'Correct — %05d pads with zeros: 00042', incorrect: 'The 0 flag pads with zeros. 42 in a 5-char zero-padded field = 00042.' }
      }
    ]

    const mcqQuestions = [
      {
        id: 'ch3-mod-m1', type: 'mcq',
        question: 'What does the width in %10d control?',
        options: ['How many decimal places to show', 'The minimum number of characters in the output', 'The maximum value that can be printed', 'The base of the number'],
        correct: ['The minimum number of characters in the output'], caseSensitive: false, orderMatters: false,
        hint: 'Think minimum, not maximum.',
        feedback: { correct: 'Right — width sets the minimum field size. Values wider than the field simply expand it.', incorrect: 'Width is the minimum field size. If the value is wider, it overrides the width.' }
      },
      {
        id: 'ch3-mod-m2', type: 'mcq',
        question: 'What does %.4f print for the value 2.0?',
        options: ['2', '2.0', '2.0000', '2.4'],
        correct: ['2.0000'], caseSensitive: false, orderMatters: false,
        hint: '.4 means always 4 decimal places.',
        feedback: { correct: 'Correct — %.4f always shows exactly 4 decimal places: 2.0000', incorrect: '%.4f forces exactly 4 decimal places. 2.0 becomes 2.0000.' }
      },
      {
        id: 'ch3-mod-m3', type: 'mcq',
        question: 'Which specifier left-aligns a string in a 15-char field?',
        options: ['%15s', '%-15s', '%s15', '%l15s'],
        correct: ['%-15s'], caseSensitive: true, orderMatters: false,
        hint: 'The - flag goes right after the %.',
        feedback: { correct: 'Correct — %-15s left-aligns the string in a 15-character field.', incorrect: '%-15s: the - after % means left-align, 15 is the field width.' }
      },
      {
        id: 'ch3-mod-m4', type: 'mcq',
        question: 'What does %08.2f print for 3.14?',
        options: ['00003.14', '3.140000', '   3.14', '0003.14'],
        correct: ['00003.14'], caseSensitive: true, orderMatters: false,
        hint: '0 flag, total width 8, 2 decimal places.',
        feedback: { correct: 'Correct — %08.2f: 8 total chars, 2 decimals, zero-padded. 3.14 has 4 chars, so 4 zeros prefix it.', incorrect: '%08.2f: total width 8, 2 decimal places, zero-padded. 3.14 → 00003.14' }
      },
      {
        id: 'ch3-mod-m5', type: 'mcq',
        question: 'In %8.2f, what does the .2 control?',
        options: ['Total field width', 'Number of decimal places', 'Number of leading zeros', 'Precision for integers'],
        correct: ['Number of decimal places'], caseSensitive: false, orderMatters: false,
        hint: 'The part after the dot is precision.',
        feedback: { correct: 'Right — .precision sets decimal places for floats.', incorrect: 'In %width.precision, the .2 is precision — how many digits after the decimal point.' }
      }
    ]

    const practiceConfigs = [
      { id: 'p1', task: 'Print the number 42 right-aligned in a field of 8 characters.', check: o => /\s+42/.test(o), hint: 'Use %8d.', solution: `printf("%8d\\n", 42);` },
      { id: 'p2', task: 'Print 3.14159 with exactly 2 decimal places.', check: o => o.includes('3.14'), hint: 'Use %.2f.', solution: `printf("%.2f\\n", 3.14159);` },
      { id: 'p3', task: 'Print "Hello" left-aligned in a 10-character field, followed by a pipe |.', check: o => /Hello\s+\|/.test(o), hint: 'Use %-10s then print the |.', solution: `printf("%-10s|\\n", "Hello");` },
      { id: 'p4', task: 'Print 7 zero-padded to 5 digits: 00007.', check: o => o.includes('00007'), hint: 'Use %05d.', solution: `printf("%05d\\n", 7);` },
      { id: 'p5', task: 'Print a mini table with two rows: "Alice" and grade 92.5%, "Bob" and grade 87.0%. Names in 10 chars left-aligned, grades in 6 chars with 1 decimal place right-aligned.', check: o => o.includes('Alice') && o.includes('Bob') && o.includes('92.5') && o.includes('87.0'), hint: 'Use %-10s and %6.1f for each row.', solution: `printf("%-10s %6.1f%%\\n", "Alice", 92.5);\nprintf("%-10s %6.1f%%\\n", "Bob", 87.0);` }
    ]

    renderPracticeSet('practice-ch3-modifiers', CH, topicId, practiceConfigs)

    QuizEngine.init({ containerId: 'quiz-ch3-modifiers-predict', questions: predictQuestions, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch3-modifiers-mcq', questions: mcqQuestions, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch3-modifiers-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'The output is misaligned. One format specifier has the width and precision swapped. Fix it.',
      includes: ['<stdio.h>'],
      starterCode: `printf("%-2.10s\\n", "Hi");
printf("%-10.2f\\n", 3.14);`,
      checkFn: (output) => output.includes('Hi') && /3\.14/.test(output),
      hint: 'In %-2.10s — a string truncated to 2 chars in a 10-char field? Or should the 10 be the width?',
      hintTwo: 'First line: %-10.2s makes more sense (width 10, truncate at 2 chars). Or simply %-10s.',
      solution: `printf("%-10s\\n", "Hi");\nprintf("%-10.2f\\n", 3.14);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — scanf()
     ══════════════════════════════════════════════════════════ */
  function initTopic_scanf() {
    const topicId = 'ch3-scanf'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch3-scanf-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int age;
float gpa;
printf("Enter age: ");
scanf("%d", &age);
printf("Enter GPA: ");
scanf("%f", &gpa);
printf("Age: %d, GPA: %.2f\\n", age, gpa);`,
      inputData: '20\n3.85\n',
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-scanf',
      question: 'The scanf() call uses &age instead of just age. What does the & do here?',
      options: [
        'It doubles the value of age',
        'It gives scanf() the memory address where age is stored',
        'It is optional — same as writing just age',
        'It converts age to a string'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — & is the "address-of" operator. scanf() needs to know where in memory to write the input.',
        incorrect: '& is the address-of operator. scanf() must receive a pointer to where the input should be stored, not the value itself.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch3-scanf-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch3-scanf-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the program to also read a char for the grade (A, B, C, D) and print it using %c.',
      includes: ['<stdio.h>'],
      starterCode: `int score;
printf("Enter score: ");
scanf("%d", &score);
printf("Score: %d\\n", score);`,
      inputData: '88\nA\n',
      checkFn: (output) => output.includes('88') && output.includes('A'),
      hint: 'Declare: char grade; then: scanf(" %c", &grade); (note the space before %c). Then printf the grade.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch3-scanf-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to read an int and a float correctly.',
      includes: ['<stdio.h>'],
      starterCode: `int qty;
float price;
[?]("%d", [?]qty);
[?]("%f", [?]price);
printf("Total: %.2f\\n", qty * price);`,
      inputData: '4\n2.50\n',
      blanks: ['scanf', '&', 'scanf', '&'],
      hint: 'The function that reads input is scanf(). Every variable needs & before it.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch3-scanf-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a mini calculator: read two integers from input. Print their sum, difference, and product, each on its own line.',
      includes: ['<stdio.h>'],
      starterCode: '',
      inputData: '10\n3\n',
      checkFn: (output) => output.includes('13') && output.includes('7') && output.includes('30'),
      hint: 'int a, b; scanf("%d", &a); scanf("%d", &b); then three printf() calls for sum, diff, product.',
      solution: `int a, b;\nprintf("Enter two numbers: ");\nscanf("%d", &a);\nscanf("%d", &b);\nprintf("Sum:      %d\\n", a + b);\nprintf("Diff:     %d\\n", a - b);\nprintf("Product:  %d\\n", a * b);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const identifyQ = [
      {
        id: 'ch3-scanf-id1', type: 'identify',
        question: 'What operator gives you the memory address of a variable in C?',
        correct: ['&', 'ampersand', 'address-of', '& operator'],
        caseSensitive: false, orderMatters: false,
        hint: 'You put it before the variable in scanf().',
        feedback: { correct: 'Correct — & is the address-of operator.', incorrect: '& is the address-of operator. scanf("%d", &x) passes the address of x.' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch3-scanf-m1', type: 'mcq',
        question: 'What is the correct way to read an integer with scanf()?',
        options: ['scanf("%d", x)', 'scanf("%d", &x)', 'scanf(x, "%d")', 'scanf(&"%d", x)'],
        correct: ['scanf("%d", &x)'], caseSensitive: true, orderMatters: false,
        hint: 'The & is required before the variable name.',
        feedback: { correct: 'Correct — &x passes the address. Without &, scanf would crash or corrupt memory.', incorrect: 'scanf() needs the address: scanf("%d", &x). Missing & is one of the most common C bugs.' }
      },
      {
        id: 'ch3-scanf-m2', type: 'mcq',
        question: 'What specifier reads a float with scanf()?',
        options: ['%d', '%lf', '%f', '%s'],
        correct: ['%f'], caseSensitive: true, orderMatters: false,
        hint: 'For float in scanf, use %f. For double, use %lf.',
        feedback: { correct: 'Correct — scanf uses %f for float (and %lf for double).', incorrect: 'scanf uses %f for float, %lf for double.' }
      },
      {
        id: 'ch3-scanf-m3', type: 'mcq',
        question: 'scanf() returns which value on successful input?',
        options: ['0', 'The value read', 'The number of items successfully read', '-1'],
        correct: ['The number of items successfully read'], caseSensitive: false, orderMatters: false,
        hint: 'You can check this to validate that input was actually read.',
        feedback: { correct: 'Correct — scanf returns how many items it successfully read. Useful for input validation.', incorrect: 'scanf() returns the count of successfully read items. If it returns 0, no input was matched.' }
      },
      {
        id: 'ch3-scanf-m4', type: 'mcq',
        question: 'What does scanf() do when it encounters whitespace in the format string (like a space)?',
        options: ['Requires the user to type a space', 'Skips all whitespace in the input', 'Stops reading', 'Prints a space'],
        correct: ['Skips all whitespace in the input'], caseSensitive: false, orderMatters: false,
        hint: 'Whitespace in the format string is a "skip whitespace" instruction.',
        feedback: { correct: 'Correct — a space in the format string tells scanf() to skip any whitespace (spaces, tabs, newlines).', incorrect: 'A space in scanf\'s format string skips whitespace in the input stream.' }
      },
      {
        id: 'ch3-scanf-m5', type: 'mcq',
        question: 'You declare: int score; What is wrong with: scanf("%d", score);',
        options: ['Nothing — it is correct', 'Wrong specifier — should be %f', 'Missing & — should be &score', 'score must be initialized first'],
        correct: ['Missing & — should be &score'], caseSensitive: false, orderMatters: false,
        hint: 'scanf needs the address, not the value.',
        feedback: { correct: 'Correct — without &, scanf receives the garbage value of score as an address, causing a crash.', incorrect: 'The & is missing. It must be scanf("%d", &score). Without it, scanf crashes.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch3-scanf-mcq', questions: mcqQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch3-scanf-identify', questions: identifyQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch3-scanf-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program has the most common scanf() bug. Fix it.',
      includes: ['<stdio.h>'],
      starterCode: `int number;\nprintf("Enter a number: ");\nscanf("%d", number);\nprintf("You entered: %d\\n", number);`,
      inputData: '42\n',
      checkFn: (output) => output.includes('42'),
      hint: 'Look at the scanf() call. Compare it to the correct pattern: scanf("%d", &variable)',
      hintTwo: 'The & is missing before number. It should be &number so scanf knows where to write.',
      solution: `int number;\nprintf("Enter a number: ");\nscanf("%d", &number);\nprintf("You entered: %d\\n", number);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — MULTIPLE INPUTS
     ══════════════════════════════════════════════════════════ */
  function initTopic_multi() {
    const topicId = 'ch3-multi'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch3-multi-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int day, month, year;
printf("Enter date (dd mm yyyy): ");
scanf("%d %d %d", &day, &month, &year);
printf("Date: %02d/%02d/%04d\\n", day, month, year);`,
      inputData: '15 6 2024\n',
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-multi',
      question: 'One scanf() read all three values. What separated the numbers in the input?',
      options: ['Commas (15,6,2024)', 'Spaces (15 6 2024)', 'Semicolons (15;6;2024)', 'Nothing — they were typed together'],
      correctIndex: 1,
      feedback: {
        correct: 'Right — scanf() with "%d %d %d" reads three space-separated integers from the input.',
        incorrect: 'scanf() uses whitespace (spaces, tabs, newlines) as separators between values. 15 6 2024 is space-separated.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch3-multi-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch3-multi-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the program to read three values using separate scanf() calls instead of one.',
      includes: ['<stdio.h>'],
      starterCode: `int a, b, c;
scanf("%d %d %d", &a, &b, &c);
printf("%d %d %d\\n", a, b, c);`,
      inputData: '10\n20\n30\n',
      checkFn: (output) => output.includes('10') && output.includes('20') && output.includes('30'),
      hint: 'Three separate scanf("%d", &var) calls, one per variable.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch3-multi-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to read a name and two test scores, then print the average.',
      includes: ['<stdio.h>'],
      starterCode: `char name[50];
int s1, s2;
scanf("[?]", name);
scanf("[?] [?]", [?]s1, [?]s2);
printf("%s avg: %.1f\\n", name, (s1 + s2) / 2.0);`,
      inputData: 'Ana\n85 91\n',
      blanks: ['%s', '%d', '%d', '&', '&'],
      hint: 'String: %s (no & needed for char arrays). Ints: %d %d with & before each.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch3-multi-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a rectangle calculator. Read width and height as integers. Print the area and perimeter on separate lines.',
      includes: ['<stdio.h>'],
      starterCode: '',
      inputData: '5\n8\n',
      checkFn: (output) => output.includes('40') && output.includes('26'),
      hint: 'Area = width * height. Perimeter = 2 * (width + height).',
      solution: `int w, h;\nprintf("Width: ");\nscanf("%d", &w);\nprintf("Height: ");\nscanf("%d", &h);\nprintf("Area:      %d\\n", w * h);\nprintf("Perimeter: %d\\n", 2 * (w + h));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const mcqQ = [
      {
        id: 'ch3-multi-m1', type: 'mcq',
        question: 'What does scanf("%d %d", &a, &b) expect as input?',
        options: ['Two integers separated by a comma', 'Two integers separated by whitespace', 'One integer only', 'Two integers on separate lines only'],
        correct: ['Two integers separated by whitespace'], caseSensitive: false, orderMatters: false,
        hint: 'A space in the format string means "skip whitespace".',
        feedback: { correct: 'Correct — whitespace in the format string matches any whitespace (space, tab, or newline) in the input.', incorrect: 'scanf reads whitespace-separated values. Space, tab, or newline all work as separators.' }
      },
      {
        id: 'ch3-multi-m2', type: 'mcq',
        question: 'Can you read multiple values with a single scanf() call?',
        options: ['No — one scanf per value', 'Yes — list multiple specifiers and variables', 'Only for integers', 'Only if they are the same type'],
        correct: ['Yes — list multiple specifiers and variables'], caseSensitive: false, orderMatters: false,
        hint: 'scanf("%d %d %f", &a, &b, &c) reads three values at once.',
        feedback: { correct: 'Correct — one scanf() can read many values at once.', incorrect: 'A single scanf() call can read multiple values: scanf("%d %d", &a, &b).' }
      },
      {
        id: 'ch3-multi-m3', type: 'mcq',
        question: 'How do you read a char array (string) with scanf?',
        options: ['scanf("%s", &name)', 'scanf("%s", name)', 'scanf("%c", name)', 'scanf("%s", *name)'],
        correct: ['scanf("%s", name)'], caseSensitive: true, orderMatters: false,
        hint: 'String (char array) already decays to a pointer — no & needed.',
        feedback: { correct: 'Correct — char arrays decay to a pointer automatically. No & needed: scanf("%s", name).', incorrect: 'For char arrays, the name itself is already an address. Write scanf("%s", name) without &.' }
      },
      {
        id: 'ch3-multi-m4', type: 'mcq',
        question: 'What does scanf stop reading at for %s?',
        options: ['End of line (\\n)', 'Whitespace (space, tab, newline)', 'End of file only', 'After 10 characters always'],
        correct: ['Whitespace (space, tab, newline)'], caseSensitive: false, orderMatters: false,
        hint: '%s stops at any whitespace. So "Hello World" only reads "Hello".',
        feedback: { correct: 'Right — %s stops at whitespace, so it reads one word at a time.', incorrect: '%s stops at whitespace. To read a full line, use fgets() instead.' }
      },
      {
        id: 'ch3-multi-m5', type: 'mcq',
        question: 'You want to read: name (string), age (int), gpa (float). Which scanf reads all three at once?',
        options: [
          'scanf("%s%d%f", name, age, gpa)',
          'scanf("%s %d %f", name, &age, &gpa)',
          'scanf("%s%d%f", &name, &age, &gpa)',
          'scanf(name, age, gpa)'
        ],
        correct: ['scanf("%s %d %f", name, &age, &gpa)'], caseSensitive: true, orderMatters: false,
        hint: 'String: no &. Int and float: need &.',
        feedback: { correct: 'Correct — name is already a pointer (no &), but &age and &gpa are needed.', incorrect: 'name = no & (char array is already a pointer). age and gpa = need &.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch3-multi-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch3-multi-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program reads two values but only prints one correctly. Find the bug.',
      includes: ['<stdio.h>'],
      starterCode: `int x, y;\nscanf("%d %d", x, &y);\nprintf("x=%d y=%d\\n", x, y);`,
      inputData: '5 10\n',
      checkFn: (output) => output.includes('5') && output.includes('10'),
      hint: 'Look at each variable in the scanf() call. Do all of them have &?',
      hintTwo: 'x is missing &. It should be &x.',
      solution: `int x, y;\nscanf("%d %d", &x, &y);\nprintf("x=%d y=%d\\n", x, y);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 6 — INPUT BUFFER
     ══════════════════════════════════════════════════════════ */
  function initTopic_buffer() {
    const topicId = 'ch3-buffer'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch3-buffer-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int age;
char grade;
printf("Enter age: ");
scanf("%d", &age);
/* Without the space before %c, grade would read the leftover \\n */
printf("Enter grade: ");
scanf(" %c", &grade);
printf("Age: %d, Grade: %c\\n", age, grade);`,
      inputData: '20\nA\n',
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-buffer',
      question: 'The scanf for grade uses " %c" (with a space). If you removed the space and used just "%c", what would grade contain?',
      options: [
        'The letter A — no difference',
        'The newline (\\n) left over from the previous input',
        'A random character',
        'The number 20 from the previous scanf'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — after reading 20, the \\n from pressing Enter stays in the buffer. "%c" reads it immediately. The space in " %c" discards it first.',
        incorrect: 'After reading 20, the newline key you pressed stays in the input buffer. "%c" would read that \\n. The space in " %c" tells scanf to skip all whitespace first.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch3-buffer-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch3-buffer-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'This version is broken — grade reads the newline. Fix it by adding a space before %c in the second scanf.',
      includes: ['<stdio.h>'],
      starterCode: `int score;
char letter;
scanf("%d", &score);
scanf("%c", &letter);
printf("Score: %d, Letter: %c\\n", score, letter);`,
      inputData: '95\nA\n',
      checkFn: (output) => output.includes('95') && output.includes('A'),
      hint: 'Change scanf("%c", &letter) to scanf(" %c", &letter) — the space before %c is the fix.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch3-buffer-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct scanf calls to read an int then two chars without the buffer bug.',
      includes: ['<stdio.h>'],
      starterCode: `int n;
char a, b;
scanf("[?]", &n);
scanf("[?]", &a);
scanf("[?]", &b);
printf("%d %c %c\\n", n, a, b);`,
      inputData: '5\nX\nY\n',
      blanks: ['%d', ' %c', ' %c'],
      hint: 'After reading an int, every subsequent %c needs a leading space: " %c"',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch3-buffer-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Read a student name (string), an exam score (int), and a grade letter (char). Print all three. Fix any buffer issues.',
      includes: ['<stdio.h>'],
      starterCode: '',
      inputData: 'Ana\n88\nB\n',
      checkFn: (output) => output.includes('Ana') && output.includes('88') && output.includes('B'),
      hint: 'Read string with scanf("%s", name). Read int with scanf("%d", &score). Read char with scanf(" %c", &grade) — note the space!',
      solution: `char name[50];\nint score;\nchar grade;\nscanf("%s", name);\nscanf("%d", &score);\nscanf(" %c", &grade);\nprintf("Name:  %s\\n", name);\nprintf("Score: %d\\n", score);\nprintf("Grade: %c\\n", grade);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const mcqQ = [
      {
        id: 'ch3-buf-m1', type: 'mcq',
        question: 'After scanf("%d", &n), what remains in the input buffer?',
        options: ['Nothing', 'The newline character (\\n)', 'The number itself', 'A space'],
        correct: ['The newline character (\\n)'], caseSensitive: false, orderMatters: false,
        hint: 'When you press Enter to confirm input, that Enter key stays in the buffer.',
        feedback: { correct: 'Correct — scanf("%d") reads the number but leaves the \\n in the buffer.', incorrect: 'The \\n from pressing Enter stays behind after scanf reads the integer.' }
      },
      {
        id: 'ch3-buf-m2', type: 'mcq',
        question: 'What does the space in scanf(" %c", &c) do?',
        options: ['Reads a space character', 'Skips all whitespace before reading the char', 'Adds a space to the output', 'Has no effect'],
        correct: ['Skips all whitespace before reading the char'], caseSensitive: false, orderMatters: false,
        hint: 'Whitespace in format string = skip whitespace in input.',
        feedback: { correct: 'Correct — the space in " %c" consumes any pending whitespace including newlines.', incorrect: 'A space in the format string skips whitespace. This clears the buffer before reading a char.' }
      },
      {
        id: 'ch3-buf-m3', type: 'mcq',
        question: 'Which function reads and discards one character from the buffer?',
        options: ['clearBuffer()', 'flush()', 'getchar()', 'ignore()'],
        correct: ['getchar()'], caseSensitive: true, orderMatters: false,
        hint: 'You call this to eat the leftover newline.',
        feedback: { correct: 'Correct — getchar() reads (and discards) one character, often used to consume a stray \\n.', incorrect: 'getchar() reads one character. Used after reading a number: getchar(); discards the \\n.' }
      },
      {
        id: 'ch3-buf-m4', type: 'mcq',
        question: 'Does scanf("%d", &n) work correctly after fflush(stdin) on Linux?',
        options: ['Yes — fflush always clears the buffer', 'No — fflush(stdin) is undefined behavior on Linux/GCC', 'Yes — fflush is cross-platform', 'fflush only works for output buffers'],
        correct: ['No — fflush(stdin) is undefined behavior on Linux/GCC'], caseSensitive: false, orderMatters: false,
        hint: 'fflush is only defined for output streams in the C standard.',
        feedback: { correct: 'Correct — fflush(stdin) works on Windows MSVC but is undefined on Linux. Use the " %c" space trick instead.', incorrect: 'fflush(stdin) is undefined behavior in standard C. The safe solution is " %c" with a leading space.' }
      },
      {
        id: 'ch3-buf-m5', type: 'mcq',
        question: 'What is the safest way to read a full line including spaces in C?',
        options: ['scanf("%s", line)', 'scanf("%100s", line)', 'fgets(line, 100, stdin)', 'gets(line)'],
        correct: ['fgets(line, 100, stdin)'], caseSensitive: true, orderMatters: false,
        hint: 'fgets is safer than gets and reads the whole line.',
        feedback: { correct: 'Correct — fgets reads a full line with a size limit. gets() is banned (unsafe). scanf %s stops at whitespace.', incorrect: 'fgets(line, sizeof(line), stdin) is the standard safe way to read a full line.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch3-buffer-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch3-buffer-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program skips the char input entirely. Fix the buffer bug.',
      includes: ['<stdio.h>'],
      starterCode: `int x;\nchar c;\nscanf("%d", &x);\nscanf("%c", &c);\nprintf("x=%d c=%c\\n", x, c);`,
      inputData: '7\nZ\n',
      checkFn: (output) => output.includes('7') && output.includes('Z'),
      hint: 'After reading the int, a \\n is stuck in the buffer. The %c reads it instead of Z.',
      hintTwo: 'Fix: change scanf("%c", &c) to scanf(" %c", &c) — add a space before %c.',
      solution: `int x;\nchar c;\nscanf("%d", &x);\nscanf(" %c", &c);\nprintf("x=%d c=%c\\n", x, c);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 7 — getchar() AND putchar()
     ══════════════════════════════════════════════════════════ */
  function initTopic_getchar() {
    const topicId = 'ch3-getchar'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch3-getchar-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `int c;
printf("Reading characters until Enter:\\n");
while ((c = getchar()) != '\\n') {
    putchar(c);
}
putchar('\\n');
printf("Done.\\n");`,
      inputData: 'Hello\n',
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-getchar',
      question: 'getchar() stores its result in an int, not a char. Why int instead of char?',
      options: [
        'Characters are automatically integers in C',
        'int can also hold EOF (-1), which char cannot reliably represent',
        'It is just a style preference',
        'getchar() returns 0 or 1 only'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — EOF is -1 and may not fit in a char (especially unsigned char). An int holds both chars and EOF.',
        incorrect: 'getchar() must return EOF (-1) when input ends. A char might not hold -1 reliably. int handles both character values and EOF.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch3-getchar-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch3-getchar-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Modify the loop to count and print how many characters were typed (not counting the newline).',
      includes: ['<stdio.h>'],
      starterCode: `int c;
while ((c = getchar()) != '\\n') {
    putchar(c);
}
putchar('\\n');`,
      inputData: 'Hello\n',
      checkFn: (output) => output.includes('5') || output.includes('Hello'),
      hint: 'Add: int count = 0; then count++ inside the loop. printf the count after the loop.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch3-getchar-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Complete the program that uses putchar() to print each character of a string literal one at a time.',
      includes: ['<stdio.h>'],
      starterCode: `char msg[] = "Hi!";
int i = 0;
while (msg[i] != '\\0') {
    [?](msg[i]);
    i[?];
}
[?]('\\n');`,
      blanks: ['putchar', '++', 'putchar'],
      hint: 'putchar() takes one char. Increment i with ++. Print newline at the end.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch3-getchar-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Using getchar() in a loop, read all characters until a newline. Count how many vowels (a, e, i, o, u — lowercase) appear. Print the count.',
      includes: ['<stdio.h>'],
      starterCode: '',
      inputData: 'programming\n',
      checkFn: (output) => output.includes('3'),
      hint: 'Inside the loop, check if c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\'. Increment a vowel counter.',
      solution: `int c, vowels = 0;\nwhile ((c = getchar()) != '\\n') {\n    if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') vowels++;\n}\nprintf("Vowels: %d\\n", vowels);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch3-gc-p1', type: 'predict',
        question: 'What prints?',
        code: `putchar('H');\nputchar('i');\nputchar('\\n');`,
        correct: ['Hi'],
        caseSensitive: true, orderMatters: true,
        hint: 'putchar prints one char at a time.',
        feedback: { correct: 'Right — H then i then a newline.', incorrect: 'putchar(\'H\') prints H, putchar(\'i\') prints i, putchar(\'\\n\') goes to a new line. Output: Hi' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch3-gc-m1', type: 'mcq',
        question: 'What does getchar() return when there is no more input?',
        options: ['0', 'null', 'EOF', 'An empty string'],
        correct: ['EOF'], caseSensitive: true, orderMatters: false,
        hint: 'EOF is a constant defined in stdio.h.',
        feedback: { correct: 'Correct — EOF (End Of File) is returned when input ends. Its value is usually -1.', incorrect: 'getchar() returns the constant EOF when input ends. It\'s defined in stdio.h as -1.' }
      },
      {
        id: 'ch3-gc-m2', type: 'mcq',
        question: 'Why is the return value of getchar() stored in int, not char?',
        options: ['Speed — int is faster', 'char cannot represent EOF (-1) reliably', 'getchar requires int arguments', 'Style convention only'],
        correct: ['char cannot represent EOF (-1) reliably'], caseSensitive: false, orderMatters: false,
        hint: 'EOF is -1 on most systems.',
        feedback: { correct: 'Correct — EOF = -1 may not fit in char. int is used so you can check for EOF reliably.', incorrect: 'EOF is typically -1. A char (especially unsigned char) may not hold -1 correctly. Use int.' }
      },
      {
        id: 'ch3-gc-m3', type: 'mcq',
        question: 'putchar(65) prints which character?',
        options: ['65', 'A', 'a', 'Nothing'],
        correct: ['A'], caseSensitive: true, orderMatters: false,
        hint: 'ASCII 65 = ?',
        feedback: { correct: 'Correct — ASCII 65 is the letter A.', incorrect: 'putchar(65) treats 65 as an ASCII code. ASCII 65 = A.' }
      },
      {
        id: 'ch3-gc-m4', type: 'mcq',
        question: 'What does this loop do?\nwhile ((c = getchar()) != EOF) putchar(c);',
        options: ['Reads nothing', 'Reads and echoes input until end of file', 'Reads one character then stops', 'Runs forever unconditionally'],
        correct: ['Reads and echoes input until end of file'], caseSensitive: false, orderMatters: false,
        hint: 'Read char → compare to EOF → if not EOF, print it → repeat.',
        feedback: { correct: 'Correct — this is the classic C program to echo input to output.', incorrect: 'The loop reads a char, checks for EOF, and echoes it back. It runs until input ends.' }
      },
      {
        id: 'ch3-gc-m5', type: 'mcq',
        question: 'When is getchar() more appropriate than scanf("%c")?',
        options: ['Never — scanf is always better', 'When reading single chars in loops, especially for processing input streams', 'Only when reading numbers', 'When the program has no int variables'],
        correct: ['When reading single chars in loops, especially for processing input streams'], caseSensitive: false, orderMatters: false,
        hint: 'getchar() is the classic tool for character-by-character input processing.',
        feedback: { correct: 'Right — getchar() is fast and clean for character loops. scanf is better for typed structured input.', incorrect: 'getchar() excels at reading input character-by-character in loops and stream processing.' }
      }
    ]

    QuizEngine.init({ containerId: 'quiz-ch3-getchar-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch3-getchar-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

    CCompiler.initBlock($('compiler-ch3-getchar-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'This program stores getchar() result in char. On some systems it fails to detect EOF. Fix the type.',
      includes: ['<stdio.h>'],
      starterCode: `char c;\nwhile ((c = getchar()) != EOF) {\n    putchar(c);\n}`,
      inputData: 'AB\n',
      checkFn: (output) => output.includes('AB') || output.includes('A'),
      hint: 'What type should c be to safely hold EOF?',
      hintTwo: 'Change char c to int c. EOF is -1 which may not fit in a signed or unsigned char.',
      solution: `int c;\nwhile ((c = getchar()) != EOF) {\n    putchar(c);\n}`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 8 — COLUMN ALIGNMENT
     ══════════════════════════════════════════════════════════ */
  function initTopic_columns() {
    const topicId = 'ch3-columns'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch3-columns-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode: `printf("%-15s %6s %8s\\n", "Name", "Grade", "Score");
printf("%-15s %6s %8s\\n", "---------------", "------", "--------");
printf("%-15s %6c %8.2f\\n", "Alice Tan", 'A', 97.50);
printf("%-15s %6c %8.2f\\n", "Bob Cruz", 'B', 83.10);
printf("%-15s %6c %8.2f\\n", "Charlie Wu", 'C', 74.00);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch3-columns',
      question: 'Every data row uses the same format string as the header. Why does this produce aligned columns?',
      options: [
        'C automatically aligns output in tables',
        'Using the same field widths in every row ensures values line up vertically',
        'printf has a special table mode',
        'The separator line forces alignment'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Exactly — consistent field widths across all rows create visual alignment. Change one and the whole column shifts.',
        incorrect: 'Consistent field widths (%-15s, %6c, %8.2f) in every row are what create alignment. It is manual — printf has no table mode.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch3-columns-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch3-columns-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a fourth row for "Diana Park" with grade A and score 99.75. Keep the same format string.',
      includes: ['<stdio.h>'],
      starterCode: `printf("%-15s %6c %8.2f\\n", "Alice", 'A', 97.50);
printf("%-15s %6c %8.2f\\n", "Bob", 'B', 83.10);`,
      checkFn: (output) => output.includes('Diana') && output.includes('99.75'),
      hint: 'Copy the format: printf("%-15s %6c %8.2f\\n", "Diana Park", \'A\', 99.75);',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch3-columns-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the format specifiers to produce a left-aligned 12-char name column and a right-aligned 8-char price column with 2 decimals.',
      includes: ['<stdio.h>'],
      starterCode: `printf("[?] [?]\\n", "Coffee", 3.50);
printf("[?] [?]\\n", "Tea", 2.25);
printf("[?] [?]\\n", "Juice", 4.00);`,
      blanks: ['%-12s', '%8.2f', '%-12s', '%8.2f', '%-12s', '%8.2f'],
      hint: 'Name: %-12s (left-aligned, 12 chars). Price: %8.2f (right-aligned, 8 chars, 2 decimals).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch3-columns-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a formatted invoice with at least 4 columns: Item (20 chars, left), Qty (5 chars, right), Price (8 chars, right, 2 dec), Total (10 chars, right, 2 dec). Include a header row and at least 3 product rows.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: (output) => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length >= 4
      },
      hint: 'Header: printf("%-20s %5s %8s %10s\\n", "Item", "Qty", "Price", "Total"); Data row: printf("%-20s %5d %8.2f %10.2f\\n", name, qty, price, qty*price);',
      solution: `printf("%-20s %5s %8s %10s\\n", "Item", "Qty", "Price", "Total");\nprintf("%-20s %5s %8s %10s\\n", "----", "---", "-----", "-----");\nprintf("%-20s %5d %8.2f %10.2f\\n", "Widget", 3, 9.99, 3*9.99);\nprintf("%-20s %5d %8.2f %10.2f\\n", "Gadget", 1, 24.99, 24.99);\nprintf("%-20s %5d %8.2f %10.2f\\n", "Doohickey", 5, 3.49, 5*3.49);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    const predictQ = [
      {
        id: 'ch3-col-p1', type: 'predict',
        question: 'What does this print? (exact spacing matters)',
        code: `printf("[%-8s][%8s]\\n", "left", "right");`,
        correct: ['[left    ][   right]'],
        caseSensitive: true, orderMatters: true,
        hint: '%-8s pads on the right, %8s pads on the left.',
        feedback: { correct: 'Correct — %-8s left-aligns "left" with 4 trailing spaces; %8s right-aligns "right" with 3 leading spaces.', incorrect: '%-8s → "left    " (4 trailing spaces). %8s → "   right" (3 leading spaces).' }
      },
      {
        id: 'ch3-col-p2', type: 'predict',
        question: 'What prints?',
        code: `printf("%10.2f\\n", 3.1);`,
        correct: ['      3.10'],
        caseSensitive: true, orderMatters: true,
        hint: 'Total width 10, 2 decimal places, right-aligned.',
        feedback: { correct: 'Correct — 3.10 is 4 chars, padded with 6 spaces to fill width 10.', incorrect: '%10.2f: 3.1 rounds to 3.10 (4 chars), right-aligned in 10 = 6 spaces + 3.10' }
      },
      {
        id: 'ch3-col-p3', type: 'predict',
        question: 'What prints?',
        code: `printf("%-5d|%-5d\\n", 1, 100);`,
        correct: ['1    |100  '],
        caseSensitive: true, orderMatters: true,
        hint: '%-5d left-aligns each int in a 5-char field.',
        feedback: { correct: 'Right — 1 in 5 chars left-aligned = "1    "; 100 = "100  ".', incorrect: '%-5d left-aligns. 1 → "1    ", 100 → "100  ".' }
      }
    ]

    const mcqQ = [
      {
        id: 'ch3-col-m1', type: 'mcq',
        question: 'What causes columns to misalign in printf() output?',
        options: ['Using too many format specifiers', 'Using different field widths across rows', 'Printing too many rows', 'Using %f for floats'],
        correct: ['Using different field widths across rows'], caseSensitive: false, orderMatters: false,
        hint: 'Consistency is the key to alignment.',
        feedback: { correct: 'Correct — if you use %10s in the header but %15s in data rows, the columns will not line up.', incorrect: 'Columns only align when every row uses the same field widths for the same columns.' }
      },
      {
        id: 'ch3-col-m2', type: 'mcq',
        question: 'What is the best way to print a separator line under a header?',
        options: [
          'Use a special separator printf()',
          'Print a string of dashes ("-----------") with the same widths as the header fields',
          'C automatically draws separator lines',
          'Use \\h escape sequence'
        ],
        correct: ['Print a string of dashes ("-----------") with the same widths as the header fields'], caseSensitive: false, orderMatters: false,
        hint: 'You just print dashes using the same format string.',
        feedback: { correct: 'Correct — use the same format string with a dash string like "------" for each column.', incorrect: 'Use the same format: printf("%-15s...", "-------"); with dashes matching the column width.' }
      },
      {
        id: 'ch3-col-m3', type: 'mcq',
        question: 'Which specifier right-aligns an integer in a field of 6?',
        options: ['%-6d', '%6d', '%r6d', '%6i'],
        correct: ['%6d'], caseSensitive: true, orderMatters: false,
        hint: 'Without the - flag, alignment is right by default.',
        feedback: { correct: 'Correct — %6d right-aligns in a 6-char field.', incorrect: '%6d right-aligns. %-6d left-aligns.' }
      },
      {
        id: 'ch3-col-m4', type: 'mcq',
        question: 'To print a literal percent sign (%) in printf, you write:',
        options: ['\\%', '/%', '%%', '&%'],
        correct: ['%%'], caseSensitive: true, orderMatters: false,
        hint: 'Escape it by doubling.',
        feedback: { correct: 'Correct — %% prints a single % character.', incorrect:'%% is the escape for a literal percent sign in printf().' }
      },
      {
        id: 'ch3-col-m5', type: 'mcq',
        question: 'In %-20s, what does the 20 set?',
        options: ['Maximum characters to read', 'Minimum field width in characters', 'The font size', 'Number of columns in the terminal'],
        correct: ['Minimum field width in characters'], caseSensitive: false, orderMatters: false,
        hint: 'Width is always a minimum.',
        feedback: { correct: 'Correct — 20 is the minimum field width. A longer string overrides it.', incorrect: '20 is the minimum field width. The string will never be truncated by width — only by precision.' }
      }
    ]

    const practiceConfigs = [
      { id: 'p1', task: 'Print a two-column header: "Product" left-aligned in 15 chars, "Price" right-aligned in 8 chars.', check: o => o.includes('Product') && o.includes('Price'), hint: 'printf("%-15s %8s\\n", "Product", "Price");', solution: `printf("%-15s %8s\\n", "Product", "Price");` },
      { id: 'p2', task: 'Print two rows of product data under the header with the same widths.', check: o => o.split('\n').filter(l => l.trim()).length >= 2, hint: 'printf("%-15s %8.2f\\n", "Apple", 1.25); — twice with different values.', solution: `printf("%-15s %8.2f\\n", "Apple", 1.25);\nprintf("%-15s %8.2f\\n", "Banana", 0.75);` },
      { id: 'p3', task: 'Print a percentage with exactly 1 decimal place and a % sign: 87.5%', check: o => o.includes('87.5%') || o.includes('87.5 %'), hint: 'Use %.1f%% — the %% prints a literal percent sign.', solution: `printf("%.1f%%\\n", 87.5);` },
      { id: 'p4', task: 'Build a 3-column table with Name, Score, and Passed?. At least two rows. Passed if score >= 75.', check: o => (o.includes('Yes') || o.includes('No')) && o.split('\n').filter(l=>l.trim()).length >= 3, hint: 'Use %s for the Passed column: score >= 75 ? "Yes" : "No".', solution: `int s1=90, s2=60;\nprintf("%-10s %6s %8s\\n", "Name", "Score", "Passed?");\nprintf("%-10s %6d %8s\\n", "Alice", s1, s1>=75?"Yes":"No");\nprintf("%-10s %6d %8s\\n", "Bob", s2, s2>=75?"Yes":"No");` },
      { id: 'p5', task: 'Build a full receipt: at least 3 items with name, unit price, quantity, and total cost. Include a final TOTAL row.', check: o => o.split('\n').filter(l=>l.trim()).length >= 5, hint: 'Total = price * qty. Use %-12s %6.2f %4d %8.2f per row.', solution: `float t1=2*3.99, t2=1*12.50, t3=4*0.99;\nprintf("%-12s %6s %4s %8s\\n", "Item", "Price", "Qty", "Total");\nprintf("%-12s %6.2f %4d %8.2f\\n", "Coffee", 3.99, 2, t1);\nprintf("%-12s %6.2f %4d %8.2f\\n", "Sandwich", 12.50, 1, t2);\nprintf("%-12s %6.2f %4d %8.2f\\n", "Muffin", 0.99, 4, t3);\nprintf("%-12s %6s %4s %8.2f\\n", "TOTAL", "", "", t1+t2+t3);` }
    ]

    renderPracticeSet('practice-ch3-columns', CH, topicId, practiceConfigs)

    QuizEngine.init({ containerId: 'quiz-ch3-columns-predict', questions: predictQ, onComplete: () => {} })
    QuizEngine.init({ containerId: 'quiz-ch3-columns-mcq', questions: mcqQ, onComplete: () => {} })

    CCompiler.initBlock($('compiler-ch3-columns-debug'), {
      mode: 'debug', topicId, chapterId: CH,
      question: 'The header and data rows use different field widths so columns are misaligned. Fix it.',
      includes: ['<stdio.h>'],
      starterCode: `printf("%-10s %5s\\n", "Name", "Score");
printf("%-20s %5d\\n", "Alice", 95);
printf("%-20s %5d\\n", "Bob", 82);`,
      checkFn: (output) => {
        const lines = output.trim().split('\n')
        return lines.length >= 3
      },
      hint: 'The header uses %-10s but the data uses %-20s. Which width should they all use?',
      hintTwo: 'Change the header to %-20s so it matches the data rows width.',
      solution: `printf("%-20s %5s\\n", "Name", "Score");\nprintf("%-20s %5d\\n", "Alice", 95);\nprintf("%-20s %5d\\n", "Bob", 82);`,
      onPass: () => {}
    })

    setupAssessmentTabs(topicId)
  }

  /* ══════════════════════════════════════════════════════════
     CHAPTER 3 MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch3-mastery'), {
      mode: 'build',
      topicId: 'ch3-mastery',
      chapterId: CH,
      question: 'Build a student report card program.\n\n① Read 3 student names and 2 test scores each (6 scanf calls total — use pre-filled input below).\n② Compute each student\'s average.\n③ Print a formatted table with columns: Name (left, 15 chars), Score1 (right, 7), Score2 (right, 7), Average (right, 8, 2 decimals).\n④ Print a separator line under the header.\n⑤ Assign a letter grade: ≥90→A, ≥80→B, ≥70→C, else→D. Print it in a 6-char Grade column.',
      includes: ['<stdio.h>'],
      starterCode: '',
      inputData: 'Alice\n92 88\nBob\n75 68\nCarol\n95 97\n',
      checkFn: (output) => {
        return output.includes('Alice') && output.includes('Bob') && output.includes('Carol') &&
               (output.includes('90') || output.includes('90.0')) &&
               output.includes('A') && output.includes('C')
      },
      hint: 'Use three struct-like scanf blocks. Compute avg = (s1 + s2) / 2.0. For grade: avg >= 90 ? \'A\' : avg >= 80 ? \'B\' : avg >= 70 ? \'C\' : \'D\'.',
      solution: `char n1[50], n2[50], n3[50];
int a1,b1,a2,b2,a3,b3;
scanf("%s", n1); scanf("%d %d", &a1, &b1);
scanf("%s", n2); scanf("%d %d", &a2, &b2);
scanf("%s", n3); scanf("%d %d", &a3, &b3);
double avg1=(a1+b1)/2.0, avg2=(a2+b2)/2.0, avg3=(a3+b3)/2.0;
char g1=avg1>=90?'A':avg1>=80?'B':avg1>=70?'C':'D';
char g2=avg2>=90?'A':avg2>=80?'B':avg2>=70?'C':'D';
char g3=avg3>=90?'A':avg3>=80?'B':avg3>=70?'C':'D';
printf("%-15s %7s %7s %8s %6s\\n","Name","Score1","Score2","Average","Grade");
printf("%-15s %7s %7s %8s %6s\\n","---------------","-------","-------","--------","------");
printf("%-15s %7d %7d %8.2f %6c\\n",n1,a1,b1,avg1,g1);
printf("%-15s %7d %7d %8.2f %6c\\n",n2,a2,b2,avg2,g2);
printf("%-15s %7d %7d %8.2f %6c\\n",n3,a3,b3,avg3,g3);`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch3-chapter-complete').style.display = 'block'
        $('ch3-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch3-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch4')
    })
  }

  /* ══════════════════════════════════════════════════════════
     SHARED UTILITIES
     ══════════════════════════════════════════════════════════ */

  /* Assessment tab switching */
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

  /* Render coding practice sets */
  function renderPracticeSet(containerId, chapterId, topicId, configs) {
    const container = $(containerId)
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

      const taskHeader = el('div', 'practice-task__header')
      taskHeader.innerHTML = `<span class="practice-task__num">Task ${idx + 1} of ${configs.length}</span><span class="practice-task__dots">${configs.map((_, i) => `<span class="dot ${i < idx ? 'dot--done' : i === idx ? 'dot--active' : ''}"></span>`).join('')}</span>`
      container.appendChild(taskHeader)

      const taskDesc = el('p', 'practice-task__desc', cfg.task)
      container.appendChild(taskDesc)

      const compilerDiv = el('div', 'compiler-block')
      compilerDiv.id = `practice-compiler-${topicId}-${cfg.id}`
      container.appendChild(compilerDiv)

      CCompiler.initBlock(compilerDiv, {
        mode: 'build',
        topicId: topicId + '-practice-' + cfg.id,
        chapterId,
        question: null,
        includes: ['<stdio.h>'],
        starterCode: '',
        checkFn: cfg.check,
        hint: cfg.hint,
        solution: cfg.solution,
        onPass: () => {
          Progress.saveStepComplete(chapterId, topicId, 'practice-' + cfg.id)
          currentIdx++
          setTimeout(() => renderTask(currentIdx), 800)
        }
      })
    }

    renderTask(currentIdx)
  }

  /* ══════════════════════════════════════════════════════════
     INIT — run after DOM is ready
     ══════════════════════════════════════════════════════════ */
  function init() {
    initTopic_printf()
    initTopic_format()
    initTopic_modifiers()
    initTopic_scanf()
    initTopic_multi()
    initTopic_buffer()
    initTopic_getchar()
    initTopic_columns()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
