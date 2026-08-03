// ==========================================================================
// Ask Sai — offline question matcher
// Pure local text matching: lowercase + strip punctuation, then score every
// knowledge-base entry by direct question overlap, keyword/alias hits, and
// a small typo-tolerant (Levenshtein) pass on individual words. Nothing here
// ever leaves the browser — there is no fetch/XHR call anywhere in this file.
// ==========================================================================

const AskSaiMatcher = (function () {
  function normalizeText(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/['’]/g, "") // "sai's" -> "sais" so apostrophes don't break matches
      .replace(/[^a-z0-9\s/]/g, " ") // strip punctuation (keep "/" for "s/4hana")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Classic edit-distance, used only for short typo tolerance (e.g.
  // "experiance" vs "experience"), capped so it stays cheap.
  function levenshtein(a, b) {
    if (a === b) return 0;
    const al = a.length;
    const bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    if (Math.abs(al - bl) > 3) return 99; // clearly not a typo of each other

    let prev = new Array(bl + 1);
    let curr = new Array(bl + 1);
    for (let j = 0; j <= bl; j++) prev[j] = j;

    for (let i = 1; i <= al; i++) {
      curr[0] = i;
      for (let j = 1; j <= bl; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      [prev, curr] = [curr, prev];
    }
    return prev[bl];
  }

  function scoreEntry(entry, normalizedInput, inputWords) {
    let score = 0;

    for (const q of entry.questions) {
      const nq = normalizeText(q);
      if (!nq) continue;
      if (normalizedInput === nq) score += 200;
      else if (normalizedInput.includes(nq) || nq.includes(normalizedInput)) score += 80;
    }

    for (const kw of entry.keywords) {
      const nkw = normalizeText(kw);
      if (!nkw) continue;
      if (normalizedInput.includes(nkw)) {
        score += 10 + nkw.split(" ").length * 5; // reward multi-word/specific keywords
      }
    }

    // Typo-tolerant fallback: compare individual input words against
    // individual keyword words (only for words long enough that a 1-2
    // character edit distance is meaningful, to avoid false positives on
    // short common words).
    for (const word of inputWords) {
      if (word.length < 4) continue;
      for (const kw of entry.keywords) {
        for (const kwWord of normalizeText(kw).split(" ")) {
          if (kwWord.length < 4 || word === kwWord) continue;
          const maxDistance = kwWord.length >= 7 ? 2 : 1;
          if (levenshtein(word, kwWord) <= maxDistance) {
            score += 6;
          }
        }
      }
    }

    return score;
  }

  function findBestMatch(rawInput, data) {
    const normalizedInput = normalizeText(rawInput);
    if (!normalizedInput) return null;
    const inputWords = normalizedInput.split(" ").filter(Boolean);

    let best = null;
    let bestScore = 0;

    for (const entry of data) {
      const score = scoreEntry(entry, normalizedInput, inputWords);
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    const MIN_SCORE = 12;
    if (best && bestScore >= MIN_SCORE) {
      return { entry: best, score: bestScore };
    }
    return null;
  }

  function findFallbackCategory(rawInput, categories) {
    const normalizedInput = normalizeText(rawInput);
    if (!normalizedInput) return null;

    let bestCategory = null;
    let bestHits = 0;
    for (const category of Object.keys(categories)) {
      let hits = 0;
      for (const alias of categories[category]) {
        if (normalizedInput.includes(normalizeText(alias))) hits++;
      }
      if (hits > bestHits) {
        bestHits = hits;
        bestCategory = category;
      }
    }
    return bestCategory;
  }

  return { normalizeText, levenshtein, findBestMatch, findFallbackCategory };
})();
