/* =========================================================
   C LEARNING PLATFORM — chapters/ch12-break-continue/ch12.js
   Chapter 12: Break & Continue
   5 topics · 7-step blocks · Assessment deferred to modal popup
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch12'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — BREAK
     ══════════════════════════════════════════════════════════ */
  function initTopic_break() {
    const topicId = 'ch12-break'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch12-break-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`for (int i = 1; i <= 10; i++) {
    if (i == 6) {
        printf("Stopping at i=%d\\n", i);
        break;
    }
    printf("%d\\n", i);
}
printf("After loop\\n");`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch12-break',
      question: 'The loop was set to run 10 times but stopped at 6. What happened to iterations 6 through 10?',
      options: [
        'They ran but printed nothing',
        'break cancelled them entirely — execution jumped to "After loop" immediately',
        'They were skipped by the for update clause',
        'They ran but the output was hidden'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — break exits the loop immediately. Iterations 7, 8, 9, 10 never ran at all. The for update clause also did not run one final time.',
        incorrect: 'break exits the loop entirely. Iterations 7-10 never executed. Execution jumped straight to "After loop".'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch12-break-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch12-break-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a flag variable "found" that is set to 1 before break. After the loop, print "Found!" if found==1 or "Not found" if found==0.',
      includes: ['<stdio.h>'],
      starterCode:
`int target = 7;
for (int i = 1; i <= 10; i++) {
    if (i == target) {
        break;
    }
}`,
      checkFn: o => o.toLowerCase().includes('found'),
      hint: 'int found=0; ... if(i==target){found=1;break;} ... after loop: if(found)printf("Found!\\n"); else printf("Not found\\n");',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch12-break-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to find the first number between 1-50 divisible by both 7 and 11.',
      includes: ['<stdio.h>'],
      starterCode:
`int result = -1;
for (int i = 1; i <= 50; i++) {
    if (i % 7 == 0 [?] i % 11 == 0) {
        result = i;
        [?];
    }
}
printf("Result: %d\\n", result);`,
      blanks: ['&&', 'break'],
      hint: 'Both divisible: && operator. Exit on find: break.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch12-break-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a loop that sums integers from 1 upward but stops (break) the moment the running sum exceeds 100. Print the final sum and the last number added.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: o => {
        const n = parseInt(o)
        return o.includes('105') || (n > 100 && n < 120)
      },
      hint: 'int sum=0; for(int i=1;;i++){sum+=i;if(sum>100){printf("Sum:%d last:%d\\n",sum,i);break;}}',
      solution: 'int sum=0;\nfor(int i=1;;i++){\n    sum+=i;\n    if(sum>100){printf("Sum: %d, Last added: %d\\n",sum,i);break;}\n}',
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        { id:'ch12-bk-p1', type:'predict', question:'What prints?',
          code:`for(int i=0;i<5;i++){\n    if(i==3)break;\n    printf("%d\\n",i);\n}`,
          correct:['0\n1\n2','0\r\n1\r\n2'], caseSensitive:true, orderMatters:true,
          hint:'break fires at i=3.',
          feedback:{correct:'Correct — 0,1,2 print. break at i=3 exits before printing.',incorrect:'i=0,1,2 print. At i=3, break fires before printf. 3,4 never run.'} },
        { id:'ch12-bk-p2', type:'predict', question:'What is i after the loop?',
          code:`int i;\nfor(i=0;i<10;i++){\n    if(i*i>50)break;\n}\nprintf("%d\\n",i);`,
          correct:['8'], caseSensitive:true, orderMatters:true,
          hint:'7*7=49, 8*8=64>50.',
          feedback:{correct:'Correct — 8*8=64>50, break at i=8.',incorrect:'7*7=49 (ok). 8*8=64>50 → break with i=8.'} },
        { id:'ch12-bk-p3', type:'predict', question:'What prints?',
          code:`int found=0;\nfor(int i=1;i<=5;i++){\n    if(i==3){found=1;break;}\n}\nprintf("%d\\n",found);`,
          correct:['1'], caseSensitive:true, orderMatters:true,
          hint:'found is set to 1 before break.',
          feedback:{correct:'Correct — found set to 1, break exits, printf shows 1.',incorrect:'i=3: found=1, break exits. After loop: printf prints 1.'} }
      ]
      const mcqQ = [
        {id:'ch12-bk-m1',type:'mcq',question:'What does break do in a loop?',options:['Skips to next iteration','Exits the loop immediately','Restarts the loop','Pauses execution'],correct:['Exits the loop immediately'],caseSensitive:false,orderMatters:false,hint:'Immediate exit.',feedback:{correct:'Correct — break exits the loop right away.',incorrect:'break exits the loop immediately. No more iterations run.'}},
        {id:'ch12-bk-m2',type:'mcq',question:'After break, where does execution continue?',options:['At the top of the loop','At the if that contained break','At the first statement after the loop\'s closing brace','At the beginning of the function'],correct:['At the first statement after the loop\'s closing brace'],caseSensitive:false,orderMatters:false,hint:'After the loop block.',feedback:{correct:'Correct — execution resumes immediately after the loop.',incorrect:'break jumps to the first statement after the closing } of the loop.'}},
        {id:'ch12-bk-m3',type:'mcq',question:'Why use a flag variable with break?',options:['To make break faster','To record whether break was triggered or the loop ended normally','break requires a flag variable','Flags replace break'],correct:['To record whether break was triggered or the loop ended normally'],caseSensitive:false,orderMatters:false,hint:'How do you know why the loop ended?',feedback:{correct:'Correct — after the loop you cannot tell if it ended normally or via break. A flag records which happened.',incorrect:'A flag (int found=0; set to 1 before break) lets you distinguish normal loop end from an early break exit.'}},
        {id:'ch12-bk-m4',type:'mcq',question:'Does the for loop update clause run when break fires?',options:['Yes — always','No — break skips the update and exits','Only if i is odd','Depends on the condition'],correct:['No — break skips the update and exits'],caseSensitive:false,orderMatters:false,hint:'break is immediate.',feedback:{correct:'Correct — break skips everything including the update clause. It exits immediately.',incorrect:'break is immediate. The update clause (i++) does NOT run when break fires.'}},
        {id:'ch12-bk-m5',type:'mcq',question:'break inside a switch inside a loop exits which construct?',options:['The loop only','The switch only','Both switch and loop','Neither'],correct:['The switch only'],caseSensitive:false,orderMatters:false,hint:'break only exits the innermost containing structure.',feedback:{correct:'Correct — break exits the innermost containing structure, which is the switch, not the loop.',incorrect:'break exits only its direct container. In switch inside loop, break exits the switch, not the loop.'}}
      ]
      const practiceConfigs = [
        {id:'p1',task:'Loop 1-100. Use break to stop when you find the first number divisible by both 13 and 7. Print it.',check:o=>o.includes('91'),hint:'if(i%13==0&&i%7==0){printf("%d\\n",i);break;}',solution:'for(int i=1;i<=100;i++){if(i%13==0&&i%7==0){printf("%d\\n",i);break;}}'},
        {id:'p2',task:'Sum 1-20 with break: if adding the next number would make sum exceed 60, stop without adding it. Print final sum.',check:o=>o.includes('55'),hint:'if(sum+i>60)break; sum+=i;',solution:'int sum=0;\nfor(int i=1;i<=20;i++){if(sum+i>60)break;sum+=i;}\nprintf("%d\\n",sum);'},
        {id:'p3',task:'Find the first perfect square greater than 150. Use a for loop with break.',check:o=>o.includes('169'),hint:'for(int i=1;;i++){if(i*i>150){printf("%d\\n",i*i);break;}}',solution:'for(int i=1;;i++){if(i*i>150){printf("%d\\n",i*i);break;}}'},
        {id:'p4',task:'Search the sequence 3,6,9,12,15,18,21 (multiples of 3) for the first one > 15. Use break and a found flag. Print the found value.',check:o=>o.includes('18'),hint:'int found=-1; for(int i=3;i<=21;i+=3){if(i>15){found=i;break;}} printf...',solution:'int found=-1;\nfor(int i=3;i<=21;i+=3){if(i>15){found=i;break;}}\nif(found!=-1)printf("Found: %d\\n",found);'},
        {id:'p5',task:'Count how many integers from 1 to 1000 are divisible by 17. Stop counting (break) once you reach 10 such numbers. Print the 10th.',check:o=>o.includes('170'),hint:'int count=0; for(int i=17;i<=1000;i+=17){count++;if(count==10){printf("%d\\n",i);break;}}',solution:'int count=0;\nfor(int i=17;i<=1000;i+=17){\n    count++;\n    if(count==10){printf("%d\\n",i);break;}\n}'}
      ]
      renderPracticeCh12('practice-ch12-break', CH, topicId, practiceConfigs)
      QuizEngine.init({containerId:'quiz-ch12-break-predict',questions:predictQ,onComplete:()=>{}})
      QuizEngine.init({containerId:'quiz-ch12-break-mcq',    questions:mcqQ,    onComplete:()=>Progress.saveTopicComplete(CH,topicId)})
      CCompiler.initBlock($('compiler-ch12-break-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'This search should print "Found at 5" but prints nothing. Find the bug.',
        includes:['<stdio.h>'],
        starterCode:'int arr[]={2,8,5,1,9,3};\nfor(int i=0;i<6;i++){\n    if(arr[i]==5)\n        printf("Found at %d\\n",i);\n        break;\n}',
        checkFn:o=>o.includes('Found at 2'),
        hint:'Look at the indentation carefully. Are both lines inside the if?',
        hintTwo:'Without braces, only the printf belongs to the if. break always runs on the first iteration, exiting before ever printing. Add braces: if(arr[i]==5){printf...;break;}',
        solution:'int arr[]={2,8,5,1,9,3};\nfor(int i=0;i<6;i++){\n    if(arr[i]==5){\n        printf("Found at %d\\n",i);\n        break;\n    }\n}',
        onPass:()=>{}
      })
    }
    if(btn(topicId)) btn(topicId).addEventListener('click',()=>openAssessmentModal(topicId,'break — Assessment',renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — CONTINUE
     ══════════════════════════════════════════════════════════ */
  function initTopic_continue() {
    const topicId = 'ch12-continue'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch12-continue-explore'), {
      mode:'explore', topicId, chapterId:CH, question:null,
      includes:['<stdio.h>'],
      starterCode:
`printf("Skip even numbers 1-10:\\n");
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;   /* skip even */
    printf("%d\\n", i);
}`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch12-continue',
      question:'continue skipped the printf for even numbers. In a for loop, what happens to the update clause (i++) when continue fires?',
      options:[
        'The update is skipped — i stays at its current value',
        'The update runs normally, then the condition is re-checked',
        'continue restarts the loop from i=0',
        'The update only runs when continue is inside an if'
      ],
      correctIndex:1,
      feedback:{
        correct:'Correct — in a for loop, continue jumps to the update clause (i++), not back to the initialiser. This is why for loops handle continue safely.',
        incorrect:'In a for loop: continue → update runs (i++) → condition re-checked → body if still true. The update always runs after continue in a for loop.'
      },
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch12-continue-3-continue').addEventListener('click',()=>{
      Progress.saveStepComplete(CH,topicId,3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch12-continue-modify'), {
      mode:'modify', topicId, chapterId:CH,
      question:'Change the loop to skip multiples of 3 instead of even numbers. Output should be: 1 2 4 5 7 8 10.',
      includes:['<stdio.h>'],
      starterCode:
`for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;
    printf("%d\\n", i);
}`,
      checkFn:o=>o.includes('1')&&o.includes('10')&&!o.includes('\n3\n')&&!o.includes('\n6\n'),
      hint:'Change i%2==0 to i%3==0.',
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch12-continue-fill'), {
      mode:'fill', topicId, chapterId:CH,
      question:'Fill in to sum only positive values in the array.',
      includes:['<stdio.h>'],
      starterCode:
`int vals[] = {5, -3, 8, 0, -1, 4, -7, 2};
int sum = 0;
for (int i = 0; i < 8; i++) {
    if (vals[i] [?] 0) [?];   /* skip non-positive */
    sum [?] vals[i];
}
printf("Sum: %d\\n", sum);`,
      blanks:['<=','continue','+='],
      hint: 'Skip if <=0 with continue. Add to sum with +=.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch12-continue-build'), {
      mode:'build', topicId, chapterId:CH,
      question:'Write a loop from 1 to 30 that:\n① Skips multiples of 4 (continue)\n② Skips multiples of 6 (continue)\n③ Counts and prints how many numbers were NOT skipped\n④ Print each non-skipped number on one line',
      includes:['<stdio.h>'],
      starterCode:'',
      checkFn:o=>o.includes('count')||o.includes('Count')||/\d{2}/.test(o),
      hint:'if(i%4==0)continue; if(i%6==0)continue; printf("%d\\n",i); count++;',
      solution:'int count=0;\nfor(int i=1;i<=30;i++){\n    if(i%4==0)continue;\n    if(i%6==0)continue;\n    printf("%d\\n",i);\n    count++;\n}\nprintf("Count: %d\\n",count);',
      onPass:()=>sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ=[
        {id:'ch12-cn-p1',type:'predict',question:'What prints?',
          code:`for(int i=1;i<=5;i++){\n    if(i==3)continue;\n    printf("%d\\n",i);\n}`,
          correct:['1\n2\n4\n5','1\r\n2\r\n4\r\n5'],caseSensitive:true,orderMatters:true,
          hint:'3 is skipped.',feedback:{correct:'Correct — 1,2,4,5. 3 is skipped by continue.',incorrect:'i=1,2→print. i=3→continue(skip printf). i=4,5→print.'}},
        {id:'ch12-cn-p2',type:'predict',question:'What prints?',
          code:`int s=0;\nfor(int i=0;i<6;i++){\n    if(i%2!=0)continue;\n    s+=i;\n}\nprintf("%d\\n",s);`,
          correct:['6'],caseSensitive:true,orderMatters:true,
          hint:'Odd numbers skipped. Sum even: 0+2+4=6.',feedback:{correct:'Correct — only even i contribute: 0+2+4=6.',incorrect:'Odd i skipped. Even: 0,2,4. Sum=6.'}},
        {id:'ch12-cn-p3',type:'predict',question:'What prints? (while loop)',
          code:`int i=0;\nwhile(i<5){\n    i++;\n    if(i==3)continue;\n    printf("%d\\n",i);\n}`,
          correct:['1\n2\n4\n5','1\r\n2\r\n4\r\n5'],caseSensitive:true,orderMatters:true,
          hint:'i++ before continue — safe.',feedback:{correct:'Correct — 1,2,4,5. i++ runs before continue so no infinite loop.',incorrect:'i++ is before continue so i always advances. Prints 1,2,4,5 (3 skipped).'}}
      ]
      const mcqQ=[
        {id:'ch12-cn-m1',type:'mcq',question:'What does continue do?',options:['Exits the loop','Skips to the next iteration','Restarts from iteration 1','Prints a newline'],correct:['Skips to the next iteration'],caseSensitive:false,orderMatters:false,hint:'Next iteration, not exit.',feedback:{correct:'Correct — continue skips the rest of the current iteration and moves to the next.',incorrect:'continue skips the remaining body of the current iteration and jumps to the next.'}},
        {id:'ch12-cn-m2',type:'mcq',question:'In a for loop, where does continue jump to?',options:['The condition check','The init clause','The update clause (then condition)','The statement after the loop'],correct:['The update clause (then condition)'],caseSensitive:false,orderMatters:false,hint:'For loop: update clause then condition.',feedback:{correct:'Correct — in a for loop, continue goes to the update (i++), then condition is checked.',incorrect:'In a for loop: continue → update clause (i++) → condition check → maybe body again.'}},
        {id:'ch12-cn-m3',type:'mcq',question:'Why must the while loop counter be incremented BEFORE continue?',options:['Performance reason','If increment is after continue, continue skips it — infinite loop','The compiler requires it','No particular reason'],correct:['If increment is after continue, continue skips it — infinite loop'],caseSensitive:false,orderMatters:false,hint:'continue skips everything after it.',feedback:{correct:'Correct — continue skips the rest of the body. If i++ is after continue, it never runs on skipped iterations.',incorrect:'continue skips everything after it. i++ after continue means i never increments on skipped iterations → infinite loop.'}},
        {id:'ch12-cn-m4',type:'mcq',question:'continue vs if-else: which is cleaner for filtering?',options:['if-else always','continue at the top of the loop avoids deep nesting','They are identical','continue uses less memory'],correct:['continue at the top of the loop avoids deep nesting'],caseSensitive:false,orderMatters:false,hint:'Think about indentation depth.',feedback:{correct:'Correct — continue at the top filters early, keeping the main action code at the base level with no extra nesting.',incorrect:'continue at the top creates a "guard": skip bad cases early. The main action code is then flat, not nested in an else.'}},
        {id:'ch12-cn-m5',type:'mcq',question:'Can you use continue and break in the same loop?',options:['No','Yes — they are independent and serve different purposes','Only in while loops','Only with for loops'],correct:['Yes — they are independent and serve different purposes'],caseSensitive:false,orderMatters:false,hint:'Independent mechanisms.',feedback:{correct:'Correct — continue skips iterations, break exits. Both can coexist in one loop.',incorrect:'Both can appear in the same loop: continue for skipping specific cases, break for early exit.'}}
      ]
      const practiceConfigs=[
        {id:'p1',task:'Print 1-30 but skip multiples of 5 using continue.',check:o=>o.includes('30')&&!o.includes('\n5\n')&&!o.includes('\n10\n'),hint:'if(i%5==0)continue;',solution:'for(int i=1;i<=30;i++){if(i%5==0)continue;printf("%d\\n",i);}'},
        {id:'p2',task:'Sum all integers from 1-100 that are NOT multiples of 3 or 7. Print the sum.',check:o=>o.includes('3264'),hint:'if(i%3==0||i%7==0)continue; sum+=i;',solution:'int sum=0;\nfor(int i=1;i<=100;i++){\n    if(i%3==0||i%7==0)continue;\n    sum+=i;\n}\nprintf("%d\\n",sum);'},
        {id:'p3',task:'Print every number from 1-20 except those between 8 and 12 (inclusive). Use continue.',check:o=>o.includes('7')&&o.includes('13')&&!o.includes('\n8\n'),hint:'if(i>=8&&i<=12)continue;',solution:'for(int i=1;i<=20;i++){if(i>=8&&i<=12)continue;printf("%d\\n",i);}'},
        {id:'p4',task:'Count how many numbers from 1-200 are divisible by 3 but not by 9. Print the count.',check:o=>o.includes('44'),hint:'if(i%3!=0)continue; if(i%9==0)continue; count++;',solution:'int count=0;\nfor(int i=1;i<=200;i++){\n    if(i%3!=0)continue;\n    if(i%9==0)continue;\n    count++;\n}\nprintf("%d\\n",count);'},
        {id:'p5',task:'Print all uppercase letters A-Z except vowels (A,E,I,O,U). Use a char for loop and continue.',check:o=>o.includes('B')&&o.includes('Z')&&!o.includes('A\n'),hint:'for(char c=\'A\';c<=\'Z\';c++){if(c==\'A\'||c==\'E\'||c==\'I\'||c==\'O\'||c==\'U\')continue;printf("%c\\n",c);}',solution:"for(char c='A';c<='Z';c++){if(c=='A'||c=='E'||c=='I'||c=='O'||c=='U')continue;printf(\"%c\\n\",c);}"}
      ]
      renderPracticeCh12('practice-ch12-continue',CH,topicId,practiceConfigs)
      QuizEngine.init({containerId:'quiz-ch12-continue-predict',questions:predictQ,onComplete:()=>{}})
      QuizEngine.init({containerId:'quiz-ch12-continue-mcq',    questions:mcqQ,    onComplete:()=>Progress.saveTopicComplete(CH,topicId)})
      CCompiler.initBlock($('compiler-ch12-continue-debug'),{
        mode:'debug',topicId,chapterId:CH,
        question:'This should print odd numbers 1-9 but runs forever. Find the infinite loop bug.',
        includes:['<stdio.h>'],
        starterCode:'int i=1;\nwhile(i<=10){\n    if(i%2==0)continue;\n    printf("%d\\n",i);\n    i++;\n}',
        checkFn:o=>{ const l=o.trim().split('\n').filter(s=>s.trim()); return l.length===5&&l[4].includes('9') },
        hint:'When i is even, what happens to i++?',
        hintTwo:'continue skips i++. Even i stays even forever. Move i++ before continue: i++; if(i-1 is even) continue; or restructure.',
        solution:'for(int i=1;i<=10;i++){\n    if(i%2==0)continue;\n    printf("%d\\n",i);\n}',
        onPass:()=>{}
      })
    }
    if(btn(topicId)) btn(topicId).addEventListener('click',()=>openAssessmentModal(topicId,'continue — Assessment',renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — BREAK AND CONTINUE TOGETHER
     ══════════════════════════════════════════════════════════ */
  function initTopic_together() {
    const topicId = 'ch12-together'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch12-together-explore'),{
      mode:'explore',topicId,chapterId:CH,question:null,
      includes:['<stdio.h>'],
      starterCode:
`for (int i = 1; i <= 20; i++) {
    if (i % 7 == 0) {
        printf("Hit multiple of 7 at i=%d — stopping\\n", i);
        break;
    }
    if (i % 2 == 0) {
        continue;
    }
    printf("%d\\n", i);
}`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch12-together',
      question:'The loop printed 1, 3, 5 then stopped at 7. Two different conditions are checked. What is the key difference in behavior between these two checks?',
      options:[
        'Both do the same thing — they both stop the loop',
        'continue skips one iteration and keeps going; break ends the loop entirely',
        'continue is for odd numbers; break is for even numbers specifically',
        'break checks the condition earlier than continue'
      ],
      correctIndex:1,
      feedback:{
        correct:'Correct — continue: skip this iteration, keep looping. break: exit the loop permanently. Two different responses to two different conditions in one loop.',
        incorrect:'continue skips one iteration (loop continues). break ends the loop entirely (no more iterations). They handle two different exceptional cases.'
      },
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch12-together-3-continue').addEventListener('click',()=>{
      Progress.saveStepComplete(CH,topicId,3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch12-together-modify'),{
      mode:'modify',topicId,chapterId:CH,
      question:'Add both: skip (continue) numbers divisible by 3, but stop completely (break) when hitting a multiple of 11. Test with 1-30.',
      includes:['<stdio.h>'],
      starterCode:
`for (int i = 1; i <= 30; i++) {
    printf("%d\\n", i);
}`,
      checkFn:o=>!o.includes('\n3\n')&&!o.includes('12')&&(o.includes('11')||o.includes('10')),
      hint:'if(i%11==0){printf("Stop at %d\\n",i);break;} if(i%3==0)continue; printf...',
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch12-together-fill'),{
      mode:'fill',topicId,chapterId:CH,
      question:'Fill in to process a data array: skip zeros (continue) and stop on -99 sentinel (break).',
      includes:['<stdio.h>'],
      starterCode:
`int data[] = {5, 3, 0, 8, 2, -99, 4, 1};
int sum = 0;
for (int i = 0; i < 8; i++) {
    if (data[i] == -99) [?];    /* sentinel: stop */
    if (data[i] == 0)   [?];    /* zero: skip */
    sum += data[i];
}
printf("Sum: %d\\n", sum);`,
      blanks:['break','continue'],
      hint:'Sentinel exit = break. Skip zero = continue.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch12-together-build'),{
      mode:'build',topicId,chapterId:CH,
      question:'Build a number processor for 1-50:\n① Skip (continue) any number that is a perfect square (1,4,9,16,25,36,49)\n② Stop (break) when the running sum of non-skipped numbers exceeds 300\n③ Print each accepted number and the final sum\n④ Print "Stopped at: N" after break or "Completed" if loop finished normally',
      includes:['<stdio.h>'],
      starterCode:'',
      checkFn:o=>(o.includes('Stopped')||o.includes('Completed'))&&o.includes('Sum'),
      hint:'int root=(int)sqrt... but without math.h, manually check: if(i==1||i==4||i==9||i==16||i==25||i==36||i==49)continue;',
      solution:
`int sum=0;\nfor(int i=1;i<=50;i++){\n    if(i==1||i==4||i==9||i==16||i==25||i==36||i==49)continue;\n    sum+=i;\n    printf("Add %d (sum=%d)\\n",i,sum);\n    if(sum>300){printf("Stopped at: %d\\n",i);break;}\n}\nif(sum<=300)printf("Completed\\n");\nprintf("Sum: %d\\n",sum);`,
      onPass:()=>sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment(){
      const predictQ=[
        {id:'ch12-tg-p1',type:'predict',question:'What prints?',
          code:`for(int i=1;i<=10;i++){\n    if(i==8)break;\n    if(i%3==0)continue;\n    printf("%d\\n",i);\n}`,
          correct:['1\n2\n4\n5\n7','1\r\n2\r\n4\r\n5\r\n7'],caseSensitive:true,orderMatters:true,
          hint:'Skip multiples of 3, stop at 8.',
          feedback:{correct:'Correct — 1,2(3 skip),4,5(6 skip),7(8 break).',incorrect:'3,6 skipped by continue. At 8, break exits. Prints 1,2,4,5,7.'}},
        {id:'ch12-tg-p2',type:'predict',question:'What is sum after this loop?',
          code:`int sum=0;\nfor(int i=1;i<=20;i++){\n    if(i==10)break;\n    if(i%2==0)continue;\n    sum+=i;\n}\nprintf("%d\\n",sum);`,
          correct:['25'],caseSensitive:true,orderMatters:true,
          hint:'Odd numbers 1-9: 1+3+5+7+9=25.',
          feedback:{correct:'Correct — odd numbers 1-9 only (break at 10): 1+3+5+7+9=25.',incorrect:'Even skipped. break at i=10. Odd 1-9: 1+3+5+7+9=25.'}},
        {id:'ch12-tg-p3',type:'predict',question:'What prints?',
          code:`for(int i=1;i<=6;i++){\n    if(i%2==0)continue;\n    if(i==5)break;\n    printf("%d\\n",i);\n}`,
          correct:['1\n3','1\r\n3'],caseSensitive:true,orderMatters:true,
          hint:'Even skipped. Break at 5.',
          feedback:{correct:'Correct — 1 prints, 2 skipped, 3 prints, 4 skipped, 5 triggers break.',incorrect:'2,4 skipped. At 5, break fires before printf. Prints 1,3.'}}
      ]
      const mcqQ=[
        {id:'ch12-tg-m1',type:'mcq',question:'Can you have multiple continue statements in one loop?',options:['No','Yes — each handles a different skip condition','Only two maximum','Only at the start of the body'],correct:['Yes — each handles a different skip condition'],caseSensitive:false,orderMatters:false,hint:'Independent skip conditions.',feedback:{correct:'Correct — multiple continues handle different skip conditions independently.',incorrect:'Multiple continues are fine: each one handles a different case for skipping.'}},
        {id:'ch12-tg-m2',type:'mcq',question:'break fires first. Does the continue check after it run?',options:['Yes — both always run','No — break exits immediately, nothing else in the loop runs','It depends on the condition','continue runs after break exits'],correct:['No — break exits immediately, nothing else in the loop runs'],caseSensitive:false,orderMatters:false,hint:'Break is immediate.',feedback:{correct:'Correct — break exits immediately. Nothing after it in the current iteration runs.',incorrect:'break exits immediately. Any code after break in the current iteration (including a continue check) never runs.'}},
        {id:'ch12-tg-m3',type:'mcq',question:'Which of these is the correct order to check in a loop processing data with a sentinel?',options:['continue first, then break','break (sentinel) first, then continue (skip)','They can be in any order','Always check break last'],correct:['break (sentinel) first, then continue (skip)'],caseSensitive:false,orderMatters:false,hint:'Check the most critical exit first.',feedback:{correct:'Correct — check the sentinel first. If you hit it, you want to stop, not accidentally skip it with continue.',incorrect:'Check break condition (sentinel) first. If you checked continue first and -99 somehow passed a skip condition, you might process it.'} },
        {id:'ch12-tg-m4',type:'mcq',question:'A loop processes items. Some items are invalid (skip). One item is an end marker (stop). Which keywords?',options:['Two breaks','Two continues','continue for invalid, break for end marker','break for invalid, continue for end marker'],correct:['continue for invalid, break for end marker'],caseSensitive:false,orderMatters:false,hint:'Skip = continue. Stop = break.',feedback:{correct:'Correct — continue for invalid (keep processing others), break for end marker (stop everything).',incorrect:'Invalid items: continue (skip and keep going). End marker: break (stop the loop).'}},
        {id:'ch12-tg-m5',type:'mcq',question:'sum=0; for i=1 to 10: if i>5 break; if i%2==0 continue; sum+=i — what is sum?',options:['25','9','1+3+5=9','6'],correct:['1+3+5=9'],caseSensitive:false,orderMatters:false,hint:'Process 1-5, skip even.',feedback:{correct:'Correct — i=1(odd,sum=1), i=2(skip), i=3(odd,sum=4), i=4(skip), i=5(odd,sum=9), i=6(break). sum=9.',incorrect:'i: 1→sum=1, 2→skip, 3→sum=4, 4→skip, 5→sum=9, 6→break. Sum=9.'}}
      ]
      const practiceConfigs=[
        {id:'p1',task:'Loop 1-50. Skip multiples of 4. Stop at the first multiple of 17. Print everything not skipped.',check:o=>o.includes('17')&&!o.includes('\n4\n'),hint:'if(i%17==0){printf("%d\\n",i);break;} if(i%4==0)continue;',solution:'for(int i=1;i<=50;i++){if(i%17==0){printf("%d\\n",i);break;}if(i%4==0)continue;printf("%d\\n",i);}'},
        {id:'p2',task:'Process ints 1-30. Skip numbers where i+i*i is even. Stop when that value exceeds 200. Print each accepted value of i+i*i.',check:o=>o.includes('57')||o.includes('183'),hint:'int v=i+i*i; if(v%2==0)continue; if(v>200)break; printf...',solution:'for(int i=1;i<=30;i++){int v=i+i*i;if(v%2==0)continue;if(v>200)break;printf("%d\\n",v);}'},
        {id:'p3',task:'Sum integers 1-100. Skip multiples of 3 AND multiples of 5. Stop (break) once sum exceeds 2000. Print final sum.',check:o=>{ const n=parseInt(o); return n>2000&&n<2200; },hint:'if(i%3==0||i%5==0)continue; sum+=i; if(sum>2000)break;',solution:'int sum=0;\nfor(int i=1;i<=100;i++){if(i%3==0||i%5==0)continue;sum+=i;if(sum>2000)break;}\nprintf("%d\\n",sum);'},
        {id:'p4',task:'Find all numbers from 1-30 that are odd AND not divisible by 3. Stop counting when you find 5 such numbers. Print those 5 numbers.',check:o=>{ const l=o.trim().split('\n').filter(s=>s.trim()); return l.length>=5; },hint:'if(i%2==0)continue; if(i%3==0)continue; count++; printf... if(count==5)break;',solution:'int count=0;\nfor(int i=1;i<=30;i++){if(i%2==0)continue;if(i%3==0)continue;printf("%d\\n",i);count++;if(count==5)break;}'},
        {id:'p5',task:'Iterate 1-50. Skip any i whose square is between 200 and 400. Break when you print 10 valid numbers. Print the 10 numbers.',check:o=>{ const l=o.trim().split('\n').filter(s=>s.trim()); return l.length>=10; },hint:'if(i*i>=200&&i*i<=400)continue; count++;printf... if(count==10)break;',solution:'int count=0;\nfor(int i=1;i<=50;i++){if(i*i>=200&&i*i<=400)continue;printf("%d\\n",i);count++;if(count==10)break;}'}
      ]
      renderPracticeCh12('practice-ch12-together',CH,topicId,practiceConfigs)
      QuizEngine.init({containerId:'quiz-ch12-together-predict',questions:predictQ,onComplete:()=>{}})
      QuizEngine.init({containerId:'quiz-ch12-together-mcq',    questions:mcqQ,    onComplete:()=>Progress.saveTopicComplete(CH,topicId)})
      CCompiler.initBlock($('compiler-ch12-together-debug'),{
        mode:'debug',topicId,chapterId:CH,
        question:'This should skip 0 and stop at -1 but neither works. Find two bugs.',
        includes:['<stdio.h>'],
        starterCode:'int arr[]={3,0,5,2,-1,4};\nint sum=0;\nfor(int i=0;i<6;i++){\n    sum+=arr[i];\n    if(arr[i]==0)continue;\n    if(arr[i]==-1)break;\n}\nprintf("%d\\n",sum);',
        checkFn:o=>o.includes('10'),
        hint:'The checks are AFTER sum+=arr[i]. What does that mean for each check?',
        hintTwo:'continue and break must come BEFORE sum+=. Move them: check -1 first (break), then 0 (continue), then sum+=.',
        solution:'int arr[]={3,0,5,2,-1,4};\nint sum=0;\nfor(int i=0;i<6;i++){\n    if(arr[i]==-1)break;\n    if(arr[i]==0)continue;\n    sum+=arr[i];\n}\nprintf("%d\\n",sum);',
        onPass:()=>{}
      })
    }
    if(btn(topicId)) btn(topicId).addEventListener('click',()=>openAssessmentModal(topicId,'break & continue Together — Assessment',renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — NESTED LOOP CONTROL
     ══════════════════════════════════════════════════════════ */
  function initTopic_nested() {
    const topicId = 'ch12-nested'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch12-nested-explore'),{
      mode:'explore',topicId,chapterId:CH,question:null,
      includes:['<stdio.h>'],
      starterCode:
`printf("break only exits inner loop:\\n");
for (int r = 1; r <= 3; r++) {
    for (int c = 1; c <= 5; c++) {
        if (c == 3) break;       /* exits inner only */
        printf("(%d,%d) ", r, c);
    }
    printf("\\n");               /* outer keeps going */
}`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch12-nested',
      question:'break at c==3 ended the inner loop but the outer loop printed three rows. How would you modify this to stop ALL loops when c==3 on row 2?',
      options:[
        'Use two break statements',
        'Use a flag variable: set done=1 before break, check &&!done in the outer condition',
        'Put break outside both loops',
        'Nested loops cannot be stopped from inside'
      ],
      correctIndex:1,
      feedback:{
        correct:'Correct — a flag variable lets the outer loop condition know the inner loop hit a stop condition: for(int r=1; r<=3 && !done; r++)',
        incorrect:'The flag pattern: int done=0; set done=1 before break; make outer condition: r<=3 && !done. This cleanly propagates the stop signal outward.'
      },
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch12-nested-3-continue').addEventListener('click',()=>{
      Progress.saveStepComplete(CH,topicId,3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch12-nested-modify'),{
      mode:'modify',topicId,chapterId:CH,
      question:'Add a flag variable so break in the inner loop also exits the outer loop when r==2 and c==2.',
      includes:['<stdio.h>'],
      starterCode:
`for (int r = 1; r <= 3; r++) {
    for (int c = 1; c <= 3; c++) {
        if (r==2 && c==2) break;
        printf("(%d,%d)\\n", r, c);
    }
}`,
      checkFn:o=>{ const l=o.trim().split('\n').filter(s=>s.trim()); return l.length===4&&!o.includes('(3'); },
      hint:'int done=0; outer: for(...&&!done). Inner: if(r==2&&c==2){done=1;break;}',
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch12-nested-fill'),{
      mode:'fill',topicId,chapterId:CH,
      question:'Fill in to search a 3x3 grid for target=7 and exit both loops when found.',
      includes:['<stdio.h>'],
      starterCode:
`int grid[3][3]={{1,4,7},{2,5,8},{3,6,9}};
int target=7, fr=-1, fc=-1, [?]=0;

for(int r=0; r<3 && ![?]; r++){
    for(int c=0; c<3; c++){
        if(grid[r][c]==target){
            fr=r; fc=c; [?]=1; [?];
        }
    }
}
printf("Found at [%d][%d]\\n",fr,fc);`,
      blanks:['found','found','found','break'],
      hint:'Flag variable name: found. Use it in outer condition and set to 1 before break.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch12-nested-build'),{
      mode:'build',topicId,chapterId:CH,
      question:'Write a nested loop that finds the first pair (i,j) where i*j is a perfect square between 50 and 100. i and j both range from 1 to 10.\n① Use a flag to exit both loops once found\n② Print "i=N j=M product=P"\n③ Hint: 7*7=49(too small), 8*8=64 ✓, 9*9=81 ✓',
      includes:['<stdio.h>'],
      starterCode:'',
      checkFn:o=>o.includes('64')||o.includes('81'),
      hint:'int done=0; for(i...&&!done) for(j...){int p=i*j; int sq=(int)sqrt(p)... but without sqrt: check if p==64||p==81... or just p%8==0 and i==8,j==8 etc.',
      solution:
`int done=0;\nfor(int i=1;i<=10&&!done;i++){\n    for(int j=1;j<=10;j++){\n        int p=i*j;\n        if(p>=50&&p<=100&&(p==64||p==81||p==100)){\n            printf("i=%d j=%d product=%d\\n",i,j,p);\n            done=1;break;\n        }\n    }\n}`,
      onPass:()=>sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment(){
      const predictQ=[
        {id:'ch12-ns-p1',type:'predict',question:'How many lines print?',
          code:`for(int i=0;i<3;i++){for(int j=0;j<3;j++){if(j==1)break;printf("X\\n");}}\n// count the lines`,
          correct:['3'],caseSensitive:true,orderMatters:false,
          hint:'Inner break at j=1. So each outer run prints 1 X.',
          feedback:{correct:'Correct — each outer iteration: j=0 prints, j=1 breaks. 3 outer × 1 = 3 lines.',incorrect:'Inner break at j=1: each outer iter prints 1 X (j=0 only). 3 outer runs = 3 X total.'}},
        {id:'ch12-ns-p2',type:'predict',question:'What prints?',
          code:`int done=0;\nfor(int i=0;i<3&&!done;i++){for(int j=0;j<3;j++){if(i==1&&j==1){done=1;break;}printf("(%d%d)\\n",i,j);}}\n`,
          correct:['(00)\n(01)\n(02)\n(10)','(00)\r\n(01)\r\n(02)\r\n(10)'],caseSensitive:true,orderMatters:true,
          hint:'Runs normally until i=1,j=1 where flag stops both loops.',
          feedback:{correct:'Correct — (00),(01),(02),(10) then done at i=1,j=1.',incorrect:'i=0: (00),(01),(02). i=1: (10), then j=1 sets done=1,break. Outer: 1<3 but !done is false.'}},
        {id:'ch12-ns-p3',type:'predict',question:'Does break in inner also exit outer here?',
          code:`for(int i=0;i<2;i++){for(int j=0;j<2;j++){break;}printf("r%d\\n",i);}`,
          correct:['r0\nr1','r0\r\nr1'],caseSensitive:true,orderMatters:true,
          hint:'break exits inner only.',
          feedback:{correct:'Correct — break exits inner only. Outer continues: r0, r1.',incorrect:'break exits only the inner loop. Outer loop continues printing r0, r1.'}}
      ]
      const mcqQ=[
        {id:'ch12-ns-m1',type:'mcq',question:'break inside a nested for exits which loop?',options:['Outermost','All loops','Only the innermost containing loop','The one with the smallest range'],correct:['Only the innermost containing loop'],caseSensitive:false,orderMatters:false,hint:'Nearest container.',feedback:{correct:'Correct — break only exits its immediate containing loop.',incorrect:'break exits only the loop whose braces directly contain it.'}},
        {id:'ch12-ns-m2',type:'mcq',question:'What is the cleanest way to break out of all nested levels?',options:['Use goto','Use a flag variable in the outer condition: &&!done','Call break twice','Use return (exits function)'],correct:['Use a flag variable in the outer condition: &&!done'],caseSensitive:false,orderMatters:false,hint:'Flag in outer condition.',feedback:{correct:'Correct — int done=0; set done=1 before break; outer loop: while(!done) or for(...&&!done).',incorrect:'Flag variable: int done=0; inner sets done=1 and breaks; outer tests &&!done. Clean and readable.'}},
        {id:'ch12-ns-m3',type:'mcq',question:'Does continue in the inner loop affect the outer loop?',options:['Yes — skips one outer iteration too','No — only affects the inner loop','Depends on the condition','Only if continue is the last statement'],correct:['No — only affects the inner loop'],caseSensitive:false,orderMatters:false,hint:'Same scope rule as break.',feedback:{correct:'Correct — continue only affects its immediate containing loop, same as break.',incorrect:'Like break, continue only affects the innermost loop containing it.'}},
        {id:'ch12-ns-m4',type:'mcq',question:'Why avoid using goto for multi-level breaks?',options:['goto is slower','goto creates unstructured flow that is hard to read and maintain','goto is not valid in C','goto only works once'],correct:['goto creates unstructured flow that is hard to read and maintain'],caseSensitive:false,orderMatters:false,hint:'Readability and maintenance.',feedback:{correct:'Correct — goto jumps to arbitrary labels, making flow hard to trace. Flag variables are structured and clear.',incorrect:'goto creates spaghetti code. Flag variables keep structure while achieving the same effect.'}},
        {id:'ch12-ns-m5',type:'mcq',question:'for(r=0;r<3&&!done;r++) — what does &&!done add to the outer for loop?',options:['Nothing — redundant','Allows the outer loop to exit when done==1, even if r<3','done must be declared inside the for','This is a syntax error'],correct:['Allows the outer loop to exit when done==1, even if r<3'],caseSensitive:false,orderMatters:false,hint:'Compound condition.',feedback:{correct:'Correct — the loop exits early when done becomes 1, implementing multi-level break.',incorrect:'&&!done: the outer loop exits not only when r>=3 but also when done becomes 1 (set by inner break).'}}
      ]
      const practiceConfigs=[
        {id:'p1',task:'Nested 4×4 loop. Break inner when row*col > 8. Print each accepted pair.',check:o=>o.includes('(1,1)')&&!o.includes('(1,9)'),hint:'if(r*c>8)break; printf("(%d,%d)\\n",r,c);',solution:'for(int r=1;r<=4;r++){for(int c=1;c<=4;c++){if(r*c>8)break;printf("(%d,%d)\\n",r,c);}}'},
        {id:'p2',task:'Search a 3×4 grid for the value 11. Use a flag to exit all loops when found. Print found position.',check:o=>o.includes('[1][2]')||o.includes('11'),hint:'int g[3][4]={{1,2,3,4},{5,6,11,8},{9,10,11,12}}; use done flag.',solution:'int g[3][4]={{1,2,3,4},{5,6,11,8},{9,10,11,12}};\nint done=0,fr=-1,fc=-1;\nfor(int r=0;r<3&&!done;r++){for(int c=0;c<4;c++){if(g[r][c]==11){fr=r;fc=c;done=1;break;}}}\nprintf("Found at [%d][%d]\\n",fr,fc);'},
        {id:'p3',task:'Nested loops i=1-5, j=1-5. Skip pairs where i==j (continue inner). Stop all when i+j==7 (flag+break). Print all valid pairs.',check:o=>o.includes('(1,2)')&&!o.includes('(1,1)'),hint:'if(i==j)continue; if(i+j==7){done=1;break;} printf...',solution:'int done=0;\nfor(int i=1;i<=5&&!done;i++){for(int j=1;j<=5;j++){if(i==j)continue;if(i+j==7){done=1;break;}printf("(%d,%d)\\n",i,j);}}'},
        {id:'p4',task:'Print a 5×5 multiplication table but: skip cells where product is odd (continue), stop the entire table when product reaches 24 (flag+break).',check:o=>{ const l=o.trim().split('\n').filter(s=>s.trim()); return l.length>0&&!o.includes('25'); },hint:'if(r*c%2!=0)continue; if(r*c==24){done=1;break;} printf...',solution:'int done=0;\nfor(int r=1;r<=5&&!done;r++){for(int c=1;c<=5;c++){int p=r*c;if(p%2!=0)continue;if(p==24){printf("%d\\n",p);done=1;break;}printf("%d\\n",p);}}'},
        {id:'p5',task:'3 outer × 5 inner. In inner, skip if j%2==0. Stop all if outer i and inner j are both 3. Count valid cells printed.',check:o=>o.includes('count')||/^\d+$/m.test(o),hint:'if(j%2==0)continue; if(i==3&&j==3){done=1;break;} count++; printf...',solution:'int done=0,count=0;\nfor(int i=1;i<=3&&!done;i++){for(int j=1;j<=5;j++){if(j%2==0)continue;if(i==3&&j==3){done=1;break;}count++;printf("(%d,%d)\\n",i,j);}}\nprintf("Count: %d\\n",count);'}
      ]
      renderPracticeCh12('practice-ch12-nested',CH,topicId,practiceConfigs)
      QuizEngine.init({containerId:'quiz-ch12-nested-predict',questions:predictQ,onComplete:()=>{}})
      QuizEngine.init({containerId:'quiz-ch12-nested-mcq',    questions:mcqQ,    onComplete:()=>Progress.saveTopicComplete(CH,topicId)})
      CCompiler.initBlock($('compiler-ch12-nested-debug'),{
        mode:'debug',topicId,chapterId:CH,
        question:'This 2D search should stop at first occurrence of 5 and exit both loops. It finds 5 but outer loop keeps running. Fix it.',
        includes:['<stdio.h>'],
        starterCode:'int g[2][3]={{1,5,3},{4,2,6}};\nfor(int r=0;r<2;r++){\n    for(int c=0;c<3;c++){\n        if(g[r][c]==5){\n            printf("Found at [%d][%d]\\n",r,c);\n            break;\n        }\n    }\n}',
        checkFn:o=>{ const l=o.trim().split('\n').filter(s=>s.trim()); return l.length===1&&o.includes('[0][1]'); },
        hint:'break only exits the inner loop. Outer loop still runs. How do you stop it?',
        hintTwo:'Add flag: int done=0; set done=1 before break; change outer to: for(int r=0;r<2&&!done;r++)',
        solution:'int g[2][3]={{1,5,3},{4,2,6}};\nint done=0;\nfor(int r=0;r<2&&!done;r++){\n    for(int c=0;c<3;c++){\n        if(g[r][c]==5){\n            printf("Found at [%d][%d]\\n",r,c);\n            done=1;break;\n        }\n    }\n}',
        onPass:()=>{}
      })
    }
    if(btn(topicId)) btn(topicId).addEventListener('click',()=>openAssessmentModal(topicId,'Nested Loop Control — Assessment',renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — REAL-WORLD PATTERNS
     ══════════════════════════════════════════════════════════ */
  function initTopic_patterns() {
    const topicId = 'ch12-patterns'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch12-patterns-explore'),{
      mode:'explore',topicId,chapterId:CH,question:null,
      includes:['<stdio.h>'],
      starterCode:
`int data[] = {4, 7, -2, 9, 0, 3, -5, 8, 1, 6};
int n = 10;

/* PATTERN 1: Search — find first negative */
int neg_pos = -1;
for(int i=0;i<n;i++){
    if(data[i]<0){neg_pos=i;break;}
}
printf("First negative at index: %d\\n", neg_pos);

/* PATTERN 2: Filter — sum only positive */
int pos_sum = 0;
for(int i=0;i<n;i++){
    if(data[i]<=0)continue;
    pos_sum+=data[i];
}
printf("Positive sum: %d\\n", pos_sum);

/* PATTERN 3: Validate — all positive? */
int all_pos=1;
for(int i=0;i<n;i++){
    if(data[i]<=0){all_pos=0;break;}
}
printf("All positive: %d\\n", all_pos);`,
      onPass:()=>sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId:'iq-ch12-patterns',
      question:'Three patterns — search, filter, validate — all use the same loop structure but with different goals. Which keyword is used for each?',
      options:[
        'Search: continue. Filter: break. Validate: continue.',
        'Search: break (stop when found). Filter: continue (skip non-matching). Validate: break (stop when invalid found).',
        'All three use break only.',
        'Search: break. Filter: break. Validate: continue.'
      ],
      correctIndex:1,
      feedback:{
        correct:'Correct — search and validate both use break to stop early. Filter uses continue to skip. The difference is what triggers the control statement.',
        incorrect:'Search: find it, break. Filter: bad item, continue (keep going). Validate: bad item found, break (report failure). Break and continue serve different roles in each.'
      },
      onAnswer:()=>sm.complete(2)
    })

    $('step-ch12-patterns-3-continue').addEventListener('click',()=>{
      Progress.saveStepComplete(CH,topicId,3); sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch12-patterns-modify'),{
      mode:'modify',topicId,chapterId:CH,
      question:'Add a FOURTH pattern: find the MAXIMUM value in the array. Do NOT use break or continue — just a running max.',
      includes:['<stdio.h>'],
      starterCode:
`int data[] = {4, 7, -2, 9, 0, 3, -5, 8, 1, 6};
int n = 10;
printf("Find max:\\n");
/* add your max-finding loop here */`,
      checkFn:o=>o.includes('9'),
      hint:'int max=data[0]; for(int i=1;i<n;i++){if(data[i]>max)max=data[i];} printf("Max: %d\\n",max);',
      onPass:()=>sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch12-patterns-fill'),{
      mode:'fill',topicId,chapterId:CH,
      question:'Fill in to complete a "count valid" pattern — count elements that are between 10 and 50 inclusive.',
      includes:['<stdio.h>'],
      starterCode:
`int vals[] = {5, 23, 47, 81, 12, 35, 3, 29, 60, 18};
int count = 0;
for(int i=0; i<10; i++){
    if(vals[i] [?] 10 [?] vals[i] [?] 50)
        [?];
}
printf("Count in range: %d\\n", count);`,
      blanks:['<','||','>','continue'],
      hint: 'Skip if out of range (< 10 OR > 50) with continue, then count++.',
      onPass:()=>sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch12-patterns-build'),{
      mode:'build',topicId,chapterId:CH,
      question:'Build a complete data pipeline for this sensor reading array:\nint temps[]={22,19,35,28,-99,15,31,26};\n① -99 is a sentinel — stop when you hit it (break)\n② Skip readings below 15 or above 30 as outliers (continue)\n③ Count and sum valid readings\n④ Print count, sum, and average with 1 decimal place',
      includes:['<stdio.h>'],
      starterCode:'',
      checkFn:o=>{
        return (o.includes('22')||o.includes('19')||o.includes('28'))&&
               (o.includes('count')||o.includes('Count')||o.includes('avg')||o.includes('Avg'))
      },
      hint:'for(i..){if(temps[i]==-99)break;if(temps[i]<15||temps[i]>30)continue;sum+=temps[i];count++;} avg=(float)sum/count;',
      solution:
`int temps[]={22,19,35,28,-99,15,31,26};\nint sum=0,count=0;\nfor(int i=0;i<8;i++){\n    if(temps[i]==-99)break;\n    if(temps[i]<15||temps[i]>30)continue;\n    sum+=temps[i];\n    count++;\n}\nprintf("Count:%d Sum:%d Avg:%.1f\\n",count,sum,(float)sum/count);`,
      onPass:()=>sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment(){
      const predictQ=[
        {id:'ch12-pt-p1',type:'predict',question:'Search pattern: what is pos after?',
          code:`int a[]={3,7,2,8,5},pos=-1;\nfor(int i=0;i<5;i++){if(a[i]==8){pos=i;break;}}\nprintf("%d\\n",pos);`,
          correct:['3'],caseSensitive:true,orderMatters:true,
          hint:'8 is at index 3.',
          feedback:{correct:'Correct — 8 is at index 3.',incorrect:'a[3]=8. pos=3, break. Output: 3.'}},
        {id:'ch12-pt-p2',type:'predict',question:'Filter pattern: what is sum?',
          code:`int a[]={-1,4,0,7,-3,5},sum=0;\nfor(int i=0;i<6;i++){if(a[i]<=0)continue;sum+=a[i];}\nprintf("%d\\n",sum);`,
          correct:['16'],caseSensitive:true,orderMatters:true,
          hint:'Positive only: 4+7+5=16.',
          feedback:{correct:'Correct — 4+7+5=16.',incorrect:'Skip <=0. Add 4,7,5. Sum=16.'}},
        {id:'ch12-pt-p3',type:'predict',question:'Validate pattern: what prints?',
          code:`int a[]={3,5,7,2,9},valid=1;\nfor(int i=0;i<5;i++){if(a[i]%2==0){valid=0;break;}}\nprintf("%s\\n",valid?"All odd":"Has even");`,
          correct:['Has even'],caseSensitive:true,orderMatters:true,
          hint:'2 is even.',
          feedback:{correct:'Correct — 2 is even, valid=0. "Has even".',incorrect:'a[3]=2 is even → valid=0, break. Prints "Has even".'}}
      ]
      const mcqQ=[
        {id:'ch12-pt-m1',type:'mcq',question:'In a search pattern, what does the flag variable found=-1 before the loop mean?',options:['The search is invalid','Not found yet — will be updated if found','-1 is the target','The loop runs -1 times'],correct:['Not found yet — will be updated if found'],caseSensitive:false,orderMatters:false,hint:'Sentinel default value.',feedback:{correct:'Correct — -1 (or 0) means "not yet found." Updated to the actual position when found.',incorrect:'found=-1 is the "not found" sentinel. It gets updated to the real index when the target is found.'}},
        {id:'ch12-pt-m2',type:'mcq',question:'Why is the filter pattern cleaner than wrapping action code in an if block?',options:['continue uses less memory','Guard clauses at the top keep the action code at the base level with no nesting','Wrapping is always better','They are identical in readability'],correct:['Guard clauses at the top keep the action code at the base level with no nesting'],caseSensitive:false,orderMatters:false,hint:'Think about indentation depth.',feedback:{correct:'Correct — if(bad)continue at the top avoids wrapping valid action code in an else block.',incorrect:'Continue at the top: bad cases exit early, valid code runs at the base level with no else nesting.'}},
        {id:'ch12-pt-m3',type:'mcq',question:'In a validate pattern, what does int valid=1 before the loop represent?',options:['Start assuming invalid','Start assuming valid — set to 0 if any failure found','1 is the count','Required by break'],correct:['Start assuming valid — set to 0 if any failure found'],caseSensitive:false,orderMatters:false,hint:'Guilty until proven innocent? Or innocent until proven guilty?',feedback:{correct:'Correct — optimistic assumption. If any element fails, valid=0 and break.',incorrect:'valid=1: assume all valid. First failure sets valid=0 and break.'}},
        {id:'ch12-pt-m4',type:'mcq',question:'Sentinel value pattern: why stop the loop at -99 instead of checking bounds?',options:['Sentinels are faster','The data length may be unknown; the sentinel marks the end without needing a count','Sentinels are required by C','All arrays must end in -99'],correct:['The data length may be unknown; the sentinel marks the end without needing a count'],caseSensitive:false,orderMatters:false,hint:'What if you do not know how many items there are?',feedback:{correct:'Correct — sentinels work when the count is not known in advance. The sentinel value signals termination.',incorrect:'Sentinel: stop at a special value, not a count. Useful when data length is unknown at compile time.'}},
        {id:'ch12-pt-m5',type:'mcq',question:'Which is NOT a standard loop control pattern?',options:['Search with break','Filter with continue','Validate with break','Increment with break'],correct:['Increment with break'],caseSensitive:false,orderMatters:false,hint:'Three established patterns.',feedback:{correct:'Correct — the three patterns are: search (break), filter (continue), validate (break). Increment is not a break/continue pattern.',incorrect:'Three patterns: search (break when found), filter (continue on skip), validate (break on failure). Incrementing is not one.'}}
      ]
      const practiceConfigs=[
        {id:'p1',task:'Search pattern: find the first prime number in {4,6,8,9,10,11,14,15,17}. Print its index.',check:o=>o.includes('5'),hint:'Check each for primality with a nested loop. Break on first prime found.',solution:'int a[]={4,6,8,9,10,11,14,15,17},pos=-1;\nfor(int i=0;i<9;i++){int isPrime=1;for(int d=2;d<a[i];d++){if(a[i]%d==0){isPrime=0;break;}}if(isPrime){pos=i;break;}}\nprintf("%d\\n",pos);'},
        {id:'p2',task:'Filter pattern: from {12,-3,45,7,-8,33,0,21}, sum only values > 10. Print sum.',check:o=>o.includes('111'),hint:'if(vals[i]<=10)continue; sum+=vals[i]; — 12+45+33+21=111',solution:'int a[]={12,-3,45,7,-8,33,0,21},sum=0;\nfor(int i=0;i<8;i++){if(a[i]<=10)continue;sum+=a[i];}\nprintf("%d\\n",sum);'},
        {id:'p3',task:'Validate pattern: check if all values in {5,3,8,1,4,9,2} are in range 1-9. Print "Valid" or "Invalid".',check:o=>o.includes('Valid'),hint:'int valid=1; if(a[i]<1||a[i]>9){valid=0;break;} after loop: if(valid)...',solution:'int a[]={5,3,8,1,4,9,2},valid=1;\nfor(int i=0;i<7;i++){if(a[i]<1||a[i]>9){valid=0;break;}}\nprintf("%s\\n",valid?"Valid":"Invalid");'},
        {id:'p4',task:'Sentinel pattern: {7,3,12,5,-1,9,4}. Sum all values before -1 sentinel. Print sum.',check:o=>o.includes('27'),hint:'if(a[i]==-1)break; sum+=a[i]; — 7+3+12+5=27',solution:'int a[]={7,3,12,5,-1,9,4},sum=0;\nfor(int i=0;i<7;i++){if(a[i]==-1)break;sum+=a[i];}\nprintf("%d\\n",sum);'},
        {id:'p5',task:'Count & find: {15,8,32,11,45,6,28,19}. Skip values not divisible by 3. Count and sum the ones that are divisible by 3. Print count and sum.',check:o=>o.includes('3'),hint:'if(a[i]%3!=0)continue; count++; sum+=a[i]; — only 15,45,6 → count=3, sum=66',solution:'int a[]={15,8,32,11,45,6,28,19},count=0,sum=0;\nfor(int i=0;i<8;i++){if(a[i]%3!=0)continue;count++;sum+=a[i];}\nprintf("Count:%d Sum:%d\\n",count,sum);'}
      ]
      renderPracticeCh12('practice-ch12-patterns',CH,topicId,practiceConfigs)
      QuizEngine.init({containerId:'quiz-ch12-patterns-predict',questions:predictQ,onComplete:()=>{}})
      QuizEngine.init({containerId:'quiz-ch12-patterns-mcq',    questions:mcqQ,    onComplete:()=>Progress.saveTopicComplete(CH,topicId)})
      CCompiler.initBlock($('compiler-ch12-patterns-debug'),{
        mode:'debug',topicId,chapterId:CH,
        question:'This validate pattern says everything is valid even when -3 is in the array. Find the bug.',
        includes:['<stdio.h>'],
        starterCode:'int a[]={5,8,-3,2,7};\nint valid=0;\nfor(int i=0;i<5;i++){\n    if(a[i]>=0){\n        valid=1;break;\n    }\n}\nprintf("%s\\n",valid?"All positive":"Has negatives");',
        checkFn:o=>o.includes('Has negatives'),
        hint:'What does valid=0 mean in this code? And valid=1?',
        hintTwo:'The logic is inverted: it finds a POSITIVE and sets valid=1 (breaks out). Should start valid=1 and set valid=0 on finding a negative. Fix: valid=1 before loop; if(a[i]<0){valid=0;break;}',
        solution:'int a[]={5,8,-3,2,7};\nint valid=1;\nfor(int i=0;i<5;i++){if(a[i]<0){valid=0;break;}}\nprintf("%s\\n",valid?"All positive":"Has negatives");',
        onPass:()=>{ Progress.saveTopicComplete(CH,topicId) }
      })
    }
    if(btn(topicId)) btn(topicId).addEventListener('click',()=>openAssessmentModal(topicId,'Real-World Patterns — Assessment',renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch12-mastery'),{
      mode:'build',topicId:'ch12-mastery',chapterId:CH,
      question:
`Build a complete data analysis program.

Data: int readings[] = {18, 45, -99, 23, 7, 36, 0, 12, 41, -99, 55};

① Sentinel: -99 means "end of valid data" — stop when hit
② Filter: skip 0 and negative readings (other than -99)
③ Skip outliers: readings > 40 (continue)
④ Count valid readings and compute their sum
⑤ Validate: were ALL accepted readings between 10 and 40?
⑥ Print: count, sum, average (1 decimal), and "All in range" or "Has outliers" based on validation`,
      includes:['<stdio.h>'],
      starterCode:'',
      checkFn:o=>o.includes('count')||o.includes('Count')||o.includes('avg')||o.includes('sum'),
      hint:'Loop with sentinel break first, then skip <=0, then skip >40, then count++ sum+=. Separately validate all accepted in 10-40 range.',
      solution:
`int readings[]={18,45,-99,23,7,36,0,12,41,-99,55};\nint sum=0,count=0,valid=1;\nfor(int i=0;i<11;i++){\n    if(readings[i]==-99)break;\n    if(readings[i]<=0)continue;\n    if(readings[i]>40)continue;\n    if(readings[i]<10)valid=0;\n    sum+=readings[i];\n    count++;\n}\nprintf("Count: %d\\nSum: %d\\nAvg: %.1f\\n%s\\n",\n    count,sum,(float)sum/count,\n    valid?"All in range":"Has outliers");`,
      onPass:()=>{
        Progress.saveChapterComplete(CH)
        $('ch12-chapter-complete').style.display='block'
        $('ch12-chapter-complete').scrollIntoView({behavior:'smooth'})
      }
    })
    $('ch12-next-btn').addEventListener('click',()=>{
      if (typeof loadChapter !== 'undefined') loadChapter('ch13')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh12(containerId,chapterId,topicId,configs){
    const container=document.getElementById(containerId)
    if(!container) return
    let idx=0
    function renderTask(i){
      if(i>=configs.length){
        container.innerHTML='<p class="practice-complete">All tasks complete! ✓</p>'
        Progress.saveTopicComplete(chapterId,topicId+'-practice')
        return
      }
      const cfg=configs[i]
      container.innerHTML=''
      const header=document.createElement('div')
      header.className='practice-task__header'
      header.innerHTML=`<span class="practice-task__num">Task ${i+1} of ${configs.length}</span><span class="practice-task__dots">${configs.map((_,j)=>`<span class="dot ${j<i?'dot--done':j===i?'dot--active':''}"></span>`).join('')}</span>`
      container.appendChild(header)
      const desc=document.createElement('p')
      desc.className='practice-task__desc'
      desc.textContent=cfg.task
      container.appendChild(desc)
      const div=document.createElement('div')
      div.id=`pc12-${topicId}-${cfg.id}`
      container.appendChild(div)
      CCompiler.initBlock(div,{
        mode:'build',topicId:topicId+'-p-'+cfg.id,chapterId,
        question:null,includes:['<stdio.h>'],starterCode:'',
        checkFn:cfg.check,hint:cfg.hint,solution:cfg.solution,
        onPass:()=>{
          Progress.saveStepComplete(chapterId,topicId,'p'+cfg.id)
          idx++
          setTimeout(()=>renderTask(idx),800)
        }
      })
    }
    renderTask(idx)
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  function init(){
    initTopic_break()
    initTopic_continue()
    initTopic_together()
    initTopic_nested()
    initTopic_patterns()
    initMastery()
  }

  if(document.readyState==='loading'){
    init()
  } else {
    init()
  }

})()
