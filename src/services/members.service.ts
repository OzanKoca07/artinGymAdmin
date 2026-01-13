// src/services/members.service.ts
import { apiGet, apiPost } from "./apiClient";
import type { Member } from "../types/domain";


/* ================= HELPERS ================= */

export const getMembers = async (): Promise<Member[]> => {
    const res = await apiGet<any>("/member/list");

    const list = res?.data?.data ?? [];   // <-- pagination içindeki data

    return list.map((m: any) => ({
        id: m.id.toString(),
        name: `${m.firstName} ${m.lastName}`,
        phone: m.phoneNumber,
        status: m.status === "active" ? "Aktif" : "Pasif",
        lastEntry: "-",
    }));
};


/* ================= OTHER LOOKUPS ================= */

export const getTrainers = async () => {
    const res = await apiGet<any>("/trainer");
    return res?.data ?? [];
};

export const getPackages = async () => {
    const res = await apiGet<any>("/package");
    return res?.data ?? [];
};

/* ================= CREATE MEMBER ================= */

export type CreateMemberPayload = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emergencyContact: string;
    dateOfBirth: string;
    trainerId: number;
    packageId: number;
    physicalData: {
        heightCm: number;
        weightKg: number;
    };
};
export const getMemberAttendance = async (id: string) => {
    const res = await apiGet<any>(`/member/${id}/attendance`);
    return res.data;
};
export const getMemberPhysicalHistory = async (id: string) => {
    const res = await apiGet<any>(`/member/${id}/physical-data/history`);
    return res.data;
};


export const createMember = async (payload: CreateMemberPayload) => {
    return apiPost("/member", payload);
};
