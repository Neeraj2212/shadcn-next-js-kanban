"use client";
import { KanbanBoardContext } from "@/contexts/KanbanBoardContext";
import { useContext, useMemo, useState } from "react";
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
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column, Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

export default function KanbanBoard() {
  const { columns, addColumn, setColumns } = useContext(KanbanBoardContext);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [acitveCol, setActiveCol] = useState<Column | null>(null);
  const draggableTypes = useMemo(() => ["column", "task"], []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const findColumnIdx = (id: UniqueIdentifier | undefined, type: string) => {
    if (type === "column") {
      return columns.findIndex((item) => item.id === id);
    }
    if (type === "task") {
      return columns.findIndex((column) =>
        column.tasks.some((item) => item.id === id)
      );
    }
  };

  function checkValidIdx(idx: number | undefined): idx is number {
    return idx !== undefined && idx !== -1;
  }

  const onDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (!data || !draggableTypes.includes(data.type)) return;
    const activeType = data.type;
    if (activeType === "task") {
      const { task } = data;
      setActiveTask(task);
    }
    if (activeType === "column") {
      const { column } = data;
      setActiveCol(column);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveCol(null);

    const { active, over } = event;
    if (!active || !over) return;
    if (active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "column" && overType === "column") {
      const activeColumnIdx = findColumnIdx(active.id, activeType);
      const overColumnIdx = findColumnIdx(over.id, overType);

      if (!checkValidIdx(activeColumnIdx) || !checkValidIdx(overColumnIdx))
        return;

      let newColumns = [...columns];
      newColumns = arrayMove(newColumns, activeColumnIdx, overColumnIdx);
      setColumns(newColumns);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "task" && overType === "task") {
      const activeColumnIdx = findColumnIdx(active.id, activeType);
      const overColumnIdx = findColumnIdx(over.id, overType);

      if (!checkValidIdx(activeColumnIdx) || !checkValidIdx(overColumnIdx))
        return;

      const activeColumn = columns[activeColumnIdx];
      const overColumn = columns[overColumnIdx];

      const activeItemIdx = activeColumn.tasks.findIndex(
        (item) => item.id === active.id
      );

      const overItemIdx = overColumn.tasks.findIndex(
        (item) => item.id === over.id
      );

      if (activeColumnIdx === overColumnIdx) {
        let newColumns = [...columns];
        newColumns[activeColumnIdx].tasks = arrayMove(
          newColumns[activeColumnIdx].tasks,
          activeItemIdx,
          overItemIdx
        );
        setColumns(newColumns);
      } else {
        // In different columns
        let newColumns = [...columns];
        const [removedItem] = newColumns[activeColumnIdx].tasks.splice(
          activeItemIdx,
          1
        );
        newColumns[overColumnIdx].tasks.splice(overItemIdx, 0, removedItem);
        setColumns(newColumns);
      }
    }

    if (activeType === "task" && overType === "column") {
      const activeColumnIdx = findColumnIdx(active.id, activeType);
      const overColumnIdx = findColumnIdx(over.id, overType);

      if (!checkValidIdx(activeColumnIdx) || !checkValidIdx(overColumnIdx))
        return;

      const activeColumn = columns[activeColumnIdx];
      const overColumn = columns[overColumnIdx];

      const activeItemIdx = activeColumn.tasks.findIndex(
        (item) => item.id === active.id
      );

      const overItemIdx = overColumn.tasks.length;

      let newColumns = [...columns];
      const [removedItem] = newColumns[activeColumnIdx].tasks.splice(
        activeItemIdx,
        1
      );
      newColumns[overColumnIdx].tasks.splice(overItemIdx, 0, removedItem);
      setColumns(newColumns);
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
            <SortableContext items={columns.map((c) => c.id)}>
              {columns.map((column) => {
                return <ColumnWrapper key={column.id} column={column} />;
              })}
            </SortableContext>
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
          {acitveCol && <ColumnWrapper column={acitveCol} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
