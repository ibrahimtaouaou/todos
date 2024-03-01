import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TabType = { name: string; restricted: boolean; code?: string };
export type TabsType = TabType[];

type TabsState = {
  tabs: TabsType;
  currentTab: string;
  valueTab: number;
};

type RestrictedPayload = { newName: string; code: string };

const initialState: TabsState = {
  tabs: [
    { name: "Demo".toUpperCase(), restricted: false },
    { name: "Demo2".toUpperCase(), restricted: false },
  ],
  currentTab: "Demo".toUpperCase(),
  valueTab: 0,
};

const saveState = (key: string, data: TabsType): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const localStateInit = (): TabsState => {
  const localTabs = localStorage.getItem("tabs");
  if (!localTabs) {
    saveState("tabs", initialState.tabs);
    return initialState;
  }
  const tabs = JSON.parse(localTabs);
  const currentTab = tabs[0];
  const valueTab = 0;

  return { tabs, currentTab, valueTab };
};

const tabSlice = createSlice({
  name: "tabs",
  initialState: localStateInit(),
  reducers: {
    addNewTab(state: TabsState, action: PayloadAction<string>) {
      state.tabs = [
        ...state.tabs,
        { name: action.payload.toUpperCase(), restricted: false },
      ];
      state.currentTab = action.payload.toUpperCase();
      state.valueTab = state.tabs.length - 1;
      saveState("tabs", state.tabs);
    },
    addNewRestrictedTab(
      state: TabsState,
      action: PayloadAction<RestrictedPayload>
    ) {
      state.tabs = [
        ...state.tabs,
        {
          name: action.payload.newName.toUpperCase(),
          restricted: true,
          code: action.payload.code,
        },
      ];
      state.currentTab = action.payload.newName.toUpperCase();
      state.valueTab = state.tabs.length - 1;
      saveState("tabs", state.tabs);
    },
    removeTab(state: TabsState): void {
      state.tabs = state.tabs.filter(
        (tab: TabType): boolean => tab.name !== state.currentTab
      );
      state.currentTab = state.tabs[0].name;
      state.valueTab = 0;
      saveState("tabs", state.tabs);
    },
    updateTabName(state: TabsState, action: PayloadAction<string>) {
      state.tabs = state.tabs.map(
        (tab: TabType): TabType =>
          tab.name === state.currentTab
            ? { name: action.payload.toUpperCase(), restricted: tab.restricted }
            : tab
      );
      state.currentTab = action.payload.toUpperCase();
      saveState("tabs", state.tabs);
    },
    changeCurrentTab(state: TabsState, action: PayloadAction<number>) {
      if (state.tabs[action.payload].restricted) {
        const code = prompt("Restricted tab, type password :");
        if (code) {
          if (state.tabs[action.payload].code === code) {
            state.currentTab = state.tabs[action.payload].name;
            state.valueTab = action.payload;
          } else alert("Wrong password");
        } else alert("Please type a valid password");
      } else {
        state.currentTab = state.tabs[action.payload].name;
        state.valueTab = action.payload;
      }
    },
  },
});

export const getValueTab = (state: RootState): number => state.tabs.valueTab;
export const getCurrentTab = (state: RootState): string =>
  state.tabs.currentTab;
export const getTabList = (state: RootState): TabsType => state.tabs.tabs;

export const {
  addNewTab,
  addNewRestrictedTab,
  removeTab,
  updateTabName,
  changeCurrentTab,
} = tabSlice.actions;
export default tabSlice.reducer;
