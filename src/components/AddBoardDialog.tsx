import { MultipleBoardsContext } from "@/contexts/MultipleBoardsContext";
import { Board } from "@/types";
import { PlusCircledIcon } from "@radix-ui/react-icons";
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

export default function AddBoardDialog() {
  const initialState = useMemo<Board>(() => {
    return {
      id: uuidv4(),
      title: "",
      description: "",
      columns: [],
    };
  }, []);

  const [board, setBoard] = useState<Board>(initialState);
  const [open, setOpen] = useState(false);
  const { addBoard } = useContext(MultipleBoardsContext);

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
    addBoard(board);
    const newState = initialState;
    initialState.id = uuidv4();
    setBoard(newState);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((p) => !p)}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="flex flex-col h-full gap-2 items-center rounded-md p-4 hover:font-bold "
        >
          <PlusCircledIcon className="h-10 w-10" /> <p>Add Board</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Board</DialogTitle>
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
