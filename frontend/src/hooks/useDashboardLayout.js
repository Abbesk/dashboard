import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

const initialLayout = ['safety', 'quality', 'delivery', 'cost', 'people'];

export function useDashboardLayout() {
  const [layout, setLayout] = useState(initialLayout);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setLayout((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const resetLayout = () => setLayout(initialLayout);

  return {
    layout,
    handleDragEnd,
    resetLayout,
  };
}