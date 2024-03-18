import type { TaskTextData } from "./RequestData";

export type GetTaskObject = {
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  id: string;
  isEditing: boolean;
} & TaskTextData;
