/* =========================================================
   C INTERACTIVE LEARNING PLATFORM — components/progress.js
   All localStorage read / write / export logic
   ========================================================= */

const Progress = (() => {

  const STORAGE_KEY = 'c_platform_progress_v1'

  /* -------------------------------------------------------
     1. INTERNAL HELPERS
     ------------------------------------------------------- */

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch { return {} }
  }

  function save(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch { /* quota */ }
  }

  function getOrCreate(data, chapterId) {
    if (!data[chapterId]) {
      data[chapterId] = { topics: {}, quizScores: {}, chapterComplete: false }
    }
    return data[chapterId]
  }

  /* -------------------------------------------------------
     2. TOPIC / STEP PROGRESS
     ------------------------------------------------------- */

  function saveTopicComplete(chapterId, topicId) {
    const data = load()
    const ch = getOrCreate(data, chapterId)
    if (!ch.topics[topicId]) ch.topics[topicId] = {}
    ch.topics[topicId].complete = true
    ch.topics[topicId].completedAt = Date.now()
    save(data)
  }

  function saveStepComplete(chapterId, topicId, stepId) {
    const data = load()
    const ch = getOrCreate(data, chapterId)
    if (!ch.topics[topicId]) ch.topics[topicId] = {}
    if (!ch.topics[topicId].steps) ch.topics[topicId].steps = {}
    ch.topics[topicId].steps[stepId] = true
    save(data)
  }

  function isStepComplete(chapterId, topicId, stepId) {
    const data = load()
    return !!(data[chapterId]?.topics[topicId]?.steps?.[stepId])
  }

  function isTopicComplete(chapterId, topicId) {
    const data = load()
    return !!(data[chapterId]?.topics[topicId]?.complete)
  }

  /* -------------------------------------------------------
     3. QUIZ SCORES
     ------------------------------------------------------- */

  function saveQuizScore(chapterId, quizId, score, total) {
    const data = load()
    const ch = getOrCreate(data, chapterId)
    if (!ch.quizScores[quizId]) ch.quizScores[quizId] = { attempts: 0, bestScore: 0, bestTotal: 0 }
    ch.quizScores[quizId].attempts++
    if (score > ch.quizScores[quizId].bestScore) {
      ch.quizScores[quizId].bestScore = score
      ch.quizScores[quizId].bestTotal = total
    }
    ch.quizScores[quizId].lastScore = score
    ch.quizScores[quizId].lastTotal = total
    ch.quizScores[quizId].lastAt = Date.now()
    save(data)
  }

  function getQuizScore(chapterId, quizId) {
    const data = load()
    return data[chapterId]?.quizScores[quizId] || null
  }

  /* -------------------------------------------------------
     4. CHAPTER PROGRESS QUERIES
     ------------------------------------------------------- */

  function getChapterProgress(chapterId) {
    const data = load()
    const ch = data[chapterId]
    if (!ch) return { status: 'locked', topicsComplete: 0, topicsTotal: 0, percent: 0 }

    const topics = Object.values(ch.topics || {})
    const complete = topics.filter(t => t.complete).length
    const total = topics.length

    return {
      status: ch.chapterComplete ? 'complete' : complete > 0 ? 'in-progress' : 'unlocked',
      topicsComplete: complete,
      topicsTotal: total,
      percent: total > 0 ? Math.round((complete / total) * 100) : 0,
      chapterComplete: !!ch.chapterComplete
    }
  }

  function getTopicProgress(chapterId, topicId) {
    const data = load()
    const topic = data[chapterId]?.topics[topicId]
    if (!topic) return { status: 'unlocked', stepsComplete: 0, complete: false }
    const steps = Object.keys(topic.steps || {}).length
    return { status: topic.complete ? 'complete' : steps > 0 ? 'in-progress' : 'unlocked', stepsComplete: steps, complete: !!topic.complete }
  }

  function getAllProgress() {
    return load()
  }

  /* -------------------------------------------------------
     5. CHAPTER UNLOCK LOGIC
     ------------------------------------------------------- */

  /**
   * A chapter is unlocked if:
   *   - It is ch0 (always unlocked)
   *   - The previous chapter is marked complete
   */
  function isChapterUnlocked(chapterId) {
    const id = parseInt(chapterId.replace(/\D/g, ''))
    if (id === 0) return true
    const data = load()
    const prevId = `ch${id - 1}`
    return !!(data[prevId]?.chapterComplete)
  }

  function saveChapterComplete(chapterId) {
    const data = load()
    const ch = getOrCreate(data, chapterId)
    ch.chapterComplete = true
    ch.completedAt = Date.now()
    save(data)
  }

  /* -------------------------------------------------------
     6. OVERALL STATS
     ------------------------------------------------------- */

  function getTotalProgress() {
    const data = load()
    const chapters = Object.keys(data)
    const totalChapters = 21 // ch0 - ch20
    const complete = chapters.filter(id => data[id]?.chapterComplete).length
    return {
      chaptersComplete: complete,
      chaptersTotal: totalChapters,
      percent: Math.round((complete / totalChapters) * 100)
    }
  }

  /* -------------------------------------------------------
     7. RESET / EXPORT
     ------------------------------------------------------- */

  function resetProgress() {
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* */ }
  }

  function exportProgress() {
    const data = load()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `c_platform_progress_${new Date().toISOString().slice(0,10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importProgress(jsonString) {
    try {
      const data = JSON.parse(jsonString)
      save(data)
      return true
    } catch { return false }
  }

  function saveLastVisited(chapterId, topicId) {
    const data = load()
    data._lastVisited = { chapterId, topicId: topicId || null, ts: Date.now() }
    save(data)
  }

  function getLastVisited() {
    const data = load()
    return data._lastVisited || null
  }

  /* Public API */
  return {
    saveTopicComplete,
    saveStepComplete,
    isStepComplete,
    isTopicComplete,
    saveQuizScore,
    getQuizScore,
    getChapterProgress,
    getTopicProgress,
    getAllProgress,
    isChapterUnlocked,
    saveChapterComplete,
    getTotalProgress,
    resetProgress,
    exportProgress,
    importProgress,
    saveLastVisited,
    getLastVisited
  }
})()
