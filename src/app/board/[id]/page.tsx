"use client";
import KanbanBoard from "@/components/KanbanBoard";
import { KanbanBoardProvider } from "@/contexts/KanbanBoardContext";
import dynamic from "next/dynamic";

const MultipleBoardsProvider = dynamic(
  () =>
    import("@/contexts/MultipleBoardsContext").then(
      (mod) => mod.MultipleBoardsProvider
    ),
  { ssr: false }
);

export default function Board({ params: { id } }: { params: { id: string } }) {
  return (
    <MultipleBoardsProvider>
      <KanbanBoardProvider boardId={id}>
        <KanbanBoard />
      </KanbanBoardProvider>
    </MultipleBoardsProvider>
  );
}
