/* =========================================================
   C INTERACTIVE LEARNING PLATFORM — components/quiz.js
   Quiz engine: MCQ, identify, enumerate, predict, debug
   One question at a time. Animated feedback. Progress dots.
   ========================================================= */

const QuizEngine = (() => {

  /**
   * Render a full quiz section inside a container.
   *
   * config = {
   *   containerId: string,      // DOM id of the container
   *   questions:   QuizItem[],  // array of question configs
   *   onComplete:  function(score, total)  // called when all done
   * }
   *
   * QuizItem = {
   *   id:           string,
   *   type:         'mcq' | 'identify' | 'enumerate' | 'predict' | 'truefalse',
   *   question:     string,
   *   code:         string (optional, for predict type),
   *   options:      string[] (mcq, truefalse),
   *   correct:      string[],
   *   caseSensitive: boolean,
   *   orderMatters: boolean,
   *   hint:         string,
   *   feedback: { correct: string, incorrect: string }
   * }
   */
  function init(config) {
    const { containerId, questions, onComplete } = config
    const container = document.getElementById(containerId)
    if (!container || !questions || !questions.length) return

    let currentIndex = 0
    let score = 0
    const results = new Array(questions.length).fill(null) // null | 'correct' | 'incorrect'

    // Progress dots
    const dotsEl = document.createElement('div')
    dotsEl.className = 'quiz-progress-dots'
    questions.forEach((_, i) => {
      const dot = document.createElement('div')
      dot.className = 'progress-dot' + (i === 0 ? ' progress-dot--active' : '')
      dot.dataset.index = i
      dotsEl.appendChild(dot)
    })
    container.appendChild(dotsEl)

    // Question slot
    const questionSlot = document.createElement('div')
    questionSlot.className = 'quiz-question-slot'
    container.appendChild(questionSlot)

    // Render question at index
    function renderQuestion(index) {
      const q = questions[index]
      questionSlot.innerHTML = ''

      const card = document.createElement('div')
      card.className = 'quiz-card'

      // Header: number + question
      const headerEl = document.createElement('div')
      headerEl.className = 'quiz-card__header'

      const numEl = document.createElement('span')
      numEl.className = 'quiz-card__num'
      numEl.textContent = `Q${index + 1}/${questions.length}`

      const qEl = document.createElement('div')
      qEl.className = 'quiz-card__question'
      qEl.innerHTML = q.question

      headerEl.appendChild(numEl)
      headerEl.appendChild(qEl)
      card.appendChild(headerEl)

      // Code block (for predict type)
      if (q.code) {
        const codeEl = document.createElement('pre')
        codeEl.className = 'quiz-card__code'
        codeEl.textContent = q.code
        card.appendChild(codeEl)
      }

      // Answer area by type
      let answerEl
      if (q.type === 'mcq' || q.type === 'truefalse') {
        answerEl = buildMcqOptions(q, index)
      } else if (q.type === 'identify' || q.type === 'enumerate' || q.type === 'predict') {
        answerEl = buildTextInput(q, index)
      } else {
        answerEl = buildMcqOptions(q, index) // fallback
      }
      card.appendChild(answerEl)

      // Animated feedback icon (mirrors compiler.js .feedback-anim pattern)
      const feedbackIconEl = document.createElement('div')
      feedbackIconEl.className = 'quiz-feedback-icon-wrap'
      feedbackIconEl.innerHTML = `<div class="feedback-anim"></div>`
      card.appendChild(feedbackIconEl)

      // Feedback text (hidden initially, appears after icon animates in)
      const feedbackEl = document.createElement('div')
      feedbackEl.className = 'quiz-feedback-text'
      card.appendChild(feedbackEl)

      // Hint button
      if (q.hint) {
        const hintBtn = document.createElement('button')
        hintBtn.className = 'btn-hint btn--sm'
        hintBtn.style.marginTop = '10px'
        hintBtn.textContent = '💡 Hint'
        const hintText = document.createElement('div')
        hintText.className = 'hint-panel'
        hintText.innerHTML = `<span class="hint-panel__icon">💡</span>${q.hint}`
        hintBtn.addEventListener('click', () => hintText.classList.toggle('hint-panel--visible'))
        card.appendChild(hintBtn)
        card.appendChild(hintText)
      }

      questionSlot.appendChild(card)
    }

    // MCQ / True-False options
    function buildMcqOptions(q, index) {
      const wrap = document.createElement('div')
      wrap.className = 'quiz-options'

      const opts = q.options || ['True', 'False']

      opts.forEach((opt, i) => {
        const btn = document.createElement('button')
        btn.className = 'quiz-option'
        btn.innerHTML = `<span>${escapeHtml(opt)}</span>`
        btn.dataset.value = opt

        btn.addEventListener('click', () => {
          if (btn.disabled) return
          const isCorrect = checkAnswer(q, [opt])

          // Disable all
          wrap.querySelectorAll('.quiz-option').forEach(b => {
            b.disabled = true
            b.classList.add('quiz-option--disabled')
            if (q.correct.includes(b.dataset.value)) b.classList.add('quiz-option--correct')
          })
          btn.classList.add(isCorrect ? 'quiz-option--correct' : 'quiz-option--incorrect')

          handleResult(index, isCorrect, q.feedback)
        })

        wrap.appendChild(btn)
      })

      return wrap
    }

    // Text input (identify, enumerate, predict)
    function buildTextInput(q, index) {
      const wrap = document.createElement('div')
      wrap.className = 'identify-input-wrap'

      const input = document.createElement('input')
      input.type = 'text'
      input.className = 'identify-input'
      input.placeholder = q.type === 'enumerate'
        ? 'Type your answer (separate multiple with commas)'
        : 'Type your answer…'
      input.setAttribute('spellcheck', 'false')

      const submitBtn = document.createElement('button')
      submitBtn.className = 'btn btn--primary btn--sm'
      submitBtn.textContent = 'Check'

      const doCheck = () => {
        const rawValue = input.value.trim()
        if (!rawValue) return

        let answers
        if (q.type === 'enumerate') {
          answers = rawValue.split(',').map(s => s.trim())
        } else {
          answers = [rawValue]
        }

        const isCorrect = checkAnswer(q, answers)

        input.disabled = true
        submitBtn.disabled = true
        input.classList.add(isCorrect ? 'identify-input--correct' : 'identify-input--incorrect')

        handleResult(index, isCorrect, q.feedback)
      }

      submitBtn.addEventListener('click', doCheck)
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck() })

      wrap.appendChild(input)
      wrap.appendChild(submitBtn)
      return wrap
    }

    // Check answer against correct array
    function checkAnswer(q, userAnswers) {
      const normalize = (s) => {
        let v = String(s).trim()
        if (!q.caseSensitive) v = v.toLowerCase()
        return v
      }

      const correctNorm = q.correct.map(normalize)
      const userNorm = userAnswers.map(normalize)

      if (q.type === 'enumerate') {
        if (q.orderMatters) {
          return userNorm.every((u, i) => u === correctNorm[i])
        }
        return userNorm.every(u => correctNorm.includes(u))
      }

      // For single answer types: check if user's answer matches any correct value
      return userNorm.some(u => correctNorm.some(c => u === c || u.includes(c) || c.includes(u)))
    }

    // Handle result: show feedback, update dots, advance
    function handleResult(index, isCorrect, feedback) {
      results[index] = isCorrect ? 'correct' : 'incorrect'
      if (isCorrect) score++

      // Animate dot
      const dot = dotsEl.querySelector(`[data-index="${index}"]`)
      if (dot) {
        dot.classList.remove('progress-dot--active')
        dot.classList.add(isCorrect ? 'progress-dot--correct' : 'progress-dot--incorrect')
      }

      // Show animated icon (same pattern as compiler.js showFeedback)
      const iconEl = document.querySelector('.quiz-feedback-icon-wrap .feedback-anim')
      if (iconEl) {
        iconEl.className = 'feedback-anim'
        void iconEl.offsetWidth // force reflow so the animation restarts
        iconEl.className = `feedback-anim feedback-anim--${isCorrect ? 'correct' : 'incorrect'}`
        iconEl.textContent = isCorrect ? '✓' : '✗'
      }

      // Show feedback text — appears just below the icon, no glyph glued onto it
      const feedbackEl = document.querySelector('.quiz-feedback-text')
      if (feedbackEl && feedback) {
        feedbackEl.className = `quiz-feedback-text quiz-feedback-text--visible quiz-feedback-text--${isCorrect ? 'correct' : 'incorrect'}`
        feedbackEl.textContent = isCorrect ? feedback.correct : feedback.incorrect
      }

      // Advance after delay
      setTimeout(() => {
        currentIndex++
        if (currentIndex < questions.length) {
          // Mark next dot active
          const nextDot = dotsEl.querySelector(`[data-index="${currentIndex}"]`)
          if (nextDot) nextDot.classList.add('progress-dot--active')
          renderQuestion(currentIndex)
        } else {
          showResults()
        }
      }, 1600)
    }

    // Show completion state
    function showResults() {
      questionSlot.innerHTML = ''
      const pct = Math.round((score / questions.length) * 100)

      const resultCard = document.createElement('div')
      resultCard.className = 'quiz-card'
      resultCard.style.textAlign = 'center'
      resultCard.innerHTML = `
        <div style="font-size:48px;margin-bottom:12px">${pct >= 80 ? '✅' : pct >= 60 ? '⚡' : '📚'}</div>
        <div style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:var(--weight-bold);color:var(--color-text);margin-bottom:8px">
          ${score} / ${questions.length} correct
        </div>
        <div style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:20px">
          ${pct >= 80 ? 'Solid — you have this down.' : pct >= 60 ? 'Almost there — review the missed ones.' : 'Review the topic, then try again.'}
        </div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          ${pct < 100 ? `<button class="btn btn--ghost btn--sm" id="quiz-retry-${containerId}">↺ Retry missed</button>` : ''}
        </div>`
      questionSlot.appendChild(resultCard)

      // Wire retry
      const retryBtn = document.getElementById(`quiz-retry-${containerId}`)
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          currentIndex = 0; score = 0
          results.fill(null)
          dotsEl.querySelectorAll('.progress-dot').forEach((d, i) => {
            d.className = 'progress-dot' + (i === 0 ? ' progress-dot--active' : '')
          })
          renderQuestion(0)
        })
      }

      if (onComplete) onComplete(score, questions.length)
    }

    // Start
    renderQuestion(0)
  }

  /* -------------------------------------------------------
     2. INSTANT QUESTION (Step 2 in 7-step flow)
     ------------------------------------------------------- */

  /**
   * Render a single instant question (Step 2).
   *
   * config = {
   *   containerId: string,
   *   question:    string,
   *   options:     string[],
   *   correctIndex: number,
   *   feedback: { correct: string, incorrect: string },
   *   onAnswer: function(correct: bool)
   * }
   */
  function initInstantQuestion(config) {
    const { containerId, question, options, correctIndex, feedback, onAnswer } = config
    const container = document.getElementById(containerId)
    if (!container) return

    // Use long-option detection for single-column layout
    const useSingleCol = options.some(o => o.length > 30)
    const keys = ['A', 'B', 'C', 'D']

    const wrap = document.createElement('div')
    wrap.className = 'iq-block'

    // Header with question
    const header = document.createElement('div')
    header.className = 'iq-block__header'
    header.innerHTML = `
      <span class="iq-block__icon">🤔</span>
      <span class="iq-block__question">${question}</span>`

    // Options grid
    const optionsEl = document.createElement('div')
    optionsEl.className = 'iq-block__options' + (useSingleCol ? ' iq-block__options--single' : '')

    options.forEach((opt, i) => {
      const btn = document.createElement('button')
      btn.className = 'iq-option'
      btn.innerHTML = `<span class="iq-option__key">${keys[i] || i+1}</span><span>${escapeHtml(opt)}</span>`

      btn.addEventListener('click', () => {
        if (btn.classList.contains('iq-option--disabled')) return
        const correct = i === correctIndex

        optionsEl.querySelectorAll('.iq-option').forEach((b, bi) => {
          b.classList.add('iq-option--disabled')
          if (bi === correctIndex) b.classList.add('iq-option--correct')
        })
        if (!correct) btn.classList.add('iq-option--incorrect')

        const fbEl = wrap.querySelector('.iq-feedback')
        if (fbEl) {
          fbEl.className = `iq-feedback iq-feedback--${correct ? 'correct' : 'incorrect'}`
          fbEl.textContent = (correct ? '✓ ' : '✗ ') + (correct ? feedback.correct : feedback.incorrect)
        }

        if (onAnswer) onAnswer(correct)
      })

      optionsEl.appendChild(btn)
    })

    const feedbackEl = document.createElement('div')
    feedbackEl.className = 'iq-feedback'

    wrap.appendChild(header)
    wrap.appendChild(optionsEl)
    wrap.appendChild(feedbackEl)
    container.appendChild(wrap)
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

  return { init, initInstantQuestion }
})()
