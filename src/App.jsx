import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import TaskForm from './components/Taskform.jsx';
import Controls from './components/Controls.jsx';
import Notice from './components/Notice.jsx';
import TaskList from './components/TaskList.jsx';
import EmptyState from './components/EmptyState.jsx';
import Footer from './components/Footer.jsx';
import usePersistentState from './hooks/usePersistentState.js';
import { seedTasks, normalize, matchesFilter, applyVisibleOrder, uid } from './utils/tasks.js';

const KEY = 'daybook.react.v1';

export default function App() {
  const [data, setData, storageOK] = usePersistentState(
    KEY,
    () => ({ tasks: seedTasks(), sample: true }),
    normalize
  );
  const { tasks, sample } = data;
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const setTasks = (fn) => setData((d) => ({ ...d, tasks: fn(d.tasks) }));

  const done = tasks.filter((t) => t.done).length;
  const counts = { all: tasks.length, active: tasks.length - done, completed: done };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) =>
      matchesFilter(t, filter) &&
      (!q || t.text.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q))
    );
  }, [tasks, filter, query]);

  /* ---------- CRUD ---------- */
  const addTask = ({ text, cat, due }) => {
    setData((d) => ({ tasks: [{ id: uid(), text, cat, due, done: false }, ...d.tasks], sample: false }));
    if (filter === 'completed') setFilter('all');
    setQuery('');
  };
  const toggleTask = (id) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTask = (id) => setTasks((ts) => ts.filter((t) => t.id !== id));
  const saveTask = (id, changes) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  const reorder = (orderedIds) => setTasks((ts) => applyVisibleOrder(ts, orderedIds));
  const moveBy = (id, dir) => {
    const ids = visible.map((t) => t.id);
    const i = ids.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    reorder(ids);
  };
  const clearCompleted = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3500);
      return;
    }
    setTasks((ts) => ts.filter((t) => !t.done));
    setConfirmClear(false);
  };

  return (
    <div className="px-[max(16px,env(safe-area-inset-left))] pt-8 pb-16">
    <main className="mx-auto flex max-w-[720px] flex-col gap-5">
      <Header total={tasks.length} done={done} />
      <TaskForm onAdd={addTask} />
      <Controls filter={filter} onFilter={setFilter} counts={counts} query={query} onQuery={setQuery} />

      {sample && (
        <Notice actionLabel="Dismiss" onAction={() => setData((d) => ({ ...d, sample: false }))}>
          These are sample tasks. Edit or delete them whenever you like.
        </Notice>
      )}
      {!storageOK && (
        <Notice>Browser storage is blocked here, so tasks will disappear when you reload.</Notice>
      )}

      <TaskList
        tasks={visible}
        onToggle={toggleTask} onDelete={deleteTask} onSave={saveTask}
        onReorder={reorder} onMove={moveBy}
      />
      {visible.length === 0 && <EmptyState total={tasks.length} filter={filter} query={query} />}

      <Footer active={counts.active} done={done} confirming={confirmClear} onClear={clearCompleted} />
    </main>
    </div>
  );
}