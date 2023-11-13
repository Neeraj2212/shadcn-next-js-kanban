import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import DeleteIcon from "@/icons/DeleteIcon";
import { Column } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import AddTaskDialog from "./AddTaskDialog";

interface ColumnWrapperProps {
  column: Column;
}

export default function ColumnWrapper(props: ColumnWrapperProps) {
  const { column } = props;
  const { taskIds } = column;
  const [editMode, setEditMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const { updateColumnTitle, deleteColumn, immutableColumnIds } =
    useContext(KanbanBoardContext);

  return (
    <div className="bg-secondary rounded-md flex flex-col max-h-[600px] h-[600px] w-[350px]">
      {/* Column title */}
      <div
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-primary text-md h-[60px] rounded-md 
        rounded-b-none p-3 font-bold flex items-center justify-between"
      >
        <div className="flex gap-2 text-secondary">
          <div
            className="flex justify-center items-center bg-secondary
            px-2 py-1 text-sm rounded-full text-primary"
          >
            {taskIds.length}
          </div>
          {!editMode && columnTitle}
          {editMode && (
            <input
              className="bg-transparent border rounded outline-none px-2"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
                updateColumnTitle(column.id, columnTitle);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
                updateColumnTitle(column.id, columnTitle);
              }}
            />
          )}
        </div>
        {immutableColumnIds.length &&
        !immutableColumnIds.includes(column.id) ? (
          <button
            onClick={() => {
              deleteColumn(column.id);
            }}
            className="stroke-gray-500 hover:bg-secondary rounded px-1 py-2"
          >
            <DeleteIcon />
          </button>
        ) : (
          <div></div>
        )}
      </div>

      {/* Column tasks */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto"></div>

      {/* Add task */}
      <AddTaskDialog columnId={column.id} />
    </div>
  );
}
