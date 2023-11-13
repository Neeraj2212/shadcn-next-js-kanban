import { Column, Task } from "@/types";
import { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type KanbanBoardContextType = {
  columns: Column[];
  immutableColumnIds: string[];
  tasks: Task[];
  addColumn: () => void;
  deleteColumn: (columnId: string) => void;
  updateColumnTitle: (columnId: string, newTitle: string) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  columns: [],
  immutableColumnIds: [],
  tasks: [],
  addColumn: () => {},
  deleteColumn: () => {},
  updateColumnTitle: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const KanbanBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialColumns: Column[] = useMemo(
    () => [
      {
        id: "b169e5ac-6c00-4269-b8c6-c30990d979fe",
        title: "To Do",
        taskIds: [
          "9e08c037-f369-41c7-8714-1545be1acd65",
          "d3cfcfb5-94bf-44b7-91f7-e52467c722e3",
        ],
      },
      {
        id: "5191cbfa-8814-4913-9cb4-f46f07770ac0",
        title: "In Progress",
        taskIds: [
          "b5126143-159a-4cb5-8f9d-985836c8d286",
          "d3cfcfb5-94bf-44b7-91f7-e52467c722e2",
          "9e08c037-f369-41c7-8714-1545be1acd64",
        ],
      },
      {
        id: "33fa231c-8003-49f0-9f60-1794c34b1751",
        title: "Completed",
        taskIds: [],
      },
    ],
    []
  );

  const initialTasks = useMemo<Task[]>(
    () => [
      {
        id: "9e08c037-f369-41c7-8714-1545be1acd65",
        title: "To Do 1",
        description: "Description for To Do 1",
        columnId: "b169e5ac-6c00-4269-b8c6-c30990d979fe",
      },
      {
        id: "d3cfcfb5-94bf-44b7-91f7-e52467c722e3",
        title: "To Do 2",
        description: "Description for To Do 2",
        columnId: "b169e5ac-6c00-4269-b8c6-c30990d979fe",
      },
      {
        id: "b5126143-159a-4cb5-8f9d-985836c8d286",
        title: "In Progress 1",
        description: "Description for In Progress 1",
        columnId: "5191cbfa-8814-4913-9cb4-f46f07770ac0",
        dueDate: new Date("2024-09-01"),
      },
      {
        id: "d3cfcfb5-94bf-44b7-91f7-e52467c722e2",
        title: "Delayed In Progress 2",
        description: "Description for In Progress 2",
        columnId: "5191cbfa-8814-4913-9cb4-f46f07770ac0",
        dueDate: new Date("2023-09-01"),
      },
      {
        id: "9e08c037-f369-41c7-8714-1545be1acd64",
        title: "Delayed In Progress 3",
        description: "Description for In Progress 3",
        columnId: "5191cbfa-8814-4913-9cb4-f46f07770ac0",
        dueDate: new Date("2022-09-01"),
      },
    ],
    []
  );

  const immutableColumnIds = useMemo(
    () => initialColumns.map((column) => column.id),
    [initialColumns]
  );

  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Column functions
  const addColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
      taskIds: [],
    };

    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    const newColumns = columns.filter((column) => column.id !== columnId);

    setColumns(newColumns);
  };

  const updateColumnTitle = async (columnId: string, newTitle: string) => {
    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          title: newTitle,
        };
      } else {
        return column;
      }
    });

    setColumns(newColumns);
  };

  // Task functions
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    // Get column of task and update taskIds
    const column = columns.find((column) => column.id === task.columnId);
    if (column) {
      const newColumn = {
        ...column,
        taskIds: [...column.taskIds, task.id],
      };
      const newColumns = columns.map((column) =>
        column.id === newColumn.id ? newColumn : column
      );
      setColumns(newColumns);
    }
  };

  const updateTask = (task: Task) => {
    const newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    // Get column of task and remove from task ids
    const column = columns.find((column) => column.taskIds.includes(taskId));
    if (column) {
      const newColumn = {
        ...column,
        taskIds: column.taskIds.filter((id) => id !== taskId),
      };
      const newColumns = columns.map((column) =>
        column.id === newColumn.id ? newColumn : column
      );
      setColumns(newColumns);
    }
    setTasks(newTasks);
  };

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        immutableColumnIds,
        tasks,
        addColumn,
        deleteColumn,
        updateColumnTitle,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};
