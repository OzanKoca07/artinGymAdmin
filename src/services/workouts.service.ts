// src/services/workouts.service.ts
import { apiGet, apiPost, apiPut, apiDelete, withFallback } from "./apiClient";
import type { Exercise, TrainingProgram } from "../types/domain";

// Backend henüz yoksa UI boş listeyle çalışsın
const MOCK_EXERCISES: Exercise[] = [];
const MOCK_PROGRAMS: TrainingProgram[] = [];

// --------------------
// Exercises
// --------------------
export const getExercises = async () => {
    return await withFallback(() => apiGet<Exercise[]>("/exercises"), MOCK_EXERCISES);
};

export const createExercise = async (body: Partial<Exercise>) => {
    return await apiPost<Exercise>("/exercises", body);
};

export const updateExercise = async (id: string, body: Partial<Exercise>) => {
    return await apiPut<Exercise>(`/exercises/${id}`, body);
};

export const deleteExercise = async (id: string) => {
    return await apiDelete<null>(`/exercises/${id}`);
};

// --------------------
// Training Programs
// --------------------
export const getPrograms = async () => {
    return await withFallback(() => apiGet<TrainingProgram[]>("/programs"), MOCK_PROGRAMS);
};

export const createProgram = async (body: Partial<TrainingProgram>) => {
    return await apiPost<TrainingProgram>("/programs", body);
};

export const updateProgram = async (id: string, body: Partial<TrainingProgram>) => {
    return await apiPut<TrainingProgram>(`/programs/${id}`, body);
};

export const deleteProgram = async (id: string) => {
    return await apiDelete<null>(`/programs/${id}`);
};
