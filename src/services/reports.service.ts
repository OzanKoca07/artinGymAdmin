import { apiGet } from "./apiClient";

/* ================= TYPES ================= */

export type ActiveMember = {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isInside: boolean;
    status: string;
};

export type AttendanceDetail = {
    date: string;
    dayName: string;
    entryTime: string;
    exitTime: string | null;
    duration: string | null;
    fullDetail: string;
};

/* ================= API ================= */

// 🔥 Dashboard ile AYNI
export const getActiveMembers = async (): Promise<ActiveMember[]> => {
    const res = await apiGet<any>("/member/active");
    return res?.data ?? [];
};

export const getMemberAttendance = async (
    memberId: number,
    month?: number,
    year?: number
): Promise<AttendanceDetail[]> => {
    const res = await apiGet<any>(
        `/member/${memberId}/attendance`,
        month && year ? { month, year } : undefined
    );

    return res?.data ?? [];
};

export const getReportStats = async () => {
    const res = await apiGet<any>("/member/stats");
    return {
        activeMembers: res?.data?.activeMembers ?? 0,
        todayEntries: res?.data?.todayEntries ?? 0,
    };
};
