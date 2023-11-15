import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import EditTaskDialog from "./EditTaskDialog";
import { Badge } from "./ui/badge";
import clsx from "clsx";

export function TaskCard({ task, columnId }: { task: Task; columnId: string }) {
  const { deleteTask } = useContext(KanbanBoardContext);
  const dueDate = new Date(task.dueDate || "");

  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: task.id.toString(),
    data: {
      type: "task",
      task: task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const draggingClasses = isDragging ? "opacity-30 cursor-grabbing" : "";

  return (
    <Card
      className={clsx(
        `w-full cursor-grab active:cursor-grabbing touch-none`,
        draggingClasses
      )}
      ref={setNodeRef}
      style={style}
      {...(isDragging ? {} : attributes)}
      {...(isDragging ? {} : listeners)}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          {task.title}{" "}
          <div className="flex gap-1">
            <EditTaskDialog columnId={columnId} editableTask={task} />
            <div
              className="stroke-rose-500 cursor-pointer"
              onClick={() => deleteTask(columnId, task)}
            >
              <TrashIcon className="h-5 w-5" />
            </div>
          </div>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between text-sm">
        <span>
          {dueDate
            ? dueDate?.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "No Due Date"}
        </span>
        {dueDate && dueDate < new Date() && (
          <Badge variant="destructive">Delayed</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
