import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNewID } from "../../helpers/idGenerator";
import { RootState } from "../../store";

export type ItemType = {
  id: number;
  tab: string;
  title: string;
  quantity: number;
  checked: boolean;
  description?: string;
  createdAt: number;
};

export type FormItem = {
  title: string;
  tab: string;
  quantity: number;
  description?: string;
};

type ItemsState = {
  items: ItemType[];
  lastID: number;
};

const initialState: ItemsState = {
  items: [
    {
      id: 0,
      tab: "Example".toUpperCase(),
      title: "Example",
      quantity: 4,
      checked: false,
      description: "",
      createdAt: Date.now(),
    },
  ],
  lastID: getNewID(),
};

const saveState = (key: string, data: ItemType[] | number): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const localStateInit = (): ItemsState => {
  const localItems = localStorage.getItem("items");
  const localLastID = localStorage.getItem("lastID");
  if (!localItems || !localLastID) {
    saveState("items", initialState.items);
    saveState("lastID", initialState.lastID);
    return initialState;
  }
  const items = JSON.parse(localItems);
  const lastID = JSON.parse(localLastID);
  return { items, lastID };
};

type tabType = {
  currentTab: string;
  newTabName: string;
};

const itemSlice = createSlice({
  name: "items",
  initialState: localStateInit(),
  reducers: {
    addItem(state: ItemsState, action: PayloadAction<FormItem>) {
      const newID = getNewID();
      const item: ItemType = {
        ...action.payload,
        checked: false,
        id: newID,
        createdAt: Date.now(),
      };
      state.items = [...state.items, item];
      state.lastID = newID;
      saveState("items", state.items);
      saveState("lastID", state.lastID);
    },
    removeItem(state: ItemsState, action: PayloadAction<number>): void {
      state.items = state.items.filter(
        (item: ItemType): boolean => item.id !== action.payload
      );
      saveState("items", state.items);
    },
    removeAllItem(state: ItemsState, action: PayloadAction<string>): void {
      state.items = state.items.filter(
        (item: ItemType): boolean => item.tab !== action.payload
      );
      saveState("items", state.items);
    },
    updateItem(state: ItemsState, action: PayloadAction<ItemType>) {
      state.items = state.items.map((item) => {
        return item.id === action.payload.id ? action.payload : item;
      });
      saveState("items", state.items);
    },
    updateItemList(state: ItemsState, action: PayloadAction<ItemType[]>) {
      state.items = action.payload;
      saveState("items", state.items);
    },
    updateTabItem(state: ItemsState, action: PayloadAction<tabType>) {
      state.items = state.items.map((item) => {
        const newTab: string =
          item.tab === action.payload.currentTab
            ? (item.tab = action.payload.newTabName)
            : item.tab;
        return { ...item, tab: newTab };
      });
      saveState("items", state.items);
    },
    toggleCheckedItem(state: ItemsState, action: PayloadAction<number>) {
      const item: ItemType = state.items.find(
        (item: ItemType) => item.id === action.payload
      ) as ItemType;
      item.checked = !item.checked;
      saveState("items", state.items);
    },
    setLastID(state: ItemsState, action: PayloadAction<number>) {
      state.lastID = action.payload;
      saveState("lastID", state.lastID);
    },
  },
});

export const getItems = (state: RootState): ItemType[] => state.items.items;

export const {
  addItem,
  removeItem,
  toggleCheckedItem,
  updateItem,
  updateItemList,
  setLastID,
  updateTabItem,
  removeAllItem,
} = itemSlice.actions;
export default itemSlice.reducer;
