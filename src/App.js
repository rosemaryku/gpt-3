import "./App.css";
import ls from "local-storage";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import ResponseItem from "./components/ResultItem";

function App() {
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();
  const [responses, setResponses] = useState([]);

  const isClear = (responses) => {
    return !responses.length > 0;
  };

  const removeResponses = () => {
    ls.clear();
    setResponses([]);
  };

  useEffect(() => {
    let myResponses = ls.get("myResponses");
    setResponses(myResponses);
  }, []);

  return (
    <div className="App">
      <h1>Fun with AI</h1>
      <Search
        promptInput={promptInput}
        setPromptInput={setPromptInput}
        setResult={setResult}
        responses={responses}
        setResponses={setResponses}
      />

      <h3>Responses</h3>
      <div>
        {responses !== null &&
          responses.map((item, index) => (
            <ResponseItem key={index} item={item} />
          ))}
      </div>

      <button disabled={isClear(responses)} onClick={removeResponses}>
        Clear
      </button>
    </div>
  );
}

export default App;
