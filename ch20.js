/* =============================================================
   C LEARNING PLATFORM — chapters/ch20-congratulations/ch20.js
   Chapter 20: Congratulations — completion page logic
   ============================================================= */

;(function () {
  'use strict'

  const CH = 'ch20'
  function $(id) { return document.getElementById(id) }

  /* ── Confetti ──────────────────────────────────────────── */
  function spawnConfetti () {
    const container = $('ch20-confetti')
    if (!container) return

    const COLORS = [
      '#00d4aa', '#79c0ff', '#f0a847', '#f97583',
      '#3fb950', '#d2a8ff', '#ffa657', '#e3b341'
    ]

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div')
      piece.className = 'confetti-piece'
      piece.style.cssText = [
        'left:'    + Math.random() * 100 + '%',
        'background:' + COLORS[Math.floor(Math.random() * COLORS.length)],
        'width:'   + (Math.random() * 8 + 4) + 'px',
        'height:'  + (Math.random() * 8 + 4) + 'px',
        '--dur:'   + (Math.random() * 2 + 2) + 's',
        '--delay:' + (Math.random() * 1.5) + 's',
        'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px')
      ].join(';')
      container.appendChild(piece)
    }

    /* Spawn a second wave after 2.5s */
    setTimeout(function () {
      container.innerHTML = ''
      for (let i = 0; i < 40; i++) {
        const piece = document.createElement('div')
        piece.className = 'confetti-piece'
        piece.style.cssText = [
          'left:'    + Math.random() * 100 + '%',
          'background:' + COLORS[Math.floor(Math.random() * COLORS.length)],
          'width:'   + (Math.random() * 6 + 3) + 'px',
          'height:'  + (Math.random() * 6 + 3) + 'px',
          '--dur:'   + (Math.random() * 1.5 + 2.5) + 's',
          '--delay:' + (Math.random() * 0.8) + 's',
          'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px')
        ].join(';')
        container.appendChild(piece)
      }
    }, 2500)
  }

  /* ── Animated counter ──────────────────────────────────── */
  function animateCounter (el, target, suffix, duration) {
    if (!el || isNaN(target)) return
    const start = 0
    const startTime = performance.now()
    function tick (now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(start + (target - start) * ease) + suffix
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  /* ── Stats from Progress ───────────────────────────────── */
  function loadStats () {
    /* Count chapters the platform has */
    animateCounter($('stat-chapters'), 20, '',    1200)
    animateCounter($('stat-topics'),   65, '+',   1400)
    animateCounter($('stat-projects'),  3, '',    800)

    /* Lines of C is always a joke number — pick something big */
    const el = $('stat-concepts')
    if (el) {
      let n = 0
      const target = 1337
      const step = () => {
        n += Math.ceil((target - n) * 0.12)
        el.textContent = n >= target ? '∞' : n + '+'
        if (n < target) setTimeout(step, 40)
      }
      setTimeout(step, 600)
    }
  }

  /* ── Certificate year ──────────────────────────────────── */
  function setCertYear () {
    const el = $('cert-year')
    if (el) el.textContent = new Date().getFullYear()
  }

  /* ── Review button ─────────────────────────────────────── */
  function initReviewBtn () {
    const btn = $('ch20-review-btn')
    if (!btn) return
    btn.addEventListener('click', function () {
      /* Navigate back to ch0 */
      if (typeof openSidebar !== 'undefined') {
        openSidebar()
      } else if (typeof loadChapter !== 'undefined') {
        loadChapter('ch0')
      }
    })
  }

  /* ── Certificate save (print dialog) ──────────────────── */
  function initCertBtn () {
    const btn = $('ch20-cert-btn')
    if (!btn) return
    btn.addEventListener('click', function () {
      const cert = $('ch20-certificate')
      if (!cert) { window.print(); return }

      /* Wrap and print just the certificate */
      const printWin = window.open('', '_blank',
        'width=700,height=520,toolbar=0,menubar=0,location=0')
      if (!printWin) { window.print(); return }

      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-bg').trim() || '#0d1117'

      printWin.document.write(
        '<!DOCTYPE html><html><head><title>C Learning Platform — Certificate</title>' +
        '<style>' +
        'body{margin:0;padding:20px;background:' + bg + ';' +
        'font-family:system-ui,sans-serif;display:flex;justify-content:center;}' +
        '.cert-print{border:2px solid #00d4aa;border-radius:16px;' +
        'padding:40px;max-width:600px;text-align:center;color:#c9d1d9;' +
        'background:linear-gradient(135deg,#0d1117 0%,#161b22 50%,#0d1117 100%);' +
        'box-shadow:0 0 60px rgba(0,212,170,0.15);}' +
        '.logo{width:52px;height:52px;border-radius:50%;border:2px solid #00d4aa;' +
        'display:flex;align-items:center;justify-content:center;' +
        'margin:0 auto 16px;font-size:1.4rem;font-weight:bold;color:#00d4aa;' +
        'background:rgba(0,212,170,0.08);}' +
        'h1{font-size:1.8rem;color:#f0f6fc;margin:8px 0;}' +
        '.name{font-size:1.3rem;color:#00d4aa;border-bottom:1px solid rgba(0,212,170,0.3);' +
        'padding-bottom:8px;margin:12px auto;display:inline-block;}' +
        'p{color:#8b949e;font-size:0.9rem;line-height:1.6;max-width:400px;margin:12px auto;}' +
        '.chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px 0;}' +
        '.chips span{font-family:monospace;font-size:11px;color:#00d4aa;' +
        'border:1px solid rgba(0,212,170,0.25);padding:3px 10px;border-radius:999px;}' +
        '.footer{margin-top:24px;font-size:11px;color:#6e7681;letter-spacing:0.04em;}' +
        '@media print{body{background:#fff;}' +
        '.cert-print{color:#111;background:#fff;border-color:#00a57a;}' +
        'h1,.name{color:#007a58;}.chips span{border-color:#007a58;color:#007a58;}}' +
        '</style></head><body>' +
        '<div class="cert-print">' +
        '<div class="logo">C</div>' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6e7681;">C Learning Platform</div>' +
        '<h1>Certificate of Completion</h1>' +
        '<div style="color:#8b949e;font-style:italic;">This certifies that</div>' +
        '<div class="name">— C Programmer —</div>' +
        '<p>has successfully completed all 20 chapters of the C Learning Platform, ' +
        'including 65+ topics, practical assessments, debug challenges, ' +
        'and three complete programs built from scratch.</p>' +
        '<div class="chips">' +
        '<span>Pointers</span><span>Structs</span><span>Dynamic Memory</span>' +
        '<span>Enums</span><span>Macros</span><span>File I/O</span>' +
        '</div>' +
        '<div class="footer">C Learning Platform &nbsp;·&nbsp; ' + new Date().getFullYear() + '</div>' +
        '</div></body></html>'
      )
      printWin.document.close()
      setTimeout(function () { printWin.print() }, 400)
    })
  }

  /* ── Skill chip entrance animation ────────────────────── */
  function animateSkillChips () {
    const chips = document.querySelectorAll('.skill-chip')
    chips.forEach(function (chip, i) {
      chip.style.opacity = '0'
      chip.style.transform = 'translateY(8px)'
      chip.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      setTimeout(function () {
        chip.style.opacity = '1'
        chip.style.transform = 'translateY(0)'
      }, 300 + i * 25)
    })
  }

  /* ── Save completion ───────────────────────────────────── */
  function saveCompletion () {
    if (typeof Progress !== 'undefined') {
      Progress.saveChapterComplete(CH)
    }
    /* Also mark in localStorage directly as a backup */
    try {
      const key = 'cplatform_ch20_done'
      localStorage.setItem(key, Date.now().toString())
    } catch (e) {}
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init () {
    saveCompletion()
    spawnConfetti()
    loadStats()
    setCertYear()
    initReviewBtn()
    initCertBtn()

    /* Delay chip animation to after page paint */
    setTimeout(animateSkillChips, 400)
  }

  if (document.readyState === 'loading') {
    init()
  } else {
    init()
  }

})()
