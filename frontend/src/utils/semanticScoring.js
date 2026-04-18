// frontend/src/utils/semanticScoring.js
// Lazy-loaded — @xenova/transformers is NOT statically imported.
// Vite will code-split it into its own chunk, keeping the main bundle small.

let _embedder = null
let _loadingPromise = null
const _progressListeners = new Set()

async function getEmbedder(onProgress) {
  if (_embedder) return _embedder

  if (onProgress) _progressListeners.add(onProgress)

  if (!_loadingPromise) {
    // Dynamic import → Vite code-splits @xenova/transformers out of main bundle
    _loadingPromise = import('@xenova/transformers').then(({ pipeline, env }) => {
      env.allowLocalModels = false
      return pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        progress_callback: (info) => {
          _progressListeners.forEach(cb => { try { cb(info) } catch (_) {} })
        },
      })
    })

    _loadingPromise
      .then(m => {
        _embedder = m
        _progressListeners.forEach(cb => {
          try { cb({ status: 'ready', progress: 100 }) } catch (_) {}
        })
      })
      .catch(() => {})
  }

  try {
    return await _loadingPromise
  } finally {
    if (onProgress) _progressListeners.delete(onProgress)
  }
}

/**
 * Start downloading the model silently in the background.
 * Call on the Warning page — by the time user finishes 25 questions it's cached.
 * @param {function} [onProgress] — optional ({ status, progress }) callback
 */
export function prewarmModel(onProgress) {
  if (_embedder) {
    onProgress?.({ status: 'ready', progress: 100 })
    return
  }
  getEmbedder(onProgress).catch(() => {})
}

async function embed(text, model) {
  const out = await model(text, { pooling: 'mean', normalize: true })
  return Array.from(out.data)
}

function cosineSim(a, b) {
  let dot = 0
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i]
  return dot // vectors already L2-normalised
}

function avgEmbeddings(embs) {
  const dim = embs[0].length
  const avg = new Array(dim).fill(0)
  for (const e of embs) for (let i = 0; i < dim; i++) avg[i] += e[i]
  let norm = 0
  for (let i = 0; i < dim; i++) { avg[i] /= embs.length; norm += avg[i] * avg[i] }
  norm = Math.sqrt(norm)
  return avg.map(v => v / norm)
}

/**
 * Embed answer texts + pathway profiles; return cosine-similarity scores.
 */
export async function computeSemanticScores(answerTexts, PATHWAYS, onStep) {
  const report = (step, label, progress = 1) =>
    onStep?.({ step, label, progress })

  report(1, 'Loading neural model…', 0)
  const model = await getEmbedder(info => {
    if (info.status === 'progress') {
      const pct = Math.round(info.progress ?? 0)
      report(1, `Loading neural model… ${pct}%`, pct / 100)
    }
  })
  report(1, 'Neural model ready', 1)

  report(2, 'Encoding response corpus…', 0)
  const answerEmbs = []
  for (let i = 0; i < answerTexts.length; i++) {
    answerEmbs.push(await embed(answerTexts[i], model))
    report(2, 'Encoding response corpus…', (i + 1) / answerTexts.length)
  }
  const userVec = avgEmbeddings(answerEmbs)
  report(2, 'Response corpus encoded', 1)

  report(3, 'Profiling pathway vectors…', 0)
  const keys = Object.keys(PATHWAYS)
  const pathwayEmbs = {}
  for (let i = 0; i < keys.length; i++) {
    pathwayEmbs[keys[i]] = await embed(PATHWAYS[keys[i]].semanticProfile, model)
    report(3, 'Profiling pathway vectors…', (i + 1) / keys.length)
  }
  report(3, 'Pathway vectors ready', 1)

  report(4, 'Running cosine analysis…', 0)
  const raw = {}
  for (const k of keys) raw[k] = cosineSim(userVec, pathwayEmbs[k])
  report(4, 'Cosine analysis complete', 1)

  // Min-max normalize into [0, 1]
  const vals = Object.values(raw)
  const min = Math.min(...vals), max = Math.max(...vals)
  const span = max - min || 1
  const normalized = {}
  for (const k of keys) normalized[k] = (raw[k] - min) / span
  return normalized
}

/**
 * Combine traditional weighted scores + semantic similarity into hybrid scores.
 * Traditional scores drive the score-breakdown display;
 * hybrid determines the winning pathway.
 */
export function mergeScores(traditional, semantic) {
  const keys = Object.keys(traditional)
  const tradMax = Math.max(...Object.values(traditional)) || 1
  const hybrid = {}
  for (const k of keys) {
    hybrid[k] = (traditional[k] || 0) / tradMax * 0.35 + (semantic[k] ?? 0) * 0.65
  }
  return hybrid
}
