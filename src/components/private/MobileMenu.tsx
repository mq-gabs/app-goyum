import clsx from "clsx";
import { AiFillProduct } from "react-icons/ai";
import { GoListOrdered } from "react-icons/go";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

const routesList = [
  {
    id: 1,
    route: "/",
    name: "Home",
    Icon: MdHome,
  },
  {
    id: 2,
    route: "/produtos",
    name: "Produtos",
    Icon: AiFillProduct,
  },
  {
    id: 3,
    name: "Pedidos",
    route: "/pedidos",
    Icon: GoListOrdered,
  },
];

export default function MobileMenu() {
  console.log(window.location.pathname);
  return (
    <div className="fixed bottom-0 w-full">
      <div className="p-2 bg-prim">
        <nav>
          <ul className="flex justify-around gap-2">
            {routesList.map(({ id, route, Icon }) => (
              <li key={id}>
                <Link
                  to={route}
                  className={clsx("flex gap-2 items-center p-2  rounded ", {
                    "text-oversec bg-sec": window.location.pathname === route,
                    "text-overprim": window.location.pathname !== route,
                  })}
                >
                  <Icon className="text-3xl" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
