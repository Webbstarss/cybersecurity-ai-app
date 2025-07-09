import React, { useState } from "react";

const threats = {
  "phishing": "Undvik att klicka på misstänkta länkar och använd tvåfaktorsautentisering.",
  "sql injection": "Använd parametriserade frågor och validera all indata.",
  "xss": "Använd output encoding och Content Security Policy (CSP)."
};

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleChat = () => {
    const key = input.toLowerCase().trim();
    setResponse(threats[key] || "Ingen information om detta hot ännu.");
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Cybersäkerhets AI-Chattbot</h1>
      <input
        type="text"
        placeholder="Skriv ett hot, t.ex. 'phishing'"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: 8, width: "80%" }}
      />
      <button onClick={handleChat} style={{ padding: 8, marginLeft: 10 }}>
        Sök
      </button>
      <p style={{ marginTop: 20 }}>{response}</p>
    </div>
  );
}
