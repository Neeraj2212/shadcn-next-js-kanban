import { MultipleBoardsContext } from "@/contexts/MultipleBoardsContext";
import { Board } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import EditBoardDialog from "./EditBoardDialog";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

export default function BoardCard({ board }: { board: Board }) {
  const { deleteBoard } = useContext(MultipleBoardsContext);

  return (
    <Link href={`/board/${board.id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {board.title}{" "}
            <div className="flex gap-1">
              <EditBoardDialog editableBoard={board} />
              <div
                className="stroke-rose-500 cursor-pointer"
                onClick={() => deleteBoard(board.id.toString())}
              >
                <TrashIcon className="h-5 w-5" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>{board.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
