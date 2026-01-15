// Add your Anthropic API key here
const API_KEY = "your_api_key_here";

export async function askClaude(query, retrievedChunks) {
  const context = retrievedChunks
    .map((item, i) => `Source ${i + 1} (${item.source}):\n${item.chunk}`)
    .join("\n\n");

  const prompt = `Answer the question using only the context below. If the context doesn't have enough info, say "I don't have enough information on that."

Context:
${context}

Question: ${query}

Answer:`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return data.content?.[0]?.text || "No response received.";
}