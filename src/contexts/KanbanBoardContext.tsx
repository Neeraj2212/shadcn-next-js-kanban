import { Column, Task } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type KanbanBoardContextType = {
  columns: Column[];
  addColumn: () => void;
  deleteColumn: (columnId: string) => void;
  updateColumnTitle: (columnId: string, newTitle: string) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  moveOverAnotherTask: (
    activeColumnId: string,
    overColumnId: string,
    activeTaskId: string,
    overTaskId: string
  ) => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  columns: [],
  addColumn: () => {},
  deleteColumn: () => {},
  updateColumnTitle: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  moveOverAnotherTask: () => {},
});

export const KanbanBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialColumns: Column[] = useMemo(
    () => [
      {
        id: "b169e5ac-6c00-4269-b8c6-c30990d979fe",
        title: "To Do",
        tasks: [
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
        ],
      },
      {
        id: "5191cbfa-8814-4913-9cb4-f46f07770ac0",
        title: "In Progress",
        tasks: [
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
      },
      {
        id: "33fa231c-8003-49f0-9f60-1794c34b1751",
        title: "Completed",
        tasks: [],
      },
    ],
    []
  );

  const [columns, setColumns] = useState(initialColumns);

  // Column functions
  const addColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
      tasks: [],
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
    // Get column of task and update tasks
    const columnIdx = columns.findIndex(
      (column) => column.id === task.columnId
    );
    const column = columns[columnIdx];
    if (column) {
      column.tasks.push(task);
      setColumns([...columns]);
    }
  };

  const updateTask = (task: Task) => {
    const column = columns.find((column) => column.id === task.columnId);
    if (column) {
      const taskIdx = column.tasks.findIndex((t) => t.id === task.id);
      column.tasks[taskIdx] = task;
      setColumns([...columns]);
    }
  };

  const deleteTask = (task: Task) => {
    const column = columns.find((column) => column.id === task.columnId);
    if (column) {
      const taskIdx = column.tasks.findIndex((t) => t.id === task.id);
      column.tasks.splice(taskIdx, 1);
      setColumns([...columns]);
    }
  };

  // Move task functions
  const moveOverAnotherTask = (
    activeColumnId: string,
    overColumnId: string,
    activeTaskId: string,
    overTaskId: string
  ) => {
    // move tasks within same column
  };

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        addColumn,
        deleteColumn,
        updateColumnTitle,
        addTask,
        updateTask,
        deleteTask,
        moveOverAnotherTask,
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};
