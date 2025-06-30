import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import "./App.css";

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
    <div className="container">
      <h1>🧪 Code Snippet Compiler</h1>
      <p className="description">Write C++ code, run it securely, and see the output instantly.</p>

      <CodeMirror
        value={code}
        height="300px"
        extensions={[cpp()]}
        theme={oneDark}
        onChange={setCode}
      />

      <button onClick={runCode} disabled={loading} className="run-button">
        {loading ? "Running..." : "Run Code"}
      </button>

      <pre className="output-box">
        {output || "Output will appear here."}
      </pre>
    </div>
  );
}
