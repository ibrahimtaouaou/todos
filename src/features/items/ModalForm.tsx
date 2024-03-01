import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ItemType, updateItem } from "./itemSlice";
import { SubmitHandler, useForm, useController } from "react-hook-form";
import { useAppDispatch } from "../../helpers/hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
    console.log("Submiiiiit  ", data);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>Title</p>
        <input value={titleField.value} required {...register("title")} />
      </div>
      <div>
        <p>Description</p>
        <input
          value={descriptionField.value ? descriptionField.value : ""}
          {...register("description")}
        />
      </div>
      <div>
        <p>Quantity</p>
        <input
          value={quantityField.value}
          type="number"
          required
          {...register("quantity")}
        />
      </div>
      <button type="submit">Update</button>
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
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}
