export type Id = string;

export type Column = {
  id: Id;
  title: string;
  taskIds: Id[];
};
