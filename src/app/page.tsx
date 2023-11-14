"use client";
import MultipleBoards from "@/components/MultipleBoards";
import dynamic from "next/dynamic";

const MultipleBoardsProvider = dynamic(
  () =>
    import("@/contexts/MultipleBoardsContext").then(
      (mod) => mod.MultipleBoardsProvider
    ),
  { ssr: false }
);

export default function HomePage() {
  return (
    <MultipleBoardsProvider>
      <MultipleBoards />
    </MultipleBoardsProvider>
  );
}
