"use client";
import KanbanBoard from "@/components/KanbanBoard";
import NavBar from "@/components/NavBar";
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
        <div>
          <NavBar />
          <KanbanBoard />
        </div>
      </KanbanBoardProvider>
    </MultipleBoardsProvider>
  );
}
