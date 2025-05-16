import { useState } from "react";
import "./AIAssistant.css";
import axios from "axios";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", {
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("AI failed to respond. Please try again.");
    }
  };

  return (
    <div className="ai-container">
      <h2>Ask Your Civic Issue</h2>
      <div className="input-container">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your issue or question..."
        />
      </div>
      <div className="button-container">
        <button onClick={handleAsk}>Ask AI</button>
      </div>
      <div className="ai-response">
        <strong>Response:</strong>
        <div className="response-content">
          {answer
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line, index) => (
              <div key={index} className="response-box">
                {line}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
