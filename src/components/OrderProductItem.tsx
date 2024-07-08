import { formatCurrency } from "../utils/functions";
import { TProduct } from "../utils/type";
import Button from "./Button";
import NoImage from "./NoImage";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";

export default function OrderProductItem({
  data: { name, description, price },
  onAdd,
  onRemove,
  quantity,
}: {
  data: TProduct;
  onAdd: () => void;
  onRemove: () => void;
  quantity: number;
}) {
  return (
    <div className="p-2 flex gap-2 border rounded">
      <div>
        <NoImage />
      </div>
      <div className="w-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between gap-2">
            <p className="font-semibold">{name}</p>
            <p>{formatCurrency(price)}</p>
          </div>
          <p>{description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onRemove} disabled={quantity === 0}>
            <MdOutlineRemove />
          </Button>
          <p className="my-auto">{quantity}</p>
          <Button onClick={onAdd}>
            <MdOutlineAdd />
          </Button>
        </div>
      </div>
    </div>
  );
}
