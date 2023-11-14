"use client";
import MultipleBoards from "@/components/MultipleBoards";
import { MultipleBoardsProvider } from "@/contexts/MultipleBoardsContext";
export default function HomePage() {
  return (
    <MultipleBoardsProvider>
      <MultipleBoards />
    </MultipleBoardsProvider>
  );
}
