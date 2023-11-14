import { useContext } from "react";
import { MultipleBoardsContext } from "@/contexts/MultipleBoardsContext";
import AddBoardDialog from "./AddBoardDialog";
import BoardCard from "./BoardCard";

export default function MultipleBoards() {
  const { boards } = useContext(MultipleBoardsContext);

  return (
    <div className="px-[40px] py-10 flex flex-col gap-y-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Kanban Boards
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
        <AddBoardDialog />
      </div>
    </div>
  );
}
