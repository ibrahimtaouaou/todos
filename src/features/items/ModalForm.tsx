import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ItemType, updateItem } from "./itemSlice";
import { SubmitHandler, useForm, useController } from "react-hook-form";
import { useAppDispatch } from "../../helpers/hooks";

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
  item: ItemType;
  handleClose: () => void;
};

type FormValues = {
  title: string;
  description?: string;
  quantity: number;
};

function FormInModal({ item, handleClose }: PropFormType) {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, control } = useForm<FormValues>();

  const { field: titleField } = useController({
    name: "title",
    control,
    defaultValue: item.title,
  });

  const { field: descriptionField } = useController({
    name: "description",
    control,
    defaultValue: item.description,
  });

  const { field: quantityField } = useController({
    name: "quantity",
    control,
    defaultValue: item.quantity,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newItem: ItemType = {
      ...data,
      id: item.id,
      tab: item.tab,
      checked: item.checked,
      createdAt: item.createdAt,
    };
    dispatch(updateItem(newItem));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 mt-2">
      <div>
        <p className={labelStyle}> Title</p>
        <input
          placeholder="New Title..."
          className={inputStyle}
          value={titleField.value}
          required
          {...register("title")}
        />
      </div>
      <div>
        <p className={labelStyle}>Description : (optional)</p>
        <input
          placeholder="Enter the description of your item..."
          className={inputStyle}
          value={descriptionField.value ? descriptionField.value : ""}
          {...register("description")}
        />
      </div>
      <div>
        <p className={labelStyle}>Quantity</p>
        <input
          placeholder="1"
          className={inputStyle}
          value={quantityField.value}
          type="number"
          required
          {...register("quantity")}
        />
      </div>
      <button
        type="submit"
        className="border rounded-full px-2 m-2 text-white-bg bg-blue-mid font-semibold"
      >
        Update
      </button>
    </form>
  );
}

type PropType = {
  item: ItemType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalForm({ item, open, setOpen }: PropType) {
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
          <FormInModal item={item} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
