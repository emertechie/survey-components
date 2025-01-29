export type UpdateType = "merge" | "assign";

export type PartialWithId<T> = Partial<T> & { id: string };
