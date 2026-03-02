import axios from "axios";

// baseURL backend kamu
const API = axios.create({
    baseURL: "http://localhost:5000",
});

// 🔥 TEST CONNECT BACKEND
export const testBackendConnection = async () => {
    try {
        const response = await API.get("/");

        console.log("✅ Backend Connected:", response.data);

        return response.data;
    } catch (error) {
        console.error("❌ Backend Connection Failed:", error.message);
    }
};

export default API;