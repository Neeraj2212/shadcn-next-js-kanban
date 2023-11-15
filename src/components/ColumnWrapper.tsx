import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import { Column } from "@/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { TrashIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import { TaskCard } from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

interface ColumnWrapperProps {
  column: Column;
}

export default function ColumnWrapper(props: ColumnWrapperProps) {
  const { column } = props;
  const { updateColumnTitle, deleteColumn } = useContext(KanbanBoardContext);

  const [editMode, setEditMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const columnTasks = column.tasks || [];

  const {
    setNodeRef,
    attributes,
    listeners,
    setDroppableNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: column.id.toString(),
    disabled: editMode,
    data: {
      type: "column",
      column: column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const draggingClasses = isDragging ? "brightness-50 cursor-grabbing" : "";

  return (
    <div
      className={clsx(
        "bg-secondary rounded-md flex flex-col touch-none max-h-[600px] h-[600px] w-[300px] sm:w-[350px] cursor-grab active:cursor-grabbing",
        draggingClasses
      )}
      ref={setNodeRef}
      style={style}
      {...(isDragging ? {} : attributes)}
      {...(isDragging ? {} : listeners)}
    >
      {/* Column title */}
      <div
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-primary text-md h-[60px] rounded-md rounded-b-none p-3 font-bold flex items-center justify-between"
      >
        <div className="flex gap-2 text-secondary">
          <div
            className="flex justify-center items-center bg-secondary
            px-2 py-1 text-sm rounded-full text-primary"
          >
            {columnTasks.length}
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

        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:bg-secondary rounded px-1 py-2"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Column tasks */}
      <div
        className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto"
        ref={setDroppableNodeRef}
      >
        <SortableContext items={columnTasks.map((t) => t.id)}>
          {columnTasks.map((task) => {
            if (task)
              return (
                <TaskCard key={task.id} task={task} columnId={column.id} />
              );
          })}
        </SortableContext>
      </div>

      {/* Add task */}
      <AddTaskDialog columnId={column.id} />
    </div>
  );
}
