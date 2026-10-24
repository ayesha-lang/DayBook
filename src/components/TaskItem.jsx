import { useState } from 'react';
import { CATEGORIES } from '../utils/tasks.js';
import { dueInfo } from '../utils/dates.js';
import { field, btnSm, btnSmPrimary } from '../ui.js';
import { Grip, Check, Edit, Trash } from './Icons.jsx';

const CAT_COLOR = { Work: 'text-work', Personal: 'text-personal', Study: 'text-study' };
const DUE_COLOR = { today: 'font-medium text-accent', overdue: 'font-medium text-danger', '': 'text-muted' };

export default function TaskItem({ task, dragging, onToggle, onDelete, onSave, onHandleDown, onMove }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task);
  const [pop, setPop] = useState(false);
  const [removing, setRemoving] = useState(false);

  function toggle() {
    if (!task.done) {
      setPop(true);
      setTimeout(() => setPop(false), 650);
    }
    onToggle(task.id);
  }

  function remove() {
    setRemoving(true);
    setTimeout(() => onDelete(task.id), 240);
  }

  function startEdit() {
    setDraft({ text: task.text, cat: task.cat, due: task.due });
    setEditing(true);
  }

  function save(e) {
    e.preventDefault();
    if (!draft.text.trim()) return;
    onSave(task.id, { text: draft.text.trim(), cat: draft.cat, due: draft.due });
    setEditing(false);
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowUp') { e.preventDefault(); onMove(task.id, -1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); onMove(task.id, 1); }
  }

  const due = task.due ? dueInfo(task) : null;

  const rowClass = [
    'grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-x-2.5 gap-y-2',
    'border-b border-line py-3 pr-2.5 pl-1.5 last:border-b-0',
    'transition-[opacity,translate,background-color] duration-200',
    'max-sm:gap-x-1.5 max-sm:pr-1',
    dragging ? 'relative z-10 bg-surface2 shadow-lg' : 'bg-surface',
    removing ? 'pointer-events-none translate-x-3.5 opacity-0' : ''
  ].join(' ');

  const checkClass = [
    'relative grid size-6 place-items-center rounded-full border-2 p-0 transition-colors',
    task.done ? 'border-accent bg-accent' : 'border-edge hover:border-accent',
    pop ? 'animate-pop after:absolute after:-inset-0.5 after:animate-ring after:rounded-full after:border-2 after:border-accent' : ''
  ].join(' ');

  return (
    <li className={rowClass} data-id={task.id}>
      <button
        type="button" onPointerDown={(e) => onHandleDown(e, task.id)} onKeyDown={onKeyDown}
        aria-label="Reorder task. Drag, or press the up and down arrow keys."
        className="handle grid h-8 w-7 cursor-grab touch-none place-items-center rounded-md text-edge hover:text-muted max-sm:w-[22px]"
      >
        <Grip />
      </button>
      <button
        type="button" role="checkbox" aria-checked={task.done}
        aria-label={`Done: ${task.text}`} onClick={toggle} className={checkClass}
      >
        <Check done={task.done} />
      </button>

      {editing ? (
        <form
          onSubmit={save} onKeyDown={(e) => e.key === 'Escape' && setEditing(false)}
          className="col-span-2 grid grid-cols-2 gap-2"
        >
          <input
            type="text" maxLength={200} autoFocus aria-label="Task text" value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            className={`${field} col-span-2 w-full`}
          />
          <select
            aria-label="Category" value={draft.cat} className={`${field} w-full`}
            onChange={(e) => setDraft({ ...draft, cat: e.target.value })}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="date" aria-label="Due date" value={draft.due} className={`${field} w-full`}
            onChange={(e) => setDraft({ ...draft, due: e.target.value })}
          />
          <div className="col-span-2 flex gap-2">
            <button type="submit" className={btnSmPrimary}>Save</button>
            <button type="button" className={btnSm} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex min-w-0 flex-col gap-1">
            <span
              className={`text-base font-medium [overflow-wrap:anywhere] transition-colors ${
                task.done ? 'text-muted line-through' : ''
              }`}
            >
              {task.text}
            </span>
            <div className={`flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[13px] ${task.done ? 'opacity-65' : ''}`}>
              <span
                className={`inline-flex items-center gap-1.5 font-semibold before:size-2 before:rounded-full before:bg-current ${CAT_COLOR[task.cat]}`}
              >
                {task.cat}
              </span>
              {due && (
                <time
                  dateTime={task.due} title={due.full}
                  className={`font-mono text-xs tabular-nums ${DUE_COLOR[due.cls]}`}
                >
                  {due.label}
                </time>
              )}
            </div>
          </div>
          <div className="flex gap-0.5">
            <button
              type="button" aria-label={`Edit: ${task.text}`} onClick={startEdit}
              className="grid size-[34px] place-items-center rounded-lg text-muted hover:bg-surface2 hover:text-ink"
            >
              <Edit />
            </button>
            <button
              type="button" aria-label={`Delete: ${task.text}`} onClick={remove}
              className="grid size-[34px] place-items-center rounded-lg text-muted hover:bg-surface2 hover:text-danger"
            >
              <Trash />
            </button>
          </div>
        </>
      )}
    </li>
  );
}