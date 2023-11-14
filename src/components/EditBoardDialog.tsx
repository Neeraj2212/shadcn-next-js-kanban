import { MultipleBoardsContext } from "@/contexts/MultipleBoardsContext";
import { Board } from "@/types";
import { Pencil1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function EditBoardDialog({
  editableBoard,
}: {
  editableBoard: Board;
}) {
  const [board, setBoard] = useState<Board>(editableBoard);
  const [open, setOpen] = useState(false);
  const { updateBoard } = useContext(MultipleBoardsContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBoard(board);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((p) => !p)}>
      <DialogTrigger asChild>
        <Button className="p-0 pl-2 shadow-none stroke-gray-500 bg-transparent hover:bg-transparent h-auto">
          <Pencil1Icon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={board.title}
                onChange={handleChange}
                required
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
                value={board.description}
                className="col-span-3 "
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
