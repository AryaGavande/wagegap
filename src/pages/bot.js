import React, { useState } from "react";
import "../styles/chatbot.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5001/chat", { message });
      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      const errorMessage = { text: "Error connecting to chatbot.", sender: "bot" };
      setMessages([...messages, userMessage, errorMessage]);
    }

    setMessage(""); // Clear input field
  };

  return (
    <div className="chat-container">
      <h2>Chatbot</h2>
      <div className="chat-box">
            {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}-message`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
