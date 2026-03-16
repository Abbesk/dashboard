export default function EditableField({ editMode, value, onChange, type = 'text', className = '' }) {
  if (!editMode) {
    return <span className={`font-semibold text-gray-900 ${className}`}>{value}</span>;
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-[#790022] focus:ring-2 focus:ring-[#790022]/20 ${className}`}
    />
  );
}