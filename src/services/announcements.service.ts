import { apiGet, apiPost, apiDelete, apiPatch } from "./apiClient";
import type { Announcement } from "../types/domain";

// LIST
export const getAnnouncements = async (): Promise<Announcement[]> => {
    const res = await apiGet<{ data: Announcement[] }>("/announcement");
    return res.data ?? [];
};

// CREATE
export const createAnnouncement = async (body: Partial<Announcement>) => {
    const res = await apiPost<{ data: Announcement }>("/announcement", body);
    return res.data;
};

// UPDATE
export const updateAnnouncement = async (id: number, body: Partial<Announcement>) => {
    const res = await apiPatch<{ data: Announcement }>(`/announcement/${id}`, body);
    return res.data;
};

// DELETE
export const deleteAnnouncement = async (id: number) => {
    return await apiDelete<null>(`/announcement/${id}`);
};
