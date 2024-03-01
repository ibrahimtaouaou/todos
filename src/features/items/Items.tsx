import { ItemType, getItems } from "./itemSlice";
import { useAppSelector } from "../../helpers/hooks";

import SortItem from "./SortItem";
import ItemInfo from "./ItemInfo";

type TabType = {
  tab: string;
};

function Items({ tab }: TabType) {
  const items: ItemType[] = useAppSelector(getItems);

  const currentItems: ItemType[] = items.filter(
    (item: ItemType): boolean => item.tab === tab
  );

  if (!items.length) return;

  return (
    <>
      <SortItem currItems={currentItems} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-[60vw]">
        {currentItems.map((item, i) => {
          return <ItemInfo item={item} key={i} />;
        })}
      </div>
    </>
  );
}

export default Items;
