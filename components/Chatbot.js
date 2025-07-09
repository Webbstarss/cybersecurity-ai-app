import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Du är en cybersäkerhetsexpert.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      setResponse(data.reply);
    } catch (err) {
      setResponse('Fel vid API-anrop.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="chatbox">
        {messages.slice(1).map((msg, i) => (
          <div key={i} className={msg.role}>
            <strong>{msg.role === 'user' ? 'Du' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ställ en cybersäkerhetsfråga..." />
        <button type="submit" disabled={loading}>{loading ? 'Laddar...' : 'Skicka'}</button>
      </form>
    </div>
  );
}
