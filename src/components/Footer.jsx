import { linkBtn } from '../ui.js';

export default function Footer({ active, done, confirming, onClear }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[13px] text-muted">
      <span>{active === 1 ? '1 task left' : `${active} tasks left`}</span>
      <button
        type="button" disabled={done === 0} onClick={onClear}
        className={`${linkBtn} ${confirming ? '!text-danger' : ''} disabled:text-muted disabled:no-underline disabled:opacity-60`}
      >
        {confirming && done > 0 ? `Remove ${done} completed? Click again` : 'Clear completed'}
      </button>
    </footer>
  );
}