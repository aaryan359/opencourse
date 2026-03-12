
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
      <label className="block text-xs text-[#8A8F98] mb-1.5 font-mono uppercase tracking-wider">
        {label}
      </label>

      <div className="relative">
        <select
          name={name}
          onChange={onChange}
          className="
            w-full rounded-xl
            border border-white/[0.08]
            bg-[#0f0f12]
            px-3 py-2.5
            text-sm text-[#EDEDEF]
            focus:border-[#5E6AD2]/50
            focus:ring-1 focus:ring-[#5E6AD2]/30
            outline-none
            transition-all duration-200
            cursor-pointer
            appearance-none
          "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238A8F98' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
          }}
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
