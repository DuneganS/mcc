import type { ItemProps } from "@/app/types/Item";

export default function Item(item: ItemProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white rounded-lg">
      <div className="px-6 py-2 bg-orange-500">
        <div className="font-bold text-xl mb-2 text-center">{item.name}</div>
      </div>
      <div className="flex justify-center p-5">
        <img className="w-256 h-256" src={item.image} alt={item.name} />
      </div>
    </div>
  );
}
