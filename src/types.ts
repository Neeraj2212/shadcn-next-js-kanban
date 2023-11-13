export type Id = string;

export type Column = {
  id: Id;
  title: string;
  taskIds: Id[];
};

export type Task = {
  id: Id;
  title: string;
  description: string;
  dueDate?: Date;
};
