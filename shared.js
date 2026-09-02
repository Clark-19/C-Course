/* =========================================================
   C INTERACTIVE LEARNING PLATFORM — shared/shared.js
   Global utilities used by all chapter JS files
   ========================================================= */

/* -------------------------------------------------------
   1. STEP REVEAL SYSTEM
   ------------------------------------------------------- */

/**
 * StepManager: reveals steps one at a time as they are completed.
 * Usage:
 *   const sm = StepManager.init('topic-id', 7, chapterId)
 *   sm.complete(1)   // reveals step 2
 */
const StepManager = (() => {

  function init(topicId, totalSteps, chapterId) {
    const steps = {}
    let highestUnlocked = 1

    // Load previously completed steps from Progress
    for (let i = 1; i <= totalSteps; i++) {
      if (Progress.isStepComplete(chapterId, topicId, `step${i}`)) {
        highestUnlocked = i + 1
        steps[i] = true
      }
    }

    // Reveal all steps up to highestUnlocked — directly (no RAF) so they
    // are always visible immediately even if JS runs late or CDN is blocked.
    for (let i = 1; i <= Math.min(highestUnlocked, totalSteps); i++) {
      _revealStep(topicId, i, false)
    }

    function complete(stepNum) {
      steps[stepNum] = true
      Progress.saveStepComplete(chapterId, topicId, `step${stepNum}`)

      // Reveal next step with animation
      const next = stepNum + 1
      if (next <= totalSteps) {
        highestUnlocked = Math.max(highestUnlocked, next)
        _revealStep(topicId, next, true)
      }
    }

    function isComplete(stepNum) {
      return !!steps[stepNum]
    }

    return { complete, isComplete }
  }

  function _revealStep(topicId, stepNum, animate = true) {
    const topic = document.querySelector(`[data-topic="${topicId}"]`)
    if (!topic) return
    const step = topic.querySelector(`[data-step="${stepNum}"]`)
    if (!step) return

    if (animate) {
      requestAnimationFrame(() => {
        step.classList.add('step--visible')
        // Scroll to newly revealed step without forcing a synchronous reflow
        setTimeout(() => {
          const rect = step.getBoundingClientRect()
          const main = document.getElementById('main-content') || document.documentElement
          if (rect.top > window.innerHeight * 0.85) {
            main.scrollBy({ top: rect.top - 120, behavior: 'smooth' })
          }
        }, 100)
      })
    } else {
      // Direct reveal — no animation, no RAF, guaranteed to show immediately
      step.classList.add('step--visible')
    }
  }

  return { init }
})()

/* -------------------------------------------------------
   2. TOAST NOTIFICATIONS
   ------------------------------------------------------- */

