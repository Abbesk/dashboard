import { FiEdit3, FiEye, FiMonitor } from 'react-icons/fi';

export default function DashboardToolbar({
  editMode,
  setEditMode,
  onStartSlideshow,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard SQDCP</h1>
        <p className="text-sm text-gray-500">
          Activez l’édition pour modifier les sections ou lancez le diaporama en plein écran.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            {editMode ? (
              <FiEdit3 className="text-[#790022]" />
            ) : (
              <FiEye className="text-gray-500" />
            )}
            <span>{editMode ? 'Mode édition' : 'Mode visualisation'}</span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={editMode}
            aria-label="Activer le mode édition"
            onClick={() => setEditMode((prev) => !prev)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${editMode ? 'bg-[#790022]' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${editMode ? 'translate-x-8' : 'translate-x-1'}`}
            />
          </button>

          <span
            className={`text-xs font-bold ${editMode ? 'text-[#790022]' : 'text-gray-500'}`}
          >
            {editMode ? 'ON' : 'OFF'}
          </span>
        </div>

        <button
          type="button"
          onClick={onStartSlideshow}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#790022] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8f032f]"
        >
          <FiMonitor />
          Diaporama
        </button>
      </div>
    </div>
  );
}
