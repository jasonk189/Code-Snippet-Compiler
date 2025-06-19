from flask import Flask, request, jsonify
from compiler.runner import compile_and_run
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/compile", methods=["POST"])
def compile():
    code = request.json.get("code", "")
    result = compile_and_run(code)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)