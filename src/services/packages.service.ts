import { apiGet, apiPost, apiDelete } from "./apiClient";
import { api } from "./apiClient";

/* ================= TYPES ================= */

export type Package = {
    id: number;
    packageName: string;
    description?: string;
    price: number;
    durationValue: number;
    durationType: "MONTH" | "YEAR";
    status?: string;
    isUnlimitedAccess?: boolean;
};

/* ================= API ================= */

// LIST (❌ BOZULMADI)
export const getPackages = async (): Promise<Package[]> => {
    const res = await apiGet<any>("/packages");
    const list = res?.data ?? [];

    return list.map((p: any) => ({
        id: p.id,
        packageName: p.packageName,
        description: p.description,
        price: Number(p.price),
        durationValue: p.durationValue,
        durationType: p.durationType,
        status: p.status,
        isUnlimitedAccess: p.isUnlimitedAccess,
    }));
};

// CREATE
export const createPackage = async (payload: {
    packageName: string;
    description?: string;
    price: number;
    durationValue: number;
    durationType: "MONTH" | "YEAR";
    isUnlimitedAccess: boolean;
}) => {
    return apiPost("/packages", payload);
};

// ✅ UPDATE → PATCH KULLAN
export const updatePackage = async (
    id: number,
    payload: Partial<{
        packageName: string;
        description: string;
        price: number;
        durationValue: number;
        durationType: "MONTH" | "YEAR";
        isUnlimitedAccess: boolean;
        status: string;
    }>
) => {
    const res = await api.patch(`/packages/${id}`, payload);
    return res.data;
};

// DELETE
export const deletePackage = async (id: number) => {
    return apiDelete(`/packages/${id}`);
};
