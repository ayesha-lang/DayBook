import { headerDate } from '../utils/dates.js';

export default function Header({ total, done }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <h1 className="font-display text-[clamp(2.2rem,7vw,3.1rem)] leading-none font-extrabold tracking-[-0.03em] text-balance">
          Daybook
        </h1>
        <p className="mt-2 font-mono text-[13px] tracking-[0.02em] text-muted">{headerDate()}</p>
      </div>
      <div className="flex min-w-[150px] flex-col gap-1.5" aria-live="polite">
        <span className="font-mono text-[13px] text-muted tabular-nums">
          <b className="font-medium text-ink">{done}</b> of {total} done
        </span>
        <div className="h-1.5 overflow-hidden rounded-[3px] bg-line" aria-hidden="true">
          <i
            className="block h-full rounded-[3px] bg-accent transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </header>
  );
}