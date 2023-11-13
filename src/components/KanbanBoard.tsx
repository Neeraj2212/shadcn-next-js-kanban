import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import { useContext } from "react";
import ColumnWrapper from "./ColumnWrapper";
import { Button } from "./ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function KanbanBoard() {
  const { columns, addColumn } = useContext(KanbanBoardContext);

  return (
    <div className="flex w-full px-[40px] py-10 ">
      <div className="flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => {
            return <ColumnWrapper key={column.id} column={column} />;
          })}
        </div>
        <Button
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg
                text-md font-bold p-4 flex gap-2"
          onClick={() => {
            addColumn();
          }}
        >
          <PlusCircledIcon className="h-6 w-6" />
          Add Column
        </Button>
      </div>
    </div>
  );
}
