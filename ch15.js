/* =========================================================
   C LEARNING PLATFORM — chapters/ch15-arrays-strings/ch15.js
   Chapter 15: Arrays & Strings
   13 topics · 7-step structure · Assessment opens as popup modal
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch15'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — WHAT IS AN ARRAY?
     ══════════════════════════════════════════════════════════ */
  function initTopic_array() {
    const topicId = 'ch15-array'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-array-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Without array — 5 separate variables */
int s0=88, s1=72, s2=95, s3=61, s4=84;
printf("Separate: %d %d %d %d %d\\n", s0,s1,s2,s3,s4);

/* With array — one name, all accessible by index */
int scores[5] = {88, 72, 95, 61, 84};
printf("Array[0]: %d\\n", scores[0]);
printf("Array[2]: %d\\n", scores[2]);
printf("Array[4]: %d\\n", scores[4]);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch15-array',
      question: 'The array holds 5 values. What is the index of the LAST element?',
      options: ['5', '4', '1', '0'],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — a 5-element array has indices 0, 1, 2, 3, 4. The last valid index is always size − 1, which is 4.',
        incorrect: 'Array indices start at 0. A 5-element array uses indices 0 through 4. Index 5 does not exist — accessing it is undefined behavior.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch15-array-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch15-array-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the array so it holds 6 temperatures: 22, 18, 25, 30, 19, 27. Then print each one using its index.',
      includes: ['<stdio.h>'],
      starterCode:
`int temps[4] = {20, 15, 28, 10};
printf("%d %d %d %d\\n", temps[0],temps[1],temps[2],temps[3]);`,
      checkFn: out => out.includes('22') && out.includes('30') && out.includes('27'),
      hint: 'int temps[6]={22,18,25,30,19,27}; then printf each from temps[0] to temps[5].',
      solution:
`int temps[6]={22,18,25,30,19,27};
printf("%d %d %d %d %d %d\\n",temps[0],temps[1],temps[2],temps[3],temps[4],temps[5]);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-array-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to declare and print a 4-element int array.',
      includes: ['<stdio.h>'],
      starterCode:
`[?] nums[[?]] = {10, 20, 30, 40};
printf("%d\\n", nums[0]);
printf("%d\\n", nums[[?]]);`,
      blanks: ['int', '4', '3'],
      hint: 'First: element type. Second: array size. Third: last valid index (size minus 1).',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-array-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare an int array of 5 primes {2,3,5,7,11}. Print the sum of the first and last elements.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('13'),
      hint: 'int primes[5]={2,3,5,7,11}; printf("%d\\n", primes[0]+primes[4]);',
      solution: `int primes[5]={2,3,5,7,11};\nprintf("Sum: %d\\n", primes[0]+primes[4]);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch15-ar-p1', type: 'predict', question: 'What prints?',
          code: `int a[3]={5,10,15};\nprintf("%d\\n", a[1]+a[2]);`,
          correct: ['25'], caseSensitive: true, orderMatters: true,
          hint: 'a[1]=10, a[2]=15.',
          feedback: { correct: 'Correct — 10+15=25.', incorrect: 'a[1]=10, a[2]=15. 10+15=25.' }
        },
        {
          id: 'ch15-ar-p2', type: 'predict', question: 'What prints?',
          code: `int x[5]={1,2,3,4,5};\nprintf("%d\\n", x[5-1]);`,
          correct: ['5'], caseSensitive: true, orderMatters: true,
          hint: '5-1=4. x[4] is the 5th element.',
          feedback: { correct: 'Correct — x[4]=5.', incorrect: '5-1=4. x[4] is the last element = 5.' }
        }
      ]

      const mcqQ = [
        {
          id: 'ch15-ar-m1', type: 'mcq',
          question: 'For int arr[8], what is the last valid index?',
          options: ['8', '7', '9', '0'],
          correct: ['7'], caseSensitive: false, orderMatters: false,
          hint: 'Last valid index = size - 1.',
          feedback: { correct: 'Correct — indices 0 through 7 are valid for an 8-element array.', incorrect: 'Last valid index = size - 1 = 8 - 1 = 7.' }
        },
        {
          id: 'ch15-ar-m2', type: 'mcq',
          question: 'What is the key advantage of arrays over separate variables?',
          options: [
            'Arrays use less memory than separate variables',
            'A loop counter can index into the array — processing 100 elements needs one loop not 100 lines',
            'Arrays can hold different types in different slots',
            'Arrays are faster to declare'
          ],
          correct: ['A loop counter can index into the array — processing 100 elements needs one loop not 100 lines'],
          caseSensitive: false, orderMatters: false,
          hint: 'Think about what you can do with i that you cannot do with variable names.',
          feedback: { correct: 'Correct — a[i] lets you use a loop to access any element. You cannot write a[i] for separate variables a0, a1, a2...', incorrect: 'The loop-index connection is the key benefit. arr[i] is the same syntax regardless of i\'s value.' }
        },
        {
          id: 'ch15-ar-m3', type: 'mcq',
          question: 'int data[6] — how many bytes does this use (assuming 4-byte int)?',
          options: ['6', '4', '24', '10'],
          correct: ['24'], caseSensitive: false, orderMatters: false,
          hint: 'Total bytes = sizeof(int) × number of elements.',
          feedback: { correct: 'Correct — 4 bytes × 6 elements = 24 bytes.', incorrect: 'Each int uses 4 bytes × 6 elements = 24 bytes total.' }
        }
      ]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Declare int arr[5] = {3,6,9,12,15}. Print the element at index 2 and the element at the last index.',
          check: out => out.includes('9') && out.includes('15'),
          hint: 'printf("%d\\n", arr[2]); printf("%d\\n", arr[4]);',
          solution: `int arr[5]={3,6,9,12,15};\nprintf("%d\\n",arr[2]);\nprintf("%d\\n",arr[4]);`
        },
        {
          id: 'p2',
          task: 'Declare float prices[4] = {9.99, 14.50, 3.75, 22.00}. Print the sum of all 4 prices.',
          check: out => out.includes('50') || out.includes('50.24'),
          hint: 'printf("%.2f\\n", prices[0]+prices[1]+prices[2]+prices[3]);',
          solution: `float prices[4]={9.99f,14.50f,3.75f,22.00f};\nprintf("%.2f\\n",prices[0]+prices[1]+prices[2]+prices[3]);`
        }
      ]

      renderPracticeCh15('practice-ch15-array', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch15-array-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch15-array-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch15-array-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print 5 array values but crashes or prints garbage. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode: `int n[5]={1,2,3,4,5};\nfor(int i=0;i<=5;i++) printf("%d\\n",n[i]);`,
        checkFn: out => {
          const lines = out.trim().split('\n').filter(l=>l.trim())
          const nums = lines.map(l=>parseInt(l)).filter(n=>!isNaN(n))
          return nums.length === 5 && nums[0]===1 && nums[4]===5
        },
        hint: 'The condition is i<=5 — what is the value of i when i==5?',
        hintTwo: 'i<=5 includes i=5, which accesses n[5] — out of bounds. Change to i<5.',
        solution: `int n[5]={1,2,3,4,5};\nfor(int i=0;i<5;i++) printf("%d\\n",n[i]);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'What is an Array? — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — DECLARING & INITIALIZING
     ══════════════════════════════════════════════════════════ */
  function initTopic_declare() {
    const topicId = 'ch15-declare'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-declare-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`/* Let compiler count */
int primes[] = {2,3,5,7,11};
int n = sizeof(primes)/sizeof(primes[0]);
printf("Size auto-counted: %d\\n", n);

/* Zero-initialize all */
int zeroes[5] = {0};
printf("zeroes[3] = %d\\n", zeroes[3]);

/* Loop initialization */
int squares[6];
for(int i=0;i<6;i++) squares[i] = i*i;
printf("squares[5] = %d\\n", squares[5]);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch15-declare',
      question: 'int arr[5] = {1, 2} — what are arr[2], arr[3], and arr[4]?',
      options: [
        'Garbage values — uninitialized slots hold random data',
        'All 0 — in C, partially initialized arrays zero-fill remaining elements',
        'Copies of 1 and 2 repeating',
        'Compile error — all slots must be explicitly set'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — when a C array is partially initialized, all unspecified elements are zero-filled automatically.',
        incorrect: 'Partial initialization in C zero-fills the rest. {1,2} gives {1, 2, 0, 0, 0} for a 5-element array.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch15-declare-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch15-declare-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Use the sizeof trick to get the element count automatically, then print each element with its index.',
      includes: ['<stdio.h>'],
      starterCode:
`int data[] = {5, 10, 15, 20, 25, 30};

for(int i = 0; i < 6; i++) {
    printf("[%d]=%d\\n", i, data[i]);
}`,
      checkFn: out => {
        const text = out
        return text.includes('[0]=5') && text.includes('[5]=30')
      },
      hint: 'Replace 6 with sizeof(data)/sizeof(data[0]) in the loop condition.',
      solution:
`int data[] = {5,10,15,20,25,30};
int n = sizeof(data)/sizeof(data[0]);
for(int i=0;i<n;i++) printf("[%d]=%d\\n",i,data[i]);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-declare-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks for three different initialization patterns.',
      includes: ['<stdio.h>'],
      starterCode:
`int a[] = {3,6,9};                         /* compiler counts */
int b[5] = {[?]};                          /* all zeros */
int c[4]; for(int i=0;i<4;[?]) c[i]=i*2; /* loop fill */

printf("%d %d %d\\n", a[2], b[4], c[3]);`,
      blanks: ['0', 'i++'],
      hint: 'First: value to zero-initialize all elements. Second: loop increment expression.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-declare-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare float temps[] with values {36.5, 37.1, 36.8, 38.2, 37.0}. Use sizeof to get count. Print the highest temperature.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('38.2') || out.includes('38'),
      hint: 'float max=temps[0]; for(int i=1;i<n;i++) if(temps[i]>max) max=temps[i];',
      solution:
`float temps[]={36.5f,37.1f,36.8f,38.2f,37.0f};
int n=sizeof(temps)/sizeof(temps[0]);
float max=temps[0];
for(int i=1;i<n;i++) if(temps[i]>max) max=temps[i];
printf("Max: %.1f\\n",max);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch15-dc-p1', type: 'predict', question: 'What prints?',
        code: `int a[4]={10,20};\nprintf("%d %d %d %d\\n",a[0],a[1],a[2],a[3]);`,
        correct: ['10 20 0 0'], caseSensitive: true, orderMatters: true,
        hint: 'Partial initialization zero-fills remaining slots.',
        feedback: { correct: 'Correct — {10,20} gives {10,20,0,0}.', incorrect: 'Unspecified elements become 0.' }
      }]

      const mcqQ = [
        {
          id: 'ch15-dc-m1', type: 'mcq',
          question: 'What does int arr[] = {5,10,15} create?',
          options: ['An array of unknown size', 'A 3-element array — compiler counts the initializers', 'A 1-element array', 'An error — size must be explicit'],
          correct: ['A 3-element array — compiler counts the initializers'],
          caseSensitive: false, orderMatters: false,
          hint: 'Empty brackets with an initializer list.',
          feedback: { correct: 'Correct — the compiler counts 3 values and makes a 3-element array.', incorrect: 'int arr[] = {a,b,c} lets the compiler count — it creates a 3-element array.' }
        },
        {
          id: 'ch15-dc-m2', type: 'mcq',
          question: 'How do you get the number of elements in int arr[] = {1,2,3,4} portably?',
          options: ['length(arr)', 'arr.size()', 'sizeof(arr)/sizeof(arr[0])', 'count(arr)'],
          correct: ['sizeof(arr)/sizeof(arr[0])'],
          caseSensitive: true, orderMatters: false,
          hint: 'C has no built-in length function — you compute it from sizes.',
          feedback: { correct: 'Correct — total bytes divided by bytes per element gives element count.', incorrect: 'sizeof(arr)/sizeof(arr[0]): total size in bytes divided by one element\'s size = element count.' }
        }
      ]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Declare int countdown[] = {10,8,6,4,2}. Use sizeof to count elements. Print them reversed (index 4 to 0).',
        check: out => {
          const nums = out.trim().split(/\s+/).map(n=>parseInt(n)).filter(n=>!isNaN(n))
          return nums[0]===2 && nums[4]===10
        },
        hint: 'int n=sizeof(countdown)/sizeof(countdown[0]); for(int i=n-1;i>=0;i--) printf("%d\\n",countdown[i]);',
        solution: `int countdown[]={10,8,6,4,2};\nint n=sizeof(countdown)/sizeof(countdown[0]);\nfor(int i=n-1;i>=0;i--) printf("%d\\n",countdown[i]);`
      }]

      renderPracticeCh15('practice-ch15-declare', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch15-declare-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch15-declare-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch15-declare-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should print all 6 values but only prints 4. Find the bug.',
        includes: ['<stdio.h>'],
        starterCode: `int v[]={1,2,3,4,5,6};\nfor(int i=0;i<4;i++) printf("%d\\n",v[i]);`,
        checkFn: out => {
          const lines = out.trim().split('\n').filter(l=>l.trim())
          return lines.length===6
        },
        hint: 'The loop condition uses 4 but there are 6 elements. Use sizeof to get the real count.',
        hintTwo: 'Change 4 to sizeof(v)/sizeof(v[0]) — or just 6 — to iterate all elements.',
        solution: `int v[]={1,2,3,4,5,6};\nint n=sizeof(v)/sizeof(v[0]);\nfor(int i=0;i<n;i++) printf("%d\\n",v[i]);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Declaring Arrays — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — ACCESSING ELEMENTS
     ══════════════════════════════════════════════════════════ */
  function initTopic_access() {
    const topicId = 'ch15-access'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-access-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int d[5] = {10,20,30,40,50};

/* Read */
printf("d[0]=%d  d[4]=%d\\n", d[0], d[4]);

/* Write */
d[2] = 99;
printf("After d[2]=99: %d\\n", d[2]);

/* Expression index */
int i = 3;
printf("d[i]=%d  d[i-1]=%d\\n", d[i], d[i-1]);

/* Use in arithmetic */
printf("d[1]+d[3]=%d\\n", d[1]+d[3]);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch15-access',
      question: 'int arr[5]={1,2,3,4,5}; arr[3] = arr[3] + arr[1]; — what is arr[3] after this line?',
      options: ['4', '6', '7', '3'],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — arr[3]=4, arr[1]=2. 4+2=6. arr[3] is now 6.',
        incorrect: 'arr[3]=4, arr[1]=2. arr[3] = 4 + 2 = 6.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch15-access-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch15-access-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Swap elements at index 0 and index 4 using a temp variable. Print the array before and after.',
      includes: ['<stdio.h>'],
      starterCode:
`int arr[5]={10,20,30,40,50};
printf("Before: %d %d %d %d %d\\n",arr[0],arr[1],arr[2],arr[3],arr[4]);
/* swap arr[0] and arr[4] here */
printf("After:  %d %d %d %d %d\\n",arr[0],arr[1],arr[2],arr[3],arr[4]);`,
      checkFn: out => out.includes('50') && out.includes('10') && out.match(/After.*50/),
      hint: 'int temp=arr[0]; arr[0]=arr[4]; arr[4]=temp;',
      solution:
`int arr[5]={10,20,30,40,50};
printf("Before: %d %d %d %d %d\\n",arr[0],arr[1],arr[2],arr[3],arr[4]);
int temp=arr[0]; arr[0]=arr[4]; arr[4]=temp;
printf("After:  %d %d %d %d %d\\n",arr[0],arr[1],arr[2],arr[3],arr[4]);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-access-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to swap two array elements safely.',
      includes: ['<stdio.h>'],
      starterCode:
`int a[4]={7,2,9,4};
int [?] = a[1];     /* save a[1] */
a[[?]] = a[2];     /* a[1] = a[2] */
a[2] = [?];        /* a[2] = saved */
printf("%d %d\\n", a[1], a[2]);`,
      blanks: ['temp', '1', 'temp'],
      hint: 'Classic three-step swap: save, overwrite, restore.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-access-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Declare int nums[5]={1,2,3,4,5}. Double every element in-place (multiply each by 2). Print the result.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('2') && out.includes('4') && out.includes('10'),
      hint: 'for(int i=0;i<5;i++) nums[i]*=2;',
      solution:
`int nums[5]={1,2,3,4,5};
for(int i=0;i<5;i++) nums[i]*=2;
for(int i=0;i<5;i++) printf("%d ",nums[i]);
printf("\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch15-ac-p1', type: 'predict', question: 'What prints?',
        code: `int a[]={5,10,15,20};\na[0]=a[3]; a[3]=0;\nprintf("%d %d\\n",a[0],a[3]);`,
        correct: ['20 0'], caseSensitive: true, orderMatters: true,
        hint: 'a[0] is assigned a[3]=20 first, then a[3] is set to 0.',
        feedback: { correct: 'Correct — a[0]=20, a[3]=0.', incorrect: 'a[0]=a[3]=20, then a[3]=0. Output: 20 0.' }
      }]

      const mcqQ = [{
        id: 'ch15-ac-m1', type: 'mcq',
        question: 'arr[2] = 99; — what does this do?',
        options: ['Reads element at index 2', 'Writes 99 to element at index 2', 'Deletes element at index 2', 'Inserts 99 before index 2'],
        correct: ['Writes 99 to element at index 2'],
        caseSensitive: false, orderMatters: false,
        hint: 'Which side of = is arr[2] on?',
        feedback: { correct: 'Correct — on the left side of =, arr[2] is a write target.', incorrect: 'arr[2] on the left of = is a write operation. It stores 99 at index 2.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Given int data[6]={3,1,4,1,5,9}, find and print the index of the maximum value.',
        check: out => out.includes('5'),
        hint: 'int maxIdx=0; for(int i=1;i<6;i++) if(data[i]>data[maxIdx]) maxIdx=i;',
        solution:
`int data[6]={3,1,4,1,5,9};
int maxIdx=0;
for(int i=1;i<6;i++) if(data[i]>data[maxIdx]) maxIdx=i;
printf("Max at index: %d\\n", maxIdx);`
      }]

      renderPracticeCh15('practice-ch15-access', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch15-access-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch15-access-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch15-access-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This swap is broken — both values end up the same. Fix it.',
        includes: ['<stdio.h>'],
        starterCode: `int a[2]={7,3};\na[0]=a[1]; a[1]=a[0];\nprintf("%d %d\\n",a[0],a[1]);`,
        checkFn: out => out.includes('3') && out.includes('7'),
        hint: 'After a[0]=a[1], the original value of a[0] is lost. A temp variable must save it first.',
        hintTwo: 'int temp=a[0]; a[0]=a[1]; a[1]=temp;',
        solution: `int a[2]={7,3};\nint temp=a[0]; a[0]=a[1]; a[1]=temp;\nprintf("%d %d\\n",a[0],a[1]);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Accessing Elements — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — ITERATING ARRAYS
     ══════════════════════════════════════════════════════════ */
  function initTopic_iterate() {
    const topicId = 'ch15-iterate'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-iterate-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int nums[6]={4,8,15,16,23,42};
int n=6;

int sum=0, max=nums[0], min=nums[0];
for(int i=0;i<n;i++){
    sum+=nums[i];
    if(nums[i]>max) max=nums[i];
    if(nums[i]<min) min=nums[i];
}
printf("Sum=%d  Max=%d  Min=%d  Avg=%d\\n",sum,max,min,sum/n);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch15-iterate',
      question: 'max was initialized to nums[0] (not 0) before the loop. Why?',
      options: [
        'nums[0] is always the largest element',
        'Starting max at 0 would fail if all values are negative — starting at the first element is always safe',
        'nums[0] must be read before the loop starts',
        'The loop would skip index 0 otherwise'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — if all values are negative, max=0 would never be updated and would return 0, which is wrong. Starting at nums[0] guarantees at least one real element.',
        incorrect: 'Starting max=0 fails for all-negative arrays. Start with the first actual element: the maximum is at worst nums[0] and gets updated from there.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch15-iterate-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch15-iterate-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a count of how many elements are above the average. Print "Above average: N".',
      includes: ['<stdio.h>'],
      starterCode:
`int nums[6]={4,8,15,16,23,42};
int n=6, sum=0;
for(int i=0;i<n;i++) sum+=nums[i];
int avg=sum/n;
printf("Avg=%d\\n",avg);`,
      checkFn: out => out.includes('Above') || out.includes('above'),
      hint: 'int above=0; for(int i=0;i<n;i++) if(nums[i]>avg) above++; printf("Above average: %d\\n",above);',
      solution:
`int nums[6]={4,8,15,16,23,42};
int n=6,sum=0;
for(int i=0;i<n;i++) sum+=nums[i];
int avg=sum/n, above=0;
for(int i=0;i<n;i++) if(nums[i]>avg) above++;
printf("Avg=%d  Above average: %d\\n",avg,above);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-iterate-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the blanks to complete the array sum and average.',
      includes: ['<stdio.h>'],
      starterCode:
`int a[]={10,20,30,40,50};
int n=sizeof(a)/[?](a[0]);
int sum=[?];
for(int i=0;[?]<n;i++) sum+=[?];
printf("Sum=%d Avg=%d\\n",sum,sum/n);`,
      blanks: ['sizeof', '0', 'i', 'a[i]'],
      hint: 'First: sizeof for element count. Second: initial sum. Third: loop condition variable. Fourth: element to add.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-iterate-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Given int scores[]={88,72,95,61,84,77}, count how many are passing (>=75) and how many are failing. Print both counts.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('4') && out.includes('2'),
      hint: 'int pass=0,fail=0; for each: if(>=75)pass++; else fail++;',
      solution:
`int scores[]={88,72,95,61,84,77};
int n=sizeof(scores)/sizeof(scores[0]), pass=0, fail=0;
for(int i=0;i<n;i++){
    if(scores[i]>=75) pass++;
    else fail++;
}
printf("Passing:%d  Failing:%d\\n",pass,fail);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch15-it-p1', type: 'predict', question: 'What prints?',
        code: `int a[]={3,1,4,1,5};\nint s=0;\nfor(int i=0;i<5;i++) s+=a[i];\nprintf("%d\\n",s);`,
        correct: ['14'], caseSensitive: true, orderMatters: true,
        hint: '3+1+4+1+5=14.',
        feedback: { correct: 'Correct — 3+1+4+1+5=14.', incorrect: 'Sum: 3+1+4+1+5=14.' }
      }]

      const mcqQ = [{
        id: 'ch15-it-m1', type: 'mcq',
        question: 'Why initialize max=arr[0] rather than max=0 before finding the array maximum?',
        options: ['arr[0] is faster to access', 'Starting with 0 fails for all-negative arrays — arr[0] always gives a real element', 'The loop skips index 0', 'max must be initialized to an odd number'],
        correct: ['Starting with 0 fails for all-negative arrays — arr[0] always gives a real element'],
        caseSensitive: false, orderMatters: false,
        hint: 'What if all values are -5, -2, -8? Would max=0 ever get updated?',
        feedback: { correct: 'Correct — if all elements are negative, max=0 never updates and returns 0, which is not in the array.', incorrect: 'If all values are negative, max=0 stays 0. That\'s wrong. Start with arr[0] so the max is always a real element.' }
      }]

      const practiceConfigs = [
        {
          id: 'p1',
          task: 'Given int data[]={5,3,8,1,9,2,7}, find the second-largest value (not the max — the next one down).',
          check: out => out.includes('8'),
          hint: 'Find max first, then find largest value < max.',
          solution:
`int data[]={5,3,8,1,9,2,7};
int n=7,max=data[0],sec=data[0];
for(int i=1;i<n;i++) if(data[i]>max) max=data[i];
for(int i=0;i<n;i++) if(data[i]>sec && data[i]<max) sec=data[i];
printf("Second largest: %d\\n",sec);`
        },
        {
          id: 'p2',
          task: 'Given int vals[]={4,7,2,9,1,6,3,8}, reverse the array in-place using a loop and swap. Print the reversed array.',
          check: out => {
            const nums = out.trim().split(/\s+/).map(n=>parseInt(n)).filter(n=>!isNaN(n))
            return nums[0]===8 && nums[7]===4
          },
          hint: 'for(int i=0;i<n/2;i++){ int t=vals[i]; vals[i]=vals[n-1-i]; vals[n-1-i]=t; }',
          solution:
`int vals[]={4,7,2,9,1,6,3,8};
int n=8;
for(int i=0;i<n/2;i++){
    int t=vals[i]; vals[i]=vals[n-1-i]; vals[n-1-i]=t;
}
for(int i=0;i<n;i++) printf("%d ",vals[i]);
printf("\\n");`
        }
      ]

      renderPracticeCh15('practice-ch15-iterate', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch15-iterate-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch15-iterate-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch15-iterate-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should find the minimum but always returns the wrong value. Fix it.',
        includes: ['<stdio.h>'],
        starterCode:
`int a[]={7,2,9,4,5};
int min=0;
for(int i=0;i<5;i++) if(a[i]<min) min=a[i];
printf("Min: %d\\n",min);`,
        checkFn: out => out.includes('2'),
        hint: 'min is initialized to 0. All elements are positive so none are less than 0. min never updates.',
        hintTwo: 'Initialize min=a[0] so the starting value is a real element. Then compare all others against it.',
        solution: `int a[]={7,2,9,4,5};\nint min=a[0];\nfor(int i=1;i<5;i++) if(a[i]<min) min=a[i];\nprintf("Min: %d\\n",min);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Iterating Arrays — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPICS 5-13 — Condensed but complete
     ══════════════════════════════════════════════════════════ */

  function initTopic_bounds() {
    const topicId = 'ch15-bounds'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-bounds-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int arr[5]={10,20,30,40,50};

/* Correct: i < 5 */
printf("CORRECT: ");
for(int i=0;i<5;i++) printf("%d ",arr[i]);
printf("\\n");

/* Shows what indices are accessed */
printf("Indices: 0 1 2 3 4 — last valid: %d\\n", 5-1);
printf("arr[0]=%d  arr[4]=%d\\n", arr[0], arr[4]);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch15-bounds',
      question: 'int arr[5]; — what happens if you access arr[5]?',
      options: [
        'C throws a bounds exception and the program exits safely',
        'C reads or writes memory it does not own — undefined behavior that may crash, corrupt, or silently misbehave',
        'arr[5] automatically returns 0',
        'The compiler blocks it with an error'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — C never checks bounds at runtime. arr[5] accesses memory past the array with no safety net whatsoever.',
        incorrect: 'C has no runtime bounds checking. arr[5] on a 5-element array silently reads or writes arbitrary memory — the behavior is undefined.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch15-bounds-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch15-bounds-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a bounds check: before printing arr[idx], verify idx is in range [0, 4]. Print an error if not.',
      includes: ['<stdio.h>'],
      starterCode:
`int arr[5]={10,20,30,40,50};
int idx=7;
printf("%d\\n", arr[idx]);`,
      checkFn: out => out.includes('out') || out.includes('invalid') || out.includes('error') || out.includes('Error'),
      hint: 'if(idx>=0 && idx<5) printf(...); else printf("Index out of bounds\\n");',
      solution:
`int arr[5]={10,20,30,40,50};
int idx=7;
if(idx>=0 && idx<5) printf("%d\\n",arr[idx]);
else printf("Index %d out of bounds\\n",idx);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-bounds-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the correct loop bounds for a 6-element array.',
      includes: ['<stdio.h>'],
      starterCode:
`int a[6]={1,2,3,4,5,6};
for(int i=[?]; i[?]6; i++)
    printf("%d ",a[i]);`,
      blanks: ['0', '<'],
      hint: 'Start at first valid index. Condition must be strictly less than size.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-bounds-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a function int safeGet(int arr[], int size, int idx) that returns arr[idx] if valid, or -1 if out of bounds. Test with a 5-element array.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('-1') && out.match(/\d+/),
      hint: 'int safeGet(int a[],int size,int idx){ if(idx<0||idx>=size) return -1; return a[idx]; }',
      solution:
`int safeGet(int a[],int size,int idx){
    if(idx<0||idx>=size) return -1;
    return a[idx];
}
int arr[5]={10,20,30,40,50};
printf("%d\\n", safeGet(arr,5,2));
printf("%d\\n", safeGet(arr,5,9));`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch15-bd-p1', type: 'predict', question: 'How many iterations does this loop do, and are all accesses in-bounds?',
        code: `int a[4]={1,2,3,4};\nfor(int i=0;i<=4;i++) printf("%d ",a[i]);`,
        correct: ['5 — index 4 out of bounds', 'out of bounds', '5'],
        caseSensitive: false, orderMatters: false,
        hint: 'i<=4 includes i=4. a[4] is the 5th access on a 4-element array.',
        feedback: { correct: 'Correct — the loop runs 5 times. a[4] is out of bounds (valid: 0-3).', incorrect: 'i<=4 runs i=0,1,2,3,4 — 5 iterations. a[4] is index 4 on a size-4 array, which is out of bounds.' }
      }]

      const mcqQ = [{
        id: 'ch15-bd-m1', type: 'mcq',
        question: 'What is the correct loop condition to iterate all N elements of an array?',
        options: ['i <= N', 'i < N', 'i < N-1', 'i <= N-1'],
        correct: ['i < N'],
        caseSensitive: true, orderMatters: false,
        hint: 'Valid indices are 0 to N-1.',
        feedback: { correct: 'Correct — i<N generates indices 0, 1, ..., N-1. All valid.', incorrect: 'i<N generates 0 through N-1 — the complete set of valid indices.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Write code that searches int list[8]={3,7,1,9,2,8,4,6} for the value 9 and prints its index. If not found, print -1.',
        check: out => out.includes('3'),
        hint: 'int found=-1; for(int i=0;i<8;i++) if(list[i]==9){ found=i; break; } printf("%d\\n",found);',
        solution:
`int list[8]={3,7,1,9,2,8,4,6};
int found=-1;
for(int i=0;i<8;i++) if(list[i]==9){ found=i; break; }
printf("Index: %d\\n",found);`
      }]

      renderPracticeCh15('practice-ch15-bounds', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch15-bounds-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch15-bounds-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch15-bounds-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This starts at the wrong index. Fix both the start and the condition.',
        includes: ['<stdio.h>'],
        starterCode: `int a[5]={10,20,30,40,50};\nfor(int i=1;i<=5;i++) printf("%d\\n",a[i]);`,
        checkFn: out => out.includes('10') && out.includes('50'),
        hint: 'i starts at 1 (misses a[0]) and i<=5 accesses a[5] (out of bounds).',
        hintTwo: 'Change to i=0; i<5 to access all 5 valid elements.',
        solution: `int a[5]={10,20,30,40,50};\nfor(int i=0;i<5;i++) printf("%d\\n",a[i]);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, 'Array Bounds — Assessment', renderAssessment))
  }

  function initTopic_2d() {
    const topicId = 'ch15-2d'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-2d-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int g[3][4] = {
    {1,  2,  3,  4},
    {5,  6,  7,  8},
    {9, 10, 11, 12}
};
printf("g[0][0]=%d  g[1][2]=%d  g[2][3]=%d\\n",
        g[0][0],   g[1][2],   g[2][3]);
g[1][1] = 99;
printf("After write: g[1][1]=%d\\n", g[1][1]);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch15-2d',
      question: 'int grid[3][4] — how many total elements does this hold?',
      options: ['3', '4', '7', '12'],
      correctIndex: 3,
      feedback: {
        correct: 'Correct — 3 rows × 4 columns = 12 elements total.',
        incorrect: '3 rows × 4 columns = 12 total elements.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch15-2d-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch15-2d-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change the 2D array to a 3×3 identity matrix (1s on diagonal, 0s elsewhere). Print the center element.',
      includes: ['<stdio.h>'],
      starterCode:
`int m[3][3]={{1,0,0},{0,1,0},{0,0,1}};
/* Already set! Print center */
printf("Center: %d\\n", m[1][1]);`,
      checkFn: out => out.includes('1'),
      hint: 'The center of a 3×3 matrix is m[1][1]. It should be 1 in an identity matrix.',
      solution: `int m[3][3]={{1,0,0},{0,1,0},{0,0,1}};\nprintf("Center: %d\\n",m[1][1]);\nprintf("Corner: %d\\n",m[2][2]);`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-2d-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to access the element at row 2, column 1 of a 3×3 matrix.',
      includes: ['<stdio.h>'],
      starterCode:
`int m[3][3]={{1,2,3},{4,5,6},{7,8,9}};
printf("%d\\n", m[[?]][[?]]);  /* should print 8 */`,
      blanks: ['2', '1'],
      hint: 'Row 2 is the third row (0-indexed). Column 1 is the second column (0-indexed). m[2][1]=8.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-2d-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Create a 4×4 2D array where each element equals row+col. Print it as a grid.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => {
        const text = out
        return text.includes('6') && text.includes('0') && (text.match(/\n/g)||[]).length >= 3
      },
      hint: 'for r in 0..3: for c in 0..3: m[r][c]=r+c; then print with nested loops.',
      solution:
`int m[4][4];
for(int r=0;r<4;r++) for(int c=0;c<4;c++) m[r][c]=r+c;
for(int r=0;r<4;r++){
    for(int c=0;c<4;c++) printf("%3d",m[r][c]);
    printf("\\n");
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch15-2d-p1', type: 'predict', question: 'What prints?',
        code: `int m[2][3]={{1,2,3},{4,5,6}};\nprintf("%d\\n",m[1][2]);`,
        correct: ['6'], caseSensitive: true, orderMatters: true,
        hint: 'Row 1, column 2 of {{1,2,3},{4,5,6}}.',
        feedback: { correct: 'Correct — m[1][2] is row 1 (4,5,6), col 2 = 6.', incorrect: 'm[1] is {4,5,6}. m[1][2]=6.' }
      }]

      const mcqQ = [{
        id: 'ch15-2d-m1', type: 'mcq',
        question: 'int m[3][5] — what is the correct access for the last element?',
        options: ['m[3][5]', 'm[2][4]', 'm[2][5]', 'm[3][4]'],
        correct: ['m[2][4]'],
        caseSensitive: true, orderMatters: false,
        hint: 'Last row is 3-1=2. Last column is 5-1=4.',
        feedback: { correct: 'Correct — rows 0-2, cols 0-4. Last: m[2][4].', incorrect: 'Last row: ROWS-1=2. Last col: COLS-1=4. m[2][4].' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Declare int temp[3][4] as a 3-day, 4-reading temperature log. Fill all values with day*10+reading. Print row sums.',
        check: out => out.includes('46') || out.includes('Row'),
        hint: 'for r 0..2: for c 0..3: temp[r][c]=r*10+c; then row sum loop.',
        solution:
`int temp[3][4];
for(int r=0;r<3;r++) for(int c=0;c<4;c++) temp[r][c]=r*10+c;
for(int r=0;r<3;r++){
    int sum=0;
    for(int c=0;c<4;c++) sum+=temp[r][c];
    printf("Row %d sum: %d\\n",r,sum);
}`
      }]

      renderPracticeCh15('practice-ch15-2d', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch15-2d-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch15-2d-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch15-2d-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This should sum all elements of a 2×3 matrix but produces a wrong total. Fix it.',
        includes: ['<stdio.h>'],
        starterCode: `int m[2][3]={{1,2,3},{4,5,6}};\nint sum=0;\nfor(int r=0;r<2;r++) for(int c=0;c<2;c++) sum+=m[r][c];\nprintf("Sum=%d\\n",sum);`,
        checkFn: out => out.includes('21'),
        hint: 'The inner loop runs c<2 but there are 3 columns (indices 0,1,2). Change c<2 to c<3.',
        hintTwo: 'Change inner loop: for(int c=0;c<3;c++) — or better: use the column count 3.',
        solution: `int m[2][3]={{1,2,3},{4,5,6}};\nint sum=0;\nfor(int r=0;r<2;r++) for(int c=0;c<3;c++) sum+=m[r][c];\nprintf("Sum=%d\\n",sum);`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, '2D Arrays — Assessment', renderAssessment))
  }

  function initTopic_2diterate() {
    const topicId = 'ch15-2diterate'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-2diterate-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int m[3][4]={{1,2,3,4},{5,6,7,8},{9,10,11,12}};

/* Print grid */
for(int r=0;r<3;r++){
    for(int c=0;c<4;c++) printf("%4d",m[r][c]);
    printf("\\n");
}

/* Total sum */
int total=0;
for(int r=0;r<3;r++) for(int c=0;c<4;c++) total+=m[r][c];
printf("Total: %d\\n", total);`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch15-2diterate',
      question: 'Outer loop runs 3 times, inner 4 times per outer pass. How many total iterations?',
      options: ['3', '4', '7', '12'],
      correctIndex: 3,
      feedback: {
        correct: 'Correct — 3×4=12. The inner loop completes 4 iterations for each of the 3 outer iterations.',
        incorrect: 'Nested loop total = outer × inner = 3 × 4 = 12.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch15-2diterate-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch15-2diterate-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add code to compute and print the sum of each column separately (4 column sums).',
      includes: ['<stdio.h>'],
      starterCode:
`int m[3][4]={{1,2,3,4},{5,6,7,8},{9,10,11,12}};
/* Print col sums here */`,
      checkFn: out => out.includes('15') && out.includes('18') && out.includes('24'),
      hint: 'for(int c=0;c<4;c++){ int sum=0; for(int r=0;r<3;r++) sum+=m[r][c]; printf("Col%d=%d\\n",c,sum); }',
      solution:
`int m[3][4]={{1,2,3,4},{5,6,7,8},{9,10,11,12}};
for(int c=0;c<4;c++){
    int sum=0;
    for(int r=0;r<3;r++) sum+=m[r][c];
    printf("Col%d sum=%d\\n",c,sum);
}`,
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-2diterate-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to iterate and print a 2×3 grid.',
      includes: ['<stdio.h>'],
      starterCode:
`int g[2][3]={{1,2,3},{4,5,6}};
for(int r=0;[?]<2;r++){
    for(int c=0;c[?]3;c++) printf("%d ",g[[?]][c]);
    printf("\\n");
}`,
      blanks: ['r', '<', 'r'],
      hint: 'First: row variable in condition. Second: comparison operator. Third: row variable in element access.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-2diterate-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Create a 4×4 matrix. Fill it so m[r][c]=r*c. Print the main diagonal sum (where r==c).',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: out => out.includes('14') || out.includes('0') && out.includes('9'),
      hint: 'for(int i=0;i<4;i++) diag+=m[i][i]; — diagonal is 0*0+1*1+2*2+3*3=0+1+4+9=14.',
      solution:
`int m[4][4];
for(int r=0;r<4;r++) for(int c=0;c<4;c++) m[r][c]=r*c;
int diag=0;
for(int i=0;i<4;i++) diag+=m[i][i];
printf("Diagonal sum: %d\\n",diag);`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [{
        id: 'ch15-2i-p1', type: 'predict', question: 'What prints?',
        code: `int m[2][2]={{1,2},{3,4}};\nint s=0;\nfor(int r=0;r<2;r++) for(int c=0;c<2;c++) s+=m[r][c];\nprintf("%d\\n",s);`,
        correct: ['10'], caseSensitive: true, orderMatters: true,
        hint: '1+2+3+4=10.',
        feedback: { correct: 'Correct — sum of all elements: 1+2+3+4=10.', incorrect: '1+2+3+4=10.' }
      }]

      const mcqQ = [{
        id: 'ch15-2i-m1', type: 'mcq',
        question: 'To print each row on its own line, where do you put printf("\\n")?',
        options: ['Inside the inner loop', 'After the outer loop', 'After the inner loop, inside the outer loop', 'Before the outer loop'],
        correct: ['After the inner loop, inside the outer loop'],
        caseSensitive: false, orderMatters: false,
        hint: 'The newline should print once per row — after all columns of that row are printed.',
        feedback: { correct: 'Correct — after the inner loop closes and before the outer loop increments. One newline per row.', incorrect: 'Place printf("\\n") after the inner loop\'s closing brace but still inside the outer loop. That prints one newline per row.' }
      }]

      const practiceConfigs = [{
        id: 'p1',
        task: 'Given int scores[3][3]={{8,6,7},{5,3,0},{9,7,8}}, compute and print each student\'s average (row average).',
        check: out => {
          const text = out
          return text.includes('7') && text.includes('2') && text.match(/\d+/g)
        },
        hint: 'for each row r: int sum=0; for c: sum+=scores[r][c]; printf("Avg: %d\\n",sum/3);',
        solution:
`int scores[3][3]={{8,6,7},{5,3,0},{9,7,8}};
for(int r=0;r<3;r++){
    int sum=0;
    for(int c=0;c<3;c++) sum+=scores[r][c];
    printf("Student %d avg: %d\\n",r,sum/3);
}`
      }]

      renderPracticeCh15('practice-ch15-2diterate', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId: 'quiz-ch15-2diterate-predict', questions: predictQ, onComplete: () => {} })
      QuizEngine.init({ containerId: 'quiz-ch15-2diterate-mcq', questions: mcqQ, onComplete: () => Progress.saveTopicComplete(CH, topicId) })

      CCompiler.initBlock($('compiler-ch15-2diterate-debug'), {
        mode: 'debug', topicId, chapterId: CH,
        question: 'This prints all rows on one line instead of separate lines. Fix it.',
        includes: ['<stdio.h>'],
        starterCode:
`int g[3][3]={{1,2,3},{4,5,6},{7,8,9}};
for(int r=0;r<3;r++)
    for(int c=0;c<3;c++) printf("%d ",g[r][c]);`,
        checkFn: out => (out.match(/\n/g)||[]).length >= 2,
        hint: 'After printing all columns of a row, a newline is needed. Where is it?',
        hintTwo: 'Add printf("\\n"); after the inner for loop closes — inside the outer loop.',
        solution:
`int g[3][3]={{1,2,3},{4,5,6},{7,8,9}};
for(int r=0;r<3;r++){
    for(int c=0;c<3;c++) printf("%d ",g[r][c]);
    printf("\\n");
}`,
        onPass: () => {}
      })
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', () =>
      openAssessmentModal(topicId, '2D Array Iteration — Assessment', renderAssessment))
  }

  /* ── Topics 8-13: Strings ───────────────────────────────── */

  function makeStringTopic(topicId, exploreCode, iq, modify, fill, build, assessment) {
    const sm = StepManager.init(topicId, 7, CH)
    CCompiler.initBlock($(` compiler-${topicId}-explore`), Object.assign({ mode:'explore', topicId, chapterId:CH, question:null, includes:exploreCode.inc }, exploreCode, { onPass: ()=>sm.complete(1) }))
    QuizEngine.initInstantQuestion(Object.assign({ containerId:`iq-${topicId}` }, iq, { onAnswer: ()=>sm.complete(2) }))
    $(`step-${topicId}-3-continue`).addEventListener('click', ()=>{ Progress.saveStepComplete(CH,topicId,3); sm.complete(3) })
    CCompiler.initBlock($(`compiler-${topicId}-modify`), Object.assign({ mode:'modify', topicId, chapterId:CH }, modify, { onPass:()=>sm.complete(4) }))
    CCompiler.initBlock($(`compiler-${topicId}-fill`),   Object.assign({ mode:'fill',   topicId, chapterId:CH }, fill,   { onPass:()=>sm.complete(5) }))
    CCompiler.initBlock($(`compiler-${topicId}-build`),  Object.assign({ mode:'build',  topicId, chapterId:CH }, build,  { onPass:()=>sm.complete(6) }))
    sm.complete(7)
    if (btn(topicId)) btn(topicId).addEventListener('click', ()=>
      openAssessmentModal(topicId, assessment.title, ()=>renderStringAssessment(topicId, assessment)))
  }

  function renderStringAssessment(topicId, cfg) {
    if (cfg.practiceConfigs) renderPracticeCh15(`practice-${topicId}`, CH, topicId, cfg.practiceConfigs)
    if (cfg.predictQ) QuizEngine.init({ containerId:`quiz-${topicId}-predict`, questions:cfg.predictQ, onComplete:()=>{} })
    if (cfg.mcqQ) QuizEngine.init({ containerId:`quiz-${topicId}-mcq`, questions:cfg.mcqQ, onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
    if (cfg.debug) CCompiler.initBlock($(`compiler-${topicId}-debug`), Object.assign({ mode:'debug', topicId, chapterId:CH }, cfg.debug, { onPass:()=>{} }))
  }

  function initTopic_strings() {
    const topicId = 'ch15-strings'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-strings-explore'), {
      mode:'explore', topicId, chapterId:CH, question:null,
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`char name[] = "Alice";
printf("String: %s\\n", name);
printf("First char: %c\\n", name[0]);
printf("Length: %zu\\n", strlen(name));
printf("Last char: %c\\n", name[strlen(name)-1]);
name[0] = 'a';
printf("After modify: %s\\n", name);`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch15-strings',
      question:'"Alice" has 5 letters but strlen returns 5 and the array needs 6 bytes. What accounts for the extra byte?',
      options:['A padding byte for alignment','The null terminator \'\\0\' at the end of every C string','The space for the variable name','The type tag byte'],
      correctIndex:1,
      feedback:{ correct:'Correct — every C string ends with \'\\0\' (byte value 0). strlen counts characters, not including \'\\0\'. But the array must hold it.', incorrect:'Every C string is terminated with \'\\0\'. strlen counts characters before \'\\0\'. The array must be one byte larger to hold it.' },
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch15-strings-3-continue').addEventListener('click', ()=>{ Progress.saveStepComplete(CH,topicId,3); sm.complete(3) })

    CCompiler.initBlock($('compiler-ch15-strings-modify'), {
      mode:'modify', topicId, chapterId:CH,
      question:'Change "Hello" to a different 5-letter word by modifying individual characters. Print the result.',
      includes:['<stdio.h>'],
      starterCode:`char s[]="Hello";\n/* modify characters */\nprintf("%s\\n",s);`,
      checkFn: out => { const lines=out.trim().split('\n').filter(l=>l.trim()); return lines.some(l=>l.length>=4 && l!=='Hello'); },
      hint:'s[0]=\'W\'; s[1]=\'o\'; s[2]=\'r\'; s[3]=\'l\'; s[4]=\'d\'; — changes to "World"',
      solution:`char s[]="Hello";\ns[0]='W'; s[1]='o'; s[2]='r'; s[3]='l'; s[4]='d';\nprintf("%s\\n",s);`,
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-strings-fill'), {
      mode:'fill', topicId, chapterId:CH,
      question:'Fill in to declare and print a string, then print its first character.',
      includes:['<stdio.h>'],
      starterCode:`[?] greeting[] = "Hi!";\nprintf("[?]\\n", greeting);\nprintf("%c\\n", greeting[[?]]);`,
      blanks:['char','%s','0'],
      hint:'First: char type for strings. Second: %s to print a string. Third: first character index.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-strings-build'), {
      mode:'build', topicId, chapterId:CH,
      question:'Declare char word[]="programming". Loop through it printing each character on its own line. Then print the total character count.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:'',
      checkFn: out => out.includes('p') && out.includes('g') && out.includes('11'),
      hint:'for(int i=0;word[i];i++) printf("%c\\n",word[i]); printf("Count: %zu\\n",strlen(word));',
      solution:`char word[]="programming";\nfor(int i=0;word[i];i++) printf("%c\\n",word[i]);\nprintf("Count: %zu\\n",strlen(word));`,
      onPass:()=>sm.complete(6)
    })

    CCompiler.initBlock($('compiler-ch15-strings-debug'), {
      mode:'debug', topicId, chapterId:CH,
      question:'This loops past the string end — fix the off-by-one.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:`char s[]="Hello";\nfor(int i=0;i<=strlen(s);i++) printf("%c\\n",s[i]);`,
      checkFn: out => { const ln=out.trim().split('\n').filter(l=>l.trim()); return ln.length===5&&ln[0]==='H'&&ln[4]==='o'; },
      hint:'i<=strlen(s) reads the \\0 byte — change to i<strlen(s).',
      hintTwo:'strlen("Hello")=5. Valid indices 0-4. i<=5 accesses \\0.',
      solution:`char s[]="Hello";\nfor(int i=0;i<strlen(s);i++) printf("%c\\n",s[i]);`,
      onPass:()=>{}
    })
    sm.complete(7)

    const assessment = {
      title:'Strings in C — Assessment',
      predictQ:[{
        id:'ch15-str-p1', type:'predict', question:'What prints?',
        code:`char s[]="Cat";\nprintf("%c%c%c\\n",s[2],s[1],s[0]);`,
        correct:['taC'], caseSensitive:true, orderMatters:true,
        hint:'Prints characters at index 2, 1, 0 — reversed.',
        feedback:{correct:'Correct — t,a,C reversed = "taC".',incorrect:'s[2]=t, s[1]=a, s[0]=C → "taC".'}
      }],
      mcqQ:[{
        id:'ch15-str-m1', type:'mcq',
        question:'char name[5]="Hello" — what is wrong?',
        options:['Nothing — "Hello" fits in 5 chars','The array is 1 byte too small — "Hello" is 6 bytes (5 chars + \'\\0\')','char arrays cannot use = for initialization','5 must be written as (int)5'],
        correct:['The array is 1 byte too small — "Hello" is 6 bytes (5 chars + \'\\0\')'],
        caseSensitive:false, orderMatters:false,
        hint:'"Hello" has 5 characters but requires 6 bytes: H,e,l,l,o,\\0.',
        feedback:{correct:'Correct — "Hello" needs 6 bytes. char name[5] only holds 5. The null terminator has nowhere to go.',incorrect:'"Hello" = 5 chars + \'\\0\' = 6 bytes. char name[5] is one byte too short. Use name[6] or name[].'}
      }],
      practiceConfigs:[{
        id:'p1',
        task:'Declare char msg[]="Hello World". Print the word count (number of spaces + 1).',
        check: out => out.includes('2'),
        hint:'int words=1; for(int i=0;msg[i];i++) if(msg[i]==\' \') words++;',
        solution:`char msg[]="Hello World";\nint words=1;\nfor(int i=0;msg[i];i++) if(msg[i]==' ') words++;\nprintf("Words: %d\\n",words);`
      }],
      debug:{
        question:'This should print the string but prints garbage or nothing. Find the bug.',
        includes:['<stdio.h>'],
        starterCode:`char s[5];\ns[0]='H'; s[1]='i';\nprintf("%s\\n",s);`,
        checkFn: out => out.trim()==='Hi',
        hint:'s has no null terminator — printf runs past \'i\' into undefined memory.',
        hintTwo:'Add s[2]=\'\\0\'; after s[1]=\'i\'; to terminate the string properly.',
        solution:`char s[5];\ns[0]='H'; s[1]='i'; s[2]='\\0';\nprintf("%s\\n",s);`
      }
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', ()=>
      openAssessmentModal(topicId, assessment.title, ()=>renderStringAssessment(topicId, assessment)))
  }

  function initTopic_null() {
    const topicId = 'ch15-null'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-null-explore'), {
      mode:'explore', topicId, chapterId:CH, question:null,
      includes:['<stdio.h>'],
      starterCode:
`char s[] = "Hello";
int len = 0;
while (s[len] != '\\0') len++;
printf("Length: %d\\n", len);
printf("s[5] = %d (null terminator)\\n", s[5]);

/* Truncate by placing \\0 earlier */
s[2] = '\\0';
printf("Truncated: %s\\n", s);`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch15-null',
      question:'After s[2]=\'\\0\' on "Hello", printf("%s",s) printed "He". Why did it stop?',
      options:['printf counts exactly 2 characters','The null terminator at s[2] signals the end of the string to printf','Setting s[2] deletes the rest of the characters','printf stops at index 2 automatically'],
      correctIndex:1,
      feedback:{correct:'Correct — printf("%s") scans for \'\\0\'. Finding it at s[2] stops printing. The remaining bytes are still there in memory but invisible.',incorrect:'printf("%s") stops at the first \'\\0\'. Placing \'\\0\' at s[2] makes "He\\0lo" — printf sees "He" and stops.'},
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch15-null-3-continue').addEventListener('click', ()=>{ Progress.saveStepComplete(CH,topicId,3); sm.complete(3) })

    CCompiler.initBlock($('compiler-ch15-null-modify'), {
      mode:'modify', topicId, chapterId:CH,
      question:'Write a manual strlen: loop until \'\\0\' is found, return the count. Test with "Programming".',
      includes:['<stdio.h>'],
      starterCode:`char s[]="Programming";\nint len=0;\n/* count chars until \\\\0 */\nprintf("Length: %d\\n",len);`,
      checkFn: out => out.includes('11'),
      hint:'while(s[len]!='+'\'\\0\''+') len++;',
      solution:`char s[]="Programming";\nint len=0;\nwhile(s[len]) len++;\nprintf("Length: %d\\n",len);`,
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-null-fill'), {
      mode:'fill', topicId, chapterId:CH,
      question:'Fill in the null terminator-aware loop pattern.',
      includes:['<stdio.h>'],
      starterCode:`char t[]="Loop";\nfor(int i=0; t[i][?]'\\0'; i++)\n    printf("%c\\n", t[i]);`,
      blanks:['!='],
      hint:'Loop until the character at position i equals the null terminator.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-null-build'), {
      mode:'build', topicId, chapterId:CH,
      question:'Build a string reversal: given char s[]="abcde", create a reversed copy in char rev[6] and print it.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:'',
      checkFn: out => out.includes('edcba'),
      hint:'int n=strlen(s); for(int i=0;i<n;i++) rev[i]=s[n-1-i]; rev[n]=\'\\0\';',
      solution:
`char s[]="abcde";
int n=strlen(s);
char rev[6];
for(int i=0;i<n;i++) rev[i]=s[n-1-i];
rev[n]='\\0';
printf("%s\\n",rev);`,
      onPass:()=>sm.complete(6)
    })

    CCompiler.initBlock($('compiler-ch15-null-debug'), {
      mode:'debug', topicId, chapterId:CH,
      question:'The null terminator index is wrong — fix it.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:`char s[10]="hello";\ns[6]='\\0';\nprintf("%s\\n",s);`,
      checkFn: out => out.trim()==="hello",
      hint:'strlen("hello")=5. The \\0 belongs at index 5, not 6.',
      hintTwo:'Change s[6]=\\0 to s[5]=\\0.',
      solution:`char s[10]="hello";\ns[5]='\\0';\nprintf("%s\\n",s);`,
      onPass:()=>{}
    })
    sm.complete(7)

    const assessment = {
      title:'Null Terminator — Assessment',
      predictQ:[{
        id:'ch15-nl-p1', type:'predict', question:'What prints?',
        code:`char s[]="Hello";\ns[3]='\\0';\nprintf("%s\\n",s);`,
        correct:['Hel'], caseSensitive:true, orderMatters:true,
        hint:'\\0 placed at index 3 terminates after H,e,l.',
        feedback:{correct:'Correct — \\0 at index 3 stops printf after "Hel".',incorrect:'\\0 at s[3] makes "Hel\\0o". printf sees "Hel" and stops.'}
      }],
      mcqQ:[{
        id:'ch15-nl-m1', type:'mcq',
        question:'What is the integer value of the null terminator \'\\0\'?',
        options:['32','256','0','-1'],
        correct:['0'],
        caseSensitive:false, orderMatters:false,
        hint:'\\0 is the character with ASCII code 0 — which is also why it evaluates as false.',
        feedback:{correct:'Correct — \'\\0\' has integer value 0. That is why while(s[i]) stops when the null terminator is reached.',incorrect:'\'\\0\' = integer 0. That is why while(s[i]) terminates — 0 is false.'}
      }],
      practiceConfigs:[{
        id:'p1',
        task:'Write a function that counts how many vowels are in char str[]="Hello World" without using strlen — loop until \'\\0\'.',
        check: out => out.includes('3'),
        hint:'for(int i=0;str[i];i++) if strchr("aeiouAEIOU",str[i]) count++;',
        solution:`char str[]="Hello World";\nint count=0;\nfor(int i=0;str[i];i++){\n    char c=str[i];\n    if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u'||c=='A'||c=='E'||c=='I'||c=='O'||c=='U') count++;\n}\nprintf("Vowels: %d\\n",count);`
      }],
      debug:{
        question:'This string concat manually is broken — missing the terminator. Fix it.',
        includes:['<stdio.h>'],
        starterCode:`char a[]="Hi";\nchar b[]="You";\nchar c[10];\nfor(int i=0;a[i];i++) c[i]=a[i];\nint j=2;\nfor(int i=0;b[i];i++) c[j++]=b[i];\nprintf("%s\\n",c);`,
        checkFn: out => out.trim()==='HiYou',
        hint:'After copying both strings into c, there is no \'\\0\' at the end. printf runs past the data.',
        hintTwo:'After the second loop, add: c[j]=\'\\0\';',
        solution:`char a[]="Hi";\nchar b[]="You";\nchar c[10];\nfor(int i=0;a[i];i++) c[i]=a[i];\nint j=2;\nfor(int i=0;b[i];i++) c[j++]=b[i];\nc[j]='\\0';\nprintf("%s\\n",c);`
      }
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', ()=>
      openAssessmentModal(topicId, assessment.title, ()=>renderStringAssessment(topicId, assessment)))
  }

  function initTopic_strinput() {
    const topicId = 'ch15-strinput'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-strinput-explore'), {
      mode:'explore', topicId, chapterId:CH, question:null,
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`/* Simulated input — use pre-set strings in browser */
char name[50] = "Alice";
char fullname[50] = "John Smith";

printf("Name: %s\\n", name);
printf("Full: %s\\n", fullname);
printf("Name length: %zu\\n", strlen(name));
printf("Buffer capacity: 50 chars\\n");`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch15-strinput',
      question:'Why is scanf("%s", buf) risky without a width specifier?',
      options:['It only reads uppercase letters','It has no length limit — a long input can overflow the buffer and corrupt memory','It adds two null terminators','It cannot read strings with numbers'],
      correctIndex:1,
      feedback:{correct:'Correct — scanf("%s") has no built-in length limit. Input longer than the buffer overflows it, corrupting adjacent memory.',incorrect:'scanf("%s") reads until whitespace with no length limit. A very long word overflows the char array — classic buffer overflow vulnerability.'},
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch15-strinput-3-continue').addEventListener('click', ()=>{ Progress.saveStepComplete(CH,topicId,3); sm.complete(3) })

    CCompiler.initBlock($('compiler-ch15-strinput-modify'), {
      mode:'modify', topicId, chapterId:CH,
      question:'Given char input[]="  hello world  ", print the string with leading/trailing spaces stripped.',
      includes:['<stdio.h>','<string.h>','<ctype.h>'],
      starterCode:`char input[]="  hello world  ";\nprintf("Original: [%s]\\n", input);`,
      checkFn: out => out.includes('[hello') || out.includes('hello world'),
      hint:'Find first non-space, find last non-space, print that range.',
      solution:
`char input[]="  hello world  ";
int start=0, end=strlen(input)-1;
while(isspace(input[start])) start++;
while(end>start && isspace(input[end])) end--;
printf("[");
for(int i=start;i<=end;i++) printf("%c",input[i]);
printf("]\\n");`,
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-strinput-fill'), {
      mode:'fill', topicId, chapterId:CH,
      question:'Fill in the safe string buffer declaration pattern.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`[?] buf[[?]];             /* 64-char buffer */
[?] simulated[] = "TestInput";
printf("%s\\n", [?]);`,
      blanks:['char','64','char','simulated'],
      hint:'First two: declare a char array of size 64. Third: declare another char variable. Fourth: print the simulated input.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-strinput-build'), {
      mode:'build', topicId, chapterId:CH,
      question:'Simulate reading a username: declare char user[]="jsmith42". Validate: must be at least 4 chars and at most 12. Print "Valid" or "Invalid".',
      includes:['<stdio.h>','<string.h>'],
      starterCode:'',
      checkFn: out => out.includes('Valid'),
      hint:'int len=strlen(user); if(len>=4&&len<=12) printf("Valid\\n"); else printf("Invalid\\n");',
      solution:`char user[]="jsmith42";\nint len=strlen(user);\nif(len>=4&&len<=12) printf("Valid\\n");\nelse printf("Invalid\\n");`,
      onPass:()=>sm.complete(6)
    })

    CCompiler.initBlock($('compiler-ch15-strinput-debug'), {
      mode:'debug', topicId, chapterId:CH,
      question:'A 4-char password fails validation — the minimum check operator is wrong.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:`char pw[]="pass";\nint n=strlen(pw);\nif(n>4&&n<=12) printf("OK\\n"); else printf("Too short\\n");`,
      checkFn: out => out.trim()==="OK",
      hint:'n>4 requires strictly more than 4. Change > to >= to allow 4-char passwords.',
      hintTwo:'strlen("pass")=4. Condition should be n>=4&&n<=12.',
      solution:`char pw[]="pass";\nint n=strlen(pw);\nif(n>=4&&n<=12) printf("OK\\n"); else printf("Too short\\n");`,
      onPass:()=>{}
    })
    sm.complete(7)

    const assessment = {
      title:'String Input — Assessment',
      predictQ:[{
        id:'ch15-si-p1', type:'predict', question:'What prints?',
        code:`#include <string.h>\nchar s[]="Hello";\nprintf("%zu\\n",strlen(s));`,
        correct:['5'], caseSensitive:true, orderMatters:true,
        hint:'strlen counts characters not including \\0.',
        feedback:{correct:'Correct — "Hello" has 5 characters. strlen=5.',incorrect:'strlen counts chars before \\0. "Hello" = 5.'}
      }],
      mcqQ:[{
        id:'ch15-si-m1', type:'mcq',
        question:'When declaring a char buffer for a 10-character string, the minimum size is:',
        options:['10','9','11','12'],
        correct:['11'],
        caseSensitive:false, orderMatters:false,
        hint:'10 chars + 1 null terminator.',
        feedback:{correct:'Correct — 10 characters + \'\\0\' = 11 bytes minimum.',incorrect:'N characters need N+1 bytes — one extra for \'\\0\'.'}
      }],
      practiceConfigs:[{
        id:'p1',
        task:'Declare char password[]="Secr3t!". Check: must be 6+ chars, must contain at least one digit. Print "Strong" or "Weak".',
        check: out => out.includes('Strong'),
        hint:'int len=strlen(p),hasDigit=0; for(int i=0;p[i];i++) if(isdigit(p[i])) hasDigit=1;',
        solution:`#include <ctype.h>\n#include <string.h>\nchar p[]="Secr3t!";\nint len=strlen(p),hasDigit=0;\nfor(int i=0;p[i];i++) if(isdigit(p[i])) hasDigit=1;\nif(len>=6&&hasDigit) printf("Strong\\n"); else printf("Weak\\n");`
      }],
      debug:{
        question:'This should check if a string is empty but always says not-empty. Fix it.',
        includes:['<stdio.h>','<string.h>'],
        starterCode:`char s[]="";\nif(strlen(s)>0) printf("not empty\\n");\nelse printf("empty\\n");`,
        checkFn: out => out.includes('empty') && !out.includes('not empty'),
        hint:'strlen("") returns 0. The condition strlen(s)>0 should be false for an empty string.',
        hintTwo:'The logic is actually correct — the bug might be the string is not truly empty. Verify s[]="" initializes as a zero-length string.',
        solution:`char s[]="";\nif(strlen(s)>0) printf("not empty\\n");\nelse printf("empty\\n");`
      }
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', ()=>
      openAssessmentModal(topicId, assessment.title, ()=>renderStringAssessment(topicId, assessment)))
  }

  function initTopic_strfn() {
    const topicId = 'ch15-strfn'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-strfn-explore'), {
      mode:'explore', topicId, chapterId:CH, question:null,
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`char a[]="Hello";
char b[20];

strcpy(b, a);
printf("Copy: %s\\n", b);

strcat(b, " World");
printf("Concat: %s\\n", b);

printf("strlen: %zu\\n", strlen(b));

int cmp1 = strcmp("apple","apple");
int cmp2 = strcmp("apple","banana");
printf("strcmp equal: %d\\n", cmp1);
printf("strcmp a<b: %d\\n", cmp2);`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch15-strfn',
      question:'strcmp("apple","apple") returned 0 and strcmp("apple","banana") returned negative. What does the return value mean?',
      options:['0=error, negative=false, positive=true','0=equal, negative=first<second, positive=first>second','0=empty, negative=shorter, positive=longer','0=found, negative=not found'],
      correctIndex:1,
      feedback:{correct:'Correct — strcmp returns 0 for equal strings, negative when first<second lexicographically, positive when first>second.',incorrect:'strcmp: 0=equal, <0=first string comes before second alphabetically, >0=first comes after second.'},
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch15-strfn-3-continue').addEventListener('click', ()=>{ Progress.saveStepComplete(CH,topicId,3); sm.complete(3) })

    CCompiler.initBlock($('compiler-ch15-strfn-modify'), {
      mode:'modify', topicId, chapterId:CH,
      question:'Use strcmp to check if two strings are equal. Then use strcat to build "Hello, Name!" where Name comes from a separate variable.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`char greet[50] = "Hello, ";
char name[] = "Alice";
/* build the greeting and check equality */`,
      checkFn: out => out.includes('Hello, Alice'),
      hint:'strcat(greet, name); strcat(greet, "!"); printf("%s\\n",greet);',
      solution:
`char greet[50]="Hello, ";
char name[]="Alice";
strcat(greet,name); strcat(greet,"!");
printf("%s\\n",greet);
if(strcmp(name,"Alice")==0) printf("Name is Alice\\n");`,
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-strfn-fill'), {
      mode:'fill', topicId, chapterId:CH,
      question:'Fill in the correct string.h function names.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`char src[]="World";
char dst[20]="Hello ";
[?](dst, src);                      /* append src to dst */
printf("Length: %zu\\n", [?](dst));  /* count characters */
printf("%d\\n", [?](src, "World")); /* compare — should be 0 */`,
      blanks:['strcat','strlen','strcmp'],
      hint:'Concatenate, length, compare.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-strfn-build'), {
      mode:'build', topicId, chapterId:CH,
      question:'Write a function int myStrlen(char s[]) that counts characters until \'\\0\'. Verify it gives the same result as strlen("Computer Science").',
      includes:['<stdio.h>','<string.h>'],
      starterCode:'',
      checkFn: out => out.includes('16') && (out.match(/16/g)||[]).length >= 2,
      hint:'int myStrlen(char s[]){ int n=0; while(s[n]) n++; return n; }',
      solution:`int myStrlen(char s[]){ int n=0; while(s[n]) n++; return n; }\nchar t[]="Computer Science";\nprintf("myStrlen: %d\\n",myStrlen(t));\nprintf("strlen: %zu\\n",strlen(t));`,
      onPass:()=>sm.complete(6)
    })

    CCompiler.initBlock($('compiler-ch15-strfn-debug'), {
      mode:'debug', topicId, chapterId:CH,
      question:'strncpy fills all bytes but skips null-termination — fix the safety bug.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:`char dst[5];\nstrncpy(dst,"Hello!",sizeof(dst));\nprintf("%s\\n",dst);`,
      checkFn: out => out.trim()==="Hell",
      hint:'Copy sizeof(dst)-1 bytes then set dst[sizeof(dst)-1]=\'\\0\'.',
      hintTwo:'strncpy(dst,"Hello!",4); dst[4]=\'\\0\'; ensures safe termination.',
      solution:`char dst[5];\nstrncpy(dst,"Hello!",sizeof(dst)-1);\ndst[sizeof(dst)-1]='\\0';\nprintf("%s\\n",dst);`,
      onPass:()=>{}
    })
    sm.complete(7)

    const assessment = {
      title:'string.h Functions — Assessment',
      predictQ:[{
        id:'ch15-sf-p1', type:'predict', question:'What prints?',
        code:`#include <string.h>\nchar a[20]="Go";\nstrcat(a,"al");\nprintf("%s %zu\\n",a,strlen(a));`,
        correct:['Goal 4'], caseSensitive:true, orderMatters:true,
        hint:'strcat appends "al" to "Go" → "Goal". strlen=4.',
        feedback:{correct:'Correct — "Go"+"al"="Goal", strlen=4.',incorrect:'strcat: "Go"+"al"="Goal". strlen("Goal")=4. Output: "Goal 4".'}
      }],
      mcqQ:[{
        id:'ch15-sf-m1', type:'mcq',
        question:'Why should you never use == to compare two strings in C?',
        options:['== only works for numbers','== compares memory addresses not string content','== is slower than strcmp','== only compares the first character'],
        correct:['== compares memory addresses not string content'],
        caseSensitive:false, orderMatters:false,
        hint:'char arrays are represented as pointers to their first element.',
        feedback:{correct:'Correct — str1==str2 compares where the strings are stored in memory, not what they contain. Use strcmp(str1,str2)==0.',incorrect:'== on char arrays compares addresses (pointer equality). Two identical strings at different memory locations would compare as not-equal. Use strcmp.'}
      }],
      practiceConfigs:[{
        id:'p1',
        task:'Write a function that checks if a string is a palindrome (reads same forwards and backwards). Test with "racecar" and "hello".',
        check: out => out.includes('Yes') || out.includes('palindrome') || out.includes('true'),
        hint:'Compare s[0] with s[n-1], s[1] with s[n-2], etc.',
        solution:
`#include <string.h>
int isPalin(char s[]){
    int n=strlen(s);
    for(int i=0;i<n/2;i++) if(s[i]!=s[n-1-i]) return 0;
    return 1;
}
printf("%s\\n", isPalin("racecar")?"Yes":"No");
printf("%s\\n", isPalin("hello")?"Yes":"No");`
      }],
      debug:{
        question:'This strcat overflows — the destination buffer is too small. Fix it.',
        includes:['<stdio.h>','<string.h>'],
        starterCode:`char a[5]="Hi";\nstrcat(a," World");\nprintf("%s\\n",a);`,
        checkFn: out => out.includes('Hi World'),
        hint:'a[5] can hold 4 chars + \\0. " World" is 6 chars. Destination must be large enough.',
        hintTwo:'Increase the buffer size: char a[20]="Hi"; — 20 is large enough for "Hi World".',
        solution:`char a[20]="Hi";\nstrcat(a," World");\nprintf("%s\\n",a);`
      }
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', ()=>
      openAssessmentModal(topicId, assessment.title, ()=>renderStringAssessment(topicId, assessment)))
  }

  function initTopic_strarr() {
    const topicId = 'ch15-strarr'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-strarr-explore'), {
      mode:'explore', topicId, chapterId:CH, question:null,
      includes:['<stdio.h>'],
      starterCode:
`/* Array of string pointers — compact, read-only */
char *days[] = {"Mon","Tue","Wed","Thu","Fri","Sat","Sun"};
for(int i=0;i<7;i++) printf("%d. %s\\n",i+1,days[i]);

/* 2D char array — writable strings */
char names[3][20] = {"Alice","Bob","Carol"};
names[0][0] = 'a';  /* can modify */
printf("Modified: %s\\n", names[0]);`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch15-strarr',
      question:'char *days[] is compact but days[0][0]=\'m\' would be undefined behavior. Why?',
      options:['String literals are const — they point to read-only memory','The array has only one dimension','Char pointers cannot be indexed twice','days[0] returns an int not a char*'],
      correctIndex:0,
      feedback:{correct:'Correct — char* elements point to string literals in read-only memory. Modifying them is undefined behavior. Use char days[][4] for writable strings.',incorrect:'String literals are stored in read-only data segments. char *days[] stores pointers to those literals. Modifying through them is undefined behavior.'},
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch15-strarr-3-continue').addEventListener('click', ()=>{ Progress.saveStepComplete(CH,topicId,3); sm.complete(3) })

    CCompiler.initBlock($('compiler-ch15-strarr-modify'), {
      mode:'modify', topicId, chapterId:CH,
      question:'Add a loop that prints each day with its 3-letter abbreviation on a numbered list.',
      includes:['<stdio.h>'],
      starterCode:`char *months[]={"January","February","March","April","May","June"};\n/* print numbered list */`,
      checkFn: out => out.includes('1.') && out.includes('June'),
      hint:'for(int i=0;i<6;i++) printf("%d. %s\\n",i+1,months[i]);',
      solution:`char *months[]={"January","February","March","April","May","June"};\nfor(int i=0;i<6;i++) printf("%d. %s\\n",i+1,months[i]);`,
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-strarr-fill'), {
      mode:'fill', topicId, chapterId:CH,
      question:'Fill in to search a string array for a match.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`char *fruits[]={"apple","banana","cherry"};
char *target="banana";
int found=-1;
for(int i=0;i<3;i++)
    if([?](fruits[i],target)==[?]) { found=i; break; }
printf("Index: %d\\n",found);`,
      blanks:['strcmp','0'],
      hint:'Use strcmp to compare each fruit with target. It returns 0 for equal strings.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-strarr-build'), {
      mode:'build', topicId, chapterId:CH,
      question:'Store char *colors[]={"red","green","blue","yellow","purple"}. Find and print the longest color name.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:'',
      checkFn: out => out.includes('purple') || out.includes('yellow'),
      hint:'Track max length and the string that gave it: if(strlen(colors[i])>maxLen){ maxLen=strlen(...); longest=colors[i]; }',
      solution:
`char *colors[]={"red","green","blue","yellow","purple"};
int maxLen=0;
char *longest="";
for(int i=0;i<5;i++)
    if((int)strlen(colors[i])>maxLen){ maxLen=strlen(colors[i]); longest=colors[i]; }
printf("Longest: %s\\n",longest);`,
      onPass:()=>sm.complete(6)
    })


    CCompiler.initBlock($('compiler-ch15-strarr-debug'), {
      mode:'debug', topicId, chapterId:CH,
      question:'This accesses an out-of-bounds index. Fix it to print "beta".',
      includes:['<stdio.h>'],
      starterCode:`char *words[]={"alpha","beta","gamma"};\nprintf("%s\\n",words[3]);`,
      checkFn: out => out.trim()==='beta',
      hint:'words[3] is out of bounds. Use words[1] for "beta".',
      hintTwo:'words[0]="alpha", words[1]="beta", words[2]="gamma".',
      solution:`char *words[]={"alpha","beta","gamma"};\nprintf("%s\\n",words[1]);`,
      onPass:()=>{}
    })
    sm.complete(7)

    const assessment = {
      title:'Arrays of Strings — Assessment',
      predictQ:[{
        id:'ch15-sa-p1', type:'predict', question:'What prints?',
        code:`char *w[]={"cat","dog","fish"};\nprintf("%c\\n",w[1][0]);`,
        correct:['d'], caseSensitive:true, orderMatters:true,
        hint:'w[1]="dog". w[1][0] is the first character of "dog".',
        feedback:{correct:'Correct — w[1]="dog", w[1][0]=\'d\'.',incorrect:'w[1]="dog". First character is \'d\'.'}
      }],
      mcqQ:[{
        id:'ch15-sa-m1', type:'mcq',
        question:'When should you use char names[5][20] instead of char *names[5]?',
        options:['When strings are shorter than 20 chars','When you need to modify individual characters of the strings','When the strings should be read-only','When you need exactly 5 strings'],
        correct:['When you need to modify individual characters of the strings'],
        caseSensitive:false, orderMatters:false,
        hint:'One gives you writable buffers, the other gives you pointers to read-only literals.',
        feedback:{correct:'Correct — char names[5][20] allocates writable buffers. char *names[5] points to read-only string literals.',incorrect:'Use 2D char array when strings must be modifiable. Pointer arrays point to read-only literals.'}
      }],
      practiceConfigs:[{
        id:'p1',
        task:'Given char *animals[]={"elephant","cat","rhinoceros","fox","hippopotamus"}, sort them by length (shortest first) using a simple selection sort. Print sorted list.',
        check: out => {
          const lines = out.trim().split('\n').filter(l=>l.trim())
          return lines[0].includes('cat') || lines[0].includes('fox')
        },
        hint:'Selection sort: find shortest remaining, swap with current position. Use strlen to compare.',
        solution:
`char *animals[]={"elephant","cat","rhinoceros","fox","hippopotamus"};
int n=5;
for(int i=0;i<n-1;i++){
    int minIdx=i;
    for(int j=i+1;j<n;j++) if(strlen(animals[j])<strlen(animals[minIdx])) minIdx=j;
    char *tmp=animals[i]; animals[i]=animals[minIdx]; animals[minIdx]=tmp;
}
for(int i=0;i<n;i++) printf("%s\\n",animals[i]);`
      }],
      debug:{
        question:'This tries to modify a string from a char* array but has undefined behavior. Fix it.',
        includes:['<stdio.h>'],
        starterCode:`char *names[]={"Alice","Bob"};\nnames[0][0]='a';\nprintf("%s\\n",names[0]);`,
        checkFn: out => out.includes('alice') || out.includes('Alice'),
        hint:'names[] points to string literals in read-only memory. Modifying them is undefined behavior.',
        hintTwo:'Use a 2D char array instead: char names[2][10]={"Alice","Bob"}; — this is a writable copy.',
        solution:`char names[2][10]={"Alice","Bob"};\nnames[0][0]='a';\nprintf("%s\\n",names[0]);`
      }
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', ()=>
      openAssessmentModal(topicId, assessment.title, ()=>renderStringAssessment(topicId, assessment)))
  }

  function initTopic_mistakes() {
    const topicId = 'ch15-mistakes'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch15-mistakes-explore'), {
      mode:'explore', topicId, chapterId:CH, question:null,
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`/* BUG 1: == compares addresses, not content */
char a[]="hello", b[]="hello";
if(strcmp(a,b)==0) printf("Equal (strcmp correct)\\n");

/* BUG 2: strlen doesn't count \\0 */
printf("strlen(\\"hi\\") = %zu  but needs %zu bytes\\n",
        strlen("hi"), strlen("hi")+1);

/* BUG 3: manually terminated OK */
char buf[5]; buf[0]='O'; buf[1]='K'; buf[2]='\\0';
printf("Manual: %s\\n", buf);`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch15-mistakes',
      question:'char a[]="hi"; char b[]="hi"; if(a==b) — this compares two identical strings. What does it actually test?',
      options:['Whether the string contents are equal','Whether a and b point to the same memory address','Whether a is alphabetically less than b','Whether both strings have length 2'],
      correctIndex:1,
      feedback:{correct:'Correct — a and b are different arrays at different addresses. a==b compares those addresses — it will be false even though the content is identical.',incorrect:'In C, a char array name is a pointer to the first element. == compares the addresses, not the string content. Always use strcmp for content comparison.'},
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch15-mistakes-3-continue').addEventListener('click', ()=>{ Progress.saveStepComplete(CH,topicId,3); sm.complete(3) })

    CCompiler.initBlock($('compiler-ch15-mistakes-modify'), {
      mode:'modify', topicId, chapterId:CH,
      question:'Fix the four common bugs: use strcmp for comparison, right-size the buffer, add missing \\0, and use strncpy safely.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`char s1[]="test";
char s2[]="test";

/* BUG: == on strings */
if(s1==s2) printf("equal\\n");

/* BUG: buffer too small for null terminator */
char name[5]="Alice";  /* "Alice"=5 chars needs 6 */
printf("%s\\n",name);`,
      checkFn: out => out.includes('equal') && out.includes('Alice'),
      hint: 'Fix: strcmp(s1,s2)==0. Fix: char name[6]="Alice";',
      solution:
`char s1[]="test", s2[]="test";
if(strcmp(s1,s2)==0) printf("equal\\n");
char name[6]="Alice";
printf("%s\\n",name);`,
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch15-mistakes-fill'), {
      mode:'fill', topicId, chapterId:CH,
      question:'Fill in the correct fixes for common string bugs.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:
`char a[]="hello", b[]="hello";
/* Compare content, not address */
if([?](a,b)==0) printf("equal\\n");

/* Safe copy with size limit */
char dst[10];
[?](dst, "Hi World", sizeof(dst)-1);
dst[sizeof(dst)-1]='\\0';
printf("%s\\n",dst);`,
      blanks:['strcmp','strncpy'],
      hint:'Use strcmp for string comparison, strncpy for bounded copying.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch15-mistakes-build'), {
      mode:'build', topicId, chapterId:CH,
      question: 'Write a safe string duplicate function: char buf[20]; safely copy "Hello World" into buf using strncpy, always null-terminate. Print the result and its length.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:'',
      checkFn: out => out.includes('Hello World') && out.includes('11'),
      hint:'strncpy(buf,"Hello World",sizeof(buf)-1); buf[sizeof(buf)-1]=\'\\0\'; printf("%s %zu\\n",buf,strlen(buf));',
      solution:
`char buf[20];
strncpy(buf,"Hello World",sizeof(buf)-1);
buf[sizeof(buf)-1]='\\0';
printf("%s\\n",buf);
printf("Length: %zu\\n",strlen(buf));`,
      onPass:()=>sm.complete(6)
    })

    CCompiler.initBlock($('compiler-ch15-mistakes-debug'), {
      mode:'debug', topicId, chapterId:CH,
      question:'This uses == to compare strings — it compares addresses, not content. Fix it.',
      includes:['<stdio.h>','<string.h>'],
      starterCode:`char a[]="hello";\nchar b[]="hello";\nif(a==b) printf("equal\\n"); else printf("not equal\\n");`,
      checkFn: out => out.trim()==="equal",
      hint:'a==b compares pointer addresses. Use strcmp(a,b)==0 to compare string content.',
      hintTwo:'Replace a==b with strcmp(a,b)==0.',
      solution:`char a[]="hello";\nchar b[]="hello";\nif(strcmp(a,b)==0) printf("equal\\n"); else printf("not equal\\n");`,
      onPass:()=>{}
    })
    sm.complete(7)

    const assessment = {
      title:'Common String Mistakes — Assessment',
      predictQ:[{
        id:'ch15-mk-p1', type:'predict', question:'What does this comparison actually test?',
        code:`char x[]="hi";\nchar y[]="hi";\nif(x==y) printf("same\\n"); else printf("diff\\n");`,
        correct:['diff'], caseSensitive:true, orderMatters:true,
        hint:'x and y are separate arrays at different memory addresses.',
        feedback:{correct:'Correct — x and y are different arrays. == compares addresses → not equal → "diff".',incorrect:'x and y are at different addresses. == compares addresses, not content → prints "diff".'}
      }],
      mcqQ:[{
        id:'ch15-mk-m1', type:'mcq',
        question:'Which is the safe alternative to strcpy that prevents buffer overflow?',
        options:['safecpy()','memcpy()','strncpy() with explicit null-termination','copystr()'],
        correct:['strncpy() with explicit null-termination'],
        caseSensitive:false, orderMatters:false,
        hint:'strncpy limits the copy length — but you must manually ensure null termination.',
        feedback:{correct:'Correct — strncpy(dst,src,sizeof(dst)-1) then dst[sizeof(dst)-1]=\'\\0\' is the safe pattern.',incorrect:'strncpy(dst,src,n) limits to n characters but may not null-terminate. Always add dst[n]="\\0" after.'}
      }],
      practiceConfigs:[{
        id:'p1',
        task:'Write a safe_compare(a,b) function using strcmp (not ==). Test with "cat"=="cat" and "cat"=="dog" — print "equal" or "different" for each.',
        check: out => out.includes('equal') && out.includes('different'),
        hint:'int safe_compare(char *a,char *b){ return strcmp(a,b)==0; }',
        solution:
`int safe_compare(char *a, char *b){ return strcmp(a,b)==0; }
if(safe_compare("cat","cat")) printf("equal\\n"); else printf("different\\n");
if(safe_compare("cat","dog")) printf("equal\\n"); else printf("different\\n");`
      }],
      debug:{
        question:'Three string bugs are present. Find and fix all three.',
        includes:['<stdio.h>','<string.h>'],
        starterCode:
`char s[4]="Hello";   /* too small */
char buf[20];
buf[0]='H'; buf[1]='i';   /* missing null terminator */
char *a="same", *b="same";
if(a==b) printf("equal\\n");  /* wrong comparison */
printf("%s\\n", buf);`,
        checkFn: out => out.includes('Hi') && out.includes('equal'),
        hint:'Fix 1: s[6]="Hello". Fix 2: buf[2]=\'\\0\'. Fix 3: strcmp(a,b)==0.',
        hintTwo:'All three fixes: char s[6]="Hello"; buf[2]=\'\\0\'; if(strcmp(a,b)==0) printf("equal\\n");',
        solution:
`char s[6]="Hello";
char buf[20];
buf[0]='H'; buf[1]='i'; buf[2]='\\0';
char *a="same", *b="same";
if(strcmp(a,b)==0) printf("equal\\n");
printf("%s\\n", buf);`
      }
    }

    if (btn(topicId)) btn(topicId).addEventListener('click', ()=>
      openAssessmentModal(topicId, assessment.title, ()=>renderStringAssessment(topicId, assessment)))
  }

  /* ══════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch15-mastery'), {
      mode:'build', topicId:'ch15-mastery', chapterId:CH,
      question:
`Chapter 15 Mastery — use EVERY arrays & strings concept:
① Declare int scores[8]={88,72,95,61,84,77,90,55}. Find sum, min, max, average.
② Declare a 2×4 int grid. Fill it: grid[r][c]=r*10+c. Print row sums.
③ Declare char words[4][20]={"apple","banana","cherry","date"}. Print them sorted by length (shortest first) using a simple swap sort.
④ Build char sentence[]="Hello World". Count vowels, consonants, spaces separately.
⑤ Use strcmp to find which word in words[] comes first alphabetically.`,
      includes:['<stdio.h>','<string.h>','<ctype.h>'],
      starterCode:'',
      checkFn: out => {
        const text = out
        return (text.includes('88') || text.includes('Sum') || text.includes('Max')) &&
               text.includes('apple') &&
               (text.includes('vowel') || text.includes('Vowel') || text.match(/\d+/g))
      },
      hint:'Build section by section. Stats first, then 2D, then string sort, then vowel count.',
      solution:
`/* ① Array stats */
int scores[]={88,72,95,61,84,77,90,55};
int n=sizeof(scores)/sizeof(scores[0]);
int sum=0,min=scores[0],max=scores[0];
for(int i=0;i<n;i++){sum+=scores[i];if(scores[i]<min)min=scores[i];if(scores[i]>max)max=scores[i];}
printf("Sum:%d Min:%d Max:%d Avg:%d\\n",sum,min,max,sum/n);

/* ② 2D grid */
int grid[2][4];
for(int r=0;r<2;r++){int rs=0;for(int c=0;c<4;c++){grid[r][c]=r*10+c;rs+=grid[r][c];}printf("Row%d sum=%d\\n",r,rs);}

/* ③ Sort by length */
char words[4][20]={"apple","banana","cherry","date"};
for(int i=0;i<3;i++) for(int j=i+1;j<4;j++) if(strlen(words[j])<strlen(words[i])){char t[20];strcpy(t,words[i]);strcpy(words[i],words[j]);strcpy(words[j],t);}
for(int i=0;i<4;i++) printf("%s\\n",words[i]);

/* ④ Char classify */
char sentence[]="Hello World";
int vowels=0,cons=0,spaces=0;
for(int i=0;sentence[i];i++){char c=tolower(sentence[i]);if(c==' ')spaces++;else if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u')vowels++;else if(isalpha(c))cons++;}
printf("Vowels:%d Cons:%d Spaces:%d\\n",vowels,cons,spaces);

/* ⑤ First alphabetically */
char *first=words[0];
for(int i=1;i<4;i++) if(strcmp(words[i],first)<0) first=words[i];
printf("First alpha: %s\\n",first);`,
      onPass:() => {
        Progress.saveChapterComplete(CH)
        $('ch15-chapter-complete').style.display='block'
        $('ch15-chapter-complete').scrollIntoView({behavior:'smooth'})
      }
    })

    $('ch15-next-btn').addEventListener('click', ()=>{
      if (typeof loadChapter !== 'undefined') loadChapter('ch16')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh15(containerId, chapterId, topicId, configs) {
    const container = document.getElementById(containerId)
    if (!container) return
    let idx=0
    function renderTask(i) {
      if (i>=configs.length) {
        container.innerHTML='<p class="practice-complete">All tasks complete! ✓</p>'
        Progress.saveTopicComplete(chapterId,topicId+'-practice')
        return
      }
      const cfg=configs[i]
      container.innerHTML=''
      const header=document.createElement('div')
      header.className='practice-task__header'
      header.innerHTML=`<span class="practice-task__num">Task ${i+1} of ${configs.length}</span>`+
        `<span class="practice-task__dots">${configs.map((_,j)=>`<span class="dot ${j<i?'dot--done':j===i?'dot--active':''}"></span>`).join('')}</span>`
      container.appendChild(header)
      const desc=document.createElement('p')
      desc.className='practice-task__desc'
      desc.textContent=cfg.task
      container.appendChild(desc)
      const div=document.createElement('div')
      div.id=`pc15-${topicId}-${cfg.id}`
      container.appendChild(div)
      CCompiler.initBlock(div,{
        mode:'build', topicId:topicId+'-p-'+cfg.id, chapterId,
        question:null,
        includes:cfg.includes||['<stdio.h>'],
        starterCode:'',
        checkFn:cfg.check, hint:cfg.hint, solution:cfg.solution,
        onPass:()=>{ Progress.saveStepComplete(chapterId,topicId,'p'+cfg.id); idx++; setTimeout(()=>renderTask(idx),800) }
      })
    }
    renderTask(idx)
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  function init() {
    initTopic_array()
    initTopic_declare()
    initTopic_access()
    initTopic_iterate()
    initTopic_bounds()
    initTopic_2d()
    initTopic_2diterate()
    initTopic_strings()
    initTopic_null()
    initTopic_strinput()
    initTopic_strfn()
    initTopic_strarr()
    initTopic_mistakes()
    initMastery()
  }

  if (document.readyState==='loading') {
    init()
  } else {
    init()
  }

})()
