/* =========================================================
   C INTERACTIVE LEARNING PLATFORM — components/compiler.js
   JSCPP-powered C execution engine + editor block renderer
   ========================================================= */

const CCompiler = (() => {

  /* -------------------------------------------------------
     1. CORE EXECUTION
     ------------------------------------------------------- */

  /**
   * Assemble a full C program from includes array + body code.
   * Called before passing code to JSCPP.
   */
  function assembleProgram(includes, bodyCode) {
    const seen = new Set()
    const includeLines = (includes || ['<stdio.h>'])
      .filter(i => { if (seen.has(i)) return false; seen.add(i); return true; })
      .map(i => `#include ${i}`)
      .join('\n')
    const body = bodyCode.replace(/\[\s*\?\s*\]/g, '').trim()
    return `${includeLines}\n\nint main() {\n${body}\n    return 0;\n}`
  }

  /**
   * Run C source code through JSCPP.
   * Returns { output, errors, success, exitCode }
   */
  function run(sourceCode, inputData = '') {
    if (typeof JSCPP === 'undefined' || window._JSCPPLoadFailed) {
      return {
        output: '',
        errors: [{ line: null, raw: 'JSCPP not loaded.', plain: 'The C compiler library failed to load. Check your internet connection and refresh.' }],
        success: false
      }
    }
    try {
      let output = ''
      const config = {
        stdio: {
          write: (s) => { output += s },
          prompt: () => (inputData || ''),
        },
        maxTimeout: 6000,
        unsigned_overflow: 'warn'
      }
      const exitCode = JSCPP.run(sourceCode, inputData, config)
      return { output, errors: [], success: true, exitCode }
    } catch (err) {
      return { output: '', errors: translateError(err), success: false }
    }
  }

  /**
   * Translate a raw JSCPP error into beginner-friendly messages.
   * Returns array of { line, raw, plain }
   */
  function translateError(err) {
    const raw = (err && (err.message || String(err))) || 'Unknown error'

    const lineMatch = raw.match(/at line\s*(\d+)/i)
      || raw.match(/line\s*(\d+)/i)
      || raw.match(/:(\d+):/i)
      || raw.match(/\((\d+),\d+\)/)
    const lineNumber = lineMatch ? parseInt(lineMatch[1]) : null

    const rules = [
      { pattern: /expected\s*[';']/i,
        plain: 'Missing semicolon — every statement in C must end with <code>;</code>' },
      { pattern: /undeclared|undefined\s+identifier|not defined/i,
        plain: 'You used a name that was never declared. Check your spelling, or declare the variable/function first.' },
      { pattern: /expected\s*['}']|missing\s*}/i,
        plain: 'Missing closing brace <code>}</code> — every <code>{</code> needs a matching <code>}</code>.' },
      { pattern: /expected\s*['{']|missing\s*{/i,
        plain: 'Missing opening brace <code>{</code>.' },
      { pattern: /too\s+few\s+arg/i,
        plain: 'Too few arguments — you called a function with fewer inputs than it requires.' },
      { pattern: /too\s+many\s+arg/i,
        plain: 'Too many arguments — you called a function with more inputs than it accepts.' },
      { pattern: /implicit\s+declaration/i,
        plain: 'Missing header — you used a function without the required <code>#include</code>. Check which header provides it.' },
      { pattern: /incompatible\s+type|cannot\s+convert/i,
        plain: 'Type mismatch — you assigned a value of the wrong type. Check your variable type matches what you\'re assigning.' },
      { pattern: /division\s+by\s+zero|divide\s+by\s+zero/i,
        plain: 'Division by zero — your program tried to divide a number by 0. Check your denominator.' },
      { pattern: /timeout|\[Timeout\]/i,
        plain: 'Infinite loop — your program ran too long. Check that your loop has a condition that becomes false.' },
      { pattern: /invalid\s+operand|invalid\s+type/i,
        plain: 'Invalid operation — you used an operator on a type that doesn\'t support it.' },
      { pattern: /redeclared|already\s+declared/i,
        plain: 'You declared the same variable name twice in the same scope.' },
      { pattern: /assignment.*const|read.only/i,
        plain: 'You tried to change a constant — variables declared with <code>const</code> cannot be modified.' },
      { pattern: /format\s+specifier|format\s+string/i,
        plain: 'Wrong format specifier — check that <code>%d</code>, <code>%f</code>, <code>%c</code>, <code>%s</code> match your variable types.' },
      { pattern: /missing\s+return|no\s+return/i,
        plain: 'Missing return — your function is supposed to return a value but doesn\'t have a <code>return</code> statement.' }
    ]

    let plain = 'Error in your code — read the raw error below for details.'
    for (const r of rules) {
      if (r.pattern.test(raw)) { plain = r.plain; break }
    }

    return [{ line: lineNumber, raw, plain }]
  }

  /* -------------------------------------------------------
     2. EDITOR BLOCK RENDERER
     ------------------------------------------------------- */

  /**
   * Initialize a compiler block inside a container element.
   *
   * config = {
   *   mode:        'explore' | 'modify' | 'fill' | 'predict' | 'debug' | 'build'
   *   topicId:     string
   *   question:    string (HTML, shown above editor with color)
   *   includes:    string[]   (e.g. ['<stdio.h>', '<string.h>'])
   *   boilerplate: string[]   (dimmed lines — header + main wrapper)
   *   starterCode: string     (editable portion, pre-filled)
   *   expected:    string | string[] | null  (for validation)
   *   checkFn:     function(output) => bool  (custom validator)
   *   hint:        string
   *   hintTwo:     string
   *   solution:    string     (full editable code for Show Solution)
   *   browserLimit: boolean   (Ch18+ notice)
   *   onPass:      function() (called when exercise passes)
   * }
   */
  function initBlock(container, config) {
    if (!container) return

    const {
      mode        = 'explore',
      question    = '',
      includes    = ['<stdio.h>'],
      starterCode = '',
      expected    = null,
      checkFn     = null,
      hint        = '',
      hintTwo     = '',
      solution    = '',
      browserLimit = false,
      onPass      = null
    } = config

    // Build boilerplate for display (always dimmed)
    const includeLines = [...new Set(includes)].map(i => `#include ${i}`).join('\n')
    const boilerplateTop = `${includeLines}\n\nint main() {`
    const boilerplateBot = `    return 0;\n}`

    let attemptCount = 0
    let passed = false
    let hintShown = false

    // ── Build HTML ──────────────────────────────────────────
    container.classList.add('compiler-block')

    // Question label (colored by mode)
    if (question) {
      const qClass = {
        modify:  'compiler-block__question--task',
        build:   'compiler-block__question--task',
        debug:   'compiler-block__question--debug',
        predict: 'compiler-block__question--predict',
        fill:    'compiler-block__question--predict',
        explore: ''
      }[mode] || ''

      const icon = {
        explore: '▶',
        modify:  '✏️',
        fill:    '⬜',
        predict: '🔮',
        debug:   '🐛',
        build:   '🔨'
      }[mode] || '▶'

      const qEl = document.createElement('div')
      qEl.className = `compiler-block__question ${qClass}`
      qEl.innerHTML = `<span class="compiler-block__question-icon">${icon}</span><span>${question}</span>`
      container.appendChild(qEl)
    }

    // Browser limit notice
    if (browserLimit) {
      const notice = document.createElement('div')
      notice.className = 'browser-limit-notice'
      notice.innerHTML = `<span>⚠</span>
        <details>
          <summary><strong>Browser Limitation</strong> — This exercise uses malloc / file I/O. The editor checks your syntax. For full output, run in VS Code with GCC.</summary>
          <ol class="browser-limit-steps">
            <li>Copy the code above.</li>
            <li>Paste it into a file named <code>main.c</code>.</li>
            <li>In your terminal: <code>gcc main.c -o main && ./main</code></li>
          </ol>
        </details>`
      container.appendChild(notice)
    }

    // Two-panel layout
    const panels = document.createElement('div')
    panels.className = 'compiler-block__panels'

    // —— Editor panel ——
    const editorPanel = document.createElement('div')
    editorPanel.className = 'compiler-block__editor-panel'

    const editorHeader = document.createElement('div')
    editorHeader.className = 'panel-header'
    editorHeader.innerHTML = `
      <div class="panel-header__dots">
        <span class="panel-header__dot panel-header__dot--red"></span>
        <span class="panel-header__dot panel-header__dot--yellow"></span>
        <span class="panel-header__dot panel-header__dot--green"></span>
      </div>
      <span class="panel-header__label">main.c</span>
      <span class="panel-header__lang-badge">C</span>`

    const editorWrap = document.createElement('div')
    editorWrap.className = 'code-editor-wrap'

    const lineNumbers = document.createElement('div')
    lineNumbers.className = 'line-numbers'

    const textarea = document.createElement('textarea')
    textarea.className = 'code-editor'
    textarea.setAttribute('spellcheck', 'false')
    textarea.setAttribute('autocomplete', 'off')
    textarea.setAttribute('autocorrect', 'off')
    textarea.setAttribute('autocapitalize', 'off')

    // For predict mode: show code read-only, add predict input below
    if (mode === 'predict') {
      textarea.readOnly = true
      textarea.style.opacity = '0.85'
      textarea.setAttribute('aria-label', 'Read-only C code for output prediction')
    }

    editorWrap.appendChild(lineNumbers)
    editorWrap.appendChild(textarea)
    editorPanel.appendChild(editorHeader)
    editorPanel.appendChild(editorWrap)

    // —— Output panel ——
    const outputPanel = document.createElement('div')
    outputPanel.className = 'compiler-block__output-panel'

    const outputHeader = document.createElement('div')
    outputHeader.className = 'panel-header'
    outputHeader.innerHTML = `
      <div class="panel-header__dots">
        <span class="panel-header__dot panel-header__dot--red"></span>
        <span class="panel-header__dot panel-header__dot--yellow"></span>
        <span class="panel-header__dot panel-header__dot--green"></span>
      </div>
      <span class="panel-header__label">output</span>`

    const outputArea = document.createElement('div')
    outputArea.className = 'output-area output-area--empty'
    outputArea.textContent = '— run to see output —'

    // Predict input area (only for predict mode)
    let predictInput = null
    if (mode === 'predict') {
      const predictWrap = document.createElement('div')
      predictWrap.style.cssText = 'padding:10px 14px; border-top:1px solid var(--color-border);'

      const predictLabel = document.createElement('div')
      predictLabel.className = 'predict-label'
      predictLabel.textContent = 'Your predicted output:'

      predictInput = document.createElement('textarea')
      predictInput.className = 'predict-input'
      predictInput.placeholder = 'Type what you think the output will be…'
      predictInput.setAttribute('spellcheck', 'false')

      predictWrap.appendChild(predictLabel)
      predictWrap.appendChild(predictInput)
      outputPanel.appendChild(outputHeader)
      outputPanel.appendChild(outputArea)
      outputPanel.appendChild(predictWrap)
    } else {
      outputPanel.appendChild(outputHeader)
      outputPanel.appendChild(outputArea)
    }

    panels.appendChild(editorPanel)
    panels.appendChild(outputPanel)
    container.appendChild(panels)

    // —— Toolbar ——
    const toolbar = document.createElement('div')
    toolbar.className = 'compiler-toolbar'

    const runBtn = document.createElement('button')
    runBtn.className = 'btn-run'
    runBtn.innerHTML = '▶ Run'
    runBtn.setAttribute('aria-label', 'Run code')

    const resetBtn = document.createElement('button')
    resetBtn.className = 'btn-reset'
    resetBtn.innerHTML = '↺ Reset'
    resetBtn.setAttribute('aria-label', 'Reset code')

    const hintBtn = document.createElement('button')
    hintBtn.className = 'btn-hint'
    hintBtn.innerHTML = '💡 Hint'
    hintBtn.style.display = hint ? 'inline-flex' : 'none'

    const solutionBtn = document.createElement('button')
    solutionBtn.className = 'btn-solution'
    solutionBtn.innerHTML = '👁 Solution'
    solutionBtn.style.display = 'none'

    const spacer = document.createElement('span')
    spacer.className = 'compiler-toolbar__spacer'

    const attemptEl = document.createElement('span')
    attemptEl.className = 'attempt-counter'

    // Check button for modes that validate
    let checkBtn = null
    if (['modify', 'fill', 'build', 'debug'].includes(mode)) {
      checkBtn = document.createElement('button')
      checkBtn.className = 'btn-check'
      checkBtn.innerHTML = '✓ Check'
    }

    toolbar.appendChild(runBtn)
    if (checkBtn) toolbar.appendChild(checkBtn)
    toolbar.appendChild(resetBtn)
    toolbar.appendChild(hintBtn)
    if (solution) toolbar.appendChild(solutionBtn)
    toolbar.appendChild(spacer)
    toolbar.appendChild(attemptEl)

    // Font-size toggle — helps mobile readability
    const fontBtn = document.createElement('button')
    fontBtn.className = 'btn-font-size'
    fontBtn.title = 'Toggle font size'
    fontBtn.setAttribute('aria-label', 'Toggle font size')
    fontBtn.innerHTML = '<span aria-hidden="true">A<sup>+</sup></span>'
    let fontLarge = false
    fontBtn.addEventListener('click', () => {
      fontLarge = !fontLarge
      const ed = container.querySelector('.code-editor')
      const out = container.querySelector('.output-area')
      if (ed)  ed.style.fontSize  = fontLarge ? '16px' : ''
      if (out) out.style.fontSize = fontLarge ? '15px' : ''
      fontBtn.classList.toggle('btn-font-size--active', fontLarge)
    })
    toolbar.appendChild(fontBtn)
    container.appendChild(toolbar)

    // —— Hint panel ——
    const hintPanel = document.createElement('div')
    hintPanel.className = 'hint-panel'
    hintPanel.innerHTML = `<span class="hint-panel__icon">💡</span><span class="hint-text">${hint}</span>`
    container.appendChild(hintPanel)

    // —— Error panel (hidden by default) ——
    const errorPanel = document.createElement('div')
    errorPanel.className = 'error-panel'
    errorPanel.style.display = 'none'
    container.appendChild(errorPanel)

    // —— Feedback animation ——
    const feedbackAnim = document.createElement('div')
    feedbackAnim.className = 'feedback-anim'
    outputPanel.style.position = 'relative'
    outputPanel.appendChild(feedbackAnim)

    // ── Set initial code ────────────────────────────────────
    function buildEditorContent() {
      if (mode === 'build') {
        // Show full boilerplate dimmed, cursor at body
        return `${boilerplateTop}\n    // write your code here\n${boilerplateBot}`
      }
      if (mode === 'explore' || mode === 'modify' || mode === 'debug' || mode === 'predict' || mode === 'fill') {
        // Full program provided as starterCode (includes boilerplate)
        return starterCode
      }
      return starterCode
    }

    const initialCode = buildEditorContent()
    textarea.value = initialCode
    updateLineNumbers()

    // For build mode: track editable region
    if (mode === 'build') {
      textarea.addEventListener('keydown', (e) => {
        // Prevent editing boilerplate — simple heuristic: protect first 2 lines and last 2 lines
        const lines = textarea.value.split('\n')
        const cursorPos = textarea.selectionStart
        let charCount = 0
        let cursorLine = 0
        for (let i = 0; i < lines.length; i++) {
          charCount += lines[i].length + 1
          if (charCount > cursorPos) { cursorLine = i; break }
        }
        const protectedTop = includes.length + 2 // include lines + empty + int main() {
        const protectedBot = 2 // return 0; and }
        const totalLines = lines.length
        if (cursorLine < protectedTop || cursorLine >= totalLines - protectedBot) {
          if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key)) {
            e.preventDefault()
          }
        }
      })
    }

    // ── Line numbers ─────────────────────────────────────────
    function updateLineNumbers(errorLine = null) {
      const lines = textarea.value.split('\n')
      lineNumbers.innerHTML = ''
      lines.forEach((_, i) => {
        const num = document.createElement('span')
        num.className = 'line-number' + (errorLine === i + 1 ? ' line-number--error' : '')
        num.textContent = i + 1
        lineNumbers.appendChild(num)
      })
      // Sync scroll
      lineNumbers.scrollTop = textarea.scrollTop
    }

    textarea.addEventListener('input', () => updateLineNumbers())
    textarea.addEventListener('scroll', () => { lineNumbers.scrollTop = textarea.scrollTop })

    // Tab key support
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end)
        textarea.selectionStart = textarea.selectionEnd = start + 4
        updateLineNumbers()
      }
    })

    // ── Show feedback animation ───────────────────────────────
    function showFeedback(correct) {
      feedbackAnim.className = 'feedback-anim'
      void feedbackAnim.offsetWidth // reflow
      feedbackAnim.className = `feedback-anim feedback-anim--${correct ? 'correct' : 'incorrect'}`
      feedbackAnim.textContent = correct ? '✓' : '✗'
      setTimeout(() => { feedbackAnim.className = 'feedback-anim' }, 2000)
    }

    // ── Show error panel ─────────────────────────────────────
    function showError(errors) {
      if (!errors || !errors.length) return
      const e = errors[0]
      errorPanel.style.display = 'block'
      errorPanel.innerHTML = `
        <div class="error-panel__header">
          <span>✗ Compiler Error</span>
          ${e.line ? `<span class="error-panel__line-ref">Line ${e.line}</span>` : ''}
        </div>
        <div class="error-panel__message">${e.plain}</div>
        <details class="error-panel__raw">
          <summary>Show raw error ▼</summary>
          <pre class="error-panel__raw-code">${escapeHtml(e.raw)}</pre>
        </details>`
      updateLineNumbers(e.line)
    }

    function clearError() {
      errorPanel.style.display = 'none'
      updateLineNumbers()
    }

    // ── Validate output ──────────────────────────────────────
    function validate(output) {
      if (checkFn) return checkFn(output)
      if (!expected) return true
      const targets = Array.isArray(expected) ? expected : [expected]
      const trimmed = output.trim()
      return targets.some(t => trimmed === t.trim() || output.includes(t.trim()))
    }

    // ── RUN button ───────────────────────────────────────────
    runBtn.addEventListener('click', async () => {
      if (runBtn.classList.contains('btn-run--running')) return

      runBtn.classList.add('btn-run--running')
      runBtn.textContent = '… Running'
      clearError()
      outputArea.className = 'output-area'
      outputArea.textContent = ''

      // Assemble program
      let code = textarea.value

      // For build mode: wrap user body in boilerplate
      if (mode === 'build') {
        const body = extractBuildBody(textarea.value, includes)
        code = assembleProgram(includes, body)
      }

      // Small async tick to let UI update
      await new Promise(r => setTimeout(r, 30))

      const result = run(code)

      runBtn.classList.remove('btn-run--running')
      runBtn.textContent = '▶ Run'

      if (result.success) {
        outputArea.className = 'output-area output-area--success'
        outputArea.textContent = result.output || '(no output)'

        // For predict mode: compare after running
        if (mode === 'predict' && predictInput) {
          const userPred = predictInput.value.trim()
          const actual = result.output.trim()
          if (userPred) {
            const match = userPred === actual
            showFeedback(match)
            if (!match) {
              errorPanel.style.display = 'block'
              errorPanel.innerHTML = `
                <div class="error-panel__header" style="color:var(--color-hint)">
                  <span>Prediction vs Actual</span>
                </div>
                <div class="error-panel__message">
                  <strong>Your prediction:</strong><br><code>${escapeHtml(userPred)}</code><br><br>
                  <strong>Actual output:</strong><br><code>${escapeHtml(actual)}</code>
                </div>`
            } else if (!passed && onPass) {
              passed = true; onPass()
            }
          } else if (!passed && onPass) {
            passed = true; onPass()
          }
        } else if (mode === 'explore' && !passed && onPass) {
          passed = true; onPass()
        }
      } else {
        outputArea.className = 'output-area output-area--error'
        outputArea.textContent = '✗ Compile error'
        showError(result.errors)
        showFeedback(false)

        attemptCount++
        updateAttemptCounter()
        if (attemptCount >= 1 && hint) {
          solutionBtn.style.display = solution ? 'inline-flex' : 'none'
        }
      }
    })

    // ── CHECK button ─────────────────────────────────────────
    if (checkBtn) {
      checkBtn.addEventListener('click', async () => {
        if (passed) return
        clearError()

        let code = textarea.value
        if (mode === 'build') {
          const body = extractBuildBody(textarea.value, includes)
          code = assembleProgram(includes, body)
        }

        await new Promise(r => setTimeout(r, 30))
        const result = run(code)

        if (!result.success) {
          outputArea.className = 'output-area output-area--error'
          outputArea.textContent = '✗ Compile error'
          showError(result.errors)
          showFeedback(false)
          attemptCount++
          updateAttemptCounter()
          if (attemptCount >= 1 && solution) solutionBtn.style.display = 'inline-flex'
          return
        }

        outputArea.className = 'output-area output-area--success'
        outputArea.textContent = result.output || '(no output)'

        const ok = validate(result.output)
        showFeedback(ok)

        if (ok) {
          if (!passed && onPass) { passed = true; onPass() }
          checkBtn.disabled = true
          checkBtn.style.opacity = '0.5'
        } else {
          attemptCount++
          updateAttemptCounter()
          if (hint && attemptCount >= 1) hintPanel.classList.add('hint-panel--visible')
          if (hintTwo && attemptCount >= 2) {
            hintPanel.querySelector('.hint-text').innerHTML = hintTwo
          }
          if (solution && attemptCount >= 3) solutionBtn.style.display = 'inline-flex'
        }
      })
    }

    // ── RESET button ─────────────────────────────────────────
    resetBtn.addEventListener('click', () => {
      textarea.value = initialCode
      outputArea.className = 'output-area output-area--empty'
      outputArea.textContent = '— run to see output —'
      clearError()
      hintPanel.classList.remove('hint-panel--visible')
      feedbackAnim.className = 'feedback-anim'
      if (predictInput) predictInput.value = ''
      updateLineNumbers()
    })

    // ── HINT button ───────────────────────────────────────────
    hintBtn.addEventListener('click', () => {
      hintPanel.classList.toggle('hint-panel--visible')
      hintShown = true
    })

    // ── SOLUTION button ───────────────────────────────────────
    solutionBtn.addEventListener('click', () => {
      if (solution) {
        textarea.value = solution
        updateLineNumbers()
      }
    })

    // ── Attempt counter ───────────────────────────────────────
    function updateAttemptCounter() {
      if (attemptCount > 0) {
        attemptEl.textContent = `${attemptCount} attempt${attemptCount > 1 ? 's' : ''}`
      }
    }
  }

  /* -------------------------------------------------------
     3. UTILITIES
     ------------------------------------------------------- */

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  /**
   * Extract just the body from a build-mode editor value.
   * Strips the boilerplate lines.
   */
  function extractBuildBody(fullCode, includes) {
    const lines = fullCode.split('\n')
    const skipCount = includes.length + 2 // includes + blank + int main() {
    const bodyLines = lines.slice(skipCount, -2) // remove last 2: return 0; and }
    return bodyLines.join('\n')
  }

  /* Public API */
  return { run, translateError, assembleProgram, initBlock }
})()
