import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";

const DraggableItem = ({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const dragStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <Image
      width={64}
      height={64}
      src={image}
      alt={name}
      ref={setNodeRef}
      style={dragStyle}
      className="relative z-50"
      {...attributes}
      {...listeners}
    />
  );
};

export default DraggableItem;
