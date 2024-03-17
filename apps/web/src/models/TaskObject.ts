export type PostFormObject = {
  title: string;
  description: string;
};

export type GetTaskObject = {
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  id: string;
  isEditing: boolean;
} & PostFormObject;
