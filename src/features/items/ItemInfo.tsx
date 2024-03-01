import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import ModalInfo from "./ModalInfo";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ModalForm from "./ModalForm";

import { ItemType, removeItem, toggleCheckedItem } from "./itemSlice";
import { useAppDispatch } from "../../helpers/hooks";

import { useState } from "react";

type PropType = {
  item: ItemType;
};

function ItemInfo({ item }: PropType) {
  const dispatch = useAppDispatch();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalFormOpen, setModalFormOpen] = useState(false);

  function handleInfoOpen() {
    setModalInfoOpen(true);
  }

  function handleFormOpen() {
    setModalFormOpen(true);
  }

  function handleRemoveItem(id: number) {
    dispatch(removeItem(id));
  }

  function handleCheckBoxChange(id: number): void {
    dispatch(toggleCheckedItem(id));
  }

  return (
    <div className="border border-solid grid grid-cols-6">
      <div
        className={`col-span-4 grid grid-cols-4 items-center ${
          item.checked ? "line-through bg-slate-300" : ""
        }`}
      >
        <input
          className="m-4"
          type="checkbox"
          checked={item.checked}
          onChange={() => handleCheckBoxChange(item.id)}
        />
        <span className={`col-span-2 text-wrap`}>{item.title}</span>
        <span className={`flex justify-end min-w-6 pl-4 pr-2 `}>
          x{item.quantity}
        </span>
      </div>
      <div className="border-l-2 flex justify-around col-span-2">
        <button onClick={() => handleFormOpen()}>
          <CreateIcon fontSize="inherit" />
        </button>
        <button onClick={() => handleInfoOpen()}>
          <QuestionMarkIcon fontSize="inherit" />
        </button>
        <button onClick={() => handleRemoveItem(item.id)}>
          <DeleteForeverIcon fontSize="inherit" color={"error"} />
        </button>
      </div>
      {item ? (
        <ModalInfo
          item={item}
          open={modalInfoOpen}
          setOpen={setModalInfoOpen}
        />
      ) : (
        ""
      )}
      <ModalForm item={item} open={modalFormOpen} setOpen={setModalFormOpen} />
    </div>
  );
}

export default ItemInfo;
