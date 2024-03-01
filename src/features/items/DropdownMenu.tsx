type IsOpen = {
  isOpen: boolean;
  id: number;
  clickedButton: number | null;
};

function DropdownMenu({ isOpen, id, clickedButton }: IsOpen) {
  return (
    <div
      className={`flex flex-col absolute right-0 bg-red-200 top-10 border z-auto ${
        isOpen && clickedButton === id ? "" : " invisible "
      }`}
    >
      <ul className={`flex flex-col gap-4`}>
        <button>Details</button>
        <button>Modify</button>
        <button className="text-red-400">Remove</button>
      </ul>
    </div>
  );
}

export default DropdownMenu;
