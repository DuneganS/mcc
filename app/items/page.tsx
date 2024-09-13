"use client";

import { useEffect, useState } from "react";
import Item from "@/app/components/ItemCard";
import { ItemProps } from "@/app/types/Item";
import { getData, resetStore } from "@/app/utils/indexedDb";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedItems = await getData<ItemProps>("mcc", "items");
      if (storedItems) {
        setItems(storedItems);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [items]);

  const handleAddItem = () => {
    router.push(`/items/newItemId`);
  };

  const refreshItems = async () => {
    alert(
      "Are you sure you want to refresh items? This will remove all non-default items."
    );
    setIsLoading(true);
    resetStore("mcc", "items");
    setIsLoading(false);
  };

  const deleteAllItems = () => {
    alert("Are you sure you want to delete all items?");
    setIsLoading(true);
    const db = indexedDB.open("mcc");
    db.onsuccess = () => {
      const transaction = db.result.transaction("items", "readwrite");
      const objectStore = transaction.objectStore("items");
      objectStore.clear();
      setIsLoading(false);
      setItems([]);
    };
  };

  return (
    <div className="w-4/5 mx-auto m-5 bg-orange-500/75 rounded-xl">
      <div className="p-2 rounded-xl bg-orange-500/80 flex justify-between items-center">
        <p className="font-bold text-lg">Current Inventory</p>
        <div className="block flex items-center">
          <button
            title="Add new item"
            className="bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            onClick={handleAddItem}
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            title="Reset to default items"
            className="bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            type="button"
            onClick={refreshItems}
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
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
            </svg>
          </button>
          <button
            title="Delete all items"
            className="bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={deleteAllItems}
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
      <div className="p-2 ">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {items.length === 0 ? (
              <div className="col-span-5 text-center">
                No items found. Add some items to get started.
              </div>
            ) : (
              items
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <Link href={`/items/${item.id}`} key={item.id}>
                    <Item {...item} />
                  </Link>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
