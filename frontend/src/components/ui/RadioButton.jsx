
export function RadioButton({ label, name, value, checked, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="text-slate-900 cursor-pointer"
      />
      <label htmlFor={value} className="text-slate-900 cursor-pointer">{label}</label>
    </div>
  );
}
