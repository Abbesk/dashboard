import { FiEdit3 } from 'react-icons/fi';

export default function DashboardCard({
  title,
  icon: Icon,
  editMode,
  onEdit,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-white to-[#790022]/[0.03] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#790022] text-white">
            <Icon className="text-lg" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">
              {editMode ? 'Mode édition activé' : 'Mode visualisation'}
            </p>
          </div>
        </div>

        {editMode && onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#790022]/20 bg-[#790022]/10 px-4 py-2 text-sm font-semibold text-[#790022] transition hover:bg-[#790022]/15"
          >
            <FiEdit3 />
            Modifier
          </button>
        ) : null}
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}
