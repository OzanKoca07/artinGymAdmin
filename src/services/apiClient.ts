// src/services/apiClient.ts
import axios, { AxiosError } from "axios";

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL ??
    "https://nonmultiplicational-karima-incommodiously.ngrok-free.dev/api";

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});
// apiClient.ts

export const apiPatch = async <T>(url: string, body: unknown): Promise<T> => {
    const res = await api.patch<T>(url, body);
    return res.data;
};




// ngrok warning bypass
api.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

// 🔒 REQUEST
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// src/services/apiClient.ts
api.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error.response?.status;

        // ❗ SADECE LOGIN KAYNAKLI 401'DE LOGOUT
        if (status === 401) {
            const isLoginRequest = error.config?.url?.includes("/auth/login");

            if (isLoginRequest) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
            } else {
                // 🔥 Dashboard / member vb. hatalarda logout YAPMA
                console.warn("401 received, but not logging out", error.config?.url);
            }
        }

        // ❗ RATE LIMIT → SADECE UYARI
        if (status === 429) {
            console.warn("Too many requests - throttled by backend");
        }

        return Promise.reject(error);
    }
);

// HELPERS
export const apiGet = async <T>(url: string, params?: any): Promise<T> => {
    const res = await api.get<T>(url, { params });
    return res.data;
};

export const apiPost = async <T>(url: string, body: unknown): Promise<T> => {
    const res = await api.post<T>(url, body);
    return res.data;
};

export const apiPut = async <T>(url: string, body?: unknown): Promise<T> => {
    const res = await api.put<T>(url, body);
    return res.data;
};

export const apiDelete = async <T>(url: string): Promise<T> => {
    const res = await api.delete<T>(url);
    return res.data;
};
