import API from "./All";

export const loginUser = async (email, password) => {
    try {
        const response = await API.post("/login", {
            email: email,
            password: password,
        });

        return response.data;

    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw {
                message: "Login gagal"
            };
        }
    }
};

export const loginWithGoogleBackend = async (idToken) => {
    const response = await API.post("/login/google", {
        idToken
    });
    return response.data;
};