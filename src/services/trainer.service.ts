import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient";

export type Trainer = {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    status?: string;
    fullName: string;
};

export const getTrainers = async (): Promise<Trainer[]> => {
    const res = await apiGet<any>("/trainer/list");

    // Backend bazen:
    // { data: [ ... ] }
    // bazen:
    // { data: { data: [ ... ] } }
    const list = res?.data?.data ?? res?.data ?? [];

    return list.map((t: any) => ({
        id: Number(t.id),
        firstName: t.firstName ?? "",
        lastName: t.lastName ?? "",
        phoneNumber: t.phoneNumber,
        status: t.status,
        fullName: `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim(),
    }));
};

export const registerTrainer = async (payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}) => {
    return apiPost("/auth/register-trainer", payload);
};

// UPDATE
export const updateTrainer = async (
    id: number,
    payload: Partial<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        status: string;
    }>
) => {
    return apiPut(`/trainer/${id}`, payload);
};

// DELETE
export const deleteTrainer = async (id: number) => {
    return apiDelete(`/trainer/${id}`);
};
