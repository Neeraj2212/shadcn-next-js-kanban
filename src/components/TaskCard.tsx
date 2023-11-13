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

export function TaskCard({ task }: { task: Task }) {
  const { deleteTask } = useContext(KanbanBoardContext);

  return (
    <Card className="w-full">
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
