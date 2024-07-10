export default function Textarea({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (arg: string) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-text">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        className="resize-none border rounded border-soft outline-prim  p-2 placeholder:text-soft w-full"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        rows={3}
      />
    </div>
  );
}
