// ChatbotWidget.jsx
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/chat", {
                user_query: input
            });
            const botMsg = { role: "assistant", content: res.data.reply };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {open && (
                <div className="w-80 h-[460px] bg-white rounded-xl shadow-xl flex flex-col mb-3">
                    <div className="bg-blue-600 text-white font-semibold text-center py-3 rounded-t-xl">
                        AgroGeek Bot
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto text-sm">
                        {messages.map((msg, i) => (
                            <div key={i} className={`${msg.role === 'user' ? 'text-right text-black' : 'text-left text-gray-600'} mb-2`}>
                                {msg.content}
                            </div>
                        ))}
                        {loading && <div className="text-left text-gray-400">Typing...</div>}
                    </div>
                    <div className="flex border-t border-gray-300">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 border-none outline-none text-sm"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
            <button
                className="bg-blue-600 text-white w-14 h-14 rounded-full text-2xl shadow-md hover:bg-blue-700"
                onClick={() => setOpen(!open)}
            >
                💬
            </button>
        </div>
    );
}
