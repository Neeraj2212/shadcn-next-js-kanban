import * as React from "react";

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

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {task.title} <EditTaskDialog editableTask={task} />
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
