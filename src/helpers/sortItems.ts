import { ItemType } from "../features/items/itemSlice";

export const sortItems = (
  value: "Name" | "Quantity" | "Date" | "Checked",
  items: ItemType[],
  sortDirection: string
): ItemType[] => {
  switch (value) {
    case "Name": {
      const newItems =
        sortDirection === "asc"
          ? items.sort((a, b) => a.title.localeCompare(b.title))
          : items.sort((a, b) => b.title.localeCompare(a.title));
      return newItems;
    }
    case "Quantity": {
      const newItems =
        sortDirection === "asc"
          ? items.sort((a, b) => a.quantity - b.quantity)
          : items.sort((a, b) => b.quantity - a.quantity);
      return newItems;
    }
    case "Date": {
      const newItems =
        sortDirection === "asc"
          ? items.sort((a, b) => a.createdAt - b.createdAt)
          : items.sort((a, b) => b.createdAt - a.createdAt);
      return newItems;
    }
    case "Checked": {
      const newItems =
        sortDirection === "asc"
          ? items.sort((a, b) =>
              a.checked === b.checked ? 0 : a.checked ? -1 : 1
            )
          : items.sort((a, b) =>
              a.checked === b.checked ? 0 : a.checked ? 1 : -1
            );
      return newItems;
    }
  }
};
