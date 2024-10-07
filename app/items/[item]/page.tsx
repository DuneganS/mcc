"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  getData,
  deleteData,
  addData,
  updateData,
} from "@/app/utils/indexedDb";
import { ItemProps } from "@/app/types/Item";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { DEFAULT_ITEM } from "@/app/utils/constants";
import DraggableItem from "@/app/components/DraggableItem";
import { CRAFTING_ARROW } from "@/app/utils/constants";
import Image from "next/image";
import React from "react";
import DroppableSlot from "@/app/components/DroppableSlot";
import { nanoid } from "nanoid";

const ItemPage = ({ params }: { params: any }) => {
  const itemId = params.item;
  const [item, setItem] = useState<ItemProps>();
  const [items, setItems] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredDroppable, setHoveredDroppable] = useState<number | null>(null);
  const [itemsInGrid, setItemsInGrid] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchItems = async () => {
      const dbItems = await getData("mcc", "items");
      if (dbItems) {
        setItems(dbItems as ItemProps[]);
        if (itemId === "newItemId") {
          const glassItem = (dbItems as ItemProps[]).find(
            (item) => item.name.toLowerCase() === "glass"
          );
          setItem(DEFAULT_ITEM);
        } else {
          const selectedItem = (dbItems as ItemProps[]).find(
            (item) => item.id === itemId
          );
          setItem(selectedItem);
          setItemsInGrid((prev) => {
            const newSelectedItems = { ...prev };
            selectedItem?.recipeIngredients.forEach((ingredient, index) => {
              if (ingredient) {
                newSelectedItems[
                  index.toString()
                ] = `${ingredient}-${nanoid()}`;
              }
            });
            return newSelectedItems;
          });
        }
      }
      setIsLoading(false);
    };

    fetchItems();
  }, [itemId]);

  useEffect(() => {
    if (!isLoading && !item) {
      notFound();
    }
  }, [isLoading, itemId]);

  useEffect(() => {
    setItem((prevItem) => {
      if (!prevItem) return prevItem;

      const newRecipeIngredients = Array(9).fill("");
      console.log("itemsInGrid:", itemsInGrid); // Debugging log

      Object.keys(itemsInGrid).forEach((key) => {
        const index = parseInt(key, 10);
        console.log(
          `Setting index ${index} with value ${itemsInGrid[key].split("-")[0]}`
        ); // Debugging log
        newRecipeIngredients[index] = itemsInGrid[key].split("-")[0];
      });

      return {
        ...prevItem,
        recipeIngredients: newRecipeIngredients,
      };
    });
  }, [itemsInGrid]);

  const handleItemDelete = () => {
    if (itemId === "newItemId") {
      window.location.href = "/items";
      return;
    }
    deleteData("mcc", "items", item?.id);
    window.location.href = "/items";
  };

  const handleItemIsCraftable = () => {
    setItem((prev) => (prev ? { ...prev, craftable: !prev.craftable } : prev));
  };

  const handleItemSaveUpdate = () => {
    let action = "create";
    if (!item) {
      alert("No item to save");
      return;
    }

    if (item.id === "" || item.id === "newItemId") {
      alert("Please enter a valid item ID");
      return;
    }

    if (items.find((i) => i.id === item.id)) {
      action = "update";
    }

    if (!item.craftable) {
      item.recipeIngredients = Array(9).fill("");
      item.recipeOutput = 0;
    }

    const saveItem = async () => {
      if (action === "create") {
        await addData("mcc", "items", item);
      } else {
        await updateData("mcc", "items", item);
      }
    };

    saveItem();
    window.location.href = `/items/${item.id}`;
  };

  const handleUpdateItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setItem((prev) => (prev ? { ...prev, name: sanitizedValue } : prev));
    setItem((prev) =>
      prev
        ? { ...prev, id: sanitizedValue.replace(/\s+/g, "_").toLowerCase() }
        : prev
    );
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setItem((prev) =>
            prev ? { ...prev, image: reader.result as string } : prev
          );
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over) {
      const droppableId = parseInt(over.id.split("-")[1], 10);
      const uniqueId = `${active.id.split("-")[0]}-${nanoid()}`;
      setItemsInGrid((prev) => {
        const newSelectedItems = { ...prev };
        // Remove the item from its previous droppable
        Object.keys(newSelectedItems).forEach((key) => {
          if (newSelectedItems[key] === active.id) {
            delete newSelectedItems[key];
          }
        });
        // Add the item to the new droppable
        newSelectedItems[droppableId.toString()] = uniqueId;
        return newSelectedItems;
      });
    } else {
      setItemsInGrid((prev) => {
        const newSelectedItems = { ...prev };
        Object.keys(newSelectedItems).forEach((key) => {
          if (newSelectedItems[key] === active.id) {
            delete newSelectedItems[key];
          }
        });
        return newSelectedItems;
      });
    }
  };

  const handleDragOver = (event: any) => {
    const { over } = event;
    if (over) {
      const droppableId = parseInt(over.id.split("-")[1], 10);
      setHoveredDroppable(droppableId);
    } else {
      setHoveredDroppable(null);
    }
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const outputCount = Math.max(1, Math.min(64, Number(e.target.value)));
    setItem((prev) =>
      prev
        ? {
            ...prev,
            recipeOutput: outputCount,
          }
        : prev
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="w-4/5 mx-auto m-5 bg-orange-500/75 rounded-xl pb-1">
          <div className="p-2 rounded-t-xl bg-orange-500/80 flex justify-between items-center">
            <p className="font-bold text-lg">{item?.name || "Adding item"}</p>
            <div className="flex gap-2">
              <button
                title="Save item"
                className="block bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={handleItemSaveUpdate}
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
                  onChange={handleUpdateItemName}
                />
              </div>
              <div className="mb-2">
                <div className="flex items-center mb-2">
                  <label
                    className="block text-gray-700 font-medium mr-2"
                    htmlFor="image"
                  >
                    Image:
                  </label>
                  <button
                    className="bg-orange-600 hover:bg-orange-800 text-white font-medium rounded-lg text-sm px-4 py-2 h-8 w-full flex justify-center items-center"
                    type="button"
                    onClick={handleImageUpload}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                  <span className="mr-2 text-gray-700 font-medium">
                    Craftable:
                  </span>
                  <div className="relative flex-grow">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={item?.craftable}
                      onChange={handleItemIsCraftable}
                    />
                    <div
                      className={`block h-8 rounded-lg ${
                        item?.craftable ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                      {item?.craftable ? "True" : "False"}
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
            <div className="m-2 justify-center bg-red-500/75 rounded-xl">
              <h1 className="text-xl justify-center flex m-2">
                Crafting Recipe
              </h1>
              <div className="grid grid-cols-3 gap-4 m-2">
                <ul className="grid grid-cols-5 gap-2 h-16">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-center bg-[#8B8B8B] rounded-xl border-2 border-black p-0.5"
                    >
                      <DraggableItem
                        id={item.id}
                        name={item.name}
                        image={item.image}
                      />
                    </li>
                  ))}
                </ul>
                <div className="col-span-2 flex justify-center items-center">
                  <span className="gap-1 border-2 p-1.5 bg-[#C6C6C6] inline-block rounded flex items-center flex-shrink-0 flex-grow-0 mb-5">
                    <span className="inline-block relative bg-[#C6C6C6] border-solid border-1 border-t-[#DBDBDB] border-r-[#5B5B5B] border-b-[#5B5B5B] border-l-[#DBDBDB] p-0.5 text-left whitespace-nowrap align-bottom">
                      {Array.from({ length: 3 }, (_, rowIndex) => (
                        <span className="block" key={rowIndex}>
                          {Array.from({ length: 3 }, (_, colIndex) => {
                            const slot = rowIndex * 3 + colIndex;
                            return (
                              <DroppableSlot
                                key={slot}
                                id={slot}
                                isHovered={hoveredDroppable === slot}
                              >
                                {itemsInGrid[slot] && (
                                  <DraggableItem
                                    key={itemsInGrid[slot]}
                                    id={itemsInGrid[slot]}
                                    name={
                                      items.find(
                                        (item) =>
                                          item.id ===
                                          itemsInGrid[slot].split("-")[0]
                                      )?.name || ""
                                    }
                                    image={
                                      items.find(
                                        (item) =>
                                          item.id ===
                                          itemsInGrid[slot].split("-")[0]
                                      )?.image || ""
                                    }
                                  />
                                )}
                              </DroppableSlot>
                            );
                          })}
                        </span>
                      ))}
                    </span>
                    <img className="scale-[.50] -ml-8" src={CRAFTING_ARROW} />
                    <span className="relative inline-block bg-[#8B8B8B] border-2 border-t-[#373737] border-r-[#FFF] border-b-[#FFF] border-l-[#373737] w-24 h-24 text-xs leading-none text-left align-bottom -ml-8 flex items-center justify-center">
                      <Image
                        src={item?.image || ""}
                        alt={item?.name || ""}
                        fill={true}
                      ></Image>
                      <input
                        type="number"
                        value={item?.recipeOutput || 0}
                        onChange={handleOutputChange}
                        min={1}
                        max={64}
                        className="bg-transparent text-white font-bold text-2xl text-center appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none w-full h-full z-10"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </DndContext>
  );
};

export default ItemPage;
