
export default function FilterSelect({
  label,
  name,
  values,
  onChange,
}: {
  label: string;
  name: string;
  values: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-neutral-400 mb-1">
        {label}
      </label>

      <div className="relative">
        <select
          name={name}
          onChange={onChange}
          className="
            w-full rounded-lg
            border border-white/10
            bg-neutral-950
            px-3 py-3
            text-sm text-white
            focus:border-indigo-400/40
            outline-none
          "
        >
          <option value="">Any</option>
          {values.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        
      </div>
    </div>
  );
}
