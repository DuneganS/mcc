import Image from "next/image";
import React, { useEffect } from "react";
import { ItemProps } from "../types/Item";
import { getData } from "../utils/indexedDb";
import { useDroppable } from "@dnd-kit/core";
import { CRAFTING_ARROW } from "../utils/constants";

const CraftingGridInSlot: React.FC<{ slot: number; itemId?: string }> = ({
  slot,
  itemId = "",
}) => {
  const [item, setItem] = React.useState<ItemProps | null>(null);
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-slot-${slot}`,
  });

  if (itemId !== "") {
    getData("mcc", "items", itemId).then((data) => {
      setItem(data as unknown as ItemProps);
    });
  }

  const border = isOver
    ? "border-cyan-500"
    : "border-t-[#373737] border-r-[#FFF] border-b-[#FFF] border-l-[#373737]";

  return (
    <a
      ref={setNodeRef}
      href={item ? `/items/${item.id}` : "#"}
      title={item?.name}
      className={`relative inline-block bg-[#8B8B8B] border-4 ${border} w-16 h-16 text-xs leading-none text-left align-bottom`}
    >
      {item && <Image src={item.image} alt={item.name} fill={true}></Image>}
    </a>
  );
};

const CraftingGridOutSlot: React.FC<{
  item: ItemProps;
  onRecipeOutputChange: (newOutput: number) => void;
}> = ({ item, onRecipeOutputChange }) => {
  const [outputCount, setOutputCount] = React.useState<number>(
    item.recipeOutput
  );

  const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(64, Number(e.target.value)));
    setOutputCount(value);
    onRecipeOutputChange(value);
  };

  return (
    <span className="relative inline-block bg-[#8B8B8B] border-2 border-t-[#373737] border-r-[#FFF] border-b-[#FFF] border-l-[#373737] w-24 h-24 text-xs leading-none text-left align-bottom -ml-8 flex items-center justify-center">
      <Image src={item.image} alt={item.name} fill={true}></Image>
      <input
        type="number"
        value={outputCount}
        onChange={handleOutputChange}
        className="bg-transparent text-white font-bold text-2xl text-center appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none w-full h-full z-10"
        min="1"
        max="64"
      />
    </span>
  );
};

const CraftingGridRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <span className="block">{children}</span>;
};

const CraftingGrid: React.FC<{
  item: ItemProps;
  onRecipeOutputChange: (newOutput: number) => void;
}> = ({ item, onRecipeOutputChange }) => {
  return (
    <span className="gap-1 border-2 p-1.5 bg-[#C6C6C6] inline-block rounded flex items-center flex-shrink-0 flex-grow-0 mb-5">
      <span className="inline-block relative bg-[#C6C6C6] border-solid border-1 border-t-[#DBDBDB] border-r-[#5B5B5B] border-b-[#5B5B5B] border-l-[#DBDBDB] p-0.5 text-left whitespace-nowrap align-bottom">
        {Array.from({ length: 3 }, (_, rowIndex) => (
          <CraftingGridRow key={rowIndex}>
            {Array.from({ length: 3 }, (_, colIndex) => {
              const slot = rowIndex * 3 + colIndex;
              return (
                <CraftingGridInSlot
                  key={slot}
                  slot={slot}
                  itemId={item.recipeIngredients[slot]}
                />
              );
            })}
          </CraftingGridRow>
        ))}
      </span>
      <img className="scale-[.50] -ml-8" src={CRAFTING_ARROW} />
      <CraftingGridOutSlot
        item={item}
        onRecipeOutputChange={onRecipeOutputChange}
      />
    </span>
  );
};

export default CraftingGrid;
