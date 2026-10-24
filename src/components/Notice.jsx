import { linkBtn } from '../ui.js';

/* A dashed info bar with an optional action button. */
export default function Notice({ children, actionLabel, onAction }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-[10px] border border-dashed border-edge px-3.5 py-2.5 text-sm text-muted">
      <span>{children}</span>
      {actionLabel && (
        <button type="button" className={linkBtn} onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}