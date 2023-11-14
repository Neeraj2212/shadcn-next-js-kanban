import { Board } from "@/types";
import { createContext, useEffect, useMemo, useState } from "react";

type MultipleBoardsContextType = {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  addBoard: (board: Board) => void;
  deleteBoard: (boardId: string) => void;
  updateBoard: (board: Board) => void;
};

export const MultipleBoardsContext = createContext<MultipleBoardsContextType>({
  boards: [],
  setBoards: () => {},
  addBoard: () => {},
  deleteBoard: () => {},
  updateBoard: () => {},
});

export const MultipleBoardsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialBoards: Board[] = useMemo(
    () => [
      {
        id: "fb9ff83f-ec56-4e8a-a6d6-816b55b4e211",
        description: "Demo board description",
        title: "Demo Board",
        columns: [],
      },
      {
        id: "bb9ff83f-ec56-4e8a-a6d6-816b55b4e212",
        description: "Demo board 2 description",
        title: "Demo Board 2",
        columns: [],
      },
    ],
    []
  );

  const [boards, setBoards] = useState<Board[]>(() => {
    const boards = localStorage.getItem("boards");
    if (boards) {
      return JSON.parse(boards);
    }
    return initialBoards;
  });

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const addBoard = (board: Board) => {
    setBoards([...boards, board]);
  };

  const deleteBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  const updateBoard = (board: Board) => {
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        return b;
      })
    );
  };

  return (
    <MultipleBoardsContext.Provider
      value={{
        boards,
        setBoards,
        addBoard,
        deleteBoard,
        updateBoard,
      }}
    >
      {children}
    </MultipleBoardsContext.Provider>
  );
};
