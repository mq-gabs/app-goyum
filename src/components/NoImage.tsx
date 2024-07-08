import { MdOutlineInsertPhoto } from "react-icons/md";

export default function NoImage() {
  return (
    <div>
      <div className="rounded aspect-square w-[100px] bg-gray-200 grid place-items-center">
        <MdOutlineInsertPhoto className="text-7xl text-gray-300" />
      </div>
    </div>
  );
}
