# RAG Demo

A document search app that finds the most relevant content from your knowledge base and generates answers using Claude.

---

## How it works

1. Documents are split into smaller chunks
2. When you search, each chunk is scored against your query
3. The top 3 most relevant chunks are retrieved
4. Claude uses those chunks to generate an answer

---

## Project Structure

```
src/
├── App.jsx                  # Main app, manages documents and tabs
├── index.js                 # Entry point
├── components/
│   ├── QueryTab.jsx         # Search input, results, and answer display
│   └── DocsTab.jsx          # Add and remove documents
└── utils/
    ├── retrieval.js         # Chunking and similarity logic
    └── claude.js            # Claude API call
```

---

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/rag-demo.git
cd rag-demo
npm install
npm start
```

To enable answer generation, add your Anthropic API key in `src/utils/claude.js`:

```js
const API_KEY = "your_api_key_here";
```

Get your API key at [console.anthropic.com](https://console.anthropic.com)

---

## Tech Stack

- React
- Anthropic Claude API