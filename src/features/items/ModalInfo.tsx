import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ItemType } from "./itemSlice";

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

type PropType = {
  item: ItemType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalInfo({ item, open, setOpen }: PropType) {
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
          <h2 id="parent-modal-title">{item.title}</h2>
          <p>ID : {item.id}</p>
          <p>Quantity : {item.quantity}</p>
          <p>Tab : {item.tab}</p>
          <p>Checked ? : {item.checked ? "YES" : "NO"}</p>
          <p id="parent-modal-description">
            {item.description ?? "No description"}
          </p>
        </Box>
      </Modal>
    </div>
  );
}
