import { ItemProps } from "@/app/types";
import Image from "next/image";

const ItemBox = ({
  item,
  onInputChange,
}: {
  item: ItemProps;
  onInputChange: (id: string, value: number | null) => void;
}) => {
  return (
    <div className="relative flex items-center justify-center">
      <Image
        className="inline-block border-4 bg-[#8B8B8B] border-t-[#373737] border-r-[#FFF] border-b-[#FFF] border-l-[#373737]"
        src={item.image}
        alt={item.name}
        width={128}
        height={128}
      />
      <input
        type="number"
        min={0}
        className="text-5xl text-white absolute w-full h-full bg-transparent text-center appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none"
        onChange={(e) => {
          const value = e.target.value;
          onInputChange(item.id, value === "" ? null : Number(value));
        }}
      />
    </div>
  );
};

export default ItemBox;
