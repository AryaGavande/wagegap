import React, { useState } from "react";
import axios from "axios";
import "../styles/chatbot.css";
import ReactMarkdown from "react-markdown";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // To show the selected file name
  const [isLoading, setIsLoading] = useState(false); // To show a loading state

  const sendMessage = async () => {
    if (!message.trim() && !file) return;

    setIsLoading(true); // Show loading state while sending message
    const userMessage = { text: message || `Uploading file: ${fileName}...`, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      let response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file:", file.name);

        response = await axios.post("http://127.0.0.1:5001/analyze-resume", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Server Response:", response.data);
      } else if (message.toLowerCase().includes("negotiation script")) {
        const parts = message.split(",");
        if (parts.length < 3) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Please provide job title and industry.", sender: "bot" },
          ]);
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
      } else {
        response = await axios.post("http://127.0.0.1:5001/chat", { message });
      }

      console.log("API Response:", response.data);

      const botMessage = {
        text: response.data.response || response.data.analysis || response.data.script || "No response received.",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error connecting to chatbot.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false); // Remove loading state after response
      setMessage("");
      setFile(null);
      setFileName(""); // Reset file name
    }
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

      {/* File Name Display Below Chat Messages */}
      {fileName && (
        <div className="file-info">
          <p>📄 {fileName} selected</p>
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        
        {/* Custom File Upload */}
        <label className="file-upload">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              console.log("File Selected:", selectedFile);
              setFile(selectedFile);
              setFileName(selectedFile ? selectedFile.name : ""); // Update file name
            }}
          />
          📂 Choose File
        </label>

        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
