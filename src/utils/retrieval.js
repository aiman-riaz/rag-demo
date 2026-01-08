// Step 1: Break a big document into smaller chunks
export function chunkText(text, chunkSize = 100) {
  const words = text.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }

  return chunks;
}

// Step 2: Convert text into a word frequency map
function getWordFrequency(text) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
  const freq = {};
  words.forEach((word) => {
    freq[word] = (freq[word] || 0) + 1;
  });
  return freq;
}

// Step 3: Find how similar two texts are (cosine similarity)
function getSimilarity(textA, textB) {
  const freqA = getWordFrequency(textA);
  const freqB = getWordFrequency(textB);

  const allWords = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);

  let dot = 0, normA = 0, normB = 0;

  allWords.forEach((word) => {
    const a = freqA[word] || 0;
    const b = freqB[word] || 0;
    dot += a * b;
    normA += a * a;
    normB += b * b;
  });

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Step 4: Given a query, find the most relevant chunks
export function retrieveTopChunks(query, allChunks, topK = 3) {
  const scored = allChunks.map((item) => ({
    ...item,
    score: getSimilarity(query, item.chunk),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}