"use client";
import KanbanBoard from "@/components/KanbanBoard";
import { KanbanBoardProvider } from "@/contexts/KanbanBoardContext";
import { MultipleBoardsProvider } from "@/contexts/MultipleBoardsContext";

export default function Board({ params: { id } }: { params: { id: string } }) {
  return (
    <MultipleBoardsProvider>
      <KanbanBoardProvider boardId={id}>
        <KanbanBoard />
      </KanbanBoardProvider>
    </MultipleBoardsProvider>
  );
}
