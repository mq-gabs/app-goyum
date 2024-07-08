import clsx from "clsx";
import { FaQuestion, FaSearch } from "react-icons/fa";

export default function Input({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string | number;
  onChange: (arg: string) => void;
  icon?: TInputIcon;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-oversec">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={clsx(
          "border rounded border-soft outline-prim  p-2 placeholder:text-soft w-full",
          {
            "pl-8": icon === "search",
          }
        )}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
      {icon && icon === "search" && (
        <div className="absolute bottom-3 left-3">
          <InputIcon icon={icon} className="text-soft" />
        </div>
      )}
    </div>
  );
}

type TInputIcon = "search";

const icons = {
  search: FaSearch,
};

function InputIcon({
  icon,
  className,
}: {
  icon: TInputIcon;
  className?: string;
}) {
  const Icon = icons[icon] || FaQuestion;

  return <Icon className={className} />;
}
