import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hej! Jag är din cybersäkerhetsassistent. Ställ en fråga om hackerattacker eller skydd!' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { sender: 'bot', text: data.reply };

      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Ett fel uppstod. Försök igen.' }]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Cybersäkerhets-Chattbot</h2>
      <div className="h-64 overflow-y-auto border rounded p-2 mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-green-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-grow p-2 border rounded-l"
          type="text"
          value={input}
          placeholder="Ställ en fråga..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="bg-blue-600 text-white px-4 rounded-r" onClick={handleSend}>
          Skicka
        </button>
      </div>
    </div>
  );
}
