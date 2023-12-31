export type Id = string;

export type Column = {
  id: Id;
  title: string;
  tasks: Task[];
};

export type Task = {
  id: Id;
  title: string;
  description: string;
  dueDate?: Date;
};

export type Board = {
  id: Id;
  columns: Column[];
  title: string;
  description: string;
};
