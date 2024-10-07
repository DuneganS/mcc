import { useDroppable } from "@dnd-kit/core";
import React from "react";

type DroppableSlotProps = {
  id: number;
  isHovered: boolean;
  children?: React.ReactNode;
};

export default function DroppableSlot({
  id,
  isHovered,
  children,
}: DroppableSlotProps) {
  const { setNodeRef } = useDroppable({
    id: `droppable-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative inline-block border-4 bg-[#8B8B8B] border-t-[#373737] border-r-[#FFF] border-b-[#FFF] border-l-[#373737] w-16 h-16 text-xs leading-none text-left align-bottom`}
    >
      {children}
    </div>
  );
}
