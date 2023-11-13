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
};

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  columns: [],
  immutableColumnIds: [],
  tasks: [],
  addColumn: () => {},
  deleteColumn: () => {},
  updateColumnTitle: () => {},
  addTask: () => {},
});

export const KanbanBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialColumns: Column[] = useMemo(
    () => [
      {
        id: "b169e5ac-6c00-4269-b8c6-c30990d979fe",
        title: "To Do",
        taskIds: [],
      },
      {
        id: "5191cbfa-8814-4913-9cb4-f46f07770ac0",
        title: "In Progress",
        taskIds: [],
      },
      {
        id: "33fa231c-8003-49f0-9f60-1794c34b1751",
        title: "Completed",
        taskIds: [],
      },
    ],
    []
  );

  const immutableColumnIds = useMemo(
    () => initialColumns.map((column) => column.id),
    [initialColumns]
  );

  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState<Task[]>([]);

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
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};
