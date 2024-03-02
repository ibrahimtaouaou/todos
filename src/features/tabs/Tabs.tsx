import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import {
  TabsType,
  changeCurrentTab,
  getTabList,
  getValueTab,
} from "./tabSlice";
import Items from "../items/Items";
import AddIcon from "@mui/icons-material/Add";
import NewItemModal from "../items/NewItemModal";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const value = useAppSelector<number>(getValueTab);
  const [newItemOpen, setNewItemOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    dispatch(changeCurrentTab(newValue));
  };

  const handleOpenNewItemModal = () => {
    setNewItemOpen(true);
  };

  const tabs: TabsType = useSelector(getTabList);
  if (!tabs.length) return;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        height: "auto",
      }}
    >
      <Tabs
        indicatorColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {tabs.map((tab, i) => {
          return <Tab label={tab.name} {...a11yProps(i)} key={i} />;
        })}
      </Tabs>
      {tabs.map((tab, i) => {
        return (
          <TabPanel key={i} value={value} index={i}>
            <button
              onClick={handleOpenNewItemModal}
              className="border flex flex-row items-center rounded-full w-auto px-2 m-2 text-white-bg bg-blue-mid font-semibold"
            >
              <span className="">ADD </span> <AddIcon />
            </button>
            <NewItemModal open={newItemOpen} setOpen={setNewItemOpen} />
            <Items tab={tab.name} />
          </TabPanel>
        );
      })}
    </Box>
  );
}
