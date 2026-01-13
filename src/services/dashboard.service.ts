// src/services/dashboard.service.ts
import { apiGet } from "./apiClient";

/* ================= TYPES ================= */

export type DashboardStats = {
    totalGyms: number;
    activeMembers: number;
};
// src/services/dashboard.service.ts


export type ActiveMember = {
    id: string;
    name: string;
    phone: string;
    lastEntry: string | null;
    isInside: boolean;
};
/* ================= API ================= */

export const getDashboardStats = async () => {
    const res = await apiGet<any>("/member/stats");
    const stats = res.data ?? {};
    return {
        activeMembers: stats.activeMembers ?? 0,
        todayEntries: stats.todayEntries ?? 0
    };
};

export const getActiveMembers = async (): Promise<ActiveMember[]> => {
    const res = await apiGet<any>("/member/active");

    const list = res?.data ?? [];   // 🔥 düz liste

    return list.map((m: any) => ({
        id: m.id.toString(),
        name: `${m.firstName} ${m.lastName}`,
        phone: m.phoneNumber,
        lastEntry: m.updatedAt ?? null, // DB kolonuna göre belki createdAt olmalı?
        isInside: m.isInside,
    }));
};


// Bugün giriş yapan üye sayısı (Entry tablosuna göre)
export const getTodayEntryCount = async (): Promise<number> => {
    // 1. Tüm üyeleri çek
    const membersRes = await apiGet<any>("/member/list");
    const members = membersRes?.data?.data ?? [];

    // 2. Bugünün tarih damgasını al
    const today = new Date().toISOString().split("T")[0];

    // 3. lastLoginAt veya MemberEntity.createdAt ile değil — entry tablosu lazım
    // Şimdilik m.updatedAt ile filtre
    const todayCount = members.filter((m: any) => {
        const updated = m.updatedAt || m.createdAt;
        return updated && updated.startsWith(today);
    }).length;

    return todayCount;
};





