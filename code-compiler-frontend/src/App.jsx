import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

export default function App() {
  const [code, setCode] = useState(`#include <iostream>\nint main() {\n  std::cout << "Hello, world!";\n  return 0;\n}`);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      setOutput(
        (data.stdout || "") +
        (data.stderr ? "\nErrors:\n" + data.stderr : "")
      );
    } catch (err) {
      setOutput("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>Code Snippet Compiler</h1>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[cpp()]}
        onChange={setCode}
      />
      <button onClick={runCode} disabled={loading} style={{ marginTop: 10, padding: "10px 20px" }}>
        {loading ? "Running..." : "Run Code"}
      </button>

      <h3>Output:</h3>
      <pre
        style={{
          backgroundColor: "#f0f0f0",
          padding: 10,
          minHeight: 100,
          color: "#333",            // Dark gray text
          whiteSpace: "pre-wrap",   // Wrap long lines nicely
        }}
      >
        {output}
      </pre>
    </div>
  );
}
