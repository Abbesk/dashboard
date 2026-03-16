import { FiEdit3 } from 'react-icons/fi';

export default function EditableCardWrapper({
  editMode,
  onEdit,
  children,
  className = '',
}) {
  return (
    <div
      onClick={editMode ? onEdit : undefined}
      className={`relative ${editMode ? 'cursor-pointer' : ''} ${className}`}
    >
      {editMode && (
        <div className="pointer-events-none absolute right-2 top-2 z-10 rounded-full bg-[#790022] px-3 py-1 text-xs font-semibold text-white shadow">
          <span className="inline-flex items-center gap-1">
            <FiEdit3 />
            Modifier
          </span>
        </div>
      )}

      {children}
    </div>
  );
}