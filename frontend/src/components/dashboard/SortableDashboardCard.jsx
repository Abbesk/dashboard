import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiMove } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

export default function SortableDashboardCard({
  id,
  title,
  icon,
  editMode,
  onEdit,
  children,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DashboardCard title={title} icon={icon} editMode={editMode} onEdit={onEdit}>
        {editMode && (
          <div
            {...attributes}
            {...listeners}
            className="mb-4 inline-flex cursor-grab items-center gap-2 rounded-xl border border-dashed border-[#790022]/40 bg-[#790022]/5 px-3 py-2 text-sm font-medium text-[#790022]"
          >
            <FiMove />
            Glisser-déposer
          </div>
        )}

        {children}
      </DashboardCard>
    </div>
  );
}
