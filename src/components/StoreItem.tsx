import { Link } from "react-router-dom";
import { TStore } from "../utils/type";
import NoImage from "./NoImage";
import { FaArrowRight } from "react-icons/fa";

export default function StoreItem({
  data: { name, description, nick },
}: {
  data: TStore;
}) {
  return (
    <div className="border rounded p-2 flex gap-2">
      <div>
        <NoImage />
      </div>
      <div className="flex gap-2  w-full justify-between items-center">
        <div className="h-full">
          <p>{name}</p>
          <p>{description}</p>
        </div>
        <div>
          <div className="bg-prim rounded text-overprim p-2">
            <Link to={`/p/${nick}`}>
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
