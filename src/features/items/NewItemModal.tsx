import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormItem, addItem } from "./itemSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { getCurrentTab } from "../tabs/tabSlice";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(249, 247, 247)",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const labelStyle = "text-blue-dark text-l font-semibold";
const inputStyle = "border border-blue-light rounded-md w-[100%] pl-1";

type PropFormType = {
  handleClose: () => void;
};

type FormValues = {
  title: string;
  description?: string;
  quantity: number;
};

function FormInModal({ handleClose }: PropFormType) {
  const dispatch = useAppDispatch();
  const currentTab = useAppSelector<string>(getCurrentTab);

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newItem: FormItem = {
      ...data,
      tab: currentTab,
    };
    dispatch(addItem(newItem));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 mt-2">
      <div>
        <p className={labelStyle}>Title :</p>
        <input
          className={inputStyle}
          placeholder="Enter the title of your item..."
          required
          {...register("title")}
        />
      </div>
      <div>
        <p className={labelStyle}>Description : (optional)</p>
        <input
          className={inputStyle}
          placeholder="Enter the description of your item..."
          {...register("description")}
        />
      </div>
      <div>
        <p className={labelStyle}>Quantity</p>
        <input
          className={inputStyle}
          placeholder="Enter the quantity of your item..."
          type="number"
          defaultValue={1}
          required
          {...register("quantity")}
        />
      </div>
      <button
        className="border rounded-full px-2 m-2 text-white-bg bg-blue-mid font-semibold"
        type="submit"
      >
        Create Item
      </button>
    </form>
  );
}

type NewItemProp = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewItemModal({ open, setOpen }: NewItemProp) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <FormInModal handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default NewItemModal;
