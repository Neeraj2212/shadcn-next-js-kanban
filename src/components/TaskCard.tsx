import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types";
import { Badge } from "./ui/badge";
import EditTaskDialog from "./EditTaskDialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TaskCard({ task }: { task: Task }) {
  const { deleteTask } = useContext(KanbanBoardContext);

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
      className={`w-full cursor-grab active:cursor-grabbing ${draggingClasses}`}
      ref={setNodeRef}
      style={style}
      {...(isDragging ? {} : attributes)}
      {...(isDragging ? {} : listeners)}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          {task.title}{" "}
          <div className="flex gap-1">
            <EditTaskDialog editableTask={task} />
            <div
              className="stroke-rose-500 cursor-pointer"
              onClick={() => deleteTask(task.id)}
            >
              <TrashIcon className="h-5 w-5" />
            </div>
          </div>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      {task.dueDate && (
        <CardFooter className="flex justify-between text-sm">
          <span>{task.dueDate.toLocaleDateString()}</span>
          {task.dueDate < new Date() && (
            <Badge variant="destructive">Delayed</Badge>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
