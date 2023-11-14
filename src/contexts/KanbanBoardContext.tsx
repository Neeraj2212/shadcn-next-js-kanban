import { Board, Column, Task } from "@/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MultipleBoardsContext } from "./MultipleBoardsContext";

type KanbanBoardContextType = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  activeBoard: Board;
  addColumn: () => void;
  deleteColumn: (columnId: string) => void;
  updateColumnTitle: (columnId: string, newTitle: string) => void;
  addTask: (columnId: string, task: Task) => void;
  updateTask: (columnId: string, task: Task) => void;
  deleteTask: (columnId: string, task: Task) => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  columns: [],
  activeBoard: {
    id: "",
    title: "",
    description: "",
    columns: [],
  },
  setColumns: () => {},
  addColumn: () => {},
  deleteColumn: () => {},
  updateColumnTitle: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const KanbanBoardProvider: React.FC<{
  children: React.ReactNode;
  boardId: string;
}> = ({ children, boardId }) => {
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

  const { boards, setBoards } = useContext(MultipleBoardsContext);
  const activeBoard = useMemo(
    () =>
      boards.find((board) => board.id === boardId) || {
        id: "",
        title: "",
        description: "",
        columns: [],
      },
    []
  );

  const [columns, setColumns] = useState(() => {
    if (activeBoard?.columns.length) {
      return activeBoard.columns;
    }
    return initialColumns;
  });

  useEffect(() => {
    return () => {
      const newBoards = boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            columns,
          };
        } else {
          return board;
        }
      });

      setBoards(newBoards);
      localStorage.setItem("boards", JSON.stringify(newBoards));
    };
  }, [columns]);

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
  const addTask = (columnId: string, task: Task) => {
    // Get column of task and update tasks
    const columnIdx = columns.findIndex((column) => column.id === columnId);
    const column = columns[columnIdx];
    if (column) {
      column.tasks.push(task);
      setColumns([...columns]);
    }
  };

  const updateTask = (columnId: string, task: Task) => {
    const column = columns.find((column) => column.id === columnId);
    if (column) {
      const taskIdx = column.tasks.findIndex((t) => t.id === task.id);
      column.tasks[taskIdx] = task;
      setColumns([...columns]);
    }
  };

  const deleteTask = (columnId: string, task: Task) => {
    const column = columns.find((column) => column.id === columnId);
    console.log(task);
    console.log(column);
    if (column) {
      const taskIdx = column.tasks.findIndex((t) => t.id === task.id);
      column.tasks.splice(taskIdx, 1);
      setColumns([...columns]);
    }
  };

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        activeBoard,
        setColumns,
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
