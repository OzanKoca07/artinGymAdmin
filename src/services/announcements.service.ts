// src/services/announcements.service.ts
import { apiGet, apiPost, apiDelete } from "./apiClient";
import type { Announcement } from "../types/domain";

// Backend hazır değil → UI test için boş liste
const MOCK: Announcement[] = [];

// LIST
export const getAnnouncements = async (): Promise<Announcement[]> => {
    try {
        return await apiGet<Announcement[]>("/announcements");
    } catch {
        // backend yoksa UI çökmemeli
        return MOCK;
    }
};

// CREATE
export const createAnnouncement = async (body: Partial<Announcement>) => {
    try {
        return await apiPost<Announcement>("/announcements", body);
    } catch {
        return null;
    }
};

// DELETE
export const deleteAnnouncement = async (id: string) => {
    try {
        return await apiDelete<null>(`/announcements/${id}`);
    } catch {
        return null;
    }
};
