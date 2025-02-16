import React, { useState } from "react";
import "../styles/chatbot.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null); 

  

  const sendMessage = async () => {
    if (!message.trim() && !file) return; // Ensure either message or file is sent
  
    const userMessage = { text: message || "Uploading file...", sender: "user" };
    setMessages(prevMessages => [...prevMessages, userMessage]); // Use functional state update
  
    try {
      let response;
  
      
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
  
        console.log("Uploading file:", file.name); // Debugging
  
        response = await axios.post("http://127.0.0.1:5001/analyze-resume", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Server Response:", response.data);
      }
  
     
      else if (message.toLowerCase().includes("negotiation script")) {
        const parts = message.split(",");
        if (parts.length < 3) {
          setMessages(prevMessages => [...prevMessages, { text: "Please provide job title and industry.", sender: "bot" }]);
          return;
        }
  
        const jobTitle = parts[1]?.trim();
        const industry = parts[2]?.trim();
  
        console.log(`Generating negotiation script for Job Title: ${jobTitle}, Industry: ${industry}`);
  
        response = await axios.post("http://127.0.0.1:5001/generate-negotiation-script", {
          job_title: jobTitle,
          industry: industry,
        });
  
        console.log("Server Response:", response.data);
      }
  
      
      else {
        response = await axios.post("http://127.0.0.1:5001/chat", { message });
      }
  
      console.log("API Response:", response.data);
  
      const botMessage = { 
        text: response.data.response || response.data.analysis || response.data.script || "No response received.", 
        sender: "bot" 
      };
      setMessages(prevMessages => [...prevMessages, botMessage]); 
  
    } catch (error) {
      console.error("Error:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Error connecting to chatbot.", sender: "bot" }]);
    }
  
    
    setMessage("");
    setFile(null);
    document.querySelector(".file-input").value = ""; 
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
        <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
                console.log("File Selected:", e.target.files[0]); 
                setFile(e.target.files[0]);
            }}
            className="file-input"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
