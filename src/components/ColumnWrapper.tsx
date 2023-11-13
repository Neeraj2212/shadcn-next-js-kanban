import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import { Column } from "@/types";
import { useContext, useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { TaskCard } from "./TaskCard";

interface ColumnWrapperProps {
  column: Column;
}

export default function ColumnWrapper(props: ColumnWrapperProps) {
  const { column } = props;
  const { taskIds } = column;
  const { updateColumnTitle, deleteColumn, immutableColumnIds, tasks } =
    useContext(KanbanBoardContext);

  const [editMode, setEditMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const columnTasks = column.taskIds.map((taskId) =>
    tasks.find((task) => task.id === taskId)
  );

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
            <TrashIcon className="h-6 w-6" />
          </button>
        ) : (
          <div></div>
        )}
      </div>

      {/* Column tasks */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {columnTasks.map((task) => {
          if (task) return <TaskCard key={task.id} task={task} />;
        })}
      </div>

      {/* Add task */}
      <AddTaskDialog columnId={column.id} />
    </div>
  );
}
