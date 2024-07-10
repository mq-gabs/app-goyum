import { FaArrowRight } from "react-icons/fa";
import { formatCurrency } from "../utils/functions";
import { TCartItem, TProduct } from "../utils/type";
import Button from "./Button";
import OrderProductItem from "./OrderProductItem";

export default function CartList({
  data,
  onAdd,
  onRemove,
  onContinue,
  total,
}: {
  data: TCartItem[];
  onAdd: (data: TProduct) => void;
  onRemove: (data: TProduct) => void;
  onContinue: () => void;
  total: number
}) {

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Items no carrinho:</h3>
      </div>
      <div>
        {data?.length !== 0 && (
          <ul className="flex flex-col gap-2">
            {data.map((d) => (
              <li>
                <OrderProductItem
                  data={d}
                  onAdd={() => onAdd(d)}
                  onRemove={() => onRemove(d)}
                  quantity={d.quantity}
                />
              </li>
            ))}
          </ul>
        )}
        {data.length === 0 && (
          <div className="p-4">
            <p className="text-soft text-xl text-center">
              Seu carrinho está vazio...
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end py-2">
        <p className="text-xl">
          TOTAL:{"  "}
          <span className="font-bold text-sec">{formatCurrency(total)}</span>
        </p>
      </div>
      <div className="flex justify-end">
        <Button disabled={data.length === 0} onClick={onContinue}>
          <div className="flex gap-2 items-center">
            Continuar
            <FaArrowRight />
          </div>
        </Button>
      </div>
    </div>
  );
}
