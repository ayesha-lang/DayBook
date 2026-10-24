import { FILTERS } from '../utils/tasks.js';
import { field } from '../ui.js';

const LABELS = { all: 'All', active: 'Active', completed: 'Completed' };

export default function Controls({ filter, onFilter, counts, query, onQuery }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
      <div className="inline-flex gap-0.5 rounded-[10px] bg-line p-[3px]" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <button
            key={f} type="button" aria-pressed={filter === f} onClick={() => onFilter(f)}
            className={`inline-flex items-baseline gap-[7px] rounded-lg px-3 py-1.5 text-sm font-semibold ${
              filter === f ? 'bg-surface text-ink shadow-sm' : 'text-muted'
            }`}
          >
            {LABELS[f]}
            <span className="font-mono text-xs font-normal tabular-nums">{counts[f]}</span>
          </button>
        ))}
      </div>
      <div className="max-w-[280px] min-w-0 flex-[1_1_180px]">
        <label className="sr-only" htmlFor="search">Search tasks</label>
        <input
          id="search" type="search" placeholder="Search tasks" value={query}
          onChange={(e) => onQuery(e.target.value)} className={`${field} w-full`}
        />
      </div>
    </div>
  );
}