const Toast = (() => {
  let container = null

  function _ensureContainer() {
    if (!container) {
      container = document.createElement('div')
      container.className = 'toast-container'
      document.body.appendChild(container)
    }
  }

  function show(message, type = 'info', duration = 3000) {
    _ensureContainer()
    const toast = document.createElement('div')
    toast.className = `toast toast--${type}`

    const icon = { success: '✓', error: '✗', info: 'ℹ' }[type] || 'ℹ'
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`

    container.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transform = 'translateX(20px)'
      toast.style.transition = 'all 0.3s ease'
      setTimeout(() => toast.remove(), 350)
    }, duration)
  }

  return { show }
})()

/* -------------------------------------------------------
   3. MODAL (pop-up quizzes)
   ------------------------------------------------------- */

const Modal = (() => {
  let overlay = null
  let modalEl = null

  function _ensure() {
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.className = 'modal-overlay'
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close() })

      modalEl = document.createElement('div')
      modalEl.className = 'modal'
      overlay.appendChild(modalEl)
      document.body.appendChild(overlay)

      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
    }
  }

  function open(contentHTML, title = '', variant = '') {
    _ensure()
    modalEl.className = 'modal' + (variant ? ` modal--${variant}` : '')
    modalEl.innerHTML = `
      <div class="modal__header">
        <div class="modal__title">${title}</div>
        <button class="modal__close" aria-label="Close">✕</button>
      </div>
      <div class="modal__body">${contentHTML}</div>`
    modalEl.querySelector('.modal__close').addEventListener('click', close)
    overlay.classList.add('modal-overlay--visible')
    document.body.style.overflow = 'hidden'
  }

  function close() {
    if (!overlay) return
    overlay.classList.remove('modal-overlay--visible')
    document.body.style.overflow = ''
  }

  function setContent(html) {
    if (modalEl) {
      const body = modalEl.querySelector('.modal__body')
      if (body) body.innerHTML = html
    }
  }

  return { open, close, setContent }
})()

/* -------------------------------------------------------
   3b. ASSESSMENT MODAL WIRING
   Enforces correct sequencing: Modal.open() must finish inserting
   the assessment HTML into the live DOM BEFORE QuizEngine.init()/
   CCompiler.initBlock() run against those container ids — otherwise
   getElementById() returns null and those calls silently no-op.
   ------------------------------------------------------- */

function openAssessmentModal(topicId, title, renderFn) {
  const sourceEl = document.getElementById(`modal-content-${topicId}`)
  if (!sourceEl) {
    console.error(`openAssessmentModal: no #modal-content-${topicId} found`)
    return
  }
  // Step 1: HTML goes into the modal's DOM first.
  Modal.open(sourceEl.innerHTML, title, 'assessment')
  // Step 2: tab switching wired against the now-live elements.
  setupModalAssessmentTabs(topicId)
  // Step 3: only now do quiz/compiler containers actually exist —
  // safe to call renderFn, which does the QuizEngine.init() /
  // CCompiler.initBlock() calls for this topic's assessment.
  if (renderFn) renderFn()
}

function setupModalAssessmentTabs(topicId) {
  const modalBody = document.querySelector('.modal__body')
  if (!modalBody) return
  const tabs = modalBody.querySelectorAll('.assessment-tab')
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab
      tabs.forEach(t => t.classList.remove('assessment-tab--active'))
      tab.classList.add('assessment-tab--active')
      modalBody.querySelectorAll('.assessment-section').forEach(s => s.classList.remove('assessment-section--active'))
      const target = modalBody.querySelector(`#tab-${tabName}-${topicId}`)
      if (target) target.classList.add('assessment-section--active')
    })
  })
}



function showTopicComplete(topicId, nextTopicTitle = '') {
  const topic = document.querySelector(`[data-topic="${topicId}"]`)
  if (!topic) return

  let banner = topic.querySelector('.topic-complete-banner')
  if (!banner) {
    banner = document.createElement('div')
    banner.className = 'topic-complete-banner'
    banner.innerHTML = `
      <span class="topic-complete-banner__check">✅</span>
      <span class="topic-complete-banner__text">Topic complete! ${nextTopicTitle ? `Next: <strong>${nextTopicTitle}</strong>` : 'Chapter complete!'}</span>
      ${nextTopicTitle ? `<button class="topic-complete-banner__next">Continue →</button>` : ''}`
    topic.appendChild(banner)

    const nextBtn = banner.querySelector('.topic-complete-banner__next')
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const next = topic.nextElementSibling
        if (next && next.classList.contains('topic')) {
          next.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }
  banner.classList.add('topic-complete-banner--visible')
}

/* -------------------------------------------------------
   5. SYNTAX HIGHLIGHT (basic, for compiler output)
   ------------------------------------------------------- */

const Highlight = (() => {
  const KEYWORDS = ['auto','break','case','char','const','continue','default','do','double',
    'else','enum','extern','float','for','goto','if','int','long','register','return',
    'short','signed','sizeof','static','struct','switch','typedef','union','unsigned',
    'void','volatile','while','printf','scanf','main','include','define','NULL','true','false']

  function syntax(code) {
    // Order matters: comments first, then strings, then keywords
    let result = escapeHtml(code)

    // Single-line comments
    result = result.replace(/(\/\/[^\n]*)/g, '<span class="cmt">$1</span>')
    // Multi-line comments
    result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="cmt">$1</span>')
    // String literals
    result = result.replace(/(&quot;[^&]*?&quot;)/g, '<span class="str">$1</span>')
    // Char literals
    result = result.replace(/('.')/g, '<span class="str">$1</span>')
    // Preprocessor
    result = result.replace(/(#\w+)/g, '<span class="mac">$1</span>')
    // Numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>')
    // Keywords
    const kwPattern = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g')
    result = result.replace(kwPattern, '<span class="kw">$1</span>')

    return result
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
  }

  return { syntax }
})()

/* -------------------------------------------------------
   6. MISC UTILITIES
   ------------------------------------------------------- */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function debounce(fn, delay) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay) }
}

function $(selector, context = document) {
  return context.querySelector(selector)
}

function $$(selector, context = document) {
  return [...context.querySelectorAll(selector)]
}
