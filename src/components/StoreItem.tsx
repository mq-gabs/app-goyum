import { Link } from "react-router-dom";
import { TStore } from "../utils/type";
import NoImage from "./NoImage";
import { FaArrowRight } from "react-icons/fa";

export default function StoreItem({
  data: { name, description, id },
}: {
  data: TStore;
}) {
  return (
    <div className="border rounded p-4 flex gap-2">
      <div>
        <NoImage />
      </div>
      <div className="flex gap-2  w-full justify-between items-center">
        <div className="h-full">
          <p className="font-bold text-xl">{name}</p>
          <p className="text-sm">{description}</p>
        </div>
        <div>
          <div className="bg-prim rounded text-overprim p-2">
            <Link to={`/p/${id}`}>
              <div className="flex gap-2 items-center">
                Fazer pedido
                <div>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
