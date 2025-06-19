import os
import subprocess
import uuid

TEMP_DIR = os.path.abspath("./backend/temp")

def compile_and_run(code: str):
    os.makedirs(TEMP_DIR, exist_ok=True)
    file_id = str(uuid.uuid4())
    filename = f"{file_id}.cpp"
    filepath = os.path.join(TEMP_DIR, filename)

    with open(filepath, "w") as f:
        f.write(code)

    try:
        result = subprocess.run(
            [
                "docker", "run", "--rm",
                "--network", "none",
                "--cpus", "0.5",
                "--memory", "128m",
                "-v", f"{TEMP_DIR}:/code",
                "cpp-sandbox", filename
            ],
            capture_output=True,
            text=True,
            timeout=10
        )
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "exit_code": result.returncode
        }

    except subprocess.TimeoutExpired:
        return {
            "stdout": "",
            "stderr": "Execution timed out.",
            "exit_code": -1
        }
