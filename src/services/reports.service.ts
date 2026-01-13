// src/services/reports.service.ts
import { apiGet, apiPost, apiDelete } from "./apiClient";
import type { EntryLog, PaginatedResponse } from "../types/domain";

export interface GetEntryLogsParams {
    from?: string; // "YYYY-MM-DD"
    to?: string;   // "YYYY-MM-DD"
    page?: number;
    limit?: number;
}

export const getEntryLogs = (params: GetEntryLogsParams) => {
    return apiGet<PaginatedResponse<EntryLog>>("/logs", params);
};

export const createLog = (body: Partial<EntryLog>) => {
    return apiPost<EntryLog>("/logs", body);
};

export const deleteLog = (id: number) => {
    return apiDelete<null>(`/logs/${id}`);
};
