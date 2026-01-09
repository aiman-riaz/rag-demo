import { useState } from "react";

function DocsTab({ docs, onAddDoc, onRemoveDoc }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleAdd() {
    if (!title.trim() || !content.trim()) return;
    onAddDoc({ title, content });
    setTitle("");
    setContent("");
  }

  return (
    <div style={{ padding: "28px 0" }}>

      {/* Add document form */}
      <div style={{
        background: "#fff",
        border: "1px solid #e8e8e8",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "14px", marginTop: 0 }}>
          Add a new document
        </p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={inputStyle}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your content here..."
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <button onClick={handleAdd} style={buttonStyle}>
          Add
        </button>
      </div>

      {/* Document list */}
      {docs.map((doc, i) => (
        <div key={i} style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: "8px",
          padding: "16px 18px",
          marginBottom: "10px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111" }}>{doc.title}</span>
            <button onClick={() => onRemoveDoc(i)} style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#bbb",
              fontSize: "13px",
              padding: 0,
            }}>
              Remove
            </button>
          </div>
          <p style={{ color: "#999", fontSize: "13px", marginTop: "8px", marginBottom: 0, lineHeight: 1.6 }}>
            {doc.content.slice(0, 140)}...
          </p>
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fafafa",
  color: "#111",
  fontSize: "14px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  outline: "none",
};

const buttonStyle = {
  padding: "9px 20px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

export default DocsTab;