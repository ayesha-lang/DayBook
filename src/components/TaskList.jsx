import { useEffect, useRef, useState } from 'react';
import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onToggle, onDelete, onSave, onReorder, onMove }) {
  const listRef = useRef(null);
  const [dragId, setDragId] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('is-dragging', dragId !== null);
    return () => document.body.classList.remove('is-dragging');
  }, [dragId]);

  function handleDown(e, id) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* optional */ }
    setDragId(id);
  }

  function handleMove(e) {
    if (dragId === null) return;
    const y = e.clientY;
    const ids = tasks.map((t) => t.id);
    const others = [...listRef.current.children].filter((li) => li.dataset.id !== dragId);
    const target = others.find((li) => {
      const r = li.getBoundingClientRect();
      return y < r.top + r.height / 2;
    });
    const rest = ids.filter((id) => id !== dragId);
    const at = target ? rest.indexOf(target.dataset.id) : rest.length;
    const next = [...rest.slice(0, at), dragId, ...rest.slice(at)];
    if (next.some((id, i) => id !== ids[i])) onReorder(next);
    if (y < 70) window.scrollBy(0, -14);
    else if (y > window.innerHeight - 70) window.scrollBy(0, 14);
  }

  function move(id, dir) {
    onMove(id, dir);
    requestAnimationFrame(() => {
      listRef.current?.querySelector(`[data-id="${id}"] .handle`)?.focus();
    });
  }

  if (tasks.length === 0) return null;

  return (
    <ul
      className="overflow-hidden rounded-xl border border-line bg-surface" aria-label="Tasks" ref={listRef}
      onPointerMove={handleMove}
      onPointerUp={() => setDragId(null)}
      onPointerCancel={() => setDragId(null)}
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id} task={task} dragging={dragId === task.id}
          onToggle={onToggle} onDelete={onDelete} onSave={onSave}
          onHandleDown={handleDown} onMove={move}
        />
      ))}
    </ul>
  );
}