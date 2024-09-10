"use client";

import { useState } from "react";
import { ItemProps } from "@/app/types/Item";
import { addData } from "@/app/utils/indexedDb";

const NewItemModal: React.FC<{
  toggleModal: () => void;
}> = ({ toggleModal }) => {
  const [newItem, setNewItem] = useState<ItemProps>({
    id: "",
    name: "",
    image: "",
    craftable: false,
  });

  const handleAddNewItem = async () => {
    newItem.id = newItem.name.toLowerCase().replace(/\s/g, "_");
    if (newItem.image === "") {
      newItem.image =
        "data:image/webp;base64,UklGRuYDAABXRUJQVlA4TNoDAAAvK8FKEGegKJIUh8IL/l1lLqfn2VAUAIRjRdK/gQBeGnB7/JRGksIQLD3Qf2WPygo3/wFAxJB9TAk/TAJgU/OfPtOg8vLts0hdApLbRpKkaEv//3RmRFQvM+eI/k9AtThseABgw3VGO2HYMb6xfIQjOiM5fMRVVFfx3OSoTdTXKsouhrTd+F080f8HSMoFkCrjgFupDV2pFyalJmFWB5syyaoMuzHkONveRs43aZ3toU8wIOB+APkAscypdzedMZ2vkarttnc8whxg8/bC3CA5h5E2iBIV/k+kHBARDty2cSRHXvTrdZLNA1B70W9xsmo5k0HKaKG5innMybPYmQxSRox/lUNn/ztWJKQz/4kqvyI0WJrEHPYJDWaz7H8NfkWUDf7nFn1SUsoPadFKUHketIo0mhncqcBHKfdzK6mBFjokfxkJjSPrF7kWidaGnz/L/hxKQ7JPjZAHwcYoV0mnMG4ZV7BxKm+lqZamW0mfBXJgLEjk2LkwdhE5m4+B4aksuigqpmEESeH4lvm9yEEr2b5mr92VaH9GHgRvPXYxDCqeIy86dlNT91SAV6DbySuw/H7QcjUwsLZo8lg4ZBwatGl9DvkdEf5WiSErgnISGn1FBaVgVokzQanjWT4olVXqz6Vopr+Iq34e+JBVjjwoQ63kkYoMcyG9IYISJCQOQCq2XIj7PWdDnmY5keycY8UlZFFM3SjbFWMaRqExyhSV6wIoId90gi57qKAQCk+CnaCTGTFOmblpnQ6sfGTFGwdBVY529Q38KiUB06m+gVIUdBgZelgFKikMX9tpU7zAyNCcDG1tThMCsq0cEf/P/4pZpEGmI9yTqrSpY6R5/fdeu4oCo0Hxpmc5sJpnxIRWHtN18FFda86PeHHG//xXQ3zjpJHveYzmO2aNFg2F2qQ0qCdU/QJSoJ7wek3Os3UofL6yxNXdGgou+eEM6gl4fXxmW4mlOXhmAwnz4HbuARItvTxsRqqQznk8QQMfbnkhPdk/CV7kORldtM+AB9eQojOsOgqAMeNTspS/o8v9NCTrTL5Z0ZN8cBLu9wSqKOSpMMSpODgJ41OyVEzGbRolIDM5kbxvl8KUhI8MCInTRnrk1VBuMwgyDNomvGf9LQLnY5cTuysSswecDGxlmhErF+o0uoILxZYbkfEhxFEBjUsh9TuBoz00nKo8beYsCq2+kmdgwRahhTDd/ZZ0nUpjC5liMQppIS5snDVWc0lGvziTsot0LI0Y4rFuNiIfUh1Q7tsUaTjUOfxPvzLINtmdjOBQaqJiTMrf6BTXPXmyvn7yPceHEzOi/hqmAQ==";
    }

    const id = await addData<ItemProps>("mcc", "items", newItem);
    setNewItem({ ...newItem, id: id.toString() });
    toggleModal();
  };

  const handleItemIsCraftable = () => {
    setNewItem((prev) => ({ ...prev, craftable: !prev.craftable }));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <div className="flex justify-between">
          <p className="text-lg font-bold">Adding New Item</p>
          <button className="text-lg" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-lg p-2"
            placeholder="Required"
            value={newItem?.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image URL"
            className="rounded-lg p-2"
          />
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-gray-700 font-medium">Craftable:</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                onChange={handleItemIsCraftable}
                checked={newItem.craftable}
              />
              <div
                className={`block w-24 h-8 rounded-lg ${
                  newItem.craftable ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                {newItem.craftable ? "True" : "False"}
              </div>
            </div>
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleAddNewItem}
            disabled={!newItem?.name} // Disable button if name is empty
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItemModal;
