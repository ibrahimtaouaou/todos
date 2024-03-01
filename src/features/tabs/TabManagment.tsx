import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import {
  TabsType,
  addNewTab,
  getCurrentTab,
  getTabList,
  removeTab,
  updateTabName,
  addNewRestrictedTab,
} from "./tabSlice";
import {
  ItemType,
  getItems,
  removeAllItem,
  updateTabItem,
} from "../items/itemSlice";

function TabManagment() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector<TabsType>(getTabList);
  const currentTab = useAppSelector<string>(getCurrentTab);
  const items = useAppSelector<ItemType[]>(getItems);

  const isLastTab: boolean = tabs.length === 1;
  const isTabEmpty: boolean =
    items.filter((item) => item.tab === currentTab).length === 0;

  function isInTab(value: string): boolean {
    let present = false;
    tabs.forEach((tab) => {
      if (tab.name === value) present = true;
    });
    return present;
  }

  function handleAddTab() {
    const newName = prompt("New Tab Name : ");
    if (newName) {
      if (!isInTab(newName.toUpperCase())) {
        dispatch(addNewTab(newName));
      } else alert("Tab names must be different");
    } else alert("Pleaser enter a valid tab name");
  }

  function handleAddRestrictedTab() {
    const newName = prompt("New Tab Name : ");
    if (newName) {
      if (!isInTab(newName.toUpperCase())) {
        const code = prompt("Enter your code");
        if (code) dispatch(addNewRestrictedTab({ newName, code }));
        else alert("Enter a valid password");
      } else alert("Tab names must be different");
    } else alert("Pleaser enter a valid tab name");
  }

  function handleChangeTabName() {
    const newName = prompt("New Tab Name : ");
    if (newName) {
      if (!isInTab(newName.toUpperCase())) {
        dispatch(updateTabName(newName));
        dispatch(
          updateTabItem({ currentTab: currentTab, newTabName: newName })
        );
      } else alert("Tab names must be different");
    } else alert("Pleaser enter a valid tab name");
  }

  function handleDeleteAllItems() {
    if (!isTabEmpty) {
      if (
        !window.confirm(
          `Do you really wish to delete all items in "${currentTab}"?`
        )
      )
        return;
      dispatch(removeAllItem(currentTab));
    } else alert("There is no item in the tab");
  }

  function handleDeleteTab() {
    if (!isLastTab) {
      if (
        !window.confirm(
          `Do you really wish to delete this "${currentTab}" tab and all of its content?`
        )
      )
        return;
      dispatch(removeTab());
      dispatch(removeAllItem(currentTab));
    } else alert("There is no item in the tab");
  }

  return (
    <div className="flex flex-wrap bg-slate-100 m-2 justify-center">
      <button
        onClick={handleAddTab}
        className="border flex flex-row items-center rounded-full w-auto px-2 m-2 text-white bg-green-600 font-semibold"
      >
        Add New Tab
      </button>
      <button
        onClick={handleAddRestrictedTab}
        className="border flex flex-row items-center rounded-full w-auto px-2 m-2 text-white bg-green-600 font-semibold"
      >
        Add New Restricted Tab
      </button>
      <button
        onClick={handleChangeTabName}
        className="border flex flex-row items-center rounded-full w-auto px-2 m-2 text-white bg-green-600 font-semibold"
      >
        Rename Current Tab
      </button>
      {!isTabEmpty && (
        <button
          onClick={handleDeleteAllItems}
          className="border flex flex-row items-center rounded-full w-auto px-2 m-2 text-white bg-green-600 font-semibold"
        >
          Delete All Items In Tab
        </button>
      )}
      {!isLastTab && (
        <button
          onClick={handleDeleteTab}
          className="border flex flex-row items-center rounded-full w-auto px-2 m-2 text-white bg-green-600 font-semibold"
        >
          Delete Current Tab
        </button>
      )}
    </div>
  );
}

export default TabManagment;
