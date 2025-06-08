import React, { useState } from "react";
import { sendMessageToAI } from "../services/api";

const ChatAssistant = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setConversation((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const aiReply = await sendMessageToAI(userInput);
      const botMessage = { sender: "bot", text: aiReply };
      setConversation((prev) => [...prev, botMessage]);
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    }

    setUserInput("");
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Community Safety Assistant</h2>
      <div style={styles.chatBox}>
        {conversation.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.typing}>🧠 Typing...</div>}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={userInput}
          placeholder="Describe a safety concern or ask a question..."
          onChange={(e) => setUserInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    minHeight: "300px",
    maxHeight: "400px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fff",
  },
  message: {
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    maxWidth: "75%",
  },
  typing: {
    fontStyle: "italic",
    color: "#555",
  },
  form: {
    display: "flex",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default ChatAssistant;
