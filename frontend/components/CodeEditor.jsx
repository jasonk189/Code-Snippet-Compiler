import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";


function CodeEditor({ code, setCode }) {
  return <CodeMirror value={code} height="400px" extensions={[cpp()]} onChange={setCode} />;
}
