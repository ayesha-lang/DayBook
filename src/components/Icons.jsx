export const Grip = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="fill-current">
    <circle cx="5.5" cy="3.5" r="1.3" /><circle cx="10.5" cy="3.5" r="1.3" />
    <circle cx="5.5" cy="8" r="1.3" /><circle cx="10.5" cy="8" r="1.3" />
    <circle cx="5.5" cy="12.5" r="1.3" /><circle cx="10.5" cy="12.5" r="1.3" />
  </svg>
);

export const Check = ({ done }) => (
  <svg
    viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"
    className="fill-none stroke-onaccent" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path
      d="M3.5 8.5l3 3 6-7"
      className="transition-[stroke-dashoffset] delay-75 duration-300"
      style={{ strokeDasharray: 16, strokeDashoffset: done ? 0 : 16 }}
    />
  </svg>
);

export const Edit = () => (
  <svg
    viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"
    className="fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M2.5 13.5l.7-3L11 2.7a1.4 1.4 0 012 2L5.2 12.8l-2.7.7z" />
  </svg>
);

export const Trash = () => (
  <svg
    viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"
    className="fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5M7 7v4M9 7v4" />
  </svg>
);