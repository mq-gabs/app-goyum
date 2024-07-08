import { AiFillProduct } from "react-icons/ai";
import { GoListOrdered } from "react-icons/go";
import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { FaSignOutAlt } from "react-icons/fa";
import { useStore } from "../hooks/user";

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

export default function Menu() {
  const { signOut } = useStore();
  const nav = useNavigate();

  const handleSignOut = () => {
    signOut();
    nav("/login");
  };

  return (
    <div className="flex flex-col p-2 justify-between h-full">
      <div>A</div>
      <nav>
        <ul className="flex flex-col gap-2">
          {routesList.map(({ id, name, route, Icon }) => (
            <li key={id}>
              <Link
                to={route}
                className="flex gap-2 items-center p-2 border rounded text-text"
              >
                <Icon />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col">
        <Button>
          <div
            onClick={handleSignOut}
            className="flex gap-2 items-center justify-center"
          >
            <FaSignOutAlt />
            Sair
          </div>
        </Button>
      </div>
    </div>
  );
}
