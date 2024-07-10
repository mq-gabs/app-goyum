import { TCartItem } from "../utils/type";

export default function SimpleProductItem({
  data: {
    name,
    quantity,
  }
}: {
  data: TCartItem;
}) {
  return (
    <div className="max-w-[300px] mx-auto">
      <div className="flex justify-between">
        <p>{name}</p>
        <p>x {quantity}</p>   
      </div>
    </div>
  )
}