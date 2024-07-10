import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function LogoHome() {
  return (
    <Link to="/" className="flex gap-2 cursor-pointer items-center">
      <div className="w-[50px]">
        <Logo />
      </div>
      <p className="text-prim font-bold text-3xl sm:text-5xl">GoYum</p>
    </Link>
  );
}
