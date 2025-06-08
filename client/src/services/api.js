export const API_URL = "http://localhost:3000";

const api = {
  get: async (endpoint) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

      return await res.json();
    } catch (error) {
      console.error("API GET error:", error);
      return { error: error.message };
    }
  },

  post: async (endpoint, data) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to send data");
      }

      return await res.json();
    } catch (error) {
      console.error("API POST error:", error);
      return { error: error.message };
    }
  },

  delete: async (endpoint) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to delete data: ${res.statusText}`);

      return await res.json();
    } catch (error) {
      console.error("API DELETE error:", error);
      return { error: error.message };
    }
  },
};

export const sendMessageToAI = async (message) => {
  const result = await fetch("http://localhost:5000/api/ai-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await result.json();
  return data.reply;
};


import ChatAssistant from "./components/ChatAssistant";

function App() {
  return (
    <div>
      <ChatAssistant />
    </div>
  );
}


export default api;
