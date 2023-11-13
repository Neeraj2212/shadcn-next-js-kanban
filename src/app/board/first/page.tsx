"use client";
import KanbanBoard from "@/components/KanbanBoard";
import { KanbanBoardProvider } from "@/contexts/KanbanBoardContext";

export default function Board() {
  return (
    <KanbanBoardProvider>
      <KanbanBoard />
    </KanbanBoardProvider>
  );
}
