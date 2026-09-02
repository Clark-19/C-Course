/* =========================================================
   C LEARNING PLATFORM — chapters/ch8-if-else/ch8.js
   Chapter 8: If / Else
   5 topics · 7-step blocks init immediately (inline)
   Assessment content deferred — only initialized AFTER
   Modal.open() inserts it into the DOM via openAssessmentModal()
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch8'
  function $(id)   { return document.getElementById(id) }
  function btn(t)  { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — THE IF STATEMENT
     ══════════════════════════════════════════════════════════ */
  function initTopic_if() {
    const topicId = 'ch8-if'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch8-if-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int temperature = 35;

if (temperature > 30) {
    printf("It is hot today.\\n");
    printf("Stay hydrated.\\n");
}

printf("This always prints.\\n");

if (temperature < 0) {
    printf("Freezing — this will NOT print.\\n");
}

printf("Done.\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch8-if',
      question: '"Freezing" never printed even though the if statement is there. What decides whether an if body runs?',
      options: [
        'Whether the variable name matches the condition keyword',
        'Whether the condition evaluates to non-zero (true)',
        'Whether the printf is on the same line as the if',
        'The order of declarations in the program'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — the body only runs when the condition is non-zero. temperature < 0 evaluated to 0 (false) so the block was skipped entirely.',
        incorrect: 'The condition in the parentheses is evaluated. If it is non-zero (true), the body runs. temperature < 0 is 0 (false) — so the block was skipped.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch8-if-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch8-if-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change temperature to -5. Predict which lines will now print before running.',
      includes: ['<stdio.h>'],
      starterCode:
`int temperature = 35;

if (temperature > 30) {
    printf("It is hot today.\\n");
}
if (temperature < 0) {
    printf("Freezing!\\n");
}
printf("Done.\\n");`,
      checkFn: output => output.includes('Freezing') && !output.includes('hot'),
      hint: 'Change 35 to -5. temperature > 30 becomes false, temperature < 0 becomes true.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch8-if-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the missing parts of each if statement.',
      includes: ['<stdio.h>'],
      starterCode:
`int score = 80;

[?] (score >= 60) {
    printf("Passed\\n");
}

[?] (score [?] 100) {
    printf("Perfect score\\n");
}`,
      blanks: ['if', 'if', '=='],
      hint: 'The keyword is "if". Score == 100 checks for perfect.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch8-if-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program with int age = 20.\n① If age >= 18, print "Adult"\n② If age >= 65, print "Senior"\n③ If age < 13, print "Child"\n④ Always print "Age checked" at the end',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('Adult') && output.includes('Age checked'),
      hint: 'Three separate if statements then a final printf. age=20 triggers only the first (Adult).',
      solution:
`int age = 20;
if (age >= 18) printf("Adult\\n");
if (age >= 65) printf("Senior\\n");
if (age < 13)  printf("Child\\n");
printf("Age checked\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch8-if-p1', type: 'predict',
          question: 'What prints?',
          code: `int x = 10;\nif (x > 5) {\n    printf("A\\n");\n}\nprintf("B\\n");`,
          correct: ['A\nB','A\r\nB'], caseSensitive: true, orderMatters: true,
          hint: 'x > 5 is true.',
          feedback: { correct: 'Correct — condition true, A prints. B always prints.', incorrect: 'x=10 > 5 is true so A runs. B always runs after the if.' }
        },
        {
          id: 'ch8-if-p2', type: 'predict',
          question: 'What prints?',
          code: `int x = 3;\nif (x > 5) {\n    printf("A\\n");\n}\nprintf("B\\n");`,
          correct: ['B'], caseSensitive: true, orderMatters: true,
          hint: 'x > 5 is false.',
          feedback: { correct: 'Correct — condition false, A is skipped. B still prints.', incorrect: 'x=3 > 5 is false, A is skipped. B is outside the if so it always runs.' }
        },
        {
          id: 'ch8-if-p3', type: 'predict',
          question: 'What prints?',
          code: `int a = 0;\nif (a) {\n    printf("yes\\n");\n}\nprintf("done\\n");`,
          correct: ['done'], caseSensitive: true, orderMatters: true,
          hint: 'if (0) is false.',
          feedback: { correct: 'Correct — a=0 is false, "yes" is skipped. "done" always runs.', incorrect: 'if (0) is false — body skipped. Only "done" prints.' }
        }
      ]
      const mcqQ = [
        { id:'ch8-if-m1', type:'mcq', question:'When does the body of an if statement execute?', options:['Always','When the condition is non-zero (true)','When the condition is zero','Never'], correct:['When the condition is non-zero (true)'], caseSensitive:false, orderMatters:false, hint:'The core rule.', feedback:{correct:'Correct — non-zero = true = body runs.',incorrect:'The body runs only when the condition is non-zero.'} },
        { id:'ch8-if-m2', type:'mcq', question:'Why is it recommended to always use braces { } even for a single-statement if?', options:['Braces make it run faster','Without braces, adding a second statement later silently falls outside the if','Braces are required by the C standard','Single-statement ifs need semicolons'], correct:['Without braces, adding a second statement later silently falls outside the if'], caseSensitive:false, orderMatters:false, hint:'Think about maintenance bugs.', feedback:{correct:'Correct — braces make the scope clear and prevent accidental bugs when code is added later.',incorrect:'Without braces only the next statement is in the if. A second line added later always runs — a silent bug.'} },
        { id:'ch8-if-m3', type:'mcq', question:'if (0) { printf("X"); } — what prints?', options:['X','Nothing','0','Error'], correct:['Nothing'], caseSensitive:true, orderMatters:false, hint:'0 is false.', feedback:{correct:'Correct — if (0) body never runs.',incorrect:'if (0): 0 is false, body is completely skipped.'} },
        { id:'ch8-if-m4', type:'mcq', question:'Two separate if statements vs one if/else — what is the difference?', options:['No difference','Two ifs: both can run if both true. if/else: exactly one always runs.','Two ifs are faster','if/else requires braces, two ifs do not'], correct:['Two ifs: both can run if both true. if/else: exactly one always runs.'], caseSensitive:false, orderMatters:false, hint:'Think about the guarantee if/else provides.', feedback:{correct:'Correct — two ifs are independent; if/else is a guaranteed two-way choice.',incorrect:'Two separate ifs are independent — both can fire. if/else guarantees exactly one branch runs.'} },
        { id:'ch8-if-m5', type:'mcq', question:'What does execution do after an if block whose condition was false?', options:['Terminates the program','Repeats the if block','Continues with the next statement after the if block','Jumps to the end of the function'], correct:['Continues with the next statement after the if block'], caseSensitive:false, orderMatters:false, hint:'The if is just skipped.', feedback:{correct:'Correct — a false if is simply skipped; execution continues normally after it.',incorrect:'False if body is skipped. Execution picks up with whatever comes after the closing brace.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int x=10. Print "Positive" only if x > 0.', check: o=>o.includes('Positive'), hint:'if (x > 0) printf("Positive\\n");', solution:'int x=10;\nif(x>0)printf("Positive\\n");' },
        { id:'p2', task:'int score=45. Print "Failed" only if score < 60.', check: o=>o.includes('Failed'), hint:'if (score < 60) printf("Failed\\n");', solution:'int score=45;\nif(score<60)printf("Failed\\n");' },
        { id:'p3', task:'int n=7. If n is odd (use %), print "Odd".', check: o=>o.includes('Odd'), hint:'if (n % 2 != 0) printf("Odd\\n");', solution:'int n=7;\nif(n%2!=0)printf("Odd\\n");' },
        { id:'p4', task:'int balance=150, cost=200. If balance >= cost, print "Purchase OK". Otherwise print "Insufficient funds".', check: o=>o.includes('Insufficient'), hint:'if (balance >= cost) ... else ...; — wait, use just an if for "Insufficient funds" alone.', solution:'int balance=150,cost=200;\nif(balance>=cost)printf("Purchase OK\\n");\nif(balance<cost)printf("Insufficient funds\\n");' },
        { id:'p5', task:'int a=5, b=3, c=8. Print the largest value using only if statements (no else).', check: o=>o.trim()==='8', hint:'if (a>b && a>c) print a; if (b>a && b>c) print b; if (c>a && c>b) print c;', solution:'int a=5,b=3,c=8;\nif(a>b&&a>c)printf("%d\\n",a);\nif(b>a&&b>c)printf("%d\\n",b);\nif(c>a&&c>b)printf("%d\\n",c);' }
      ]
      renderPracticeCh8('practice-ch8-if', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch8-if-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch8-if-mcq',     questions:mcqQ,     onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch8-if-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'This should print "Adult" when age is 25 but prints nothing. Find the bug.',
        includes:['<stdio.h>'],
        starterCode:'int age = 25;\nif (age >= 18);\n    printf("Adult\\n");',
        checkFn: o=>o.includes('Adult'),
        hint:'Look very carefully at the line that has the if condition.',
        hintTwo:'There is a semicolon after if (age >= 18) — that semicolon is the body (an empty statement). The printf is always outside the if. Remove the semicolon.',
        solution:'int age=25;\nif(age>=18)\n    printf("Adult\\n");',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'The if Statement — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — IF / ELSE
     ══════════════════════════════════════════════════════════ */
  function initTopic_ifelse() {
    const topicId = 'ch8-ifelse'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch8-ifelse-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int score = 72;

if (score >= 60) {
    printf("Result: Pass\\n");
    printf("Grade recorded.\\n");
} else {
    printf("Result: Fail\\n");
    printf("Please retake.\\n");
}

printf("Assessment complete.\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch8-ifelse',
      question: 'Change score to 45 in your head. Which lines would print?',
      options: [
        '"Result: Pass" and "Grade recorded."',
        '"Result: Fail" and "Please retake." and "Assessment complete."',
        'All lines print',
        '"Assessment complete." only'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — 45 < 60 so the else branch runs, then execution falls through to "Assessment complete." which is outside the if/else entirely.',
        incorrect: 'Score 45 fails the condition (45 < 60), so the else body runs: "Fail" and "Please retake." Then "Assessment complete." runs because it is after the entire if/else block.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch8-ifelse-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch8-ifelse-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add an else branch: if speed > 100 print "Speeding", else print "Safe speed". Test with int speed = 85.',
      includes: ['<stdio.h>'],
      starterCode:
`int speed = 85;

if (speed > 100) {
    printf("Speeding\\n");
}`,
      checkFn: output => output.includes('Safe speed'),
      hint: 'Add: } else { printf("Safe speed\\n"); }',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch8-ifelse-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete the if/else structure.',
      includes: ['<stdio.h>'],
      starterCode:
`int balance = 250, price = 300;

if (balance [?] price) {
    printf("Approved\\n");
} [?] {
    printf("Declined\\n");
}`,
      blanks: ['>=', 'else'],
      hint: '>= checks if balance covers the price. The second branch uses "else".',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch8-ifelse-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write an even/odd checker.\n① int n = 17\n② Use if/else with the modulo operator\n③ Print "17 is even" or "17 is odd" — include the number in the output',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('17') && output.toLowerCase().includes('odd'),
      hint: 'if (n % 2 == 0) printf("%d is even\\n", n); else printf("%d is odd\\n", n);',
      solution: 'int n=17;\nif(n%2==0)printf("%d is even\\n",n);\nelse printf("%d is odd\\n",n);',
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch8-ie-p1', type:'predict', question:'What prints? int x=5;',
          code:`int x=5;\nif(x>10){printf("A\\n");}else{printf("B\\n");}`,
          correct:['B'], caseSensitive:true, orderMatters:true,
          hint:'5 is not > 10.', feedback:{correct:'Correct — 5 > 10 false, else runs: B.',incorrect:'x=5 is not > 10 so else branch runs: B.'}
        },
        {
          id:'ch8-ie-p2', type:'predict', question:'What prints? int x=15;',
          code:`int x=15;\nif(x>10){printf("A\\n");}else{printf("B\\n")}printf("C\\n");`,
          correct:['A\nC','A\r\nC'], caseSensitive:true, orderMatters:true,
          hint:'15 > 10 is true. C is outside the if/else.',
          feedback:{correct:'Correct — condition true: A runs. C is after the if/else: always runs.',incorrect:'x=15 > 10 true so A runs. B is skipped. C is after the block — always runs.'}
        },
        {
          id:'ch8-ie-p3', type:'predict', question:'What prints?',
          code:`int a=5,b=5;\nif(a>b)printf("A\\n");\nelse printf("B\\n");`,
          correct:['B'], caseSensitive:true, orderMatters:true,
          hint:'5 > 5 is false.',
          feedback:{correct:'Correct — 5 > 5 is false (not strictly greater), else runs: B.',incorrect:'5 > 5 is false (use >= for ≥). Else runs: B.'}
        }
      ]
      const mcqQ = [
        { id:'ch8-ie-m1', type:'mcq', question:'How many branches of an if/else run on any given execution?', options:['0','1','2','Depends on the condition'], correct:['1'], caseSensitive:true, orderMatters:false, hint:'Exactly one — always.', feedback:{correct:'Correct — exactly one branch always runs.',incorrect:'if/else guarantees exactly one branch runs — never both, never neither.'} },
        { id:'ch8-ie-m2', type:'mcq', question:'What is the difference between two separate ifs and if/else?', options:['No difference','With two ifs both can run; with if/else exactly one runs','if/else is faster','Two ifs require braces'], correct:['With two ifs both can run; with if/else exactly one runs'], caseSensitive:false, orderMatters:false, hint:'Two independent conditions vs one guaranteed choice.', feedback:{correct:'Correct — two ifs are independent; if/else is a mutual-exclusion guarantee.',incorrect:'Two separate ifs can both fire. if/else is mutually exclusive — exactly one.'} },
        { id:'ch8-ie-m3', type:'mcq', question:'The else block has no condition of its own. When does it run?', options:['Always','Never','When the if condition is false','When the if condition is true'], correct:['When the if condition is false'], caseSensitive:false, orderMatters:false, hint:'It is the fallback.', feedback:{correct:'Correct — else is the fallback: runs when if is false.',incorrect:'else has no condition — it runs when the preceding if condition was false.'} },
        { id:'ch8-ie-m4', type:'mcq', question:'int x = 50; if (x > 100) printf("A"); else printf("B"); — what prints?', options:['A','B','AB','Nothing'], correct:['B'], caseSensitive:true, orderMatters:false, hint:'50 is not > 100.', feedback:{correct:'Correct — 50 > 100 is false, else prints B.',incorrect:'50 > 100 is false → else runs → B.'} },
        { id:'ch8-ie-m5', type:'mcq', question:'Can the else clause contain multiple statements?', options:['No — only one statement allowed','Yes — wrap them in braces { }','Only with a nested if','Only if the if also has braces'], correct:['Yes — wrap them in braces { }'], caseSensitive:false, orderMatters:false, hint:'Braces create a block of any size.', feedback:{correct:'Correct — use braces to include any number of statements in an else.',incorrect:'Braces let any branch contain as many statements as needed.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int temp=25. Print "Warm" if temp >= 20, else "Cool".', check: o=>o.includes('Warm'), hint:'if (temp >= 20) printf("Warm\\n"); else printf("Cool\\n");', solution:'int temp=25;\nif(temp>=20)printf("Warm\\n");else printf("Cool\\n");' },
        { id:'p2', task:'int n=0. Print "Zero" if n == 0, else print "Non-zero".', check: o=>o.includes('Zero'), hint:'if (n == 0) printf("Zero\\n"); else ...', solution:'int n=0;\nif(n==0)printf("Zero\\n");else printf("Non-zero\\n");' },
        { id:'p3', task:'int a=8, b=3. Print the larger value using if/else.', check: o=>o.trim()==='8', hint:'if (a > b) printf("%d\\n", a); else printf("%d\\n", b);', solution:'int a=8,b=3;\nif(a>b)printf("%d\\n",a);else printf("%d\\n",b);' },
        { id:'p4', task:'int year=2024. Print "Leap" if year % 4 == 0, else "Not leap".', check: o=>o.includes('Leap'), hint:'if (year % 4 == 0) printf("Leap\\n"); else ...', solution:'int year=2024;\nif(year%4==0)printf("Leap\\n");else printf("Not leap\\n");' },
        { id:'p5', task:'int stock=0. Print "Available" if stock > 0, else "Out of stock".', check: o=>o.includes('Out of stock'), hint:'if (stock > 0) ... else printf("Out of stock\\n");', solution:'int stock=0;\nif(stock>0)printf("Available\\n");else printf("Out of stock\\n");' }
      ]
      renderPracticeCh8('practice-ch8-ifelse', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch8-ifelse-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch8-ifelse-mcq', questions:mcqQ, onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch8-ifelse-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'This should print "Pass" for score=75 and "Fail" otherwise, but both print every time.',
        includes:['<stdio.h>'],
        starterCode:'int score=75;\nif(score>=60)\n    printf("Pass\\n");\nprintf("Fail\\n");',
        checkFn: o=>o.includes('Pass') && !o.includes('Fail'),
        hint:'Is "Fail" inside the if, or always running?',
        hintTwo:'"Fail" has no else — it is a separate statement that always runs. Add "else" before it.',
        solution:'int score=75;\nif(score>=60)printf("Pass\\n");\nelse printf("Fail\\n");',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'if / else — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — ELSE IF CHAINS
     ══════════════════════════════════════════════════════════ */
  function initTopic_elseif() {
    const topicId = 'ch8-elseif'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch8-elseif-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int score = 85;

if (score >= 90) {
    printf("Grade: A\\n");
} else if (score >= 80) {
    printf("Grade: B\\n");   /* matches here — stops */
} else if (score >= 70) {
    printf("Grade: C\\n");   /* skipped */
} else if (score >= 60) {
    printf("Grade: D\\n");   /* skipped */
} else {
    printf("Grade: F\\n");   /* skipped */
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch8-elseif',
      question: 'Score 85 matched "Grade: B" and printed it. Score 85 also satisfies score >= 70 and score >= 60. Why were those not printed?',
      options: [
        'C only evaluates the last else if',
        'Once one condition matches, the rest of the chain is skipped entirely',
        'The lower conditions were unreachable due to a compiler optimization',
        'Only the first and last conditions are checked'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — first match wins. As soon as "score >= 80" was true, C ran that body and jumped past every remaining else if and else.',
        incorrect: 'In an else if chain, the first matching condition fires and all remaining branches are skipped. Only one body can ever run.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch8-elseif-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch8-elseif-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'The grade conditions are in the wrong order — lowest first. Fix the order so scores are classified correctly. Test with score = 95 (should print A).',
      includes: ['<stdio.h>'],
      starterCode:
`int score = 95;

if (score >= 60) {
    printf("Grade: D\\n");
} else if (score >= 70) {
    printf("Grade: C\\n");
} else if (score >= 80) {
    printf("Grade: B\\n");
} else if (score >= 90) {
    printf("Grade: A\\n");
} else {
    printf("Grade: F\\n");
}`,
      checkFn: output => output.includes('Grade: A'),
      hint: 'Reverse the order — put >= 90 first, then >= 80, then >= 70, then >= 60, then else for F.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch8-elseif-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the keywords to complete this BMI classifier.',
      includes: ['<stdio.h>'],
      starterCode:
`float bmi = 22.5;

[?] (bmi < 18.5) {
    printf("Underweight\\n");
} [?] [?] (bmi < 25.0) {
    printf("Normal\\n");
} [?] [?] (bmi < 30.0) {
    printf("Overweight\\n");
} [?] {
    printf("Obese\\n");
}`,
      blanks: ['if', 'else', 'if', 'else', 'if', 'else'],
      hint: 'First branch: if. Middle branches: else if. Last branch: else.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch8-elseif-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a traffic light classifier.\n① int light = 2  (1=red, 2=yellow, 3=green)\n② else if chain: 1 → "Stop", 2 → "Caution", 3 → "Go", else → "Invalid"\n③ Print only the matching action',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('Caution'),
      hint: 'if (light == 1) ... else if (light == 2) ... else if (light == 3) ... else ...',
      solution:
`int light = 2;
if (light == 1)      printf("Stop\\n");
else if (light == 2) printf("Caution\\n");
else if (light == 3) printf("Go\\n");
else                 printf("Invalid\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch8-ei-p1', type:'predict',
          question:'What prints? int x=5;',
          code:`int x=5;\nif(x>10)printf("A\\n");\nelse if(x>3)printf("B\\n");\nelse printf("C\\n");`,
          correct:['B'], caseSensitive:true, orderMatters:true,
          hint:'x=5: 5>10 false, 5>3 true → B.',
          feedback:{correct:'Correct — first condition false, second true → B.',incorrect:'5>10 false. 5>3 true → B fires, C is skipped.'}
        },
        {
          id:'ch8-ei-p2', type:'predict',
          question:'What prints? int x=1;',
          code:`int x=1;\nif(x>10)printf("A\\n");\nelse if(x>3)printf("B\\n");\nelse printf("C\\n");`,
          correct:['C'], caseSensitive:true, orderMatters:true,
          hint:'All conditions false → else.',
          feedback:{correct:'Correct — both conditions false, else runs: C.',incorrect:'1>10 false. 1>3 false. Both fail → else → C.'}
        },
        {
          id:'ch8-ei-p3', type:'predict',
          question:'What prints? int x=15;',
          code:`int x=15;\nif(x>10)printf("A\\n");\nelse if(x>5)printf("B\\n");\nelse printf("C\\n");`,
          correct:['A'], caseSensitive:true, orderMatters:true,
          hint:'15>10 is true — first match wins.',
          feedback:{correct:'Correct — 15>10 is true, A prints, rest skipped.',incorrect:'First condition 15>10 is true → A fires immediately. B and C are both skipped.'}
        }
      ]
      const mcqQ = [
        { id:'ch8-ei-m1', type:'mcq', question:'In an else if chain, how many branches can execute?', options:['All that match','At most one — the first match','Exactly two','Exactly zero'], correct:['At most one — the first match'], caseSensitive:false, orderMatters:false, hint:'First match wins.', feedback:{correct:'Correct — at most one branch runs: the first one whose condition is true.',incorrect:'Only the first matching branch runs. All others are skipped once a match is found.'} },
        { id:'ch8-ei-m2', type:'mcq', question:'Why should a grade classifier check >= 90 before >= 80?', options:['Faster execution','If >= 80 is checked first, a score of 95 matches it and never reaches >= 90','The compiler requires descending order','else if only works in descending order'], correct:['If >= 80 is checked first, a score of 95 matches it and never reaches >= 90'], caseSensitive:false, orderMatters:false, hint:'First match wins.', feedback:{correct:'Correct — 95 satisfies >= 80, so if that is first it fires and >= 90 is never reached.',incorrect:'Order matters: 95 >= 80 is true, so if that check comes first it fires. You need the more specific condition (>= 90) checked first.'} },
        { id:'ch8-ei-m3', type:'mcq', question:'Is a final else required in an else if chain?', options:['Yes — always','No — it is optional; without it the chain may do nothing if no condition matches','Yes — the compiler errors without it','Only if there are more than 2 else ifs'], correct:['No — it is optional; without it the chain may do nothing if no condition matches'], caseSensitive:false, orderMatters:false, hint:'Think about what happens with no match and no else.', feedback:{correct:'Correct — else is optional. Without it, if no condition matches, nothing runs.',incorrect:'else is optional. Without it, a chain that finds no match just skips everything and continues after.'} },
        { id:'ch8-ei-m4', type:'mcq', question:'How is else if different from a new if on a new line?', options:['No difference','else if only runs if the previous condition was false; a new if always tests independently','else if is faster','else if requires parentheses'], correct:['else if only runs if the previous condition was false; a new if always tests independently'], caseSensitive:false, orderMatters:false, hint:'The "else" part gates it.', feedback:{correct:'Correct — else if is linked: only evaluated if the previous branch was false.',incorrect:'else if is conditional on the previous condition being false. A separate if is always evaluated independently.'} },
        { id:'ch8-ei-m5', type:'mcq', question:'int x=100. if (x>50) A else if (x>80) B else C — what prints?', options:['A','B','C','A and B'], correct:['A'], caseSensitive:true, orderMatters:false, hint:'First match wins.', feedback:{correct:'Correct — 100>50 fires first, A prints, chain exits.',incorrect:'100>50 is true — A fires immediately. B and C are never reached.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int score=72. Classify: A(90+), B(80-89), C(70-79), D(60-69), F(<60). Print the letter.', check: o=>o.trim()==='C', hint:'if (score>=90) ... else if (score>=80) ...', solution:'int score=72;\nif(score>=90)printf("A\\n");\nelse if(score>=80)printf("B\\n");\nelse if(score>=70)printf("C\\n");\nelse if(score>=60)printf("D\\n");\nelse printf("F\\n");' },
        { id:'p2', task:'int hour=14. Classify: Morning(0-11), Afternoon(12-17), Evening(18-21), Night(22-23).', check: o=>o.includes('Afternoon'), hint:'if (hour < 12) ... else if (hour < 18) ...', solution:'int hour=14;\nif(hour<12)printf("Morning\\n");\nelse if(hour<18)printf("Afternoon\\n");\nelse if(hour<22)printf("Evening\\n");\nelse printf("Night\\n");' },
        { id:'p3', task:'int speed=95. Classify: Stopped(0), Slow(1-30), Normal(31-90), Fast(91-120), Dangerous(>120).', check: o=>o.includes('Fast'), hint:'if (speed==0) ... else if (speed<=30) ...', solution:'int speed=95;\nif(speed==0)printf("Stopped\\n");\nelse if(speed<=30)printf("Slow\\n");\nelse if(speed<=90)printf("Normal\\n");\nelse if(speed<=120)printf("Fast\\n");\nelse printf("Dangerous\\n");' },
        { id:'p4', task:'int month=9. Print the season: Dec-Feb=Winter, Mar-May=Spring, Jun-Aug=Summer, Sep-Nov=Autumn.', check: o=>o.includes('Autumn'), hint:'Use || to match multiple months: if (month==12||month<=2) ...', solution:'int month=9;\nif(month==12||month<=2)printf("Winter\\n");\nelse if(month<=5)printf("Spring\\n");\nelse if(month<=8)printf("Summer\\n");\nelse printf("Autumn\\n");' },
        { id:'p5', task:'int x=0. Three-way: print "Negative", "Zero", or "Positive" using else if.', check: o=>o.includes('Zero'), hint:'if (x < 0) ... else if (x == 0) ... else ...', solution:'int x=0;\nif(x<0)printf("Negative\\n");\nelse if(x==0)printf("Zero\\n");\nelse printf("Positive\\n");' }
      ]
      renderPracticeCh8('practice-ch8-elseif', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch8-elseif-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch8-elseif-mcq', questions:mcqQ, onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch8-elseif-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'Score 95 should print "A" but prints "D". The conditions are in the wrong order — fix them.',
        includes:['<stdio.h>'],
        starterCode:
`int score = 95;
if      (score >= 60) printf("D\\n");
else if (score >= 70) printf("C\\n");
else if (score >= 80) printf("B\\n");
else if (score >= 90) printf("A\\n");
else                  printf("F\\n");`,
        checkFn: o=>o.trim()==='A',
        hint:'Which condition does score=95 hit first?',
        hintTwo:'95 >= 60 fires immediately and prints D. Fix: put >= 90 first, then >= 80, then >= 70, then >= 60.',
        solution:'int score=95;\nif(score>=90)printf("A\\n");\nelse if(score>=80)printf("B\\n");\nelse if(score>=70)printf("C\\n");\nelse if(score>=60)printf("D\\n");\nelse printf("F\\n");',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'else if Chains — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — NESTED IF
     ══════════════════════════════════════════════════════════ */
  function initTopic_nested() {
    const topicId = 'ch8-nested'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch8-nested-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int age = 20, has_id = 1, is_member = 0;

if (age >= 18) {
    printf("Age OK\\n");
    if (has_id) {
        printf("ID OK\\n");
        if (is_member) {
            printf("Member discount applied\\n");
        } else {
            printf("Standard price\\n");
        }
    } else {
        printf("ID required\\n");
    }
} else {
    printf("Must be 18+\\n");
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch8-nested',
      question: '"Member discount applied" never printed. age=20 and has_id=1 both passed. What stopped the innermost branch?',
      options: [
        'Nested if statements always skip the innermost block',
        'is_member = 0 is false, so the innermost if body was skipped, and the else ran instead',
        'The program can only pass two levels of nesting',
        'has_id being 1 blocked the inner check'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — each nested if is its own independent condition. is_member=0 (false) means the innermost if body is skipped; the else ("Standard price") runs instead.',
        incorrect: 'Each nested if evaluates independently. is_member=0 is false, so the innermost body is skipped and its else runs — "Standard price".'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch8-nested-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch8-nested-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change is_member to 1. Predict the full output before running.',
      includes: ['<stdio.h>'],
      starterCode:
`int age = 20, has_id = 1, is_member = 0;

if (age >= 18) {
    if (has_id) {
        if (is_member) {
            printf("Member discount\\n");
        } else {
            printf("Standard price\\n");
        }
    } else {
        printf("ID required\\n");
    }
} else {
    printf("Must be 18+\\n");
}`,
      checkFn: output => output.includes('Member discount'),
      hint: 'Change is_member from 0 to 1. All three conditions are now true.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch8-nested-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the values so the output prints "Cleared" (all three checks must pass).',
      includes: ['<stdio.h>'],
      starterCode:
`int security_pass = [?];
int badge_scan    = [?];
int biometric_ok  = [?];

if (security_pass) {
    if (badge_scan) {
        if (biometric_ok) {
            printf("Cleared\\n");
        } else {
            printf("Biometric failed\\n");
        }
    } else {
        printf("Badge not scanned\\n");
    }
} else {
    printf("No security pass\\n");
}`,
      blanks: ['1', '1', '1'],
      hint: 'All three must be 1 (true) for "Cleared" to print.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch8-nested-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a loan qualifier.\n① int income=55000, int credit=710, int employed=1\n② Outer if: income >= 40000\n③ Nested if: credit >= 700\n④ Innermost if: employed == 1 → print "Approved"\n⑤ Each else prints what specific condition failed',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('Approved'),
      hint: 'if (income >= 40000) { if (credit >= 700) { if (employed == 1) printf("Approved\\n"); else ... } else ... } else ...',
      solution:
`int income=55000, credit=710, employed=1;
if (income >= 40000) {
    if (credit >= 700) {
        if (employed == 1) printf("Approved\\n");
        else printf("Must be employed\\n");
    } else printf("Credit too low\\n");
} else printf("Income too low\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch8-ne-p1', type:'predict',
          question:'What prints? int a=1, b=1;',
          code:`int a=1,b=1;\nif(a){\n  if(b)printf("Both\\n");\n  else printf("A only\\n");\n}else printf("Neither\\n");`,
          correct:['Both'], caseSensitive:true, orderMatters:true,
          hint:'Both a and b are non-zero.',
          feedback:{correct:'Correct — a true, b true → "Both".',incorrect:'a=1 true, b=1 true → inner if body: Both.'}
        },
        {
          id:'ch8-ne-p2', type:'predict',
          question:'What prints? int a=1, b=0;',
          code:`int a=1,b=0;\nif(a){\n  if(b)printf("Both\\n");\n  else printf("A only\\n");\n}else printf("Neither\\n");`,
          correct:['A only'], caseSensitive:true, orderMatters:true,
          hint:'a=1 outer passes, b=0 inner fails.',
          feedback:{correct:'Correct — outer true, inner false → else of inner: "A only".',incorrect:'a=1: outer passes. b=0: inner if false → inner else: "A only".'}
        },
        {
          id:'ch8-ne-p3', type:'predict',
          question:'What prints? int a=0, b=1;',
          code:`int a=0,b=1;\nif(a){\n  if(b)printf("Both\\n");\n  else printf("A only\\n");\n}else printf("Neither\\n");`,
          correct:['Neither'], caseSensitive:true, orderMatters:true,
          hint:'Outer if fails — inner is never reached.',
          feedback:{correct:'Correct — a=0 outer false → outer else: "Neither". Inner block never entered.',incorrect:'a=0: outer if fails. Inner if is never evaluated. Outer else runs: "Neither".'}
        }
      ]
      const mcqQ = [
        { id:'ch8-ne-m1', type:'mcq', question:'When is the inner if tested in a nested structure?', options:['Always','Only if the outer if condition is true','Only if the outer if condition is false','Only if both conditions involve the same variable'], correct:['Only if the outer if condition is true'], caseSensitive:false, orderMatters:false, hint:'The outer if gates the inner.', feedback:{correct:'Correct — the inner if is only reached if the outer condition passed.',incorrect:'The inner if is inside the outer if body — only executed when the outer condition is true.'} },
        { id:'ch8-ne-m2', type:'mcq', question:'What is the "dangling else" problem?', options:['An else with no condition','Ambiguity about which if an else belongs to when braces are omitted','An else that always runs','An else inside a loop'], correct:['Ambiguity about which if an else belongs to when braces are omitted'], caseSensitive:false, orderMatters:false, hint:'Without braces, the compiler has a rule — but it may not match your intent.', feedback:{correct:'Correct — without braces, an else pairs with the nearest preceding if, which may not be what you intended.',incorrect:'Dangling else: without braces, the else pairs with the nearest if. Use braces to make intent explicit.'} },
        { id:'ch8-ne-m3', type:'mcq', question:'How deep should you normally nest if statements before refactoring?', options:['1','2-3 maximum','10 or more is fine','No limit'], correct:['2-3 maximum'], caseSensitive:false, orderMatters:false, hint:'Readability degrades quickly.', feedback:{correct:'Correct — 2–3 levels is the practical limit before code becomes hard to follow.',incorrect:'Beyond 2–3 levels, nesting becomes hard to read. Consider combining with && or extracting to functions.'} },
        { id:'ch8-ne-m4', type:'mcq', question:'Can you replace some nested ifs with && conditions?', options:['Never','Yes — if (outer && inner) is often equivalent and simpler','Only with == operators','Only if both ifs have the same variable'], correct:['Yes — if (outer && inner) is often equivalent and simpler'], caseSensitive:false, orderMatters:false, hint:'AND combines two conditions in one.', feedback:{correct:'Correct — if (a && b) is cleaner than if (a) { if (b) { } } when there is no separate handling needed for each level.',incorrect:'if (outer && inner) is equivalent when you do not need separate else handling at each nesting level.'} },
        { id:'ch8-ne-m5', type:'mcq', question:'In: if (a) if (b) X; else Y; — which if does else belong to?', options:['The outer if (a)','The inner if (b)','Both','Neither — compile error'], correct:['The inner if (b)'], caseSensitive:false, orderMatters:false, hint:'C pairs else with the nearest if.', feedback:{correct:'Correct — in C, else pairs with the nearest preceding if without an else. That is the inner if (b).',incorrect:'C rule: else pairs with the nearest unmatched if — the inner if (b). Use braces to override.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int logged=1, is_admin=0. Nested: if logged in, then if is_admin print "Admin", else "User". If not logged, print "Login required".', check: o=>o.includes('User'), hint:'if (logged) { if (is_admin) ... else ... } else ...', solution:'int logged=1,is_admin=0;\nif(logged){if(is_admin)printf("Admin\\n");else printf("User\\n");}else printf("Login required\\n");' },
        { id:'p2', task:'int age=20, has_ticket=1. If age >= 18 AND has_ticket, print "Enter". If age >= 18 but no ticket, print "Buy ticket". If under 18, print "Too young".', check: o=>o.includes('Enter'), hint:'if (age >= 18) { if (has_ticket) ... else ... } else ...', solution:'int age=20,has_ticket=1;\nif(age>=18){if(has_ticket)printf("Enter\\n");else printf("Buy ticket\\n");}else printf("Too young\\n");' },
        { id:'p3', task:'int x=5. Nested range: if x >= 0, then if x <= 10, print "In range 0-10". Else if x > 10, print "Too high". If x < 0, print "Negative".', check: o=>o.includes('In range'), hint:'if (x >= 0) { if (x <= 10) ... else ... } else ...', solution:'int x=5;\nif(x>=0){if(x<=10)printf("In range 0-10\\n");else printf("Too high\\n");}else printf("Negative\\n");' },
        { id:'p4', task:'int a=3, b=7, c=5. Find the maximum using nested ifs.', check: o=>o.trim()==='7', hint:'if (a >= b) { if (a >= c) print a else print c } else { if (b >= c) print b else print c }', solution:'int a=3,b=7,c=5;\nif(a>=b){if(a>=c)printf("%d\\n",a);else printf("%d\\n",c);}else{if(b>=c)printf("%d\\n",b);else printf("%d\\n",c);}' },
        { id:'p5', task:'int score=85, attendance=90. Print "Honors" only if score >= 80 AND attendance >= 85. Otherwise print which requirement was not met.', check: o=>o.includes('Honors'), hint:'if (score >= 80) { if (attendance >= 85) "Honors" else "Attendance too low" } else "Score too low"', solution:'int score=85,attendance=90;\nif(score>=80){if(attendance>=85)printf("Honors\\n");else printf("Attendance too low\\n");}else printf("Score too low\\n");' }
      ]
      renderPracticeCh8('practice-ch8-nested', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch8-nested-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch8-nested-mcq', questions:mcqQ, onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch8-nested-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'This prints "Welcome" even when is_banned=1. Find the logic error.',
        includes:['<stdio.h>'],
        starterCode:'int logged_in=1, is_banned=1;\nif(logged_in){\n    printf("Welcome\\n");\n    if(is_banned){\n        printf("You are banned\\n");\n    }\n}',
        checkFn: o=>!o.includes('Welcome') || o.includes('banned'),
        hint:'Welcome prints before the ban check. Should it?',
        hintTwo:'Check ban FIRST inside the outer if. If banned, print "You are banned". Otherwise print "Welcome".',
        solution:'int logged_in=1,is_banned=1;\nif(logged_in){\n    if(is_banned)printf("You are banned\\n");\n    else printf("Welcome\\n");\n}',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Nested if — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — TERNARY OPERATOR
     ══════════════════════════════════════════════════════════ */
  function initTopic_ternary() {
    const topicId = 'ch8-ternary'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch8-ternary-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int score = 75;

/* Ternary used in assignment */
char *result = (score >= 60) ? "Pass" : "Fail";
printf("Result: %s\\n", result);

/* Ternary used directly in printf */
printf("Status: %s\\n", (score >= 90) ? "Excellent" : "OK");

/* Ternary to find max of two values */
int a = 12, b = 8;
int max = (a > b) ? a : b;
printf("Max: %d\\n", max);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch8-ternary',
      question: 'The ternary was used inside printf directly. Why can\'t you put a regular if/else inside a printf() argument?',
      options: [
        'printf() blocks if/else syntax',
        'if/else is a statement — it does not produce a value. The ternary is an expression that evaluates to a value',
        'The ternary is faster so printf prefers it',
        'if/else requires a newline before it can be used'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — the ternary is an expression: it evaluates to one of two values. An if/else is a statement: it executes code but produces no value you can embed in a function call.',
        incorrect: 'The key distinction: ternary is an expression (produces a value). if/else is a statement (executes code). printf() needs an expression — a value — so only ternary works inline.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch8-ternary-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch8-ternary-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Rewrite this if/else as a single ternary expression in a printf call.',
      includes: ['<stdio.h>'],
      starterCode:
`int temp = 18;

if (temp >= 20) {
    printf("Warm\\n");
} else {
    printf("Cool\\n");
}`,
      checkFn: output => output.includes('Cool'),
      hint: 'printf("%s\\n", (temp >= 20) ? "Warm" : "Cool");',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch8-ternary-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the ternary operators.',
      includes: ['<stdio.h>'],
      starterCode:
`int n = 7;
printf("%s\\n", (n % 2 == 0) [?] "even" [?] "odd");

int a = 5, b = 9;
int min = (a < b) [?] a [?] b;
printf("Min: %d\\n", min);`,
      blanks: ['?', ':', '?', ':'],
      hint: 'Ternary format: condition ? value_if_true : value_if_false',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch8-ternary-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a unit-price printer using ternary.\n① int qty = 1\n② If qty == 1 use the word "item", else "items" (pluralize)\n③ Print: "1 item" or "N items"\n④ Use a single printf with ternary — no if/else allowed',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('1 item') && !output.includes('1 items'),
      hint: 'printf("%d %s\\n", qty, (qty == 1) ? "item" : "items");',
      solution: 'int qty=1;\nprintf("%d %s\\n", qty, (qty==1)?"item":"items");',
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch8-tn-p1', type:'predict',
          question:'What prints?',
          code:`int x=10;\nprintf("%d\\n", (x>5)?1:0);`,
          correct:['1'], caseSensitive:true, orderMatters:true,
          hint:'10 > 5 is true → 1.',
          feedback:{correct:'Correct — 10>5 true → ternary gives 1.',incorrect:'10>5 is true → ternary evaluates to 1.'}
        },
        {
          id:'ch8-tn-p2', type:'predict',
          question:'What prints?',
          code:`int a=3,b=7;\nprintf("%d\\n",(a>b)?a:b);`,
          correct:['7'], caseSensitive:true, orderMatters:true,
          hint:'3 > 7 is false → b.',
          feedback:{correct:'Correct — 3>7 false → b=7.',incorrect:'a>b is false → ternary gives b=7.'}
        },
        {
          id:'ch8-tn-p3', type:'predict',
          question:'What prints?',
          code:`int n=4;\nprintf("%s\\n",(n%2==0)?"even":"odd");`,
          correct:['even'], caseSensitive:true, orderMatters:true,
          hint:'4 % 2 == 0 is true.',
          feedback:{correct:'Correct — 4%2==0 true → "even".',incorrect:'4%2=0, 0==0 true → "even".'}
        }
      ]
      const mcqQ = [
        { id:'ch8-tn-m1', type:'mcq', question:'How many operands does the ternary operator take?', options:['1','2','3','4'], correct:['3'], caseSensitive:true, orderMatters:false, hint:'condition ? a : b', feedback:{correct:'Correct — three: condition, true-value, false-value.',incorrect:'Ternary has three operands: condition ? true_value : false_value.'} },
        { id:'ch8-tn-m2', type:'mcq', question:'What is the key difference between ternary and if/else?', options:['Ternary is faster','Ternary is an expression (produces a value); if/else is a statement (executes code)','They are identical','Ternary requires braces'], correct:['Ternary is an expression (produces a value); if/else is a statement (executes code)'], caseSensitive:false, orderMatters:false, hint:'Can you put if/else inside printf()?', feedback:{correct:'Correct — expression vs statement. Ternary produces a value usable anywhere.',incorrect:'Ternary = expression (has a value). if/else = statement (no value). That is why ternary works inside printf().'} },
        { id:'ch8-tn-m3', type:'mcq', question:'int max = (a > b) ? a : b; — what does max hold?', options:['Always a','Always b','The larger of a and b','The sum of a and b'], correct:['The larger of a and b'], caseSensitive:false, orderMatters:false, hint:'If a > b: give a. Else: give b.', feedback:{correct:'Correct — the ternary selects whichever is larger.',incorrect:'If a > b, ternary gives a. Otherwise gives b. Result: the larger value.'} },
        { id:'ch8-tn-m4', type:'mcq', question:'When should you use ternary instead of if/else?', options:['Always — ternary is better','When selecting between two simple values inline','When there are multiple statements per branch','Never — they are equally good always'], correct:['When selecting between two simple values inline'], caseSensitive:false, orderMatters:false, hint:'Think: one value vs multiple statements.', feedback:{correct:'Correct — ternary is ideal for simple two-value selection. Use if/else for multiple statements or complex logic.',incorrect:'Ternary works best for selecting between two values inline. For multiple statements or complex logic, if/else is clearer.'} },
        { id:'ch8-tn-m5', type:'mcq', question:'(1 == 1) ? "yes" : "no" — what value does this expression produce?', options:['"no"','"yes"','1','0'], correct:['"yes"'], caseSensitive:true, orderMatters:false, hint:'1 == 1 is true.', feedback:{correct:'Correct — 1==1 is true → "yes".',incorrect:'1==1 is true → ternary evaluates to "yes".'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int x=42. Use ternary to print "positive" if x > 0, else "non-positive".', check: o=>o.includes('positive'), hint:'printf("%s\\n", (x>0)?"positive":"non-positive");', solution:'int x=42;\nprintf("%s\\n",(x>0)?"positive":"non-positive");' },
        { id:'p2', task:'int a=10, b=20. Store the maximum in int max using ternary. Print max.', check: o=>o.trim()==='20', hint:'int max = (a > b) ? a : b;', solution:'int a=10,b=20;\nint max=(a>b)?a:b;\nprintf("%d\\n",max);' },
        { id:'p3', task:'int count=1. Print "1 message" or "N messages" — pluralize correctly using ternary.', check: o=>o.includes('1 message') && !o.includes('messages'), hint:'printf("%d %s\\n", count, (count==1)?"message":"messages");', solution:'int count=1;\nprintf("%d %s\\n",count,(count==1)?"message":"messages");' },
        { id:'p4', task:'float gpa=3.8. Use ternary: if gpa >= 3.5 print "Dean\'s List", else "Standard".', check: o=>o.includes("Dean"), hint:'printf("%s\\n", (gpa >= 3.5) ? "Dean\'s List" : "Standard");', solution:'float gpa=3.8;\nprintf("%s\\n",(gpa>=3.5)?"Dean\'s List":"Standard");' },
        { id:'p5', task:'int temp=28. Use ternary inside printf to print "Celsius: 28 (hot)" or "Celsius: 28 (cool)" depending on whether temp > 25.', check: o=>o.includes('28') && o.includes('hot'), hint:'printf("Celsius: %d (%s)\\n", temp, (temp>25)?"hot":"cool");', solution:'int temp=28;\nprintf("Celsius: %d (%s)\\n",temp,(temp>25)?"hot":"cool");' }
      ]
      renderPracticeCh8('practice-ch8-ternary', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch8-ternary-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch8-ternary-mcq', questions:mcqQ, onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch8-ternary-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'This should print "Pass" for score=70, but the ternary operators are switched. Fix it.',
        includes:['<stdio.h>'],
        starterCode:'int score=70;\nprintf("%s\\n", (score>=60) ? "Fail" : "Pass");',
        checkFn: o=>o.includes('Pass'),
        hint:'Check which value appears after ? and which appears after :',
        hintTwo:'The values are swapped: true gives "Fail" and false gives "Pass". Swap them: ? "Pass" : "Fail"',
        solution:'int score=70;\nprintf("%s\\n",(score>=60)?"Pass":"Fail");',
        onPass:()=>{ Progress.saveTopicComplete(CH, topicId) }
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Ternary Operator — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     CHAPTER 8 MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch8-mastery'), {
      mode: 'build',
      topicId: 'ch8-mastery',
      chapterId: CH,
      question:
`Build a complete student report card generator.

① int score=82, int attendance=88, int assignments=9 (out of 10)
② Use else if: grade A(90+), B(80-89), C(70-79), D(60-69), F(below 60)
③ Nested if: if grade is A or B, check attendance >= 85 → "Honors eligible" else "Good standing"
④ Ternary: print assignments score as "9/10 (excellent)" if >= 9, else "9/10 (needs work)"
⑤ Print all results clearly labeled`,
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output =>
        output.includes('B') && output.includes('Honors') && output.includes('excellent'),
      hint: 'Grade with else if first. Then nest: if (grade is B or A) check attendance. Then ternary for assignments.',
      solution:
`int score=82, attendance=88, assignments=9;
char *grade;
if      (score>=90) grade="A";
else if (score>=80) grade="B";
else if (score>=70) grade="C";
else if (score>=60) grade="D";
else                grade="F";
printf("Grade: %s\\n", grade);

if (score>=80) {
    if (attendance>=85) printf("Honors eligible\\n");
    else                printf("Good standing\\n");
}

printf("Assignments: %d/10 (%s)\\n",
       assignments,
       (assignments>=9)?"excellent":"needs work");`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch8-chapter-complete').style.display = 'block'
        $('ch8-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch8-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch9')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE SET HELPER
     Called only after Modal.open() — containers exist in DOM
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh8(containerId, chapterId, topicId, configs) {
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
        `<span class="practice-task__num">Task ${i+1} of ${configs.length}</span>` +
        `<span class="practice-task__dots">${configs.map((_,j) =>
          `<span class="dot ${j<i?'dot--done':j===i?'dot--active':''}"></span>`).join('')}</span>`
      container.appendChild(header)

      const desc = document.createElement('p')
      desc.className = 'practice-task__desc'
      desc.textContent = cfg.task
      container.appendChild(desc)

      const div = document.createElement('div')
      div.id = `pc8-${topicId}-${cfg.id}`
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
    initTopic_if()
    initTopic_ifelse()
    initTopic_elseif()
    initTopic_nested()
    initTopic_ternary()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
