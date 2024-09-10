"use client";
import { useEffect, useState } from "react";
import { getData, deleteData } from "@/app/utils/indexedDb";
import { ItemProps } from "@/app/types/Item";

const ItemPage = ({ params }: { params: any }) => {
  const itemId = params.item;
  const [item, setItem] = useState<ItemProps>({
    id: "",
    name: "",
    image: "",
    craftable: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedItems = await getData("mcc", "items");
      if (storedItems) {
        setItem(
          storedItems.find((item: any) => item.id === itemId) as ItemProps
        );
      }
    };
    fetchData();
  }, [itemId]);

  const handleItemDelete = () => {
    deleteData("mcc", "items", item.id);
    window.location.href = "/items";
  };

  const handleItemIsCraftable = () => {
    setItem((prev) => ({ ...prev, craftable: !prev.craftable }));
  };

  const handleItemUpdate = () => {};

  return (
    <div className="w-3/5 mx-auto m-5 bg-orange-500/75 rounded-xl pb-1">
      <div className="p-2 rounded-t-xl bg-orange-500/80 flex justify-between items-center">
        <p className="font-bold text-lg">{item?.name}</p>
        <div className="flex gap-2">
          <button
            title="Save item"
            className="block bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={handleItemUpdate}
          >
            <svg
              className="h-4 w-4 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </button>
          <button
            title="Delete item"
            className="block bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={handleItemDelete}
          >
            <svg
              className="h-4 w-4 text-black"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 m-2 justify-center bg-orange-500/85 rounded-xl">
        <div className="p-2">
          <div className="mb-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="id"
            >
              ID:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              disabled
              className="rounded p-2 bg-gray-200 w-full"
              defaultValue={item?.id}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="rounded p-2 bg-gray-200 w-full"
              defaultValue={item?.name}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Image:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              disabled
              className="rounded p-2 bg-gray-200 w-full"
              value={item?.image}
            />
          </div>
          <div>
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-gray-700 font-medium">Craftable:</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={item.craftable}
                  onChange={handleItemIsCraftable}
                />
                <div
                  className={`block w-24 h-8 rounded-lg ${
                    item.craftable ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                  {item.craftable ? "True" : "False"}
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="justify-center flex m-2 p-2 bg-white rounded-lg">
          <img
            src={item?.image}
            alt={item?.name}
            className="w-[256px] h-auto"
          />
        </div>
      </div>
      {item?.craftable && (
        <div className="col-span-4">
          <h1 className="text-xl justify-center flex">Crafting Recipe</h1>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
