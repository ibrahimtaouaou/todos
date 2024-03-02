import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ItemType } from "./itemSlice";

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
        <Box sx={{ ...style, width: 400, maxHeight: 250 }}>
          {item.checked ? (
            <span className="flex justify-end text-xs">✅</span>
          ) : (
            ""
          )}
          <h2 className="text-center font-semibold text-xl text-blue-dark">
            {item.title} (x{item.quantity})
          </h2>
          {item.description ? (
            <>
              <p className="text-l mt-2 text-blue-dark px-2">Description :</p>
              <p className="bg-blue-light w-full px-2 rounded-xl text-sm italic max-h-[150px] overflow-y-auto">
                {item.description}
              </p>
            </>
          ) : (
            <p className="bg-blue-light w-full px-2 rounded-xl text-sm italic text-center mt-4 ">
              No description available
            </p>
          )}
        </Box>
      </Modal>
    </div>
  );
}
