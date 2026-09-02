/* =========================================================
   C LEARNING PLATFORM — chapters/ch16-pointers/ch16.js
   Chapter 16: Pointers
   11 topics · 7-step structure · Assessment opens as popup modal
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch16'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — WHAT IS A POINTER?
     ══════════════════════════════════════════════════════════ */
  function initTopic_what() {
    const topicId = 'ch16-what'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-what-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int x = 42;
int *p = &x;

printf("Value of x:       %d\\n", x);
printf("Address of x:     %p\\n", (void*)&x);
printf("Value stored in p: %p\\n", (void*)p);
printf("Value AT address p: %d\\n", *p);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-what',
      question: 'p stores an address and *p gives you the value at that address. What is the relationship between p and &x?',
      options: [
        'p is a copy of x — they store the same value',
        'p and &x are the same address — p holds where x lives in memory',
        'p is always larger than &x',
        '*p and x are different variables'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — p = &x means p holds the address of x. p and &x print the same hex address. *p reads through that address to get x\'s value.',
        incorrect: 'int *p = &x stores the ADDRESS of x into p. So p == &x (same address). Dereferencing: *p reads the value stored at that address — which is x\'s value.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-what-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-what-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a second integer variable y=100 and a pointer q that points to y. Print y, &y, q, and *q.',
      includes: ['<stdio.h>'],
      starterCode:
`int x = 42;
int *p = &x;
printf("x=%d *p=%d\\n", x, *p);`,
      checkFn: out => out.includes('100') && out.includes('100'),
      hint: 'int y=100; int *q=&y; printf("y=%d *q=%d\\n", y, *q);',
      solution: `int x=42; int *p=&x;\nint y=100; int *q=&y;\nprintf("x=%d *p=%d\\n",x,*p);\nprintf("y=%d *q=%d\\n",y,*q);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-what-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to declare a pointer and print the value it points to.',
      includes: ['<stdio.h>'],
      starterCode:
`int n = 99;
[?] *p = [?]n;
printf("%d\\n", [?]p);`,
      blanks: ['int', '&', '*'],
      hint: 'First: pointer base type. Second: address-of operator. Third: dereference operator.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-what-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare int score=95. Create a pointer p pointing to score. Print score via the pointer. Then use the pointer to add 5 to score. Print score again.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('95') && out.includes('100'),
      hint: 'int score=95; int *p=&score; printf("%d\\n",*p); *p+=5; printf("%d\\n",score);',
      solution: `int score=95;\nint *p=&score;\nprintf("%d\\n",*p);\n*p+=5;\nprintf("%d\\n",score);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch16-wh-p1', type: 'predict', question: 'What prints?',
          code: `int a=7;\nint *p=&a;\nprintf("%d\\n",*p);`,
          correct: ['7'], caseSensitive: true, orderMatters: true,
          hint: 'p points to a. *p reads the value at a\'s address.',
          feedback: { correct: 'Correct — *p reads a\'s value which is 7.', incorrect: '*p dereferences p which points to a. a=7.' }
        },
        {
          id: 'ch16-wh-p2', type: 'predict', question: 'What prints?',
          code: `int x=10;\nint *p=&x;\n*p=20;\nprintf("%d\\n",x);`,
          correct: ['20'], caseSensitive: true, orderMatters: true,
          hint: '*p=20 writes through the pointer to x\'s memory location.',
          feedback: { correct: 'Correct — *p=20 modifies x. x is now 20.', incorrect: '*p=20 writes to x\'s address, modifying x to 20.' }
        }
      ]

      const mcqQ = [
        {
          id: 'ch16-wh-m1', type: 'mcq',
          question: 'What is a pointer in C?',
          options: [
            'A variable that stores multiple values',
            'A variable that stores a memory address',
            'A function that returns a value',
            'A type that holds floating-point numbers'
          ],
          correct: ['A variable that stores a memory address'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what makes a pointer different from int or float.',
          feedback: { correct: 'Correct — a pointer stores the address where another value lives in memory.', incorrect: 'A pointer is a variable whose value is a memory address. Not a value — a location.' }
        },
        {
          id: 'ch16-wh-m2', type: 'mcq',
          question: 'int x=5; int *p=&x; — what is *p?',
          options: ['The address of x', '5', 'A copy of p', 'NULL'],
          correct: ['5'],
          caseSensitive: false, orderMatters: false,
          hint: '*p dereferences — goes to the address and reads the value there.',
          feedback: { correct: 'Correct — *p dereferences: goes to x\'s address and reads 5.', incorrect: '*p = "go to address stored in p and read the value" = x\'s value = 5.' }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Declare int temp=37. Create int *tp=&temp. Use *tp to change temp to 100. Print temp.',
          check: out => out.includes('100'),
          hint: 'int temp=37; int *tp=&temp; *tp=100; printf("%d\\n",temp);',
          solution: `int temp=37;\nint *tp=&temp;\n*tp=100;\nprintf("%d\\n",temp);`
        }
      ]

      renderPracticeCh16('practice-ch16-what', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-what-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-what-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-what-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 42 via a pointer but crashes or gives wrong output. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode: `int n=42;\nint *p;\nprintf("%d\\n",*p);`,
        checkFn: out => out.includes('42'),
        hint: 'p is declared but never assigned — it holds a garbage address.',
        hintTwo: 'Add p=&n; after declaring p. Without it, *p reads from a random garbage address.',
        solution: `int n=42;\nint *p=&n;\nprintf("%d\\n",*p);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'What is a Pointer? — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — DECLARING A POINTER
     ══════════════════════════════════════════════════════════ */
  function initTopic_declare() {
    const topicId = 'ch16-declare'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-declare-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int    x  = 10;
char   c  = 'A';
float  f  = 3.14f;

int   *ip = &x;
char  *cp = &c;
float *fp = &f;

printf("int via ptr:   %d\\n",   *ip);
printf("char via ptr:  %c\\n",   *cp);
printf("float via ptr: %.2f\\n", *fp);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-declare',
      question: 'int *ip, char *cp, float *fp — all three pointers print their values correctly. What do the different pointer types control?',
      options: [
        'The size of the pointer itself (int* is 4 bytes, char* is 1 byte)',
        'How the compiler interprets the bytes at the address — what type to read when dereferencing',
        'Which memory addresses the pointer is allowed to access',
        'Nothing — all pointers work identically regardless of type'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — all pointers store addresses (same size). The type tells the compiler how many bytes to read and how to interpret them when you dereference (*p).',
        incorrect: 'Pointer types are all the same size (address-sized). The type controls how *p is interpreted: int* reads 4 bytes as an integer, char* reads 1 byte as a character, float* reads 4 bytes as IEEE float.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-declare-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-declare-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Declare two separate int pointer variables p and q (both must be pointers). Point p at x=10 and q at y=20. Print both via their pointers.',
      includes: ['<stdio.h>'],
      starterCode:
`int x=10, y=20;
int *p, q;     /* BUG: q is not a pointer! Fix this */
p=&x; /* q=&y; would fail */
printf("%d\\n", *p);`,
      checkFn: out => out.includes('10') && out.includes('20'),
      hint: 'Change int *p, q to int *p, *q — both need their own *.',
      solution: `int x=10,y=20;\nint *p,*q;\np=&x; q=&y;\nprintf("%d\\n",*p);\nprintf("%d\\n",*q);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-declare-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct pointer declaration syntax.',
      includes: ['<stdio.h>'],
      starterCode:
`double d = 9.81;
[?] [?]p = &d;       /* pointer to double */
printf("%.2f\\n", [?]p);`,
      blanks: ['double', '*', '*'],
      hint: 'First: base type. Second: * making it a pointer. Third: * to dereference.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-declare-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare int a=1, b=2, c=3. Declare three separate pointers pa, pb, pc pointing to each. Print a+b+c using only the pointers (no variable names in the expression).',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('6'),
      hint: 'int *pa=&a,*pb=&b,*pc=&c; printf("%d\\n", *pa+*pb+*pc);',
      solution: `int a=1,b=2,c=3;\nint *pa=&a,*pb=&b,*pc=&c;\nprintf("Sum: %d\\n",*pa+*pb+*pc);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-dc-p1', type: 'predict', question: 'What is the type of q in: int *p, q; ?',
        code: `int *p, q;\nq = 5;\nprintf("%d\\n", q);`,
        correct: ['5'], caseSensitive: true, orderMatters: true,
        hint: 'The * in int *p, q only applies to p. q is a plain int.',
        feedback: { correct: 'Correct — q is a plain int (value 5). Only p is a pointer.', incorrect: 'int *p, q: p is int*, q is plain int. q=5 works as integer. Prints 5.' }
      }]

      const mcqQ = [
        {
          id: 'ch16-dc-m1', type: 'mcq',
          question: 'How do you correctly declare TWO int pointers a and b?',
          options: ['int *a, b;', 'int* a, b;', 'int *a, *b;', 'int** a, b;'],
          correct: ['int *a, *b;'],
          caseSensitive: true, orderMatters: false,
          hint: 'Each name needs its own *.',
          feedback: { correct: 'Correct — int *a, *b; declares both as pointers. The * binds to the name, not the type.', incorrect: 'int *a, *b; is the only form that makes both pointers. The * belongs to each name individually.' }
        },
        {
          id: 'ch16-dc-m2', type: 'mcq',
          question: 'int *p — what does the * mean here?',
          options: ['Multiply p by something', 'Dereference operator', 'Part of the type — declaring p as a pointer to int', 'p equals zero'],
          correct: ['Part of the type — declaring p as a pointer to int'],
          caseSensitive: false, orderMatters: false,
          hint: 'Context matters — in a declaration, * has a different meaning than in an expression.',
          feedback: { correct: 'Correct — in a declaration, * is type syntax meaning "pointer to". Not multiplication, not dereference.', incorrect: 'In a declaration, * is type syntax. int *p means "p is a pointer to int." In expressions, * means dereference. Same symbol, different context.' }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Declare float pi=3.14f and float e=2.71f. Declare float *pp pointing to pi and float *pe pointing to e. Print their product using only the pointers.',
        check: out => { const n = parseFloat(out.replace(/[^0-9.]/g,'')); return n > 8.5 && n < 8.6; },
        hint: 'float *pp=&pi, *pe=&e; printf("%.2f\\n", (*pp)*(*pe));',
        solution: `float pi=3.14f,e=2.71f;\nfloat *pp=&pi,*pe=&e;\nprintf("%.2f\\n",(*pp)*(*pe));`
      }]

      renderPracticeCh16('practice-ch16-declare', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-declare-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-declare-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-declare-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'Two pointer declarations have bugs. Fix both.',
        includes: ['<stdio.h>'],
        starterCode: `int x=5,y=10;\nint *a, b=&y;  /* b should be a pointer */\nprintf("%d %d\\n",*a,*b);`,
        checkFn: out => out.includes('5') && out.includes('10'),
        hint: 'a is declared but not initialized. b is declared as int not int*.',
        hintTwo: 'int *a=&x, *b=&y; — both need * and both need to be initialized.',
        solution: `int x=5,y=10;\nint *a=&x,*b=&y;\nprintf("%d %d\\n",*a,*b);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Declaring Pointers — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — ADDRESS-OF OPERATOR &
     ══════════════════════════════════════════════════════════ */
  function initTopic_addressof() {
    const topicId = 'ch16-addressof'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-addressof-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int a=1, b=2, c=3;

printf("&a = %p\\n", (void*)&a);
printf("&b = %p\\n", (void*)&b);
printf("&c = %p\\n", (void*)&c);

/* Addresses show memory layout */
int diff_ab = (int)((char*)&b - (char*)&a);
printf("bytes between a and b: %d\\n", diff_ab);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-addressof',
      question: 'You use &x every time you call scanf("%d", &x). Now you know what it means — why does scanf need &x instead of just x?',
      options: [
        'scanf requires larger values for format strings',
        'scanf needs the ADDRESS of x so it can write the read integer into x\'s memory location',
        'x alone would be printed, not read',
        'scanf only accepts pointers, never plain values'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — scanf is a function, so it receives a copy of x by default. To actually modify x, it needs the address (&x) so it can write through the pointer to x\'s real memory location.',
        incorrect: 'scanf reads user input and must store it somewhere. Passing x would give scanf a copy — modifying it doesn\'t affect the original. &x gives scanf the address, so it can write directly to x\'s memory.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-addressof-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-addressof-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Store the address of each variable in a pointer, then verify: print whether p == &x (should be 1/true).',
      includes: ['<stdio.h>'],
      starterCode:
`int x=42, y=99;
int *p = &x;
printf("*p=%d\\n", *p);`,
      checkFn: out => out.includes('1') || out.includes('true') || out.includes('equal'),
      hint: 'printf("%d\\n", p==&x); — should print 1 (true) because p was set to &x.',
      solution: `int x=42,y=99;\nint *p=&x;\nprintf("*p=%d\\n",*p);\nprintf("p==&x: %d\\n", p==&x);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-addressof-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to get and use the address of a variable.',
      includes: ['<stdio.h>'],
      starterCode:
`int num = 55;
int *ptr = [?]num;     /* get address */
printf("%d\\n", [?]ptr); /* read value at address */
printf("%p\\n", (void*)[?]ptr); /* print the address itself */`,
      blanks: ['&', '*', ''],
      hint: 'First: address-of operator. Second: dereference. Third: no operator needed — ptr already holds the address.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-addressof-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare int vals[3]={10,20,30}. Get the address of vals[1] into a pointer. Print the value through the pointer, then modify it to 99 through the pointer. Print vals[1] to confirm.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('20') && out.includes('99'),
      hint: 'int *p=&vals[1]; printf("%d\\n",*p); *p=99; printf("%d\\n",vals[1]);',
      solution: `int vals[3]={10,20,30};\nint *p=&vals[1];\nprintf("%d\\n",*p);\n*p=99;\nprintf("%d\\n",vals[1]);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-ao-p1', type: 'predict', question: 'What prints?',
        code: `int x=5;\nint *p=&x;\nprintf("%d\\n", p==&x);`,
        correct: ['1'], caseSensitive: true, orderMatters: true,
        hint: 'p was set to &x. Are they equal?',
        feedback: { correct: 'Correct — p==&x is true (1) because p was assigned &x.', incorrect: 'p=&x then p==&x compares p to itself — always 1 (true).' }
      }]

      const mcqQ = [
        {
          id: 'ch16-ao-m1', type: 'mcq',
          question: 'What does &x return when x is an int?',
          options: ['The value of x', 'The size of x in bytes', 'A pointer (int*) — the address where x is stored', 'NULL'],
          correct: ['A pointer (int*) — the address where x is stored'],
          caseSensitive: false, orderMatters: false,
          hint: '& = address-of. Applied to an int, it returns int*.',
          feedback: { correct: 'Correct — &x gives an int* — the address where x lives in memory.', incorrect: '&x is the address-of operator applied to x. Result type: int*. Value: the memory address of x.' }
        },
        {
          id: 'ch16-ao-m2', type: 'mcq',
          question: 'Can you take the address of a literal: &42?',
          options: ['Yes — it returns a pointer to 42', 'No — literals have no memory address; only variables do', 'Yes but only for int literals', 'Only with const int* pointer type'],
          correct: ['No — literals have no memory address; only variables do'],
          caseSensitive: false, orderMatters: false,
          hint: 'Literals are not stored as named variables with fixed addresses.',
          feedback: { correct: 'Correct — &42 is a compile error. Literals are not lvalues. Only variables (lvalues) have addressable memory.', incorrect: '&42 is a compile error. The address-of operator requires an lvalue (something stored at a fixed address). Literals are not lvalues.' }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Declare int arr[4]={5,10,15,20}. Get pointers to arr[0] and arr[3]. Print the sum of the values they point to.',
        check: out => out.includes('25'),
        hint: 'int *p0=&arr[0], *p3=&arr[3]; printf("%d\\n", *p0+*p3);',
        solution: `int arr[4]={5,10,15,20};\nint *p0=&arr[0],*p3=&arr[3];\nprintf("%d\\n",*p0+*p3);`
      }]

      renderPracticeCh16('practice-ch16-addressof', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-addressof-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-addressof-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-addressof-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print x\'s value via a pointer but has a bug. Fix it.',
        includes: ['<stdio.h>'],
        starterCode: `int x=77;\nint *p=x;  /* wrong — should be address */\nprintf("%d\\n",*p);`,
        checkFn: out => out.includes('77'),
        hint: 'p=x tries to store the VALUE of x (77) as an address. p needs the ADDRESS of x.',
        hintTwo: 'Change int *p=x to int *p=&x.',
        solution: `int x=77;\nint *p=&x;\nprintf("%d\\n",*p);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Address-of & — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — DEREFERENCE OPERATOR *
     ══════════════════════════════════════════════════════════ */
  function initTopic_deref() {
    const topicId = 'ch16-deref'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-deref-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int x = 5;
int *p = &x;

printf("Before: x=%d *p=%d\\n", x, *p);

*p = 99;   /* write through pointer */
printf("After *p=99: x=%d\\n", x);

x = 7;     /* write directly */
printf("After x=7: *p=%d\\n", *p);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-deref',
      question: 'After *p=99, x became 99. After x=7, *p became 7. Why do both views always agree?',
      options: [
        'C synchronizes pointers and variables automatically',
        'There is only ONE value in memory — x and *p are two ways to read the same location',
        'The compiler copies values between x and *p after every operation',
        '*p and x are separate but connected variables'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — there is one memory cell. x is a name for it. p stores its address. *p reads the same cell. Writing via either name changes the single shared cell.',
        incorrect: 'p stores the address of x. *p reads that same address. x and *p name the same memory cell — there\'s only one value. Changing it through either name changes the one cell.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-deref-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-deref-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Use *p to increment x by 10 three times (do not use x directly). Print x after each increment.',
      includes: ['<stdio.h>'],
      starterCode:
`int x=0;
int *p=&x;
/* use only *p to modify x */
printf("%d\\n",x);`,
      checkFn: out => out.includes('10') && out.includes('20') && out.includes('30'),
      hint: '*p+=10; printf("%d\\n",x); — repeat 3 times.',
      solution: `int x=0;\nint *p=&x;\n*p+=10; printf("%d\\n",x);\n*p+=10; printf("%d\\n",x);\n*p+=10; printf("%d\\n",x);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-deref-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to write and read through a pointer.',
      includes: ['<stdio.h>'],
      starterCode:
`int val=0;
int *p=&val;
[?]p = 42;            /* write 42 to val via pointer */
printf("%d\\n", [?]p); /* read val via pointer */
printf("%d\\n", val);  /* confirm val changed */`,
      blanks: ['*', '*'],
      hint: 'Both blanks use the dereference operator to access the value at p\'s address.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-deref-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a function void square(int *n) that squares the value at *n in-place. Test with int x=5 — after calling square(&x), x should be 25.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('25'),
      hint: 'void square(int *n){ *n = (*n)*(*n); }',
      solution: `void square(int *n){ *n=(*n)*(*n); }\nint x=5;\nsquare(&x);\nprintf("%d\\n",x);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch16-dr-p1', type: 'predict', question: 'What prints?',
          code: `int a=3,b=4;\nint *p=&a;\n*p=*p+b;\nprintf("%d %d\\n",a,b);`,
          correct: ['7 4'], caseSensitive: true, orderMatters: true,
          hint: '*p=*p+b means a=a+b=3+4=7. b unchanged.',
          feedback: { correct: 'Correct — *p=*p+b: a = 3+4 = 7. b stays 4.', incorrect: '*p references a. *p+b = 3+4=7, written back to a. b unchanged. Output: 7 4.' }
        },
        {
          id: 'ch16-dr-p2', type: 'predict', question: 'What prints?',
          code: `int x=10;\nint *p=&x;\n(*p)++;\nprintf("%d\\n",x);`,
          correct: ['11'], caseSensitive: true, orderMatters: true,
          hint: '(*p)++ increments the value at p\'s address (x). Note the parentheses.',
          feedback: { correct: 'Correct — (*p)++ increments x from 10 to 11.', incorrect: '(*p)++ = increment the value at p\'s address. x becomes 11.' }
        }
      ]

      const mcqQ = [
        {
          id: 'ch16-dr-m1', type: 'mcq',
          question: '*p on the LEFT side of = does what?',
          options: ['Reads the value at p\'s address', 'Writes to the location p\'s address', 'Declares a new pointer', 'Returns the address of p'],
          correct: ['Writes to the location p\'s address'],
          caseSensitive: false, orderMatters: false,
          hint: 'Left side of = is always a write target.',
          feedback: { correct: 'Correct — *p on the left of = is a write: store the right-hand value at p\'s address.', incorrect: 'Left side of =: *p = value writes to p\'s address. Right side: value = *p reads from p\'s address.' }
        },
        {
          id: 'ch16-dr-m2', type: 'mcq',
          question: 'Why use (*p)++ instead of *p++ to increment the value?',
          options: ['Both do the same thing', '*p++ increments p (the pointer), not the value', '(*p)++ is a compile error', '*p++ is undefined behavior'],
          correct: ['*p++ increments p (the pointer), not the value'],
          caseSensitive: false, orderMatters: false,
          hint: '++ has higher precedence than * — so *p++ means *(p++) not (*p)++.',
          feedback: { correct: 'Correct — ++ binds tighter than *, so *p++ = *(p++) — advances the pointer, then reads old value. Use (*p)++ to increment the value.', incorrect: 'Operator precedence: ++ > *. So *p++ = *(p++): pointer advances. To increment the pointed-to value: (*p)++.' }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write void negate(int *p) that negates the value at *p. Test: int v=5; negate(&v); should give v=-5.',
        check: out => out.includes('-5'),
        hint: 'void negate(int *p){ *p = -(*p); }',
        solution: `void negate(int *p){ *p=-(*p); }\nint v=5;\nnegate(&v);\nprintf("%d\\n",v);`
      }]

      renderPracticeCh16('practice-ch16-deref', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-deref-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-deref-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-deref-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should double x via pointer but produces wrong result. Fix it.',
        includes: ['<stdio.h>'],
        starterCode: `int x=5;\nint *p=&x;\n*p = p * 2;  /* wrong */\nprintf("%d\\n",x);`,
        checkFn: out => out.includes('10'),
        hint: 'p is an address. p*2 multiplies an address by 2 — not the value. You need (*p)*2.',
        hintTwo: 'Change *p = p*2 to *p = (*p)*2 — dereference p to get the value before multiplying.',
        solution: `int x=5;\nint *p=&x;\n*p=(*p)*2;\nprintf("%d\\n",x);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Dereference * — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPICS 5-11: Condensed but complete
     ══════════════════════════════════════════════════════════ */

  function initTopic_relationship() {
    const topicId = 'ch16-relationship'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-relationship-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int x=10;
int *p=&x, *q=&x;  /* both point to x */

x   = 20;  printf("after x=20:   x=%d *p=%d *q=%d\\n",x,*p,*q);
*p  = 30;  printf("after *p=30:  x=%d *p=%d *q=%d\\n",x,*p,*q);
*q  = 40;  printf("after *q=40:  x=%d *p=%d *q=%d\\n",x,*p,*q);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-relationship',
      question: 'All three — x, *p, *q — always showed the same value. How many values exist in memory here?',
      options: ['3 — x, *p, *q are three separate values', '2 — x and the pointer', '1 — there is one memory cell with three names', '0 — pointers have no values'],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — one memory cell. x, *p, *q are three ways to access the same single cell. No copies.',
        incorrect: 'One cell in memory holds the int. x names it. p and q store its address. *p and *q read/write that same single cell.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-relationship-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-relationship-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Make p point to x, then reassign p to point to y instead. Show that after the reassign, *p gives y\'s value not x\'s.',
      includes: ['<stdio.h>'],
      starterCode:
`int x=100, y=200;
int *p=&x;
printf("*p=%d\\n",*p);
/* now make p point to y */`,
      checkFn: out => out.includes('100') && out.includes('200'),
      hint: 'p=&y; printf("*p=%d\\n",*p); — reassigning p (not *p) changes what it points to.',
      solution: `int x=100,y=200;\nint *p=&x;\nprintf("*p=%d\\n",*p);\np=&y;\nprintf("*p=%d\\n",*p);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-relationship-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in: two pointers sharing one variable.',
      includes: ['<stdio.h>'],
      starterCode:
`int val=5;
int *a=[?]val, *b=[?]val;
[?]a += 3;     /* val is now 8 */
printf("%d %d %d\\n", val, [?]a, [?]b);`,
      blanks: ['&', '&', '*', '*', '*'],
      hint: 'Both pointers use & to get address of val. * to dereference both for reading.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-relationship-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare int counter=0. Create two pointers both pointing to counter. Increment counter using pointer 1. Decrement using pointer 2. Print counter.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('0') || out.includes('counter'),
      hint: 'int *p1=&counter,*p2=&counter; (*p1)++; (*p2)--; printf("%d\\n",counter);',
      solution: `int counter=0;\nint *p1=&counter,*p2=&counter;\n(*p1)++;\n(*p2)--;\nprintf("%d\\n",counter);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-re-p1', type: 'predict', question: 'What prints?',
        code: `int n=1;\nint *a=&n,*b=&n;\n(*a)++; (*b)++;\nprintf("%d\\n",n);`,
        correct: ['3'], caseSensitive: true, orderMatters: true,
        hint: 'Both a and b point to n. Each ++ goes through the pointer to increment the same n.',
        feedback: { correct: 'Correct — n incremented twice: 1→2→3.', incorrect: '*a and *b both alias n. Two increments: 1→2→3.' }
      }]

      const mcqQ = [{
        id: 'ch16-re-m1', type: 'mcq',
        question: 'int x=5; int *p=&x; p=&x; — what did the last assignment change?',
        options: ['The value of x', 'Where p points (same place — no visible effect)', 'The address of x', '*p\'s value'],
        correct: ['Where p points (same place — no visible effect)'],
        caseSensitive: false, orderMatters: false,
        hint: 'p=&x changes p (the pointer), not *p (the value). It was already pointing to x.',
        feedback: { correct: 'Correct — p=&x changes p\'s stored address. Already pointing to x, so no visible effect.', incorrect: 'p=&x changes what p points to (not the value). Since it was already pointing to x, no visible change.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Show aliasing: int v=10; three pointers all pointing to v. Increment v through each pointer. Print v (should be 13).',
        check: out => out.includes('13'),
        hint: 'int *a=&v,*b=&v,*c=&v; (*a)++; (*b)++; (*c)++; printf("%d\\n",v);',
        solution: `int v=10;\nint *a=&v,*b=&v,*c=&v;\n(*a)++; (*b)++; (*c)++;\nprintf("%d\\n",v);`
      }]

      renderPracticeCh16('practice-ch16-relationship', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-relationship-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-relationship-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-relationship-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 50 but prints a wrong value. Find the pointer reassignment bug.',
        includes: ['<stdio.h>'],
        starterCode: `int x=10,y=50;\nint *p=&x;\np=y;  /* bug: should point to y, not store y's value */\nprintf("%d\\n",*p);`,
        checkFn: out => out.includes('50'),
        hint: 'p=y tries to store y\'s value (50) as a memory address — wrong. To point to y: p=&y.',
        hintTwo: 'Change p=y to p=&y.',
        solution: `int x=10,y=50;\nint *p=&x;\np=&y;\nprintf("%d\\n",*p);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Pointer & Variable Relationship — Assessment', renderAssessment))
  }

  function initTopic_null() {
    const topicId = 'ch16-null'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-null-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int *p = NULL;

if (p != NULL) {
    printf("Has target: %d\\n", *p);
} else {
    printf("p is NULL — no target yet\\n");
}

int x = 42;
p = &x;    /* now p has a valid target */

if (p != NULL) {
    printf("Now has target: %d\\n", *p);
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-null',
      question: 'Why is int *p = NULL safer than just int *p (no initialization)?',
      options: [
        'NULL takes less memory than a garbage address',
        'NULL dereferencing always crashes predictably; garbage address may silently corrupt valid memory',
        'NULL pointers run faster',
        'Only NULL can be safely assigned to a pointer'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — dereferencing NULL always produces a clean segfault you can find. Dereferencing garbage may write to random valid memory, causing silent corruption that\'s nearly impossible to debug.',
        incorrect: 'Uninitialized pointer = random garbage address. Accessing it may "work" silently while corrupting some other variable. NULL always crashes immediately on access — much easier to find the bug.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-null-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-null-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Write a safe_read function: takes int *p, checks NULL, returns *p if valid or -1 if NULL. Test with NULL and a valid pointer.',
      includes: ['<stdio.h>'],
      starterCode:
`int safe_read(int *p) {
    return *p;  /* unsafe — no NULL check */
}

int x=99;
printf("%d\\n", safe_read(&x));`,
      checkFn: out => out.includes('99') && out.includes('-1'),
      hint: 'if(p==NULL) return -1; return *p;',
      solution: `int safe_read(int *p){ if(p==NULL) return -1; return *p; }\nint x=99;\nprintf("%d\\n",safe_read(&x));\nprintf("%d\\n",safe_read(NULL));`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-null-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the NULL safety pattern.',
      includes: ['<stdio.h>'],
      starterCode:
`int *ptr = [?];    /* initialize to nothing */

if (ptr [?] NULL) {
    printf("no target\\n");
}

int n=7;
ptr = &n;
if ([?]) printf("value: %d\\n", *ptr);`,
      blanks: ['NULL', '==', 'ptr'],
      hint: 'First: NULL initialization. Second: == for equality check. Third: pointer in boolean context (non-NULL = true).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-null-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write int *findPositive(int arr[], int n) that returns a pointer to the first positive element, or NULL if none. Test with {-3,-1,4,7}.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('4') || out.includes('Found'),
      hint: 'for(int i=0;i<n;i++) if(arr[i]>0) return &arr[i]; return NULL;',
      solution:
`int *findPositive(int arr[], int n){
    for(int i=0;i<n;i++) if(arr[i]>0) return &arr[i];
    return NULL;
}
int a[]={-3,-1,4,7};
int *p=findPositive(a,4);
if(p!=NULL) printf("Found: %d\\n",*p);
else printf("None\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-nl-p1', type: 'predict', question: 'What prints?',
        code: `int *p=NULL;\nif(!p) printf("null\\n");\nelse printf("valid\\n");`,
        correct: ['null'], caseSensitive: true, orderMatters: true,
        hint: '!NULL = !0 = true.',
        feedback: { correct: 'Correct — NULL == 0, !0 == true. Prints "null".', incorrect: 'NULL is 0. !0 is true. Prints "null".' }
      }]

      const mcqQ = [{
        id: 'ch16-nl-m1', type: 'mcq',
        question: 'What is the integer value of NULL?',
        options: ['-1', '1', '0', 'depends on the system'],
        correct: ['0'],
        caseSensitive: false, orderMatters: false,
        hint: 'NULL is defined as the null pointer constant.',
        feedback: { correct: 'Correct — NULL is 0 (address zero). It evaluates as false in conditions.', incorrect: 'NULL is always 0. That\'s why if(!p) works to check for NULL.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write void safeDouble(int *p) that doubles *p only if p is not NULL. Test with &x=5 and NULL.',
        check: out => out.includes('10') && (out.includes('null') || out.includes('NULL') || out.includes('skip')),
        hint: 'void safeDouble(int *p){ if(p!=NULL) *p*=2; else printf("null\\n"); }',
        solution: `void safeDouble(int *p){ if(p!=NULL) *p*=2; else printf("null skip\\n"); }\nint x=5;\nsafeDouble(&x); printf("%d\\n",x);\nsafeDouble(NULL);`
      }]

      renderPracticeCh16('practice-ch16-null', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-null-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-null-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-null-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This crashes because of a NULL dereference. Add a safety check.',
        includes: ['<stdio.h>'],
        starterCode: `int *p=NULL;\nprintf("%d\\n",*p);`,
        checkFn: out => out.includes('null') || out.includes('NULL') || out.includes('no'),
        hint: 'Dereferencing NULL crashes. Check if(p!=NULL) before *p.',
        hintTwo: 'if(p!=NULL) printf("%d\\n",*p); else printf("p is NULL\\n");',
        solution: `int *p=NULL;\nif(p!=NULL) printf("%d\\n",*p);\nelse printf("p is NULL\\n");`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'NULL Pointer — Assessment', renderAssessment))
  }

  function initTopic_arithmetic() {
    const topicId = 'ch16-arithmetic'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-arithmetic-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int arr[5]={10,20,30,40,50};
int *p=arr;   /* points to arr[0] */

printf("p+0: %d\\n", *(p+0));
printf("p+1: %d\\n", *(p+1));
printf("p+2: %d\\n", *(p+2));
printf("p+4: %d\\n", *(p+4));

/* Advancing the pointer */
p++;
printf("After p++: %d\\n", *p);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-arithmetic',
      question: '*(p+1) gave 20, *(p+2) gave 30. If each int is 4 bytes, how many bytes apart are p+1 and p+2?',
      options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
      correctIndex: 2,
      feedback: {
        correct: 'Correct — pointer arithmetic scales by sizeof(int)=4 bytes. p+1 is 4 bytes forward; p+2 is 8 bytes from p; the step from p+1 to p+2 is 4 bytes.',
        incorrect: 'int pointers step by sizeof(int) = 4 bytes. p+1 to p+2 = one int step = 4 bytes. Pointer arithmetic auto-scales by the pointed-to type size.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-arithmetic-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-arithmetic-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Walk pointer p through the array using a while loop (increment p, stop when past the end). Sum all values.',
      includes: ['<stdio.h>'],
      starterCode:
`int arr[5]={1,2,3,4,5};
int *p=arr;
int sum=0;
/* walk p through array and sum */
printf("Sum: %d\\n",sum);`,
      checkFn: out => out.includes('15'),
      hint: 'int *end=arr+5; while(p<end){ sum+=*p; p++; }',
      solution:
`int arr[5]={1,2,3,4,5};
int *p=arr, sum=0;
int *end=arr+5;
while(p<end){ sum+=*p; p++; }
printf("Sum: %d\\n",sum);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-arithmetic-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in: arr[i] == *(arr + i).',
      includes: ['<stdio.h>'],
      starterCode:
`int a[]={5,10,15};
printf("%d\\n", a[1]);
printf("%d\\n", [?](a [?] 1));  /* equivalent */`,
      blanks: ['*', '+'],
      hint: 'arr[i] is defined as *(arr+i). Dereference of (array + offset).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-arithmetic-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Using ONLY pointer arithmetic (no [] bracket notation), print each element of int nums[4]={3,6,9,12} on its own line.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('3') && out.includes('12') && out.includes('9'),
      hint: 'int *p=nums; for(int i=0;i<4;i++) printf("%d\\n",*(p+i));',
      solution: `int nums[4]={3,6,9,12};\nfor(int i=0;i<4;i++) printf("%d\\n",*(nums+i));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-ar-p1', type: 'predict', question: 'What prints?',
        code: `int a[]={1,2,3,4,5};\nint *p=a;\nprintf("%d %d\\n", *(p+2), *(p+4));`,
        correct: ['3 5'], caseSensitive: true, orderMatters: true,
        hint: 'p+2 points to a[2], p+4 points to a[4].',
        feedback: { correct: 'Correct — *(p+2)=a[2]=3, *(p+4)=a[4]=5.', incorrect: 'p=a=&a[0]. p+2=&a[2]→3. p+4=&a[4]→5.' }
      }]

      const mcqQ = [{
        id: 'ch16-ar-m1', type: 'mcq',
        question: 'char *cp points to a char array. cp+3 advances how many bytes?',
        options: ['12 bytes', '4 bytes', '3 bytes', '8 bytes'],
        correct: ['3 bytes'],
        caseSensitive: false, orderMatters: false,
        hint: 'char is 1 byte. Pointer arithmetic scales by sizeof(char)=1.',
        feedback: { correct: 'Correct — sizeof(char)=1. cp+3 = 3×1 = 3 bytes forward.', incorrect: 'char *cp: sizeof(char)=1. cp+3 = 3 bytes. Compare: int *ip, ip+3 = 3×4 = 12 bytes.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Using pointer arithmetic only, find the maximum element in int data[]={7,3,9,1,5}. No bracket notation.',
        check: out => out.includes('9'),
        hint: 'int *p=data, *end=data+5, max=*data; while(p<end){ if(*p>max) max=*p; p++; }',
        solution:
`int data[]={7,3,9,1,5};
int *p=data,*end=data+5,max=*data;
while(p<end){ if(*p>max) max=*p; p++; }
printf("Max: %d\\n",max);`
      }]

      renderPracticeCh16('practice-ch16-arithmetic', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-arithmetic-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-arithmetic-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-arithmetic-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This pointer loop should sum 5 elements but sums 6. Fix the bound.',
        includes: ['<stdio.h>'],
        starterCode: `int a[]={1,2,3,4,5};\nint *p=a,sum=0;\nwhile(p<=a+5){ sum+=*p; p++; }  /* bug: <=5 includes a[5] */\nprintf("%d\\n",sum);`,
        checkFn: out => out.includes('15'),
        hint: 'p<=a+5 includes a[5] which is out of bounds. Change to p<a+5.',
        hintTwo: 'while(p<a+5) stops before a[5]. Valid: a[0] through a[4] = 5 elements.',
        solution: `int a[]={1,2,3,4,5};\nint *p=a,sum=0;\nwhile(p<a+5){ sum+=*p; p++; }\nprintf("%d\\n",sum);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Pointer Arithmetic — Assessment', renderAssessment))
  }

  function initTopic_arrays() {
    const topicId = 'ch16-arrays'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-arrays-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int arr[5]={10,20,30,40,50};

/* arr and &arr[0] are the same */
printf("arr: %p\\n", (void*)arr);
printf("&arr[0]: %p\\n", (void*)&arr[0]);

/* arr[i] and *(arr+i) are identical */
printf("arr[2]: %d\\n", arr[2]);
printf("*(arr+2): %d\\n", *(arr+2));`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-arrays',
      question: 'arr and &arr[0] printed the same address. arr[2] and *(arr+2) gave the same value. What does this reveal about C arrays?',
      options: [
        'Arrays and pointers are the same type',
        'An array name decays to a pointer to its first element — arr[i] is just *(arr+i)',
        'Arrays always store 5 elements',
        'You must use pointers to access arrays'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — in most contexts, array names decay to a pointer to element 0. arr[i] is syntactic sugar for *(arr+i). They are equivalent by definition in C.',
        incorrect: 'Array names decay to &arr[0]. arr[i] is defined as *(arr+i) — identical operations. This is why functions receiving arrays actually receive a pointer to the first element.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-arrays-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-arrays-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Write a function void addOne(int *arr, int n) that increments every element. Test with arr[]={1,2,3,4,5}.',
      includes: ['<stdio.h>'],
      starterCode:
`void addOne(int *arr, int n) {
    /* increment every element */
}

int nums[]={1,2,3,4,5};
addOne(nums,5);
for(int i=0;i<5;i++) printf("%d ",nums[i]);`,
      checkFn: out => out.includes('2') && out.includes('6'),
      hint: 'for(int i=0;i<n;i++) arr[i]++;',
      solution: `void addOne(int *a,int n){ for(int i=0;i<n;i++) a[i]++; }\nint nums[]={1,2,3,4,5};\naddOne(nums,5);\nfor(int i=0;i<5;i++) printf("%d ",nums[i]);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-arrays-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in equivalences between bracket and pointer notation.',
      includes: ['<stdio.h>'],
      starterCode:
`int a[]={5,10,15,20};
printf("%d\\n", a[0]);       /* bracket */
printf("%d\\n", [?](a+[?])); /* pointer — same as a[0] */
printf("%d\\n", a[3]);       /* bracket */
printf("%d\\n", [?](a+3));   /* pointer — same as a[3] */`,
      blanks: ['*', '0', '*'],
      hint: 'arr[i] == *(arr+i). First: dereference *. Second: offset 0 for index 0. Third: dereference * for index 3.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-arrays-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write int sumArray(int *arr, int n) that returns the sum. Write int maxArray(int *arr, int n) that returns the max. Test with {3,7,1,9,4}.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('24') && out.includes('9'),
      hint: 'int sum=0; for(int i=0;i<n;i++) sum+=arr[i]; return sum; — similar for max.',
      solution:
`int sumArray(int *a,int n){ int s=0; for(int i=0;i<n;i++) s+=a[i]; return s; }
int maxArray(int *a,int n){ int m=a[0]; for(int i=1;i<n;i++) if(a[i]>m) m=a[i]; return m; }
int d[]={3,7,1,9,4};
printf("Sum:%d Max:%d\\n",sumArray(d,5),maxArray(d,5));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-pa-p1', type: 'predict', question: 'What prints?',
        code: `int a[]={1,2,3};\nprintf("%d %d\\n",a[1],*(a+1));`,
        correct: ['2 2'], caseSensitive: true, orderMatters: true,
        hint: 'a[1] and *(a+1) are identical.',
        feedback: { correct: 'Correct — a[1] == *(a+1) == 2. Both print 2.', incorrect: 'arr[i] = *(arr+i). Both 2.' }
      }]

      const mcqQ = [{
        id: 'ch16-pa-m1', type: 'mcq',
        question: 'When an array is passed to a function, what does the function actually receive?',
        options: ['A full copy of the array', 'The array\'s size', 'A pointer to the first element', 'The array\'s type'],
        correct: ['A pointer to the first element'],
        caseSensitive: false, orderMatters: false,
        hint: 'Arrays decay when passed to functions.',
        feedback: { correct: 'Correct — arrays decay to pointers when passed. Function receives int* pointing to arr[0].', incorrect: 'Array to function = pointer to first element. No copy. This is why functions can modify arrays and why you pass size separately.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write void reverseInPlace(int *arr, int n) that reverses the array in-place using pointer arithmetic. Test with {1,2,3,4,5}.',
        check: out => {
          const nums = out.trim().split(/\s+/).map(n=>parseInt(n)).filter(n=>!isNaN(n))
          return nums[0]===5 && nums[4]===1
        },
        hint: 'for(int i=0;i<n/2;i++){ int t=arr[i]; arr[i]=arr[n-1-i]; arr[n-1-i]=t; }',
        solution:
`void reverseInPlace(int *a,int n){
    for(int i=0;i<n/2;i++){ int t=a[i]; a[i]=a[n-1-i]; a[n-1-i]=t; }
}
int a[]={1,2,3,4,5};
reverseInPlace(a,5);
for(int i=0;i<5;i++) printf("%d ",a[i]);`
      }]

      renderPracticeCh16('practice-ch16-arrays', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-arrays-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-arrays-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-arrays-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This function should double every element but doesn\'t modify the caller\'s array. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode:
`void doubleAll(int arr[], int n) {
    for(int i=0;i<n;i++) {
        int elem=arr[i];
        elem*=2;   /* modifying local copy, not arr[i] */
    }
}
int a[]={1,2,3};
doubleAll(a,3);
for(int i=0;i<3;i++) printf("%d ",a[i]);`,
        checkFn: out => out.includes('2') && out.includes('4') && out.includes('6'),
        hint: 'elem*=2 modifies a local copy. To modify the array: arr[i]*=2 directly.',
        hintTwo: 'Replace int elem=arr[i]; elem*=2; with arr[i]*=2;',
        solution: `void doubleAll(int a[],int n){ for(int i=0;i<n;i++) a[i]*=2; }\nint a[]={1,2,3};\ndoubleAll(a,3);\nfor(int i=0;i<3;i++) printf("%d ",a[i]);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Pointers & Arrays — Assessment', renderAssessment))
  }

  function initTopic_funcs() {
    const topicId = 'ch16-funcs'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-funcs-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int x=10, y=20;
printf("Before: x=%d y=%d\\n", x, y);
swap(&x, &y);
printf("After:  x=%d y=%d\\n", x, y);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-funcs',
      question: 'swap received int *a and int *b. Why is this the ONLY way to actually swap x and y from inside the function?',
      options: [
        'Pointers are larger than ints so they transfer more data',
        'C is pass-by-value — without pointers, the function gets copies and any changes stay local',
        'Swap functions always require pointers by C language rules',
        'Integers cannot be passed to functions directly'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — C passes copies. If swap(x,y) received plain ints, it would swap its own local copies. Passing &x and &y gives addresses, so *a and *b reach the real x and y.',
        incorrect: 'C passes copies. swap(x,y) → a=copy of x, b=copy of y. Swapping copies leaves x and y unchanged. swap(&x,&y) → a=address of x: *a actually IS x.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-funcs-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-funcs-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Write void divmod(int a, int b, int *q, int *r) that sets *q=a/b and *r=a%b. Test with 17/5.',
      includes: ['<stdio.h>'],
      starterCode:
`void divmod(int a, int b, int *q, int *r) {
    /* fill in */
}

int q, r;
divmod(17, 5, &q, &r);
printf("%d / %d = %d rem %d\\n", 17, 5, q, r);`,
      checkFn: out => out.includes('3') && out.includes('2'),
      hint: '*q=a/b; *r=a%b;',
      solution: `void divmod(int a,int b,int *q,int *r){ *q=a/b; *r=a%b; }\nint q,r;\ndivmod(17,5,&q,&r);\nprintf("%d/%d=%d rem %d\\n",17,5,q,r);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-funcs-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to correctly call a function that takes pointer parameters.',
      includes: ['<stdio.h>'],
      starterCode:
`void setValues(int *a, int *b) { *a=10; *b=20; }

int x, y;
setValues([?]x, [?]y);
printf("%d %d\\n", x, y);`,
      blanks: ['&', '&'],
      hint: 'The function expects int* — pass the addresses of x and y using &.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-funcs-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write void minmax(int *arr, int n, int *mn, int *mx) that finds min and max in one loop. Test with {3,7,1,9,4}. Print both results.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('1') && out.includes('9'),
      hint: '*mn=*mx=arr[0]; for(i=1;i<n;i++){ if(arr[i]<*mn)*mn=arr[i]; if(arr[i]>*mx)*mx=arr[i]; }',
      solution:
`void minmax(int *a,int n,int *mn,int *mx){
    *mn=*mx=a[0];
    for(int i=1;i<n;i++){
        if(a[i]<*mn)*mn=a[i];
        if(a[i]>*mx)*mx=a[i];
    }
}
int d[]={3,7,1,9,4},lo,hi;
minmax(d,5,&lo,&hi);
printf("Min:%d Max:%d\\n",lo,hi);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-fn-p1', type: 'predict', question: 'What prints?',
        code: `void add(int *a, int b){ *a+=b; }\nint x=5;\nadd(&x,3);\nprintf("%d\\n",x);`,
        correct: ['8'], caseSensitive: true, orderMatters: true,
        hint: 'add receives address of x. *a+=3 adds 3 to x.',
        feedback: { correct: 'Correct — *a+=b adds b to the value at address a (which is x). x becomes 8.', incorrect: '&x passed → a=&x → *a is x. *a+=3 → x=5+3=8.' }
      }]

      const mcqQ = [{
        id: 'ch16-fn-m1', type: 'mcq',
        question: 'void f(int n){ n=99; } int x=5; f(x); — what is x after?',
        options: ['99', '5', '0', 'undefined'],
        correct: ['5'],
        caseSensitive: false, orderMatters: false,
        hint: 'C passes by value — n is a copy of x.',
        feedback: { correct: 'Correct — n=99 modifies the local copy. x is still 5.', incorrect: 'f receives a copy of x. n=99 only changes the local copy. x remains 5.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write void clamp(int *val, int lo, int hi) that clamps *val to [lo,hi]. Test: int v=150; clamp(&v,0,100); should give v=100.',
        check: out => out.includes('100'),
        hint: 'void clamp(int *v,int lo,int hi){ if(*v<lo)*v=lo; if(*v>hi)*v=hi; }',
        solution: `void clamp(int *v,int lo,int hi){ if(*v<lo)*v=lo; if(*v>hi)*v=hi; }\nint v=150;\nclamp(&v,0,100);\nprintf("%d\\n",v);`
      }]

      renderPracticeCh16('practice-ch16-funcs', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-funcs-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-funcs-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-funcs-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This swap doesn\'t work because it\'s missing the & in the call. Fix it.',
        includes: ['<stdio.h>'],
        starterCode: `void swap(int *a,int *b){ int t=*a;*a=*b;*b=t; }\nint x=3,y=7;\nswap(x,y);  /* missing & */\nprintf("%d %d\\n",x,y);`,
        checkFn: out => { const parts=out.trim().split(/\s+/); return parts[0]==='7'&&parts[1]==='3'; },
        hint: 'swap receives int* but you passed int x and int y (values, not addresses).',
        hintTwo: 'Change swap(x,y) to swap(&x,&y) to pass the addresses.',
        solution: `void swap(int *a,int *b){ int t=*a;*a=*b;*b=t; }\nint x=3,y=7;\nswap(&x,&y);\nprintf("%d %d\\n",x,y);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Passing Pointers to Functions — Assessment', renderAssessment))
  }

  function initTopic_modify() {
    const topicId = 'ch16-modify'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-modify-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Pass by value — caller's var unchanged */
void doubleByVal(int n) { n*=2; }

/* Pass by pointer — caller's var modified */
void doubleByPtr(int *p) { *p*=2; }

int x=5, y=5;
doubleByVal(x);
printf("After byVal: x=%d\\n", x);   /* still 5 */

doubleByPtr(&y);
printf("After byPtr: y=%d\\n", y);   /* now 10 */`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-modify',
      question: 'After doubleByVal(x), x was still 5. After doubleByPtr(&y), y was 10. What is the one change that made the difference?',
      options: [
        'Using *p instead of n for the calculation',
        'Passing &y instead of y — giving the function the address so it can write through the pointer',
        'The function name changed',
        'Using int *p parameter type instead of int n'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — both the parameter type (int*) AND the call-site (&y) are needed. The function needs the address to write to; the caller needs to provide it.',
        incorrect: 'Two things changed: parameter int n → int *p, and call site x → &y. Both are needed: the function must receive a pointer, and you must pass an address.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-modify-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-modify-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add const: change the parameter to const int *p to show the function can READ but cannot WRITE. Verify the read works; try to add a write and see what happens.',
      includes: ['<stdio.h>'],
      starterCode:
`void printDouble(int *p) {
    printf("%d\\n", *p * 2);
}
int x=7;
printDouble(&x);`,
      checkFn: out => out.includes('14'),
      hint: 'Change to const int *p — reads (*p*2) still work but *p=99 would give a compile error.',
      solution: `void printDouble(const int *p){ printf("%d\\n",(*p)*2); }\nint x=7;\nprintDouble(&x);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-modify-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the function signature and call to correctly modify a caller\'s variable.',
      includes: ['<stdio.h>'],
      starterCode:
`void increment([?] *n) {
    [?]n += 1;
}

int count=10;
increment([?]count);
printf("%d\\n", count);`,
      blanks: ['int', '*', '&'],
      hint: 'First: base type for parameter. Second: dereference to write. Third: address-of for the call.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-modify-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write void selectionSortOne(int *arr, int n) that does ONE pass of selection sort (finds min, swaps to front). Apply it 3 times on {5,3,4,1,2} and print after each pass.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('1') && out.includes('2'),
      hint: 'Find index of min in arr[start..n]. Swap arr[start] with arr[minIdx]. start=0 first pass.',
      solution:
`void sortPass(int *a,int n,int start){
    int minI=start;
    for(int i=start+1;i<n;i++) if(a[i]<a[minI]) minI=i;
    int t=a[start]; a[start]=a[minI]; a[minI]=t;
}
int arr[]={5,3,4,1,2};
for(int p=0;p<3;p++){
    sortPass(arr,5,p);
    for(int i=0;i<5;i++) printf("%d ",arr[i]);
    printf("\\n");
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-mo-p1', type: 'predict', question: 'What prints?',
        code: `void reset(int *p){ *p=0; }\nint a=5,b=10;\nreset(&a);\nprintf("%d %d\\n",a,b);`,
        correct: ['0 10'], caseSensitive: true, orderMatters: true,
        hint: 'reset only modifies the variable at &a (which is a). b is untouched.',
        feedback: { correct: 'Correct — a is reset to 0, b unchanged. Output: 0 10.', incorrect: 'reset(&a) sets a=0 via *p. b is never touched. Output: 0 10.' }
      }]

      const mcqQ = [{
        id: 'ch16-mo-m1', type: 'mcq',
        question: 'const int *p means:',
        options: ['p cannot be reassigned to point elsewhere', 'The value at *p cannot be modified through p', 'p must be initialized at declaration', 'p can only point to constants'],
        correct: ['The value at *p cannot be modified through p'],
        caseSensitive: false, orderMatters: false,
        hint: 'The const applies to what p points to, not p itself.',
        feedback: { correct: 'Correct — const int *p: the int at *p is read-only through p. p itself can still be reassigned.', incorrect: 'const int *p: *p is read-only (cannot do *p=5). p itself (the address) can still change to point elsewhere.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write void boundedAdd(int *val, int amount, int max) that adds amount to *val but caps it at max. Test: v=80; boundedAdd(&v,50,100); → v should be 100.',
        check: out => out.includes('100'),
        hint: 'void boundedAdd(int *v,int a,int mx){ *v+=a; if(*v>mx)*v=mx; }',
        solution: `void boundedAdd(int *v,int a,int mx){ *v+=a; if(*v>mx)*v=mx; }\nint v=80;\nboundedAdd(&v,50,100);\nprintf("%d\\n",v);`
      }]

      renderPracticeCh16('practice-ch16-modify', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-modify-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-modify-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-modify-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This function tries to zero two variables but fails. Fix it.',
        includes: ['<stdio.h>'],
        starterCode: `void zeroTwo(int a, int b){ a=0; b=0; }\nint x=5,y=10;\nzeroTwo(x,y);\nprintf("%d %d\\n",x,y);`,
        checkFn: out => out.trim()==='0 0',
        hint: 'a and b are copies. Modifying them doesn\'t affect x and y.',
        hintTwo: 'Change to void zeroTwo(int *a, int *b){ *a=0; *b=0; } and call zeroTwo(&x,&y);',
        solution: `void zeroTwo(int *a,int *b){ *a=0; *b=0; }\nint x=5,y=10;\nzeroTwo(&x,&y);\nprintf("%d %d\\n",x,y);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Modifying Caller Values — Assessment', renderAssessment))
  }

  function initTopic_mistakes() {
    const topicId = 'ch16-mistakes'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch16-mistakes-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Safe demo of pointer pitfalls */

/* Pitfall 1: Uninitialized — always initialize */
int x=42;
int *p=&x;  /* safe: initialized immediately */
printf("Initialized: %d\\n", *p);

/* Pitfall 2: NULL before assignment */
int *q=NULL;
if(q!=NULL) printf("never\\n");
else printf("q is NULL — safe\\n");

/* Pitfall 3: Passing value when address needed */
void setVal(int *ptr){ *ptr=99; }
int n=0;
setVal(&n);   /* correct: pass address */
printf("setVal: %d\\n", n);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch16-mistakes',
      question: 'Which of these is the MOST dangerous pointer bug because it may appear to work but silently corrupts memory?',
      options: [
        'NULL pointer dereference — always crashes immediately',
        'Uninitialized pointer — garbage address may silently write to valid memory you own',
        'Missing & in a function call — compiler usually catches it',
        'Dangling pointer — always detected by the OS'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — an uninitialized pointer may hold a garbage address that happens to be valid memory you own. Writing there silently corrupts another variable. The bug shows up far later. NULL at least crashes immediately.',
        incorrect: 'Uninitialized pointer is most dangerous: garbage address may point to real memory you own. Writing there corrupts it silently. NULL dereference crashes immediately — easier to find.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch16-mistakes-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch16-mistakes-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'The code has missing & bug in the function call. Fix it so the function actually modifies y.',
      includes: ['<stdio.h>'],
      starterCode:
`void triple(int *n){ *n*=3; }
int y=5;
triple(y);  /* bug: should pass &y */
printf("%d\\n",y);`,
      checkFn: out => out.includes('15'),
      hint: 'Change triple(y) to triple(&y).',
      solution: `void triple(int *n){ *n*=3; }\nint y=5;\ntriple(&y);\nprintf("%d\\n",y);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch16-mistakes-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the safe pointer initialization and NULL check pattern.',
      includes: ['<stdio.h>'],
      starterCode:
`int val=77;
int *p = [?];        /* safe initialization */

if (p != [?]) {
    printf("%d\\n", *p);
} else {
    printf("no target\\n");
}

p = [?]val;          /* assign real target */
if (p) printf("%d\\n", *p);`,
      blanks: ['NULL', 'NULL', '&'],
      hint: 'Initialize to NULL, check against NULL, use & to get address.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch16-mistakes-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a safe_increment(int *p) that: 1) checks NULL 2) increments 3) returns 1 on success or 0 on NULL. Test with &x and NULL.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('1') && out.includes('0') || out.includes('success') || out.includes('null'),
      hint: 'int safe_inc(int *p){ if(!p) return 0; (*p)++; return 1; }',
      solution:
`int safe_inc(int *p){ if(!p) return 0; (*p)++; return 1; }
int x=5;
printf("With &x: result=%d x=%d\\n", safe_inc(&x), x);
printf("With NULL: result=%d\\n", safe_inc(NULL));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch16-mk-p1', type: 'predict', question: 'What is wrong with this code?',
        code: `int *p;\n*p = 42;`,
        correct: ['undefined behavior', 'crash', 'uninitialized pointer', 'bug'],
        caseSensitive: false, orderMatters: false,
        hint: 'p is declared but never assigned to a valid address.',
        feedback: { correct: 'Correct — p is uninitialized (holds garbage address). *p=42 writes to a random location — undefined behavior, likely a crash.', incorrect: 'p has no valid address — it holds whatever garbage was in memory. *p=42 writes to an unknown location. Crash or silent corruption.' }
      }]

      const mcqQ = [
        {
          id: 'ch16-mk-m1', type: 'mcq',
          question: 'What is a dangling pointer?',
          options: ['A pointer that is NULL', 'A pointer to memory that is no longer valid (e.g., local variable after function returns)', 'A pointer to a global variable', 'A const pointer'],
          correct: ['A pointer to memory that is no longer valid (e.g., local variable after function returns)'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what happens to local variables when a function returns.',
          feedback: { correct: 'Correct — a dangling pointer references memory that no longer belongs to you. The classic case: returning address of a local variable.', incorrect: 'Dangling pointer = points to dead memory. Example: returning &localVar from a function — the variable is destroyed at return, the pointer is dangling.' }
        },
        {
          id: 'ch16-mk-m2', type: 'mcq',
          question: 'Best practice when declaring a pointer you cannot initialize yet?',
          options: ['Leave it uninitialized', 'Set it to 0', 'Set it to NULL', 'Set it to -1'],
          correct: ['Set it to NULL'],
          caseSensitive: false, orderMatters: false,
          hint: 'Which value makes the bug obvious when accidentally dereferenced?',
          feedback: { correct: 'Correct — int *p = NULL; Dereferencing NULL always crashes immediately. Uninitialized may silently corrupt memory.', incorrect: 'Always initialize to NULL. NULL dereference crashes immediately and predictably. Uninitialized may silently corrupt other data.' }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Fix all four pointer bugs in this snippet:\n1) uninitialized p\n2) missing & in function call\n3) NULL deref without check\n4) int *a, b where b should be a pointer',
        check: out => out.includes('10') && out.includes('20'),
        hint: 'Fix: int *p=&x; safe_fn(&val); if(q!=NULL)*q; int *a,*b;',
        solution:
`void setTen(int *n){ *n=10; }
int x;
int *p=&x;
setTen(p);
printf("%d\\n",*p);
int y=20;
int *q=&y;
if(q!=NULL) printf("%d\\n",*q);`
      }]

      renderPracticeCh16('practice-ch16-mistakes', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch16-mistakes-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch16-mistakes-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch16-mistakes-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'Three pointer bugs. Fix all three to get output: 10 done.',
        includes: ['<stdio.h>'],
        starterCode:
`int x=10;
int *p;          /* bug 1: uninitialized */
printf("%d\\n",*p);

void show(int *n){ printf("%d\\n",*n); }
show(x);         /* bug 2: missing & */

int *q=NULL;
printf("%d\\n",*q);  /* bug 3: NULL deref */`,
        checkFn: out => out.includes('10'),
        hint: 'Fix 1: int *p=&x; Fix 2: show(&x); Fix 3: if(q) or remove the deref.',
        hintTwo: 'Fix all: int *p=&x; printf("%d\\n",*p); show(&x); int *q=NULL; if(q) printf("%d\\n",*q); else printf("done\\n");',
        solution: `int x=10;\nint *p=&x;\nprintf("%d\\n",*p);\nprintf("done\\n");`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Common Pointer Mistakes — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch16-mastery'), {
      mode: 'build', topicId: 'ch16-mastery', chapterId: CH,
      question:
`Chapter 16 Mastery — apply ALL pointer concepts:
① Declare int scores[6]={88,72,95,61,84,77}. Use pointer arithmetic (no [] notation) to compute sum, min, max.
② Write void normalize(int *arr, int n, int *mn, int *mx) that finds min/max via pointer params.
③ Write void swapFirstLast(int *arr, int n) that swaps arr[0] and arr[n-1] using pointer arithmetic.
④ Write int *findFirst(int *arr, int n, int target) that returns a pointer to the first occurrence of target or NULL. Test searching for 95 and for 999.
⑤ Print each result clearly labeled.`,
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => {
        const text = out
        return text.includes('95') &&
               (text.includes('Min') || text.includes('min')) &&
               (text.includes('NULL') || text.includes('null') || text.includes('not found') || text.includes('found'))
      },
      hint: 'Build section by section. Pointer arithmetic: *(arr+i) instead of arr[i].',
      solution:
`void normalize(int *a,int n,int *mn,int *mx){
    *mn=*mx=*a;
    for(int i=1;i<n;i++){
        if(*(a+i)<*mn)*mn=*(a+i);
        if(*(a+i)>*mx)*mx=*(a+i);
    }
}
void swapFL(int *a,int n){
    int t=*a; *a=*(a+n-1); *(a+n-1)=t;
}
int *findFirst(int *a,int n,int t){
    for(int i=0;i<n;i++) if(*(a+i)==t) return a+i;
    return NULL;
}
int scores[]={88,72,95,61,84,77},lo,hi;
int *p=scores,sum=0;
for(int i=0;i<6;i++) sum+=*(p+i);
printf("Sum:%d\\n",sum);
normalize(scores,6,&lo,&hi);
printf("Min:%d Max:%d\\n",lo,hi);
swapFL(scores,6);
printf("After swapFL: %d ... %d\\n",scores[0],scores[5]);
int *found=findFirst(scores,6,95);
if(found) printf("Found 95 at offset %td\\n",found-scores);
else printf("95 not found\\n");
found=findFirst(scores,6,999);
if(!found) printf("999 not found\\n");`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch16-chapter-complete').style.display = 'block'
        $('ch16-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch16-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch17')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh16(containerId, chapterId, topicId, configs) {
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
      header.innerHTML = `<span class="practice-task__num">Task ${i+1} of ${configs.length}</span>` +
        `<span class="practice-task__dots">${configs.map((_,j) =>
          `<span class="dot ${j<i?'dot--done':j===i?'dot--active':''}"></span>`).join('')}</span>`
      container.appendChild(header)
      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      container.appendChild(desc)
      const div = document.createElement('div')
      div.id = `pc16-${topicId}-${cfg.id}`
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
    initTopic_what()
    initTopic_declare()
    initTopic_addressof()
    initTopic_deref()
    initTopic_relationship()
    initTopic_null()
    initTopic_arithmetic()
    initTopic_arrays()
    initTopic_funcs()
    initTopic_modify()
    initTopic_mistakes()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
