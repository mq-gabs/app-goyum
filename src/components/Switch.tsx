import clsx from "clsx";

export default function Switch({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (arg: boolean) => void;
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl p-[2px] w-[35px] cursor-pointer flex bg-gray-200",
        {
          "justify-end": active,
        }
      )}
      onClick={() => onChange(!active)}
    >
      <div
        className={clsx("w-[15px] h-[15px] rounded-full", {
          "bg-prim": active,
          "bg-soft": !active,
        })}
      ></div>
    </div>
  );
}
