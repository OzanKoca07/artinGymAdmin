// src/services/settings.service.ts
import { apiGet, apiPut } from "./apiClient";
import type { GymSettings } from "../types/domain";

export const getGymSettings = () => {
    return apiGet<GymSettings>("/settings");
};

export const updateGymSettings = (body: GymSettings) => {
    return apiPut<GymSettings>("/settings", body);
};
/*backendi yazınca burayı yaz düzenle!
import { apiGet, apiPut } from "./apiClient";

export const getSettings = async () => {
    return await apiGet<Settings>("/settings");
};

export const updateSettings = async (body: SettingsUpdate) => {
    return await apiPut<Settings>("/settings", body);
};

*/