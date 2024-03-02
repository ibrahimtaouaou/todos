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
import AddIcon from "@mui/icons-material/Add";

const styles = `border flex flex-row items-center rounded-full w-auto px-2 m-2 text-white-bg bg-blue-mid font-semibold`;

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
    } else alert("Please enter a valid tab name");
  }

  function handleAddRestrictedTab() {
    const newName = prompt("New Tab Name : ");
    if (newName) {
      if (!isInTab(newName.toUpperCase())) {
        const code = prompt(
          "Enter a code for this tab. This code will be needed whenever you open this restricted tab !"
        );
        if (code) dispatch(addNewRestrictedTab({ newName, code }));
        else alert("Enter a valid password");
      } else alert("Tab names must be different");
    } else alert("Please enter a valid tab name");
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
    } else alert("Please enter a valid tab name");
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
    <div className="flex flex-wrap bg-white-bg p-2 justify-center">
      <button onClick={handleAddTab} className={styles}>
        <AddIcon fontSize="small" /> <span>Tab</span>
      </button>
      <button onClick={handleAddRestrictedTab} className={styles}>
        <AddIcon fontSize="small" /> <span>Restricted Tab</span>
      </button>
      <button onClick={handleChangeTabName} className={styles}>
        <span>Rename Current Tab</span>
      </button>
      {!isTabEmpty && (
        <button onClick={handleDeleteAllItems} className={styles}>
          <span>Delete All Items In Tab</span>
        </button>
      )}
      {!isLastTab && (
        <button onClick={handleDeleteTab} className={styles}>
          <span>Delete Current Tab</span>
        </button>
      )}
    </div>
  );
}

export default TabManagment;
