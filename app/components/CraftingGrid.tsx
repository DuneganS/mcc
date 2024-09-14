import Image from "next/image";
import React from "react";
import { ItemProps } from "../types/Item";

const CraftingGridInSlot: React.FC<{ item?: ItemProps }> = ({ item }) => {
  return (
    <a
      href={item ? `/items/${item.id}` : "#"}
      title={item && item.name}
      className="relative inline-block bg-[#8B8B8B] border-4 border-t-[#373737] border-r-[#FFF] border-b-[#FFF] border-l-[#373737] w-16 h-16 text-xs leading-none text-left align-bottom"
    >
      {item && <Image src={item.image} alt={item.name} fill={true}></Image>}
    </a>
  );
};

const CraftingGridOutSlot: React.FC<{ item?: ItemProps }> = ({ item }) => {
  return (
    <span className="relative inline-block bg-[#8B8B8B] border-2 border-t-[#373737] border-r-[#FFF] border-b-[#FFF] border-l-[#373737] w-24 h-24 text-xs leading-none text-left align-bottom -ml-8"></span>
  );
};

const CraftingGridRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <span className="block">{children}</span>;
};

const CraftingGrid: React.FC<{ items: (ItemProps | undefined)[] }> = ({
  items,
}) => {
  return (
    <span className="gap-1 border-2 p-1.5 bg-[#C6C6C6] inline-block rounded flex items-center flex-shrink-0 flex-grow-0">
      <span className="inline-block relative bg-[#C6C6C6] border-solid border-1 border-t-[#DBDBDB] border-r-[#5B5B5B] border-b-[#5B5B5B] border-l-[#DBDBDB] p-0.5 text-left whitespace-nowrap align-bottom">
        <CraftingGridRow>
          <CraftingGridInSlot />
          <CraftingGridInSlot />
          <CraftingGridInSlot />
        </CraftingGridRow>
        <CraftingGridRow>
          <CraftingGridInSlot />
          <CraftingGridInSlot />
          <CraftingGridInSlot />
        </CraftingGridRow>
        <CraftingGridRow>
          <CraftingGridInSlot />
          <CraftingGridInSlot />
          <CraftingGridInSlot />
        </CraftingGridRow>
      </span>
      <img
        className="scale-[.50] -ml-8"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACCCAYAAADBq8MQAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bS1WqDnYQcQhSnSyIijiWKhbBQmkrtOpgcukXNGlIUlwcBdeCgx+LVQcXZ10dXAVB8APE2cFJ0UVK/F9SaBHjwXE/3t173L0DvI0KU4yuKKCopp6Kx4RsblUIvKIH/fBjFJMiM7REejED1/F1Dw9f7yI8y/3cn6NPzhsM8AjEUabpJvEG8eymqXHeJw6xkigTnxNP6HRB4keuSw6/cS7a7OWZIT2TmicOEQvFDpY6mJV0hXiGOCwrKuV7sw7LnLc4K5Uaa92TvzCYV1fSXKc5gjiWkEASAiTUUEYFJiK0qqQYSNF+zMU/bPuT5JLIVQYjxwKqUCDafvA/+N2tUZiecpKCMcD/YlkfY0BgF2jWLev72LKaJ4DvGbhS2/5qA5j7JL3e1sJHwMA2cHHd1qQ94HIHGHrSRF20JR9Nb6EAvJ/RN+WAwVugd83prbWP0wcgQ10t3wAHh8B4kbLXXd7d3dnbv2da/f0A0GZyzCAvNssAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfoCQ4FJDgELb3eAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAW5JREFUeNrt3cGNQjEMRdEE0XKq+EVDC17EjgnnrGeFrhxpnhBzUOJ5nk/k79Za858+l5c0ECACBAEiQBAgAgQBIkDINH0ENaJLSNQti4kLiAARIAgQAYIAESAIEAFCKktIkd1LSFT3xcQFRIAIEASIAEGACBAEiAAhlSWkyKklJOrUYuIC4glGgCBABAgCRIAgQAQIqSwhRbovIVG7FxMXEE8wAgQBIkAQIAIEASJASDVv+Q89vUQXExcQTzACBAEiQBAgAgQBIkBIZQnBBUSAIEAECAJEgCBABAgC5F5vHwEZfCcETzAIEAGCABEgCBABggBpwe+EFPE7IS4gnmAQIAIEASJABAgCRIBwgO+EMMbYv3C4gHiCQYAIEASIAEGACBAESAuWkMudWjhcQDzBIEAECAJEgCBABAgCpAVLyI/qvnC4gAgQBIgAQYAIEASIAEGAtGAJaeaWhcMFRIAgQAQIAkSAIEAECAKkhS9L1iaH2BgGhQAAAABJRU5ErkJggg=="
      />
      <CraftingGridOutSlot />
    </span>
  );
};

export default CraftingGrid;
