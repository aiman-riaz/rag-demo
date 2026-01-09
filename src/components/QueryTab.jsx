import { useState } from "react";
import { chunkText, retrieveTopChunks } from "../utils/retrieval";
import { askClaude } from "../utils/claude";

function QueryTab({ docs }) {
  const [query, setQuery] = useState("");
  const [retrievedChunks, setRetrievedChunks] = useState([]);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;

    setError("");
    setAnswer("");
    setRetrievedChunks([]);
    setSearched(false);

    // Step 1: Retrieve
    setStatus("retrieving");
    const allChunks = docs.flatMap((doc) =>
      chunkText(doc.content).map((chunk) => ({
        chunk,
        source: doc.title,
      }))
    );
    const topChunks = retrieveTopChunks(query, allChunks, 3).filter(
      (item) => item.score > 0
    );
    setRetrievedChunks(topChunks);
    setSearched(true);

    if (topChunks.length === 0) {
      setStatus("");
      return;
    }

    // Step 2: Generate
    setStatus("generating");
    try {
      const response = await askClaude(query, topChunks);
      setAnswer(response);
    } catch (e) {
      setError("API call failed. Check your API key in claude.js");
    }
    setStatus("");
  }

  return (
    <div style={{ padding: "28px 0" }}>

      {/* Search input */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Ask something..."
          style={{
            flex: 1, padding: "11px 14px", borderRadius: "8px",
            border: "1px solid #ddd", background: "#fff", color: "#111",
            fontSize: "14px", fontFamily: "inherit", outline: "none",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        />
        <button
          onClick={handleSearch}
          disabled={!!status}
          style={{
            padding: "11px 22px", background: "#4f46e5", color: "white",
            border: "none", borderRadius: "8px", cursor: status ? "not-allowed" : "pointer",
            fontSize: "14px", fontWeight: 600,
            opacity: status ? 0.6 : 1,
          }}
        >
          {status === "retrieving" ? "Searching..." : status === "generating" ? "Generating..." : "Search"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#e53e3e", fontSize: "13px", marginBottom: "16px" }}>{error}</p>
      )}

      {/* No results */}
      {searched && retrievedChunks.length === 0 && (
        <p style={{ color: "#999", fontSize: "14px" }}>No relevant results found.</p>
      )}

      {/* Retrieved chunks */}
      {retrievedChunks.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "14px", marginTop: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Retrieved Chunks
          </p>
          {retrievedChunks.map((item, i) => (
            <div key={i} style={{
              background: "#fff", border: "1px solid #e8e8e8",
              borderLeft: "3px solid #4f46e5", borderRadius: "8px",
              padding: "18px", marginBottom: "12px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", color: "#4f46e5", fontWeight: 600 }}>{item.source}</span>
                <span style={{ fontSize: "12px", color: "#bbb" }}>Score: {item.score.toFixed(3)}</span>
              </div>
              <p style={{ fontSize: "14px", color: "#444", margin: 0, lineHeight: 1.7 }}>{item.chunk}</p>
            </div>
          ))}
        </div>
      )}

      {/* Answer */}
      {answer && (
        <div style={{
          background: "#fff", border: "1px solid #e8e8e8",
          borderRadius: "8px", padding: "20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "12px", marginTop: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Answer
          </p>
          <p style={{ fontSize: "14px", color: "#333", margin: 0, lineHeight: 1.8 }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default QueryTab;
