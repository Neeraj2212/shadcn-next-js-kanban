import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import AddIcon from "@/icons/AddIcon";
import { Task } from "@/types";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./DatePicker";

export default function AddTaskDialog({ columnId }: { columnId: string }) {
  const initialState = useMemo<Task>(() => {
    return {
      id: uuidv4(),
      title: "",
      description: "",
      columnId: columnId,
      dueDate: undefined,
    };
  }, [columnId]);

  const [task, setTask] = useState<Task>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleDueDateChange = (date: Date | undefined) => {
    setTask({
      ...task,
      dueDate: date,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex h-12 gap-2 items-center rounded-md p-4 rounded-t-none  hover:font-bold ">
          <AddIcon /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={task.description}
              className="col-span-3 "
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <DatePicker
              className="col-span-3"
              date={task.dueDate}
              setDate={handleDueDateChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
