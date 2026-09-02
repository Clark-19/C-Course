/* =========================================================
   C LEARNING PLATFORM — chapters/ch9-switch/ch9.js
   Chapter 9: Switch Statement
   5 topics · 7-step blocks · Assessment deferred to modal popup
   ========================================================= */

(function () {
  'use strict'

  const CH = 'ch9'
  function $(id)  { return document.getElementById(id) }
  function btn(t) { return document.querySelector(`.btn-assessment[data-topic="${t}"]`) }

  /* ══════════════════════════════════════════════════════════
     TOPIC 1 — SWITCH SYNTAX BASICS
     ══════════════════════════════════════════════════════════ */
  function initTopic_intro() {
    const topicId = 'ch9-intro'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch9-intro-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int day = 3;

switch (day) {
    case 1:
        printf("Monday\\n");
        break;
    case 2:
        printf("Tuesday\\n");
        break;
    case 3:
        printf("Wednesday\\n");
        break;
    case 4:
        printf("Thursday\\n");
        break;
    case 5:
        printf("Friday\\n");
        break;
    default:
        printf("Weekend\\n");
        break;
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch9-intro',
      question: 'switch jumped straight to case 3 without checking case 1 or case 2. How is this different from an else if chain?',
      options: [
        'switch checks every case from top to bottom just like else if',
        'switch performs a direct jump to the matching label — no sequential comparison',
        'switch is slower because it checks all cases',
        'switch and else if work identically internally'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — switch jumps directly to the matching case like a lookup table. An else if chain tests conditions one by one from top to bottom.',
        incorrect: 'switch is a direct jump to the matching case label, not a sequence of comparisons. An else if chain evaluates conditions sequentially until one matches.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch9-intro-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch9-intro-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Change day to 7 and predict what prints before running. Then change it to 8 — what happens with no matching case and a default present?',
      includes: ['<stdio.h>'],
      starterCode:
`int day = 3;

switch (day) {
    case 1: printf("Monday\\n");    break;
    case 2: printf("Tuesday\\n");   break;
    case 3: printf("Wednesday\\n"); break;
    case 4: printf("Thursday\\n");  break;
    case 5: printf("Friday\\n");    break;
    case 6: printf("Saturday\\n");  break;
    case 7: printf("Sunday\\n");    break;
    default: printf("Invalid\\n");  break;
}`,
      checkFn: output => output.includes('Sunday') || output.includes('Invalid'),
      hint: 'Change day to 7 to get Sunday. Change to 8 to hit the default.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch9-intro-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the missing switch keywords.',
      includes: ['<stdio.h>'],
      starterCode:
`int rating = 5;

[?] (rating) {
    [?] 1:
        printf("Poor\\n");
        break;
    [?] 3:
        printf("Average\\n");
        break;
    [?] 5:
        printf("Excellent\\n");
        break;
    [?]:
        printf("Unknown\\n");
        break;
}`,
      blanks: ['switch', 'case', 'case', 'case', 'default'],
      hint: 'First blank: switch keyword. Next three: case keyword. Last: default keyword.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch9-intro-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a simple calculator using switch.\n① int a = 10, b = 3, int op = 2\n② op 1 = add, 2 = subtract, 3 = multiply, 4 = divide\n③ Print the result clearly labeled\n④ default prints "Unknown operation"',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('7') || output.includes('subtract') || output.includes('result'),
      hint: 'switch (op) { case 1: printf("Result: %d\\n", a+b); break; case 2: printf("Result: %d\\n", a-b); break; ... }',
      solution:
`int a=10, b=3, op=2;
switch (op) {
    case 1: printf("Add:      %d\\n", a+b); break;
    case 2: printf("Subtract: %d\\n", a-b); break;
    case 3: printf("Multiply: %d\\n", a*b); break;
    case 4: printf("Divide:   %d\\n", a/b); break;
    default: printf("Unknown operation\\n");  break;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id: 'ch9-in-p1', type: 'predict', question: 'What prints? int x = 2;',
          code: `int x=2;\nswitch(x){\n  case 1: printf("A\\n"); break;\n  case 2: printf("B\\n"); break;\n  case 3: printf("C\\n"); break;\n}`,
          correct: ['B'], caseSensitive: true, orderMatters: true,
          hint: 'x=2 matches case 2.',
          feedback: { correct: 'Correct — case 2 matches, B prints, break exits.', incorrect: 'x=2 → case 2 → B → break exits switch.' }
        },
        {
          id: 'ch9-in-p2', type: 'predict', question: 'What prints? int x = 5;',
          code: `int x=5;\nswitch(x){\n  case 1: printf("A\\n"); break;\n  case 2: printf("B\\n"); break;\n  default: printf("D\\n"); break;\n}`,
          correct: ['D'], caseSensitive: true, orderMatters: true,
          hint: 'No case matches 5.',
          feedback: { correct: 'Correct — no case for 5, default runs: D.', incorrect: '5 matches no case → default → D.' }
        },
        {
          id: 'ch9-in-p3', type: 'predict', question: 'What prints? int x = 3; (no default)',
          code: `int x=3;\nswitch(x){\n  case 1: printf("A\\n"); break;\n  case 2: printf("B\\n"); break;\n}\nprintf("Done\\n");`,
          correct: ['Done'], caseSensitive: true, orderMatters: true,
          hint: 'No match, no default — switch block is skipped entirely.',
          feedback: { correct: 'Correct — no case 3, no default → entire switch skipped → "Done" prints.', incorrect: 'x=3 matches nothing. No default. Switch is skipped. Only "Done" prints.' }
        }
      ]
      const mcqQ = [
        { id:'ch9-in-m1', type:'mcq', question:'What types can be used as the switch expression?', options:['float only','int, char, enum — integer types','Any type','Only int'], correct:['int, char, enum — integer types'], caseSensitive:false, orderMatters:false, hint:'switch works with integers.', feedback:{correct:'Correct — switch accepts integer types: int, char, enum.',incorrect:'switch requires an integer type. float and strings are not allowed.'} },
        { id:'ch9-in-m2', type:'mcq', question:'What must case values be?', options:['Variables','Compile-time integer constants','Any expression','Strings'], correct:['Compile-time integer constants'], caseSensitive:false, orderMatters:false, hint:'Think: they must be known at compile time.', feedback:{correct:'Correct — case values must be integer constants known at compile time.',incorrect:'case values must be constant integer expressions: 1, \'A\', -5, etc. Not variables or calculations.'} },
        { id:'ch9-in-m3', type:'mcq', question:'What happens if switch has no matching case and no default?', options:['Compile error','Runtime crash','The entire switch block is silently skipped','The first case runs'], correct:['The entire switch block is silently skipped'], caseSensitive:false, orderMatters:false, hint:'No match, no default = skip.', feedback:{correct:'Correct — no match and no default means the entire switch is skipped without error.',incorrect:'Without a matching case or default, the switch block is quietly skipped. Execution continues after.'} },
        { id:'ch9-in-m4', type:'mcq', question:'Can you use switch (letter) where letter is a char?', options:['No — only int works','Yes — char is an integer type in C','Only ASCII 0-9','Only lowercase letters'], correct:['Yes — char is an integer type in C'], caseSensitive:false, orderMatters:false, hint:'char is stored as an integer.', feedback:{correct:'Correct — char is an integer type. switch (letter) with case \'A\': etc is common and valid.',incorrect:'char is an integer type. switch (c) { case \'A\': ... } is perfectly valid C.'} },
        { id:'ch9-in-m5', type:'mcq', question:'switch vs else if — what is the main structural difference?', options:['switch is faster always','switch tests one variable against exact values; else if tests any conditions','else if handles more cases','No difference'], correct:['switch tests one variable against exact values; else if tests any conditions'], caseSensitive:false, orderMatters:false, hint:'Think about what each can express.', feedback:{correct:'Correct — switch: one variable, exact constant values. else if: any boolean expression.',incorrect:'switch: one variable against constant values. else if: any conditions you can express as boolean.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int season=2. Switch on season: 1=Spring, 2=Summer, 3=Autumn, 4=Winter. Print the matching name.', check: o=>o.includes('Summer'), hint:'switch(season){ case 1: printf("Spring\\n"); break; case 2: ...}', solution:'int season=2;\nswitch(season){case 1:printf("Spring\\n");break;case 2:printf("Summer\\n");break;case 3:printf("Autumn\\n");break;case 4:printf("Winter\\n");break;}' },
        { id:'p2', task:'int score=3 (out of 5). Switch: 5=Excellent, 4=Good, 3=Average, 1 or 2=Poor. Default=Invalid.', check: o=>o.includes('Average'), hint:'switch(score){ case 5:... case 3: printf("Average\\n"); break; ...}', solution:'int score=3;\nswitch(score){case 5:printf("Excellent\\n");break;case 4:printf("Good\\n");break;case 3:printf("Average\\n");break;case 2:case 1:printf("Poor\\n");break;default:printf("Invalid\\n");break;}' },
        { id:'p3', task:'int cmd=2. Switch: 1=Start, 2=Stop, 3=Pause. Always print "Command executed" after the switch.', check: o=>o.includes('Stop')&&o.includes('Command executed'), hint:'switch(cmd){...} printf("Command executed\\n");', solution:'int cmd=2;\nswitch(cmd){case 1:printf("Start\\n");break;case 2:printf("Stop\\n");break;case 3:printf("Pause\\n");break;}\nprintf("Command executed\\n");' },
        { id:'p4', task:'char grade=\'B\'. Switch on grade: A=Excellent, B=Good, C=Pass, F=Fail. Default=Unknown.', check: o=>o.includes('Good'), hint:"switch(grade){ case 'A': printf(\"Excellent\\n\"); break; case 'B': ...", solution:"char grade='B';\nswitch(grade){case 'A':printf(\"Excellent\\n\");break;case 'B':printf(\"Good\\n\");break;case 'C':printf(\"Pass\\n\");break;case 'F':printf(\"Fail\\n\");break;default:printf(\"Unknown\\n\");break;}" },
        { id:'p5', task:'int traffic=1. Switch: 1=Red(Stop), 2=Yellow(Caution), 3=Green(Go). Print the color and action.', check: o=>o.toLowerCase().includes('red')||o.toLowerCase().includes('stop'), hint:'case 1: printf("Red: Stop\\n"); break;', solution:'int traffic=1;\nswitch(traffic){case 1:printf("Red: Stop\\n");break;case 2:printf("Yellow: Caution\\n");break;case 3:printf("Green: Go\\n");break;default:printf("Invalid\\n");break;}' }
      ]
      renderPracticeCh9('practice-ch9-intro', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch9-intro-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch9-intro-mcq',     questions:mcqQ,     onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch9-intro-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'switch (x) prints nothing for x=2 even though case 2 exists. Find the structural bug.',
        includes:['<stdio.h>'],
        starterCode:'int x=2;\nswitch (x) {\n    case 1: printf("One\\n"); break;\n    case 2  printf("Two\\n"); break;\n    case 3: printf("Three\\n"); break;\n}',
        checkFn: o=>o.includes('Two'),
        hint:'Look at case 2 very carefully — compare it to case 1 and case 3.',
        hintTwo:'case 2 is missing the colon. It should be: case 2: printf("Two\\n"); break;',
        solution:'int x=2;\nswitch(x){\n    case 1: printf("One\\n");   break;\n    case 2: printf("Two\\n");   break;\n    case 3: printf("Three\\n"); break;\n}',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Switch Syntax — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 2 — CASE AND BREAK
     ══════════════════════════════════════════════════════════ */
  function initTopic_break() {
    const topicId = 'ch9-break'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch9-break-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int x = 2;
printf("--- Without break ---\\n");
switch (x) {
    case 1: printf("case 1\\n");
    case 2: printf("case 2\\n");
    case 3: printf("case 3\\n");
    case 4: printf("case 4\\n");
}

printf("\\n--- With break ---\\n");
switch (x) {
    case 1: printf("case 1\\n"); break;
    case 2: printf("case 2\\n"); break;
    case 3: printf("case 3\\n"); break;
    case 4: printf("case 4\\n"); break;
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch9-break',
      question: 'Without break, matching case 2 caused cases 3 and 4 to also print. What exactly does break do inside a switch?',
      options: [
        'break skips to the next case label',
        'break exits the entire switch block immediately',
        'break restarts the switch from the top',
        'break only works in loops, not switch'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — break immediately exits the enclosing switch block. Without it, execution continues through into every subsequent case.',
        incorrect: 'break exits the switch block immediately. Without it, C keeps running code through every subsequent case until it hits a break or the closing brace.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch9-break-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch9-break-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'This switch is missing break statements — it prints too many lines. Add break after each case so only the matching line prints.',
      includes: ['<stdio.h>'],
      starterCode:
`int choice = 2;
switch (choice) {
    case 1: printf("Option A\\n");
    case 2: printf("Option B\\n");
    case 3: printf("Option C\\n");
    default: printf("Unknown\\n");
}`,
      checkFn: output => {
        const lines = output.trim().split('\n').filter(l => l.trim())
        return lines.length === 1 && output.includes('Option B')
      },
      hint: 'Add break; after each printf. Only "Option B" should print.',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch9-break-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the break statements so each case exits cleanly.',
      includes: ['<stdio.h>'],
      starterCode:
`int level = 2;
switch (level) {
    case 1:
        printf("Beginner\\n");
        [?];
    case 2:
        printf("Intermediate\\n");
        [?];
    case 3:
        printf("Advanced\\n");
        [?];
    default:
        printf("Unknown\\n");
        [?];
}`,
      blanks: ['break', 'break', 'break', 'break'],
      hint: 'All four blanks are: break',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch9-break-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a switch that maps int error_code to a message.\n① 0 = "OK"\n② 1 = "Not found"\n③ 2 = "Unauthorized"\n④ 3 = "Server error"\n⑤ default = "Unknown error"\nAll cases must have break. Test with error_code = 2.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('Unauthorized'),
      hint: 'int error_code=2; switch(error_code){ case 0: printf("OK\\n"); break; case 2: printf("Unauthorized\\n"); break; ... }',
      solution:
`int error_code = 2;
switch (error_code) {
    case 0: printf("OK\\n");            break;
    case 1: printf("Not found\\n");     break;
    case 2: printf("Unauthorized\\n");  break;
    case 3: printf("Server error\\n");  break;
    default: printf("Unknown error\\n"); break;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch9-br-p1', type:'predict', question:'What prints? int x=1; (no break)',
          code:`int x=1;\nswitch(x){\n  case 1: printf("A\\n");\n  case 2: printf("B\\n");\n  case 3: printf("C\\n");\n}`,
          correct:['A\nB\nC','A\r\nB\r\nC'], caseSensitive:true, orderMatters:true,
          hint:'Case 1 matches, then falls through 2 and 3.',
          feedback:{correct:'Correct — no break → fallthrough: A, B, C all print.',incorrect:'No break: case 1 fires, then falls through into 2 and 3. A, B, C all print.'}
        },
        {
          id:'ch9-br-p2', type:'predict', question:'What prints? int x=2; (has break)',
          code:`int x=2;\nswitch(x){\n  case 1: printf("A\\n"); break;\n  case 2: printf("B\\n"); break;\n  case 3: printf("C\\n"); break;\n}`,
          correct:['B'], caseSensitive:true, orderMatters:true,
          hint:'Case 2 matches, break exits.',
          feedback:{correct:'Correct — case 2 matches, B prints, break exits. C is skipped.',incorrect:'case 2 matches → B → break exits immediately → C never runs.'}
        },
        {
          id:'ch9-br-p3', type:'predict', question:'What prints? int x=1; (break only on case 2)',
          code:`int x=1;\nswitch(x){\n  case 1: printf("A\\n");\n  case 2: printf("B\\n"); break;\n  case 3: printf("C\\n"); break;\n}`,
          correct:['A\nB','A\r\nB'], caseSensitive:true, orderMatters:true,
          hint:'Case 1 has no break — falls to case 2 which has break.',
          feedback:{correct:'Correct — case 1 fires (A), no break so falls into case 2 (B), break exits. C never runs.',incorrect:'case 1: A, no break → falls to case 2: B, break exits. C is never reached.'}
        }
      ]
      const mcqQ = [
        { id:'ch9-br-m1', type:'mcq', question:'What is "fallthrough" in a switch statement?', options:['A compile error','When execution continues into the next case after a matched one, because break is missing','A feature for default only','When the switch repeats'], correct:['When execution continues into the next case after a matched one, because break is missing'], caseSensitive:false, orderMatters:false, hint:'What happens without break?', feedback:{correct:'Correct — fallthrough is execution continuing through subsequent cases after a match.',incorrect:'Fallthrough: no break means code keeps running into the next case regardless of its label.'} },
        { id:'ch9-br-m2', type:'mcq', question:'Does the compiler warn you about missing break?', options:['Always','Never','Sometimes, with warnings enabled (e.g. -Wimplicit-fallthrough in GCC)','Only for default'], correct:['Sometimes, with warnings enabled (e.g. -Wimplicit-fallthrough in GCC)'], caseSensitive:false, orderMatters:false, hint:'Missing break is valid C — it compiles without error by default.', feedback:{correct:'Correct — missing break is legal C, so no error by default. Some compilers warn with specific flags.',incorrect:'Missing break is valid C syntax. The compiler only warns with specific flags. No error by default.'} },
        { id:'ch9-br-m3', type:'mcq', question:'Where does break send execution in a switch?', options:['To the default case','To the beginning of the switch','To the statement after the closing } of the switch','To the next case label'], correct:['To the statement after the closing } of the switch'], caseSensitive:false, orderMatters:false, hint:'break exits the switch entirely.', feedback:{correct:'Correct — break jumps to the first statement after the entire switch block.',incorrect:'break exits the switch block completely. Execution resumes with whatever follows the closing }.'} },
        { id:'ch9-br-m4', type:'mcq', question:'Does the last case in a switch need a break?', options:['Yes — always required','No — execution falls off the end of the switch anyway','Only if there is a default','Only if there are more than 3 cases'], correct:['No — execution falls off the end of the switch anyway'], caseSensitive:false, orderMatters:false, hint:'What happens at the closing } of a switch?', feedback:{correct:'Correct — the closing } naturally ends the switch. The last case/default does not need break.',incorrect:'At the closing } of the switch, execution moves to the next statement naturally. The last break is optional.'} },
        { id:'ch9-br-m5', type:'mcq', question:'int x=2; switch(x){ case 1: case 2: printf("A"); break; } — what prints?', options:['Nothing','A twice','A once','Compile error'], correct:['A once'], caseSensitive:true, orderMatters:false, hint:'Both case 1 and case 2 fall through to the same printf.', feedback:{correct:'Correct — case 2 matches and falls through to the printf (which it shares with case 1). A prints once, break exits.',incorrect:'case 2 matches and falls to the shared printf. A prints once. break exits.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int x=3. Write a switch with cases 1-4 and break in each. Only case 3 should print something.', check: o=>{ const l=o.trim().split('\n').filter(s=>s.trim()); return l.length===1; }, hint:'Only case 3 has printf. All cases have break.', solution:'int x=3;\nswitch(x){case 1:printf("1\\n");break;case 2:printf("2\\n");break;case 3:printf("Three\\n");break;case 4:printf("4\\n");break;}' },
        { id:'p2', task:'int x=1. Without break, show fallthrough: case 1, 2, 3 all share one printf ("All"). Only add printf once (under case 1 — let 2 and 3 fall through).', check: o=>o.includes('All'), hint:'case 1: printf("All\\n"); break; then case 2: case 3: break; — actually: put printf under the LAST case.', solution:'int x=1;\nswitch(x){case 1:case 2:case 3:printf("All\\n");break;}' },
        { id:'p3', task:'int code=500. Write a switch with case 200, 404, 500 and break in each. Print appropriate message for each.', check: o=>o.toLowerCase().includes('server')||o.toLowerCase().includes('error'), hint:"case 500: printf(\"Server Error\\n\"); break;", solution:'int code=500;\nswitch(code){case 200:printf("OK\\n");break;case 404:printf("Not Found\\n");break;case 500:printf("Server Error\\n");break;}' },
        { id:'p4', task:'int x=2. Write switch where case 2 falls through into case 3 but case 3 has break. Print should show BOTH case 2 and case 3 messages.', check: o=>o.includes('Two')&&o.includes('Three'), hint:'case 2: printf("Two\\n"); /* no break */ case 3: printf("Three\\n"); break;', solution:'int x=2;\nswitch(x){case 1:printf("One\\n");break;case 2:printf("Two\\n");case 3:printf("Three\\n");break;case 4:printf("Four\\n");break;}' },
        { id:'p5', task:'int x=4. Switch on x, all 5 cases (1-5) with break. Print "Max" for case 5, "High" for case 4, "Mid" for 3, "Low" for 2, "Min" for 1.', check: o=>o.includes('High'), hint:'case 4: printf("High\\n"); break;', solution:'int x=4;\nswitch(x){case 5:printf("Max\\n");break;case 4:printf("High\\n");break;case 3:printf("Mid\\n");break;case 2:printf("Low\\n");break;case 1:printf("Min\\n");break;}' }
      ]
      renderPracticeCh9('practice-ch9-break', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch9-break-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch9-break-mcq',     questions:mcqQ,     onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch9-break-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'For x=2 this should print only "Two" but prints too much. Fix the missing breaks.',
        includes:['<stdio.h>'],
        starterCode:'int x=2;\nswitch(x){\n    case 1: printf("One\\n");\n    case 2: printf("Two\\n");\n    case 3: printf("Three\\n");\n    default: printf("Other\\n");\n}',
        checkFn: o=>o.trim()==='Two',
        hint:'Which cases are missing break?',
        hintTwo:'All cases need break. Add break; after each printf("...\\n");',
        solution:'int x=2;\nswitch(x){\n    case 1: printf("One\\n");   break;\n    case 2: printf("Two\\n");   break;\n    case 3: printf("Three\\n"); break;\n    default: printf("Other\\n"); break;\n}',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'case and break — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 3 — INTENTIONAL FALLTHROUGH
     ══════════════════════════════════════════════════════════ */
  function initTopic_fallthrough() {
    const topicId = 'ch9-fallthrough'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch9-fallthrough-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int day = 6;   /* Saturday */

switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        printf("Weekday\\n");
        break;
    case 6:     /* falls through into 7 */
    case 7:
        printf("Weekend\\n");
        break;
    default:
        printf("Invalid day\\n");
        break;
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch9-fallthrough',
      question: 'case 6 has no code and no break — it shares the "Weekend" output with case 7. Why does this work correctly here?',
      options: [
        'case 6 and case 7 are automatically grouped by the compiler',
        'case 6 matches and immediately falls through to case 7\'s code — deliberate sharing of one action across multiple values',
        'break is optional between adjacent case labels',
        'default handles case 6 silently'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — case 6 matches, finds no code, falls through to case 7 which has the printf and break. This is intentional grouping: both 6 and 7 map to "Weekend".',
        incorrect: 'When a case label has no code, execution falls through immediately to the next case\'s code. case 6 and case 7 intentionally share the "Weekend" printf.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch9-fallthrough-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch9-fallthrough-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add cases for vowels (a, e, i, o, u) to print "Vowel", and use fallthrough so all five cases share one printf.',
      includes: ['<stdio.h>'],
      starterCode:
`char c = 'e';

switch (c) {
    case 'a':
        printf("Vowel\\n");
        break;
}`,
      checkFn: output => output.includes('Vowel'),
      hint: "case 'a': case 'e': case 'i': case 'o': case 'u': printf(\"Vowel\\n\"); break;",
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch9-fallthrough-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in to group seasons using fallthrough. Months 12, 1, 2 = Winter; 3, 4, 5 = Spring.',
      includes: ['<stdio.h>'],
      starterCode:
`int month = 1;
switch (month) {
    case 12:
    [?] 1:
    [?] 2:
        printf("Winter\\n");
        break;
    case 3:
    [?] 4:
    [?] 5:
        printf("Spring\\n");
        break;
    default:
        printf("Other\\n");
        break;
}`,
      blanks: ['case', 'case', 'case', 'case'],
      hint: 'All blank lines start with: case',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch9-fallthrough-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a letter grade grouper using intentional fallthrough.\n① char grade = \'C\'\n② A, B → "Above average"\n③ C → "Average"\n④ D, F → "Below average"\n⑤ default → "Invalid"\nUse fallthrough to group A and B, and D and F.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('Average') && !output.includes('Above') && !output.includes('Below'),
      hint: "case 'A': case 'B': printf(\"Above average\\n\"); break; case 'C': printf(\"Average\\n\"); break; case 'D': case 'F': printf(\"Below average\\n\"); break;",
      solution:
`char grade = 'C';
switch (grade) {
    case 'A':
    case 'B': printf("Above average\\n"); break;
    case 'C': printf("Average\\n");       break;
    case 'D':
    case 'F': printf("Below average\\n"); break;
    default:  printf("Invalid\\n");       break;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch9-ft-p1', type:'predict', question:'What prints? int x=1;',
          code:`int x=1;\nswitch(x){\n  case 1:\n  case 2: printf("A or B\\n"); break;\n  case 3: printf("C\\n"); break;\n}`,
          correct:['A or B'], caseSensitive:true, orderMatters:true,
          hint:'case 1 falls through to case 2 which has the printf.',
          feedback:{correct:'Correct — case 1 → no code → fallthrough → case 2 printf → break.',incorrect:'case 1: no code, falls to case 2 which has printf("A or B"). Prints once.'}
        },
        {
          id:'ch9-ft-p2', type:'predict', question:'What prints? int x=2;',
          code:`int x=2;\nswitch(x){\n  case 1:\n  case 2: printf("A or B\\n"); break;\n  case 3: printf("C\\n"); break;\n}`,
          correct:['A or B'], caseSensitive:true, orderMatters:true,
          hint:'case 2 directly matches the printf.',
          feedback:{correct:'Correct — case 2 directly reaches the printf. Same output as case 1 due to grouping.',incorrect:'case 2 directly reaches printf("A or B"). break exits. C never runs.'}
        },
        {
          id:'ch9-ft-p3', type:'predict', question:'What prints? char c=\'i\';',
          code:`char c='i';\nswitch(c){\n  case 'a': case 'e': case 'i':\n  case 'o': case 'u':\n    printf("vowel\\n"); break;\n  default:\n    printf("consonant\\n"); break;\n}`,
          correct:['vowel'], caseSensitive:true, orderMatters:true,
          hint:"'i' is one of the vowel group.",
          feedback:{correct:"Correct — 'i' matches case 'i', falls through all the way to printf(\"vowel\").",incorrect:"case 'i' is in the vowel group. Falls through to printf(\"vowel\"). break exits."}
        }
      ]
      const mcqQ = [
        { id:'ch9-ft-m1', type:'mcq', question:'When is intentional fallthrough appropriate?', options:['Never — always a bug','When multiple case values should execute the same code','When you want to print multiple things','Only with char types'], correct:['When multiple case values should execute the same code'], caseSensitive:false, orderMatters:false, hint:'Think about grouping.', feedback:{correct:'Correct — stacking case labels with fallthrough groups multiple values to share one action.',incorrect:'Intentional fallthrough is good for grouping: many values → same outcome.'} },
        { id:'ch9-ft-m2', type:'mcq', question:'What best practice should you follow when using intentional fallthrough?', options:['Remove all break statements','Add a /* fallthrough */ comment so readers know it is deliberate','Never use it','Use goto instead'], correct:['Add a /* fallthrough */ comment so readers know it is deliberate'], caseSensitive:false, orderMatters:false, hint:'Documentation is key.', feedback:{correct:'Correct — a comment makes it clear it is intentional, not a forgotten break.',incorrect:'Always comment intentional fallthrough to distinguish it from a missing break bug.'} },
        { id:'ch9-ft-m3', type:'mcq', question:'In case stacking (case 1: case 2: case 3: printf("x");), what triggers the printf?', options:['Only case 1','Only case 3','Any of case 1, 2, or 3','None — it is a syntax error'], correct:['Any of case 1, 2, or 3'], caseSensitive:false, orderMatters:false, hint:'All three fall through to the same printf.', feedback:{correct:'Correct — matching any of the three cases eventually reaches the shared printf.',incorrect:'All three case labels fall through to the same printf. Any matching value triggers it.'} },
        { id:'ch9-ft-m4', type:'mcq', question:'case 6: case 7: printf("Weekend"); break; — is this valid?', options:['No — each case needs its own code','Yes — this is intentional fallthrough grouping','No — two cases cannot share a break','Only if 6 and 7 are adjacent numbers'], correct:['Yes — this is intentional fallthrough grouping'], caseSensitive:false, orderMatters:false, hint:'This is standard C grouping.', feedback:{correct:'Correct — this is the standard way to group cases in C.',incorrect:'Valid C: case 6 falls through to case 7 which has the printf and break. Both values trigger "Weekend".'} },
        { id:'ch9-ft-m5', type:'mcq', question:'What is the difference between accidental and intentional fallthrough?', options:['There is no difference in code — only in programmer intent and comments','Intentional fallthrough uses a keyword','Accidental fallthrough causes compile errors','They produce different output'], correct:['There is no difference in code — only in programmer intent and comments'], caseSensitive:false, orderMatters:false, hint:'The code looks the same either way.', feedback:{correct:'Correct — both look identical to the compiler. Comments and code review context distinguish them.',incorrect:'Fallthrough is fallthrough — the compiler cannot tell intent. Documentation is the only distinguisher.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:"char c='A'. Group uppercase vowels (A, E, I, O, U) to print \"Vowel\". Use fallthrough.", check: o=>o.includes('Vowel'), hint:"case 'A': case 'E': case 'I': case 'O': case 'U': printf(\"Vowel\\n\"); break;", solution:"char c='A';\nswitch(c){case 'A':case 'E':case 'I':case 'O':case 'U':printf(\"Vowel\\n\");break;default:printf(\"Consonant\\n\");break;}" },
        { id:'p2', task:'int month=4. Group months 1,2,3=Q1 | 4,5,6=Q2 | 7,8,9=Q3 | 10,11,12=Q4. Print the quarter.', check: o=>o.includes('Q2'), hint:'case 4: case 5: case 6: printf("Q2\\n"); break;', solution:'int month=4;\nswitch(month){case 1:case 2:case 3:printf("Q1\\n");break;case 4:case 5:case 6:printf("Q2\\n");break;case 7:case 8:case 9:printf("Q3\\n");break;default:printf("Q4\\n");break;}' },
        { id:'p3', task:'int n=2. Cases 1,2,3 → "Low". Cases 4,5 → "Mid". Cases 6,7,8,9,10 → "High". Use fallthrough groups.', check: o=>o.includes('Low'), hint:'case 1: case 2: case 3: printf("Low\\n"); break;', solution:'int n=2;\nswitch(n){case 1:case 2:case 3:printf("Low\\n");break;case 4:case 5:printf("Mid\\n");break;case 6:case 7:case 8:case 9:case 10:printf("High\\n");break;}' },
        { id:'p4', task:"char tier='B'. A and B → \"Premium\", C and D → \"Standard\", F → \"Failed\".", check: o=>o.includes('Premium'), hint:"case 'A': case 'B': printf(\"Premium\\n\"); break;", solution:"char tier='B';\nswitch(tier){case 'A':case 'B':printf(\"Premium\\n\");break;case 'C':case 'D':printf(\"Standard\\n\");break;case 'F':printf(\"Failed\\n\");break;}" },
        { id:'p5', task:'int sensor=7. Groups: 1,2,3=Zone A | 4,5,6=Zone B | 7,8,9=Zone C | 10=Zone D. Print the zone.', check: o=>o.includes('Zone C'), hint:'case 7: case 8: case 9: printf("Zone C\\n"); break;', solution:'int sensor=7;\nswitch(sensor){case 1:case 2:case 3:printf("Zone A\\n");break;case 4:case 5:case 6:printf("Zone B\\n");break;case 7:case 8:case 9:printf("Zone C\\n");break;case 10:printf("Zone D\\n");break;}' }
      ]
      renderPracticeCh9('practice-ch9-fallthrough', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch9-fallthrough-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch9-fallthrough-mcq',     questions:mcqQ,     onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch9-fallthrough-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'This should print "Weekend" for both Saturday(6) and Sunday(7), but Saturday prints nothing. Fix it.',
        includes:['<stdio.h>'],
        starterCode:'int day=6;\nswitch(day){\n    case 6: break;\n    case 7: printf("Weekend\\n"); break;\n    default: printf("Weekday\\n"); break;\n}',
        checkFn: o=>o.includes('Weekend'),
        hint:'What does case 6 do right now?',
        hintTwo:'case 6 has an immediate break — it exits without printing. Remove the break from case 6 so it falls through to case 7.',
        solution:'int day=6;\nswitch(day){\n    case 6:\n    case 7: printf("Weekend\\n"); break;\n    default: printf("Weekday\\n"); break;\n}',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Intentional Fallthrough — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 4 — THE DEFAULT CASE
     ══════════════════════════════════════════════════════════ */
  function initTopic_default() {
    const topicId = 'ch9-default'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch9-default-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int code = 42;

/* Without default */
printf("Without default:\\n");
switch (code) {
    case 1: printf("One\\n");   break;
    case 2: printf("Two\\n");   break;
}
printf("After switch\\n");

/* With default */
printf("\\nWith default:\\n");
switch (code) {
    case 1: printf("One\\n");             break;
    case 2: printf("Two\\n");             break;
    default: printf("Unknown: %d\\n", code); break;
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch9-default',
      question: 'Without default, code=42 caused the switch to print nothing. With default it caught it. Why is default important for production code?',
      options: [
        'default makes switch faster',
        'default catches unexpected or invalid values that no case handles, preventing silent failure',
        'default is required by the C standard',
        'default only runs when code is 0'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — without default, unexpected values silently skip the entire switch. In production code that is a hidden bug waiting to happen. default gives you control over the unknown.',
        incorrect: 'default catches values that slip past all the case labels. Without it, invalid or unexpected values silently do nothing — a hard-to-debug failure mode.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch9-default-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch9-default-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'Add a default case to this switch that prints "Error: unrecognized command %d" including the command value.',
      includes: ['<stdio.h>'],
      starterCode:
`int cmd = 99;
switch (cmd) {
    case 1: printf("Start\\n");  break;
    case 2: printf("Stop\\n");   break;
    case 3: printf("Pause\\n");  break;
}`,
      checkFn: output => output.includes('99') || output.toLowerCase().includes('error') || output.toLowerCase().includes('unrecognized'),
      hint: 'After case 3\'s break, add: default: printf("Error: unrecognized command %d\\n", cmd); break;',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch9-default-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in the default case to complete this HTTP status handler.',
      includes: ['<stdio.h>'],
      starterCode:
`int status = 302;
switch (status) {
    case 200: printf("OK\\n");         break;
    case 301: printf("Moved\\n");      break;
    case 404: printf("Not Found\\n");  break;
    case 500: printf("Server Error\\n"); break;
    [?]:
        printf("Status: %d\\n", status);
        [?];
}`,
      blanks: ['default', 'break'],
      hint: 'The catch-all keyword is: default. Each case end needs: break.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch9-default-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Build a direction handler.\n① int direction = 5 (1=North, 2=South, 3=East, 4=West)\n② Print the direction name for cases 1-4\n③ default prints "Invalid direction: X" with the actual value\n④ All cases and default have break',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('5') && (output.toLowerCase().includes('invalid') || output.toLowerCase().includes('unknown')),
      hint: 'switch(direction){ case 1: printf("North\\n"); break; ... default: printf("Invalid direction: %d\\n", direction); break; }',
      solution:
`int direction = 5;
switch (direction) {
    case 1: printf("North\\n");                        break;
    case 2: printf("South\\n");                        break;
    case 3: printf("East\\n");                         break;
    case 4: printf("West\\n");                         break;
    default: printf("Invalid direction: %d\\n", direction); break;
}`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch9-df-p1', type:'predict', question:'What prints? int x=99; (has default)',
          code:`int x=99;\nswitch(x){\n  case 1: printf("A\\n"); break;\n  default: printf("D\\n"); break;\n}`,
          correct:['D'], caseSensitive:true, orderMatters:true,
          hint:'No case for 99 → default.',
          feedback:{correct:'Correct — 99 matches no case, default runs: D.',incorrect:'x=99 matches no case → default → D.'}
        },
        {
          id:'ch9-df-p2', type:'predict', question:'What prints? int x=1; (has default)',
          code:`int x=1;\nswitch(x){\n  case 1: printf("A\\n"); break;\n  default: printf("D\\n"); break;\n}`,
          correct:['A'], caseSensitive:true, orderMatters:true,
          hint:'case 1 matches — default is not checked.',
          feedback:{correct:'Correct — case 1 matches, A prints, break exits. Default is skipped.',incorrect:'case 1 matches directly → A → break. Default is never reached.'}
        },
        {
          id:'ch9-df-p3', type:'predict', question:'What prints? int x=5; (no default)',
          code:`int x=5;\nswitch(x){\n  case 1: printf("A\\n"); break;\n  case 2: printf("B\\n"); break;\n}\nprintf("Z\\n");`,
          correct:['Z'], caseSensitive:true, orderMatters:true,
          hint:'No match, no default — switch skipped. What is after the switch?',
          feedback:{correct:'Correct — no match, no default → switch skipped → Z prints.',incorrect:'x=5 matches nothing. No default. Switch is skipped entirely. Z prints after.'}
        }
      ]
      const mcqQ = [
        { id:'ch9-df-m1', type:'mcq', question:'Is default required in every switch?', options:['Yes — compile error without it','No — it is optional','Only when there are more than 3 cases','Only with char types'], correct:['No — it is optional'], caseSensitive:false, orderMatters:false, hint:'Missing default does not cause an error.', feedback:{correct:'Correct — default is optional. Without it, unmatched values silently skip the switch.',incorrect:'default is optional. Without it, unmatched values silently do nothing — usually not what you want.'} },
        { id:'ch9-df-m2', type:'mcq', question:'Must default be the last case?', options:['Yes — always last','No — it can appear anywhere in the switch','Only at the beginning','Only after two or more cases'], correct:['No — it can appear anywhere in the switch'], caseSensitive:false, orderMatters:false, hint:'Convention puts it last, but it is not required.', feedback:{correct:'Correct — default can appear anywhere. Convention puts it last, but C does not require it.',incorrect:'default can appear anywhere in the switch. Last is convention, not a rule.'} },
        { id:'ch9-df-m3', type:'mcq', question:'What is the switch equivalent of the final else in an else if chain?', options:['break','case 0','default','return'], correct:['default'], caseSensitive:true, orderMatters:false, hint:'The fallback case.', feedback:{correct:'Correct — default is the switch equivalent of a trailing else.',incorrect:'default in switch = else at the end of an else if chain. Both are the catch-all fallback.'} },
        { id:'ch9-df-m4', type:'mcq', question:'Why should default always print the unexpected value (the switch expression)?', options:['C requires it','It makes debugging much easier — you see exactly what value was not handled','To avoid break','For performance'], correct:['It makes debugging much easier — you see exactly what value was not handled'], caseSensitive:false, orderMatters:false, hint:'Think about tracing a bug.', feedback:{correct:'Correct — printing the value in default tells you exactly what unexpected input reached that point.',incorrect:'Printing the unexpected value in default is a debugging best practice. You see exactly what slipped through.'} },
        { id:'ch9-df-m5', type:'mcq', question:'Does default need a break at the end?', options:['Yes — always','No — never','Only if it is not the last case','Only with fallthrough'], correct:['Only if it is not the last case'], caseSensitive:false, orderMatters:false, hint:'Think about what happens at the end of the switch block.', feedback:{correct:'Correct — if default is last (conventional), break is unnecessary but harmless. If not last, break prevents fallthrough into the next case.',incorrect:'If default is last, the closing } ends the switch naturally. If default is not last, break prevents it from falling into the next case.'} }
      ]
      const practiceConfigs = [
        { id:'p1', task:'int x=99. Switch with cases 1,2,3 and a default that prints "Unexpected: X" with the value.', check: o=>o.includes('99'), hint:'default: printf("Unexpected: %d\\n", x); break;', solution:'int x=99;\nswitch(x){case 1:printf("One\\n");break;case 2:printf("Two\\n");break;case 3:printf("Three\\n");break;default:printf("Unexpected: %d\\n",x);break;}' },
        { id:'p2', task:'int choice=0. Switch 1=Yes, 2=No, 3=Maybe. Default="Invalid choice". Test with 0.', check: o=>o.toLowerCase().includes('invalid'), hint:'default: printf("Invalid choice\\n"); break;', solution:'int choice=0;\nswitch(choice){case 1:printf("Yes\\n");break;case 2:printf("No\\n");break;case 3:printf("Maybe\\n");break;default:printf("Invalid choice\\n");break;}' },
        { id:'p3', task:'int floor=-1. Switch floors 1-5 print "Floor N". Default prints "No such floor: N".', check: o=>o.includes('-1')||o.toLowerCase().includes('no such'), hint:'default: printf("No such floor: %d\\n", floor); break;', solution:'int floor=-1;\nswitch(floor){case 1:printf("Floor 1\\n");break;case 2:printf("Floor 2\\n");break;case 3:printf("Floor 3\\n");break;case 4:printf("Floor 4\\n");break;case 5:printf("Floor 5\\n");break;default:printf("No such floor: %d\\n",floor);break;}' },
        { id:'p4', task:"char op='+'. Calculator: +, -, *, / → print result for a=10 b=3. Default → \"Unknown operator\".", check: o=>o.includes('13')||o.includes('result'), hint:"case '+': printf(\"Result: %d\\n\", a+b); break;", solution:"int a=10,b=3;\nchar op='+';\nswitch(op){case '+':printf(\"Result: %d\\n\",a+b);break;case '-':printf(\"Result: %d\\n\",a-b);break;case '*':printf(\"Result: %d\\n\",a*b);break;case '/':printf(\"Result: %d\\n\",a/b);break;default:printf(\"Unknown operator\\n\");break;}" },
        { id:'p5', task:'int month=13. Switch months 1-12 to print month names. Default prints "Invalid month: N".', check: o=>o.includes('13')||o.toLowerCase().includes('invalid'), hint:'default: printf("Invalid month: %d\\n", month); break;', solution:'int month=13;\nswitch(month){case 1:printf("January\\n");break;case 2:printf("February\\n");break;case 3:printf("March\\n");break;case 4:printf("April\\n");break;case 5:printf("May\\n");break;case 6:printf("June\\n");break;case 7:printf("July\\n");break;case 8:printf("August\\n");break;case 9:printf("September\\n");break;case 10:printf("October\\n");break;case 11:printf("November\\n");break;case 12:printf("December\\n");break;default:printf("Invalid month: %d\\n",month);break;}' }
      ]
      renderPracticeCh9('practice-ch9-default', CH, topicId, practiceConfigs)
      QuizEngine.init({ containerId:'quiz-ch9-default-predict', questions:predictQ, onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch9-default-mcq',     questions:mcqQ,     onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch9-default-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'For x=99, no output appears at all. The programmer expected some kind of message. Fix it.',
        includes:['<stdio.h>'],
        starterCode:'int x=99;\nswitch(x){\n    case 1: printf("One\\n");   break;\n    case 2: printf("Two\\n");   break;\n    case 3: printf("Three\\n"); break;\n}',
        checkFn: o=>o.length > 0,
        hint:'What happens when x=99 matches no case and there is no default?',
        hintTwo:'Add a default case: default: printf("Unknown: %d\\n", x); break;',
        solution:'int x=99;\nswitch(x){\n    case 1: printf("One\\n");   break;\n    case 2: printf("Two\\n");   break;\n    case 3: printf("Three\\n"); break;\n    default: printf("Unknown: %d\\n", x); break;\n}',
        onPass:()=>{}
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'The default Case — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     TOPIC 5 — SWITCH VS ELSE IF
     ══════════════════════════════════════════════════════════ */
  function initTopic_vs_ifelse() {
    const topicId = 'ch9-vs-ifelse'
    const sm = StepManager.init(topicId, 7, CH)

    CCompiler.initBlock($('compiler-ch9-vs-ifelse-explore'), {
      mode: 'explore', topicId, chapterId: CH, question: null,
      includes: ['<stdio.h>'],
      starterCode:
`int code = 404;

/* Method 1: else if chain */
printf("else if: ");
if      (code == 200) printf("OK\\n");
else if (code == 301) printf("Moved\\n");
else if (code == 404) printf("Not Found\\n");
else if (code == 500) printf("Server Error\\n");
else                  printf("Unknown\\n");

/* Method 2: switch */
printf("switch:  ");
switch (code) {
    case 200: printf("OK\\n");           break;
    case 301: printf("Moved\\n");        break;
    case 404: printf("Not Found\\n");    break;
    case 500: printf("Server Error\\n"); break;
    default:  printf("Unknown\\n");      break;
}`,
      onPass: () => sm.complete(1)
    })

    QuizEngine.initInstantQuestion({
      containerId: 'iq-ch9-vs-ifelse',
      question: 'Both printed exactly the same thing for code=404. If the output is identical, why would you ever choose switch over else if?',
      options: [
        'switch always runs faster than else if',
        'switch is cleaner and more readable when testing one variable against many exact constant values',
        'else if cannot handle integers',
        'switch uses less memory'
      ],
      correctIndex: 1,
      feedback: {
        correct: 'Correct — for many exact integer values, switch is cleaner. The case labels visually communicate "matching one of these specific values" better than a list of == comparisons.',
        incorrect: 'For many exact values on one variable, switch code is easier to scan and understand at a glance. The structure makes intent clearer than a long else if == chain.'
      },
      onAnswer: () => sm.complete(2)
    })

    $('step-ch9-vs-ifelse-3-continue').addEventListener('click', () => {
      Progress.saveStepComplete(CH, topicId, 3)
      sm.complete(3)
    })

    CCompiler.initBlock($('compiler-ch9-vs-ifelse-modify'), {
      mode: 'modify', topicId, chapterId: CH,
      question: 'This else if chain would be much cleaner as a switch. Rewrite it as a switch statement.',
      includes: ['<stdio.h>'],
      starterCode:
`int planet = 3;

if      (planet == 1) printf("Mercury\\n");
else if (planet == 2) printf("Venus\\n");
else if (planet == 3) printf("Earth\\n");
else if (planet == 4) printf("Mars\\n");
else                  printf("Outer planet\\n");`,
      checkFn: output => output.includes('Earth'),
      hint: 'switch(planet){ case 1: printf("Mercury\\n"); break; ... default: printf("Outer planet\\n"); break; }',
      onPass: () => sm.complete(4)
    })

    CCompiler.initBlock($('compiler-ch9-vs-ifelse-fill'), {
      mode: 'fill', topicId, chapterId: CH,
      question: 'Fill in whether to use switch or if/else for each scenario.',
      includes: ['<stdio.h>'],
      starterCode:
`/*
   For each scenario, the correct choice is written.
   Translate ONLY the switch scenario into actual code.

   Scenario A: int score = 85 — classify as A/B/C/D/F by range
   Choice A: [?] (ranges need if/else)

   Scenario B: int key = 3 — map 1/2/3/4 to Up/Down/Left/Right
   Choice B: [?] (exact integer values — use switch)
*/

/* Write Scenario B as real code: */
int key = 3;
[?] (key) {
    [?] 1: printf("Up\\n");    [?];
    [?] 2: printf("Down\\n");  [?];
    [?] 3: printf("Left\\n");  [?];
    [?] 4: printf("Right\\n"); [?];
}`,
      blanks: ['if/else', 'switch', 'switch', 'case', 'break', 'case', 'break', 'case', 'break', 'case', 'break'],
      hint: 'Ranges → if/else. Exact integers → switch. Then fill the switch syntax.',
      onPass: () => sm.complete(5)
    })

    CCompiler.initBlock($('compiler-ch9-vs-ifelse-build'), {
      mode: 'build', topicId, chapterId: CH,
      question: 'Write a program that uses BOTH switch and else if for two different tasks.\n\n① Task A (use switch): int day=3. Print day name (1=Mon … 7=Sun).\n② Task B (use else if): int temp=22. Classify: cold (<10), cool (10-19), warm (20-29), hot (30+).\n③ Both should print on separate labeled lines.',
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output => output.includes('Wednesday') && output.includes('warm'),
      hint: 'First: switch(day){ case 3: printf("Day: Wednesday\\n"); break; ... }  Then: if (temp < 10) ... else if ...',
      solution:
`int day=3;
printf("Day: ");
switch(day){
    case 1:printf("Monday\\n");    break;
    case 2:printf("Tuesday\\n");   break;
    case 3:printf("Wednesday\\n"); break;
    default:printf("Other\\n");    break;
}
int temp=22;
printf("Temp: ");
if(temp<10)printf("cold\\n");
else if(temp<20)printf("cool\\n");
else if(temp<30)printf("warm\\n");
else printf("hot\\n");`,
      onPass: () => sm.complete(6)
    })

    sm.complete(7)

    function renderAssessment() {
      const predictQ = [
        {
          id:'ch9-vi-p1', type:'predict', question:'Which is better for this? int x=3; compare to 1,2,3,4,5.',
          code:`int x=3;\nswitch(x){\n  case 3: printf("Three\\n"); break;\n  default: printf("Other\\n"); break;\n}`,
          correct:['Three'], caseSensitive:true, orderMatters:true,
          hint:'case 3 matches.',
          feedback:{correct:'Correct — case 3 matches: Three. And switch is the right tool for exact integer values.',incorrect:'case 3 matches → Three. This is exactly the type of case switch handles best.'}
        },
        {
          id:'ch9-vi-p2', type:'predict', question:'Can this be rewritten as a switch? int score=85; if (score>=80) ... else if (score>=70) ...',
          code:`int score=85;\nif(score>=80)printf("B\\n");\nelse if(score>=70)printf("C\\n");\nelse printf("F\\n");`,
          correct:['B'], caseSensitive:true, orderMatters:true,
          hint: 'Range check: which tool handles >= ?',
          feedback:{correct:'Correct output is B. And no — range comparisons cannot be done in switch. This must stay as else if.',incorrect:'B is correct. Note: this CANNOT be a switch because >= is a range comparison, not an exact value match.'}
        },
        {
          id:'ch9-vi-p3', type:'predict', question:'Can float f=3.14 be used in a switch?',
          code:`/* float f=3.14;\nswitch(f) { ... } */\nprintf("float in switch: compile error\\n");`,
          correct:['float in switch: compile error'], caseSensitive:false, orderMatters:true,
          hint:'switch only accepts integer types.',
          feedback:{correct:'Correct — float cannot be used in switch. The code is commented out because it would not compile.',incorrect:'switch does not accept float. Only integer types are allowed.'}
        }
      ]
      const mcqQ = [
        { id:'ch9-vi-m1', type:'mcq', question:'Which scenario is better handled by switch?', options:['if (score >= 90)','if (a > b && c != 0)','switch (menu_item) for items 1-5','if (price < 10.99)'], correct:['switch (menu_item) for items 1-5'], caseSensitive:false, orderMatters:false, hint:'Exact integer values on one variable.', feedback:{correct:'Correct — exact integers on one variable is switch\'s ideal use case.',incorrect:'switch: exact integer values on one variable. Ranges, floats, and multi-variable conditions need if/else.'} },
        { id:'ch9-vi-m2', type:'mcq', question:'Can switch handle: if (x > 10)?', options:['Yes — case >10:', 'No — switch only matches exact constants','Yes with default','Yes, with ranges like case 11-20'], correct:['No — switch only matches exact constants'], caseSensitive:false, orderMatters:false, hint:'switch tests equality to constants, not comparisons.', feedback:{correct:'Correct — switch cannot express range comparisons. Only else if can handle x > 10.',incorrect:'switch cannot test ranges. Only exact constant equality. For x > 10, use else if.'} },
        { id:'ch9-vi-m3', type:'mcq', question:'What is the key reason to prefer switch over a long else if chain for exact values?', options:['switch is always faster','Readability — case labels make intent clearer than many == comparisons','switch uses less memory','else if does not work with int'], correct:['Readability — case labels make intent clearer than many == comparisons'], caseSensitive:false, orderMatters:false, hint:'Think about who reads the code next.', feedback:{correct:'Correct — switch code is more readable for many exact values. The structure communicates "dispatching on X" clearly.',incorrect:'The primary advantage is readability. switch makes multi-way dispatch on one variable much clearer.'} },
        { id:'ch9-vi-m4', type:'mcq', question:'Can you use switch with a string like char *name = "Alice"?', options:['Yes — case "Alice":', 'No — switch requires an integer type; strings need strcmp','Yes with default','Only for single characters'], correct:['No — switch requires an integer type; strings need strcmp'], caseSensitive:false, orderMatters:false, hint:'Strings are not integers.', feedback:{correct:'Correct — strings need strcmp() and if/else. switch only works with integer types.',incorrect:'switch cannot compare strings. Use strcmp() with if/else for string comparisons.'} },
        { id:'ch9-vi-m5', type:'mcq', question:'int x=5; if (x==1||x==2||x==3) — is this better as switch?', options:['No — || is fine','Yes — switch with case 1: case 2: case 3: is cleaner','Only if x could be negative','Only if there are 5+ cases'], correct:['Yes — switch with case 1: case 2: case 3: is cleaner'], caseSensitive:false, orderMatters:false, hint:'Stacked case labels vs long || chain.', feedback:{correct:'Correct — stacked case labels are cleaner than long || chains for exact integer values.',incorrect:'switch with stacked cases (1, 2, 3: ...) is cleaner than if(x==1||x==2||x==3) for exact integer values.'} }
      ]
      const identifyQ = [
        { id:'ch9-vi-id1', type:'identify', question:'Which C branching construct uses case labels to match exact integer values?', correct:['switch','switch statement'], caseSensitive:false, orderMatters:false, hint:'The one we just learned.', feedback:{correct:'Correct — switch uses case labels.',incorrect:'switch statement uses case labels for exact integer value matching.'} },
        { id:'ch9-vi-id2', type:'identify', question:'What C keyword exits a switch block immediately?', correct:['break'], caseSensitive:true, orderMatters:false, hint:'One word.', feedback:{correct:'Correct — break exits switch.',incorrect:'break is the keyword that exits a switch block immediately.'} }
      ]
      QuizEngine.init({ containerId:'quiz-ch9-vs-ifelse-predict',  questions:predictQ,  onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch9-vs-ifelse-mcq',      questions:mcqQ,      onComplete:()=>{} })
      QuizEngine.init({ containerId:'quiz-ch9-vs-ifelse-identify', questions:identifyQ, onComplete:()=>Progress.saveTopicComplete(CH, topicId) })
      CCompiler.initBlock($('compiler-ch9-vs-ifelse-debug'), {
        mode:'debug', topicId, chapterId:CH,
        question:'This switch was supposed to handle score ranges (>=90, >=80, etc) but does not compile. Why? Fix it using else if instead.',
        includes:['<stdio.h>'],
        starterCode:`int score=85;\nswitch(score){\n    case (score>=90): printf("A\\n"); break;\n    case (score>=80): printf("B\\n"); break;\n    case (score>=70): printf("C\\n"); break;\n    default: printf("F\\n"); break;\n}`,
        checkFn: o=>o.includes('B'),
        hint:'Can switch case values be expressions or conditions?',
        hintTwo:'case requires compile-time integer constants — not expressions like score>=90. Rewrite using if/else if instead.',
        solution:`int score=85;\nif(score>=90)printf("A\\n");\nelse if(score>=80)printf("B\\n");\nelse if(score>=70)printf("C\\n");\nelse printf("F\\n");`,
        onPass:()=>{ Progress.saveTopicComplete(CH, topicId) }
      })
    }
    if (btn(topicId)) btn(topicId).addEventListener('click', () => openAssessmentModal(topicId, 'Switch vs else if — Assessment', renderAssessment))
  }

  /* ══════════════════════════════════════════════════════════
     CHAPTER 9 MASTERY CHALLENGE
     ══════════════════════════════════════════════════════════ */
  function initMastery() {
    CCompiler.initBlock($('compiler-ch9-mastery'), {
      mode: 'build',
      topicId: 'ch9-mastery',
      chapterId: CH,
      question:
`Build a complete vending machine controller.

① int selection = 2, int coins = 150 (cents)
② Use switch on selection — 4 items:
   • case 1: "Cola"    costs 125 cents
   • case 2: "Chips"  costs 100 cents  
   • case 3: "Water"  costs 75 cents
   • case 4: "Candy"  costs 150 cents (exact)
   • default: "Unknown item"

③ After the switch, use else if to check coins:
   • coins == cost → "Exact change — dispensing"
   • coins > cost  → "Dispensing — change: N cents"
   • coins < cost  → "Insufficient — need N more cents"

④ Print item name and result clearly`,
      includes: ['<stdio.h>'],
      starterCode: '',
      checkFn: output =>
        (output.includes('Chips') || output.includes('chips')) &&
        (output.includes('Dispensing') || output.includes('change')),
      hint: 'int cost = 0; switch(selection){ case 2: printf("Chips\\n"); cost=100; break; ... } then if(coins==cost) ...',
      solution:
`int selection=2, coins=150, cost=0;
switch(selection){
    case 1: printf("Cola\\n");   cost=125; break;
    case 2: printf("Chips\\n");  cost=100; break;
    case 3: printf("Water\\n");  cost=75;  break;
    case 4: printf("Candy\\n");  cost=150; break;
    default: printf("Unknown item\\n"); break;
}
if(cost>0){
    if(coins==cost)       printf("Exact change — dispensing\\n");
    else if(coins>cost)   printf("Dispensing — change: %d cents\\n", coins-cost);
    else                  printf("Insufficient — need %d more cents\\n", cost-coins);
}`,
      onPass: () => {
        Progress.saveChapterComplete(CH)
        $('ch9-chapter-complete').style.display = 'block'
        $('ch9-chapter-complete').scrollIntoView({ behavior: 'smooth' })
      }
    })

    $('ch9-next-btn').addEventListener('click', () => {
      if (typeof loadChapter !== 'undefined') loadChapter('ch10')
    })
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE SET HELPER
     ══════════════════════════════════════════════════════════ */
  function renderPracticeCh9(containerId, chapterId, topicId, configs) {
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
      div.id = `pc9-${topicId}-${cfg.id}`
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
    initTopic_intro()
    initTopic_break()
    initTopic_fallthrough()
    initTopic_default()
    initTopic_vs_ifelse()
    initMastery()
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
