# 🧪 Code Snippet Compiler

A web-based C++ code snippet compiler with live output, built using **React**, **Flask**, and **Docker** for secure backend execution.

---

## 🚀 Features

- ✍️ Write and run C++ code directly in the browser
- ⚙️ Backend compiles code securely using `g++` (via Docker)
- 💻 Beautiful, responsive frontend with syntax highlighting (CodeMirror)
- 🔒 Safe input handling and sandboxing

---

## 📦 Tech Stack

- **Frontend:** React, CodeMirror, Vite
- **Backend:** Flask (Python)
- **Compiler:** `g++` inside Docker for sandboxed execution

---

## 🛠️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/code-snippet-compiler.git
cd code-snippet-compiler
```

### 2. Setup backend

```bash
cd backend
python -m venv env
env\Scripts\activate     # or `source env/bin/activate` on Mac/Linux
pip install -r requirements.txt
python app.py
```

Ensure Docker is running if you're using Docker-based execution.

### 3. Setup frontend

In a separate terminal:

```bash
cd code-compiler-frontend
npm install
npm run dev
```

Frontend should be available at: http://localhost:5173

📬 API Endpoint

```bash
POST /api/compile
{
  "code": "C++ code string"
}
```

Response:

```json
{
  "stdout": "Program output",
  "stderr": "Any errors",
  "exit_code": 0
}
```
