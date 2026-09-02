/* =========================================================
   C INTERACTIVE LEARNING PLATFORM — app.js
   Routing, sidebar rendering, theme, settings, navigation
   ========================================================= */

/* -------------------------------------------------------
   1. CHAPTER MANIFEST
   All 21 chapters with their topics and unlock rules.
   ------------------------------------------------------- */
const CHAPTER_MANIFEST = [
  {
    id: 'ch0', num: 0, title: 'Introduction to C',
    file: 'chapters/ch0-intro/ch0.html',
    js:   'chapters/ch0-intro/ch0.js',
    css:  'chapters/ch0-intro/ch0.css',
    topics: [
      { id: 'ch0-whatisC',    title: 'What is C?' },
      { id: 'ch0-howCworks',  title: 'How C Works' },
      { id: 'ch0-boilerplate',title: '#include, main(), return 0' }
    ]
  },
  {
    id: 'ch1', num: 1, title: 'Variables & Constants',
    file: 'chapters/ch1-variables-constants/ch1.html',
    js:   'chapters/ch1-variables-constants/ch1.js',
    css:  'chapters/ch1-variables-constants/ch1.css',
    topics: [
      { id: 'ch1-variable',   title: 'What is a Variable?' },
      { id: 'ch1-naming',     title: 'Variable Naming Rules' },
      { id: 'ch1-int',        title: 'int Variables' },
      { id: 'ch1-float',      title: 'float & double' },
      { id: 'ch1-char',       title: 'char Variables' },
      { id: 'ch1-const',      title: 'Constants — const' },
      { id: 'ch1-define',     title: '#define Constants' },
      { id: 'ch1-naming2',    title: 'Naming Conventions' },
      { id: 'ch1-mastery',    title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch2', num: 2, title: 'Data Types',
    file: 'chapters/ch2-data-types/ch2.html',
    js:   'chapters/ch2-data-types/ch2.js',
    css:  'chapters/ch2-data-types/ch2.css',
    topics: [
      { id: 'ch2-overview',   title: 'Data Types Overview' },
      { id: 'ch2-integers',   title: 'Integer Types' },
      { id: 'ch2-floats',     title: 'Floating Point Types' },
      { id: 'ch2-char',       title: 'char & ASCII' },
      { id: 'ch2-sizeof',     title: 'sizeof() Operator' },
      { id: 'ch2-signedness', title: 'Signed vs Unsigned' },
      { id: 'ch2-limits',     title: 'Type Limits — limits.h' },
      { id: 'ch2-selection',  title: 'Practical Type Selection' },
      { id: 'ch2-mastery',    title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch3', num: 3, title: 'Input & Output',
    file: 'chapters/ch3-input-output/ch3.html',
    js:   'chapters/ch3-input-output/ch3.js',
    css:  'chapters/ch3-input-output/ch3.css',
    topics: [
      { id: 'ch3-printf',     title: 'printf() Basics' },
      { id: 'ch3-format',     title: 'Format Specifiers' },
      { id: 'ch3-modifiers',  title: 'Width, Precision, Padding' },
      { id: 'ch3-scanf',      title: 'scanf() — User Input' },
      { id: 'ch3-multi',      title: 'Multiple Inputs' },
      { id: 'ch3-buffer',     title: 'Input Buffer & \\n Issues' },
      { id: 'ch3-getchar',    title: 'getchar() & putchar()' },
      { id: 'ch3-columns',    title: 'Formatted Output Practice' },
      { id: 'ch3-mastery',    title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch4', num: 4, title: 'Comments',
    file: 'chapters/ch4-comments/ch4.html',
    js:   'chapters/ch4-comments/ch4.js',
    css:  'chapters/ch4-comments/ch4.css',
    topics: [
      { id: 'ch4-singleline', title: 'Single-Line Comments //' },
      { id: 'ch4-multiline',  title: 'Multi-Line Comments /* */' },
      { id: 'ch4-practice',   title: 'Comments in Practice' },
      { id: 'ch4-commentout', title: 'Commenting Out Code' },
      { id: 'ch4-mastery',    title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch5', num: 5, title: 'Operators',
    file: 'chapters/ch5-operators/ch5.html',
    js:   'chapters/ch5-operators/ch5.js',
    css:  'chapters/ch5-operators/ch5.css',
    topics: [
      { id: 'ch5-arithmetic', title: 'Arithmetic Operators' },
      { id: 'ch5-division',   title: 'Integer vs Float Division' },
      { id: 'ch5-assignment', title: 'Assignment Operators' },
      { id: 'ch5-increment',  title: 'Increment & Decrement' },
      { id: 'ch5-precedence', title: 'Operator Precedence' },
      { id: 'ch5-mixing',     title: 'Operators with Mixed Types' },
      { id: 'ch5-mastery',    title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch6', num: 6, title: 'Type Conversion',
    file: 'chapters/ch6-type-conversion/ch6.html',
    js:   'chapters/ch6-type-conversion/ch6.js',
    css:  'chapters/ch6-type-conversion/ch6.css',
    topics: [
      { id: 'ch6-implicit',   title: 'Implicit Conversion' },
      { id: 'ch6-explicit',   title: 'Explicit Type Casting' },
      { id: 'ch6-int2float',  title: 'int → float' },
      { id: 'ch6-float2int',  title: 'float → int Truncation' },
      { id: 'ch6-mistakes',   title: 'Common Casting Mistakes' },
      { id: 'ch6-mastery',    title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch7', num: 7, title: 'Booleans & Comparison',
    file: 'chapters/ch7-booleans-comparison/ch7.html',
    js:   'chapters/ch7-booleans-comparison/ch7.js',
    css:  'chapters/ch7-booleans-comparison/ch7.css',
    topics: [
      { id: 'ch7-booleans',   title: 'Booleans in C' },
      { id: 'ch7-truefalse',  title: 'true & false in C99' },
      { id: 'ch7-comparison', title: 'Comparison Operators' },
      { id: 'ch7-truth',      title: '0 is False, Else is True' },
      { id: 'ch7-logical',    title: 'Logical Operators &&, ||, !' },
      { id: 'ch7-combining',  title: 'Combining Comparisons' },
      { id: 'ch7-equalsequals', title: '= vs == — Critical Mistake' },
      { id: 'ch7-mastery',      title: 'Mastery Challenge' }
    ],
    milestone: '🏁 Skill Milestone'
  },
  {
    id: 'ch8', num: 8, title: 'If / Else Statements',
    file: 'chapters/ch8-if-else/ch8.html',
    js:   'chapters/ch8-if-else/ch8.js',
    css:  'chapters/ch8-if-else/ch8.css',
    topics: [
      { id: 'ch8-if',      title: 'if Statement' },
      { id: 'ch8-ifelse',  title: 'if / else — Two-Way Branching' },
      { id: 'ch8-elseif',  title: 'else if — Multi-Way Branching' },
      { id: 'ch8-nested',  title: 'Nested if Statements' },
      { id: 'ch8-ternary', title: 'Ternary Operator ? :' },
      { id: 'ch8-mastery', title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch9', num: 9, title: 'Switch Statement',
    file: 'chapters/ch9-switch/ch9.html',
    js:   'chapters/ch9-switch/ch9.js',
    css:  'chapters/ch9-switch/ch9.css',
    topics: [
      { id: 'ch9-intro',       title: 'switch Syntax Basics' },
      { id: 'ch9-break',       title: 'case & break' },
      { id: 'ch9-fallthrough', title: 'Fall-Through Behavior' },
      { id: 'ch9-default',     title: 'default Case' },
      { id: 'ch9-vs-ifelse',   title: 'switch vs if/else' },
      { id: 'ch9-mastery',     title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch10', num: 10, title: 'While Loops',
    file: 'chapters/ch10-while-loops/ch10.html',
    js:   'chapters/ch10-while-loops/ch10.js',
    css:  'chapters/ch10-while-loops/ch10.css',
    topics: [
      { id: 'ch10-while',   title: 'while Loop Basics' },
      { id: 'ch10-dowhile', title: 'do...while Loop' },
      { id: 'ch10-counter', title: 'Counter-Based Loops' },
      { id: 'ch10-break',   title: 'break & continue in Loops' },
      { id: 'ch10-nested',  title: 'Nested while Loops' },
      { id: 'ch10-mastery', title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch11', num: 11, title: 'For Loops',
    file: 'chapters/ch11-for-loops/ch11.html',
    js:   'chapters/ch11-for-loops/ch11.js',
    css:  'chapters/ch11-for-loops/ch11.css',
    topics: [
      { id: 'ch11-forloop',   title: 'for Loop Structure' },
      { id: 'ch11-arrays',    title: 'for with Arrays (Preview)' },
      { id: 'ch11-nested',    title: 'Nested for Loops' },
      { id: 'ch11-scope',     title: 'Loop Variable Scope' },
      { id: 'ch11-vwhile',    title: 'for vs while' },
      { id: 'ch11-offbyone',  title: 'Off-by-One Errors' },
      { id: 'ch11-mastery',   title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch12', num: 12, title: 'Break & Continue',
    file: 'chapters/ch12-break-continue/ch12.html',
    js:   'chapters/ch12-break-continue/ch12.js',
    css:  'chapters/ch12-break-continue/ch12.css',
    topics: [
      { id: 'ch12-break',    title: 'break — Exit Loop' },
      { id: 'ch12-continue', title: 'continue — Skip Iteration' },
      { id: 'ch12-together', title: 'break & continue Together' },
      { id: 'ch12-nested',   title: 'break in Nested Loops' },
      { id: 'ch12-patterns', title: 'Filtering Patterns' },
      { id: 'ch12-mastery',  title: 'Mastery Challenge' }
    ],
    milestone: '🏁 Skill Milestone'
  },
  {
    id: 'ch13', num: 13, title: 'Functions',
    file: 'chapters/ch13-functions/ch13.html',
    js:   'chapters/ch13-functions/ch13.js',
    css:  'chapters/ch13-functions/ch13.css',
    topics: [
      { id: 'ch13-intro',     title: 'Defining & Calling Functions' },
      { id: 'ch13-params',    title: 'Parameters & Arguments' },
      { id: 'ch13-return',    title: 'Return Values' },
      { id: 'ch13-scope',     title: 'Function Scope' },
      { id: 'ch13-recursion', title: 'Recursion' },
      { id: 'ch13-mastery',   title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch14', num: 14, title: 'Scope, Storage & stdlib',
    file: 'chapters/ch14-scope-storage-stdlib/ch14.html',
    js:   'chapters/ch14-scope-storage-stdlib/ch14.js',
    css:  'chapters/ch14-scope-storage-stdlib/ch14.css',
    topics: [
      { id: 'ch14-scope',     title: 'Local vs Global Variables' },
      { id: 'ch14-scoperules',title: 'Scope Rules in C' },
      { id: 'ch14-storage',   title: 'Storage Classes' },
      { id: 'ch14-static',    title: 'static Inside Functions' },
      { id: 'ch14-stdlib',    title: 'Standard Library Overview' },
      { id: 'ch14-math',      title: 'math.h Functions' },
      { id: 'ch14-recursion', title: 'Recursion' },
      { id: 'ch14-recbase',   title: 'Base Case & Recursive Case' },
      { id: 'ch14-factorial', title: 'Factorial & Fibonacci' },
      { id: 'ch14-recviter',  title: 'Recursion vs Iteration' },
      { id: 'ch14-mastery',   title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch15', num: 15, title: 'Arrays & Strings',
    file: 'chapters/ch15-arrays-strings/ch15.html',
    js:   'chapters/ch15-arrays-strings/ch15.js',
    css:  'chapters/ch15-arrays-strings/ch15.css',
    topics: [
      { id: 'ch15-array',     title: 'What is an Array?' },
      { id: 'ch15-declare',   title: 'Declaring & Initializing Arrays' },
      { id: 'ch15-access',    title: 'Accessing Elements' },
      { id: 'ch15-iterate',   title: 'Iterating Arrays with Loops' },
      { id: 'ch15-bounds',    title: 'Array Bounds (Danger Zone)' },
      { id: 'ch15-2d',        title: '2D Arrays' },
      { id: 'ch15-2diterate', title: '2D Array Iteration' },
      { id: 'ch15-strings',   title: 'Strings in C — char Arrays' },
      { id: 'ch15-null',      title: 'The \\0 Null Terminator' },
      { id: 'ch15-strinput',  title: 'String Input: scanf & fgets' },
      { id: 'ch15-strfn',     title: 'String Functions — string.h' },
      { id: 'ch15-strarr',    title: 'Arrays of Strings' },
      { id: 'ch15-mistakes',  title: 'Common String Mistakes' },
      { id: 'ch15-mastery',   title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch16', num: 16, title: 'Pointers',
    file: 'chapters/ch16-pointers/ch16.html',
    js:   'chapters/ch16-pointers/ch16.js',
    css:  'chapters/ch16-pointers/ch16.css',
    topics: [
      { id: 'ch16-what',      title: 'What is a Pointer?' },
      { id: 'ch16-declare',   title: 'Declaring a Pointer — int *ptr' },
      { id: 'ch16-addressof', title: 'Address-of Operator &' },
      { id: 'ch16-deref',     title: 'Dereference Operator *' },
      { id: 'ch16-relationship',title: 'Pointer & Variable Relationship' },
      { id: 'ch16-null',      title: 'NULL Pointer' },
      { id: 'ch16-arithmetic',title: 'Pointer Arithmetic' },
      { id: 'ch16-arrays',    title: 'Pointers & Arrays' },
      { id: 'ch16-funcs',     title: 'Passing Pointers to Functions' },
      { id: 'ch16-modify',    title: 'Modifying Caller Values' },
      { id: 'ch16-mistakes',  title: 'Common Pointer Mistakes' },
      { id: 'ch16-mastery',   title: 'Mastery Challenge' }
    ],
    milestone: '🏁 Skill Milestone'
  },
  {
    id: 'ch17', num: 17, title: 'Structs & Enums',
    file: 'chapters/ch17-structs-enums/ch17.html',
    js:   'chapters/ch17-structs-enums/ch17.js',
    css:  'chapters/ch17-structs-enums/ch17.css',
    topics: [
      { id: 'ch17-struct',   title: 'What is a Struct?' },
      { id: 'ch17-declare',  title: 'Declaring Struct Variables' },
      { id: 'ch17-access',   title: 'Member Access — . Operator' },
      { id: 'ch17-nested',   title: 'Nested Structs' },
      { id: 'ch17-array',    title: 'Arrays of Structs' },
      { id: 'ch17-ptr',      title: 'Pointers to Structs — ->' },
      { id: 'ch17-fn',       title: 'Passing Structs to Functions' },
      { id: 'ch17-typedef',  title: 'typedef — Type Aliases' },
      { id: 'ch17-enum',     title: 'Enums — Named Constants' },
      { id: 'ch17-enumuse',  title: 'Enum Use Cases' },
      { id: 'ch17-union',    title: 'Unions — Shared Memory' },
      { id: 'ch17-mastery',  title: 'Mastery Challenge' }
    ]
  },
  {
    id: 'ch18', num: 18, title: 'Memory, Files & Macros',
    file: 'chapters/ch18-memory-files-macros/ch18.html',
    js:   'chapters/ch18-memory-files-macros/ch18.js',
    css:  'chapters/ch18-memory-files-macros/ch18.css',
    topics: [
      { id: 'ch18-malloc',       title: 'Dynamic Memory — malloc, calloc, free' },
      { id: 'ch18-files',        title: 'File Handling — fopen, fprintf, fclose' },
      { id: 'ch18-macros',       title: 'Macros — #define Constants' },
      { id: 'ch18-preprocessor', title: 'Preprocessor Directives' },
      { id: 'ch18-mastery',      title: 'Mastery Challenge' }
    ],
    milestone: '🏁 Skill Milestone'
  },
  {
    id: 'ch19', num: 19, title: 'Projects',
    file: 'chapters/ch19-projects/ch19.html',
    js:   'chapters/ch19-projects/ch19.js',
    css:  'chapters/ch19-projects/ch19.css',
    topics: [
      { id: 'ch19-gpa',       title: 'GPA Calculator' },
      { id: 'ch19-inventory', title: 'Inventory System' },
      { id: 'ch19-game',      title: 'Number Guessing Game' }
    ],
    milestone: '🚀 Projects Unlocked'
  },
  {
    id: 'ch20', num: 20, title: 'Congratulations',
    file: 'chapters/ch20-congratulations/ch20.html',
    js:   'chapters/ch20-congratulations/ch20.js',
    css:  'chapters/ch20-congratulations/ch20.css',
    topics: [
      { id: 'ch20-complete',  title: 'Course Complete!' }
    ]
  }
]

/* -------------------------------------------------------
   2. STATE
   ------------------------------------------------------- */

let currentChapterId = null
let currentTopicId    = null
let loadedChapterCSS = null
let loadedChapterJS  = null

/* -------------------------------------------------------
   2b. LOCK SETTINGS
   ------------------------------------------------------- */

function isChapterLockingEnabled() {
  return localStorage.getItem('setting_lock_chapters') !== 'false'
}

function isTopicLockingEnabled() {
  return localStorage.getItem('setting_lock_topics') !== 'false'
}

function isChapterUnlocked(ch) {
  if (!isChapterLockingEnabled()) return true
  return Progress.isChapterUnlocked(ch.id)
}

function isTopicLocked(chId, topicIndex) {
  if (!isTopicLockingEnabled()) return false
  if (topicIndex === 0) return false
  const ch = CHAPTER_MANIFEST.find(c => c.id === chId)
  if (!ch) return false
  const prevTopicId = ch.topics[topicIndex - 1].id
  return !Progress.isTopicComplete(chId, prevTopicId)
}

/* -------------------------------------------------------
   3. SIDEBAR RENDERING
   ------------------------------------------------------- */

function renderSidebar() {
  const container = document.getElementById('sidebar-chapters')
  if (!container) return
  container.innerHTML = ''

  CHAPTER_MANIFEST.forEach(ch => {
    const prog = Progress.getChapterProgress(ch.id)
    const unlocked = isChapterUnlocked(ch)

    const itemEl = document.createElement('div')
    itemEl.className = 'chapter-nav-item'
    itemEl.dataset.chapter = ch.id
    if (!unlocked) itemEl.classList.add('chapter-nav-item--locked')
    if (currentChapterId === ch.id) itemEl.classList.add('chapter-nav-item--active')

    // Chapter number badge state
    let numClass = 'chapter-num--locked'
    if (unlocked) {
      if (prog.chapterComplete) numClass = 'chapter-num--complete'
      else if (prog.topicsComplete > 0) numClass = 'chapter-num--progress'
      else numClass = 'chapter-num--unlocked'
    }

    const headerHTML = `
      <div class="chapter-nav-item__header" ${unlocked ? '' : 'tabindex="-1"'}>
        <div class="chapter-num ${numClass}">${ch.num}</div>
        <span class="chapter-nav-item__title">${ch.title}</span>
        ${ch.milestone ? `<span style="font-size:10px;color:var(--color-primary-light)">${ch.milestone}</span>` : ''}
        ${unlocked ? `<span class="chapter-nav-item__chevron">›</span>` : `<span style="font-size:12px">🔒</span>`}
      </div>`

    // Build topic list (only for unlocked chapters)
    let topicsHTML = ''
    if (unlocked) {
      topicsHTML = `<div class="chapter-topics">`
      ch.topics.forEach((topic, topicIndex) => {
        const tProg = Progress.getTopicProgress(ch.id, topic.id)
        const locked = isTopicLocked(ch.id, topicIndex)
        const dotClass = tProg.complete
          ? 'topic-dot--complete'
          : tProg.status === 'in-progress'
            ? 'topic-dot--progress'
            : locked
              ? 'topic-dot--locked'
              : 'topic-dot--unlocked'

        topicsHTML += `
          <div class="topic-nav-item ${topic.id === _currentTopicId() ? 'topic-nav-item--active' : ''} ${locked ? 'topic-nav-item--locked' : ''}"
               data-chapter="${ch.id}" data-topic="${topic.id}" data-locked="${locked}">
            <span class="topic-dot ${dotClass}"></span>
            <span class="topic-nav-item__title">${topic.title}</span>
            ${locked ? '<span style="font-size:10px">🔒</span>' : tProg.complete ? '<span style="color:var(--color-correct);font-size:11px">✓</span>' : ''}
          </div>`
      })
      topicsHTML += `</div>`
    }

    itemEl.innerHTML = headerHTML + topicsHTML

    // Chapter header click — expand/collapse topics
    const headerEl = itemEl.querySelector('.chapter-nav-item__header')
    if (unlocked && headerEl) {
      headerEl.addEventListener('click', () => {
        const wasExpanded = itemEl.classList.contains('chapter-nav-item--expanded')
        // Collapse all
        document.querySelectorAll('.chapter-nav-item--expanded').forEach(el => {
          el.classList.remove('chapter-nav-item--expanded')
        })
        if (!wasExpanded) {
          itemEl.classList.add('chapter-nav-item--expanded')
          loadChapter(ch.id)
        }
      })
    }

    // Topic clicks
    itemEl.querySelectorAll('.topic-nav-item').forEach(topicEl => {
      topicEl.addEventListener('click', () => {
        if (topicEl.dataset.locked === 'true') {
          Toast.show('Complete the previous topic first.', 'info')
          return
        }
        const chId    = topicEl.dataset.chapter
        const topicId = topicEl.dataset.topic
        if (currentChapterId !== chId) {
          loadChapter(chId, topicId)
        } else {
          showTopic(topicId)
        }
        // On mobile: close sidebar
        closeSidebar()
      })
    })

    container.appendChild(itemEl)
  })
}

function _currentTopicId() {
  // Returns the currently visible topic id based on scroll position
  const topics = document.querySelectorAll('[data-topic]')
  let current = null
  topics.forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.5) current = el.dataset.topic
  })
  return current
}

/* -------------------------------------------------------
   4. CHAPTER LOADING
   ------------------------------------------------------- */

function loadChapter(chapterId, scrollToTopicId = null) {
  const ch = CHAPTER_MANIFEST.find(c => c.id === chapterId)
  if (!ch) return
  if (!isChapterUnlocked(ch)) return

  currentChapterId = chapterId

  // Update topbar label
  const label = document.getElementById('topbar-chapter-label')
  if (label) label.textContent = `Ch. ${ch.num} — ${ch.title}`

  // Load chapter CSS
  if (loadedChapterCSS) loadedChapterCSS.remove()
  const cssEl = document.createElement('link')
  cssEl.rel = 'stylesheet'
  cssEl.href = ch.css
  document.head.appendChild(cssEl)
  loadedChapterCSS = cssEl

  // Remove old chapter JS
  if (loadedChapterJS) loadedChapterJS.remove()

  // Fetch and inject chapter HTML
  const contentEl = document.getElementById('chapter-content')
  if (!contentEl) return

  contentEl.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--color-text-muted)">
      <div class="loading-spinner"></div>
    </div>`

  fetch(ch.file)
    .then(r => r.ok ? r.text() : Promise.reject(`Chapter file not found: ${ch.file}`))
    .then(html => {
      contentEl.innerHTML = html

      // Rule A: fetch + textContent — synchronous injection prevents async race
      fetch(ch.js)
        .then(r => r.ok ? r.text() : Promise.reject('JS not found: ' + ch.js))
        .then(jsCode => {
          if (loadedChapterJS) loadedChapterJS.remove()
          const jsEl = document.createElement('script')
          jsEl.textContent = jsCode
          document.head.appendChild(jsEl)
          loadedChapterJS = jsEl

          // Safe to call showTopic NOW — chapter JS has already executed inline
          const firstTopic = ch.topics[0]?.id
          const targetTopic = scrollToTopicId || firstTopic
          if (targetTopic) showTopic(targetTopic)

          renderSidebar()
          expandActiveChapter(chapterId)
        })
        .catch(err => console.error(err))
    })
    .catch(err => {
      console.error(err)
      contentEl.innerHTML = `
        <div class="content-wrapper">
          <div style="padding:40px;color:var(--color-text-muted);text-align:center">
            <div style="font-size:48px;margin-bottom:16px">🚧</div>
            <div style="font-size:18px;font-weight:600;margin-bottom:8px">Chapter coming soon</div>
            <div style="font-size:14px">This chapter is being built.</div>
          </div>
        </div>`
    })
}

function showTopic(topicId) {
  if (!topicId || !currentChapterId) return

  // Rule B: class-based toggle — NEVER inline style.display
  document.querySelectorAll('.topic').forEach(el => el.classList.remove('topic--active'))
  const el = document.querySelector(`.topic[data-topic="${topicId}"]`)
  if (el) {
    el.classList.add('topic--active')
    const main = document.getElementById('main-content')
    if (main) main.scrollTop = 0
  }

  updateBreadcrumb(currentChapterId, topicId)
  renderTopicNavBar(currentChapterId, topicId)

  document.querySelectorAll('.topic-nav-item').forEach(pill => {
    pill.classList.toggle('topic-nav-item--active', pill.dataset.topic === topicId)
  })

  currentTopicId = topicId
}

// Keep scrollToTopic as alias for backward compat with chapter JS files
function scrollToTopic(topicId) { showTopic(topicId) }

function expandActiveChapter(chapterId) {
  document.querySelectorAll('.chapter-nav-item').forEach(el => {
    el.classList.remove('chapter-nav-item--active', 'chapter-nav-item--expanded')
  })
  const active = document.querySelector(`[data-chapter="${chapterId}"].chapter-nav-item`)
  if (active) {
    active.classList.add('chapter-nav-item--active', 'chapter-nav-item--expanded')
  }
}

/* -------------------------------------------------------
   5. PROGRESS UI
   ------------------------------------------------------- */

/* -------------------------------------------------------
   5b. BREADCRUMB + TOPIC NAVIGATION (Section 6B)
   ------------------------------------------------------- */

function updateBreadcrumb(chapterId, topicId) {
  const ch = CHAPTER_MANIFEST.find(c => c.id === chapterId)
  if (!ch) return

  const topicIndex = ch.topics.findIndex(t => t.id === topicId)
  const topic = ch.topics[topicIndex]

  document.getElementById('breadcrumb-chapter').textContent = ch.title
  document.getElementById('breadcrumb-topic-title').textContent = topic ? topic.title : ''
  document.getElementById('breadcrumb-position').textContent =
    topic ? `(${topicIndex + 1} / ${ch.topics.length})` : ''
}

function renderTopicNavBar(chapterId, topicId) {
  const ch = CHAPTER_MANIFEST.find(c => c.id === chapterId)
  if (!ch) return

  const topicIndex = ch.topics.findIndex(t => t.id === topicId)
  const prevTopic   = ch.topics[topicIndex - 1] || null
  const nextTopic   = ch.topics[topicIndex + 1] || null

  // Find next chapter for cross-chapter navigation
  const chIndex = CHAPTER_MANIFEST.findIndex(c => c.id === chapterId)
  const nextCh  = CHAPTER_MANIFEST[chIndex + 1] || null

  // Remove old nav bar if present
  const old = document.getElementById('topic-nav-bar')
  if (old) old.remove()

  const nav = document.createElement('div')
  nav.id = 'topic-nav-bar'
  nav.className = 'topic-nav-bar'

  // Previous button
  const prevBtn = document.createElement('button')
  prevBtn.className = 'nav-btn nav-btn--prev'
  prevBtn.innerHTML = '← Previous'
  prevBtn.disabled = !prevTopic
  if (prevTopic) {
    prevBtn.addEventListener('click', () => showTopic(prevTopic.id))
  }

  // Progress dots
  const dots = document.createElement('div')
  dots.className = 'topic-nav-dots'
  ch.topics.forEach((t, i) => {
    const dot = document.createElement('button')
    dot.className = 'topic-dot-btn'
    dot.title = t.title
    dot.setAttribute('aria-label', t.title)
    const tProg = Progress.getTopicProgress(chapterId, t.id)
    if (tProg.complete) dot.classList.add('dot--complete')
    if (i === topicIndex) dot.classList.add('dot--active')
    dot.addEventListener('click', () => showTopic(t.id))
    dots.appendChild(dot)
  })

  // Next button
  const nextBtn = document.createElement('button')
  nextBtn.className = 'nav-btn nav-btn--next'
  if (nextTopic) {
    nextBtn.innerHTML = 'Next: ' + nextTopic.title + ' →'
    nextBtn.addEventListener('click', () => showTopic(nextTopic.id))
  } else if (nextCh) {
    nextBtn.innerHTML = `${nextCh.title} →`
    nextBtn.addEventListener('click', () => {
      if (isChapterUnlocked(nextCh)) loadChapter(nextCh.id)
      else Toast.show('Complete this chapter to unlock the next one.', 'info')
    })
  } else {
    nextBtn.innerHTML = 'Course Complete! 🎉'
    nextBtn.disabled = true
  }

  nav.appendChild(prevBtn)
  nav.appendChild(dots)
  nav.appendChild(nextBtn)

  // Rule F: append nav bar to main-content so it's always visible
  const main = document.getElementById('main-content')
  if (main) main.appendChild(nav)
}

function updateBreadcrumbFromScroll() {
  const topics = document.querySelectorAll('[data-topic]')
  if (!topics.length || !currentChapterId) return

  let activeId = null
  const threshold = window.innerHeight * 0.45
  topics.forEach(el => {
    if (el.getBoundingClientRect().top < threshold) activeId = el.dataset.topic
  })

  if (activeId) {
    updateBreadcrumb(currentChapterId, activeId)
    renderTopicNavBar(currentChapterId, activeId)
    // Update dots active state
    document.querySelectorAll('.topic-dot-btn').forEach((dot, i) => {
      const ch = CHAPTER_MANIFEST.find(c => c.id === currentChapterId)
      if (ch) dot.classList.toggle('dot--active', ch.topics[i]?.id === activeId)
    })
  }
}

function updateProgressUI() {
  const prog = Progress.getTotalProgress()

  // Sidebar fill bar
  const fill = document.getElementById('sidebar-progress-fill')
  if (fill) fill.style.width = prog.percent + '%'

  // Topbar ring
  const ring = document.getElementById('progress-ring-fill')
  const text = document.getElementById('topbar-progress-text')
  if (ring) {
    const circumference = 69.1
    const offset = circumference - (prog.percent / 100) * circumference
    ring.style.strokeDashoffset = offset
  }
  if (text) text.textContent = prog.percent + '%'

  // Update aria attributes
  const bar = document.querySelector('.sidebar__progress-bar')
  if (bar) bar.setAttribute('aria-valuenow', prog.percent)
}

/* -------------------------------------------------------
   6. THEME
   ------------------------------------------------------- */

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  const btn = document.getElementById('theme-btn')
  if (btn) btn.textContent = dark ? '🌙' : '☀️'
  const toggle = document.getElementById('dark-mode-toggle')
  if (toggle) toggle.checked = dark
  localStorage.setItem('c_platform_theme', dark ? 'dark' : 'light')
}

/* -------------------------------------------------------
   7. MOBILE SIDEBAR
   ------------------------------------------------------- */

function openSidebar() {
  const sidebar = document.getElementById('sidebar')
  const backdrop = document.getElementById('sidebar-backdrop')
  const btn = document.getElementById('sidebar-toggle-btn')
  sidebar?.classList.add('sidebar--open')
  backdrop?.classList.add('sidebar-backdrop--visible')
  btn?.setAttribute('aria-expanded', 'true')
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar')
  const backdrop = document.getElementById('sidebar-backdrop')
  const btn = document.getElementById('sidebar-toggle-btn')
  sidebar?.classList.remove('sidebar--open')
  backdrop?.classList.remove('sidebar-backdrop--visible')
  btn?.setAttribute('aria-expanded', 'false')
}

/* -------------------------------------------------------
   8. SETTINGS
   ------------------------------------------------------- */

function openSettings() {
  document.getElementById('settings-overlay')?.classList.add('modal-overlay--visible')
  document.body.style.overflow = 'hidden'
}

function closeSettings() {
  document.getElementById('settings-overlay')?.classList.remove('modal-overlay--visible')
  document.body.style.overflow = ''
}

/* -------------------------------------------------------
   9. INIT
   ------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // ── Restore theme ──────────────────────────────────────
  const savedTheme = localStorage.getItem('c_platform_theme') || 'dark'
  applyTheme(savedTheme === 'dark')

  // ── Show app ───────────────────────────────────────────
  const loading = document.getElementById('loading-screen')
  const shell   = document.getElementById('app-shell')
  setTimeout(() => {
    loading?.classList.add('loading-screen--hidden')
    if (shell) shell.style.display = ''
    setTimeout(() => loading?.remove(), 400)
  }, 600)

  // ── Render sidebar ─────────────────────────────────────
  renderSidebar()
  updateProgressUI()

  // ── Load initial chapter — resume from last visited, else first unlocked ──
  const lastVisited = Progress.getLastVisited()
  const resumeChapter = lastVisited
    ? CHAPTER_MANIFEST.find(ch => ch.id === lastVisited.chapterId && isChapterUnlocked(ch))
    : null
  const startChapter = resumeChapter || CHAPTER_MANIFEST.find(ch => isChapterUnlocked(ch))

  if (startChapter) {
    loadChapter(startChapter.id, lastVisited?.chapterId === startChapter.id ? lastVisited.topicId : null)
    expandActiveChapter(startChapter.id)
  }

  // ── Event Listeners ────────────────────────────────────

  // Theme button
  document.getElementById('theme-btn')?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    applyTheme(!isDark)
  })

  // Dark mode toggle (in settings)
  document.getElementById('dark-mode-toggle')?.addEventListener('change', (e) => {
    applyTheme(e.target.checked)
  })

  // Settings open
  document.getElementById('settings-btn')?.addEventListener('click', openSettings)

  // Settings close
  document.getElementById('settings-close')?.addEventListener('click', closeSettings)

  // Click outside settings modal
  document.getElementById('settings-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'settings-overlay') closeSettings()
  })

  // Mobile sidebar toggle
  document.getElementById('sidebar-toggle-btn')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar')
    if (sidebar?.classList.contains('sidebar--open')) {
      closeSidebar()
    } else {
      openSidebar()
    }
  })

  // Mobile backdrop click
  document.getElementById('sidebar-backdrop')?.addEventListener('click', closeSidebar)

  // Font size setting
  document.getElementById('font-size-select')?.addEventListener('change', (e) => {
    const size = e.target.value + 'px'
    document.querySelectorAll('.code-editor').forEach(el => el.style.fontSize = size)
    localStorage.setItem('c_platform_font_size', e.target.value)
  })

  // Restore font size
  const savedSize = localStorage.getItem('c_platform_font_size')
  if (savedSize) {
    const sel = document.getElementById('font-size-select')
    if (sel) sel.value = savedSize
    document.querySelectorAll('.code-editor').forEach(el => el.style.fontSize = savedSize + 'px')
  }

  // Export progress
  document.getElementById('export-btn')?.addEventListener('click', () => {
    Progress.exportProgress()
    Toast.show('Progress exported!', 'success')
  })

  // Reset progress
  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      Progress.resetProgress()
      Toast.show('Progress reset.', 'info')
      renderSidebar()
      updateProgressUI()
    }
  })

  // Keyboard: Escape closes settings
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSettings()
  })

  // Lock chapters toggle
  const lockChaptersToggle = document.getElementById('lock-chapters-toggle')
  if (lockChaptersToggle) {
    lockChaptersToggle.checked = isChapterLockingEnabled()
    lockChaptersToggle.addEventListener('change', (e) => {
      localStorage.setItem('setting_lock_chapters', e.target.checked ? 'true' : 'false')
      renderSidebar()
      expandActiveChapter(currentChapterId)
    })
  }

  // Lock topics toggle
  const lockTopicsToggle = document.getElementById('lock-topics-toggle')
  if (lockTopicsToggle) {
    lockTopicsToggle.checked = isTopicLockingEnabled()
    lockTopicsToggle.addEventListener('change', (e) => {
      localStorage.setItem('setting_lock_topics', e.target.checked ? 'true' : 'false')
      renderSidebar()
      expandActiveChapter(currentChapterId)
    })
  }

  // Import progress
  const importBtn = document.getElementById('import-btn')
  const importFileInput = document.getElementById('import-file-input')
  if (importBtn && importFileInput) {
    importBtn.addEventListener('click', () => importFileInput.click())
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const ok = Progress.importProgress(ev.target.result)
        if (ok) {
          Toast.show('Progress imported!', 'success')
          renderSidebar()
          updateProgressUI()
        } else {
          Toast.show('Import failed — invalid file.', 'error')
        }
        importFileInput.value = ''
      }
      reader.readAsText(file)
    })
  }

  // Global progress update listener
  // Chapters call this after completing topics
  

window.onProgressUpdate = () => {
    renderSidebar()
    updateProgressUI()
    expandActiveChapter(currentChapterId)
  }

  // ── Scroll-based active topic tracking ─────────────────
  // Update sidebar highlight as the user scrolls through topics.
  // Single-topic view: no scroll-based updates needed
  // Topic changes happen explicitly via showTopic()
})
