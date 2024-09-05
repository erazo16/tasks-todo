import React, { useState, useEffect } from 'react';
import { Task } from '../../../../types';
import { List, arrayMove } from 'react-movable';

interface PropsColum {
  title: string;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: string) => void;
}

const Column: React.FC<PropsColum> = ({ title, tasks, onTaskMove }) => {
  const [items, setItems] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    setItems(tasks);
  }, [tasks]);

  const handleItemDrop = (
    oldIndex: number,
    newIndex: number,
    targetRect: ClientRect
  ) => {
    console.log('oldIndex', oldIndex);
    console.log('oldIndex', newIndex);
    console.log('targetRect', targetRect);

    const updateItems = arrayMove(items, oldIndex, newIndex);
    setItems(updateItems);

    const movedTask = updateItems[newIndex];
    const newStatus =
      title === 'Por hacer'
        ? 'To do'
        : title === 'En progreso'
          ? 'In progress'
          : 'Completed';
    onTaskMove(movedTask.id, newStatus);
  };

  return (
    <div className="w-1/3">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <List
        values={items}
        onChange={({ oldIndex, newIndex, targetRect }) =>
          handleItemDrop(oldIndex, newIndex, targetRect)
        }
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => (
          <div {...props} className="bg-gray-950 p-4 mb-2  rounded shadow-sm">
            {value.name}
          </div>
        )}
      />
    </div>
  );
};

export default Column;
