"use client";
import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import { useContext, useState } from "react";
import ColumnWrapper from "./ColumnWrapper";
import { Button } from "./ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Task } from "@/types";
import { createPortal } from "react-dom";
import { TaskCard } from "./TaskCard";

export default function KanbanBoard() {
  const { columns, addColumn, moveOverAnotherTask } =
    useContext(KanbanBoardContext);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type !== "task") return;
    const { task } = event.active.data.current;
    setActiveTask(task);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    if (event.active.data.current?.type !== "task") return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  };

  const onDragOver = (event: DragOverEvent) => {
    if (!event.over) return;
    const { active, over } = event;
    if (active.id === over.id) return;

    const isOverColumn = over.data.current?.type === "column";
    const activeColumnId = active.data.current?.task.columnId;
    const overColumnId = isOverColumn
      ? over.data.current?.column.id
      : over.data.current?.task.columnId;

    if (!isOverColumn) {
      return moveOverAnotherTask(
        activeColumnId,
        overColumnId,
        active.id.toString(),
        over.id.toString()
      );
    }
  };

  return (
    <div className="flex w-full px-[40px] py-10 ">
      <DndContext
        id="kanban-board"
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-4">
          <div className="flex gap-4">
            {columns.map((column) => {
              return <ColumnWrapper key={column.id} column={column} />;
            })}
          </div>
          <Button
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg
                text-md font-bold p-4 flex gap-2"
            onClick={() => {
              addColumn();
            }}
          >
            <PlusCircledIcon className="h-6 w-6" />
            Add Column
          </Button>
        </div>
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
