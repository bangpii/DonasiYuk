import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// 🔥 TEST CONNECT BACKEND
export const testBackendConnection = async () => {
    try {
        const response = await API.get("/");

        console.log("✅ Backend Connected:", response.data);
        console.log("API URL:",
            import.meta.env.VITE_API_URL);

        return response.data;
    } catch (error) {
        console.error("❌ Backend Connection Failed:", error.message);
        console.log("API URL:",
            import.meta.env.VITE_API_URL);
    }
};

export default API;