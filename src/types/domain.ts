// src/types/domain.ts

// ----------------------
// MEMBER
// ----------------------

export type MemberStatus = "Aktif" | "Pasif" | "Askıda" | string;

export interface Member {
    id: string;            // Frontend modalda string ID kullanıyoruz
    name: string;
    status: MemberStatus;
    phone: string;
    lastEntry?: string;    // "2025-01-12 14:33"
}

// ----------------------
// DASHBOARD
// ----------------------

export interface DashboardStats {
    totalMembers?: number;
    activeMemberships?: number;
    totalGyms?: number;
    activeMembers?: number;
    [key: string]: any;
}


// ----------------------
// PACKAGES
// ----------------------

export type PackageType =
    | "Aylık"
    | "3 Aylık"
    | "6 Aylık"
    | "Yıllık"
    | string;

export interface Package {
    id: string;
    name: string;
    type: string;
    price: number;
}


// ----------------------r
// ANNOUNCEMENTS
// ----------------------

export interface Announcement {
    id: string;
    title: string;
    target: string;
    content: string;
    date: string;
}

// ----------------------
// ENTRY LOGS
// ----------------------

export interface EntryLog {
    id: number;
    memberId: number;
    memberName: string;
    entryTime: string;     // datetime-local string
    exitTime?: string;
}

// ----------------------
// GYM SETTINGS
// ----------------------

export interface GymSettings {
    name: string;
    address: string;
    openHour: string;        // "08:00"
    closeHour: string;       // "23:00"
    capacity: number;
}

// ----------------------
// WORKOUTS (Yeni eklendi)
// ----------------------

export interface Exercise {
    id: string;
    name: string;
    muscle: string;
    video?: string;
}

export interface TrainingProgram {
    id: string;
    title: string;
    description: string;
}

// ----------------------
// PAGINATED RESPONSE
// ----------------------

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
