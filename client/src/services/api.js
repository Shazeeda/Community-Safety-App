const API_URL = 'http://localhost:3001';

const api = {
  get: async (endpoint) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return await res.json();
    } catch (error) {
      console.error("API GET error:", error);
      return { error: error.message };
    }
  },

  post: async (endpoint, data) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send data");
      return await res.json();
    } catch (error) {
      console.error("API POST error:", error);
      return { error: error.message };
    }
  },

  delete: async (endpoint) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      if (!res.ok) throw new Error("Failed to delete data");
      return await res.json();
    } catch (error) {
      console.error("API DELETE error:", error);
      return { error: error.message };
    }
  }
};


export default api;
