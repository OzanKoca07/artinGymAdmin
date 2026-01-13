// src/services/auth.service.ts
import { apiPost } from "./apiClient";

export type UserRole = "SUPER_ADMIN" | "COMPANY_ADMIN" | "MEMBER";

export type LoginUser = {
    id: number;
    role: UserRole;
    tenant_id: number | null;
    is_first_login: boolean;

    // backend bazen bunları user içine koyuyor
    access_token?: string;
    refreshToken?: string;
};

export type LoginPayload = {
    user: LoginUser;

    // backend bazen bunları root payload'a koyuyor
    access_token?: string;
    refreshToken?: string;
};

export type BaseResponse<T> = {
    data: T;
    success: boolean;
    message: string;
};

export const loginRequest = async (username: string, password: string) => {
    const res = await apiPost<BaseResponse<LoginPayload>>("/auth/login", {
        username,
        password,
    });

    if (!res?.success) {
        throw new Error(res?.message || "Login failed");
    }

    const payload = res.data;
    const user = payload?.user;

    // ✅ token nerede gelirse gelsin al
    const accessToken = payload?.access_token ?? user?.access_token;
    const refreshToken = payload?.refreshToken ?? user?.refreshToken;

    if (!user || !accessToken) {
        // debug için response’u görmek istersen:
        // console.log("LOGIN RAW:", res);
        throw new Error("Login response eksik");
    }

    // 🔒 SADECE ADMIN
    if (user.role !== "COMPANY_ADMIN" && user.role !== "SUPER_ADMIN") {
        throw new Error("Bu panele giriş yetkiniz yok.");
    }

    // 💾 STORAGE (tek standart)
    localStorage.setItem("access_token", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    // login.tsx sadece navigate etsin diye payload döndürüyoruz
    return { user, access_token: accessToken, refreshToken };
};
