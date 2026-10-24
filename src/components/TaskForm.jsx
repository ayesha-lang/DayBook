import { useState } from 'react';
import { CATEGORIES } from '../utils/tasks.js';
import { field, btnPrimary } from '../ui.js';

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [cat, setCat] = useState('Work');
  const [due, setDue] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  function submit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) {
      setError(true);
      setMsg('Type a task first.');
      return;
    }
    onAdd({ text: clean, cat, due });
    setText('');
    setError(false);
    setMsg(`Added to ${cat}.`);
  }

  function change(e) {
    setText(e.target.value);
    if (error) { setError(false); setMsg(''); }
  }

  return (
    <form
      onSubmit={submit} autoComplete="off" noValidate
      className={`flex flex-col gap-3 rounded-xl border bg-surface p-3.5 ${error ? 'border-danger' : 'border-line'}`}
    >
      <label className="sr-only" htmlFor="newText">New task</label>
      <input
        id="newText" type="text" maxLength={200} placeholder="What needs doing?"
        value={text} onChange={change}
        className="w-full min-w-0 bg-transparent px-0.5 py-1 text-[19px] font-medium placeholder:font-normal placeholder:text-muted focus-visible:outline-none"
      />
      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="newCat">Category</label>
        <select id="newCat" value={cat} onChange={(e) => setCat(e.target.value)} className={`${field} max-sm:flex-1`}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className="sr-only" htmlFor="newDue">Due date</label>
        <input
          id="newDue" type="date" value={due} onChange={(e) => setDue(e.target.value)}
          className={`${field} max-sm:flex-1`}
        />
        <span className="hidden min-w-0 flex-1 sm:block" />
        <button type="submit" className={`${btnPrimary} max-sm:w-full`}>Add task</button>
      </div>
      <p className={`min-h-[1.2em] text-[13px] ${error ? 'text-danger' : 'text-muted'}`} role="status">{msg}</p>
    </form>
  );
}