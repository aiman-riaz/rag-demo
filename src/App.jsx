import { useState } from "react";
import QueryTab from "./components/QueryTab";
import DocsTab from "./components/DocsTab";

const DEFAULT_DOCS = [
  {
    title: "What is RAG?",
    content: `Retrieval-Augmented Generation (RAG) is a technique that improves large language models by giving them access to external knowledge. Instead of relying only on what the model learned during training, RAG fetches relevant documents at the time of the query and includes them in the prompt. This makes the model's answers more accurate and up to date. The basic steps are: take a user question, search a knowledge base for relevant text, and then pass that text along with the question to the language model.`,
  },
  {
    title: "Vector Embeddings",
    content: `Vector embeddings are numerical representations of text. When you convert a sentence into an embedding, you get a list of numbers that captures the meaning of that sentence. Sentences with similar meanings end up with similar numbers, so you can compare them mathematically. In a RAG system, you embed both your documents and the user's question, then find the documents whose embeddings are closest to the question's embedding. This is called semantic search.`,
  },
  {
    title: "Chunking Explained",
    content: `Chunking means splitting large documents into smaller pieces before storing them. This is important because language models have a limit on how much text they can process at once. If you have a 50-page document, you don't want to pass the whole thing to the model — you just want the most relevant parts. Common chunk sizes are around 100 to 500 words. You can also add overlap between chunks so that you don't lose context at the boundaries.`,
  },
  {
    title: "RAG vs Fine-tuning",
    content: `RAG and fine-tuning are two different ways to improve a language model. Fine-tuning changes the model's weights by training it on new data — this is useful when you want the model to learn a new style or behavior. RAG keeps the model unchanged but gives it access to new information at query time — this is useful when your data changes frequently or is too large to train on. Many real-world systems use both together.`,
  },
];

function App() {
  const [docs, setDocs] = useState(DEFAULT_DOCS);
  const [activeTab, setActiveTab] = useState("query");

  function handleAddDoc(newDoc) {
    setDocs((prev) => [...prev, newDoc]);
  }

  function handleRemoveDoc(index) {
    setDocs((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Segoe UI', sans-serif", color: "#111" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ padding: "40px 0 0" }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#111" }}>
            RAG Demo
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#888" }}>
            A RAG app that finds the most relevant content from your knowledge base and generates answers using Claude.
          </p>

          {/* Tabs */}
          <div style={{ display: "flex", marginTop: "24px", borderBottom: "1px solid #e0e0e0" }}>
            {["query", "docs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 18px",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid #4f46e5" : "2px solid transparent",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: activeTab === tab ? "#4f46e5" : "#888",
                  fontWeight: activeTab === tab ? 600 : 400,
                  marginBottom: "-1px",
                }}
              >
                {tab === "query" ? "Search" : "Documents"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "query" && <QueryTab docs={docs} />}
        {activeTab === "docs" && (
          <DocsTab docs={docs} onAddDoc={handleAddDoc} onRemoveDoc={handleRemoveDoc} />
        )}
      </div>
    </div>
  );
}

export default App;