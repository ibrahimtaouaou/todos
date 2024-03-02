import { ItemType, updateItemList } from "./itemSlice";
import { useAppDispatch } from "../../helpers/hooks";
import { sortItems } from "../../helpers/sortItems";
import { useState } from "react";

type CurrentItemsType = {
  currItems: ItemType[];
};

function SortItem({ currItems }: CurrentItemsType) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<"Name" | "Quantity" | "Date" | "Checked">(
    "Name"
  );
  const [sortDirection, setSortDirection] = useState<string>("asc");

  function handleSelect(value: "Name" | "Quantity" | "Date" | "Checked"): void {
    setValue(value);
    const newItems = sortItems(value, currItems, sortDirection);
    dispatch(updateItemList(newItems));
  }

  function handleDirectionClick() {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);
    const newItems = sortItems(value, currItems, direction);
    dispatch(updateItemList(newItems));
  }

  return (
    <>
      <select
        className="p-2 mr-2 my-2 bg-blue-light"
        defaultValue="Name"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleSelect(
            e.target.value as "Name" | "Quantity" | "Date" | "Checked"
          )
        }
      >
        <option value="Name">Sort By Name</option>
        <option value="Quantity">Sort By Quantity</option>
        <option value="Date">Sort By Date</option>
        <option value="Checked">Sort By Item Checked</option>
      </select>
      <button onClick={handleDirectionClick}>{`${
        sortDirection === "asc" ? "⬆️" : "⬇️"
      }`}</button>
    </>
  );
}

export default SortItem;
