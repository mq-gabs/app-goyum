import { Link } from "react-router-dom";
import { TOrder } from "../../utils/type";
import { formatDate } from "../../utils/functions";
import Status from "../Status";

export default function OrderItem({
  data: { id, status, created_at },
  hideStatus = false,
}: {
  data: TOrder;
  hideStatus?: boolean;
}) {
  return (
    <div className="border rounded p-2">
      <div className="flex gap-2 justify-between">
        <Link to={`/pedidos/${id}`}>
          <p className="text-sec text-sm hover:underline">{id}</p>
        </Link>
        {!hideStatus && (
          <div>
            <Status status={status} />
          </div>
        )}
      </div>
      <p className="text-text text-sm">{formatDate(created_at as string)}</p>
    </div>
  );
}
