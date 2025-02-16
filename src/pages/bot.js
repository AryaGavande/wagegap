import React, { useState } from "react";
import axios from "axios";

function Bot() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:5001/chat", {
                message: message,
            });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error connecting to chatbot.");
        }
    };

    return (
        <div>
            <h2>Chatbot</h2>
            <input 
                type="text" 
                placeholder="Type a message..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Send</button>
            <p><strong>Bot Response:</strong> {response}</p>
        </div>
    );
}

export default Bot;
