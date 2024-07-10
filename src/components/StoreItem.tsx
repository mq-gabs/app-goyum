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
      <div className="flex flex-col gap-2  w-full justify-between ">
        <div>
          <Link
            to={`/p/${id}`}
            className="font-bold text-xl hover:underline text-sec"
          >
            {name}
          </Link>
          <p className="text-sm">{description}</p>
        </div>
        {/* <div className="border border-red-500">
          <div className="bg-prim rounded text-overprim">
            <Link to={`/p/${id}`}>
              <div className="flex gap-2 items-center p-2">
                Fazer pedido
                <div>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
