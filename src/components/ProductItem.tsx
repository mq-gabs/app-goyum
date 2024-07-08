import { formatCurrency } from "../utils/functions";
import { TProduct } from "../utils/type";
import NoImage from "./NoImage";
import Switch from "./Switch";

export default function ProductItem({
  data: { name, description, is_active, price },
  onChange,
}: {
  onChange: (arg: Partial<TProduct>) => void;
  data: TProduct;
}) {
  return (
    <div className="flex gap-2 border rounded p-4 text-text">
      <div>
        <NoImage />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="font-semibold text">{name}</p>
          <p>{formatCurrency(price)}</p>
        </div>
        <p className="text-sm">{description}</p>
        <Switch
          active={is_active}
          onChange={(value) => onChange({ is_active: value })}
        />
      </div>
    </div>
  );
}
