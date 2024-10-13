"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ItemProps } from "@/app/types";
import { getData } from "./utils/indexedDb";
import ItemBox from "@/app/components/ItemBox";

export default function Home() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [craftingItems, setCraftingItems] = useState<Record<string, number>>(
    {}
  );
  const [requiredIngredients, setRequiredIngredients] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all_items = await getData<ItemProps>("mcc", "items");
        setItems(all_items);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = useCallback(
    (id: string, amount: number | null) => {
      if (amount !== null && amount < 0) {
        return;
      }

      setCraftingItems((prev) => {
        if (amount === null || amount === 0) {
          const rest = Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== id)
          );
          return rest;
        }
        return { ...prev, [id]: amount };
      });

      const newRequiredIngredients: Record<string, number> = {};

      const updatedCraftingItems = { ...craftingItems, [id]: amount };
      Object.entries(updatedCraftingItems).forEach(([itemId, itemAmount]) => {
        const item = items.find((item) => item.id === itemId);
        if (item && item.recipeIngredientAmounts && itemAmount !== null) {
          item.recipeIngredientAmounts.forEach((ingredient) => {
            newRequiredIngredients[ingredient.id] =
              (newRequiredIngredients[ingredient.id] || 0) +
              ingredient.amount * itemAmount;
          });
        }
      });

      setRequiredIngredients(newRequiredIngredients);
    },
    [craftingItems, items]
  );

  return (
    <main>
      {items.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <span>
            No craftable items. Go to the{" "}
            <a className="text-blue-500 hover:underline" href="/items">
              Items
            </a>{" "}
            page to add some
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4 bg-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-300">
            <h2 className="text-2xl font-bold text-center col-span-full">
              Craftable Items
            </h2>
            {items
              .filter((item) => item.craftable)
              .map((item) => (
                <div key={item.id} className="bg-gray-300">
                  <ItemBox item={item} onInputChange={handleInputChange} />
                </div>
              ))}
          </div>
          <div className="bg-gray-300 p-4">
            <h2 className="text-2xl font-bold text-center">
              Required Ingredients
            </h2>
            <ul>
              {Object.entries(requiredIngredients).map(([id, amount]) => {
                const item = items.find((item) => item.id === id);
                if (!item) return null;
                return (
                  <li
                    key={id}
                    className="flex items-center gap-2 bg-gray-400 rounded-lg p-2 w-max mb-2"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>
                      {item.name} x {amount} [{Math.floor(amount / 64)} +{" "}
                      {amount % 64}]
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
